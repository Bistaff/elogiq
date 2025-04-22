import { APP_BASE_HREF } from '@angular/common';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule, writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, {json} from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cookie from 'cookie';
import {HttpErrorResponse} from '@angular/common/http';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
let authToken = "";
const localeHost = process.env['HOST'] ? process.env['HOST'] : 'localhost';
const localPort: number = process.env['PORT'] ? Number.parseInt(process.env['PORT']) : 4200;
const beHost = process.env['HOST'] ? process.env['HOST'] : 'localhost';
const bePort: number = process.env['PORT'] ? Number.parseInt(process.env['PORT']) : 8000;

interface IRequestObject {
  method: string; // Tipo string per indicare il metodo HTTP (e.g., "GET", "POST").
  headers: Record<string, string>; // Oggetto con chiavi e valori stringa per gli header HTTP.
  body: string; // Corpo della richiesta, come stringa (può essere JSON serializzato).
}

interface IRequestError {
  detail: string;
}

app.use(json());

app.post('/api/login', async (req, res) => {
  try {
    console.log(`[LOGIN ${req.url}]`);
    const { username, password } = req.body;
    const response = await fetch(`http://${beHost}:${bePort}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Invalid credentials');
    const data: {token: string} = await response.json() as {token: string};
    if (data.token) {
      authToken = data.token;
      res.cookie('auth_token', authToken, {
        domain: 'localhost', // Sostituisci con il tuo dominio
        httpOnly: true,  // Accessibile solo dal server
        secure: process.env["NODE_ENV"] === 'production', // Se in produzione, usa HTTPS
        maxAge: 3600000  // 1 ora
      });
      res.status(200).json({ message: 'Login successful', authToken });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: error });
  }
});

app.get('/api/*', async (req, res) => {
  try {
    console.log(`[GET ${req.url}]`);
    const response = await startRequest(req, res);
    if (response.status >= 300) {
      const error: IRequestError = await response.json()
      throw new Error(error.detail);
    }
    const data = camelize(await response.json());
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[GET ${req.url}] ERROR :`, error.message ? error.message : error);
      res.status(500).json(error.message ? error.message : error);
    } else if (error instanceof HttpErrorResponse) {
      console.error(`[GET ${req.url}] HTTP ERROR :`, error.message ? error.message : error);
      res.status(500).json(error.message ? error.message : error);
    } else {
      console.error(`[GET ${req.url}] BASIC ERROR :`, error);
      res.status(500).json(error);
    }
  }
});

app.post('/api/*', async (req, res) => {
  try {
    console.log(`[POST ${req.url}]`);
    const response = await startRequest(req, res);
    if (response.status >= 300) {
      const error: IRequestError = await response.json()
      throw new Error(error.detail);
    }
    const data = camelize(await response.json());
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[POST ${req.url}] ERROR :`, error.message ? error.message : error);
      res.status(500).json(error.message ? error.message : error);
    } else if (error instanceof HttpErrorResponse) {
      console.error(`[POST ${req.url}] HTTP ERROR :`, error.message ? error.message : error);
      res.status(500).json(error.message ? error.message : error);
    } else {
      console.error(`[POST ${req.url}] BASIC ERROR :`, error);
      res.status(500).json(error);
    }
  }
})

async function startRequest(req: any, res: any): Promise<Response> {
  let requestObject: Partial<IRequestObject> = {
    method: req.method,
    headers: {'Content-Type': 'application/json' }
  }
  if (authToken) {
    requestObject.headers = requestObject.headers || {};
    requestObject.headers['Authorization'] = `Bearer ${authToken}`;
  }
  if (req.method === 'POST') {
    requestObject.body = JSON.stringify(req.body);
  }
  console.log(`[${req.method} http://${beHost}:${bePort}/api/login/]`);
  return fetch(`http://${beHost}:${bePort}${req.url}`, requestObject);
}

function camelize(input: any): any {
  if (Array.isArray(input)) return input.map(item => camelize(item));

  // Se l'input è un oggetto, camelizza le chiavi
  if (typeof input === 'object' && input !== null) {
    const camelizedObject: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        camelizedObject[camelKey] = camelize(input[key]);
      }
    }
    return camelizedObject;
  }
  return input;
}

/**
 * Serve static files from /browser
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  }),
  async (req, res, next) => {
    console.log(`[SSR STATIC] ${req.url}`);
    next();
  }
);


/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      console.log(`[SSR TOKEN] ${req.url}`);
      const cookies = cookie.parse(req.headers.cookie || '');
      authToken = cookies['auth_token'];
      if (!req.baseUrl.includes("login") && !authToken) return res.redirect('/login');
      if (req.baseUrl.includes("login") && authToken) return res.redirect('/');
      return response ? writeResponseToNodeResponse(response, res) : next()
    })
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  app.listen(localPort, localeHost,() => {
    console.log(`Node Express server listening on http://${localeHost}:${localPort}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
