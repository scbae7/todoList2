import express from 'express';
class WebServer {
  constructor(id){
    this.id = id;
  }
  serviceOn(){
    const app = express();
    app.set('view engine', 'pug');
    app.set('views','./src/views');
    app.use(express.static('./src/public'));
    return app;
  }
}
const webServer = new WebServer('webServer');
export default webServer.serviceOn();