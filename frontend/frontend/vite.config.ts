import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnheadVite from '@unhead/addons/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs'
import path from 'path'
import type { Plugin, OutputBundle, OutputOptions } from 'rollup'

// Plugin to copy index.html to 404.html after build
function copy404Plugin(): Plugin {
  return {
    name: 'copy-404',
    writeBundle(options: OutputOptions, bundle: OutputBundle) {
      const outDir = options.dir || 'dist'
      const indexPath = path.resolve(outDir, 'index.html')
      const notFoundPath = path.resolve(outDir, '404.html')
      
      if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, 'utf-8')
        
        // Add the SPA redirect script to the 404.html
        const redirectScript = `
        <script type="text/javascript">
          // Single Page Apps for GitHub Pages
          // https://github.com/rafgraph/spa-github-pages
          (function(l) {
            if (l.search[1] === '/' ) {
              var decoded = l.search.slice(1).split('&').map(function(s) { 
                return s.replace(/~and~/g, '&')
              }).join('?');
              window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          }(window.location))
        </script>`
        
        // Insert the script after the <head> tag
        indexContent = indexContent.replace('<head>', `<head>${redirectScript}`)
        
        fs.writeFileSync(notFoundPath, indexContent)
        console.log('404.html created successfully')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/my-ale-portfolio/',
  plugins: [
    vue(),
    vueJsx(),
    UnheadVite(),
    copy404Plugin(), // Add the 404 copy plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    watch: {
      usePolling: true // Enables polling for file changes mainly for WSL
    }
  }
})
