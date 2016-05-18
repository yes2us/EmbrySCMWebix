define([
	"data/partyobject",
	"views/modules/modaladd/addparty",
	],
function(partyobject,modaladd){
	
	checkauthorization(false);
	
  var titleBar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_party").clearAll();
				$$("dt_party").parse(partyobject.getPartyList());
				}},
			{},
			{ view: "button",id:"editbutton", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('dt_party').define('editable',true);	
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_party"));}},
		]
	};
	
	var grid_party = {
		margin:10,
		rows:[
			{
				id:"dt_party",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				leftSplit:4,
				editable:true,
				navigation:true,
				select:"row",
				export:true,
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveParty",
				columns:[
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"_identify", header:"ID",hidden:true, sort:"string",width:60},
					{id:"partyenabled", header:"启用", template:"{common.checkbox()}", sort:"string",width:60},
					{id:"partycode", header:["仓库编号",{content:"textFilter"}], sort:"string",width:100},
					{id:"partyname", header:"仓库名", editor:"text", sort:"string",width:150},
					{id:"partytype", header:"类型", editor:"text", sort:"string",width:60,editor:"select",
					    options:[{id:"门店",value:"门店"},{id:"总仓",value:"总仓"}
					    ,{id:"事业部",value:"事业部"},{id:"办事处",value:"办事处"},{id:"工厂",value:"工厂"}]},
					{id:"partylevel", header:"级别", editor:"text", sort:"string",width:60},
					
					{id:"isreplenish", header:"拉补",template:"{common.checkbox()}", sort:"int",width:60},
//					{id:"reppriority", header:"优先级", editor:"text", sort:"string",width:70},
					{id:"repschedule", header:"补货计划", editor:"text", sort:"string",width:70},
//					{id:"repbatchzize", header:"补货批量", editor:"text", sort:"int",width:85},
//					{id:"repnextdate", header:"补货日期", editor:"date", sort:"string",width:100},
//					{id:"repordercycle", header:"下单间隔", editor:"text", sort:"int",width:85},
//					{id:"repsupplytime", header:"供应时间", editor:"text", sort:"int",width:85},
//					{id:"reprollspan", header:"滚动步长", editor:"text", sort:"int",width:85},					
					
//					{id:"isreturnstock", header:"退货", template:"{common.checkbox()}", sort:"int",width:60},
//					{id:"retbatchsize", header:"退货批量", editor:"text", sort:"int",width:85},
//					{id:"isretoverstock", header:"退超量", template:"{common.checkbox()}", sort:"int",width:100},
//					{id:"retoverstocknextdate", header:"退超日期", editor:"date", sort:"string",width:85},
//					{id:"retoverstockcycle", header:"退超间隔", editor:"text", sort:"int",width:85},
//					{id:"isretdeadstock", header:"退死货", template:"{common.checkbox()}", sort:"int",width:70},							
//					{id:"retdeadstocknextdate", header:"退死日期", editor:"date", sort:"string",width:100},
//					{id:"adjdeadstockcycle", header:"退死间隔", editor:"text", sort:"int",width:85},							
					
					{id:"isadjusttarget", header:"调整目标库存", template:"{common.checkbox()}", sort:"int",width:100},
//					{id:"isUseskuadjpara", header:"按SKU调整", template:"{common.checkbox()}", sort:"int",width:100},
					
					{id:"adjupchkperiod", header:"上调周期", editor:"text", sort:"int",width:85},							
					{id:"adjupfreezeperiod", header:"冻结周期", editor:"text", sort:"int",width:85},
					{id:"adjuperodelmt", header:"浸入量", editor:"text", sort:"int",width:85},		
											
					{id:"adjdnchkperiod", header:"下调周期", editor:"text", sort:"int",width:85},							
					{id:"adjdnfreezeperiod", header:"冻结周期", editor:"text", sort:"int",width:85},
					{id:"adjdnerodelmt", header:"浸入次数", editor:"text", sort:"int",width:85},
				],
				on: {
					onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow){
						var PremzRelData = partyobject.getPartyRelation(selRow.partycode);
						$$("dt_partyrelation").clearAll();
						$$("dt_partyrelation").parse(PremzRelData);
						}
					}
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_party").remove(id);
								}
							}
						});
					}
				},
//				pager:"para_pagerA"
			}
		]

	};

var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", 
							id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
var grid_relation ={
	 view:"datatable",
	 id:"dt_partyrelation",
	 rowHeight:_RowHeight+5,
	 headerRowHeight:_HeaderRowHeight,
	headermenu:{width:250,autoheight:false,scroll:true},
	resizeColumn:true,
	editable:true,
	select:"row",
	save:urlstr+"/WBCURDMng/saveParty2PartyRelation",
	 columns:[
	    	{id:"deletebutton", header:"&nbsp;",hidden:false, width:60, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
	    {id:"_identify",header:"ID",hidden:true,width:30},
	    	{id:"relationtype",header:"关系类型",fillspace:1},
	    {id:"parentcode",header:"上级编号",fillspace:1,editor:"text"},
	    {id:"parentname",header:"上级",fillspace:1},
//	    {id:"relationorder",header:"关系次序",fillspace:1}
	 ],
	 onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_partyrelation").remove(id);
								}
							}
						});
					}
				},
}


	var form_addrelation = 
		{ view:"form", scroll:false, width:220, elements:
		[
			{ view:"radio", name:"relationtype", align:"center", width:180,vertical:true,value:"补货关系",
			options:["补货关系", "退货关系", "归属关系"] },
			{ view:"button", id:"bnaddrelation",value:"增加关系", width:180, align:"center",click:function(){
				var selRow = $$("dt_party").getSelectedItem();
				var selRelationType = this.getFormView().getValues().relationtype;
				if(selRow)
				{
					var ExistsRelation = $$("dt_partyrelation").find(function(item){
						return item.relationtype.trim()==selRelationType.trim();
					});
					if(!ExistsRelation.length)
					{
						 $$("dt_partyrelation").add({partycode:selRow.partycode,relationtype:selRelationType});
					}
				}
			}}
		]};
		
	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_party,
//			pager,
			{view:"resizer"},
			{cols:[ form_addrelation ,grid_relation]}
		]

	};


	return {
		$ui: layout,
		$oninit:function(){

			var hasWriteAuth = checkWriteAuth();

				$$("dt_party").define("editable",hasWriteAuth);
				$$("dt_partyrelation").define("editable",hasWriteAuth);
				$$("bnaddrelation").define("disabled",!hasWriteAuth);
				
				$$("editbutton").define("disabled",!hasWriteAuth);
				$$("addbutton").define("disabled",!hasWriteAuth);
			
			
			
			$$("dt_party").clearAll();
			$$("dt_party").parse(partyobject.getPartyList());
			
			webix.dp.$$("dt_party").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_party").getItem(id)._identify = response;
				$$("dt_party").refresh();   
			}); 

			webix.dp.$$("dt_partyrelation").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_partyrelation").getItem(id)._identify = response;
				$$("dt_partyrelation").refresh();   
			}); 
		}
	};

});