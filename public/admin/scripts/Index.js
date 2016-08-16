$(function () {
    $(".content-left,.contents-right").height($(window).height() - 150);
    $('.accordion-inner').click(function(){
        var index = $(this).index();
        $('.Management').eq(index).show().siblings().hide();
    });
    //管理员的ajax
    $.ajax({
        type:'post',
        url: '/admin',
        contentType:"application/json",
        success:function(data){
            $.each(data, function (index, item) {
                //循环获取数据
                //var id = data[index].id;
                var user = data[index].user;
                var password = data[index].password;
                var re_password = data[index].re_password;
                var professional = data[index].professional;
                var origin = data[index].origin;
                var tel = data[index].tel;
                var email = data[index].email;
                var time = data[index].time;
                var html ="<tr><td class='author_id'>--</td><td>"+user+"</td><td> "+ password +"</td><td>" + re_password +"</td><td>" + professional +"</td><td>" + origin +"</td><td>" + tel +"</td><td>"+email+"</td><td>" + time +"</td><td style='display:table-cell' data-toggle='modal' data-target='#myModal' onclick='open_update()' class='btn btn-success'>修改</td><td style='display:table-cell' data-toggle='modal' data-target='#myModal' onclick='open_delete()' class='btn btn-danger'>删除</td></tr>";
                $("#tbody1").append(html);
            });
        },
        error:function(){
            alert('error== ' + arguments[1]);
        }
    });
    //用户管理的ajax
    $.ajax({
        type:'post',
        url: '/admin',
        contentType:"application/json",
        success:function(data){
            $.each(data, function (index, item) {
                //循环获取数据
                var id = data[index].id;
                var user = data[index].user;
                var password = data[index].password;
                var html ="<tr><td class='author_id'>--</td><td>"+user+"</td><td> "+ password +"</td><td style='display:table-cell' data-toggle='modal' data-target='#myModal' onclick='open_update()' class='btn btn-success'>修改</td><td style='display:table-cell' data-toggle='modal' data-target='#myModal' onclick='open_delete()' class='btn btn-danger'>删除</td></tr>";
                $("#tbody2").append(html);
            });
        },
        error:function(){
            alert('error== ' + arguments[1]);
        }
    })
});
$(".accordion-inner").click(function () {
    $(".active").html($(this).find(".left-body").text());
});

$(window).resize(function () {
    $(".content-left,.contents-right").height($(window).height() - 150);
});


/*function open_update() {
    $("#myModalLabel").text("更新用户资料......");
    //$("input").val("");
    $("#addModal").modal("show");
    $("#add").show();
    $("#edt").hide();
    $('#updateUser').show().siblings().hide();
}*/
/*function open_add() {
    $("#myModalLabel").text("添加用户......");
    //$("input").val("");
    $("#addModal").modal("show");
    $("#add").show();
    $("#edt").hide();
    $('#addUser').show().siblings().hide();
}*/
/*function open_delete(){
    $("#myModalLabel").text("删除用户......");
    $('#deleteUser').show().siblings().hide();
}
$(function(){




    $('#tbody>tr>td').click(function(){
        var value = $(this).parent().find('td').eq(0).text();
        $(".author_id").attr({value:value,'readonly': true});
        $(".author_id").css({'background-color':'#EBEBE4','border':'#9AA9A9 solid 1px'})
    })
});*/
/*var curr = 1;
$(function () {
    load(curr);
});*/
/*
function load(curr) {
    console.log('+++++++++++++');
    $.ajax({
        url: "/Views/queryAll",
        timeout: 300000,
        dataType: "json",
        type: "get",
        data: { "flag": "load", "curr": curr },
        success: function (data) {

            var html = "";
            $.each(data.items, function (i, item) {
                html += " <tr> " +
                    " <td>" + item.userName + "</td> " +
                    " <td>" + item.Chinese + "</td> " +
                    " <td>" + item.Math + "</td> " +
                    " <td>" + item.English + "</td> " +
                    " <td><a class=\"btn btn-info\" onclick='openedt(\"" + item.userName + "\");'>修改</a>&nbsp;&nbsp;<a class=\"btn btn-warning\" onclick='del(\"" + item.userName + "\");'>删除</a></td> " +
                    " </tr>";
            })
            $("#tbody").html(html);
            /!*laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(data.cnt / 10), //通过后台拿到的总页数
                skin: "#49afcd",
                curr: curr || 1, //当前页
                jump: function (obj, first) { //触发分页后的回调
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        curr = obj.curr;
                        load(curr);
                    }
                }
            });*!/

        }
    })
}*/
