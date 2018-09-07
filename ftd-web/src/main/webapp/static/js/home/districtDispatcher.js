/**
 * Created by zha on 2017/7/5.
 */

var max = 0;

$(function () {

    $.post(path + "/index/distract/list", {companyId: 'all'}, function (result) {
        if (result.errorcode == 0) {
            var data = result.data;
            for (var i in data) {
                var record = data[i];
                var num = record.vehicle + record.driver;
                (max >= num) ? max = max : max = num;
            }
            max += 300;
            init(data);
        }
    });


});

$("#distract_dispatcher").on('change', function () {
    $.post(path + "/index/distract/list", {companyId: $("#distract_dispatcher").val()}, function (result) {
        if (result.errorcode == 0) {
            init(result.data);
        }
    });
});

function init(data) {
    var vehicle = new Array();
    var driver = new Array();

    for (var i in data) {
        var record = data[i];
        //var map = JSON.parse(record);
        vehicle.push({name:i,value:record.vehicle});
        driver.push({name:i,value:record.driver});
    }
    //console.log(vehicle);
    var Chart = echarts.init(document.getElementById('main_map'));

    $.getJSON('./static/plugins/wuhan.json', function (data) {
        echarts.registerMap('city', data);

        Chart.setOption(
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['驾驶员数', '车辆数']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {
                            readOnly: false
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataRange: {
                    min: 0,
                    max: max,
                    y: '30%',
                    x: '1%',
                    color: ['#448eb9', '#d6ebf6'],
                    text: ['高', '低'],
                    calculable: false,

                },

                series: [{
                    name: '驾驶员数',
                    type: 'map',
                    layoutCenter: ['50%', '50%'],
                    layoutSize: 335,
                    map: 'city',
                    /* roam: true,   */

                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            color: '#FFB957'
                        }, //是否显示默认名称
                        emphasis: {
                            label: {
                                show: false
                            }
                        } //鼠标悬停是否显示地理名称
                    },
                    data: driver
                }, {
                    name: '车辆数',
                    type: 'map',
                    layoutCenter: ['50%', '50%'],
                    layoutSize: 270,
                    map: 'city',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            color: '#72B5E1'
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: vehicle
                }]
            });

    });

    window.addEventListener("resize", function () {
        Chart.resize();
    });
}