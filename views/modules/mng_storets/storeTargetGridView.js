define([],
function(){
	
var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
//		paddingX:5,
//		paddingY:5,
		height:_ToolBarHeight,
		cols:[
			{  view: "label",label:"门店目标库存报表"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_storetspivot"));}},
		]
	};
	
	var gridTree = {
		view:"datatable",
		id:"dt_storetspivot",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		navigation:true,
		leftSplit:4,
		editable:true,
		select: true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"partycode",	header:["门店",{content:"selectFilter"}], sort:"string",width:70,css:"bgcolor2"},
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:150},

			{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"seriesname",header:["系列",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:100},

				{ id:"stock1",header:[{ content:"columnGroup", closed:true, batch:"stock",
							groupText:"库存", colspan:9, width: 45},"65/S"],sort:"int",width:60},				
					{ id:"stock2",batch:"stock",header:[null,"70/M"], sort:"int",width:45},
					{ id:"stock3",batch:"stock",header:[null,"75/L"], sort:"int",width:45},
					{ id:"stock4",batch:"stock",header:[null,"80/XL"], sort:"int",width:45},
					{ id:"stock5",batch:"stock",header:[null,"85/2XL"], sort:"int",width:45},
					{ id:"stock6",batch:"stock",header:[null,"90/3XL"], sort:"int",width:45},
					{ id:"stock7",batch:"stock",header:[null,"95/4XL"], sort:"int",width:45},
					{ id:"stock8",batch:"stock",header:[null,"100/FREE"], sort:"int",width:45},
					{ id:"stock9",batch:"stock",header:[null,"105/XS"], sort:"int",width:45},
					
					{ id:"target1",header:[{ content:"columnGroup", closed:false, batch:"target",
							groupText:"目标库存", colspan:9, width: 45},"65/S"],sort:"int",width:60},
					{ id:"target2",batch:"target",header:[null,"70/M"], sort:"int",width:45},
					{ id:"target3",batch:"target",header:[null,"75/L"], sort:"int",width:45},
					{ id:"target4",batch:"target",header:[null,"80/XL"], sort:"int",width:45},
					{ id:"target5",batch:"target",header:[null,"85/2XL"], sort:"int",width:45},
					{ id:"target6",batch:"target",header:[null,"90/3XL"], sort:"int",width:45},
					{ id:"target7",batch:"target",header:[null,"95/4XL"], sort:"int",width:45},
					{ id:"target8",batch:"target",header:[null,"100/FREE"], sort:"int",width:45},
					{ id:"target9",batch:"target",header:[null,"105/XS"], sort:"int",width:45},

		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};


	var layout = {
		type: "clean",
		id: "storeTargetGridView",
		rows:[toolbar,
			gridTree,
		]
	};


	return { 
		$ui: layout ,
		$oninit:function(){
		}
	};

});
