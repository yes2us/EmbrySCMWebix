define([
	"data/stockobject",
	],
function(stockobject){
	 
	checkauthorization(false);
	var bizUnitCode;
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
//			paddingX:5,
//			paddingY:5,
			height:_ToolBarHeight,
			cols:[
				{view:"multiselect", id:"bizUnitCode102",name:"bizUnitCode102", width:150,align: "left", label: '事业部',labelWidth:60,
				options:urlstr+"/WBPartyMng/getBizUnitList/UserCode/"+_UserCode,
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							    bizUnitCode = newv;
								if(newv.indexOf('all')>=0)
								$$("branchCode102").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
								else
								$$("branchCode102").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
						}
					}
				}
				},
			    {view:"multiselect", id:"branchCode102",name:"branchCode102",width:250,align: "left", label: '办事处',labelWidth:60,
			    options:[],
			    	on:{
						onChange:function(newv,oldv){
							if(newv)
							{
								if(newv.indexOf('all')>=0)
								$$("storeCode102").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
								$$("storeCode102").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
							}
						}
					}
			    },
			    {view:"multiselect", id:"storeCode102",name:"storeCode102",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	   var postData = {};
				    	   
						if(values.storeCode102 && values.storeCode102.indexOf('all')<0 && values.storeCode102 !="") 
							postData.WHCode=values.storeCode102;
						else if(values.branchCode102 && values.branchCode102.indexOf('all')<0 && values.branchCode102 !="") 
							postData.BranchCode=values.branchCode;
						else if(values.bizUnitCode102 && values.bizUnitCode102.indexOf('all')<0 && values.bizUnitCode102 !="")  
						postData.BizUnitCode = values.bizUnitCode102;
						
						$$("dt_targetstatistics").showOverlay("正在加载......");
						$$("dt_targetstatistics").clearAll();
						$$("dt_targetstatistics").parse(stockobject.getInitTargetStatistics(postData));
				 }},
			    {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_targetstatistics"));}},
		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_targetstatistics",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				navigation:true,
				leftSplit:4,
				export: true,
				columns:[
//					{ id:"rownum",header:"",sort:"int",width:60},
					{ id:"partycode",header:["客户号",{content:"textFilter"}], sort:"string",width:60,css:"bgcolor2"},
					{ id:"partyname",header:"客户", sort:"string",width:150,css:"bgcolor2"},
					{ id:"partylevel",header:["级别",{content:"selectFilter"}], sort:"string",width:60,css:"bgcolor2"},
				    	{ id:"curskunum",header:"当前SKU数",width:85},
				    	{ id:"sugskunum",header:"建议SKU数",width:85},
				    	{ id:"keysizenum",header:"核心码数",width:85},
				    	{ id:"skusaleqty",header:"四周销量",width:85},
				    	{ id:"sugtargetqty",header:"建议目标",width:85},
				    	{ id:"curstockqty",header:"当前库存",width:85},
				    	{ id:"replenishqty",header:"补货数量",width:85},
				    	{ id:"returnqty",header:"退货数量",width:85},
				    	{ id:"reducestockper",header:"库存降低",width:85,
				    	format:function(value){return parseInt(100*value)+"%";}},
				    	{ id:"shortratio",header:"断码率",width:85,format:function(value){return parseInt(100*value)+"%";}},
	
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
			}
		]

	};

	var layout = {
		type: "line",
		id:"initTargetStatisticsView",
		rows:[
			titleBar,
			grid
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){

		}
	};

});