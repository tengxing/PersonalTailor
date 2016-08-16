$(function(){
    //推荐文章列表数据
    $.ajax({
        type:'post',
        url:'/templateTheme',
        timeout:'',
        dataType:'json',
        success:function(data){
            $.each(data,function(index,item){
                var id = data[index].id;
                var author_name = data[index].author_name;
                var title = data[index].title;
                var date = data[index].date,
                    datas = new Date(date),
                    year = datas.getFullYear(),  //获取年
                    month = datas.getMonth() + 1,    //获取月
                    day = datas.getDate(); //获取日
                date = year + "-" + month + "-" + day/* + "-" + " " + hours + ":" + minutes*/;
                var category_name = data[index].category_name;
                var tag_name = data[index].tag_name;
                var skim = data[index].skim;
                var comment = data[index].comment;
                var hits = data[index].hits;
                var content = data[index].content;
                var text = data[index].text;
                var tourist = data[index].tourist;
                var keywords = data[index].keywords;
                console.log(data);
                if(data[index].tag_name=='个人博客模板'){
                    var html ="" +
                        "<h2 class='about_h'>您现在的位置是：<a href='/'>首页</a>><a href='1/'>模板分享</a>><a href='1/'>" + tag_name +"</a></h2>" +
                        "<div class='index_about'>" +
                            "<h2 class='c_titile'>" + title + "</h2>" +
                            "<p class='box_c'><span class='d_time'>发布时间：" + date + "</span><span>编辑：" + author_name + "</span><span>浏览（" + skim +"）</span><span>评论（14）</span></p>" +
                            "<ul class='infos'>" +
                                "<p>" + content +"</p>" +
                            "</ul>" +
                            "<div class='keybq'>" +
                                "<p><span>关键字词</span>：" + keywords + "</p>" +
                            "</div>" +
                            "<div class='nextinfo'>" +
                                "<p>上一篇：<a href='/news/s/2013-09-04/606.html'>程序员应该如何高效的工作学习</a></p>" +
                                "<p>下一篇：<a href='/news/s/2013-10-21/616.html'>柴米油盐的生活才是真实</a></p>" +
                            "</div>" +
                            "<div class='otherlink'>" +
                                "<h2>相关文章</h2>" +
                                "<ul>" +
                                    "<li><a href='/news/s/2013-07-25/524.html' title='现在，我相信爱情！'>现在，我相信爱情！</a></li>" +
                                    "<li><a href='/newstalk/mood/2013-07-24/518.html' title='我希望我的爱情是这样的'>我希望我的爱情是这样的</a></li>" +
                                    "<li><a href='/newstalk/mood/2013-07-02/335.html' title='有种情谊，不是爱情，也算不得友情'>有种情谊，不是爱情，也算不得友情</a></li>" +
                                    "<li><a href='/newstalk/mood/2013-07-01/329.html' title='世上最美好的爱情'>世上最美好的爱情</a></li>" +
                                    "<li><a href='/news/read/2013-06-11/213.html' title='爱情没有永远，地老天荒也走不完'>爱情没有永远，地老天荒也走不完</a></li>" +
                                    "<li><a href='/news/s/2013-06-06/24.html' title='爱情的背叛者'>爱情的背叛者</a></li>" +
                                "</ul>" +
                            "</div>" +
                        "</div>";
                    $('article').append(html);
                }
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
                    //results=" 距今 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒";
                    results={
                        day:days,
                        hour:hours,
                        minute:minutes,
                        second:seconds
                    };
                    return results;
                }
                var stTime = (new Date(date)).Format("yyyy-MM-dd hh:mm:ss.S");
                var endTime = ((new Date()).Format("yyyy-MM-dd hh:mm:ss.S"));
                var result = GetDateDiff(stTime, endTime);
                var html2 = "<dl>" +
                    "<dt><img src='images/s8.jpg'> </dt>" +
                    "<dt> </dt>" +
                    "<dd>" + tourist +
                    "<time>" + result.day + "天" + result.hour + "小时" + result.second + "分钟前</time>" +
                    "</dd>" +
                    "<dd><a href='/'>" + text + "</a></dd>" +
                    "</dl>";
                $('.pl_n').append(html2);
                    var html1 = "<li><a href='/detail/" + id + "' target='_blank'>" + title + "</a></li>";
                    $('.tjlist').append(html1);
            });
        },
        error:function(){
            alert('parseError:' + arguments[1])
        }
    });
});