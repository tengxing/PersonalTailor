var  client = require('../config/db');
var moment = require('moment');
function Article(article) {
    this.id = article.id;
    this.author_name = article.author_name;
    this.title = article.title;
    this.content = article.content;
    this.category_name = article.category_name;
    this.date = article.date;
    this.tag_name = article.tag_name;
    this.skim = article.skim;
    this.comment = article.comment;
    this.hits = article.hits;
}
mysql = client.getDbCon();
module.exports = Article;
Article.get =  function  get(article, callback) {
    var sql ="select a.id," +
        "b.author_name," +
        "a.title," +
        "a.content," +
        "c.category_name," +
        "a.date," +
        "a.skim," +
        "a.hits," +
        "a.keywords," +
        "d.tag_name," +
        "f.text," +
        "f.tourist," +
        "f.datetime from " +
        "article a," +
        "author b," +
        "category c," +
        "tag d," +
        "tag_relationship e," +
        "comment f where a.id=e.article_id and a.aid = b.id  and a.cid= c.id and d.id = e.tag_id and e.comment_id=f.id and tag_name in('个人博客模板','企业网站模板')" ;
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            return callback(err,results,fields);

        }
    })
};
Article.prototype.queryById =  function  queryById(article,callback) {
      article = {
        id:this.id,
        author_name: this.author_name,
        title: this.title,
        content:this.content,
        category_name:this.category_name,
        date:this.date,
        tag_name:this.tag_name,
        skim:this.skim,
        comment:this.comment,
        hits:this.hits
    };
    var sql ="select a.id," +
        "b.author_name," +
        "a.title," +
        "a.content," +
        "c.category_name," +
        "a.date," +
        "a.skim," +
        "a.hits," +
        "a.keywords," +
        "d.tag_name," +
        "f.text," +
        "f.tourist," +
        "f.datetime from " +
        "article a," +
        "author b," +
        "category c," +
        "tag d," +
        "tag_relationship e," +
        "comment f where a.id=e.article_id and a.aid = b.id  and a.cid= c.id and d.id = e.tag_id and e.comment_id=f.id and a.id=?" ;
    mysql.query(sql,[article.id],function(err,results,fields){
        if(err){
            throw err;
        }else{
            return callback(err,results,fields);
        }
    })
};