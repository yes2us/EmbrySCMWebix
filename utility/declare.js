		var urlstr;
		var homestr;
		var localhost;
		var isDebug = false;
		
		var _UserObject;
		var _UserCode;
		var _UserName;
		var _BelongDeptCode;
		var _RawUserCode;
		var _DSSuffix;
		var _RowHeight = 20;
		var _HeaderRowHeight = 20;
		var _ListWidth=210;
		var _CWHCode;
		

    urlstr = "http://"+window.location.host+"/EmbrySCMAdmin/index.php/Home";
	homestr = "http://"+window.location.host+"/EmbrySCMWebix";
	localhost = "http://"+window.location.host;
	
	webix.ajax().post(urlstr+"/WBUserMng/getMyCWH",{UserCode:''}).then(function(response){
		var response=response.json();
		if(response.length)
		{
			_CWHCode=response[0].partycode;
		}
	});
			

	function downloadFile(targeturl,fileName)
	{
			var link = document.createElement("a");
			link.href = targeturl;
			link.download = fileName;
			document.body.appendChild(link);
			link.click(); 
			
			webix.message("处理中，请等待");
								
			webix.delay(function(){
				window.URL.revokeObjectURL(targeturl);
				document.body.removeChild(link);
				link.remove();
			});
	}
