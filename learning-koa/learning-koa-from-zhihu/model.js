const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// type 会自动转类型
// const userSchema = new Schema();
// const userSchema = new Schema({
//   name: { type: String, required: true },
//   age: { type: Number, default: 0 },
// });

// 智障的，会给 collections 自动增加 s 结尾……
const movieSchema = new Schema({}, { collection: 'movieDetails' });

// model 的第一个参数就是集合名
// module.exports = model('movieDetails', new Schema());
module.exports = {
  reviews: model('reviews', new Schema()),
  movieDetails: model('movieDetails', movieSchema),
}
