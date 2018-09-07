layui.use(['form', 'laydate','layer'], function() {
    var form = layui.form;
    form.on('submit(formSubmit)', function(data){
        $.ajax({
            url:path+"/userBack/updatePasswordAjax",
            type:"post",
            data:$("form").serialize(),
            dataType:"json",
            success:function(json){
                if(json.errorcode==0){
                    layer.msg(json.message, {time:1000}, function(){
                        window.location.href=path+'/home';
                    });
                }else{
                    layer.msg(json.message);
                }
            },
            error:function(json){
                layer.msg("操作失败！");
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
});