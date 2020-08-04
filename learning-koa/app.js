const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace with DB
const things = ['My Family', 'Programming', 'Music'];

// BodyParser Middleware
app.use(bodyParser()); // 记得这里有括号

// Add additional properties to context
app.context.name = 'Rongzhao Tan';

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
})

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add); // you can use the same route for different methods

// List of things
async function index(ctx) {
  await ctx.render('index', {
    title: "Things I Love:",
    things,
  });
}

// Show add page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

// test
router.get('/test', ctx => (ctx.body = `Hello, ${ctx.name}!`));

// params such as -> /test/tom
router.get('/test/:name', ctx => (ctx.body = `Nice, ${ctx.params.name}!`));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started...'));
