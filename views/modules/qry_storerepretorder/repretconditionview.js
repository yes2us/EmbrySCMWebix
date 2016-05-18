define(
[
"data/billobject"
],
function(billobject){

    var regioncode = null;
    	var startdate = new Date(new Date().toString("yyyy/M/d"));
	var enddate  = startdate;
    var plantype="补货";
    
    function loadData(){
    		$$("dt_repretorder").clearAll();
		$$("dt_repretorderitem").clearAll();
		$$("dt_repretorder").showOverlay("正在加载......");
					
		var _postData={};
		_postData.PlanType = plantype;
		if(plantype=='补货')  _postData.SrcPartyCode  =regioncode;
		if(plantype=='退货')  _postData.TrgPartyCode  =regioncode;

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
								{view: "combo",label: "选择区域",//css:"fltr",
									options:urlstr+'/WBPartyMng/getRegionList',
									on:{
										onChange:function(newregioncode, oldregioncode){
											if(newregioncode!=oldregioncode) regioncode = newregioncode;
					                	     	loadData();
										}
									}},					                
					                	{view:"datepicker", id:"startdate_input",label:"开始日期",value:startdate,
					                  on:{onChange:function(newdate,olddate){
					                  	startdate = newdate;
					                	     loadData();
					                  }
					                  }},
					             
					             	{view:"datepicker", id:"enddate_input",label:"结束日期",value:enddate,
					                  on:{onChange:function(newdate,olddate){
											enddate = newdate;
						                  	loadData();
					                  }
					                  }},
					                  
									]}
                ]
            }
			]
			}
		}
	}
});