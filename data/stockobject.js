define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var stockObject = new Object();
	
	stockObject.synTarget2Stock = function(_TargetSource)
	{
		return webix.ajax().post(urlstr+"/WBStockMng/synTarget2Stock",{TargetSource:_TargetSource});
	}
	
	stockObject.getInitTarget = function(postData)
	{
		return webix.ajax().post(urlstr+"/WBStockMng/getInitTarget",postData);
	}

	stockObject.getInitTargetStatistics = function(postData)
	{
		return webix.ajax().post(urlstr+"/WBStockMng/getInitTargetStatistics",postData);
	}
	
	stockObject.getFGWHTSInfo = function(WHCode){
		return webix.ajax().post(urlstr+"/WBStockMng/getFGWHTSInfo",{WHCode:WHCode});
	}
	
	stockObject.getFGWHCrossTSInfo = function(postData){
		return webix.ajax().post(urlstr+"/WBStockMng/getFGWHCrossTSInfo",postData);
	}
	
	stockObject.getRetTargetWHSubWHTSInfo = function(postData){
		return webix.ajax().post(urlstr+"/WBStockMng/getRetTargetWHSubWHTSInfo",postData);
	}
	
     
    stockObject.getPartyIndex = function(postData){
    	   return webix.ajax().post(urlstr+"/WBStockMng/getPartyIndex",postData);
    }
         
     stockObject.getWHSKCInfo = function(postData){
       return webix.ajax().post(urlstr+"/WBStockMng/getWHSKCInfo",postData);
     }
  
      stockObject.getWHSKCInfoNewSKC = function(postData){
       return webix.ajax().post(urlstr+"/WBStockMng/getWHSKCInfoNewSKC",postData);
     }
       
      stockObject.getProdHSStock = function(WHCode,SKUCode){
      	var postData={WHCode:WHCode,SKUCode:SKUCode};
     	return webix.ajax().post(urlstr+"/WBStockMng/getProdHSStock",postData);
     }
	return stockObject;
});