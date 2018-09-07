function Cut(str) {
	var type = UrlValue("v");
	switch (type) {
		case "SubSchool":
			ToExcel(str);
			break;
		case "TeachSiteSel":
			break;
		case "Dr":
			ToExcel(str);
			break;
		case "DrTeachingSelect":
			break;
		case "IllegelTeachSelect":
			break;
		case "Blacklist":
			break;
		case "CoachesManagement":
			break;
		case "TeachingStatus":
			break;
		case "CoachesStatus":
			break;
		case "StudentManagement":
			break;
		case "StudentSelect":
			break;
		case "ComTraining":
			break;
		case "TheoryTraining":
			break;
		case "SimulatedTraining":
			break;
		case "PracticalTraining":
			break;
		case "Permissions":
			break;
		case "role":
			break;
		case "user":
			break;
		case "DrStatistica":
			break;
		case "CoachesStatistical":
			break;
		case "StudentStatistical":
			break;
		case "ComplaintStatistical":
			break;
		case "paymentStatistical":
			break;
		case "Assessment":
			return str;
			break;
	}
}

//导出Excel函数
function ToExcel(str) {
	var TableToExel = function() {
		$("#dt").table2excel({
			exclude: ".noExl",
			name: str
		});
	};
	modal_confirm("是否导出当前列表信息?", TableToExel);
}