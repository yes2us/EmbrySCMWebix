define(
	["data/billobject",
	"data/stockobject"],
	function(billobject,stockobject){

    
    var dealstate = '等待确认';
    	var startdate = new Date(new Date().toString("yyyy/M/d"));
	var enddate  = startdate;
	
	function drawChart(WHCode,SKUCode,EndDate){
		var premzChartData = webix.ajax().post(urlstr+"/WBStockMng/getSKUHSStock",{});
		
		premzChartData.then(function(repsonse){
				var rtObject = repsonse.json();
				var yValueLimit = rtObject.yValueLimit[0].yValueLimit;
				
				
				$$("chartid3").clearAll();
				$$("chartid3").define("yAxis",{ start:0, step:1, end: yValueLimit});
				$$("chartid3").refresh();
				$$("chartid3").parse(rtObject.imgData);
			});
	}
			
    function updateBMRecord(row){
    	  var postData = row;
    	    postData.UserCode = _UserCode;
    	    postData.webix_operation='update';
    	    webix.ajax().post(urlstr+"/WBCURDMng/saveBMRecord",postData);
    	    
    	    stockobject.updateTargetBySKC(row.partycode,row.skucode,row.sugtargetqty);
    	    webix.message('操作完成！');
    }
    
    function loadData(){
    		$$("dt_cwhbmrecord101").clearAll();
		$$("dt_cwhbmrecord101").showOverlay("正在加载......");
					
		var _postData={UserCode:_UserCode,DealState:dealstate,WHCode:_CWHCode};
		
		if(startdate) _postData.StartDate = startdate;
		if(enddate) _postData.EndDate = enddate;
					                  	
		$$("dt_cwhbmrecord101").parse(billobject.getPartyBMRecord(_postData));
    };
    
	var toolbar_condition = {
                view:"toolbar",
                width:_ListWidth,
                elements:[
					{rows:[
								 { view:"segmented", value:"等待确认", label:"",inputWidth:_ListWidth-10, 
										options:[
											{ id:"等待确认", value:"待审"},
											{ id:"人工确认", value:"已审"},
											{ id:"自动确认", value:"自审"}],
											click:function(){
												dealstate = this.getValue();										
					                	     		if(dealstate!='等待确认') 
					                	     			$$("dt_cwhbmrecord101").hideColumn("check");
					                	     		else 
					                	     			$$("dt_cwhbmrecord101").showColumn("check");
									 }
									},
									
									{view:"datepicker", id:"startdate_input",label:"开始日期",value:startdate,
					                  on:{onChange:function(newdate,olddate){
					                  	startdate = newdate;
					                  }
					                  }},
					             
					             	{view:"datepicker", id:"enddate_input",label:"结束日期",value:enddate,
					                  on:{onChange:function(newdate,olddate){
											enddate = newdate;
					                  }
					                  }},
								    
								    {view:"button",label:"查询",click:function(){loadData();}} 
									]},
                ]
            };
	
	var toolbar_header = {
                view:"toolbar",
                width:_ListWidth,
  				cols:[
						{ view:"button", label:"拒绝",width:100,
							click:function(){

						   	  $$("dt_cwhbmrecord101").eachRow(function(rowid){
						    	  	 var row = $$("dt_cwhbmrecord101").getItem(rowid);
						    	  	 if(row.check)
						    	  	 {
						    	  	 	row.dealstate = '已被拒绝';
						    	  	 	$$("dt_cwhbmrecord101").updateItem(row);
						    	  	 	updateBMRecord(row);
						    	  	 }
						    	 });
						}
					},

					{ view:"button", label:"通过",width:100,
							click:function(){

						   	  $$("dt_cwhbmrecord101").eachRow(function(rowid){
						    	  	 var row = $$("dt_cwhbmrecord101").getItem(rowid);
						    	  	 if(row.check)
						    	  	 {
						    	  	 	row.dealstate = '人工确认';
						    	  	 	$$("dt_cwhbmrecord101").updateItem(row);
						    	  	 	updateBMRecord(row);
						    	  	 }
						    	 });
						}
					},
					
					{},
					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
						click:function(){webix.toExcel($$("dt_cwhbmrecord101"));}},
						
                ]
            };
            
	var dt_cwhbmrecord101 = {
		view:"datatable",
		id:"dt_cwhbmrecord101",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:5,
		select: true,
		navigation:true,
		editable:true,
//		save:urlstr+"/WBCURDMng/saveBMRecord",
		columns:[
			{id:"check", header:{content:"masterCheckbox"},value:0,width:50,template:"{common.checkbox()}",css:"bgcolor1"},
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"ID", hidden:true,sort:"string"},
			{ id:"partycode",header:"仓库编号",sort:"string",width:75},
			{ id:"partyname",header:"仓库名称",sort:"string",width:120},
			{ id:"skucode",header:["SKU",{content:"textFilter"}], sort:"string",width:120},
			{ id:"recorddate",header:"调整日期", sort:"string",width:90},
			{ id:"oldtargetqty",header:"原目标库存", sort:"string",width:60},
			{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",width:60,editor:"text",css:"bgcolor1"},
			
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

	
 				var chart={view:"chart", type:"area",id:"chartid3",
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
						
	
	var layout = {
		type: "clean",
		cols:[toolbar_condition,{rows:[toolbar_header,dt_cwhbmrecord101,chart]}]
	};


	return {
	$ui:layout,
	$oninit:function(){
		  	$$("dt_cwhbmrecord101").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
		    		if((editor.column==="sugtargetqty" ) && state.value != state.old)	
		        {
		        		updateBMRecord($$("dt_cwhbmrecord101").getItem(editor.row));
		        }
			});
		}
	}
	
});
