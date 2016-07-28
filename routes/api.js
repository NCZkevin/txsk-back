var News = require('../controllers/news.controller.js');
var Index = require('../controllers/index.controller.js');
var Query = require('../controllers/query.controller.js');

module.exports = function(app){
//首页新闻
  app.get('/api/txsknews',News.txskNews);
//首页幻灯片
  app.get('/api/slide',Index.getSlide);

//首页活动


//功能
  app.get('/api/queryele',Query.getEle);

}
