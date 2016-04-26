define([
	"data/stockobject",
	],
function(stockobject){
	 
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	    var regioncode = 'all';
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"regioncode", width:250,align: "left", label: '区域',labelWidth:60,
				options:urlstr+"/WBPartyMng/getRegionList",
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							regioncode = newv;
							webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",{RegionCode:newv},function(response){
								   if(response){
									var optionarray = [{id:'all',value:"所有"}];
									JSON.parse(response).forEach(function(item){
										optionarray.push({id:item.partycode,value:item.partyname});
									});
									
									$$("storecode").define('options',optionarray);
									$$("storecode").refresh();
									}
								});
						}
					}
				}
				},
			    {view:"select", id:"storecode",name:"storecode",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
//				    	console.log(JSON.stringify(values));
				    	   var postData = {};
						if(values.storecode && values.storecode != 'all')
						{
							postData.WHCode=values.storecode;
						}
						else
						{
							if(regioncode)  postData.RegionCode = regioncode;
						}
						$$("dt_storeinittarget").showOverlay("正在加载......");
						$$("dt_storeinittarget").clearAll();
						$$("dt_storeinittarget").parse(stockobject.getInitTarget(postData));
				 }},
			    {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_storeinittarget"));}},
		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_storeinittarget",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				navigation:true,
				leftSplit:2,
				export: true,
				columns:[
				    	{ id:"skccode",header:["款色",{content:"textFilter"}],width:120},
					{ id:"partycode",header:["客户号",{content:"textFilter"}], sort:"string",width:60,css:"bgcolor2"},
					{ id:"partyname",header:"门店", sort:"string",width:120,css:"bgcolor2"},
					{ id:"partylevel",header:["级别",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"lifestage",header:["新旧",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:60},
					{ id:"onshelfdays",header:"到仓天数", sort:"int",width:60},
					
//					{ id:"skcstockqty",header:[{text:"库存", colspan:10},"累计"],sort:"int",width:45},
					{ id:"skcstockqty",header:[{ content:"columnGroup", closed:true, batch:"stock",
							groupText:"库存", colspan:10, width: 45},"累计"],sort:"int",width:80},				
					{ id:"stock65s",batch:"stock",header:[null,"65/S"],sort:"int",width:45},
					{ id:"stock70m",batch:"stock",header:[null,"70/M"], sort:"int",width:45},
					{ id:"stock75l",batch:"stock",header:[null,"75/L"], sort:"int",width:45},
					{ id:"stock80xl",batch:"stock",header:[null,"80/XL"], sort:"int",width:45},
					{ id:"stock852xl",batch:"stock",header:[null,"85/2XL"], sort:"int",width:45},
					{ id:"stock903xl",batch:"stock",header:[null,"90/3XL"], sort:"int",width:45},
					{ id:"stock954xl",batch:"stock",header:[null,"95/4XL"], sort:"int",width:45},
					{ id:"stock100free",	batch:"stock",header:[null,"100/FREE/EL"], sort:"int",width:45},
					{ id:"stock105xs",batch:"stock",header:[null,"105/XS/EEL"], sort:"int",width:45},

					{ id:"skcsaleqty",header:[{ content:"columnGroup", closed:true, batch:"sale",
							groupText:"尺码30天销售", colspan:10, width: 45},"款色60天"],sort:"int",width:80},
					{ id:"sale65s",batch:"sale",header:[null,"65/S"],sort:"int",width:45},
					{ id:"sale70m",batch:"sale",header:[null,"70/M"], sort:"int",width:45},
					{ id:"sale75l",batch:"sale",header:[null,"75/L"], sort:"int",width:45},
					{ id:"sale80xl",batch:"sale",header:[null,"80/XL"], sort:"int",width:45},
					{ id:"sale852xl",batch:"sale",header:[null,"85/2XL"], sort:"int",width:45},
					{ id:"sale903xl",batch:"sale",header:[null,"90/3XL"], sort:"int",width:45},
					{ id:"sale954xl",batch:"sale",header:[null,"95/4XL"], sort:"int",width:45},
					{ id:"sale100free",batch:"sale",header:[null,"100/FREE/EL"], sort:"int",width:45},
					{ id:"sale105xs",batch:"sale",header:[null,"105/XS/EEL"], sort:"int",width:45},
					
					{ id:"target65s",header:[{ content:"columnGroup", closed:false, batch:"target",
							groupText:"目标库存", colspan:9, width: 45},"65/S"],sort:"int",width:80},
					{ id:"target70m",batch:"target",header:[null,"70/M"], sort:"int",width:45},
					{ id:"target75l",batch:"target",header:[null,"75/L"], sort:"int",width:45},
					{ id:"target80xl",batch:"target",header:[null,"80/XL"], sort:"int",width:45},
					{ id:"target852xl",batch:"target",header:[null,"85/2XL"], sort:"int",width:45},
					{ id:"target903xl",batch:"target",header:[null,"90/3XL"], sort:"int",width:45},
					{ id:"target954xl",batch:"target",header:[null,"95/4XL"], sort:"int",width:45},
					{ id:"target100free",batch:"target",header:[null,"100/FREE/EL"], sort:"int",width:45},
					{ id:"target105xs",batch:"target",header:[null,"105/XS/EEL"], sort:"int",width:45},
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
//				pager:"storeinittarget_pagerA"
			}
		]

	};

	var layout = {
		type: "line",
		rows:[
			titleBar,
			{
				rows:[
					grid,
//					{
//						view: "toolbar",
//						css: "highlighted_header header6",
//						paddingX:2,
//						paddingY:2,
//						height:30,
//						cols:[{
//							view:"pager", id:"storeinittarget_pagerA",
//							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
//							autosize:true,
//							height: 30,
//							group:5
//						}]
//					}
				]
			}
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){

		}
	};

});