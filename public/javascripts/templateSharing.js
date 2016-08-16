$(function(){
    //推荐文章列表数据
    $.ajax({
        type:'post',
        url:'/templateSharing',
        timeout:'',
        dataType:'json',
        success:function(data){
            $.each(data,function(index,item){
                var id = data[index].id;
                var title = data[index].title;
                var date = data[index].date,
                    datas = new Date(date),
                    year = datas.getFullYear(),  //获取年
                    month = datas.getMonth() + 1,    //获取月
                    day = datas.getDate(); //获取日
                date = year + "-" + month + "-" + day/* + "-" + " " + hours + ":" + minutes*/;
                var text = data[index].text;
                var tourist = data[index].tourist;
                if(data[index].tag_name=='个人博客模板'){
                    var html1 ="<li><a href='/templateSharing/" + id +"' target='_blank'><img src='images/t00.jpg'></a><span>" + title + "</span></li>";
                    $('#personal').append(html1);
                }else if(data[index].tag_name=='企业网站模板'){
                    var html2 ="<li><a href='/templateSharing/" + id +"' target='_blank'><img src='images/t00.jpg'></a><span>" + title + "</span></li>";
                    $('#company').append(html2);
                }else if(data[index].tag_name=='个人作品'){
                    var html3 ="<li><a href='/templateSharing/" + id +"' target='_blank'><img src='images/t00.jpg'></a><span>" + title + "</span></li>";
                    $('#private').append(html3);
                }else if(data[index].tag_name=='国外Html5模板'){
                    var html3 ="<li><a href='/templateSharing/" + id +"' target='_blank'><img src='images/t00.jpg'></a><span>" + title + "</span></li>";
                    $('#abroad').append(html3);
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
                var html1 = "<li><a href='/detail/" + id + "' target='_blank'>" + title + "</a></li>";
                var html2 = "<dl>" +
                    "<dt><img src='images/s8.jpg'> </dt>" +
                    "<dt> </dt>" +
                    "<dd>" + tourist +
                    "<time>距今" + result.day + "天" + result.hour + "小时" + result.second + "分</time>" +
                    "</dd>" +
                    "<dd><a href='/'>" + text + "</a></dd>" +
                    "</dl>";
                var liL2 = $('.pl_n>dl').length + 1;
                if(liL2<=5){
                    $('.tjlist').append(html1);
                    $('.pl_n').append(html2);
                }
            });
        },
        error:function(){
            alert('parseError:' + arguments[1])
        }
    });
});