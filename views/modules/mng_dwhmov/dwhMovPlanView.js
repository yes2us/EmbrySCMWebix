define(function(){
	
var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "label",label:"查询调拨计划"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_dwhMovPlan"));}},
		]
	};
	
	var gridTree = {
		view:"datatable",
		id:"dt_dwhMovPlan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:5,
		select: true,
		navigation:true,
		footer:true, header:true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50,footer:{text:"总计:", colspan:1}},
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"makedate",header:["日期",{content:"selectFilter"}],width:100},
			{ id:"srcpartycode",	header:"调出门店编号", sort:"string",hidden:true,fillspace:1},
			{ id:"srcpartyname",header:["调出门店",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"trgpartycode",	header:"调入门店编号", sort:"string",hidden:true,fillspace:1},
			{ id:"trgpartyname",header:["调入门店",{content:"selectFilter"}], sort:"string",width:120},
			
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:120},

			{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"seriesname",	header:["系列",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},

			{ id:"dealstate",header:["状态",{content:"selectFilter"}], sort:"string",width:80},
			{ id:"movqty",header:["调拨数量",{content:"numberFilter"}],sort:"int",width:90,footer:{ content:"summColumn"}}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "dwhMovPlanView",
		rows:[toolbar,
			gridTree,
		]
	};


	return { $ui: layout };

});
