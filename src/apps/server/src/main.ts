import 'reflect-metadata';
import Koa from 'koa';

async function main(): Promise<void> {
  try {
    const app = new Koa();

    app.use((ctx) => {
      ctx.body = 'Hello World';
    });

    app.listen(3001);
    console.log(`HTTP server is listening on port 3001`);
  } catch (e) {
    console.error('Error running server!', { error: e });
    process.exit(1);
  }
}

void main();
