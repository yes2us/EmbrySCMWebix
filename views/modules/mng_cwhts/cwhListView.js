define([],
function(){

	return {
		$ui:{
			id:"cwhListView",
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"总仓列表",
			body:{
			rows:[	
				{					
					view: "list",
					id: "lt_cwhs",
					select: true,
					navigation:true,
				    template:"#id# - #value#",
				    url:urlstr+'/WBPartyMng/getCWHList',
					scheme:{
					$init:function(obj){
					}
				}
				}
			]
			}
		}
	}
});