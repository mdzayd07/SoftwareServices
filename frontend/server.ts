import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const app = express();
const angularApp = new AngularNodeAppEngine();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((request, response, next) => {
  angularApp.handle(request).then((result) => {
    if (result) writeResponseToNodeResponse(result, response);
    else next();
  }).catch(next);
});

export const reqHandler = createNodeRequestHandler(app);

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env['PORT'] ?? 4000);
  app.listen(port, () => console.log(`Frontend server listening on port ${port}`));
}
