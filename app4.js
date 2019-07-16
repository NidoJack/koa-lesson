const koa = require('koa');
const app = new koa();
const bodyParser = require("koa-bodyparser");

const Router = require('koa-router');
const router = new Router();

// koa-bodyparser 中间件，用于分析请求后的参数并解析成对象
// app.use(bodyParser());
// app.use( async (ctx, next) => {
//   if ( ctx.url === '/' && ctx.method === 'GET' ) {
//     ctx.type = 'html';
//     let html = `
//       <h1>登录</h1>
//       <form action="/" method="POST">
//         <p>用户名</p>
//         <input type="text" name="userName" /><br />
//         <p>密码</p>
//         <input type="password" name="password" /><br />
//         <button type="submit">submit</button>
//       </form>
//     `;
//     ctx.body = html
//   } else if (ctx.url === '/' && ctx.method === 'POST') {
//     let postData = ctx.request.body
//     ctx.body = postData;
//   }
// });

// koa-router 可以省略上述上下文对象请求方式判断
router.get('/', (ctx, next) => {
  ctx.type = 'html';
  let html = `
    <h1>登录</h1>
    <form action="/" method="POST">
      <p>用户名</p>
      <input type="text" name="userName" /><br />
      <p>密码</p>
      <input type="password" name="password" /><br />
      <button type="submit">submit</button>
    </form>
  `;
  ctx.body = html
});

router.post('/', (ctx, next) => {
  let postData = ctx.request.body;
  ctx.body = postData;
})

app.use(bodyParser())
   .use(router.routes())             // 加载koa-router中间件
   .use(router.allowedMethods());    // 对异常状态码的处理


app.listen(3000, () => {
  console.log("server is listening at port 3000");
})