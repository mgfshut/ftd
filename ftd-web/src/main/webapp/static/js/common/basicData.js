/**
 * Created by zha on 2017/6/4.
 */

//枚举数据 table field comment

//order_cancel operator 撤销发起方
var operator = {1:'乘客',2:'驾驶员',3:'平台公司'};
//order_cancel cancel_type_code 订单取消类型
var cancelTypeCode = {1:'乘客提前撤销', 2:'驾驶员提前撤销',3:'平台公司撤销',4:'乘客违约撤销',5:'驾驶员违约撤销'};
//operate_pay  pay_state 结算状态
var payState = {0: '未结算', 1: '已结算', 2: '未知'};
//operate_pay invoice_status 发票状态
var invoiceStatus = {0: '未开票', 1: '已开票', 2: '未知'};
// base_info_vehicle  state 状态
var infoVehicleState = {0: '有效', 1: '失效'};
//base_info_vehicle  fix_state 车辆检修状态
var fixState = {0:'未检修',1:'已检修',2:'未知'};
//base_info_vehicle commercial_type 服务类型
var commercialType = {1:'网络预约出租车',2:'巡游出租车',3:'私人小客车合乘'};
//(base_info_vehicle|base_info_vehicle_insurance|base_info_vehicle_total_mile) flag 操作标识
var flag = {1: '新增', 2: '更新', 3: '删除'};

//base_info_driver_app NetType 手机运营商
var netType = {1: '中国联通', 2: '中国移动', 3: '中国电信', 4: '其他'};
//base_info_driver_app MapType 使用地图类型
var mapType = {1: '百度地图', 2: '高德地图', 3: '其他'};
//rated_passenger_complaint status 乘客满意度反馈
var complaintStatus = {0: '未反馈', 1: '满意', 2: '基本满意', 3: '不满意'};
//rated_passenger_complaint way 投诉途径
var complaintWay = {0: '企业应用', 1: '服务平台'};

//行业标准数据
//base_info_vehicle fuel_type 车辆燃料类型
var fuelType = {'A':'汽油','B':'柴油','C':'电','D':'混合油','E':'天然气','F':'液化石油气','L':'甲醇','M':'乙醇','N':'太阳能','O':'混合动力','Y':'无','Z':'其他'};
//base_info_vehicle plate_color 车牌颜色
var plateColor = {1:'蓝色',4:'白色',2:'黄色',5:'绿色',3:'黑色',9:'其他'};
//base_info_vehicle check_state 车辆年度审验状态
var checkState = {0:'未年审',2:'年审不合格',1:'年审合格'};
function getOperator(code) {
    if (code != null && code!= '') {
        return operator[code];
    }else {
        return '';
    }
}
function getCancelTypeCode(code) {
    if (code != null && code!= '') {
        return cancelTypeCode[code];
    }else {
        return '';
    }
}
function getPayState(code) {
    if (code != null && code != "") {
        return payState[code];
    }else {
        return '';
    }
}
function getInvoiceStatus(code) {
    if (code != null && code != "") {
        return invoiceStatus[code];
    }else {
        return '';
    }
}
function getInfoVehicleState(code) {
    if (code != null) {
        return infoVehicleState[code];
    }else {
        return '';
    }
}
function getFuelType(code) {
    if (code != null && code!= '') {
        var tempFuelType = fuelType[code];
        if (tempFuelType != undefined && tempFuelType != null) {
            return tempFuelType
        }
    }

    return '';
}
function getPlateColor(code) {
    if (code != null && code!= '') {
        return plateColor[code];
    }else {
        return '';
    }
}
function getFixState(code) {
    if (code != null) {
        return fixState[code];
    }else {
        return '';
    }
}
function getCheckState(code) {
    if (code != null) {
        return checkState[code];
    }else {
        return '';
    }
}
function getCommercialType(code) {
    if (code != null && code!= '') {
        return commercialType[code];
    }else {
        return '';
    }
}
function getFlag(code) {
    if (code != null && code!= '') {

        var tempFlag = flag[code];
        if (tempFlag != undefined && tempFlag != null) {
            return tempFlag;
        }
    }
    return '';
}
function getNetType(code) {
    if (code != null && code!= '') {
        return netType[code];
    }else {
        return '';
    }
}
function getMapType(code) {
    if (code != null && code!= '') {
        return mapType[code];
    }else {
        return '';
    }
}
function getComplaintStatus(code) {
    if (code != null) {
        return complaintStatus[code];
    }else {
        return '';
    }
}
function getComplaintWay(code) {
    if (code != null) {
        return complaintWay[code];
    }else {
        return '';
    }
}


//============ajax start==============
//   需要 ajax 请求获取对应的值   //

var fareTypeNote = fareTypeNote;
var companys = companys;
var regionMap = regionMap;

/**
 * 获取运价类型编码
 * @param companyId
 * @param fareType
 * @returns {*}
 */
function getFareTypeNote(companyId,fareType){

    if (companyId != null && companyId != '') {

        for(var i in fareTypeNote) {
            if (i == companyId) {
                for (var j in fareTypeNote[companyId]) {
                    if (j == fareType) {
                        return fareTypeNote[companyId][fareType]
                    }
                }
            }
        }

    }
    return '';
}

/**
 * 获取公司名（别名）
 * @param companyId
 * @returns {*}
 */
function getCompanyName(companyId) {
    for(var i in companys) {
        if (companys[i].companyId == companyId) {
            return companys[i].companyNameAlias;
        }
    }
    if (companyId == "all") {
        return "全部企业";
    }
    return '';
}

/**
 * 获取地区名
 * @param code
 * @returns {*}
 */
function getRegionName(code) {

    for (var i in regionMap) {
        if ( i == code ) {
            return regionMap[code];
        }
    }

    return '';

}

//============ajax end==============