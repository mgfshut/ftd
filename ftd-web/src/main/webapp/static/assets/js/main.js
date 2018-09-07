/**
 * Created by ltl on 2018/8/9.
 * layui组件，及其他公共方法
 */
$(".custom-box").click(function(){
    if($(".custom-on").css("display")=="none"){
        $(".custom-on").show();
    }else{
        $(".custom-on").hide();
    }
});

$("#all").click(function(){
    if(this.checked){
        $("#list :checkbox").prop("checked", true);
    }else{
        $("#list :checkbox").prop("checked", false);
    }
});

layui.use(['form', 'layedit', 'laydate','layer','laypage'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,laypage = layui.laypage;

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        strLength32:[/^.{1,32}$/,'长度不能大于32个字符!!'],
        strLength256:[/^.{1,256}$/,'长度不能大于256个字符!!'],
        optionIsSelect:function (value){
            if(value == undefined || value === "0"){
                return '请在下拉框中选择!';
            }
        },
        title: function(value){
            if(value.length < 5){
                return '标题至少得5个字符啊';
            }
        }
        ,pass: [/(.+){6,12}$/, '密码必须6到12位']
        ,content: function(value){
            layedit.sync(editIndex);
        }
    });

    //监听提交
    form.on('submit(add)', function(data){
        add(data.field);
        return false;
    });
    //监听提交
    form.on('submit(update)', function(data){
        update(data.field);
        return false;
    });

    //执行一个laydate实例
    lay('.layDate').each(function () {
        laydate.render({
            elem: this //指定元素
            ,trigger: 'click'
            // ,range: true   //开启范围选择
            ,done: function(value, date, endDate){
                console.log(value); //得到日期生成的值，如：2017-08-18
                console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
    })

});