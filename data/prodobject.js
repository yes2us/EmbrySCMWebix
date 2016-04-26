define([], function() {

	var prodObject = new Object();
	
	prodObject.getSugSKUProdPlan = function(postData){
		return webix.ajax().post(urlstr+"/WBProdMng/getSugSKUProdPlan",postData);
	}

	prodObject.getSugSKCProdPlan = function(postData){
		return webix.ajax().post(urlstr+"/WBProdMng/getSugSKCProdPlan",postData);
	}
	
	prodObject.getProductList = function(postData){
		return webix.ajax().post(urlstr+"/WBProdMng/getProductList",postData);
	}

	
	prodObject.getProdSale = function(PartyCode,SKUCode) {
		var postData={PartyCode:PartyCode,SKUCode:SKUCode};
		return webix.ajax().post(urlstr+"/WBProdMng/getProdSale",postData);
	}

	prodObject.getSKCIndex = function(postData){
		return webix.ajax().post(urlstr+"/WBProdMng/getSKCIndex",postData);
	}

     prodObject.getSKCIndexItem = function(postData){
     	return webix.ajax().post(urlstr+"/WBProdMng/getSKCIndexItem",postData);
     }
	return prodObject;
});