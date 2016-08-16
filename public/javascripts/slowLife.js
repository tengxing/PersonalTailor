$(function(){
    //推荐文章列表数据
    $.ajax({
        type:'post',
        url:'/slowLife',
        timeout:'',
        dataType:'json',
        success:function(data){
            console.log(data);
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
                    var title = data_s[index].title;
                    var html2 = "<li><a href='/detail/" + id + "' target='_blank'>" + title + "</a></li>";
                    //$('.tj_t1_list').append(html2);
                    var liL = $('.tj_t1_list>li').length + 1;
                    if(liL<=5){
                        $('.tj_t1_list').append(html2);
                    }
                }
                dateOrder();

            });
        },
        error:function(data){
            alert('parseError:' + arguments[1])
        }
    })
});
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