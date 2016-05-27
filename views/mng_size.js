define([
	"data/paraobject",
	],
function(paraobject){

checkauthorization(false);

	var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_size").clearAll();
				$$("dt_size").load(urlstr+"/WBProdMng/getSizeList");
				}},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_size"));}},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_size",
				view:"datatable", 
				rowHeight:_RowHeight+5,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:"row",
				url:urlstr+"/WBProdMng/getSizeList",
				save:urlstr+"/WBCURDMng/saveSize",
				columns:[

					{id:"_identify", header:"#", hidden:true,fillspace:1},
					{id:"sizecode", header:"尺码编号", fillspace:1},
					{id:"sizename", header:"码名", fillspace:1},
					{id:"sizegroup", header:"码组", fillspace:1},
					{id:"sizeorder", header:"次序", fillspace:1},
					{id:"iskeysize", header:"核心尺码", fillspace:1,template:"{common.checkbox()}"},
				],
			}
		]

	};

					
	
							
	var layout = {
		type: "line",
		rows:[
			toolbar,
			grid,
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
		}
	};

});