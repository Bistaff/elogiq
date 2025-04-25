
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
      "chunk-BW6Q5OFQ.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7GAIPJBO.js",
      "chunk-TY6MGJKC.js"
    ],
    "route": "/companies"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-5XYGFF2P.js",
      "chunk-TY6MGJKC.js"
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
      "chunk-7X53EETW.js"
    ],
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5548, hash: 'e4e98a171050bed51796739f38dc78e0b14e74a2a79bce2ab3c4195833728b5f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '3555d1c9239260146f090ede13be6f6ffc51232ccd84040666e02b9a006e390d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YGYTPPG3.css': {size: 310884, hash: 'h4H4K3RyHno', text: () => import('./assets-chunks/styles-YGYTPPG3_css.mjs').then(m => m.default)}
  },
};
