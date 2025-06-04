import axios from 'axios';
import cron from 'node-cron';

export function startKeepAlive() {
  console.log('[KeepAlive] 슬립 방지 서비스 시작됨');

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
