/**
*@date 2017/10/16
*@name chendb
*@sin 统计输入框输入的字符个数
*/
    //显示限制输入字符method
    function textAreaChange(obj){
        var $this = $(obj);
        var count_total = $this.next().children('span').text();
        var count_input = $this.next().children('em');
        var area_val = $this.val();
        if(area_val.len()>count_total){
            area_val = autoAddEllipsis(area_val,count_total);//根据字节截图内容
            $this.val(area_val);
            count_input.text(0);//显示可输入数
        }else{
            count_input.text(count_total - area_val.len());//显示可输入数
        }
    }
    //得到字符串的字节长度
    String.prototype.len = function(){
        return this.replace(/[^\x00-\xff]/g, "xx").length;
    };
    /*
     * 处理过长的字符串，截取并添加省略号
     * 注：半角长度为1，全角长度为2
     * pStr:字符串
     * pLen:截取长度
     * return: 截取后的字符串
     */
    function autoAddEllipsis(pStr, pLen) {
        var _ret = cutString(pStr, pLen);
        var _cutFlag = _ret.cutflag;
        var _cutStringn = _ret.cutstring;
        return _cutStringn;
    }
    /*
     * 取得指定长度的字符串
     * 注：半角长度为1，全角长度为2
     * pStr:字符串
     * pLen:截取长度
     * return: 截取后的字符串
     */
    function cutString(pStr, pLen) {
        // 原字符串长度
        var _strLen = pStr.length;
        var _tmpCode;
        var _cutString;
        // 默认情况下，返回的字符串是原字符串的一部分
        var _cutFlag = "1";
        var _lenCount = 0;
        var _ret = false;
        if (_strLen <= pLen/2){_cutString = pStr;_ret = true;}
        if (!_ret){
            for (var i = 0; i < _strLen ; i++ ){
                if (isFull(pStr.charAt(i))){_lenCount += 2;}
                else {_lenCount += 1;}
                if (_lenCount > pLen){_cutString = pStr.substring(0, i);_ret = true;break;}
                else if(_lenCount == pLen){_cutString = pStr.substring(0, i + 1);_ret = true;break;}
            }
        }
        if (!_ret){_cutString = pStr;_ret = true;}
        if (_cutString.length == _strLen){_cutFlag = "0";}
        return {"cutstring":_cutString, "cutflag":_cutFlag};
    }
    /*
     * 判断是否为全角
     *
     * pChar:长度为1的字符串
     * return: true:全角
     *         false:半角
     */
    function isFull (pChar){
        if((pChar.charCodeAt(0) > 128)){return true;}
        else{return false;}
    }
	
	
	/**
	*添加重置上下移动
	*/
	function show(){ 
	  var strIds=new Array();
	  
	  $("input[name=items]").each(function (i,d){ 
		if(d.checked) { 
		for(var i=0;i<strIds.length;i++){
		}
		   var math =i+1+"、";
		  strIds.push(math+d.value); 
		} 
	  }) 
	  if(strIds.length<1){
		alert("您没有选中项!"); 
	  }  
	  else{ 
		var ids=strIds.join(",");
				//alert("你选中的字符串有："+ids);
			    //var textS =[1,2,3,4,5]
				//var text = $("#textarea").val();
			    //text += ids;
			    //加上上面的代码就可以重复添加，在这里我们要防止这样的操作
			$("#textarea").val(ids);
	  }  
	} 
	$(document).ready(function(){
	  $("#add").click(function(){
		show();
	  })
	})
	  //控制标签移动逻辑
     
	  $(function(){
	  
	  //向上移动
        $ ('#setTop').click (function (){
		//判断复选框是否只选择了一个
		 var items = document.getElementsByName("items");
         var checkNum = 0;
		 for (var i = 0; i < items.length; i++) {
          if (items[i].checked) {
              checkNum++;
           }
          }
		  if (checkNum == 1) {
		    var insert = $ ('table tr :checkbox:checked').closest ('tr');
            var tr = insert.prev ('tr');
            tr.before (insert);
           }if(checkNum == 0){
		      alert("请至少选中一个再向上移动");
		   }if(checkNum >=2){
		      alert("一次只能向上移动一个");
		   }
        });
         //向下移动
        $ ('#setBottom').click (function (){
			 var items = document.getElementsByName("items");
             var checkNum = 0;
		     for (var i = 0; i < items.length; i++) {
              if (items[i].checked) {
                 checkNum++;
               }
          }
		if(checkNum == 1){
		    var insert = $ ('table tr :checkbox:checked').closest ('tr');
            var tr = insert.next ('tr');
            tr.after (insert);
		}if(checkNum == 0){
		   alert("请至少选中一个再向下移动");
		}if(checkNum >=2){
		      alert("一次只能向下移动一个");
		   }
        });
		
		 //重置textarea
		$('#ClearTextArea').click (function (){
		   document.getElementById("textarea").value="";
		   });
    });
