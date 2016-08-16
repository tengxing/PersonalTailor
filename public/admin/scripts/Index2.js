function open_update() {
    $("#myModalLabel").text("更新用户资料......");
    $("#author_id").attr("readonly", false);
    $("input").val("");
    $("#addModal").modal("show");
    $("#add").show();
    $("#edt").hide();
    $('#updateUser').show().siblings().hide();
}
function open_add(){
    $("#myModalLabel").text("添加用户......");
    $("#author_id").attr("readonly", false);
    $("input").val("");
    $("#addModal").modal("show");
    $("#add").show();
    $("#edt").hide();
    $('#addUser').show().siblings().hide();
}
$(function(){

});