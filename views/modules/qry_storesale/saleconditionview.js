define(
[
"data/partyobject",
"data/billobject"
],
function(partyobject,billobject){

		var bizUnitCode = null;
	    var branchCode = null;
	    var storeCode = null;
    	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-1);
		enddate = enddate.toString('yyyy-MM-dd');
		
		var startdate = new Date(enddate);
		startdate.setDate(startdate.getDate()-7);
		startdate = startdate.toString('yyyy-MM-dd');
				
    function loadData(){
    		$$("dt_saleorder").clearAll();
		$$("dt_saleorder").showOverlay("正在加载......");
					
		var _postData={};
		_postData.StartDate = startdate;
		_postData.EndDate = enddate;

		if(storeCode && storeCode.indexOf('all')<0)  _postData.StoreCode = storeCode;
		else 
		if(branchCode && branchCode.indexOf('all')<0) _postData.BranchCode = branchCode;
		
					                  	
		$$("dt_saleorder").parse(billobject.getSaleOrder(_postData));
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
						
								{view: "multiselect",id:"bizUnitCode112",name:"bizUnitCode112",label: "事业部",//css:"fltr",
									options:urlstr+"/WBPartyMng/getBizUnitList/UserCode/"+_UserCode,
									on:{
											onChange:function(newv,oldv){
												if(newv)
												{	
													bizUnitCode = newv;
													if(newv.indexOf('all')>=0)
													$$("branchCode112").define('options',urlstr+"/WBPartyMng/getBranchList"+"/UserCode/"+_UserCode);
													else
													$$("branchCode112").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
									}},
									
								{view:"multiselect", id:"branchCode112",name:"branchCode112",align: "left", label: '办事处',
								    options:[],
								    	on:{
											onChange:function(newv,oldv){
												if(newv)
												{
													branchCode= newv;
													if(newv.indexOf('all')>=0)
													$$("lt_stores112").load(urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
													else
													$$("lt_stores112").load(urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
										}
								    },
								   
		
									{view:"text", id:"grouplist_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var value = this.getValue();
								       	 		$$("lt_stores112").filter(function(obj){
								            	return (obj.id && obj.id.indexOf(value)>=0) || (obj.value && obj.value.indexOf(value)>=0);
					                });
					                  }}},
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
					                  
									]}
                ]
           },
           		{					
					view: "list",
					id: "lt_stores112",
					select: true,
					navigation:true,
				    template:"#id# - #value#",
					scheme:{
					$init:function(obj){
					}
				},
				    
				on: {
						onSelectChange:function(id){
							if(id==1 || !this.getItem(id)) return;			
							storeCode = this.getItem(id).id;
							loadData();
						}
						
					}
				}
			]
			}
		}
	}
});