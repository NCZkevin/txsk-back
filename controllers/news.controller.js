var request = require('superagent');
var cheerio = require('cheerio');

exports.txskNews = function(req,res){
// 团学速递：http://news.youth.ncu.edu.cn/news/?list_11.html
// 院系动态：http://news.youth.ncu.edu.cn/news/?list_12.html
// 通知公告：http://news.youth.ncu.edu.cn/news/?list_13.html
  var txsd = [],
      yxdt = [],
      tzgg = [];
  request
    .get('http://news.youth.ncu.edu.cn/news/?list_11.html')
    .end(function(err,sres){
      if (err) {
        res.json(err);
      }
      var $ = cheerio.load(sres.text);
      $('.listArrow1 > ul > ul > li').each(function(i,elem){
        console.log(elem);
        var $elem = $(elem);
        // console.log($elem);
        txsd.push({
          title: $elem.attr('title'),
          href: $elem.attr('href')
        });
      });
      res.json(txsd);
    });
};
