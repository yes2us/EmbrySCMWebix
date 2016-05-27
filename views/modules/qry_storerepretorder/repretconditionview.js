define(
[
"data/billobject"
],
function(billobject){

    var bizUnitCode = null;
    var branchCode = null;
    
    	var startdate = new Date(new Date().toString("yyyy/M/d"));
	var enddate  = startdate;
    var plantype="补货";
    
    function loadData(){
    		$$("dt_repretorder").clearAll();
		$$("dt_repretorderitem").clearAll();
		$$("dt_repretorder").showOverlay("正在加载......");
					
		var _postData={};
		_postData.PlanType = plantype;
		
		if(branchCode.indexOf('all')<0)
		{
			if(plantype=='补货')  _postData.SrcPartyCode  =branchCode;
			if(plantype=='退货')  _postData.TrgPartyCode  =branchCode;
		}

		if(startdate) _postData.StartDate = startdate;
		if(enddate) _postData.EndDate = enddate;
					                  	
		$$("dt_repretorder").parse(billobject.getMovSKUPlan(_postData));
    };
    
	return {
		getPlanType:function(){return plantype;},
		$ui:{
			width:_ListWidth,
			type: "line",
			css: "highlighted_header header5",
			header:"查询条件",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								 { view:"segmented", value:"补货", label:"",inputWidth:_ListWidth-10, 
										options:[
											{ id:"补货", value:"补货"},
											{ id:"退货", value:"退货"}],
											click:function(){
												plantype = this.getValue();										
					                	     		loadData();
									 }
									},
									
									{view:"datepicker", id:"startdate_input",label:"开始日期",value:startdate,
					                  on:{onChange:function(newdate,olddate){
					                  	startdate = newdate;
//					                	     loadData();
					                  }
					                  }},
					             
					             	{view:"datepicker", id:"enddate_input",label:"结束日期",value:enddate,
					                  on:{onChange:function(newdate,olddate){
											enddate = newdate;
//						                  	loadData();
					                  }
					                  }},
//					                  
//								{view: "combo",label: "选择区域",//css:"fltr",
//									options:urlstr+'/WBPartyMng/getRegionList',
//									on:{
//										onChange:function(newregioncode, oldregioncode){
//											if(newregioncode!=oldregioncode) regioncode = newregioncode;
//					                	     	loadData();
//										}
//									}},	
									
								{view: "multiselect",id:"bizUnitCode111",name:"bizUnitCode111",label: "事业部",//css:"fltr",
									options:urlstr+'/WBPartyMng/getBizUnitList/UserCode/'+_UserCode,
									on:{
											onChange:function(newv,oldv){
												if(newv)
												{	
													bizUnitCode = newv;
													if(newv.indexOf('all')>=0)
													$$("branchCode111").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
													else
													$$("branchCode111").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
									}},
									
								{view:"multiselect", id:"branchCode111",name:"branchCode111",align: "left", label: '办事处',
								    options:[],
								    	on:{
											onChange:function(newv,oldv){
												if(newv)
												{
													branchCode= newv;
//													loadData();
												}
											}
										}
								    },
								    
								    {view:"button",label:"查询",click:function(){loadData();}}

					                  
									]}
                ]
            }
			]
			}
		}
	}
});