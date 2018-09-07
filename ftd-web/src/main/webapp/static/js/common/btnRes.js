/**
 * Created by zha on 2017/10/31.
 * 按钮控制
 */
$(function() {
    btnRes.initial();
});

var btnRes = {

    initial : function initial() {
        this.filterBtn();
    },

    filterBtn : function filterBtn(btnId) {
        var inArray = $.inArray(btnId,global.resList);
        if (inArray == -1) {
            $("#" + btnId).css("display","none");
        }
    }

};