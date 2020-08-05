const Koa = require('koa');
const app = new Koa();

// app use 里面是个函数，也就是中间件
// 要使用第二个中间件，就要改写前一个中间件
// 什么是中间呢？就是区分请求和响应
app.use(async(ctx, next) => {
  console.log(1);
  await next();
  console.log(2); // 发现打印了2次，是因为浏览器发了两次请求
  ctx.body = 'Hello World';
})

// 2
app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});

// 3
app.use(ctx => console.log(5));

app.listen(3000);

// ps 路由的本质也是中间件
// 如果没有路由，所有的请求都会返回相同的响应
// 无论是不同的路径、不同的url

/**
 * 路由的意义
 * 1. 处理不同的 url
 * 2. 处理不同的 http 方法
 * 3. 解析 url 上的参数
 */
