/**
 * Created by zha on 2017/7/27.
 */
layui.use('layer', function(){
    var layer = layui.layer;
});

var openLayer = function(opt) {

    var defaultOpt = {
        type: 2 ,
        title: '', //标题
        area:['100%', '100%'],
        maxmin: true
    };

    opt = $.extend({} , defaultOpt , opt);

    layer.open({
        type: opt.type
        , title: opt.title
        , area: opt.area
        , maxmin: opt.maxmin
        , content: opt.url
    });

};

/**
 * 打开layer 不要title
 * @param opt
 */
var openTab = function(url) {

    layer.open({
        type: 2
        , title: false
        , area: ['100%', '100%']
        , maxmin: false
        , closeBtn:0
        , content: url
    });

};

/**
 * 关闭（返回）
 */
function closeLayer() {
    var index=parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

var openFlag = true;

/**
 * 车辆位置
 */
function showVehicleLocation(vehicleNo) {

    if (openFlag) {

        openFlag = false;

        $.post(path + "/ops/positionVehicle/getCurrentVehiclePosition", {vehicleNo: vehicleNo}, function (result) {

            if (result.errorcode == 0) {

                var longitude = result.data.longitude / 1000000;
                var latitude = result.data.latitude / 1000000;
                var direction = result.data.direction;

                //打开弹窗
                $.post(path + '/inq/vehicle/showLocation', {
                    "longitude": longitude,
                    "latitude": latitude,
                    "direction": direction,
                    "title":vehicleNo
                }, function (str) {

                    //在这里面输入任何合法的js语句
                    layer.open({
                        type: 1 //Page层类型
                        , area: ['800px', '500px']
                        , title: '车辆位置'
                        , shade: 0.6 //遮罩透明度
                        , maxmin: true //允许全屏最小化
                        , anim: 1 //0-6的动画形式，-1不开启
                        , content: str
                    });

                    openFlag = true;
                });
            } else {

                layer.msg(result.message, {
                    icon: 2,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                });

                openFlag = true;

            }

        });

    }

}

/**
 * 驾驶员位置
 * @param licenseId
 * @returns {boolean}
 */
function showDriverLocation(licenseId) {

    if (openFlag) {

        openFlag = false;

        $.post(path + "/ops/positionDriver/getCurrentDriverPosition", {licenseId: licenseId}, function (result) {

            if (result.errorcode == 0) {
                var longitude = result.data.longitude / 1000000;
                var latitude = result.data.latitude / 1000000;
                var direction = result.data.direction

                //打开弹窗
                $.post(path + '/inq/person/showLocation', {
                    "longitude": longitude,
                    "latitude": latitude,
                    "direction": direction,
                    "title":licenseId
                }, function (str) {

                    //在这里面输入任何合法的js语句
                    layer.open({
                        type: 1 //Page层类型
                        , area: ['800px', '500px']
                        , title: '驾驶员位置'
                        , shade: 0.6 //遮罩透明度
                        , maxmin: true //允许全屏最小化
                        , anim: 1 //0-6的动画形式，-1不开启
                        , content: str
                    });

                    openFlag = true;

                });
            } else {

                layer.msg(result.message, {
                    icon: 2,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                });

                openFlag = true;

            }

        });

        return false;

    }

}

