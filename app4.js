const Koa = require("koa");
const Route = require("koa-router");
const app = new Koa();
const router = new Route();

// 支持单个路由内多个中间件处理，便于处理
router.get(
  "/users/:id",
  async (ctx, next) => {
    ctx.response.body = '<h1>user page</h1>';
    ctx.user = {id: 3, name: 'xianming'};
    await next();
  },
  async (ctx, next) => {
    console.log(ctx.user);
  }
);

app.use(router.routes());
app.listen(3000, () => {
  console.log("server listening port 3000");
});
