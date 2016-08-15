define(function(){

var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
//		paddingX:5,
//		paddingY:5,
		height:_ToolBarHeight,
		cols:[
			{  view: "label",label:"查询目标库存调整记录"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_storebmrecord"));}},
		]
	};
	
	
	var gridTree = {
		view:"treetable",
		id:"dt_storebmrecord",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight,
		headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
		leftSplit:2,
		resizeColumn:true,
		navigation:true,
		select: true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:60},
			{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
			{ id:"seriesname",header:["系列",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"recorddate",	header:"调整日期", sort:"string",fillspace:1.5},
			{ id:"onhandqty",header:"在手库存", sort:"int",fillspace:1},
			{ id:"oldtargetqty",	header:"原目标库存", sort:"int",fillspace:1},
			{ id:"sugtargetqty",	header:"建议目标库存", sort:"int",fillspace:1},
			
			{ id:"bmreason",	header:"调整原因", sort:"string",fillspace:3},
			{ id:"operator",	header:"操作人", sort:"string",fillspace:1}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "storeBMRecordView",
		rows:[toolbar,
			gridTree,
		]
	};


	return { $ui: layout };

});
