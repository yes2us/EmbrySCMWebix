define(
["data/partyobject"],
function(partyobject){
    var regionCode;
    var bizUnitCode;
    
	return {
		getRegionCode:function(){return regionCode;},
		$ui:{
			width:_ListWidth,
			type: "line",
			css: "highlighted_header header5",
			header:"店铺列表",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								{view: "multiselect",id:"bizUnitCode101",name:"bizUnitCode101",label: "事业部",//css:"fltr",
									options:urlstr+'/WBPartyMng/getBizUnitList/UserCode/'+_UserCode,
									on:{
											onChange:function(newv,oldv){
												if(newv)
												{	
													bizUnitCode = newv;
													if(newv.indexOf('all')>=0)
													$$("branchCode101").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
													else
													$$("branchCode101").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
									}},
									
								{view:"multiselect", id:"branchCode101",name:"branchCode101",align: "left", label: '办事处',
								    options:[],
								    	on:{
											onChange:function(newv,oldv){
												if(newv)
												{
													$$("lt_refrstores").clearAll();
													
													if(newv.indexOf('all')>=0)
													$$("lt_refrstores").load(urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
													else													
													$$("lt_refrstores").load(urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
										}
								    },
									
					                {view:"text", id:"grouplist_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var v = this.getValue();
								       	 		$$("lt_refrstores").filter(function(obj){
								            	return (obj.id && obj.id.indexOf(v)>=0) || (obj.value && obj.value.indexOf(v)>=0);
					                });
					                  }}},
					                
									]}
                ]
            },
				{					
					view: "list",
					id: "lt_refrstores",
					select: true,
					navigation:true,
				    template:"#id# - #value#",
					scheme:{
					$init:function(obj){
					}
				},
				    
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
			}
		}
	}
});