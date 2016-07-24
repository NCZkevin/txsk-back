var News = require('../controllers/news.controller.js');
var Index = require('../controllers/index.controller.js');

module.exports = function(app){
//首页新闻
  app.get('/api/txsknews',News.txskNews);


//首页活动


//功能

//首页幻灯片
  app.get('/api/slide',Index.getSlide);
}
