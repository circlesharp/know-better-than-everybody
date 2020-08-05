const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// 路由配置 - 简单
const router = new Router();
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

// 路由配置 - 高级点(多实例)
const homeRouter = new Router({ // 再实例化一个 router
  prefix: '/home', // 配置前缀
});
homeRouter.get('/', ctx => ctx.body = 'Page home');
// http://localhost:3000/home/sz
homeRouter.get('/:address', ctx => {
  ctx.body = `Page home, address is: ${ctx.params.address}`;
});

// 路由注册
app.use(router.routes());
app.use(homeRouter.routes());

/**
 * allowedMethods
 * 1. 能响应客户端的 options 请求
 * 2. 返回 405（不允许），501（为实现）
 */

app.use(homeRouter.allowedMethods());

app.listen(3000);
