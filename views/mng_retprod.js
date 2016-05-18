define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_retprod/retListView",
	"views/modules/mng_retprod/retBySKUView",
	"views/modules/mng_retprod/retBySKCView",
	"views/modules/mng_retprod/retPlanView"
], function(
	stockobject,
	billobject,
	retListView,
	retBySKUView,
	retBySKCView,
	retPlanView
){

checkauthorization(false);

var layout = {
				type: "line",
				cols:[
					retListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "retProdBySKUView", value: "按SKU退货"},
									{id: "retProdBySKCView", value: "按款色退货"},
									{id: "retProdPlanView", value: "退货计划"},																			
								]
							},
							{
								cells:[
								    retBySKUView,
								    retBySKCView,
									retPlanView
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
			$$("dt_RetProdBySKU_SubWHTSInfo").define("editable",hasWriteAuth);
			$$("dt_RetProdBySKUPlan").define("editable",hasWriteAuth);
			$$("dt_RetProdBySKC_SubWHTSInfo").define("editable",hasWriteAuth);
			$$("dt_RetProdBySKCPlan").define("editable",hasWriteAuth);
				
			$$("bnreturnsku").define("disabled",!hasWriteAuth);
			$$("bnreturnskc").define("disabled",!hasWriteAuth);
			
		$$("lt_RetProd_Regions").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var regionCode =_CWHCode; //this.getItem(id).id;

			//显示分仓sku
			$$("dt_RetProdBySKU_DWHSKU").clearAll();
			$$("dt_RetProdBySKU_DWHSKU").showOverlay("正在加载......");
			$$("dt_RetProdBySKU_DWHSKU").parse(stockobject.getFGWHTSInfo(regionCode));
			
			//显示分仓skc
			$$("dt_RetProdBySKC_DWHSKC").clearAll();
			$$("dt_RetProdBySKC_DWHSKC").showOverlay("正在加载......");
			$$("dt_RetProdBySKC_DWHSKC").parse(stockobject.getWHSKCInfo({WHCode:regionCode}));
			
			
	
			//显示区域退货计划:退码和退款
			$$("dt_RetProdPlan").clearAll();
			$$("dt_RetProdPlan").showOverlay("正在加载......");
//			$$("dt_RetProdPlan").parse(billobject.getMovSKUPlanItem({TrgPartyCode:regionCode,PlanType:"人工退货",DealState:"未处理"}));
			billobject.getMovSKUPlanItem({TrgPartyCode:regionCode,PlanType:"人工退货",DealState:"未处理"}).then(function(response1){
				var skuPlanData = response1.json();
				billobject.getMovSKCPlanItem({TrgPartyCode:regionCode,PlanType:"人工退货",DealState:"未处理"}).then(function(response2){
					var skcPlanData = response2.json();
				$$("dt_RetProdPlan").parse(skcPlanData.concat(skuPlanData));
				});
			});
			
			});
	}
};

});