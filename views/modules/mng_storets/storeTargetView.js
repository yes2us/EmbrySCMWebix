define(
[],
function(){
	var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "label",label:"管理门店目标库存"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_storets"));}},
		]
	};
	
	var gridTree = {
		view:"datatable",
		id:"dt_storets",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		navigation:true,
		leftSplit:3,
		editable:true,
		select: true,
		save:urlstr+"/WBCURDMng/saveStock",
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skucode",	header:"SKU", sort:"string",width:100,css:"bgcolor2"},
			
			{ id:"skccode",	header:"款色", sort:"string",width:150},
			{ id:"colorname",header:"颜色", sort:"string",width:100},
			{ id:"sizename",	header:"尺码", sort:"string",width:60},
			
			{ id:"lifestage",	header:"新旧", sort:"string",width:60},
			{ id:"maintypename",	header:"大类", sort:"string",width:100},
			{ id:"subtypename",	header:"小类", sort:"string",width:100},
			
			{ id:"targetqty",	header:"目标库存",sort:"int", width:100,editor:"text",css:"bgcolor1"},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:100},
			{ id:"sugrepqty",	header:["理论补退",{content:"numberFilter"}],sort:"int",align:"right", width:100}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "storeTargetView",
		rows:[toolbar,
			gridTree,
		]
	};


	return { $ui: layout };

});
