import express from 'express';
import router from './router';

export class Server {
  private readonly PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  private readonly app = express();

  constructor() {
    this.app.listen(this.PORT, () => {
      console.log(`API listening on http://localhost:${this.PORT}`);
    });

    this.app.use(express.json());
    this.app.use(router);
    this.app.get('/status', (req, res) => res.json('ok'));
  }
}
