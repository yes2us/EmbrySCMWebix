define([
	"views/modules/qry_inittarget/initTargetView",
	"views/modules/qry_inittarget/initTargetStatisticsView"
], function(
	initTargetView,
	initTargetStatisticsView){

checkauthorization(false);


var layout = {
	type: "line",
	rows:[
		{view: "tabbar", multiview: true,optionWidth: 130,
			options:[
				{id: "initTargetView", value: "设置期初库存"},
				{id: "initTargetStatisticsView", value: "统计数据"},
			]
		},
		{
			cells:[
			    initTargetView,
				initTargetStatisticsView
			]
		}
	]
};


return {
	$ui:layout,
	$oninit:function(){
			
	}
};

});