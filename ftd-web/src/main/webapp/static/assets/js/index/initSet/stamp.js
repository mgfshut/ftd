function stamp(label,ajaxurl,type,isthumb,scale) {
	//显示详情时候不需添加上传操作
	var body = "";
	body+='<div style="height:14em">' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
		'<div class="col-lg-4 col-md-4 col-sm-4">'+ /*照片布局开始*/
		'</div>'+
		 '<div class="col-lg-4 col-md-4 col-sm-4">'+
		'<div id="file-preview" class="center-block">' +
		'<img src="" alt="" id="imagefile">' +
		'</div><br />' +
		'<div class="center-block" style="width:130px;">' +
		'<a href="javascript:void(0);" class="file">' + label + '' +
		'<input type="file" name="file" id="imageinput"  accept="image/*"  onchange="preview(this)" >' +
		'<div><button type="button" id="upload-btn" class="btn btn-default btn-sm" onclick="ajax_img(' + "'" + ajaxurl + "'" + ',' + "'" + type + "'" + ',' + "'" + isthumb + "'" + ',' + "'" + scale + "'" +
		')">上传</button></div>' +
		'<span id="imagefileid" class="hidden"></span>' +
		'</a>'+
		'</div>'+
		'</div>'+ /*照片布局结束*/
		'</div>'+
		'<div class="col-lg-4 col-md-4 col-sm-4">'+
		'</div></div></div>'; /*<div class='row'> 结束*/
	return body;
}