const Koa = require("koa");
const Route = require("koa-router");
const app = new Koa();
const router = new Route();

// 支持单个
router.get(
  "/users/:id",
  (ctx, next) => {
    return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = user;
      next();
    });
  },
  (ctx, next) => {
    console.log(ctx.user);
  }
);

app.use(router.routes());
app.listen(3000, () => {
  console.log('server listening port 3000');
})