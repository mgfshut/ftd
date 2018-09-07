// JavaScript Document
function loadjscssfile(filename,filetype){
    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
    
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
}
loadjscssfile("assets/js/public/PageUtils.js","js");
loadjscssfile("assets/js/public/SelectFromCtr.js","js");
loadjscssfile("assets/js/DateUtils.js","js");
// loadjscssfile("assets/js/public/selectPublic.js","js");