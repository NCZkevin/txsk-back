var cheerio = require('cheerio');
var charset = require('superagent-charset');
var request = charset(require('superagent'));

exports.txskNews = function(req,res){
// 团学速递：http://news.youth.ncu.edu.cn/news/?list_11.html
// 院系动态：http://news.youth.ncu.edu.cn/news/?list_12.html
// 通知公告：http://news.youth.ncu.edu.cn/news/?list_13.html
  var txsd = [],
      yxdt = [],
      tzgg = [];
  var baseUrl = "http://news.youth.ncu.edu.cn"
  request
    .get('http://news.youth.ncu.edu.cn/news/?list_11.html')
    .charset('gbk')
    .end(function(err,sres){
      if (err) {
        res.json(err);
      }
      var $ = cheerio.load(sres.text);
      $('.listArrow1  li > a').each(function(i,elem){
        var $elem = $(elem);
        if (i <= 5) {
          txsd.push({
            title: $elem.attr('title'),
            href: baseUrl + $elem.attr('href').substr(2)
          });
        }
      });
      request
        .get('http://news.youth.ncu.edu.cn/news/?list_12.html')
        .charset('gbk')
        .end(function(err,sres){
          if (err) {
            res.json(err);
          }
          var $ = cheerio.load(sres.text);
          $('.listArrow1  li > a').each(function(i,elem){
            var $elem = $(elem);
            if (i <= 5) {
              yxdt.push({
                title: $elem.attr('title'),
                href: $elem.attr('href')
              });
            }
          });
          request
            .get('http://news.youth.ncu.edu.cn/news/?list_13.html')
            .charset('gbk')
            .end(function(err,sres){
              if (err) {
                res.json(err);
              }
              var $ = cheerio.load(sres.text);
              $('.listArrow1  li > a').each(function(i,elem){
                var $elem = $(elem);
                if (i <= 5) {
                  tzgg.push({
                    title: $elem.attr('title'),
                    href: $elem.attr('href')
                  });
                }
              });
              var txsknews = {
                txsd: txsd,
                yxdt: yxdt,
                tzgg: tzgg
              };

              res.json(txsknews);
            });
        });
    });



};
