define([], function(){

var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
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
			  columns:[
			  		{ id:"rownum",header:"",sort:"int",width:50},
			  		{ id:"lifestage",	header:["新旧",{content:"selectFilter"}], sort:"string",width:60,css:"bgcolor2"},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:100,css:"bgcolor2"},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:4},"款色数"] ,width:70},
					{ id:"frskcnuminparent",name:"frskcnuminparent",header:[null,"上级畅销"],width:85},
					{ id:"frskcnuminparty",name:"frskcnuminparty",header:[null,"本仓畅销"],width:85},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],width:85},		
					{ id:"stocktargetqty",name:"stocktargetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,width:85},
					{ id:"stocktotalqty",name:"stocktotalqty",header:[null,"总库存"] ,width:70},
					{ id:"stockshortinstores",name:"stockshortinstores",	header:[null,"库存缺口"],width:85},		
					{ id:"stockoverinstores",name:"stockoverinstores",header:[null,"超额库存"] ,width:85},
					{ id:"stockdeadqty",name:"stockdeadqty",header:[null,"死货库存"] ,width:85}
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