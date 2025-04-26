
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
      "chunk-JWOZX7YP.js",
      "chunk-JO2K2VEO.js"
    ],
    "route": "/companies"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-55KHLHOJ.js",
      "chunk-JO2K2VEO.js"
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
    'index.csr.html': {size: 5548, hash: 'cd1769146606ca8945a586f6caea22f8580df8fed8acc9b80da1199065bcd8b2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '400689977991b40e24ba0a15e7f1889e769a965cf2937da2cb4e7c96e7afc7cd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EGINKAKE.css': {size: 311190, hash: 'mqL7lpKlQV8', text: () => import('./assets-chunks/styles-EGINKAKE_css.mjs').then(m => m.default)}
  },
};
