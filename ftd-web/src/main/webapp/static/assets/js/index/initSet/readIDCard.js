function init() {
	var str = '<OBJECT classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7"' + 'id="CVR_IDCard" name="CVR_IDCard"  width="0" height="0" >' + '</OBJECT>'
	return str;
}

function ClearForm() {
	var type = UrlValue("v"),
		clearFun = function(obj) {
			$(obj.name).val("");
			$(obj.sex).val("");
			$(obj.birthday).val("");
			$(obj.cardnum).val("");
			$(obj.imagefile).attr("src", "");
		};
	switch (type) {
		case "StudentManagement":
			clearFun({
				name: "#Sm_name",
				sex: "#Sm_sex",
				birthday: "#Sm_birthday",
				cardnum: "#Sm_cardnum",
				imagefile: "#imagefile"
			});
			break;
		case "Dr":
			clearFun({
				name: "#Md_name",
				sex: "#Mdsex",
				birthday: "#Md_birthday",
				cardnum: "#Md_cardnum",
				imagefile: "#imagefile"
			});
			break;
	}
	return false;
}

function read(url) {
	var type = UrlValue("v");
	var CVR_IDCard = document.getElementById("CVR_IDCard");
	var strReadResult = CVR_IDCard.ReadCard();
	if (strReadResult == "0") {
		ClearForm();
		switch (type) {
			case "StudentManagement":
				$("#Sm_name").val(CVR_IDCard.Name);
				var sexE = "";
				if (CVR_IDCard.Sex == "男") {
					sexE = "MALE";
				} else if (CVR_IDCard.Sex == "女") {
					sexE = "FEMALE";
				}
				$("#Sm_sex").select2("val", sexE);
				$("#Sm_cardtype").select2("val", "IDCARD");
				var smD = CVR_IDCard.Born.replace("年", "-").replace("月", "-");
				smD = smD.replace("日", "");
				$("#Sm_birthday").val(smD);
				$("#Sm_cardnum").val(CVR_IDCard.CardNo);
				$("#Sm_censusregister").val(CVR_IDCard.Address);
				$("#Sm_Address").val(CVR_IDCard.Address);
				var base64 = "data:image/png;base64," + CVR_IDCard.Picture;
				$("#imagefile").attr("src", base64);
				break;
			case "Dr":
				$("#Md_name").val(CVR_IDCard.Name);
				var sexE = "";
				if (CVR_IDCard.Sex == "男") {
					sexE = "MALE";
				} else if (CVR_IDCard.Sex == "女") {
					sexE = "FEMALE";
				}
				$("#Md_sex").select2("val", sexE);
				var dmD = CVR_IDCard.Born.replace("年", "-").replace("月", "-");
				dmD = dmD.replace("日", "");
				$("#Md_birthday").val(smD);
				$("#Md_cardnum").val(CVR_IDCard.CardNo);
				$("#Md_drilicence").val(CVR_IDCard.CardNo);
				$("#Md_address").val(CVR_IDCard.Address);
				var base64 = "data:image/png;base64," + CVR_IDCard.Picture;
				$("#imagefile").attr("src", base64);
				break;
		}
		sumitImageFile(base64, url);
	} else {
		ClearForm();
		 (strReadResult);
		return false;
	}

}