define([
	"data/stockobject",
	],
function(stockobject){
	checkauthorization(false);
	
	var bizUnitCode;
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
//			paddingX:5,
//			paddingY:5,
			height:_ToolBarHeight,
			cols:[
				{view:"multiselect", id:"bizUnitCode101",name:"bizUnitCode101", width:150,align: "left", label: '事业部',labelWidth:60,
				options:urlstr+"/WBPartyMng/getBizUnitList/UserCode/"+_UserCode,
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							    bizUnitCode = newv;
								if(newv.indexOf('all')>=0)
								$$("branchCode101").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
								else
								$$("branchCode101").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
						}
					}
				}
				},
			    {view:"multiselect", id:"branchCode101",name:"branchCode101",width:250,align: "left", label: '办事处',labelWidth:60,
			    options:[],
			    	on:{
						onChange:function(newv,oldv){
							if(newv)
							{
								if(newv.indexOf('all')>=0)
								$$("storeCode101").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
								$$("storeCode101").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
							}
						}
					}
			    },
			    {view:"multiselect", id:"storeCode101",name:"storeCode101",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	   var postData = {};
				    	   
						if(values.storeCode101 && values.storeCode101.indexOf('all')<0 && values.storeCode101 !="") 
							postData.WHCode=values.storeCode101;
						else if(values.branchCode101 && values.branchCode101.indexOf('all')<0 && values.branchCode101 !="") 
							postData.BranchCode=values.branchCode;
						else if(values.bizUnitCode101 && values.bizUnitCode101.indexOf('all')<0 && values.bizUnitCode101 !="")  
						postData.BizUnitCode = values.bizUnitCode101;
	
						$$("dt_storeinittarget").showOverlay("正在加载......");
						$$("dt_storeinittarget").clearAll();
						$$("dt_storeinittarget").parse(stockobject.getInitTarget(postData));
				 }},
			    {},
			   { view: "button",id:'bnsave', type: "iconButton", icon: "save", label: "保存", width: 70,
				click: function(){
						webix.confirm({title:"提醒",text:"你将保存当前的期初库存，这将花相当长的时间...", ok:"确定", cancel:"取消",
							callback:function(res){
							if(res){
								  stockobject.synTarget2Stock("Init");
								 webix.message("保存成功！");
							}}});}
			   },
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
					click: function(){
						var values =this.getParentView().getValues();
						var targeturl = null;
						if(values.storeCode101 && values.storeCode101.indexOf('all')<0)
							targeturl= urlstr+"/WBStockMng/getInitTarget/CSV/1/WHCode/"+values.storeCode101+"/UserCode/"+_UserCode;
						else if(values.branchCode101 && values.branchCode101.indexOf('all')<0)
								targeturl= urlstr+"/WBStockMng/getInitTarget/CSV/1/BranchCode/"+values.branchCode101+"/UserCode/"+_UserCode;
						else if(values.bizUnitCode101 && values.bizUnitCode101.indexOf('all')<0)
								targeturl= urlstr+"/WBStockMng/getInitTarget/CSV/1/BizUnitCode/"+values.bizUnitCode101+"/UserCode/"+_UserCode;
						else
								targeturl= urlstr+"/WBStockMng/getInitTarget/CSV/1/UserCode/"+_UserCode;
					window.open(targeturl, "_blank");
						
				}
			}
		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_storeinittarget",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				navigation:true,
				leftSplit:2,
				export: true,
				footer:true, header:true,
				columns:[
					{ id:"rownum",header:"",sort:"int",width:60,footer:{text:"总计:", colspan:1}},
				    	{ id:"skccode",header:["款色",{content:"textFilter"}],width:120},
					{ id:"partycode",header:["客户号",{content:"textFilter"}], sort:"string",width:60,css:"bgcolor2"},
					{ id:"partyname",header:"门店", sort:"string",width:120,css:"bgcolor2"},
					{ id:"partylevel",header:["级别",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:60},
					{ id:"subtype1code",header:["商品级别",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"onshelfdays",header:"到仓天数", sort:"int",width:60},
					
					{ id:"skcstockqty",header:[{ content:"columnGroup", closed:true, batch:"stock",
							groupText:"库存", colspan:10, width: 45},"累计"],sort:"int",width:60,footer:{ content:"summColumn" }},			
					{ id:"stock1",batch:"stock",header:[null,"65/S"],sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock2",batch:"stock",header:[null,"70/M"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock3",batch:"stock",header:[null,"75/L"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock4",batch:"stock",header:[null,"80/XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock5",batch:"stock",header:[null,"85/2XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock6",batch:"stock",header:[null,"90/3XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock7",batch:"stock",header:[null,"95/4XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock8",batch:"stock",header:[null,"100/FREE"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock9",batch:"stock",header:[null,"105/XS"], sort:"int",width:45,footer:{ content:"summColumn" }},

					{ id:"skcsaleqty",header:[{ content:"columnGroup", closed:true, batch:"sale",
							groupText:"四周销售", colspan:10, width: 45},"款色60天"],sort:"int",width:60},
					{ id:"sale1",batch:"sale",header:[null,"65/S"],sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale2",batch:"sale",header:[null,"70/M"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale3",batch:"sale",header:[null,"75/L"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale4",batch:"sale",header:[null,"80/XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale5",batch:"sale",header:[null,"85/2XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale6",batch:"sale",header:[null,"90/3XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale7",batch:"sale",header:[null,"95/4XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale8",batch:"sale",header:[null,"100/FREE"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sale9",batch:"sale",header:[null,"105/XS"], sort:"int",width:45,footer:{ content:"summColumn" }},
					
					{ id:"sugtarget1",header:[{ content:"columnGroup", closed:false, batch:"sugtarget",
							groupText:"建议目标", colspan:9, width: 45},"65/S"],sort:"int",width:60,footer:{ content:"summColumn" }},
					{ id:"sugtarget2",batch:"sugtarget",header:[null,"70/M"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget3",batch:"sugtarget",header:[null,"75/L"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget4",batch:"sugtarget",header:[null,"80/XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget5",batch:"sugtarget",header:[null,"85/2XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget6",batch:"sugtarget",header:[null,"90/3XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget7",batch:"sugtarget",header:[null,"95/4XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget8",batch:"sugtarget",header:[null,"100/FREE"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"sugtarget9",batch:"sugtarget",header:[null,"105/XS"], sort:"int",width:45,footer:{ content:"summColumn" }},
					
//					{ id:"target1",header:[{ content:"columnGroup", closed:false, batch:"target",
//							groupText:"目标库存", colspan:9, width: 45},"65/S"],sort:"int",width:60},
//					{ id:"target2",batch:"target",header:[null,"70/M"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target3",batch:"target",header:[null,"75/L"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target4",batch:"target",header:[null,"80/XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target5",batch:"target",header:[null,"85/2XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target6",batch:"target",header:[null,"90/3XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target7",batch:"target",header:[null,"95/4XL"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target8",batch:"target",header:[null,"100/FREE"], sort:"int",width:45,footer:{ content:"summColumn" }},
//					{ id:"target9",batch:"target",header:[null,"105/XS"], sort:"int",width:45,footer:{ content:"summColumn" }},
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
//				pager:"storeinittarget_pagerA"
			}
		]

	};

	var layout = {
		type: "line",
		id: "initTargetView",
		rows:[
			titleBar,
			grid
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){

		}
	};

});