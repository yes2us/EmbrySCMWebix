define([
	"data/impobject",
	"data/stockobject"
], function(impobject,stockobject){

	var TargetTable="importtargeth";
	var TargetName = "横表";
	var PageIndex = 1;
	
	function showDatatable(){
		$$("uploaderid2").define("upload",urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/"+TargetTable);
		$$("dt_storeimporttargeth").hide();
		$$("dt_storeimporttargetv").hide();
		$$("dt_store"+TargetTable).show();
		PageIndex = 1;
	};
	
	function loadData(PageIndex){
		$$("dt_store"+TargetTable).showOverlay("正在载入导入的前200条数据...");
		$$("dt_store"+TargetTable).clearAll();
		$$("dt_store"+TargetTable).parse(impobject.getImportData(TargetTable,PageIndex,$$('pagelen').getValue()));	
	};

	var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
		height:30,
		cols:[		
			 	{
				 	view:"segmented", value:"importtargeth", label:"",inputWidth:150,
					options:[{ id:"importtargeth", value:"横表"},{ id:"importtargetv", value:"竖表"}],
					click:function(){
						TargetTable = this.getValue();
						switch (TargetTable){
							case "importtargeth":
								TargetName="横表";
								break;
							case "importtargetv":
								TargetName="竖表";
								break;
						}
						showDatatable();
					}
			},
			{
					view:"uploader",
					multiple:false,
					id: "uploaderid2",
					type:"iconButton", 
					icon:"cloud-upload",
				  	name:"uploader", 
				  	label:"上传",
				  	link:"uploaderlist2",
				  	width:80,
				  	upload:urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/importtargeth"
				},
			{view:"list",  id:"uploaderlist2", type:"uploader",	autoheight:true, borderless:true,width:100},


			{},
			{ view: "button",id:'bnclear2', type: "iconButton", icon: "times", label: "清空", width: 70,
				click: function(){
				 		webix.confirm({title:"提醒",text:"清除导入的数据", ok:"确定", cancel:"取消",
							callback:function(res){
							if(res){
								 impobject.clearImportData(TargetTable);
								 $$("dt_store"+TargetTable).clearAll();
								 webix.message("清空成功！");
							}}});}
			},
			{ view: "button",id:'bnsave2', type: "iconButton", icon: "save", label: "保存", width: 70,
				click: function(){
				 stockobject.synTarget2Stock(TargetTable);
				 webix.message("保存成功！");
			}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_store"+TargetTable));}},
		]
	};
	
		var grid_targetv = 
			{
						id:"dt_storeimporttargetv",
						view:"datatable",
						rowHeight:_RowHeight,
						headerRowHeight:_HeaderRowHeight,
						select:true,
						navigation:true,
						headermenu:{width:250,autoheight:false,scroll:true},
						columns:[
							{id:"客户号", header:"客户号", sort:"string", fillspace:1},
							{id:"商品号", header:"商品号", sort:"string", fillspace:1},	
							{id:"目标库存", header:"目标库存", sort:"int",fillspace:1},
						],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
						
			};
			
			
	var grid_targeth = {
				id:"dt_storeimporttargeth",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				navigation:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
					{id:"客户号", header:"客户号", sort:"string", width:70},
					{id:"款号", header:"款号", sort:"string", width:100},
					{id:"色", header:"色", sort:"string", width:60},
					{id:"杯", header:"杯", sort:"string", width:40},
					
					{ id:"65/s",header:[{ content:"columnGroup", closed:false, batch:"target",
							groupText:"目标库存", colspan:9, width: 45},"65/S"],sort:"int",width:55},
					{ id:"70/m",batch:"target",header:[null,"70/M"], sort:"int",width:55},
					{ id:"75/l",batch:"target",header:[null,"75/L"], sort:"int",width:55},
					{ id:"80/xl",batch:"target",header:[null,"80/XL"], sort:"int",width:55},
					{ id:"85/2xl",batch:"target",header:[null,"85/2XL"], sort:"int",width:55},
					{ id:"90/3xl",batch:"target",header:[null,"90/3XL"], sort:"int",width:55},
					{ id:"95/4xl",batch:"target",header:[null,"95/4XL"], sort:"int",width:55},
					{ id:"100/free",batch:"target",header:[null,"100/FREE"], sort:"int",width:55},
					{ id:"105/xs",batch:"target",header:[null,"105/XS"], sort:"int",width:55},
				],
				export: true,
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
	};

var footBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
		height:45,
		cols:[		 
			{ view: "text", type: "iconButton",  label: "单页条数",id:"pagelen",value:200,width: 150,labelWidth:80,maxHeight:40},
			{view:"button",value:"查询", width:100,
			click:function(){
				loadData(1);
			}},
			
			{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "上一页", width: 100,height:40,
			click: function(){
				 PageIndex = PageIndex - 1;
				 if(PageIndex<1) PageIndex = 1;
				 loadData(PageIndex);
			}},
			{ view: "button", type: "iconButton", icon: "arrow-circle-right", label: "下一页", width: 100,height:40,
			click: function(){
				 PageIndex = PageIndex + 1;
				 if(PageIndex<1) PageIndex = 1;
				 loadData(PageIndex);
			}},
			{},

		]
	};
	
	var layout = {
		type: "clean",
		id: "cwhImpTSDataView",
		rows:[
			titleBar,
			{cols:[grid_targeth,grid_targetv]},
			footBar
		]

	};

	return {
		$ui: layout,
		$oninit:function(){
			/**
			 * 启动时显示已经存在的数据
			 */
//			loadData(1);
			
			webix.extend($$("uploaderid2"), webix.ProgressBar);
			
			$$("dt_storeimporttargeth").show();
			$$("dt_storeimporttargetv").hide();
				
			
			$$("uploaderid2").attachEvent("onAfterFileAdd", function(){
	   			$$("uploaderid2").showProgress(); 
			});
			
			$$("uploaderid2").attachEvent("onUploadComplete", function(){	
				$$("uploaderid2").hideProgress();		
	    		    	webix.message({type:"error",text:"导入成功",expire:-1});
	    			loadData(1);
			});
		}
	};

});