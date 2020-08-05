const Koa = require('koa');
const mongoose = require('mongoose');
const KoaRouter = require('koa-router');
const { connectionStr, connectionOpt } = require('./config');
const { reviews, movieDetails } = require('./model');

const app = new Koa();

mongoose.connect(
  connectionStr,
  connectionOpt,
  () => console.log('MongoDB 连接成功'),
);
mongoose.connection.on('error', console.error);

const router = new KoaRouter();

router.get('/user', async ctx => {
  let test = await reviews.find({
    reviewer: 'Matthew Samuel',
  });
  ctx.body = test;
})

router.post('/user', async ctx => {
  let test = await movieDetails.find({
    // title: 'A Million Ways to Die in the West',
    runtime: { $gte: 175, $lt: 180 },
  });
  ctx.body = test;
})

app.use(router.routes());

app.listen(3000, () => console.log('server 启动成功'));
