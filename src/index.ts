import dotenv from 'dotenv';
import HealthRoute from './routes/health.route'
import UserRoute from './routes/user.route';
import App from './app';

dotenv.config();

const app = new App([
  new HealthRoute(),
  new UserRoute(),
]);

app.listen();