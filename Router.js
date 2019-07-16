// 定义路由组件
class Router {
    constructor() {
        // 缓存路由规则
        this._routes = [];
    }
    get(url, handler) {
        // 设置Method为GET的路由规则
        // 将规则加入缓存中
        this._routes.push({
            url: url,
            method: 'GET',
            handler
        });
    }
    routes() {
        // 返回路由处理中间件给koa使用
        return async (ctx, next) => {
            // 获取当前请求的URL和Method
            const { method, url } = ctx;
            // 从缓存的规则中找出匹配的规则
            const matchedRouter = this._routes.find(r => r.method === method && r.url === url);
            if (matchedRouter && matchedRouter.handler) {
                // 执行路由规则中的处理函数，响应请求
                await matchedRouter.handler(ctx, next);
            } else {
                await next();
            }
        }
    }
}
module.exports = Router;