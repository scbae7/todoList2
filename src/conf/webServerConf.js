import dotenv from 'dotenv';
dotenv.config();
const webServerConf = {
  port:process.env.PORT
}
export default webServerConf;