/**
 * LayUI 日期组件
 */
layui.use('laydate',
function() {
    var laydate = layui.laydate;

    var start = {
        min: laydate.time,
        max: '2099-06-16 23:59:59',
        istoday: false,
        choose: function(datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };

    var end = {
        min: laydate.time,
        max: '2099-06-16 23:59:59',
        istoday: false,
        choose: function(datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
});