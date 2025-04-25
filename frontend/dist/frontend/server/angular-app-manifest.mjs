
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
    'index.csr.html': {size: 5548, hash: 'd54c47d339da58db4c987a9f0843bdaf6786db09a85ec7a740f2a1629da05638', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '33b10ecbeb67eedd61b4a4f9d403756f80c7509e51f72c895bc79e93914bcc9a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YGYTPPG3.css': {size: 310884, hash: 'h4H4K3RyHno', text: () => import('./assets-chunks/styles-YGYTPPG3_css.mjs').then(m => m.default)}
  },
};
