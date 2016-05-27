define(
[],
function(){
	var bizUnitCode = null;
	var branchCode = null;
	return {
		getBranchCode:function(){return branchCode;},
		$ui:{
			width:_ListWidth,
			type: "line",
			css: "highlighted_header header5",
			header:"办事处列表",
			body:{
			rows:[	
						{view: "multiselect",id:"bizUnitCode114",name:"bizUnitCode114",label: "事业部",//css:"fltr",
									options:urlstr+'/WBPartyMng/getBizUnitList/UserCode/'+_UserCode,
									on:{
											onChange:function(newv,oldv){
												if(newv)
												{	
													bizUnitCode = newv;
													if(newv.indexOf('all')>=0)
													$$("branchCode114").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
													else
													$$("branchCode114").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
												}
											}
									}},
									
								{view:"multiselect", id:"branchCode114",name:"branchCode114",align: "left", label: '办事处',
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
								    
								    {view:"button",id:"bnSaveBranchCode114",label:"查询"},
								   
			]
			}
		}
	}
});