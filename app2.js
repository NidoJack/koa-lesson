const Koa = require("koa");
const Route = require("koa-router");
const app = new Koa();
const router = new Route();

/**
 * 遵守RESTful标准来定义路由，post,get,put,delete对应crud(增删改查)
 */
router
    .get('/', async (ctx, next) => {
        ctx.body = 'Hello World';
    })
    .post('/users/:id', async (ctx, next) => {
        console.log("add users,id=" + ctx.params.id);
        ctx.body = 'add users';
        await next();
        console.log("add users end");
    })
    .put('/users/:id', async (ctx, next) => {
        console.log("update users,id=" + ctx.params.id);
    })
    .del('/users/:id', async (ctx, next) => {
        console.log("delete users,id=" + ctx.params.id);
    })
    // 当一条路由请求在all方法和其他方法同时命中的情况下，只要其他方法内调用了await next()都会把执行权交给all方法中的中间件执行
    // all方法一般用来设置请求头，过期时间，CORS之类的
    // 当请求method不确定时也会经由all中间件（前提是all中间件中的路由是匹配的）
    .all('/users/:id', async (ctx, next) => {
        console.log("all method,id=" + ctx.params.id);
        await next();
        console.log("all method end");
    })
    .all('/*', async (ctx, next) => {
        console.log("access control active");
        ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
        await next();
    });

// router
//     .get('/', async (ctx, next) => {
//         ctx.body = 'Hello World';
//     })
//     .all('/*', async (ctx, next) => {
//         console.log("access control active");
//         ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
//         await next();
//     });

app.use( router.routes() );
app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
});


