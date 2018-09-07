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

//
 layui.use(['form', 'layedit', 'laydate'], function(){
		        var form = layui.form
		            ,layer = layui.layer
		            ,layedit = layui.layedit
		            ,laydate = layui.laydate;
		
		        //创建一个编辑器
		        var editIndex = layedit.build('LAY_demo_editor');
		
		        //自定义验证规则
		        form.verify({
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
		        form.on('submit(demo1)', function(data){
		            layer.alert(JSON.stringify(data.field), {
		                title: '最终的提交信息'
		            })
		            return false;
		        });
		
		
		    });
		    //分页
		    layui.use(['laypage', 'layer'], function(){
			    var laypage = layui.laypage
			    ,layer = layui.layer;
		  		laypage.render({
				    elem: 'demo7'
				    ,pages: 100
				    ,skip: true
				});
			
			});	
			
			layui.use('layer', function(){ //独立版的layer无需执行这一句
		  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
		  
		  //触发事件-----单击显示弹窗
		  var active = {
		  	//添加弹窗
		    notice: function(){
		      //示范一个公告层
		      layer.open({
		        type: 1
		        ,title: false //不显示标题栏
		        ,closeBtn: false
		        ,area: '400px;'
		        ,shade: 0.2
		        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
		        ,btn: ['确认', '关闭']
		        ,moveType: 1 //拖拽模式，0或者1
		        ,content: '<div style="padding: 40px; line-height: 22px; background-color: #f1f1f1; color: #333; font-weight: 300;"><form class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">字典编号</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">字典名称</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">字典类型</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">创建时间</label><div class="layui-inline"><input class="layui-input" style="width: 190px;" placeholder="开启节日" onclick="layui.laydate({elem: this, festival: true})"></div></div></form></div>'
		        ,success: function(layero){
		          var btn = layero.find('.layui-layer-btn');
		          btn.css('text-align', 'center');
		          btn.find('.layui-layer-btn0').attr({
		            href: 'javascript:;'
		            ,target: '_blank'
		          });
		        }
		      });
		    }
		    //修改弹窗
		    ,notice2: function(){
		      //示范一个公告层
		      layer.open({
		        type: 1
		        ,title: false //不显示标题栏
		        ,closeBtn: false
		        ,area: '400px;'
		        ,shade: 0.2
		        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
		        ,btn: ['确认', '关闭']
		        ,moveType: 1 //拖拽模式，0或者1
		        ,content: '<div style="padding: 40px; line-height: 22px; background-color: #f1f1f1; color: #333; font-weight: 300;"><form class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">字典编号</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">字典名称</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">字典类型</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-inline"><input type="" name="" lay-verify="" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">创建时间</label><div class="layui-inline"><input class="layui-input" style="width: 190px;" placeholder="开启节日" onclick="layui.laydate({elem: this, festival: true})"></div></div></form></div>'
		        ,success: function(layero){
		          var btn = layero.find('.layui-layer-btn');
		          btn.css('text-align', 'center');
		          btn.find('.layui-layer-btn0').attr({
		            href: 'javascript:;'
		            ,target: '_blank'
		          });
		        }
		      });
		    }
		    //删除弹窗
		    ,notice3: function(){
		      //示范一个公告层
		      layer.open({
		        type: 1
		        ,title: false //不显示标题栏
		        ,closeBtn: false
		        ,area: '300px;'
		        ,shade: 0.2
		        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
		        ,btn: ['确认', '关闭']
		        ,moveType: 1 //拖拽模式，0或者1
		        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #f1f1f1; color: #333; font-weight: 300;">确定删除本条信息吗？<i class="menu-icon fa fa-warning"></i></div>'
		        ,success: function(layero){
		          var btn = layero.find('.layui-layer-btn');
		          btn.css('text-align', 'center');
		          btn.find('.layui-layer-btn0').attr({
		            href: 'javascript:;'
		            ,target: '_blank'
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
		//日期选择
		layui.use('laydate', function(){
		var laydate = layui.laydate;
		
		var start = {
		  min: laydate.now()
		  ,max: '2099-06-16 23:59:59'
		  ,istoday: false
		  ,choose: function(datas){
		    end.min = datas; //开始日选好后，重置结束日的最小日期
		    end.start = datas //将结束日的初始值设定为开始日
		  }
		};
		
		var end = {
		  min: laydate.now()
		  ,max: '2099-06-16 23:59:59'
		  ,istoday: false
		  ,choose: function(datas){
		    start.max = datas; //结束日选好后，重置开始日的最大日期
		  }
		};
		});
//Demo
layui.use(['tree', 'layer'], function(){
  var layer = layui.layer
  ,$ = layui.jquery; 
  
  layui.tree({
    elem: '#demo1' //指定元素
    ,target: '_blank' //是否新选项卡打开（比如节点返回href才有效）
    ,click: function(item){ //点击节点回调
      layer.msg('当前节名称：'+ item.name + '<br>全部参数：'+ JSON.stringify(item));
      console.log(item);
    }
    ,nodes: [ //节点
      {
        name: '常用文件夹'
        ,id: 1
        ,alias: 'changyong'
        ,children: [
          {
            name: '所有未读（设置跳转）'
            ,id: 11
            ,href: 'http://www.layui.com/'
            ,alias: 'weidu'
          }, {
            name: '置顶邮件'
            ,id: 12
          }, {
            name: '标签邮件'
            ,id: 13
          }
        ]
      }, {
        name: '我的邮箱'
        ,id: 2
        ,spread: true
        ,children: [
          {
            name: 'QQ邮箱'
            ,id: 21
            ,spread: true
            ,children: [
              {
                name: '收件箱'
                ,id: 211
                ,children: [
                  {
                    name: '所有未读'
                    ,id: 2111
                  }, {
                    name: '置顶邮件'
                    ,id: 2112
                  }, {
                    name: '标签邮件'
                    ,id: 2113
                  }
                ]
              }, {
                name: '已发出的邮件'
                ,id: 212
              }, {
                name: '垃圾邮件'
                ,id: 213
              }
            ]
          }, {
            name: '阿里云邮'
            ,id: 22
            ,children: [
              {
                name: '收件箱'
                ,id: 221
              }, {
                name: '已发出的邮件'
                ,id: 222
              }, {
                name: '垃圾邮件'
                ,id: 223
              }
            ]
          }
        ]
      }
      ,{
        name: '收藏夹'
        ,id: 3
        ,alias: 'changyong'
        ,children: [
          {
            name: '爱情动作片'
            ,id: 31
            ,alias: 'love'
          }, {
            name: '技术栈'
            ,id: 12
            ,children: [
              {
                name: '前端'
                ,id: 121
              }
              ,{
                name: '全端'
                ,id: 122
              }
            ]
          }
        ]
      }
    ]
  });
  
  
  //生成一个模拟树
  var createTree = function(node, start){
    node = node || function(){
      var arr = [];
      for(var i = 1; i < 10; i++){
        arr.push({
          name: i.toString().replace(/(\d)/, '$1$1$1$1$1$1$1$1$1')
        });
      }
      return arr;
    }();
    start = start || 1;  
    layui.each(node, function(index, item){  
      if(start < 10 && index < 9){
        var child = [
          {
            name: (1 + index + start).toString().replace(/(\d)/, '$1$1$1$1$1$1$1$1$1')
          }
        ];
        node[index].children = child;
        createTree(child, index + start + 1);
      }
    });
    return node;
  };  
});