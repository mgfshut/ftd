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
				    cont: 'demo7'
				    ,pages: 100
				    ,skip: true
				});
			
			});	
			//
			
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
		日期选择
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
