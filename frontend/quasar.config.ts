

import { defineConfig } from '#q-app/wrappers';
import { configure } from 'quasar/wrappers';


module.exports = configure(function (ctx){
  return {
    
   
    boot: ['axios'],

    
    css: [
      'app.scss'
    ],

   
    extras: [
      

      'roboto-font', 
      'material-icons', 
    ],

    
    build: {
      target: {
        browser: [ 'es2022', 'firefox115', 'chrome115', 'safari14' ],
        node: 'node20'
      },

      typescript: {
        strict: true,
        vueShim: true
       
      },

      vueRouterMode: 'history',

      env: {

        API_ENDPOINT: ctx.dev

          ? 'http://0.0.0.0:3000'

          : 'https://your-domain.ru',

      },
    
     
      
      vitePlugins: [
        ['vite-plugin-checker', {
          vueTsc: true,
          eslint: {
            lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
            useFlatConfig: true
          }
        }, { server: false }]
      ]
    },

  
    devServer: {
      
      open: true 
    },

    
    framework: {
      config: {},

  
      plugins: ['Notify'],
    },

    
    animations: [],



 
    ssr: {
      prodPort: 3000, 
                      
      middlewares: [
        'render' 
      ],

    
      pwa: false
     
    },

   
    pwa: {
      workboxMode: 'GenerateSW'
   
    },

   
    cordova: {
     
    },

    
    capacitor: {
      hideSplashscreen: true
    },

   
    electron: {
  
      preloadScripts: [ 'electron-preload' ],

     
      inspectPort: 5858,

      bundler: 'packager',

      packager: {
       
      },

      builder: {
      

        appId: 'frontend'
      }
    },

    
    bex: {
     
      extraScripts: []
    }
  }
});
