define(function(){

var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "label",label:"查询退货计划"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_RetProdPlan"));}},
		]
	};
	
	var gridTree = {
		view:"datatable",
		id:"dt_RetProdPlan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:3,
		select: true,
		navigation:true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"makedate",header:["日期",{content:"selectFilter"}],width:100},
			{ id:"srcpartycode",	header:"出货仓库编号", sort:"string",hidden:true,width:85},
			{ id:"srcpartyname",header:["出货仓库",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"skucode",header:"SKU", sort:"string",width:140},
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:120},
			{ id:"sizename",	header:["尺码",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"seriesname",	header:["系列",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"dealstate",	header:["状态",{content:"selectFilter"}], sort:"string",width:80},
			{ id:"movqty",header:["计划退货",{content:"numberFilter"}],sort:"int",width:90}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "retProdPlanView",
		rows:[toolbar,
			gridTree,
		]
	};


	return { $ui: layout };

});
