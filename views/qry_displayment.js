define([],
function(){
	
//	checkauthorization(false);

	var titleBar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
					{ view:"segmented", name:"lifestage", label:"新旧类别",options:["所有", "新品", "旧品"],value:"所有"},
					{ view:"segmented", name:"prodtype",  label:"分析粒度",options:["大类","小类"], value:"小类"},
					{ view:"button", value:"确定", width:100, align:"center",
						click:function(){
						var values = this.getParentView().getParentView().getValues();
						var postData={};
						if(values.lifestage!='所有')  postData.LifeStage = values.lifestage;
						postData.ProdType = values.prodtype==='大类'? "MainType":"SubType";
						
						webix.ajax().post(urlstr+"/WBProdMng/getPMixData",postData).then(function(response){
							drawChart(response.json())
						});
					}},
					{},
					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, click:function(){webix.toExcel($$("dt_para"));}},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_profitability",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				leftSplit:3,
				editable:true,
				navigation:true,
				select:"row",
				columns:[
//					{id:"skccode", header:"款杯色", sort:"string",fillspace:1},
					{id:"maintypename",header:"大类",sort:"string",fillspace:0.7},
					{id:"subtypename",header:"小类",sort:"string",fillspace:1},
					
					{id:"profitability", header:"盈利能力", sort:"int",fillspace:0.7},
					{id:"profitabilityrank", header:"能力排名",sort:"int",fillspace:0.5},
					
					{id:"ccrload", header:"陈列广度",sort:"int",fillspace:0.7},
					{id:"ccrloadrank", header:"广度排名",sort:"string", fillspace:0.5},
					
//					{id:"tput", header:"有效产出",sort:"float" ,fillspace:0.7},					
//					{id:"tputrank", header:"产出排名", sort:"float",fillspace:0.5}
				],
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
			}
		]

	};

							
	var layout = {
		type: "line",
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