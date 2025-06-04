import axios from 'axios';
import cron from 'node-cron';

export function startKeepAlive() {
  const SELF_URL = 'https://todolist2-d0cr.onrender.com';
  
  cron.schedule('*/14 * * * *', async () => {
    try {
      const response = await axios.get(SELF_URL);
      console.log(`[PING] ${new Date().toISOString()} - Status: ${response.status}`);
    } catch (err) {
      console.error(`[PING ERROR] ${new Date().toISOString()} -`, err.message);
    }
  });
}
