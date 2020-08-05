const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 路由配置
// 1. 解析路径
router.get('/', ctx => {
  ctx.body = 'Page index';
});
router.get('/users', ctx => {
  ctx.body = 'Page users';
})
// 2. 处理不同方法
router.post('/users', ctx => {
  ctx.body = 'Page users, post.'
})
// 3. 解析 url 参数
router.get('/users/:name', ctx => {
  ctx.body = `the user's name is: ${ctx.params.name}`;
})

// 路由注册
app.use(router.routes());

app.listen(3000);
