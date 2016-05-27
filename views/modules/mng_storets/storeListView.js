define(
["data/partyobject"],
function(partyobject){
	var bizUnitCode;
	return {
		$ui:{
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"店铺列表",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								{view: "multiselect",id:"bizUnitCode110",name:"bizUnitCode110",label: "事业部",//css:"fltr",
									options:urlstr+'/WBPartyMng/getBizUnitList/UserCode/'+_UserCode,
									on:{
											onChange:function(newv,oldv){
												if(newv)
												{
													bizUnitCode = newv;
													if(newv.indexOf('all')>=0)
													$$("branchCode110").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
													else
													$$("branchCode110").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode+"/BizUnitCode/"+newv);
												}
											}
									}},
									
								{view:"multiselect", id:"branchCode110",name:"branchCode110",align: "left", label: '办事处',
								    options:[],
								    	on:{
											onChange:function(newv,oldv){
												if(newv)
												{
													$$("lt_stores").clearAll();
													
													if(newv.indexOf('all')>=0)
													$$("lt_stores").load(urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
													else
													$$("lt_stores").load(urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
										}
								    },
			    
					                {view:"text", id:"grouplist_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var v = this.getValue();
								       	 		$$("lt_stores").filter(function(obj){
								            	return (obj.id && obj.id.indexOf(v)>=0) || (obj.value && obj.value.indexOf(v)>=0);
					                });
					                  }}},
					                
									]}
                ]
            },
				{					
					view: "list",
					id: "lt_stores",
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