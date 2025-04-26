
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
      "chunk-NGVTIPDO.js",
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
    'index.csr.html': {size: 5548, hash: '47b95c45413739253ba45a6b8e3c9ba464abeafac68edccc5e0c9620243d8495', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: 'cddb556bb6a9761da384a6215395126a3f5c1fcb463b602fe5014e7a0f89d38f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EGINKAKE.css': {size: 311190, hash: 'mqL7lpKlQV8', text: () => import('./assets-chunks/styles-EGINKAKE_css.mjs').then(m => m.default)}
  },
};
