
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
      "chunk-JZFIL434.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-M3S5CA4W.js",
      "chunk-A47A66XE.js"
    ],
    "route": "/companies"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-WX6ZQ7AP.js",
      "chunk-A47A66XE.js"
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
      "chunk-4R6TTIKM.js"
    ],
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5548, hash: '2e915a1055ed17049d04a3d506c143e4f49fad8ddf6da5f407ed4203a98fc8d8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1261, hash: '12882bcf5e13c7e3e78f59affeed431046441b5df916ddce28dd0e0f7c7e11f0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-EGINKAKE.css': {size: 311190, hash: 'mqL7lpKlQV8', text: () => import('./assets-chunks/styles-EGINKAKE_css.mjs').then(m => m.default)}
  },
};
