const Koa = require('koa');
const app = new Koa();
const Router = require('./Router.js');
const router = new Router();
// app.use(async (ctx, next) => {
//   const { url, method } = ctx;
//   console.log(url, method);
//   if( url === '/404' && method === 'GET' ) {
//     ctx.body = 'Page Not Found';
//     ctx.status = 404;
//   } else {
//     ctx.body = 'Default Content';
//   }
//   await next();
// })

router.get('/404', (context, next) => {
  context.body = 'Page not found';
  context.status = 404;
})
app.use(router.routes());

app.listen(4000, () => {
  console.log('server is listening 4000');
})