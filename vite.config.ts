import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function presentationEditorPlugin() {
  return {
    name: 'presentation-editor',
    configureServer(server: any) {
      server.middlewares.use('/api/presentation-source', (req: any, res: any, next: any) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        if (req.method === 'GET') {
          const qs = req.url.includes('?') ? req.url.split('?')[1] : ''
          const id = new URLSearchParams(qs).get('id')
          if (!id) { res.writeHead(400); res.end('Missing id'); return }
          const filePath = path.resolve(__dirname, 'src', 'presentations', id, 'index.tsx')
          if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return }
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
          res.end(fs.readFileSync(filePath, 'utf-8'))
        } else if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => { body += chunk })
          req.on('end', () => {
            try {
              const { id, content } = JSON.parse(body)
              if (!id || content === undefined) { res.writeHead(400); res.end('Missing fields'); return }
              const filePath = path.resolve(__dirname, 'src', 'presentations', id, 'index.tsx')
              if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return }
              fs.writeFileSync(filePath, content, 'utf-8')
              res.writeHead(200); res.end('OK')
            } catch { res.writeHead(500); res.end('Error') }
          })
        } else {
          next()
        }
      })
    },
  }
}

function buildVersionPlugin() {
  return {
    name: 'build-version',
    buildStart() {
      const buildTime = new Date().toISOString();
      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      fs.writeFileSync(path.join(publicDir, 'version.json'), JSON.stringify({ buildTime }), 'utf-8');
    },
  };
}

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    figmaAssetResolver(),
    presentationEditorPlugin(),
    buildVersionPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    open: true,
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
