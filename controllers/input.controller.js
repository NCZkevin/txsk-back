var multer  = require('multer')
var fs =require("fs")
var upload = multer({ dest: 'uploads/' })
var imageup = upload.single('file')     	   
exports.imageInput = function (req, res) {
  imageup(req, res, function (err) {
        //添加错误处理
    if (err) {
         return  console.log(err);
    } 
        //文件信息在req.file或者req.files中显示。
    var file = req.file;
    console.log(req.file);
    fs.renameSync(file.path,"uploads/"+file.originalname);
    res.send(file.path)
  });
 };
 exports.getAllimage = function (req,res) {
 	var images = [];
 	function read (name,size) {
 		images.push({
 			name : name,
 			size : size
 		})
 	}
 	fs.readdir('uploads/',function (err,files){
 		for (var i = files.length-1; i >= 0; i--) {
 			fs.stat(files[i], function(err, stat){
				read(files[i],stat);
			});
 		}
 		res.json(files);
 	});
 }
