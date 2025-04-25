
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
    'index.csr.html': {size: 5548, hash: '1cf2c7440adbbc7f261e46ab2b612b577f7b2314a59550b0cf73e802d1813288', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '89a27a35ab4ece71b096f9fda0394f43d47ce7771a7d5f29df3caf64c68c3dab', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YGYTPPG3.css': {size: 310884, hash: 'h4H4K3RyHno', text: () => import('./assets-chunks/styles-YGYTPPG3_css.mjs').then(m => m.default)}
  },
};
