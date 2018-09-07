;(function ($) {
    $.fn.extend({
        /**
         * @author chendb
         * @param divId 分页器ID
         * @param table <table>标签ID
         * @param selectFrom 查询条件的formID
         * @param rows  每页显示条数
         * @param pageIndex 默认页面1
         * @param pageTotal 页面总数
         * @param skin: '#23c6c8',  分页按钮颜色
         * @param url 访问后台地址
         * @param totalUrl 查询总数Url
         * @param addhtml 返回json自定义html组合方法,传入你自定义的方式
         * @param 调用此函数时，会默认调用layui的分页组件
         [   elem: divId,      //html页面中装数据容器的id(如：<table id="Id"></table>)
         pages: pageTotal, //得到总页数
         skip: true,      //跳转框参数
         prev: '<em><</em>',//左右选择
         next: '<em>></em>',
         ]
         * 具体例子在dictionary.jsp
         * 例：var addhtml = function(json){
		 *       return html;
		 *     }
         */
        PaginBar: function (divId, table, selectFrom, rowsSize, pageIndex, url, addhtml) {
            var divId = $("#" + divId + "");
            var tableId = $("#" + table + "");
            var fromId = $("#" + selectFrom + "");
            var url = url;
            var rowsSize = rowsSize;
            var pageIndex = pageIndex;
            var count = 0;
            var paramData = {};
            var addHtmlMthod = addhtml;
            var pageTotal = 0;
            var layerIndex;
            var layer;
            /**
             * 分页查询入口
             * 查询总页数
             */
            queryPageCount = function () {
                openLoad();//列表初始化加载
                var rows = rowsSize;
                var curr = pageIndex;
                paramData.rowsSize = rows;
                paramData.pageIndex = curr;
                var p = $.post(url, paramData, function (json) {
                    if (json.errorcode == 0) {
                        count = json.data.total;
                        pageTotal = Math.ceil(count / rows);
                        innerPageHtml();
                        setCurrPageHtml(curr);
                        var html = addHtmlMthod(json);
                        tableId.html(html);
                        if (curr > 1) {
                            scrollTop();
                        }
                        unselectCheack();
                        layui.use(['laypage', 'layer'],
                            function () {
                                var laypage = layui.laypage,
                                    layer = layui.layer;
                                laypage.render({
                                    elem: divId,
                                    count: count,//得到总页数
                                    limit: rows,
                                    groups:3,
                                    first: '首页',
                                    last: '尾页',
                                    skip: true,//跳转框参数
                                    prev: '上一页',//左右选择
                                    next: '下一页',
                                    //skin: '#009688',
                                    curr: this.pageIndex,
                                    jump: function (obj, first) {
                                        var $span = $("<div class='countPges'>共<input value='" + pageTotal + "' readonly='readonly'/>页" + "，" + "共<input value='" + count + "' readonly='readonly'/>条" + "</div>");
                                        divId.find(".layui-laypage-next").after($span);
                                        if (first) {
                                            return;
                                        }
                                        var curr = obj.curr;
                                        var rows = rowsSize;//获取全局变量
                                        paramData.rowsSize = rows;
                                        paramData.pageIndex = curr;
                                        var p = $.post(url, paramData,
                                            function (json) {
                                                if (json.errorcode == 0) {
                                                    setCurrPageHtml(curr);
                                                    var html = addHtmlMthod(json);
                                                    tableId.html(html);
                                                    if (curr > 1) {
                                                        scrollTop();
                                                    }
                                                    unselectCheack();
                                                } else {
                                                    layer.alert('未查询到相关数据!!');
                                                }
                                                closeLoad();
                                            },
                                            "json");
                                        p.error(function () {
                                            closeLoad();
                                            layer.alert('加载数据失败请重试!!');
                                        })
                                        closeLoad();
                                    }

                                });
                            });
                    } else {
                        layer.alert('未查询到相关数据!!');
                    }
                }, "json");
                p.success(function () {
                    closeLoad();
                });
                p.error(function () {
                    closeLoad();
                    layer.alert('加载数据失败请重试!!');
                })
            },
                /**
                 * 打开加载
                 */
                openLoad = function () {
                    layui.use('layer', function () { //独立版的layer无需执行这一句
                        var $ = layui.jquery;
                        layer = layui.layer; //独立版的layer无需执行这一句
                        layerIndex = layer.open({
                            type: 3
                            , shade: 0.2
                            , icon: 2
                            , time: 5000
                        });
                    });
                },
                /**
                 * 默认取消选中ID请设置为all
                 */
                unselectCheack = function () {
                    if ($("#all").length > 0) {
                        $("#all").prop("checked", false);
                    }
                },
                /**
                 * 关闭加载
                 */
                closeLoad = function () {
                    if (layerIndex != undefined) {
                        layer.close(layerIndex);
                    }
                },
                /**
                 * 滚动条置顶
                 */
                scrollTop = function () {
                    $('html, body').animate({scrollTop: 130}, 'fast');
                },
                /**
                 * 重置表单
                 */
                resetFrom = function () {
                    $("#" + selectFrom + "")[0].reset();
                },
                /**
                 * 初始化设置pageInfo html
                 */
                innerPageHtml = function () {
                    $("#currPage").html(pageIndex);
                    $("#totalPage").html(pageTotal);
                    $("#totalRows").html(count);
                    $("#rows").html(rowsSize);

                    /*总页数文字隐藏*/
//				if (count < 10 || count == null) { 
//					$("#demopages").css("display", "none");
//				} else {
//					$("#demopages").css("display", "block");
//				}
                },
                setCurrPageHtml = function (curr) {
                    $("#currPage").html(curr);
                },
                /**
                 * 按from表单填入的数据查询
                 */
                termQueryPage = function () {
                    paramData = {};
                    var fromData = fromId.serializeArray();
                    //判断该查询条件是否存在
                    $.each(fromData, function () {
                        var d = paramData[this.name];
                        if (d != undefined && d != "") {
                            if (this.value != undefined && this.value != "" && this.value != 0) {
                                paramData[this.name] = this.value;
                            } else {
                                delete paramData[this.name];
                            }
                        } else {
                            if (this.value != undefined && this.value != "" && this.value != 0)
                                paramData[this.name] = this.value;
                        }
                    });
                    queryPageCount();
                }
        } //主函数
    });//fn
}(jQuery));
