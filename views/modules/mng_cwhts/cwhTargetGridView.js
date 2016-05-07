define([],
function(){
	var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "label",label:"中央仓目标库存报表"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_cwhtspivot"));}},
		]
	};
	
	var gridTree = {
		view:"datatable",
		id:"dt_cwhtspivot",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		navigation:true,
		leftSplit:3,
		editable:true,
		select: true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"skccode",header:"款色", sort:"string",width:150},
			{ id:"lifestage",	header:"新旧", sort:"string",width:60},
			{ id:"maintypename",	header:"大类", sort:"string",width:100},
			{ id:"subtypename",header:"小类", sort:"string",width:100},
			
					{ id:"stock1",header:[{ content:"columnGroup", closed:true, batch:"stock",
							groupText:"库存", colspan:9, width: 45},"65/S/3"],sort:"int",width:60},				
					{ id:"stock2",batch:"stock",header:[null,"70/M/5"], sort:"int",width:45},
					{ id:"stock3",batch:"stock",header:[null,"75/L/7"], sort:"int",width:45},
					{ id:"stock4",batch:"stock",header:[null,"80/XL/9/EL"], sort:"int",width:45},
					{ id:"stock5",batch:"stock",header:[null,"85/2XL/11/EEL"], sort:"int",width:45},
					{ id:"stock6",batch:"stock",header:[null,"90/3XL/13/EEEL"], sort:"int",width:45},
					{ id:"stock7",batch:"stock",header:[null,"95/4XL/15"], sort:"int",width:45},
					{ id:"stock8",batch:"stock",header:[null,"100/FREE"], sort:"int",width:45},
					{ id:"stock9",batch:"stock",header:[null,"105/XS"], sort:"int",width:45},
					
					{ id:"target1",header:[{ content:"columnGroup", closed:false, batch:"target",
							groupText:"目标库存", colspan:9, width: 45},"65/S/3"],sort:"int",width:60},
					{ id:"target2",batch:"target",header:[null,"70/M/5"], sort:"int",width:45},
					{ id:"target3",batch:"target",header:[null,"75/L/7"], sort:"int",width:45},
					{ id:"target4",batch:"target",header:[null,"80/XL/9/EL"], sort:"int",width:45},
					{ id:"target5",batch:"target",header:[null,"85/2XL/11/EEL"], sort:"int",width:45},
					{ id:"target6",batch:"target",header:[null,"90/3XL/13/EEEL"], sort:"int",width:45},
					{ id:"target7",batch:"target",header:[null,"95/4XL/15"], sort:"int",width:45},
					{ id:"target8",batch:"target",header:[null,"100/FREE"], sort:"int",width:45},
					{ id:"target9",batch:"target",header:[null,"105/XS"], sort:"int",width:45},

		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};


	var layout = {
		type: "clean",
		id: "cwhTargetGridView",
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
