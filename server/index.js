import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { serverPort } from '../config';

const liveReloadServer = livereload.createServer();
liveReloadServer.watch('dist');

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();
app.use(connectLivereload());
app.use(express.static('dist'));

app.listen(serverPort, () => {
  console.log(`server has started on port ${serverPort}`);
});
