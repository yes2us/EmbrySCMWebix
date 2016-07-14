define(
	["data/billobject",
	"data/stockobject"],
	function(billobject,stockobject){
	
	var bizUnitCode = null;
    var branchCode = null;
    
    var dealstate = '等待确认';
    	var startdate = new Date(new Date().toString("yyyy/M/d"));
	var enddate  = startdate;
	
    function updateBMRecord(row){
    	  var postData = row;
    	    postData.UserCode = _UserCode;
    	    postData.webix_operation='update';
    	    webix.ajax().post(urlstr+"/WBCURDMng/saveBMRecord",postData);
    	    
    	    stockobject.updateTargetBySKC(row.partycode,row.skucode,row.sugtargetqty);
    	    webix.message('操作完成！');
    }
    
    function loadData(){
    		$$("dt_storebmrecord101").clearAll();
		$$("dt_storebmrecord101").showOverlay("正在加载......");
					
		var _postData={UserCode:_UserCode,DealState:dealstate};
		
		if(branchCode&&branchCode.indexOf('all')<0) _postData.BranchCode  =branchCode;
		else if(bizUnitCode&&bizUnitCode.indexOf('all')>=0) _postData.BizUnitCode  =bizUnitCode;

		if(startdate) _postData.StartDate = startdate;
		if(enddate) _postData.EndDate = enddate;
					                  	
		$$("dt_storebmrecord101").parse(billobject.getPartyBMRecord(_postData));
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
					                	     			$$("dt_storebmrecord101").hideColumn("check");
					                	     		else 
					                	     			$$("dt_storebmrecord101").showColumn("check");
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
									
								{view: "multiselect",id:"bizUnitCode121",name:"bizUnitCode121",label: "事业部",//css:"fltr",
									options:urlstr+'/WBPartyMng/getBizUnitList/UserCode/'+_UserCode,
									on:{
											onChange:function(newv,oldv){
												if(newv)
												{	
													bizUnitCode = newv;
													if(newv.indexOf('all')>=0)
													$$("branchCode121").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
													else
													$$("branchCode121").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
									}},
									
								{view:"multiselect", id:"branchCode121",name:"branchCode121",align: "left", label: '办事处',
								    options:[],
								    	on:{
											onChange:function(newv,oldv){
												if(newv)
												{
													branchCode= newv;
												}
											}
										}
								    },
								    
								    {view:"button",label:"查询",click:function(){loadData();}} 
									]}
                ]
            };
	
	var toolbar_header = {
                view:"toolbar",
                width:_ListWidth,
  				cols:[
						{ view:"button", label:"拒绝",width:100,
							click:function(){

						   	  $$("dt_storebmrecord101").eachRow(function(rowid){
						    	  	 var row = $$("dt_storebmrecord101").getItem(rowid);
						    	  	 if(row.check)
						    	  	 {
						    	  	 	row.dealstate = '已被拒绝';
						    	  	 	$$("dt_storebmrecord101").updateItem(row);
						    	  	 	updateBMRecord(row);
						    	  	 }
						    	 });
						}
					},

					{ view:"button", label:"通过",width:100,
							click:function(){

						   	  $$("dt_storebmrecord101").eachRow(function(rowid){
						    	  	 var row = $$("dt_storebmrecord101").getItem(rowid);
						    	  	 if(row.check)
						    	  	 {
						    	  	 	row.dealstate = '人工确认';
						    	  	 	$$("dt_storebmrecord101").updateItem(row);
						    	  	 	updateBMRecord(row);
						    	  	 }
						    	 });
						}
					},
				
					{},
					{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
						click:function(){webix.toExcel($$("dt_storebmrecord101"));}},
						
                ]
            };
            
	var dt_storebmrecord101 = {
		view:"datatable",
		id:"dt_storebmrecord101",
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
			{ id:"skucode",header:["SKU/SKC",{content:"textFilter"}], sort:"string",width:120},
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
						$$("dt_stockdetail").clearAll();
						$$("dt_stockdetail").parse(stockobject.getTargetBySKC(row.partycode,row.skucode));
					}
			}
		},
	};

	var dt_stockdetail = {
		view:"datatable",
		id:"dt_stockdetail",
		rowHeight:_RowHeight,
		maxHeight:200,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		select: true,
		navigation:true,
//		save:urlstr+"/WBCURDMng/saveBMRecord",
		columns:[
			{ id:"_identify",header:"ID", hidden:true,sort:"string"},
			{ id:"skucode",header:"SKU", sort:"string",fillspace:2},
			{ id:"iskeysize",header:"核心码",template:"{common.checkbox()}", sort:"string",fillspace:0.5},
			{ id:"targetqty",	header:"目标库存", sort:"int",fillspace:1},
			{ id:"onhandqty",header:"在手库存", sort:"int",fillspace:1},
			{ id:"onroadqty",	header:"在途库存", sort:"int",fillspace:1},
		],
			on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
		},
	};
	
	var layout = {
		type: "clean",
		cols:[toolbar_condition,{rows:[toolbar_header,dt_storebmrecord101,dt_stockdetail]}]
	};


	return {
	$ui:layout,
	$oninit:function(){
		  	$$("dt_storebmrecord101").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
		    		if((editor.column==="sugtargetqty" ) && state.value != state.old)	
		        {
		        		updateBMRecord($$("dt_storebmrecord101").getItem(editor.row));
		        }
			});
		}
	}
	
});
