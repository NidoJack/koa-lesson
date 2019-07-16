const koa = require('koa');
const app = new koa();


/**
 *  ctx => context对象，上下文对象
 *  一般包含request和response
 */
app.use(async (ctx, next) => {
  console.log(ctx);
  console.log('--------');
  console.log(next);
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World</h1>';
});



app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});

