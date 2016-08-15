define([
	"data/billobject",
	"views/modules/qry_storesale/saleconditionview"
	],
function(billobject,saleconditionview){
	
	checkauthorization(false);

var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "label",label:"查询销售明细"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_saleorder"));}},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_saleorder",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				navigation:true,
				leftSplit:3,
				export: true,
				columns:[
					{ id:"rownum",header:"",sort:"int",width:50},
					{ id:"partycode",	header:["门店编号 ",{content:"textFilter"}], sort:"string",fillspace:1},
					{ id:"partyname",header:["门店名称",{content:"selectFilter"}], sort:"string",fillspace:1.5},
//					{ id:"salebillcode",header:["销售单号 ",{content:"textFilter"}], sort:"string",fillspace:1},
					{ id:"makedate",header:["成交日期",{content:"selectFilter"}], sort:"string",fillspace:1},
					{ id:"skucode",header:["SKU",{content:"textFilter"}], sort:"string",fillspace:1},
					{ id:"skccode",header:"款色", sort:"string",fillspace:1},
					{ id:"kbscode",header:"款杯色", sort:"string",fillspace:1},
					{ id:"sizename",header:"尺码", sort:"string",fillspace:0.5},
					{ id:"saleqty",header:"金额", sort:"int",fillspace:0.5},
					{ id:"salemoney",header:"金额", sort:"int",fillspace:0.5},
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
//				pager:"storerepret_pagerA"
			}
		]

	};
	
	var page={
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"storerepret_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					};
	
	var layout = {
		type: "line",
		cols:[
			saleconditionview,
			{view:"resizer",width:1},
			{
				rows:[
				toolbar,
					grid,
//					page
				]
			}
		]

	};
	

	return {
		$ui: layout,
	};

});