const Koa = require("koa");
const Route = require("koa-router");
const app = new Koa();
const router = new Route();

// 路由特性：命名路由
router.get('user', '/users/:id',async function (ctx, next) {
    console.log("get users");
    ctx.response.body = '<h1>user page</h1>';
    await next();
})

// 两种写法实现路由生成
const userurl = router.url('user', 3);
console.log('userurl: ',userurl);

const userurl2 = router.url('user', { id: 4 });
console.log('userurl2: ',userurl2);

// router.use????
router.use(function (ctx, next) {
    console.log('redirect');
    console.log(ctx.router.url('sign-in'));
    ctx.redirect(ctx.router.url('sign-in'));
})

app.use(router.routes());
app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
});