define([
	"data/prodobject",
	],
function(prodobject){
	 
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	    var regioncode = null;
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"brandcode", width:200,align: "left", label: '品牌',	labelWidth:60,
					options:urlstr+"/WBProdMng/getBrandList"},
			    {view:"select", id:"yearcode",name:"yearcode",width:200,align:"left", label:'年份',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getYearList"},
			    	{view:"select", id:"seasoncode",name:"seasoncode",width:200,align:"left", label:'季节',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getSeasonList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	
				    	$$("dt_confskcinfo").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.yearcode != 'all') postData.YearName=values.yearcode;
				    	if(values.seasoncode != 'all') postData.SeasonName=values.seasoncode;
				    	
					$$("dt_confskcinfo").clearAll();
					$$("dt_confskcinfo").parse(prodobject.getProductList(postData));
				 }},
			    	 {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_confskcinfo"));}},

		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_confskcinfo",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				editable:true,
				resizeColumn:true,
				select:true,
				navigation:true,
				leftSplit:5,
				save:urlstr+"/WBCURDMng/saveSKC",
				columns:[
					{ id:"_identify",header:"#", hidden:true},
					{ id:"isstopreplenish",header:"停产", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"isstopproduce",header:"停补", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"isstopanalyze",header:"停分析", sort:"int",width:70,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"rownum",header:"序号",sort:"int",width:60},
					{ id:"skccode",header:"款色", sort:"string",width:130,css:'bgcolor2'},
//					{ id:"skcname",header:"名称", sort:"string",width:150},
					{ id:"stylecode",header:"款式", sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:70},
					{ id:"otherskucompname",header:"杯", sort:"string",width:40},
					{ id:"lifestage",header:"新旧", sort:"string",width:70},
					{ id:"yearname",header:"年份", sort:"string",width:70},
					{ id:"seriesname",header:"系列", sort:"string",width:100},
					{ id:"maintypename",header:"大类", sort:"string",width:70},
					{ id:"subtypename",header:"小类", sort:"string",width:100},
					{ id:"onshelfdate",header:"上货日期", width:90},
//					{ id:"subtypecode2",header:"属性2", sort:"string",width:150},
//					{ id:"subtypecode3",header:"属性3", sort:"string",width:150}
				],
				export: true,
				on: {
						onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
//				pager:"confskc_pagerA"
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
			if(!checkWriteAuth())
			{
				$$("dt_confskcinfo").define("editable",false);
			}
		}
	};

});