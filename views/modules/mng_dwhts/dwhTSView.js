define(function(){

	var gridTree = {
		view:"datatable",
		id:"dt_dwhts",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		navigation:true,
		leftSplit:3,
		save:urlstr+"/WBCURDMng/saveStock",
		columns:[
			{ id:"rownum",header:"",sort:"int",width:50},
			{ id:"_identify",header:"#",width:35,hidden:true},

			{ id:"skucode",	header:"SKU", sort:"string",width:150,css:"bgcolor2"},
			
			{ id:"skccode",	header:"款色", sort:"string",width:100},
			{ id:"colorname",	header:"颜色", sort:"string",width:100},
			{ id:"sizename",	header:"尺码", sort:"string",width:60},
			{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"seriesname",header:"系列", sort:"string",width:100},
			{ id:"maintypename",	header:"大类", sort:"string",width:100},
			
			{ id:"targetqty",	header:"目标库存",sort:"int", width:100,editor:"text",css:"bgcolor1"},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:100},
			{ id:"sugrepqty",	header:["理论补退",{content:"numberFilter"}],sort:"int",align:"right", width:100}
		],
		select: true,
		on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}
		}
	};

	var layout = {
		type: "clean",
		id: "dwhTSView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
