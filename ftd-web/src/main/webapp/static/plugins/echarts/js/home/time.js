function load(){
			window.setInterval('time(clock)',10000);
			window.setInterval('time(clock1)',10000);
			window.setInterval('time(clock2)',10000);
		}

var time= function showRealTime(clock){	
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var days = new Array("日","一","二","三","四","五","六");
	var day = d.getDay();
	var hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
	var min = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
	var sec = (d.getSeconds() < 10) ? ("0" + d.getSeconds()) : d.getSeconds()    
	
	/*var now = year + "年" + month + "月" + date + "日             "+ hour + ":" + min + ":" + sec;*/
	var now = year + "年" + month + "月" + date + "日             "
	clock.innerHTML = "统计时间：" + now;
}
time(clock);
time(clock1);
time(clock2);

