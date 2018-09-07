//2016年7月1日11:34:58
//By 李华荣

//十六进制转二进制字节数组
function Hex2Bytes(str) {
	var len = str.length;
	if (len % 2 != 0) {
		str = "0" + str;
		len = len + 1;
	}
	len /= 2;
	var Bytes = new Array();
	for (var i = 0; i < len; i++) {
		var byteString = str.substr(i * 2, 2);
		var value = parseInt(byteString, 16);
		Bytes.push(value);
	}
	return Bytes;
}



//字节数组转十六进制字符串、
function Bytes2Hex(arr) {
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		var tmp = arr[i].toString(16);
		if (tmp.length == 1) {
			tmp = "0" + tmp;
		}
		str += tmp;
	}
	return str;
}

//二进制转base64  
function bytesToEncodedString(bytes) {
	return btoa(String.fromCharCode.apply(null, bytes));
}

//二进制转字符串
function bytesToString(bytes) {
	return btoa(String.fromCharCode.apply(null, bytes));
}