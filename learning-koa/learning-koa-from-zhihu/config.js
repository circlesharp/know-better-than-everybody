module.exports = {
  // connectionStr: mongo mongodb+srv://sandbox.9rfdx.mongodb.net/test' --username circl --password codemao666,
  connectionStr: 'mongodb+srv://circl:codemao666@sandbox.9rfdx.mongodb.net/video?retryWrites=true&w=majority',
  connectionOpt: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  secret: 'zhihu-jwt-secret',
  expiresIn: '1d'
}