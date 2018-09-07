  function UrlValue(name) { //获取页面URL地址参数方法
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //声明正则表达式
        var r = window.location.search.substr(1).match(reg); //用正则表达式匹配URL地址参数
        if (r != null) return decodeURI(r[2]); return null; //如果匹配到参数，返回参数结果，如果没有匹配到，返回null
}
      
        