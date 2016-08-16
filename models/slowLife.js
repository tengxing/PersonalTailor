var  client = require('../config/db');
var moment = require('moment');
function  Article(username,author_name,title,content,category_name,date,tag_name,skim,comment,hits) {
    this.user = username;
    this.author_name = author_name;
    this.title = title;
    this.content = content;
    this.category_name = category_name;
    if (date) {
        this.date = moment(date).format('YYYY-MM-DD');
    } else {
        this.date =  moment(new Date ()).format('YYYY-MM-DD');
    }
    this.tag_name = tag_name;
    this.skim = skim;
    this.comment = comment;
    this.hits = hits;

}
mysql = client.getDbCon();
module.exports = Article;
Article.get =  function  get(username, callback) {
    var sql ="select b.author_name," +
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
        "comment f where a.id=e.article_id and a.aid = b.id  and a.cid= c.id and d.id = e.tag_id and e.comment_id=f.id and tag_name in('日志','欣赏','程序人生','经典语录')" ;
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            //将数据按照发布日期排序
            for(index=0;index<results.length;index++){
                var flag = 0;
                var data_s;
                if(flag == 1){
                    flag=0;
                    data_s = results.sort(
                        function(a,b){
                            return (new Date(a.date).getTime()- new Date(b.date).getTime());
                        }
                    );
                }else{
                    flag=1;
                    data_s = results.sort(
                        function(a,b){
                            return  (new Date(b.date).getTime()- new Date(a.date).getTime());
                        }
                    );
                }
            }
            callback(err,results,fields);

        }
    })
};