
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-2OBHPPBU.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-NWC2JXGJ.js",
      "chunk-ZP5R36TN.js"
    ],
    "route": "/companies"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-CEYNVAL3.js",
      "chunk-ZP5R36TN.js"
    ],
    "route": "/companies/*"
  },
  {
    "renderMode": 1,
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-GDVIMQNM.js"
    ],
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5548, hash: 'ff819820d2eb474c73b97b59d8c9479e9f9d1f96f066f18345e9d6f7ac1f37b5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '02d82d92cf91734d1d6493ff752ca7106b2c86ed16832574b12e2c10bea6481a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EGINKAKE.css': {size: 311190, hash: 'mqL7lpKlQV8', text: () => import('./assets-chunks/styles-EGINKAKE_css.mjs').then(m => m.default)}
  },
};
