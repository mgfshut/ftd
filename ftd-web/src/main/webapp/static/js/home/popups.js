//企业跳转
		    function compay(){
		      layer.open({
		        type: 2
		        ,title: "网约车企业总数" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/inq/company/list'
		      });
		    }
    //车辆跳转
    function vehicle(){
    	  layer.open({
		        type: 2
		        ,title: "车辆总数" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/inq/vehicle/query'
		      });
    }
    //驾驶员跳转
    function person(){
    	 layer.open({
		        type: 2
		        ,title: "驾驶员总数" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/inq/person/list'
		      });
    }
    //超比例停运
    function superratio(){
    	 layer.open({
		        type: 2
		        ,title: "超比例停运" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/ops/warnManage/overLogout'
		      });
    }
    //异常聚集
    function abnormalgathering(){
    	 layer.open({
		        type: 2
		        ,title: "异常聚集" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/ops/warnManage/list'
		      });
    }
    //无证营运
    function unlicensedoperation(){
    	 layer.open({
		        type: 2
		        ,title: "无证营运" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/ops/warnNoLicense/person'
		      });
    }
    //超范围营运
    function ultrarange(){
    	 layer.open({
		        type: 2
		        ,title: "超范围营运" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/ops/warnManage/outScope'
		      });
    }
    //重点区域运力监控(空车数)
        function focusarea(){
    	 layer.open({
		        type: 2
		        ,title: "重点区域运力监控(空车数)" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/inq/company/list'
		      });
    }
    //网约车企业待办
        function onclickcompanyurl(){
    	 layer.open({
		        type: 2
		        ,title: "网约车企业待办" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/license/company/list'
		      });
    }
    //网约车车辆待办
        function onclicvehicleurl(){
    	 layer.open({
		        type: 2
		        ,title: "网约车车辆待办" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/license/vehicle/list'
		      });
    }
    //网约车驾驶员待办
        function onclicpersonurl(){
    	 layer.open({
		        type: 2
		        ,title: "网约车驾驶员待办" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/license/person/list'
		      });
    }
    //待处理投诉
        function onclicdetailurl(){
    	 layer.open({
		        type: 2
		        ,title: "待处理投诉" //不显示标题栏
		        ,area: ['100%', '100%']
		        ,maxmin:true
		        ,content: path+'/inq/complaint/list'
		      });
    }