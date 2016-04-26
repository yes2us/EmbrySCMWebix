define(function(){

	var gridTree = {
		view:"datatable",
		id:"dt_dwhMovPlan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:4,
		select: true,
		navigation:true,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"makedate",header:["日期",{content:"selectFilter"}],width:100},
			{ id:"srcpartycode",	header:"调出门店编号", sort:"string",hidden:true,fillspace:1},
			{ id:"srcpartyname",header:["调出门店",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"trgpartycode",	header:"调入门店编号", sort:"string",hidden:true,fillspace:1},
			{ id:"trgpartyname",header:["调入门店",{content:"selectFilter"}], sort:"string",width:120},
			
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:120},

			{ id:"lifestage",	header:["新旧",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"dealstate",header:["状态",{content:"selectFilter"}], sort:"string",width:80},
			{ id:"movqty",header:["调拨数量",{content:"numberFilter"}],sort:"int",width:90}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "dwhMovPlanView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
