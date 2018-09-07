function getTableConObj() {
	var type = UrlValue("v");
	switch(type) {
		case "EnrolStudentStatistical":
			return window.top[type + "_Table_Con"]();
		default:
			if(window.top[type + "_Table_Con"] != undefined) {
				return window.top[type + "_Table_Con"];
			} else {
				return {
					"title": "未设定",
					"data": []
				}
			}
	}
}