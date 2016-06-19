define([
	"data/stockobject",
	"data/billobject"
],
	function(stockobject,billobject){
	  checkauthorization(false);
		
	  var storecode;
      var hasWriteAuth = checkWriteAuth();
      
      /**
       * 
       * 将退货SKU列表中的每一个SKU所在门店的可退信息一个一个地载入到门店退货明细中
       */
      function loadStoreRetSKUDetail(row){
						var matchRow = $$("dt_storeretsku").find(function(obj){return obj.skucode.trim()==row.skucode.trim();});
						
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
      
        /**
       * 
       * 对门店退货明细表按门店进行汇总
       */
      function groupData(){
      			$$("selectAll").show();
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
        
       /**
       * 
       * 对门店退货明细表取消汇总
       */
      function ungroupData(){
      		$$("selectAll").hide();
      	
      	     $$("dt_storeretsku").ungroup();
			 $$("dt_storeretsku").showColumn("skucode");
			 $$("dt_storeretsku").hideColumn("check");
      }
      
      /**
       * 
       * 当门店退货明细表在汇总模式下，选择一个门店或取消选择这个门店时，将这个门店的退货计划增加或删除
       */
      function updateRetPlan(row){
      
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
      }
      
      /**
       * 
       * 更新每一个退货SKU的实际退货达成情况
       */
      function updateRetSKUFillRatio(){
      	  	var selRetSKUList = $$("dt_toretskulist").find(function(obj){return obj.skucode>"";});
      	  	for(var i=0;i<selRetSKUList.length;i++)
      	  	{
      	  		selRetSKUList[i].fillqty = 0;
      	  		$$("dt_storeretskuplan").data.each(function(row){
      	  			if(row.skucode==selRetSKUList[i].skucode)
      	  			selRetSKUList[i].fillqty += parseInt(row.movqty);
      	  		});
      	  		
      	  		selRetSKUList[i].fillratio = parseInt(100*parseFloat(selRetSKUList[i].fillqty)/parseInt(selRetSKUList[i].planretqty))+'%';
      	  		$$("dt_toretskulist").updateItem(selRetSKUList[i]);
      	  	}
      }
      
      
      /**
       * 
       * 总仓SKU明细-toolbar
       */
    	var toolbar_parentwhskulist={ 
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"总仓库存信息"},
								{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
								click:function(){
									var targeturl= urlstr+"/WBStockMng/getCWHSKU/CSV/1/UserCode/"+_UserCode;
									window.open(targeturl, "_blank");
								}},
							]
			};
			
	
	   /**
       * 
       * 总仓SKU明细
       */
	var grid_parentwhsku = {
		view:"datatable",
		id:"dt_parentwhsku",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:1,
		select: true,
		editable:true,
		navigation:true,
		columns:[
//			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"skucode",header:["SKU",{content:"textFilter"}], sort:"string",width:100,css:'bgcolor2'},
			{ id:"skccode",header:["款杯色",{content:"textFilter"}], sort:"string",width:120},
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
			{ id:"planretqty",header:"计划退货",sort:"int", width:85,css:'bgcolor1',editor:"text"},

		],
			on:{
				onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			}
	};


      /**
       * 
       * 用户导入的退货SKU列表-toolbar
       */
		var toolbar_retskulist={ 
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"退货SKU清单"},
								{ view: "button", type: "iconButton", icon: "plus", label: "增加", width: 70, 
								click:function(){
									var rownum =0;
									for(var i=rownum+1; i<=100+rownum;i++)
									$$("dt_toretskulist").add({rownum:i});
								}},
								{ view: "button", type: "iconButton", icon: "times", label: "清空", width: 70, click:function(){$$("dt_toretskulist").clearAll();}},
							]
			};


      /**
       * 
       * 用户导入的退货SKU列表
       */
	var grid_toretskulist = {
		view:"datatable",
		id:"dt_toretskulist",
		width:500,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:400,autoheight:false,scroll:true},
		editable:true,
		select:true,
		footer:true, header:true,
		select:"cell",
//		multiselect:true,
		blockselect:true,
		clipboard:"block",
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50,footer:{text:"总计:", colspan:1}},
			{ id:"skucode",header:["SKU",{content:"textFilter"}],sort:"string",fillspace:1},
			{ id:"planretqty",header:"计划退货",sort:"int",fillspace:1,editor:"text",css:'bgcolor1',footer:{ content:"summColumn" }},
			{ id:"fillqty",header:"达成数量", sort:"string",width:85,footer:{ content:"summColumn" }},
			{ id:"fillratio",header:"达成率",sort:"string",width:85},		
		],
		on:{
			onSelectChange:function(){
					var selRow = this.getSelectedItem();
					if(selRow.skucode>"")
					{
						$$("dt_storeretskuplan").filter(function(obj){
							return obj.skucode==selRow.skucode;
						});
					}
				},
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};
	
	
	/**
       * 
       * 用户导入的退货SKU在门店的退货信息-toolbar
       */
	    var toolbar_storeretsku={ 
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{ view: "label",label:"可退明细"}, 
								{ view: "button", type: "iconButton", icon: "times", label: "清空", width: 70, click:function(){$$("dt_storeretsku").clearAll();}},
								{ view: "button", type: "iconButton", icon: "flash", label: "载入", width: 70, 
			    						click:function(){
			    							ungroupData();
			    							$$("dt_toretskulist").eachRow(function(rowId){
			    								var row = $$("dt_toretskulist").getItem(rowId);
			    								if(row.skucode>"")
			    								{
												loadStoreRetSKUDetail(row);
			    								}
			    							});
			    					}},
			    					{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "合并", width: 70, click:groupData},													
			    					{ view: "button", type: "iconButton", icon: "arrows-alt", label: "展开", width: 70, click:ungroupData},
			    					{ view:"checkbox", id:"selectAll", label:"全选", value:0,labelWidth:50,width:100,hidden:true,
			    					click:function(){
			    						
			    						$$("dt_storeretsku").hideOverlay();
			    						var checkValue = $$("selectAll").getValue();
			    						
			    						$$("dt_storeretsku").eachRow(function(rowId){
			    								var row = $$("dt_storeretsku").getItem(rowId);
			    								row.check=checkValue;
			    								$$("dt_storeretsku").updateItem(row);
											updateRetPlan(row);
			    							});
									updateRetSKUFillRatio();

			    					}},
			    					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
								click:function(){webix.toExcel($$("dt_storeretsku"));}},		
							]
			};
			
	  /**
       * 
       * 用户导入的退货SKU在门店的退货信息
       */
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
		footer:true, header:true,
		columns:[
			{ id:"partycode",	header:["门店编号",{content:"textFilter"}], sort:"string",width:85,footer:{text:"总计:", colspan:3}},
			{ id:"partyname",header:"门店名称", sort:"string",width:150},
			{ id:"partylevel",header:"门店级别", sort:"string",width:85},		
			{ id:"skucode",header:"SKU",sort:"string", width:100},		
			{ id:"retskunum",header:"SKU数量",sort:"int", width:85,footer:{ content:"summColumn" }},
			{ id:"retqty",header:"退货数量",sort:"int", width:85,footer:{ content:"summColumn" }},		
			{ id:"check",header:"退出",sort:"int", width:60,template:"{common.checkbox()}",hidden:true}
		],
			on:{
				onCheck:function(id,e,node){
						$$("dt_storeretskuplan").hideOverlay();
						var row = this.getItem(id);
						updateRetPlan(row);
					
						updateRetSKUFillRatio();
				},
			  onSelectChange:function(){
					var selRow = this.getSelectedItem();
					if(selRow.partycode>"")
					{
						$$("dt_storeretskuplan").filter(function(obj){
							return obj.srcpartycode==selRow.partycode;
						});
					}
				},
				onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			}
	};
	
		/**
       * 
       * 实际退货计划-toolbar
       */
      
		var toolbar_storeretskuplan={
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"退货计划"},
			    					{ view: "button", type: "iconButton", icon: "times", label: "清空", width: 70, 
			    						click:function(){
			    							var rowIDs = new Array();
			    							$$("dt_storeretskuplan").eachRow(function(rowid){rowIDs.push($$("dt_storeretskuplan").getItem(rowid).id);});
			    						    for(var i=0; i<rowIDs.length;i++) $$("dt_storeretskuplan").remove(rowIDs[i]);
			    						}},
			    					{ view: "button", type: "iconButton", icon: "arrows-alt", label: "全部", width: 70, 
								click:function(){						
									$$("dt_storeretskuplan").filter(function(obj){
									return true;
								});}},	
			    					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
								click:function(){webix.toExcel($$("dt_storeretskuplan"));}},						
							]
			};

	/**
       * 
       * 实际退货计划
       */
	var grid_storeretskuplan = {
		view:"datatable",
		id:"dt_storeretskuplan",
		width:500,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:400,autoheight:false,scroll:true},
		editable:true,
		select:true,
		save:urlstr+"/WBCURDMng/saveMovSKUPlan",
		footer:true, header:true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50,footer:{text:"总计:", colspan:4}},
			{ id:"_identify",header:"id",width:35,hidden:true},
			{ id:"srcpartycode",	header:["退货门店编号",{content:"textFilter"}],fillspace:1},
			{ id:"srcpartyname",header:"退货门店", fillspace:1.8},
			{ id:"trgpartycode",	header:"调入门店编号",hidden:true,hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",hidden:true, fillspace:1},
			{ id:"skucode",header:["SKU",{content:"textFilter"}], footer:"总计",sort:"string",fillspace:1.2},
			{ id:"movqty",header:"退货数量",sort:"int",fillspace:1,editor:"text",css:'bgcolor1',footer:{ content:"summColumn" }}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}		
	};
	
				
	var layout = {
		type: "clean",
		rows:[
			{cols:[
				{rows:[toolbar_parentwhskulist,grid_parentwhsku]},
				{view:"resizer",width:1},
				{rows:[toolbar_retskulist,grid_toretskulist]}
			]},
			{view:"resizer"},
			{cols:[
				{rows:[toolbar_storeretsku,grid_storeretsku]},
				{view:"resizer",width:1},
				{rows:[toolbar_storeretskuplan,grid_storeretskuplan]}
			 ]}
		]
	};

   
	return { 
		$ui: layout ,
		$oninit:function(){
			$$("dt_parentwhsku").showOverlay("正在加载......");
			$$("dt_storeretskuplan").showOverlay("正在加载......");
			stockobject.getCWHSKU({UserCode:_UserCode}).then(
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
			
		$$("dt_storeretskuplan").attachEvent("onAfterEditStop",function(){
			updateRetSKUFillRatio();
		});
		}
	};

});
