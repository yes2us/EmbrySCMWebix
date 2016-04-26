define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_cwhts/cwhListView",
	"views/modules/mng_cwhts/cwhTSView",
	"views/modules/mng_cwhts/cwhBMRecordView",
	"views/modules/mng_cwhts/cwhImpTSDataView"
], function(
	stockobject,
	billobject,
	cwhListView,
	cwhTSView,
	cwhBMRecordView,
	cwhImpTSDataView){

checkauthorization(false);


var layout = {
	type: "line",
	cols:[cwhListView,{view:"resizer"},
	{rows:[
		{view: "tabbar", multiview: true,optionWidth: 130,
			options:[
				{id: "cwhTSView", value: "目标库存"},
//				{id: "cwhSugRepPlanView", value: "理论补货"},
				{id: "cwhBMRecordView", value: "缓冲调整"},
				{id: "cwhImpTSDataView", value: "导入目标库存"}
			]
		},
		{
			cells:[
			    cwhTSView,
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
			if(!checkWriteAuth())
			{
				$$("dt_cwhts").define("editable",false);
				$$("bnclear").define("disabled",true);
				$$("bnsave").define("disabled",true);
			}
			
			
			$$("cwhListView").hide();
			
			var cwhcode = "T";
			var promzTSData = stockobject.getFGWarehouseTSInfo(cwhcode);

			//显示目标库存
			$$("dt_cwhts").showOverlay("正在加载......");
			$$("dt_cwhts").clearAll();
			$$("dt_cwhts").parse(promzTSData);


			//显示最近调整记录
			var promzBMData = billobject.getPartyBMRecord({WHCode:cwhcode,EndDate:'2016-01-01'});
			$$("dt_cwhbmrecord").showOverlay("正在加载......");
			$$("dt_cwhbmrecord").clearAll();
			$$("dt_cwhbmrecord").parse(promzBMData);
			
	}
};

});