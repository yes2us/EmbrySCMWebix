define([
	"data/prodobject",
	],
function(prodobject){
	 
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	    var regioncode = null;
	    
	    function updateSKC(rowData){
	    	   rowData.webix_operation="update";
	    	   webix.ajax().post(urlstr+"/WBCURDMng/saveSKC",rowData).then(function(response){
	    	   });
	    }
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:0,
			paddingY:0,
			height:_ToolBarHeight,
			cols:[
				{view:"select",name:"brandcode", width:200,align: "left", label: '品牌',	labelWidth:60,
					options:urlstr+"/WBProdMng/getBrandList"},
			    {view:"select", id:"yearcode",name:"yearcode",width:200,align:"left", label:'年份',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getYearList"},
			    	{view:"select", id:"seasoncode",name:"seasoncode",width:200,align:"left", label:'季节',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getSeasonList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	
				    	$$("dt_confskcinfo").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.yearcode != 'all') postData.YearName=values.yearcode;
				    	if(values.seasoncode != 'all') postData.SeasonName=values.seasoncode;
				    	
					$$("dt_confskcinfo").clearAll();
					$$("dt_confskcinfo").parse(prodobject.getProductList(postData));
				 }},

			    	 {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
				click:function(){
					var values =this.getParentView().getValues();
					var targeturl=urlstr+"/WBProdMng/getProductList/Excel/1";
					
					if(values.brandcode != 'all') targeturl += "/BrandName/"+values.brandcode;
					if(values.yearcode != 'all') targeturl += "/YearName/"+values.yearcode;
					if(values.seasoncode != 'all') targeturl += "/SeasonName/"+values.seasoncode;
					
					window.open(targeturl,"_blank");
			}},

		    ]
	};

	
	var grid_confskcinfo = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_confskcinfo",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				editable:true,
				resizeColumn:true,
				select:true,
				navigation:true,
				leftSplit:5,
//				save:urlstr+"/WBCURDMng/saveSKC",
				columns:[
					{ id:"_identify",header:"#", hidden:true},
					{ id:"isstopproduce",header:"停产", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"isstopreplenish",header:"停补", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"isstopanalyze",header:"停分析", sort:"int",width:70,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"rownum",header:"序号",sort:"int",width:60},
					{ id:"subtype1code",header:["货品级别",{content:"selectFilter"}], sort:"string",editor:"text",width:150,css:"bgcolor2"},
					{ id:"skccode",header:["款杯色",{content:"textFilter"}], sort:"string",width:130},
					{ id:"brandname",header:["品牌",{content:"selectFilter"}], sort:"string",width:75},
					{ id:"stylecode",header:["款式",{content:"textFilter"}], sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:70},
					{ id:"otherskucompname",header:"杯", sort:"string",width:40},
					{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
					{ id:"presentprice",header:"安中价格", sort:"int",width:70},
					{ id:"yearname",header:"年份", sort:"string",width:70},
					{ id:"seriesname",header:"系列", sort:"string",width:100},
					{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:70},
					{ id:"onshelfdate",header:"上货日期", width:90},

				],
				export: true,
				on: {
						onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
			}
		]

	};

        /**
       * 
       * 用户导入的SKC列表-toolbar
       */
		var toolbar_pasteskclist={ 
							view: "toolbar",
							id:"toolbar_pasteskclist",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{ view: "button", type: "iconButton", icon: "save", label: "修改", width: 70, 
								click:function(){
									
									$$("dt_pasteskclist").eachRow(function(rowId){

			    								var scrow = $$("dt_pasteskclist").getItem(rowId);
			    								if(scrow.skccode && scrow.skccode>"")
			    								{
												var tgrow = $$("dt_confskcinfo").find(function(obj){
													return obj.skccode==scrow.skccode.trim();},true);
												
												if(tgrow)
												{
													tgrow.isstopproduce=scrow.isstopproduce;
													tgrow.isstopreplenish=scrow.isstopreplenish;
													tgrow.isstopanalyze=scrow.isstopanalyze;
			    										$$("dt_confskcinfo").updateItem(tgrow);
			    										updateSKC(tgrow);
			    									}
			    								}

			    								});
			    							}
								},
								{},
								{ view: "button", type: "iconButton", icon: "plus", label: "增加", width: 70, 
								click:function(){
									var rownum =0;
									for(var i=rownum+1; i<=100+rownum;i++)
									$$("dt_pasteskclist").add({rownum:i});
								}},
								{ view: "button", type: "iconButton", icon: "times", label: "清空", width: 70, click:function(){$$("dt_pasteskclist").clearAll();}},
							]
			};
			
	  /**
       * 
       * 用户导入的SKC列表
       */
	var grid_pasteskclist = {
		view:"datatable",
		id:"dt_pasteskclist",
		width:340,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:300,autoheight:false,scroll:true},
		editable:true,
		select:true,
		header:true,
		select:"cell",
		blockselect:true,
		clipboard:"block",
		columns:[
			{ id:"rownum",header:"",sort:"int",width:40},
			{ id:"isstopproduce",header:"停产",sort:"int",width:60},
			{ id:"isstopreplenish",header:"停补",sort:"int",width:60},
			{ id:"isstopanalyze",header:"停分析",sort:"int",width:60},
			{ id:"skccode",header:"款杯色",sort:"string",width:150},
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};
	

	
	var layout = {
		type: "line",
		rows:[
			titleBar,
			{
				cols:[
					grid_confskcinfo,
					{
						view:"accordion",multi:true,borderless:true,
						cols:[{ collapsed:true,header:"批量设置", body:{rows:[toolbar_pasteskclist,grid_pasteskclist]}}]
					}
					]
			}
		]
	};
	

	return {
		$ui: layout,
		$oninit:function(){
			if(!checkWriteAuth())
			{
				$$("dt_confskcinfo").define("editable",false);
			}
			
			$$("dt_confskcinfo").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
				console.log(editor);
			    if(state.value != state.old){
			    		var editrow = $$("dt_confskcinfo").getItem(editor.row);
//			        console.log(editrow);	        
			        updateSKC(editrow);
			    }  
			});
			
			$$("dt_confskcinfo").attachEvent("onCheck", function(row, column, state){
			       var checkrow = $$("dt_confskcinfo").getItem(row);
//			        console.log(checkrow);
			        updateSKC(checkrow);
			});

		}
	};

});