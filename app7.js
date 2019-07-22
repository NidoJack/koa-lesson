const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const { sign } = require("jsonwebtoken");
const secret = "demo";
const jwt = require("koa-jwt")({ secret });
const admin = require('./Admin.js');

router
  .post("/api/login", async function(ctx, next) {
    console.log(ctx.request);
    const user = ctx.request.body;
    console.log(user);
    if (user && user.username) {
      let { username } = user;
      const token = sign({ username }, secret, { expiresIn: "1h" });
      ctx.body = {
        message: 'Get Token success',
        code: 1,
        token
      };
    }else {
      ctx.body = {
        message: 'Param Error',
        code: -1
      }
    }
  })
  .get('/api/userInfo', jwt, async ctx => {
    ctx.body = { username: ctx.state.user.username };
  })
  .get('/api/adminInfo', jwt, admin, async ctx => {
    ctx.body = { username:ctx.state.user.username };
  })

app.use(router.routes());
app.listen(3000, () => {
  console.log('server is listening at port 3000');
})