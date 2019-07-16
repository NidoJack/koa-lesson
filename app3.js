const koa = require("koa");
const compose = require("koa-compose");
const app = new koa();

// app.use(async function (ctx, next) {
//   console.log( ctx.method, ctx.host + ctx.url );
//   await next();
//   ctx.body = 'Hello World';
// });

// 定义一个中间件并且使用
// const logger = async function(ctx, next) {
//   console.log( ctx.method, ctx.host + ctx.url );
//   await next();
// };
// app.use(logger);
// app.use(async function (ctx, next) {
//   ctx.body = 'Hello World';
// });



// 洋葱模型
// 遇到next则授权给下一个中间件执行，类似事件流的捕获和冒泡
// app.use(async function (ctx, next) {
//   console.log('one start');
//   await next();
//   console.log('one end');
// })
//
// app.use(async function (ctx, next) {
//   console.log('two start');
//   ctx.body = 'two';
//   await next();
//   console.log('two end');
// })
//
// app.use(async function (ctx, next) {
//   console.log('three start');
//   await next();
//   console.log('three end');
// })

// 多个中间件组合一个单一中间件，便于重用或导出，这里使用koa-compose
// async function middleware1(ctx, next) {
//   // do something
//   console.log('one start');
//   await next();
//   console.log('one end');
// }
//
// async function middleware2(ctx, next) {
//   // do something
//   console.log('two start');
//   ctx.body = 'two';
//   await next();
//   console.log('two end');
// }
//
// async function middleware3(ctx, next) {
//   // do something
//   console.log('three start');
//   await next();
//   console.log('three end');
// }
//
// const all = compose([middleware1, middleware2, middleware3]);
// app.use(all);


app.use(async (ctx, next) => {
  let stime = new Date().getTime();
  await next();
  let etime = new Date().getTime();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World</h1>';
  console.log(`请求地址: ${ctx.path}, 响应时间: ${etime - stime}ms`);
});

app.use(async (ctx, next) => {
  console.log('中间件dosomething');
  await next();
  console.log('中间件执行over');
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});