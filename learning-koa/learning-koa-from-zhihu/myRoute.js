const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  if (ctx.url === '/') {
    ctx.body = 'Page index';
  } else if(ctx.url === '/users') {
    if (ctx.method === 'GET') {
      ctx.body = 'Page users, get';
    } else if (ctx.method === 'POST') {
      ctx.body = 'Page users, post';
    } else {
      ctx.status = 405; // 不允许
    }
  } else if (ctx.url.match(/\/users\/\w+/)){ // 解析 url 字符串
    const userId = ctx.url.match(/\/users\/(\w+)/)[1];
    ctx.body = `user id: ${userId}`;
  } else if (ctx.url = '/500') {
    ctx.status = 500;
  } else {
    ctx.status = 404;
  }
});

app.listen(3000);
