define([
	"data/stockobject",
	"data/billobject"
],
	function(stockobject,billobject){
	  checkauthorization(false);
		
	  var storecode;
      var hasWriteAuth = checkWriteAuth();
      
      function groupData(){
      			$$("dt_storeretsku").hideColumn("skucode");
      			$$("dt_storeretsku").showColumn("check");
			    	$$("dt_storeretsku").group({
			    		  by:"partycode",
			    		  map:{
								partycode:["partycode","any"],
								partyname:["partyname","any"],
								partylevel:["partylevel","any"],
								retskunum:["retskunum","sum"],
			    					retqty:["retqty", "sum"],
			    					check:["check", "any"],
			    				},
			    		});
			    	$$("dt_storeretsku").sort({ by:"title",as:"int", dir:"desc" });
      }
      
      function ungroupData(){
      	     $$("dt_storeretsku").ungroup();
			 $$("dt_storeretsku").showColumn("skucode");
			 $$("dt_storeretsku").hideColumn("check");
      }
      
      function updateRetSKUFillRatio(){
      	  	var selRetSKUList = $$("dt_parentwhsku").find(function(obj){return obj.check==1;});
      	  	for(var i=0;i<selRetSKUList.length;i++)
      	  	{
      	  		selRetSKUList[i].fillqty = 0;
      	  		$$("dt_storeretskuplan").eachRow(function(rowid){
      	  			var row = $$("dt_storeretskuplan").getItem(rowid)
      	  			if(row.skucode==selRetSKUList[i].skucode)
      	  			selRetSKUList[i].fillqty += parseInt(row.movqty);
      	  		});
      	  		
      	  		selRetSKUList[i].fillratio = parseInt(100*parseFloat(selRetSKUList[i].fillqty)/parseInt(selRetSKUList[i].planretqty))+'%';
      	  		$$("dt_parentwhsku").updateItem(selRetSKUList[i]);
      	  	}
      }
      
    	var toolbar1={ 
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"总仓库存信息"},
							]
			};
			
	var grid_parentwhsku = {
		view:"datatable",
		id:"dt_parentwhsku",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:3,
		select: true,
		editable:true,
		navigation:true,
		columns:[
//			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"skucode",header:["SKU",{content:"textFilter"}], sort:"string",width:100,css:'bgcolor2'},
			{ id:"skccode",header:["款杯色",{content:"textFilter"}], sort:"string",width:140,css:'bgcolor2'},
			{ id:"partycode",header:"#",width:35,hidden:true},
			
			{ id:"subtype1code",header:["商品级别",{content:"textFilter"}], sort:"string",width:100},
			{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"seriesname",	header:["系列",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"saletype",	header:["销售分类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"onshelfdays",header:"上货天数", sort:"string",width:85},
			
			{ id:"sale28qty",header:[{text:"销售与库存", colspan:9},"四周销量"],sort:"int", width:85},
			{ id:"saletotalqty",header:[null,"累计销量"],sort:"int", width:85},
			{ id:"targetqty",header:[null,"目标库存"],sort:"int", width:85},
			{ id:"onhandqty",header:[null,"在手库存"],sort:"int", width:70},
			{ id:"onroadqty",	header:[null,"在途库存"],sort:"int", width:70},

			{ id:"onhandstockdays",header:[null,"在手天数"],sort:"int", width:70},
			{ id:"onroadstockdays",	header:[null,"在途天数"],sort:"int", width:70},
			{ id:"overstockqty",header:[null,"过量库存"],sort:"int", width:60},
			{ id:"shortstockqty",header:[null,"缺口库存"],sort:"int", width:60},
			
			{ id:"planretqty",header:[{text:"退货决策", colspan:4},"计划退货"],sort:"int", width:85,css:'bgcolor1',editor:"text"},
			{ id:"fillqty",header:[null,"达成数量"], sort:"string",width:85},
			{ id:"fillratio",header:[null,"达成率"],sort:"string",width:85},			
			{ id:"check",header:[null,"退货"],sort:"int",width:60,template:"{common.checkbox()}",hidden:false}
		],
			on:{
				onCheck:function(id,e,node){
						ungroupData();
						var row = this.getItem(id);
						var matchRow = $$("dt_storeretsku").find(function(obj){return obj.skucode.trim()==row.skucode.trim();});
						
						if(row.check && !matchRow.length)
						{
							stockobject.getSKUPotentialRetList(row.skucode).then(function(response){
								response = response.json();
								
								response.forEach(function(item){
									$$("dt_storeretsku").add({
									partycode:item.partycode,
									partyname:item.partyname,
									partylevel:item.partylevel,
									retskunum:item.retskunum,
									skucode:item.skucode,
									retqty:item.retqty
								});
								})
							});
						}
						
						if(!row.check && matchRow.length)
						{
							for(var _i=0;_i<matchRow.length;_i++)
							$$("dt_storeretsku").remove(matchRow[_i].id);
						}
				},
				onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			}
	};


			
   var grid_storeretsku = {
		view:"treetable",
		id:"dt_storeretsku",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		editable:true,
		select:true,
		navigation:true,
		leftSplit:3,
		columns:[
			{ id:"partycode",	header:"门店编号", sort:"string",width:85},
			{ id:"partyname",header:"门店名称", sort:"string",width:150},
			{ id:"partylevel",header:"门店级别", sort:"string",width:85},		
			{ id:"skucode",header:"SKU",sort:"int", width:100},		
			{ id:"retskunum",header:"SKU数量",sort:"int", width:85},
			{ id:"retqty",header:"退货数量",sort:"int", width:85},		
			{ id:"check",header:"退出",sort:"int", width:60,template:"{common.checkbox()}",hidden:true}
		],
			on:{
				onCheck:function(id,e,node){
						$$("dt_storeretskuplan").hideOverlay();
						
						var row = this.getItem(id);
						var matchRow = $$("dt_storeretskuplan").find(function(obj){
							return obj.srcpartycode.trim()===row.partycode.trim();});
							
						if(row.check && !matchRow.length)
						{
							$$("dt_storeretsku").data.each(function(obj){
								if(obj.skucode && obj.partycode===row.partycode)
								$$("dt_storeretskuplan").add({
									srcpartycode:obj.partycode,
									srcpartyname:obj.partyname,
									trgpartycode:_CWHCode,
									skucode:obj.skucode,
									movqty:obj.retqty
								});
							});
						}
						
					if(!row.check && matchRow.length)
					{
						for(var _i=0;_i<matchRow.length;_i++)
							$$("dt_storeretskuplan").remove(matchRow[_i].id);
					}
					
					updateRetSKUFillRatio();
				},
				onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			}
	};
	
	    var toolbar2={ 
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{ view: "label",label:"门店可退信息"}, 
			    					{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "合并", width: 70, click:groupData},													
			    					{ view: "button", type: "iconButton", icon: "arrows-alt", label: "展开", width: 70, click:ungroupData}														
							]
			};
	
	var grid_storeretskuplan = {
		view:"datatable",
		id:"dt_storeretskuplan",
		width:400,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:400,autoheight:false,scroll:true},
		editable:true,
		select:true,
		save:urlstr+"/WBCURDMng/saveMovSKUPlan",
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"id",width:35,hidden:true},
			{ id:"srcpartycode",	header:"退货门店编号",fillspace:1},
			{ id:"srcpartyname",header:"退货门店", fillspace:2},
			{ id:"trgpartycode",	header:"调入门店编号",hidden:true,hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",hidden:true, fillspace:1},
			{ id:"skucode",header:"SKU", sort:"string",fillspace:1},
			{ id:"movqty",header:"退货数量",sort:"int",fillspace:1,editor:"text",css:'bgcolor1'}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}		
	};
	

			
	var grid_storeinskc={ 
					view:"form",width:500, scroll:false,type: "clean",
					elements:[
						{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"门店退货计划"},
			    					{ view: "button", type: "iconButton", icon: "times", label: "清空", width: 70, 
			    						click:function(){
			    							var rowIDs = new Array();
			    							$$("dt_storeretskuplan").eachRow(function(rowid){rowIDs.push($$("dt_storeretskuplan").getItem(rowid).id);});
			    						    for(var i=0; i<rowIDs.length;i++) $$("dt_storeretskuplan").remove(rowIDs[i]);
			    						}},
			    					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
								click:function(){webix.toExcel($$("dt_storeretskuplan"));}},						
							]
						},
					grid_storeretskuplan
					]
			};
				
	var layout = {
		type: "clean",
		id: "dwhRefrByStoreView",
		rows:[
			toolbar1,
			grid_parentwhsku,
			{view:"resizer"},
			{cols:[{rows:[toolbar2,grid_storeretsku]},{view:"resizer",width:1},grid_storeinskc]}
		]
	};

   
	return { 
		$ui: layout ,
		$oninit:function(){
			$$("dt_parentwhsku").showOverlay("正在加载......");
			$$("dt_storeretskuplan").showOverlay("正在加载......");
			stockobject.getCWHSKU().then(
				function(response1){
					if(response1) $$("dt_parentwhsku").parse(response1.json());
					return billobject.getMovSKUPlanItem({PlanType:"集批退货",DealState:"未处理",MakeDate:new Date().toString("yyyy/M/d")});
				}
			).then(function(response2){
				if(response2) $$("dt_storeretskuplan").parse(response2.json());
				updateRetSKUFillRatio();
			});
			
		   webix.dp.$$("dt_storeretskuplan").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.makedate = (new Date()).toString('yyyy/MM/dd');
	    			obj.data.plantype = "集批退货";
	    			obj.data.operator = _UserCode+'@'+_UserName;
	    			obj.data.dealstate = "未处理";
	    		});
	    		
	    	 webix.dp.$$("dt_storeretskuplan").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_storeretskuplan").getItem(id)._identify = response;
				$$("dt_storeretskuplan").refresh();   
			});    		
		}
	};

});
