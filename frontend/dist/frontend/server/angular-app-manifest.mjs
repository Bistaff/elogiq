
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
      "chunk-FSDSGX3E.js"
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
    'index.csr.html': {size: 5548, hash: 'c511811debf01ded28e97c8db6853344200a0b2d33454d69b4d7d10acbc4ae57', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '01890c23e8d1896184da340aa629c341050a03227216276789b8f424f1fbd1c7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YGYTPPG3.css': {size: 310884, hash: 'h4H4K3RyHno', text: () => import('./assets-chunks/styles-YGYTPPG3_css.mjs').then(m => m.default)}
  },
};
