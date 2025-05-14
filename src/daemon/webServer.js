import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
class WebServer {
  constructor(id){
    this.id = id;
  }
  serviceOn(){
    const app = express();

    // __dirname 설정 (ES 모듈 환경)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // views 경로를 절대경로로 설정
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
    app.locals.pretty = true;

    app.use(express.static(path.join(__dirname, '../public')));

    app.use(session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));

    return app;
  }
}

const webServer = new WebServer('webServer');
export default webServer.serviceOn();