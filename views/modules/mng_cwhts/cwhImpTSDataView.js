define([
	"data/impobject",
	"data/stockobject"
], function(impobject,stockobject){

	var PageIndex = 1;
	var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
		height:30,
		cols:[		
			{
					view:"uploader",
					multiple:false,
					id: "uploaderid2",
					type:"iconButton", 
					icon:"cloud-upload",
				  	name:"uploader", 
				  	label:"上传Excel",
				  	link:"uploaderlist2",
				  	width:80,
				  	upload:urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/importtarget"
				 },
			{view:"list",  id:"uploaderlist2", type:"uploader",autoheight:true, borderless:true,width:100},

			{ view: "text", type: "iconButton",  label: "单页条数",id:"pagelen",value:200,width: 140,labelWidth:80},
			{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "上一页", width: 90,
			click: function(){
				 PageIndex = PageIndex - 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_loadedDataImportTarget2").clearAll();
				 $$("dt_loadedDataImportTarget2").parse(impobject.getImportData("importtarget",PageIndex,$$('pagelen').getValue()));
			}},
			{ view: "button", type: "iconButton", icon: "arrow-circle-right", label: "下一页", width: 90,
			click: function(){
				 PageIndex = PageIndex + 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_loadedDataImportTarget2").clearAll();
				 $$("dt_loadedDataImportTarget2").parse(impobject.getImportData("importtarget",PageIndex,$$('pagelen').getValue()));		 
			}},
			{},
			{},
			{ view: "button",id:'bnclear2', type: "iconButton", icon: "times", label: "清空", width: 70,
			click: function(){
				 impobject.clearImportData("importtarget");
				 $$("dt_loadedDataImportTarget2").clearAll();
				 webix.message("清空成功！");
			}},
			{ view: "button",id:'bnsave2', type: "iconButton", icon: "save", label: "保存", width: 70,
				click: function(){
				 stockobject.synTarget2Stock("Import");
				 webix.message("保存成功！");
			}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_loadedDataImportTarget2"));}},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_loadedDataImportTarget2",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				navigation:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[					
					{id:"老客户号", header:"老客户号", sort:"string", width:70},
					{id:"款号", header:"款号", sort:"string", width:100},
					{id:"色", header:"色", sort:"string", width:60},
					{id:"杯", header:"杯", sort:"string", width:40},
					
					{ id:"65/s/3",header:[{ content:"columnGroup", closed:false, batch:"target",
							groupText:"目标库存", colspan:9, width: 45},"65/S/3"],sort:"int",width:60},
					{ id:"70/m/5",batch:"target",header:[null,"70/M/5"], sort:"int",width:45},
					{ id:"75/l/7",batch:"target",header:[null,"75/L/7"], sort:"int",width:45},
					{ id:"80/xl/9/el",batch:"target",header:[null,"80/XL/9/EL"], sort:"int",width:45},
					{ id:"85/2xl/11/eel",batch:"target",header:[null,"85/2XL/11/EEL"], sort:"int",width:45},
					{ id:"90/3xl/13/eeel",batch:"target",header:[null,"90/3XL/13/EEEL"], sort:"int",width:45},
					{ id:"95/4xl/15",batch:"target",header:[null,"95/4XL/15"], sort:"int",width:45},
					{ id:"100/free",batch:"target",header:[null,"100/FREE"], sort:"int",width:45},
					{ id:"105/xs",batch:"target",header:[null,"105/XS"], sort:"int",width:45},
				],
				export: true,
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
//				pager:"pagerA"
			}
		]

	};

	var layout = {
		type: "clean",
		id: "cwhImpTSDataView",
		rows:[
			titleBar,
			grid]
	};

	return {
		$ui: layout,
		$oninit:function(){
			$$("uploaderid2").attachEvent("onItemClick", function(){
    				 impobject.clearImportData("importtarget");
				 $$("dt_loadedDataImportTarget1").clearAll();
			});
			
			$$("uploaderid2").attachEvent("onUploadComplete", function(){
    			webix.message({type:"error",text:"导入成功",expire:-1});
    			$$("dt_loadedDataImportTarget2").showOverlay("正在载入导入的前200条数据...");
			$$("dt_loadedDataImportTarget2").clearAll();
			$$("dt_loadedDataImportTarget2").parse(impobject.getImportData("importtarget",1,200));
			});
		}
	};

});