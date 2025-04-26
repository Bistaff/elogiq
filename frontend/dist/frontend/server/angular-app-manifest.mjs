
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
      "chunk-QHYHBX26.js",
      "chunk-MMS7AYXL.js"
    ],
    "route": "/companies"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-DA5M3Y33.js",
      "chunk-MMS7AYXL.js"
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
    'index.csr.html': {size: 5548, hash: '3ab64ee4e38fc6220deba7c2b228caff9b2eebb7abc30563e7ff7da7ef7886f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '4ae3235a36e840d0127552aea1f97cb96fecf5950808eee3b337bf4b835dcab7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EGINKAKE.css': {size: 311190, hash: 'mqL7lpKlQV8', text: () => import('./assets-chunks/styles-EGINKAKE_css.mjs').then(m => m.default)}
  },
};
