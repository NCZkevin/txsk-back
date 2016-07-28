var cheerio = require('cheerio');
// var charset = require('superagent-charset');
// var request = charset(require('superagent'));
var request = require('request');

exports.getEle = function (req,res) {
  // request
  //   .post("http://222.204.3.210/ssdf/Account/LogOn")
  //   .set('Content-Type', 'application/json')
  //   .send({ UserName : '221004'})
  //   .end(function (err,sres) {
  //     if (err) {
  //       res.send(err);
  //     }
  //     res.send(sres);
  //     // res.json(sres.text);
  //   });
  request.post({url:'http://222.204.3.210/ssdf/Account/LogOn', form: {UserName:'221004'}},
    function(err,httpResponse,body){
      res.send(httpResponse);
    });
};
