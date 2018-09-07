
layui.use('layer', function(){ //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    //触发事件-----单击显示弹窗
    var active = {
        //添加弹窗
        notice: function(){
            //示范一个公告层
            layer.open({
                type: 2
                ,title: "添加" //不显示标题栏
                ,closeBtn: "1"
                ,area: ['100%', '100%']
                ,shade: 0.2
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,moveType: 1 //拖拽模式，0或者1
                ,content: path+'/company/add'
            });
        }
        //修改弹窗
        ,notice2: function(){
            var id = getSelectOption();
            //示范一个公告层
            if(id != undefined){
                layer.open({
                    type: 2
                    ,title: "修改" //不显示标题栏
                    ,closeBtn: "1"
                    ,area: ['100%', '100%']
                    ,shade: 0.2
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content:path+'/company/add?id='+id
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
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,btn: ['确认', '关闭']
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div class="tab-cancel">确定删除选中信息吗？</div>'
                ,success: function(layero){
                    var btn = layero.find('.layui-layer-btn');
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