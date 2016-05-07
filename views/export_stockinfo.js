define([
	"data/stockobject",
	],
function(stockobject){
	 
	checkauthorization(false);
	
	 var regioncode = 'all';
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"regioncode", width:250,align: "left", label: '区域',labelWidth:60,
				options:urlstr+"/WBPartyMng/getRegionList",
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							regioncode = newv;
							webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",{RegionCode:newv},function(response){
								   if(response){
									var optionarray = [{id:'all',value:"所有"}];
									JSON.parse(response).forEach(function(item){
										optionarray.push({id:item.partycode,value:item.partyname});
									});
									
									$$("storecode").define('options',optionarray);
									$$("storecode").refresh();
									}
								});
						}
					}
				}
				},
			    {view:"select", id:"storecode",name:"storecode",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	   var postData = {};
						if(values.storecode && values.storecode != 'all')
						{
							postData.WHCode=values.storecode;
						}
						else
						{
							if(regioncode)  postData.RegionCode = regioncode;
						}
						$$("dt_stockinfo").showOverlay("正在加载......");
						$$("dt_stockinfo").clearAll();
						$$("dt_stockinfo").parse(stockobject.getFGWHCrossTSInfo(postData));
				 }},
			    {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){
//				webix.toExcel($$("dt_stockinfo"));
						var values =this.getParentView().getValues();
						if(values.storecode && values.storecode != 'all')
						{
							var targeturl= urlstr+"/WBStockMng/getFGWHCrossTSInfo/Excel/1/WHCode/"+values.storecode;
							window.open(targeturl, "_blank");
						}
						else
						{
							if(regioncode)
							{
								var targeturl= urlstr+"/WBStockMng/getFGWHCrossTSInfo/Excel/1/RegionCode/"+regioncode;
								window.open(targeturl, "_blank");
							}
							else
							{
								var targeturl= urlstr+"/WBStockMng/getFGWHCrossTSInfo/Excel/1";
								window.open(targeturl,"_blank");
							}
						}
			}},
		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_stockinfo",
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
					{ id:"rownum",header:"",sort:"int",width:60},
					{ id:"partycode",header:["客户号",{content:"textFilter"}], sort:"string",width:60,css:"bgcolor2"},
				    	{ id:"skccode",header:["款色",{content:"textFilter"}],width:120},

//					{ id:"partyname",header:"门店", sort:"string",width:120,css:"bgcolor2"},
//					{ id:"partylevel",header:["级别",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"lifestage",header:["新旧",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:60},
					{ id:"onshelfdays",header:"到仓天数", sort:"int",width:60},
					
					{ id:"skcstockqty",header:[{ content:"columnGroup", closed:true, batch:"stock",
							groupText:"库存", colspan:10, width: 45},"累计"],sort:"int",width:60},				
					{ id:"stock1",batch:"stock",header:[null,"65/S/3"],sort:"int",width:45},
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
		rows:[
			titleBar,
			{
				rows:[
					grid,
				]
			}
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){

		}
	};

});