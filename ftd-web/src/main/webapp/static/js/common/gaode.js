var imgPath = global.path + '/static/img';

var mapObj = {};

/* 初始化地图  {
 complete:地图加载完成后回调方法
 searchCallback:地图搜索栏完成后回调方法
 searchText:是否开启搜索栏,默认true
 control:是否开启地图控件，默认true
 container:地图容器id，默认container
 }  */
function initMap( opt ) {

    var defaultOpt = {
        searchText:true,
        control:true,
        container:'container',
        zoom:11
    }

    opt = $.extend({} , defaultOpt , opt);

    mapObj = new AMap.Map(opt.container, {
        resizeEnable: true,
        zoom:opt.zoom,
        center: opt.center
    });

    AMap.event.addListener(mapObj , 'complete' , function (){

        if (opt.control) {
            loadControl();
        }

        opt.complete && opt.complete(mapObj);

    });

    if (opt.searchText) {
        AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
            var autocomplete= new AMap.Autocomplete({ input: "keyword" });
            var placeSearch = new AMap.PlaceSearch({map: mapObj});
            AMap.event.addListener(autocomplete, "select", function(e){
                placeSearch.search(e.poi.name , function (status , info){
                    opt.searchCallback && opt.searchCallback(info.poiList.pois , info)
                });
            });
        });
    }

    return mapObj;

}

/* 加载地图控件 */
function loadControl(){
    //地图类型切换
    mapObj.plugin(["AMap.MapType"],function(){
        var type= new AMap.MapType({
            defaultType:0 //使用2D地图
        });
        mapObj.addControl(type);
    });
    //加载鹰眼
    mapObj.plugin(["AMap.OverView"],function(){
        view = new AMap.OverView({isOpen:true});
        mapObj.addControl(view);
    });
    //比例尺插件。位于地图右下角，用户可控制其显示与隐藏。
    mapObj.plugin(["AMap.Scale"],function(){
        var scale = new AMap.Scale();
        mapObj.addControl(scale);
    });
    //地图操作工具条插件。可支持方向导航、位置定位、视野级别缩放、视野级别选择等操作。
    mapObj.plugin(["AMap.ToolBar"],function(){
        //加载工具条
        var tool = new AMap.ToolBar();
        mapObj.addControl(tool);
    });
}

/* 清除地图上标记 */
function clearMap() {
    mapObj.clearMap();
}

/* 创建一般标记  {lng:lng , lat:lat}*/
function createMarker(opt) {

    opt = opt || {};
    var dopt = {
        map: mapObj,
        position: createPoint(opt),
        angle:0,
        title:''
    };
    if (opt.imgPath) {
        opt.icon = createIcon(opt);
        var size = opt.icon;
        dopt.offset = new AMap.Pixel(-(parseInt(size.get('width'))/2) , -parseInt(size.get('height')));
    }

    var option = $.extend(dopt, opt);
    var marker = new AMap.Marker(option);

    marker.setAngle(opt.angle);

    return marker;
}

/**
 * 创建自定义标记
 * eg: opt = {lng: longitude, lat:latitude,path:'red.png',width:52,height:52}
 * lng lat 经纬度
 * 可选参数(path /static/img/map 目录下的 图片名称， width 图片宽度 ，图片高度)
 *
 * @param opt
 */
function createCustomeMarker(opt) {

    var imgPath = '/map/3.png';
    if(opt.path) {
        imgPath = '/map/' + opt.path;
    }

    var defaultOpt = {
        imgPath: imgPath,
        width: 32,
        height: 32,
        angle:0
    };

    opt = $.extend({} , defaultOpt , opt);

    return createMarker(opt);
}

/* 创建point对象 { lng:lng , lat : lat}*/
function createPoint(opt) {
    return new AMap.LngLat(opt.lng, opt.lat);
}

/* 创建ICON对象  { width:36 , height:36 , imagePath: 图片路径 } */
function createIcon(opt) {
    var dopt = {
        size: new AMap.Size(opt.width || 36, opt.height || 36),
        image: opt.imgPath ? imgPath + opt.imgPath : null
    };
    return new AMap.Icon($.extend(dopt , opt));
}

/**
 * 创建轨迹
 * @param opt
 * data : 轨迹线数据
 * strokeStyle ： 轨迹线颜色
 */
function createPathSimplifier(opt) {

    var defaultOpt = {
        zIndex:100,
        data: [],
        strokeStyle: 'red',
        lineWidth: 6,
        dirArrowStyle: true
    };
    opt = $.extend({} , defaultOpt , opt);

    AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        var pathSimplifierIns = new PathSimplifier({
            zIndex: opt.zIndex,
            map: mapObj, //所属的地图实例
            getPath: function(pathData, pathIndex) {
                return pathData.path;
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {
                //返回鼠标悬停时显示的信息
                if (pointIndex >= 0) {
                    //鼠标悬停在某个轨迹节点上
                    return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                }
                //鼠标悬停在节点之间的连线上
                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {
                //轨迹线的样式
                pathLineStyle: {
                    strokeStyle: opt.strokeStyle,
                    lineWidth: opt.lineWidth,
                    dirArrowStyle: opt.dirArrowStyle
                },
              //鼠标hover时的title信息
                hoverTitleStyle: {
                    position: 'top'
                }
            }
        });

        var colors = [
          	        "#3366cc"
          	    ];

          	    var pathNavigs = [];

          	    function getNavg(pathIndex) {

          	        if (!pathNavigs[pathIndex]) {

          	            //创建一个轨迹巡航器 '/static/img/map/3.png'
          	            var navgtr = pathSimplifierIns.createPathNavigator(pathIndex, {
          	                loop: true,
          	                speed: parseInt($('#speedInp_' + pathIndex).val()),
          	                pathNavigatorStyle: {
          	                    width: 16,
          	                    height: 32,
          	                    content: PathSimplifier.Render.Canvas.getImageContent(path+'/static/img/map/3.png', onload, onerror),
          	                    strokeStyle: null,
          	                    fillStyle: null
          	                }
          	            });
          	            
          	            var $markerContent = $('<div class="markerInfo"></div>');

          	            $markerContent.html(pathSimplifierIns.getPathData(pathIndex).name);

          	            navgtr.marker = new AMap.Marker({
          	                offset: false,
          	                content: $markerContent.get(0),
          	                map: mapObj
          	            });

          	            var $msg = $('#routes-container').find('div.route-item[data-idx="' +
          	                pathIndex + '"]').find('.msg');

          	            navgtr.on('move', function() {
          	                navgtr.marker.setPosition(navgtr.getPosition());
          	                
          	            });

          	            navgtr.onDestroy(function() {
          	                pathNavigs[pathIndex] = null;
          	                navgtr.marker.setMap(null);
          	                $msg.html('');
          	            });

          	            navgtr.on('start resume', function() {
          	                navgtr._startTime = Date.now();
          	                navgtr._startDist = this.getMovedDistance();
          	            });

          	            navgtr.on('stop pause', function() {

          	                navgtr._movedTime = Date.now() - navgtr._startTime;
          	                navgtr._movedDist = this.getMovedDistance() - navgtr._startDist;

          	                navgtr._realSpeed = (navgtr._movedDist / navgtr._movedTime * 3600);

          	                refreshNavgButtons();
          	            });

          	            navgtr.on('move', function() {
          	/*                    var msgInfo = {
          	                    '总行进距离': Math.round(this.getMovedDistance() / 1000) + ' km'
          	                };*/

          	                $msg.html('<p>'+"总行进距离:" + Math.round(this.getMovedDistance() / 1000) +"km"+ '</p>');
          	            });

          	            pathNavigs[pathIndex] = navgtr;
          	        }

          	        return pathNavigs[pathIndex];
          	    }
          	    //自定义图标创建失败，自动执行次方法
          	    //--------------------------------------
          	    function onload() {
          	        pathSimplifierIns.renderLater();
          	    }

          	    function onerror(e) {
          	        alert('图片加载失败！');
          	    }
          	    //--------------------------------------
          	    
          	    var navigBtnsConf = [{
          	        name: '开始巡航',
          	        action: 'start',
          	        enableExp: 'navgStatus === "stop" || navgStatus === "pause"'
          	    }, {
          	        name: '暂停',
          	        action: 'pause',
          	        enableExp: 'navgStatus === "moving"'
          	    }, {
          	        name: '恢复',
          	        action: 'resume',
          	        enableExp: 'navgStatus === "pause"'
          	    }, {
          	        name: '停止',
          	        action: 'stop',
          	        enableExp: 'navgStatus === "moving"'
          	    }, {
          	        name: '销毁',
          	        action: 'destroy',
          	        enableExp: 'navgExists'
          	    }];

          	    function refreshNavgButtons() {

          	        $('#routes-container').find('div.route-item').each(function() {

          	            var pathIndex = parseInt($(this).attr('data-idx'), 0);

          	            if (pathIndex < 0) {
          	                return;
          	            }

          	            var navgStatus = 'stop',
          	                navgExists = !!pathNavigs[pathIndex];

          	            if (navgExists) {
          	                navgStatus = pathNavigs[pathIndex].getNaviStatus();
          	            }

          	            $(this).find('.navigBtn').each(function() {

          	                var btnIdx = parseInt($(this).attr('data-btnIdx'));

          	                $(this).prop('disabled', !eval(navigBtnsConf[btnIdx].enableExp));

          	            });

          	        });
          	    }

          	    function initRoutesContainer(data) {

          	        $('#routes-container').on('click', '.navigBtn', function() {

          	            var pathIndex = parseInt($(this).closest('.route-item').attr('data-idx'), 0);

          	            var navg = getNavg(pathIndex);

          	            navg[$(this).attr('data-act')]();

          	            refreshNavgButtons();
          	        });

          	        for (var i = 0, len = data.length; i < len; i++) {
          	            initRouteItem(data[i], i);
          	        }

          	        refreshNavgButtons();
          	    }

          	    function initRouteItem(pathData, idx) {

          	        var $routeItem = $('<div class="route-item"></div>');
          	        $routeItem.attr('data-idx', idx);


          	        for (var i = 0, len = navigBtnsConf.length; i < len; i++) {
          	            $('<button class="navigBtn navigBtnstyle" data-btnIdx="' + i + '" data-act="' + navigBtnsConf[i].action + '"></button>').html(navigBtnsConf[i].name).appendTo($routeItem);
          	        }

          	        $speedBox = $('<div class="speedBox"></div>').appendTo($routeItem);

          	        var speedTxt = $('<span><span>').appendTo($speedBox);

          	        var speedRangeInput = $('<input id="speedInp_' + idx +'" class="speedRange" type="range" min="1000" max="10000" step="1000" value="1000" />').appendTo($speedBox);

          	        function updateSpeedTxt() {
          	            var speed = parseInt(speedRangeInput.val(), 10);

          	            speedTxt.html('<p class="speedTxtstyle">回放时速:' + speed + ' km/h</p>');

          	            if (pathNavigs[idx]) {
          	                pathNavigs[idx].setSpeed(speed);
          	            }
          	        }
          	        speedRangeInput.on('change', updateSpeedTxt);

          	        updateSpeedTxt();

          	        $speedBox.appendTo($routeItem);

          	        $('<div class="msg"></div>').appendTo($routeItem);

          	        $routeItem.appendTo('#routes-container');
          	    }
          	    
          	    $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);

          	        $('#loadingTip').remove();
          	        /**控制动画方法*/
          	        initRoutesContainer(opt.data);
          	        console.log(opt.data);
           	       /**创建轨迹方法*/
                    pathSimplifierIns.setData(opt.data);
          	/*        pathSimplifierIns.on('selectedPathIndexChanged', function(e, info) {

          	    });
          	    pathSimplifierIns.on('pointClick pointMouseover pointMouseout', function(e, record) {
          	        //console.log(e.type, record);
          	    });
          	    pathSimplifierIns.on('pathClick pathMouseover pathMouseout', function(e, record) {
          	        //console.log(e.type, record);
          	    });*/


    });

}

/**
 * 创建多边形
 * @param path
 * @returns {*|o.Polygon|r.Polygon}
 */
function createPolygon(path){
    var arr = path;
    return new AMap.Polygon({
        map: mapObj,
        path: arr,
        strokeColor: "#0000ff",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#f5deb3",
        fillOpacity: 0.35
    });

}