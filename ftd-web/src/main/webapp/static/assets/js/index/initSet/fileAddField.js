var ChargesTpl = {
	type: UrlValue("v"),
	doValid: function($e) { //用于班型名单个修改新增，异步校验
		var v = $e.val(),
			id = UrlValue("pid");
		if (v) {
			var o = {},
				className = [];
			o['course'] = v;
			if (id) {
				o['id'] = id;
			}
			className.push(o);
			$("#loading").show();
			this.getValidRz(className, true).done(function(Data) {
				var st = true;
				if (Data.data !== null) {
					st = Data.data[v];
				}
				$e.rules("remove", "courseSame");
				$e.rules("add", {
					courseSame: st.toString()
				})
				$e.valid();
				$("#loading").hide();
			});
		}
	},
	getValidRz: function(validCName, isAsync) { //获取班型校验结果
		return $.ajax({
			url: '/rmwebapp/sch/brsch-' + SubSchId() + '/product',
			type: 'put',
			async: isAsync ? isAsync : false,
			contentType: 'application/json',
			data: JSON.stringify(validCName)
		});
	},
	validTSame: function(d) { //用于班型名批量修改新增，同步校验
		var o = $.extend(true, {}, d);
		var validCName = $.merge(o.chgeUpdate, o.charges);
		var msg = '';

		if (validCName.length !== 0) {
			function comparisonFun(propertyName) {
				return function(obj1, obj2) {
					var value1 = obj1[propertyName];
					var value2 = obj2[propertyName];

					if (value1 > value2) {
						return 1;
					} else if (value1 < value2) {
						return -1;
					} else {
						msg += '[' + value1 + ']、';
						return 0;
					}
				}
			}
			validCName.sort(comparisonFun("course"));
			if (msg === '') { //数据本身有重复
				this.getValidRz(validCName)
					.done(function(Data) {
						if (Data.data !== null) {
							for (var key in Data.data) {
								if (Data.data[key] === false) {
									msg += '[' + key + ']、';
								}
							}
						}
					});
			}
		}
		return msg;
	},
	data2Tb: function(tlist, _containerId) {
		var containerId = _containerId || '#feetable';
		if (tlist && tlist.length) {
			var htmlArry = [];
			for (var i = 0; i < tlist.length; i++) {
				var $tr = this.getValueRow(tlist[i]);
				$tr.data('id', tlist[i].id);
				htmlArry.push($tr);
			}
			$(containerId).find('>tbody').empty().append(htmlArry)
		}
	},
	getChargeData: function(tid, _containerId) {
		var containerId = _containerId || '#feetable',
			$trs = $(containerId).find('>tbody>tr'),
			_self = this,
			chgeUpdate = [],
			charges = [],
			chgeDel = [],
			tplObj, id;
		$trs.each(function(index, el) {
			id = $(this).data('id');
			if ($(this).hasClass('hidden')) { //隐藏并有id的为删除的
				id ? chgeDel.push(id) : "";
			} else {
				tplObj = {};
				if (_self.type === 'SubSchool' && tid) { //分校
					tplObj["brsch"] = {
						"id": tid
					}
				}
				if (_self.type === 'Dr' && tid) { //教练员
					tplObj["coach"] = {
						"id": tid
					};
				}

				$vs = $(this).find('select[name],input[name]');
				$vs.each(function(index, el) {
					tplObj[this.name] = $(this).val();
					if (id) {
						tplObj["id"] = id;
					}
				});
				("id" in tplObj) ? chgeUpdate.push(tplObj): charges.push(tplObj);
			}
		});

		return {
			chgeUpdate: chgeUpdate, //修改的数据
			charges: charges, //新增的数据
			chgeDel: chgeDel //删除的数据
		}
	},
	doRemoveRow: function(t) {
		$(t).closest('tr').addClass('hidden');
	},
	changeChargeTd: function(code) {
		return [
			'<input type="text" name="course" class="form-control input-sm class-type" value="" maxlength="45" placeholder="请输入超过45个字的班级课程" data-rules="undefined">',
			'<input type="text" name="description" class="form-control input-sm class-desc" value="" maxlength="100"  placeholder="请输入班型简介" data-rules="undefined">',
			'<select name="cartype" class="car-type" data-rules="undefined">' + getOptions($("#Md_dripermitted").val() || "A1") + '</select>',
			'<select name="tratype" class="price-type" data-rules="undefined"><option value="TIME" selected="selected">定时</option><option value="APPOINT">预约</option><option value="OTHER">其他</option></select>',
			'<select name="chargetype" class="price-type" data-rules="undefined"><option value="ONETIME">一次性</option><option value="TIMING">计时</option><option value="GRADING">分阶段</option><option value="OHTER">其他</option></select>',
			'<select name="paytype" class="price-type" data-rules="undefined"><option value="STUDYFIRST" selected="selected">先学后付</option><option value="PAYFIRST">先付后学</option><option value="OHTER">其他</option></select>',
			'<div class="input-group"><span class="input-group-addon">￥</span><input type="number" name="price" class="form-control price" value="" style="width: 133px;" data-rules="undefined"></div>',
			'<a onclick="ChargesTpl.doRemoveRow(this);" href="javascript:void(0)" class="delete"><i class="menu-icon fa fa-trash-o"></i></a>'
		][(code - 1)]
	},
	getRowStr: function() {
		return PageUtils.makeRow({
			"course": 1,
			"description": 2,
			"cartype": 3,
			"tratype": 4,
			"chargetype": 5,
			"paytype": 6,
			"price": 7,
			"del": 8,
		}, this.changeChargeTd);
	},
	getValueRow: function(_data) {
		var $tr = $(this.getRowStr());
		if (_data) {
			for (var key in _data) {
				$tr.find('input[name=' + key + '],select[name=' + key + ']').eq(0)
					.val(_data[key]);
			}
		}
		$tr.find('td[name="price"]').width(100)
		return $tr;
	},
	doAddCharge: function() {
		if ($("#Md_dripermitted").val() === "0") {
			modal_pop("请选择准驾车型!", "fail");
			return false;
		}
		var $html = $(this.getRowStr());
		$html.find('td[name="price"]').width(100);
		$('#feetable').append($html);
	},
	doAddByTpl: function() {
		var $checkipts = $('#fee-modal-table >tbody').find('input[name="userow"]');
		var htmlArray = [],
			$tpltr;
		$checkipts.each(function(index, el) {
			if ($(this).prop('checked')) {
				$tpltr = $(this).closest('tr').clone();
				$tpltr.find('td').last().empty().html(ChargesTpl.changeChargeTd(8))
				htmlArray.push($tpltr);
			}
		});
		$('#feetable >tbody').append(htmlArray);
	},
	showTpl: function() {
		if ($("#Md_dripermitted").val() === "0") {
			modal_pop("请选择准驾车型!", "fail");
			return false;
		}
		CommModal({
			message: feeStandalModal(),
			title: "收费标准模板",
			className: "",
			buttons: [{
				keys: "确定",
				label: "确定",
				className: "btn-primary btn-Ajax",
				callback: function() {
					ChargesTpl.doAddByTpl();
				}
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		var _self = this;
		$('#fee-modal-table >tbody').append(function() {
			var htmlArry = [];
			var dataArray = [{
				"course": "普通C1班",
				"description": "代办体检，可接送到教练场，资深教练培训",
				"price": 5500,
				"cartype": "C1"
			}, {
				"course": "商务快速班",
				"description": "配合约考与练车，学车时间充裕，三个月拿证",
				"price": 9600,
				"cartype": "C1"
			}, {
				"course": "普通计时班",
				"description": "随时预约培训，资深教练培训",
				"price": 100,
				"cartype": "C1"
			}, {
				"course": "VIP计时班",
				"description": "针对学员一对一教学，尊享学车优质服务",
				"price": 200,
				"cartype": "C1"
			}];
			for (var i = 0; i < dataArray.length; i++) {
				var $tr = _self.getValueRow(dataArray[i]);
				$tr.find('td').last().empty().append('<input class="i-checks" type="checkbox" name="userow"/>');
				htmlArry.push($tr);
			}
			return htmlArry;
		}).find('.i-checks').iCheck({
			checkboxClass: "icheckbox_square-green",
			radioClass: "iradio_square-green",
		})
	}
}

var ServiceTpl = $.extend(true, {}, ChargesTpl, {
	changeChargeTd: function(code) {
		return [
			'<input name="name" type="text" class="form-control input-xs content" placeholder="内容不超过4个字" maxlength="4" data-rules="undefined">',
			'<input name="introduce" type="text" class="form-control input-xs brief" placeholder="简介不超过20字" maxlength="100" data-rules="undefined">',
			'<a onclick="ServiceTpl.doRemoveRow(this);" href="javascript:void(0)" class="delete"><i class="menu-icon fa fa-trash-o"></i></a>'
		][(code - 1)]
	},
	getRowStr: function() {
		return PageUtils.makeRow({
			"name": 1,
			"introduce": 2,
			"del": 3
		}, this.changeChargeTd);
	},
	getServiceData: function (tid) {
		var temData = this.getChargeData(tid,'#featuretb');//用获取班型的方法
		return {
			srvUpdate: temData.chgeUpdate, //修改的数据
			services: temData.charges, //新增的数据
			srvDel: temData.chgeDel //删除的数据
		}
	}
});

//服务特色模板确定按钮
$(document).on('click', '#feature-ok-btn', function(event) {
	var $checkboxes = $("#feature-modal-table").find("input[type='checkbox']:checked"),
		$tds = null,
		dataObj = {},
		htmlArray = [];

	$($checkboxes).each(function(index) {
		$tds = $(this).closest('tr').find("td");
		dataObj['name'] = $tds.eq(0).text();
		dataObj['introduce'] = $tds.eq(1).text();
		htmlArray.push(ServiceTpl.getValueRow(dataObj));
	});
	$('#featuretb').append(htmlArray);
	
	$("#feature-modal").modal("hide");
	$checkboxes.prop("checked", false);
	
});


$(document).on('click', '.btn', function(event) {
	var id = event.target.id;
	switch (id) {
		case 'add-feature-btn'://特色服务手动添加事件绑定
			$('#featuretb').append(ServiceTpl.getRowStr());
			break;
		case 'add-feature-modal-btn'://特色服务模板添加事件绑定
			$("#feature-modal").modal("show");
			break;
		default:
			break;
	}
});

//特色服务
function specSerInit(tbId, rules) {
	var add = '<a class="btn btn-success" href="javascript:void(0);" id="add-feature-btn"><i class="fa fa-plus"></i>手动添加</a><a class="btn btn-success" href="javascript:void(0);" style="margin-left:5px" id="add-feature-modal-btn"><i class="fa fa-plus"></i>模板增加</a>';
	var tb = '<div style="width:97%;padding-left:5px;padding-right:5px;margin-left:auto;margin-right:auto">' + add + '<table class="table table-bordered" id="' + tbId + '" style="margin-bottom: 50px;">';
	tb += '<thead><tr><th width="180">服务内容</th><th width="400">服务简介</th><th width="50">操作</th></tr>';
	tb += '</thead><tbody></tbody></table><input type="hidden" id="i_' + tbId + '" name="' + tbId + '" data-rules="' + rules + '" data-type="specSer" /></div>';
	return tb;
}

//简介
function addAbstract(editorId, rules) {
	var editor = '<div style="width:97%;padding-left:5px;padding-right:5px;margin-left:auto;margin-right:auto"><div id="' + editorId + '">请输入一段简介</div><input type="hidden" id="i_' + editorId + '" name="' + editorId + '" data-rules="' + rules + '" data-type="edit" /></div>'
	return editor;
}

//收费标准初始化
function feeStandal(tableId, rules) {
	//debugger
	var add = '<div style="width:97%;padding-left:5px;padding-right:5px;margin-left:auto;margin-right:auto">' +
		'<a class="btn btn-palegreen" href="javascript:void(0)" onclick="ChargesTpl.doAddCharge();" id="fee-btn">' +
		'<i class="fa fa-plus"></i>手动添加</a>' +
		'<a class="btn btn-palegreen" href="javascript:void(0);" onclick="ChargesTpl.showTpl()" style="margin-left:5px" id="fee-modal-btn">' +
		'<i class="fa fa-plus"></i>模板添加</a>';
	var fst = add + '<table class="table table-bordered" id="' + tableId + '" style="margin-bottom: 50px;">';
	fst += '<thead><tr><th>班型</th><th>班型简介</th><th>培训车型</th><th>培训模式</th><th>收费模式</th><th>付费模式 </th>';
	fst += '<th>金额(元)</th><th>操作</th></tr></thead><tbody></tbody></table>';
	fst += '<input type="hidden" id="i_' + tableId + '" name="' + tableId + '" data-rules="' + rules + '" data-type="feeStandal" /></div></div>';
	return fst;
}

//获取收费标准模板
function feeStandalModal() {
	return '<table class="table table-bordered table-hover" id="fee-modal-table">' +
		'<thead><tr><th>班型</th><th>班型简介</th><th>培训车型</th><th>培训模式</th><th>收费模式</th><th>付费模式</th><th>金额(元)</th><th>#</th></tr></thead>' +
		'<tbody></tbody>' +
		'</table>';
}

//车型联动
function getOptions(car) {
	var data = {};
	data['A1'] = ['A1', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3', 'C4'];
	data['A2'] = ['A2', 'B1', 'B2', 'C1', 'C2', 'C3', 'C4'];
	data['A3'] = ['A3', 'C1', 'C2', 'C3', 'C4'];
	data['B1'] = ['B1', 'C1', 'C2', 'C3', 'C4'];
	data['B2'] = ['B2', 'C1', 'C2', 'C3', 'C4'];
	data['C1'] = ['C1', 'C2', 'C3', 'C4'];
	data['C3'] = ['C3', 'C4'];
	var options = "";
	for (var key in data) {
		if (car == key) {
			for (var i = 0; i < data[key].length; i++)
				options += "<option value='" + data[key][i] + "'>" + data[key][i] + "</option>";
		}
	}
	return options;
}

//添加广告
function addAdvertise(inpuId, rules) {
	var adver = '<div style="width:96%;margin-left:auto;margin-right:auto">';
	adver += '<input type="text" class="form-control" id="' + inpuId + '" name="' + inpuId + '"    data-rules="' + rules + '"  placeholder="请用一句话表达自己，不超过20字" maxlength="20" />';
	adver += '</div>';
	return adver;
}