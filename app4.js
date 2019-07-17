const Koa = require("koa");
const Route = require("koa-router");
const app = new Koa();
const router = new Route();

router.get(
    '/users/:id', 
    (ctx, next) => {
        return User
    },
    (ctx, next) => {

    })