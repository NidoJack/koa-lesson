const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();

const forums = new Router();
const posts = new Router();

// 嵌套路由
posts.get("/", async (ctx, next) => {
  ctx.response.body = "<h1>response to /forums/123/posts</h1>";
});

posts.get('/:pid', async (ctx, next) => {
  ctx.response.body = "<h1>response to /forums/123/posts/123</h1>";
})

// koa-router的use代表当前路由使用以下中间件，posts.routes此时为中间件
// koa-router的use也可以用来匹配组合路由
// 可以匹配到的路由为 "/forums/123/posts" 或者 "/forums/123/posts/123"
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

app.use(forums.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})
