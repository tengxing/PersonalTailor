$(function(){
    //推荐文章列表数据
    $.ajax({
        type:'post',
        url:'/',
        timeout:'',
        dataType:'json',
        success:function(data){
            $.each(data,function(index,item){
                //将数据按照时间进行排序
                var flag = 0;
                function dateOrder(){
                    var data_s;
                    if(flag == 1){
                        flag=0;
                        data_s = data.sort(
                            function(a,b){
                                return (new Date(a.date).getTime()- new Date(b.date).getTime());
                            }
                        );
                    }else{
                        flag=1;
                        data_s = data.sort(
                            function(a,b){
                                return  (new Date(b.date).getTime()- new Date(a.date).getTime());
                            }
                        );
                    }
                    var id = data_s[index].id;
                    var author_name = data_s[index].author_name;
                    var title = data_s[index].title;
                    var date = data_s[index].date,
                        datas = new Date(date),
                        year = datas.getFullYear(),  //获取年
                        month = datas.getMonth() + 1,    //获取月
                        day = datas.getDate(); //获取日
                    //hours = datas.getHours(),
                    //minutes = datas.getMinutes();
                    date = year + "-" + month + "-" + day/* + "-" + " " + hours + ":" + minutes*/;
                    var category_name = data_s[index].category_name;
                    var tag_name = data_s[index].tag_name;
                    var skim = data_s[index].skim;
                    var comment = data_s[index].comment;
                    var hits = data_s[index].hits;
                    var content = data_s[index].content;
                    if(category_name=='推荐文章'){
                        var html ="<div class='blogs'>" +
                            "<h3><a href='javascript:;'>" + title +"</a></h3>" +
                            "<figure><img src='images/01.jpg' ></figure>" +
                            "<ul class='contentBox'><p class='content_text'>" + content + "</p>" +
                            "<a href='/detail/" + id + "' target='_blank' class='readmore'>阅读全文&gt;&gt;</a>" +
                            "</ul>" +
                            "<p class='autor'><span>作者：" + author_name + "</span><span>分类：【<a href='/'>" + tag_name + "</a>】</span><span>浏览（<a href='/'>" + skim +"</a>）</span><span>评论（<a href='/'>30</a>）</span></p>" +
                            "<div class='dateview'>" +date + "</div></div>";
                        var html2 = "<li><a href='/detail/" + id + "' target='_blank'>" + title + "</a></li>";
                        $('.bloglist').append(html);
                        $('.tj_t1_list2').append(html2);
                        /*for(var i=0; i<index; i++){
                            var text = document.getElementsByClassName('content_text')[i];
                            $clamp(text,{clamp: 4,useNativeClamp: false});
                        }*/
                        var key = $('.content_text').length;
                        for(var i=0; i<key; i++){
                            var text="";
                            text = (document.getElementsByClassName('content_text')[i]).innerHTML;
                            var newT = text.slice(0,100);
                            if(newT.length>=100){
                                newT = text.slice(0,100) + "···"
                            }else{
                                newT = text.slice(0,100)
                            }
                            document.getElementsByClassName('content_text')[i].innerHTML=newT;
                        }
                    }else if(data_s[index].category_name=='最新文章'){
                        var html1 = "<li><a href='/detail/" + id + "' target='_blank'>" + title + "</a></li>";
                        $('.tj_t1_list1').append(html1);
                    }
                }
                dateOrder();
            });
        },
        error:function(){
            alert('parseError:' + arguments[1])
        }
    })
});
/*
var key = $('.content_text').length;
alert(key);
for(var i=0; i<key; i++){
    var text="";
    text = (document.getElementsByClassName('content_text')[i]).innerHTML;
    var newT = text.slice(0,100) + "···";
    document.getElementsByClassName('content_text')[i].innerHTML=newT;
}*/
