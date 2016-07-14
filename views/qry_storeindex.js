define([
	"data/stockobject",
	],
function(stockobject){
	 
	checkauthorization(false);
	
	var bizUnitCode = null;
	var enddate = new Date();
	enddate.setDate(enddate.getDate()-7);

	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:0,
			paddingY:0,
			height:_ToolBarHeight,
			cols:[
				{view:"multiselect", id:"bizUnitCode103",name:"bizUnitCode103", width:150,align: "left", label: '事业部',labelWidth:60,
				options:urlstr+"/WBPartyMng/getBizUnitList/UserCode/"+_UserCode,
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
								bizUnitCode = newv;
								if(newv.indexOf('all')>=0)
								$$("branchCode103").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
								else
								$$("branchCode103").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);	
						}
					}
				}
				},
			    {view:"multiselect", id:"branchCode103",name:"branchCode103",width:250,align: "left", label: '办事处',labelWidth:60,
			    options:[],
			    	on:{
						onChange:function(newv,oldv){
							if(newv)
							{
								if(newv.indexOf('all')>=0)
								$$("storeCode103").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
								$$("storeCode103").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
							}
						}
					}
			    },
			    {view:"multiselect", id:"storeCode103",name:"storeCode103",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
//				    	console.log(values);
				    	   var postData = {};

						if(values.storeCode103 && values.storeCode103.indexOf('all')<0 && values.storeCode103 !="") 
							postData.WHCode=values.storeCode103;
						else if(values.branchCode103 && values.branchCode103.indexOf('all')<0 && values.branchCode103 !="") 
							postData.BranchCode=values.branchCode103;
						else if(values.bizUnitCode103 && values.bizUnitCode103.indexOf('all')<0 && values.bizUnitCode103 !="")  
						postData.BizUnitCode = values.bizUnitCode103;
						
						$$("dt_storeindicator").showOverlay("正在加载......");
						$$("dt_storeindicator").clearAll();
						$$("dt_storeindicator").parse(stockobject.getPartyIndex(postData));
				 }},
			    {},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
				click:function(){webix.toExcel($$("dt_storeindicator"));}}
		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_storeindicator",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				navigation:true,
				leftSplit:4,
				export: true,
				columns:[
					{ id:"rownum",header:"",sort:"int",width:50},
					{ id:"partycode",header:["门店编号",{content:"textFilter"}], sort:"string",width:70,css:"bgcolor2"},
					{ id:"partyname",header:["门店名称",{content:"selectFilter"}], sort:"string",width:150,css:"bgcolor2"},
					{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:100},
					{ id:"middlesizenum",	header:[{text:"断码", colspan:3},"核心码"], sort:"int",width:70},
					{ id:"shortmiddlesizenum",	header:[null,"断码数"], sort:"int",width:70},
					{ id:"shortmiddlesizeratio",	header:[null,"断码率"], sort:"float",width:70,format:function(value){return parseInt(100*value)+"%";}},
//					{ id:"replenishratio",	header:"补货率", sort:"float",width:70},
					{ id:"frskcnuminparent",header:[{text:"畅销款", colspan:3},"区域畅款"], sort:"int",width:85},
					{ id:"frskcnuminparty",	header:[null,"本店畅款"], sort:"int",width:85},
					{ id:"frskcratiopartycover",	header:[null,"畅款比例"], sort:"float",width:85,format:function(value){return parseInt(100*value)+"%";}},
					
					{ id:"stockonhandqty",	header:[{text:"库存分析", colspan:9},"目标库存"],sort:"int",width:85},
					{ id:"stockonhandqty",	header:[null,"在手库存"],sort:"int",width:85},
					{ id:"stockonroadqty",	header:[null,"在途库存"], sort:"int",width:85},
					{ id:"stocktotalqty",	header:[null,"总库存"], sort:"int",width:60},
					{ id:"stockdayofinventory",header:[null,"库存天"], sort:"int",width:70},
					{ id:"stockstoredeadglobalhot",	header:[null,"店死整畅"], sort:"int",width:85},
					{ id:"stockoverinstores",	header:[null,"超额库存"], sort:"int",width:85},
					{ id:"stockshortinstores",	header:[null,"库存缺口"], sort:"int",width:85},
					{ id:"stockdailyidd",	header:[null,"日均IDD"], sort:"int",width:90},
					
					{ id:"sale1qty",header:[{text:"销售分析", colspan:5},"昨日销量"], sort:"int",width:85},
					{ id:"sale14qty",	header:[null,"14天销量"], sort:"int",width:85},
					{ id:"saletotalqty",	header:[null,"总销量"], sort:"int",width:70},
					{ id:"salecompleteper",header:[null,"售罄率"], sort:"float",width:70,format:function(value){return parseInt(100*value)+"%";}},
					{ id:"saledailytdd",	header:[null,"日均TDD"], sort:"int",width:85}
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
				pager:"storeindicator_pagerA"
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
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"storeindicator_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					}
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