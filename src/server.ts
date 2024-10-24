import 'dotenv/config';
import 'reflect-metadata';

import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { 
  json, 
  Application, 
} from 'express';
import { Server, } from 'socket.io';
import { InversifySocketServer, } from 'inversify-socket-utils';
import { InversifyExpressServer, } from 'inversify-express-utils';

import container from '@ioc/container';

import { DatabaseProvider, } from '@shared/domain/providers/database.provider';

async function init(): Promise<void> {
  const database = container.get<DatabaseProvider>('providers:database');
  await database.connect();
}

async function main(): Promise<void> {
  const port = process.env.APP_PORT ?? 4000;

  const server = new InversifyExpressServer(container)
  const app = server.setConfig(
    (app: Application) => {
      app.use(cors());
      app.use(json());
      app.use(morgan('dev'));
    })
    .build();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const socketServer = new InversifySocketServer(container, io);
  socketServer.build();

  httpServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

init()
  .then(main)
  .catch(async (err) => {
    const database = container.get<DatabaseProvider>('providers:database');
    await database.disconnect();

    console.error(err);
    process.exit(1);
  });