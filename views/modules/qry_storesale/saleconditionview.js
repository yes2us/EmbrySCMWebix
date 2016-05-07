define(
[
"data/partyobject",
"data/billobject"
],
function(partyobject,billobject){

	    var regioncode = null;
	    var storecode = null;
    	
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
		if(regioncode && regioncode != 'all' && !storecode) _postData.RegionCode = regioncode;
		if(storecode && storecode != 'all')  _postData.StoreCode = storecode;
					                  	
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
								{view: "combo",label: "选择区域",//css:"fltr",
									options:urlstr+'/WBPartyMng/getRegionList',
									on:{
										onChange:function(newregioncode, oldregioncode){
											if(newregioncode!=oldregioncode) 
											{
												regioncode = newregioncode;
												$$("lt_stores1").clearAll();
												 $$("lt_stores1").refresh();
											}
										  $$("lt_stores1").parse(partyobject.getRelPartyList({
												RegionCode:newregioncode,
												FieldStr:"PartyCode,PartyName"
											}));
										}
									}},	
									{view:"text", id:"grouplist_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var value = this.getValue();
								       	 		$$("lt_stores1").filter(function(obj){
								            	return (obj.partycode && obj.partycode.indexOf(value)>=0) || (obj.partyname && obj.partyname.indexOf(value)>=0);
					                });
					                  }}},
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
					                  
									]}
                ]
           },
           		{					
					view: "list",
					id: "lt_stores1",
					select: true,
					navigation:true,
				    template:"#partycode# - #partyname#",
					scheme:{
					$init:function(obj){
					}
				},
				    
				on: {
						onSelectChange:function(id){
							if(id==1 || !this.getItem(id)) return;			
							storecode = this.getItem(id).partycode;
							loadData();
						}
						
					}
				}
			]
			}
		}
	}
});