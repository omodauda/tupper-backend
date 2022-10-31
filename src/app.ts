import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import admin from 'firebase-admin';

import errorMiddleware from './middlewares/error.middleware';
import Routes from './interfaces/route.interface';
import schedules from './schedules';

class App {
  public app: Application;
  public port: number | string;
  public env: string;
  private googleKey: string;
  private serviceAccount: {};

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.env = process.env.NODE_ENV || 'development';
    this.googleKey = process.env['GOOGLE_APP_CREDENTIALS'] || '';
    // this.serviceAccount = JSON.parse(this.googleKey)
    this.serviceAccount = {
      "type": process.env.type,
      "project_id": process.env.project_id,
      "private_key_id": process.env.private_key_id,
      "private_key": process.env.private_key,
      "client_email": process.env.client_email,
      "client_id": process.env.client_id,
      "auth_uri": process.env.auth_uri,
      "token_uri": process.env.token_uri,
      "auth_provider_x509_cert_url": process.env.auth_provider,
      "client_x509_cert_url": process.env.client_cert_url,
    }

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeSchedules();

    admin.initializeApp({
      credential: admin.credential.cert(this.serviceAccount)
    })

  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(hpp());
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    })
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeSchedules(): void {
    schedules();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`)
    })
  }
}

export default App;