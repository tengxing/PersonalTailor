var  client = require('../config/db');
var moment = require('moment');
function  Article(username,id,author_name,title,content,category_name,date,tag_name,skim,comment,hits) {
    this.user = username;
     this.id = id;
    this.author_name = author_name;
    this.title = title;
    this.content = content;
    this.category_name = category_name;
    if (date) {
        this.date = moment(date).format('YYYY-MM-DD');
    } else {
        this.date =  moment(new Date ()).format('YYYY-MM-DD');
        console.log('-----------------************' + this.date);
    }
    this.tag_name = tag_name;
    this.skim = skim;
    this.comment = comment;
    this.hits = hits;

}
mysql = client.getDbCon();
module.exports = Article;
Article.get =  function  get(username, callback) {
    //var sql ="select b.author_name,a.title,a.content,c.category_name,a.date,a.skim,a.hits,a.comment from article a,author b,category c where b.id=a.aid and c.id=a.cid ";
    var sql ="select a.id," +
        "b.author_name," +
        "a.title," +
        "a.content," +
        "c.category_name," +
        "a.date," +
        "a.skim," +
        "a.hits," +
        "d.tag_name," +
        "f.text from " +
        "article a," +
        "author b," +
        "category c," +
        "tag d," +
        "tag_relationship e," +
        "comment f where a.id=e.article_id and a.aid = b.id  and a.cid= c.id and d.id = e.tag_id and e.comment_id=f.id" ;
    //var sql ="select b.author_name,a.title,a.content,c.category_name,a.date,a.skim,a.hits,d.tag_name,a.comment from article a,author b,category c,tag d,tag_relationship e where e.article_id=a.id and e.tag_id=d.id and e.author_id=b.id and c.id=a.cid ";
    /*if(username){
        sql +=" and p.username='"+username+"'";
    }*/
    console.log(sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            callback(err,results,fields);

        }
    })
};