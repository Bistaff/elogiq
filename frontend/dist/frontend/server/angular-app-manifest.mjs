
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
      "chunk-7H6NYO4H.js",
      "chunk-TY6MGJKC.js"
    ],
    "route": "/companies"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-WHVZCBJ4.js",
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
    'index.csr.html': {size: 5548, hash: 'be7db1777e0f19847dd9497387a47367d1bdb53e6dafe7ddd454fe38c39b85ee', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '61eea071fd7a5d799720cbb5bed4fd032892f7ea72802b79185c2e216a75a266', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YGYTPPG3.css': {size: 310884, hash: 'h4H4K3RyHno', text: () => import('./assets-chunks/styles-YGYTPPG3_css.mjs').then(m => m.default)}
  },
};
