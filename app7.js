const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { sign } = require("jsonwebtoken");
// remember using it if modules export is a func
const admin = require('./Admin')();

const app = new Koa();
const router = new Router();
const user = new Router();
const detail = new Router();
const secret = "demo";
const jwt = require("koa-jwt")({ secret });

router
  .post("/api/login", async function(ctx, next) {
    console.log(ctx.request);
    const user = ctx.request.body;
    if (user && user.username) {
      let { username } = user;
      // create jsonwebtoken
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
  // koa-jwt
  .get('/api/userInfo', jwt, async ctx => {
    // why this api need Bearer
    ctx.body = { username: ctx.state.user.username };
  })
  .get('/api/adminInfo', jwt, admin, async ctx => {
    // why this api need Bearer
    ctx.body = { username:ctx.state.user.username };
  })

app
  .use(bodyParser())
  .use(router.routes());
app.listen(3000, () => {
  console.log('server is listening at port 3000');
})