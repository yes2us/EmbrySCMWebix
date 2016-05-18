define(["data/prodobject"],
function(prodobject){
	
var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"brandcode",width:200,align: "right", label: '品牌',labelWidth:60,
					options:urlstr+"/WBProdMng/getBrandList"},
			    {view:"select", id:"pricetype",name:"pricetype",width:200,align:"right", label:'价格类型',labelWidth:85,
			    		options:[{id:'all',value:'所有'},{id:'正价',value:'正价'},{id:"调价",value:"调价"}]},
			    	{view:"select", id:"maintypecode",name:"maintypecode",width:200,align:"right", label:'大类',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getMainTypeList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	$$("dt_sugskcprodplan").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.pricetype != 'all') postData.PriceType=values.pricetype;
				    	if(values.maintypecode != 'all') postData.MainTypeName=values.maintypecode;
				    	
					$$("dt_sugskcprodplan").clearAll();
					$$("dt_sugskcprodplan").parse(prodobject.getSugSKCProdPlan(postData));
				 }},
			    {},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
					click:function(){webix.toExcel($$("dt_sugskcprodplan"));}}
		    ]
	};
	
	
	var gridTree = {
		view:"datatable",
		id:"dt_sugskcprodplan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:4,
		select: true,
		editable:true,
		navigation:true,
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:100},
			{ id:"pricetype",header:"价格类型", sort:"string",width:85},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"saletype",header:["销售分类",{content:"selectFilter"}], sort:"string",width:70},
			
			{ id:"existsstockqty",header:[{text:"渠道信息",colspan:7},"成品库存"],sort:"int", width:70},
			{ id:"storenumcurin",header:[null,"现铺店"],sort:"int", width:70},
			{ id:"storenumplan",header:[null,"计划铺店"],sort:"int", width:70,editor:"text",css:"bgcolor1"},
			{ id:"onshelfdays",	header:[null,"上货天数"], sort:"int",width:70},
			{ id:"lifespan",header:[null,"可销天数"],sort:"int", width:70,editor:"text",css:"bgcolor1"},
			{ id:"saletotalqty",header:[null,"已销售"],sort:"int", width:70},
			{ id:"sale14qty",header:[null,"14天销售"],sort:"int", width:70},
			
			{ id:"targetqty",	header:[{text:"理论补货",colspan:5},"目标库存"],sort:"int", width:85},
			{ id:"onhandqty",header:[null,"在手库存"],sort:"int", width:60},
			{ id:"onroadqty",	header:[null,"实际库存"],sort:"int", width:60},
			{ id:"addedstockqty",header:[null,"增铺数量"],sort:"int", width:60,editor:"text",css:"bgcolor1"},
			{ id:"repretqty",	header:[null,"理论补货"],sort:"int",width:60},
				
			{ id:"saledaily",header:[{text:"预计数据",colspan:7},"单店日均销售"],sort:"float",width:85},
			{ id:"saleratio",header:[null,"销售系数"],sort:"float", width:85,editor:"text",css:"bgcolor1"},
			{ id:"forecastsale",header:[null,"预计销量"],sort:"int", width:85},
			{ id:"totalseasonsale",header:[null,"总计销量"],sort:"int", width:85},
			{ id:"endratio",header:[null,"尾货比例"],sort:"float", width:85,editor:"text",css:"bgcolor1"},
			{ id:"totalseasonstock",header:[null,"总库存需求"],sort:"int", width:85},
			{ id:"neededstock",header:[null,"库存需求"],sort:"int", width:85},
			
		],
		on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			onAfterEditStop:function(state, editor, ignoreUpdate){
				if(state.value != state.old){
					var id = editor.row;
					var row = $$("dt_sugskcprodplan").getItem(id);
										
					switch(editor.column)
					{
						case "storenumplan":
						row.storenumplan = state.value;
						break;
						case "lifespan":
						row.lifespan = state.value;
						break;
						case "addedstockqty":
						row.lifespan = state.value;
						break;
						case "saleratio":
						row.saleratio = state.value;
						break;
					}
				
					row.addedstockqty = 3*row.storenumplan-row.storenumcurin;
					row.repretqty = parseInt(row.addedstockqty)+parseInt(row.targetqty)-row.onhandqty-row.onroadqty;
					row.saledaily  = row.sale14qty/14/row.storenumcurin;
					row.saledaily = row.saledaily.toFixed(4);
										
					row.forecastsale = parseFloat(row.saledaily)*parseInt(row.lifespan)*parseInt(row.storenumplan)*parseFloat (row.saleratio);
					row.forecastsale = row.forecastsale.toFixed(0);
					
					row.totalseasonsale = parseInt(row.forecastsale)+parseInt(row.saletotalqty);
					row.totalseasonstock = (parseInt(row.totalseasonsale)/(1-parseFloat(row.endratio))).toFixed(0);
					row.neededstock = parseInt(row.totalseasonstock)-parseInt(row.existsstockqty);
//					console.log(row);
					 $$("dt_sugskcprodplan").updateItem(id,row);
			    } 
			}
		}
	};

	var layout = {
		type: "clean",
		id: "cwhSugSKCRepPlanView",
		rows:[
			titleBar,gridTree,
		]
	};


	return { $ui: layout };

});
