import { ɵsetAngularAppEngineManifest } from '@angular/ssr';
import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

let angularAppInstance: AngularNodeAppEngine | undefined;

async function getAngularApp(): Promise<AngularNodeAppEngine> {
  if (!angularAppInstance) {
    try {
      const manifestModule = await import('./angular-app-engine-manifest.mjs' as any);
      if (manifestModule?.default) {
        ɵsetAngularAppEngineManifest(manifestModule.default);
      }
    } catch {
      // Handled if already set
    }
    angularAppInstance = new AngularNodeAppEngine({
      allowedHosts: ['*'],
    });
  }
  return angularAppInstance;
}

const app = express();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = existsSync(resolve(browserDistFolder, 'index.html'))
  ? resolve(browserDistFolder, 'index.html')
  : resolve(browserDistFolder, 'index.csr.html');

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((request, response, next) => {
  getAngularApp()
    .then((engine) => engine.handle(request))
    .then((result) => {
      console.log('Angular handle result for', request.url, '->', !!result);
      if (result) {
        writeResponseToNodeResponse(result, response);
      } else {
        response.sendFile(indexHtml);
      }
    })
    .catch((err) => {
      console.error('SSR render error, falling back to index.csr.html:', err);
      response.sendFile(indexHtml);
    });
});

export const reqHandler = createNodeRequestHandler(app);

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env['PORT'] ?? 4000);
  app.listen(port, () => console.log(`Frontend server listening on port ${port}`));
}
