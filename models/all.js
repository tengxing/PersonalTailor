var  client = require('../config/db');
var moment = require('moment');
function  Article(article) {
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
    article=({
        id:this.id,
        author_name:this.author_name,
        title:this.title,
        content:this.content,
        category_name:this.category_name,
        date:this.date,
        tag_name:this.tag_name,
        skim:this.skim,
        comment:this.comment,
        hits:this.hits
    });
    var sql ="select a.id," +
        "b.author_name," +
        "a.title," +
        "a.content," +
        "c.category_name," +
        "a.date," +
        "a.skim," +
        "a.hits," +
        "d.tag_name," +
        "f.text," +
        "f.tourist from " +
        "article a," +
        "author b," +
        "category c," +
        "tag d," +
        "tag_relationship e," +
        "comment f where a.id=e.article_id and a.aid = b.id  and a.cid= c.id and d.id = e.tag_id and e.comment_id=f.id" ;
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            callback(err,results,fields);

        }
    })
};
/*Article.prototype.queryByTag =  function  queryByTag(article, callback) {
    article=({
        user:this.user,
        id:this.id,
        author_name:this.author_name,
        title:this.title,
        content:this.content,
        category_name:this.category_name,
        date:this.date,
        tag_name:this.tag_name,
        skim:this.skim,
        comment:this.comment,
        hits:this.hits
    });
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
};*/
Article.prototype.queryByTag0 =  function  queryByTag0(article, callback) {
    article=({
        user:this.user,
        id:this.id,
        author_name:this.author_name,
        title:this.title,
        content:this.content,
        category_name:this.category_name,
        date:this.date,
        tag_name:this.tag_name,
        skim:this.skim,
        comment:this.comment,
        hits:this.hits
    });
    var sql ="select b.author_name," +
        "a.id," +
        "a.title," +
        "a.content," +
        "c.category_name," +
        "a.date," +
        "a.skim," +
        "a.hits," +
        "d.tag_name," +
        "f.text," +
        "f.tourist," +
        "f.datetime from " +
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
            Date.prototype.Format = function(fmt) {
                var o = {
                    "M+" : this.getMonth()+1,                 //月份
                    "d+" : this.getDate(),                    //日
                    "h+" : this.getHours(),                   //小时
                    "m+" : this.getMinutes(),                 //分
                    "s+" : this.getSeconds(),                 //秒
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    "S"  : this.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            };
            function GetDateDiff(begintime, endtime) {
                var STS = Date.parse(new Date(begintime.replace(/-/g, "/"))); //begintime 为开始时间
                var ETS = Date.parse(new Date(endtime.replace(/-/g, "/")));   // endtime 为结束时间
                var date1=new Date(STS);  //开始时间
                var date2=new Date(ETS);    //结束时间
                var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
                //计算出相差天数
                var days=Math.floor(date3/(24*3600*1000));
                //计算出小时数
                var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000));
                //计算相差秒数
                var leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000);
                resultes="距今"+days+"天"+hours+"小时"+minutes+"分"+seconds+"秒";
                return resultes;
            }
            for(var i = 0;i < results.length; i++){
                var stTime = (new Date(results[i].datetime)).Format("yyyy-MM-dd hh:mm:ss.S");
                var endTime = ((new Date()).Format("yyyy-MM-dd hh:mm:ss.S"));
                results[i].datetime = GetDateDiff(stTime, endTime);
            }

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
Article.prototype.queryByTag1 =  function  queryByTag1(article, callback) {
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
        "comment f where a.id=e.article_id and a.aid = b.id  and a.cid= c.id and d.id = e.tag_id and e.comment_id=f.id and tag_name in('个人博客模板','企业网站模板','个人作品','国外Html5模板')" ;
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
        "a.url," +
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