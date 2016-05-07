define(function(){
	var toolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "label",label:"查询目标库存调整记录"},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_cwhbmrecord"));}},
		]
	};
	
 var chart=	{view:"chart", type:"area",id:"chartid2",
            						xAxis:{ template:"#date#"},
            						legend:{
                						values:[{text:"绿区",color:"#66cc00"},{text:"黄区",color:"#e9df40"},
                						{text:"红区",color:"#ff0000"},{text:"在手库存",color:"#000000"}],
                						align:"right", valign:"middle", layout:"x",width: 10,margin: 2 },
            						series:[
            									{
							                    type:"area",
							                    value:"#greenzone#",
							                    color:"#66cc00",
							                 	label:"#greenzone#"
							                },
							                	{
							                    type:"area",
							                    value:"#yellowzone#",
							                    color:"#e9df40",
//							                 	label:"#yellowzone#"
							                },
							                	{
							                    type:"area",
							                    value:"#redzone#",
							                    color:"#ff0000",
//							                    label:"#redzone#"
							                },
            									{
							                    type:"line",
							                    value:"#handqty#",
							                    line:{color:"#000000",width:5},
							                    tooltip:{template:"#handqty#" },
							                    label:"#handqty#"
							                }],
						};
						
		function drawChart(WHCode,SKUCode,EndDate){
//		var premzChartData = webix.ajax().post(urlstr+"/WBStockMng/getSKUHSStock",
//		{WHCode:WHCode,SKUCode:SKUCode,EndDate:SKUCode});
	
		var premzChartData = webix.ajax().post(urlstr+"/WBStockMng/getSKUHSStock",{});
		
		premzChartData.then(function(repsonse){
				var rtObject = repsonse.json();
				var yValueLimit = rtObject.yValueLimit[0].yValueLimit;
				
//				console.log(JSON.stringify(rtObject))
				
				$$("chartid2").clearAll();
				$$("chartid2").define("yAxis",{ start:0, step:1, end: yValueLimit});
				$$("chartid2").refresh();
				$$("chartid2").parse(rtObject.imgData);
			});
	}
						
	var gridTree = {
		view:"treetable",
		id:"dt_cwhbmrecord",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:5,
		select: true,
		navigation:true,
		editable:true,
		save:urlstr+"/WBCURDMng/saveBMRecord",
		columns:[
			{id:"refusechked", header:"拒绝",width:70,template:"{common.checkbox()}",css:"bgcolor1"},
			{id:"passchked", header:"通过",width:70,template:"{common.checkbox()}",css:"bgcolor1"},
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"ID", sort:"string",css:'bgcolor2'},
			{ id:"skucode",header:"SKU", sort:"string",width:120,css:'bgcolor2'},
			{ id:"recorddate",header:"调整日期", sort:"string",width:100},
			{ id:"oldtargetqty",header:"原目标库存", sort:"string",width:90},
			{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",width:90,editor:"text",css:"bgcolor1"},
			
			{ id:"bmreason",	header:"调整原因", sort:"string",fillspace:1},
			{ id:"operator",header:"操作人", sort:"string",width:70}
		],
			on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			onSelectChange:function(){
					var row = this.getSelectedItem();
					if(row)
					{	
						drawChart(row.partycode,row.skucode,row.recorddate);
					}
			}
		},
	};

	var layout = {
		type: "clean",
		id: "cwhBMRecordView",
		rows:[
		toolbar,
			gridTree,
			chart
		]
	};


	return { $ui: layout };

});
