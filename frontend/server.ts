import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use((request, response, next) => {
  angularApp.handle(request).then((result) => {
    if (result) writeResponseToNodeResponse(result, response);
    else next();
  }).catch(next);
});

export const reqHandler = createNodeRequestHandler(app);

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env['PORT'] ?? 4010);
  app.listen(port, () => console.log(`Frontend server listening on port ${port}`));
}
