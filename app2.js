const koa = require('koa');
const app = new koa();

// request uri: http://localhost:3000/?search=koa&keywords=context

app.use(async (ctx) => {
  // console.log(ctx.req);
  // console.log(ctx.request);
  // ctx.response.body = {
  //   url: ctx.request.url,
  //   query: ctx.request.query,
  //   queryString: ctx.request.querystring
  // }


  // post请求获取参数时需要对Context中的原生nodejs请求对象req作解析
  // curl -d "param1=value1&param2=value2" http://localhost:3000/
  // let postdata = '';
  // ctx.req.on('data', (data) => {
  //   postdata += data;
  // });
  // ctx.req.on('end', () => {
  //   console.log(postdata);
  // });


  // Context中的request对象中包含了请求方法method，请求路径path
  // if (ctx.request.method === 'POST') {
  //
  // } else if (ctx.request.method === 'GET') {
  //   if (ctx.request.path !== '/') {
  //     ctx.response.type = 'html';
  //     ctx.response.body = '<a href="/">Go To Index</a>';
  //   } else {
  //     ctx.response.body = 'Hello World';
  //   }
  // }


  // curl -H "Accept:text/html" http://localhost:3000
  // curl -H "Accept:application/json" http://localhost:3000
  ctx.response.status = 200;
  console.log(ctx.request);
  if (ctx.request.accepts('json')) {
    console.log('json');
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else if (ctx.request.accepts('html')) {
    console.log('html');
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  } else {
    console.log("text");
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
});

app.listen(3000);