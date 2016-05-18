define([
	"data/stockobject",
	],
function(stockobject){
	 
	checkauthorization(false);
	
	 var regioncode = 'all';
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"regioncode", width:250,align: "left", label: '区域',labelWidth:60,
				options:urlstr+"/WBPartyMng/getRegionList",
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							regioncode = newv;
							webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",{RegionCode:newv},function(response){
								   if(response){
									var optionarray = [{id:'all',value:"所有"}];
									JSON.parse(response).forEach(function(item){
										optionarray.push({id:item.partycode,value:item.partyname});
									});
									
									$$("storecode").define('options',optionarray);
									$$("storecode").refresh();
									}
								});
						}
					}
				}
				},
			    {view:"select", id:"storecode",name:"storecode",width:250,align: "left", label: '门店',labelWidth:60,options:[]},
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	   var postData = {};
						if(values.storecode && values.storecode != 'all')
						{
							postData.WHCode=values.storecode;
						}
						else
						{
							if(regioncode)  postData.RegionCode = regioncode;
						}
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
					{ id:"rownum",header:"",sort:"int",width:60},
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