import { App } from './api/app';

(async () => {
  try {
    const app = new App();
    await app.start();
  } catch (err) {
    console.log(`App did not start, error: ${err}`);
  }
})();
