var express = require('express');
var router = express.Router();
//var Article = require('../models/article');
var Article = require('../models/all');
var SlowLife = require('../models/slowLife');
var templateTheme = require('../models/templateTheme');
/* 首页路由 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SF私人空间' });
});
//首页文章数据
router.post('/',function(req, res){
    Article.get( null, function (err, articles) {
        if (err) {
            articles = [];
        }
        console.log(articles);
        res.json(articles);
    });
});
//用户关于我们页面路由
router.get('/about',function(req,res){
    res.render('about',{title:'关于我们'})
});
//慢生活路由
/*router.get('/slowLife',function(req,res){
    res.render('slowLife',{title:'慢生活'})
});*/
router.get('/slowLife',function(req,res){
    var newAticle = new Article({
        tag_name:req.params.tag_name
    });
    newAticle.queryByTag0(newAticle.tag_name,function(err,article){
        return res.render('slowLife',{
            title:'慢生活',
            article:article
        })
    });
});
router.post('/slowLife',function(req,res){
    Article.get(null,function(err,article){
        res.json(article)
    });

});
//模板分享路由
router.get('/templateSharing',function(req,res){
    res.render('templateSharing',{title:'模板分享'})
});
router.post('/templateSharing',function(req,res){
    Article.get(null,function(err,article){
        res.json(article)
    });
    //res.render('templateSharing',{title:'模板分享'})
});
router.get('/templateSharing/:id',function(req,res){
    var newArticle = new Article({
        id:req.params.id
    });
    console.log(newArticle.id);
    newArticle.queryById(newArticle.id, function (err, detail) {
        if (err) {
            detail = [];
        }
        console.log(detail);
        for(var i = 0;i <detail.length;i++){
            res.sendfile(detail[i].url);
        }

    });
});
//模板主题路由
router.get('/templateTheme',function(req,res){
    res.render('templateTheme',{title:'模板主题'})
});
//模板主题数据路由
router.post('/templateTheme',function(req, res){
    var newAticle = new Article({
        tag_name:req.params.tag_name
    });
    newAticle.queryByTag1(newAticle.tag_name, function (err, article) {
        if (err) {
            article = [];
        }
        res.json(article);
    });
});
//文章详情页路由
router.post('/detail',function(req,res){
    var newAticle = new Article({
        tag_name:req.params.tag_name
    });
    newAticle.queryByTag1( newAticle.tag_name, function (err, article) {
        if (err) {
            article = [];
        }
        res.json(article);
    });
});
//文章详情页数据路由
router.get('/detail/:id',function(req, res){
    var  newArticle =  new  Article({
        id:req.params.id
    });
    newArticle.queryById(newArticle.id, function (err, detail) {
        if (err) {
            detail = [];
        }
        for(var i = 0; i<detail.length; i++){
            var title = detail[i].title;
        }
        res.render('detail',{
            detail:detail,
            title:title
        });
    });
});





//失败页面路由
router.get('/fail',function(req,res){
    res.render('fail',{title:'失败！！！'})
});
//错误页面路由
router.get('/error',function(req, res){
    res.render('admin/Views/error', {title: '网页未找到'});
});
module.exports = router;