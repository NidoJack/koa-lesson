const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
// 路由前缀，可以在实例化Router的时候添加prefix前缀，这样就不需要重复对每个路由添加固定的字符串
const router = new Router({
  prefix: '/users'
});
router.get('/', async (ctx, next) => {
  console.log('get users');
})

/// url参数可以通过:param来定义，通过path-to-regexp正则匹配获取对应的参数，参数将会被封装至ctx.params中
router.get('/:id', async (ctx, next) => {
  console.log('get users:',ctx.params.id);
})

app.use(router.routes());
app.listen(3000, () => {
  console.log('server is listening at port 3000');
})

