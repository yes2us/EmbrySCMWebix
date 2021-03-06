define([
	"data/stockobject",
	"data/billobject",
	"data/partyobject",
	"views/modules/mng_dwhmov/dwhMovListView",
	"views/modules/mng_dwhmov/dwhMovBySKCView",
	"views/modules/mng_dwhmov/dwhMovByStoreView",
	"views/modules/mng_dwhmov/dwhMovPlanView"
], function(
	stockobject,
	billobject,
	partyobject,
	dwhMovListView,
	dwhMovBySKCView,
	dwhMovByStoreView,
	dwhMovPlanView
){

checkauthorization(false);

var layout = {
				type: "line",
				cols:[
					dwhMovListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "dwhMovBySKCView", value: "按款调拨"},
									{id: "dwhMovByStoreView", value: "按仓调拨"},
									{id: "dwhMovPlanView", value: "调拨计划"}
								]
							},
							{
								cells:[
								    dwhMovBySKCView,
									dwhMovByStoreView,	
									dwhMovPlanView
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
			$$("dt_dwhMovBySKC").define("editable",hasWriteAuth);
			$$("dt_dwhMovStoreTSInfo").define("editable",hasWriteAuth);
			$$("dt_movPlan1").define("editable",hasWriteAuth);
			$$("dt_movPlan2").define("editable",hasWriteAuth);
				
			$$("bnmove1").define("disabled",!hasWriteAuth);
			$$("bnmove2").define("disabled",!hasWriteAuth);
		
		$$("bnSaveBranchCode116").attachEvent("onItemClick",function(id){
			
			var branchCode = dwhMovListView.getBranchCode();

			//显示分仓/总仓目标库存
			$$("dt_dwhmovskc").clearAll();
			$$("dt_dwhmovskc").showOverlay("正在加载......");
			$$("dt_dwhmovskc").parse(stockobject.getWHSKCInfo({WHCode:_CWHCode}));
			
			//显示门店库存结构
			$$("dt_dwhmovstorestockstruct").clearAll();
			$$("dt_dwhmovstorestockstruct").showOverlay("正在加载......");
			$$("dt_dwhmovstorestockstruct").parse(stockobject.getPartyIndex({BranchCode:branchCode}));
			$$("popupid2").clearAll();
			$$("popupid2").parse(partyobject.getRelPartyList({
				RegionCode:_CWHCode,RelationType:"补货关系",
				FieldStr:"PartyCode as id,PartyCode,PartyName,PartyLevel"}));
			
			//
			partyobject.getRelPartyList({
				RegionCode:_CWHCode,
				RelationType:"归属关系",
				FieldStr:"PartyCode,PartyName,PartyLevel"
				}).then(function(rsData){
				  var rsJson = rsData.json();
				  dwhMovBySKCView.setRegionStores(rsJson);
				  dwhMovByStoreView.setRegionStores(rsJson);
			});
			//显示调拨计划
			$$("dt_dwhMovPlan").clearAll();
			$$("dt_dwhMovPlan").showOverlay("正在加载......");
			$$("dt_dwhMovPlan").parse(billobject.getMovSKCPlanItem({BranchCode:branchCode,PlanType:"人工调拨"}));

			
			
			});
	}
};

});