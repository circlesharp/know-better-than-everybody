const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({ prefix: '/users' });

async function auto(ctx, next) {
  if (ctx.params.id !== 'circl') {
    ctx.status = 401; // 这样没有抛出错误
    ctx.throw(401);
  }
  await next();
}

router.get('/', ctx => ctx.body = 'Page users');
router.get('/:id', auto, ctx => ctx.body = `Page users, id is: ${ctx.params.id}`);

app.use(router.routes());

app.listen(3000);
