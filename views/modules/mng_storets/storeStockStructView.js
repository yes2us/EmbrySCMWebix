define([], function(){

var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
//		paddingX:5,
//		paddingY:5,
		height:_ToolBarHeight,
		cols:[
			{  view: "label",label:"门店库存结构"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_stockstruct"));}},
		]
	};
	
	var gridTree = { 
			  view:"datatable",
			  id:"dt_stockstruct",
			  rowHeight:_RowHeight,
			  headerRowHeight:_HeaderRowHeight,
			  headermenu:{width:250,autoheight:false,scroll:true},
			  select: true,
			  resizeColumn:true,
			  navigation:true,
			  leftSplit:3,
			  footer:true, header:true,
			  columns:[
			  		{ id:"rownum",header:"",sort:"int",width:50,footer:{text:"总计:", colspan:1}},
			  		{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:100,css:"bgcolor2"},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:4},"款色数"] ,width:70,footer:{content:"summColumn"}},
					{ id:"frskcnuminparent",name:"frskcnuminparent",header:[null,"上级畅销"],width:85,footer:{content:"summColumn"}},
					{ id:"frskcnuminparty",name:"frskcnuminparty",header:[null,"本仓畅销"],width:85,footer:{content:"summColumn"}},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],width:85,footer:{content:"summColumn"}},		
					{ id:"stocktargetqty",name:"stocktargetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,width:85,footer:{content:"summColumn"}},
					{ id:"stocktotalqty",name:"stocktotalqty",header:[null,"总库存"] ,width:70,footer:{content:"summColumn"}},
					{ id:"stockshortinstores",name:"stockshortinstores",	header:[null,"库存缺口"],width:85,footer:{content:"summColumn"}},		
					{ id:"stockoverinstores",name:"stockoverinstores",header:[null,"超额库存"] ,width:85,footer:{content:"summColumn"}},
					{ id:"stockdeadqty",name:"stockdeadqty",header:[null,"死货库存"] ,width:85,footer:{content:"summColumn"}}
			  ],
			  	on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
			};
	
	var layout = {
		type: "clean",
		id: "storeStockStructView",
		rows:[toolbar,
			gridTree,
		]
	};
					
	return {
		$ui:layout
	};
	

});