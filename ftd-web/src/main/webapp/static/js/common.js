//tab
$(function() {
	$(".nav-tabs").on("click", "li", function() {
		// 设index为当前点击
		var index = $(this).index();
		// 点击添加样式利用siblings清除其他兄弟节点样式
		$(this).addClass("active").siblings().removeClass("active");
		// 同理显示与隐藏
		$(this).parents(".nav-tabs-custom").find(".tab-content li").eq(index).show().siblings().hide();
	})
})
//bootstrap组件
$(function() {
		//Initialize Select2 Elements
		$('.select2').select2()
		//Date picker
		$('.dateclass').datepicker({ //运营日期
				autoclose: true
		})
		//Date range picker
		$('.reservationclass').daterangepicker()
		//DataTables
		$('#example2').DataTable({
			'paging': true,
			'lengthChange': false,
			'searching': false,
			'ordering': true,
			'info': true,
			'autoWidth': false,
			"columnDefs": [{
				"orderable": false,
				"targets": 0
			}]
		})

	})
//layer组件
$(function() {
	//通过审核弹窗
	$('.pass').on('click', function() {
		layer.msg('通过审核');
	});
//	$('.terminal').on('click', function() {
//		layer.open({
//			type: 2,
//			time: 0, //不自动关闭
//			title: '新增终端',
//			btn: ['确认', '取消'],
//			area: ['350px', '250px'],
//			shadeClose: true, //点击遮罩关闭
//			content: '../pages/basic/terminal/termainal-add.html',
//			yes: function(index) {
//
//				layer.close(index);
//			}
//
//		});
//	});
	
})