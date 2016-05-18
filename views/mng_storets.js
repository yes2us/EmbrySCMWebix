define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_storets/storeListView",
	"views/modules/mng_storets/storeStockStructView",	
	"views/modules/mng_storets/storeTargetView",
	"views/modules/mng_storets/storeTargetGridView",
	"views/modules/mng_storets/storeBMRecordView",
	"views/modules/mng_storets/storeImpTSDataView"
], function(stockobject,
	billobject,
	storeListView,
	storeStockStructView,
	storeTargetView,
	storeTargetGridView,
	storeBMRecordView,
	storeImpTSDataView){

checkauthorization(false);


var layout = {
				type: "line",
				cols:[
					storeListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,id:"storets_tabbar",
								options:[
									{id: "storeStockStructView", value: "库存结构"},
									{id: "storeTargetView", value: "目标库存(竖)"},
									{id: "storeTargetGridView", value: "目标库存(横)"},
									{id: "storeBMRecordView", value: "缓冲调整"},
									{id: "storeImpTSDataView", value: "导入目标库存"}
								]
							},
							{
								cells:[
									storeStockStructView,
								    storeTargetView,
								    storeTargetGridView,
									storeBMRecordView,
									storeImpTSDataView
								]
							}
						]
			}
]

};


return {
	$ui:layout,
	$oninit:function(){
		var hasWriteAuth = checkWriteAuth();
		$$("dt_storets").define("editable",hasWriteAuth);
		$$("bnclear1").define("disabled",!hasWriteAuth);
		$$("bnsave1").define("disabled",!hasWriteAuth);
		$$("uploaderid1").define("disabled",!hasWriteAuth);

		
			
		$$("lt_stores").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var storecode = this.getItem(id).partycode;
			var promzStoreTarget = stockobject.getFGWHTSInfo(storecode);
			
			//显示库存结构-大类
			$$("dt_stockstruct").clearAll();
			$$("dt_stockstruct").showOverlay("正在加载......");
			$$("dt_stockstruct").parse(stockobject.getPartyIndex({RelationType:"补货关系",StoreCode:storecode}));

			//显示目标库存
			$$("dt_storets").clearAll();
			$$("dt_storets").showOverlay("正在加载......");
			$$("dt_storets").parse(promzStoreTarget);	
			
			
			//显示目标库存	
//			$$("pivot").data.clearAll();
//			$$("pivot").data.sync($$("dt_storets").data);
//			$$("pivot").$$("data").define("headerRowHeight",0);
			$$("dt_storetspivot").clearAll();
			$$("dt_storetspivot").showOverlay("正在加载......");
			$$("dt_storetspivot").parse(stockobject.getFGWHCrossTSInfo({WHCode:storecode}));	
			
			//显示最近调整记录
			var promzBMData = billobject.getPartyBMRecord({WHCode:storecode,EndDate:'2016-01-01'});
			$$("dt_storebmrecord").clearAll();
			$$("dt_storebmrecord").showOverlay("正在加载......");
			$$("dt_storebmrecord").parse(promzBMData);
			
			});
	}
};

});