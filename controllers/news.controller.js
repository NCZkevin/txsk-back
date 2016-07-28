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
                href: baseUrl + $elem.attr('href').substr(2)
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
                    href: baseUrl + $elem.attr('href').substr(2)
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
//   var txsknews = {};
// //   function addnews(a) {
// //     txsknews.push(a);
// // }
// var pynew = function(url,callback) {
//   var xinwen;
//  request
//     .get(url)
//     .charset('gbk')
//     .end(function(err,sres){
//       if (err) {
//         res.json(err);
//       }
//       const news = [];
//       var $ = cheerio.load(sres.text);
//       $('.listArrow1  li > a').each(function(i,elem){
//         var $elem = $(elem);
//         if (i <= 5) {
//           news.push({
//             title: $elem.attr('title'),
//             href: baseUrl + $elem.attr('href').substr(2)
//           });
//         }
//       });
//       console.log(news);
//       callback(news);
//       xinwen = news;
//     });
//     return xinwen;
// };
// pynew('http://news.youth.ncu.edu.cn/news/?list_11.html',function(res){
//   // console.log(res);
//   // txsknews[1] = res;
//   // console.log(txsknews[1]);
//   // return txsknews;
//   txsknews = res;
//   console.log(txsknews);
// });
//     console.log(txsknews + "1");
//   res.json(txsknews);
};
