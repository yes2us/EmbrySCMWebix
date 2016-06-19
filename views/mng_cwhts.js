define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_cwhts/cwhListView",
	"views/modules/mng_cwhts/cwhTargetView",
	"views/modules/mng_cwhts/cwhTargetGridView",
	"views/modules/mng_cwhts/cwhBMRecordView",
	"views/modules/mng_cwhts/cwhImpTSDataView"
], function(
	stockobject,
	billobject,
	cwhListView,
	cwhTargetView,
	cwhTargetGridView,
	cwhBMRecordView,
	cwhImpTSDataView){

checkauthorization(false);


var layout = {
	type: "line",
	cols:[cwhListView,{view:"resizer"},
	{rows:[
		{view: "tabbar", multiview: true,optionWidth: 130,
			options:[
				{id: "cwhTargetView", value: "目标库存(竖)"},
				{id: "cwhTargetGridView", value: "目标库存(横)"},
				{id: "cwhBMRecordView", value: "缓冲调整"},
				{id: "cwhImpTSDataView", value: "导入目标库存"}
			]
		},
		{
			cells:[
			    cwhTargetView,
			    cwhTargetGridView,
				cwhBMRecordView,
				cwhImpTSDataView
			]
		}
	]}
	]
};


return {
	$ui:layout,
	$oninit:function(){

		var hasWriteAuth = checkWriteAuth();
		$$("dt_cwhts").define("editable",hasWriteAuth);
		$$("bnclear2").define("disabled",!hasWriteAuth);
		$$("bnsave2").define("disabled",!hasWriteAuth);
		$$("uploaderid2").define("disabled",!hasWriteAuth);
		
			
			$$("cwhListView").hide();
			
			var cwhcode = _CWHCode;
			var promzTSData = stockobject.getFGWHTSInfo({WHCode:cwhcode,UserCode:_UserCode});

			//显示目标库存
			$$("dt_cwhts").showOverlay("正在加载......");
			$$("dt_cwhts").clearAll();
			$$("dt_cwhts").parse(promzTSData);
			
			$$("dt_cwhtspivot").clearAll();
			$$("dt_cwhtspivot").showOverlay("正在加载......");
			$$("dt_cwhtspivot").parse(stockobject.getFGWHCrossTSInfo({WHCode:cwhcode,UserCode:_UserCode}));	

			//显示最近调整记录
			var promzBMData = billobject.getPartyBMRecord({WHCode:cwhcode,EndDate:'2016-01-01'});
			$$("dt_cwhbmrecord").showOverlay("正在加载......");
			$$("dt_cwhbmrecord").clearAll();
			$$("dt_cwhbmrecord").parse(promzBMData);
			
	}
};

});