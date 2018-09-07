//单击显示与隐藏功能而引用jquery-1.11.2.min.js插件
$(".custom-box").click(function(){
    if($(".custom-on").css("display")=="none"){
        $(".custom-on").show();
    }else{
        $(".custom-on").hide();
    }
});

//列表全选或全不选功能，也引用jquery-1.11.2.min.js插件
$("#all").click(function(){
    if(this.checked){
        $("#list :checkbox").prop("checked", true);
    }else{
        $("#list :checkbox").prop("checked", false);
    }
});
//说明：
//该js主要用于加载动态模态框功能及其样式
//引用layui.js插件
//各类弹窗均以notice+n来命名

layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;
        //日期时间选择器
        laydate.render({
            elem: '#create_start_time'
            ,type: 'datetime'
        });
        laydate.render({
            elem: '#create_end_time'
            ,type: 'datetime'
        });
        laydate.render({
            elem: '#update_start_time'
            ,type: 'datetime'
        });
        laydate.render({
            elem: '#update_end_time'
            ,type: 'datetime'
        });

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

    /*//监听提交
    form.on('submit(add)', function(data){
        add(data.field);
        return false;
    });*/
});
layui.use('layer', function(){ //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    //触发事件-----单击显示弹窗
    var active = {
        //添加弹窗
        notice: function(){
            //示范一个公告层
            layer.open({
                type: 2
                ,title: "添加用户" //不显示标题栏
                ,closeBtn: "1"
                ,area: ['100%', '100%']
                ,shade: 0.2
                ,maxmin:true
                ,id: 'LAY_layuiUserBack' //设定一个id，防止重复弹出
                ,moveType: 1 //拖拽模式，0或者1
                ,content: path+'/userBack/add'
            });
        }
        //修改弹窗
        ,notice2: function(){
            var id = getSelectOption();
            //示范一个公告层
            if(id != undefined){
                layer.open({
                    type: 2
                    ,title: "修改用户" //不显示标题栏
                    ,closeBtn: "1"
                    ,maxmin:true
                    ,area: ['100%', '100%']
                    ,shade: 0.2
                    ,id: 'LAY_layuiUserBack' //设定一个id，防止重复弹出
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content:path+'/userBack/add?id='+id
                    ,success: function(layero){
                    }
                });
            }
        }
        //删除弹窗
        ,notice3: function(){
            //示范一个公告层
            var length = $('input:checkbox[name=pageCheckBox]:checked').length;
            if(length == 0){
                layer.alert("至少选择一条记录删除!!", {
                    title: '提示信息',
                })
                return;
            }else if(length > 10){
                layer.alert("最多一次刪除10条记录!!", {
                    title: '提示信息',
                })
                return;
            }
            layer.open({
                type: 1
                ,title: "提示信息" //不显示标题栏
                ,closeBtn: "1"
                ,area: '300px;'
                ,shade: 0.2
                ,id: 'LAY_layuiUserBack' //设定一个id，防止重复弹出
                ,btn: ['确认', '关闭']
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div style="padding: 50px; line-height: 22px; background-color: #f1f1f1; color: #333; font-weight: 300;">确定删除选中信息吗？<i class="menu-icon fa fa-warning"></i></div>'
                ,success: function(layero){
                    var btn = layero.find('.layui-layer-btn');
                    btn.css('text-align', 'center');
                    btn.find('.layui-layer-btn0').attr({
                        href: 'javascript:deleteById();'
                        ,target: '_self'
                    });
                }
            });
        }
    };

    $('#LAY_demo .layui-btn').on('click', function(){
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });

});