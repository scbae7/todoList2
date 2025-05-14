import express from 'express';
import session from 'express-session';
class WebServer {
  constructor(id){
    this.id = id;
  }
  serviceOn(){
    const app = express();
    app.set('view engine', 'pug');
    app.set('views','./src/views');
    app.locals.pretty = true;
    app.use(express.static('./src/public'));
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