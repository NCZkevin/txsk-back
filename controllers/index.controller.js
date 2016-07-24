var cheerio = require('cheerio');
var charset = require('superagent-charset');
var request = charset(require('superagent'));

exports.getSlide = function (req,res) {
  var baseUrl1 = "http://youth.ncu.edu.cn/";
  var slideImg = [];
  request
    .get(baseUrl1)
    .charset('gbk')
    .end(function(err,sres){
      if (err) {
        res.json(err);
      }
      var $ = cheerio.load(sres.text);
      $('#slider  a > img').each(function(i,elem){
        var $elem = $(elem);
        if (i <= 5) {
          slideImg.push({
            src: baseUrl1 + $elem.attr('src')
          });
        }
      });
      res.json(slideImg);
    });
};
