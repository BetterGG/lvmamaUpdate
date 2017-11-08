//fix Array.forEach for IE 7 and 8
Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;if(null===this)throw new TypeError(" this is null or not defined");var e=Object(this),f=e.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(arguments.length>1&&(c=b),d=0;d<f;){var g;d in e&&(g=e[d],a.call(c,g,d,e)),d++}});
//get URL parameters
function cmGetParameterByName(name, url) {if (!url) {url = window.location.href;};name = name.replace(/[\[\]]/g, "\\$&");var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),results = regex.exec(url);if (!results){return null;};if (!results[2]){return '';};return decodeURIComponent(results[2].replace(/\+/g, " "));};
//get cookie by var name
function cmGetMmcCookie(cname) {var name = cname + "=";var decodedCookie = decodeURIComponent(document.cookie);var ca = decodedCookie.split(';');for(var i = 0; i <ca.length; i++) {var c = ca[i];while (c.charAt(0) == ' ') {c = c.substring(1);};if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}};return "";};
//disable to lead head.js
CM_DDX.headScripts = false;
//disable dispatch.js, json-min.js, yahoo.js, etc....
CM_DDX.dispatcherLoadRequested = true;
//force eluminate.js to use https
cmSetupOther({"cm_SecureLoad":true});
//auto append 'SEM' subsite alias if traffic comes from SEM
window["cmAutoDetectSEM"] = true;
//store Multisite aliases
window["cmMultiSiteAlias"] = window["cmMultiSiteAlias"] || [];
function cmCheckMMC(){
	var mmcVal = cmGetParameterByName('cm_mmc');
	if(mmcVal){
		//mark this session is from SEM.
		document.cookie = "lvmama_cm_mmc=1";
	}
};cmCheckMMC();
function cmGetMultiSiteCID(cid){
	if(cmMultiSiteAlias && cmMultiSiteAlias.length){
		var msCID = '';
		if(cmAutoDetectSEM && cmGetMmcCookie('lvmama_cm_mmc')){
			cmMultiSiteAlias.push('SEM');
		}
		cmMultiSiteAlias.forEach(function(msAlias) {
			if(msCID){
				msCID = msCID + ';' + cid + '|' + msAlias;
			}else{
				msCID = cid + '|' + msAlias;
			}
		});
		if(msCID) 
			return msCID;
	}
	return cid;
};
function getCmCookieDomain(){
	if(cm_JSFPCookieDomain){
		return cm_JSFPCookieDomain;
	}
	
	return 'lvmama.com';
};
//START//add hook for cmSetClientID
var cmFuncName = 'cmSetClientID';
if(typeof window[cmFuncName] == 'function'){
	var cmFuncNameOld = cmFuncName + '_old';
	//save original cm function with different function name.
	window[cmFuncNameOld] = window[cmFuncName];
	//rewrite cm function
	window[cmFuncName] = function(){
		//if it's trying to set CDC CID, skip it.
		if(arguments[0] == '60409730' || arguments[0] == '90409730') return '';
		//not sending data to CDC, then call original 'cmSetClientID' function
		window[cmFuncNameOld].apply(window, arguments);
	};
}
//END//add hook
////////////////////////////////////
(function() {
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function loadFunction(list) {
        var list = isArray(list) ? list : [];
        for (var i = 0; i < list.length; i++) {
            window[list[i]] = window[list[i]] || function() {};
        }
    }
    loadFunction(['cmSetClientID', 'cmCreatePageviewTag',
        'cmCreateProductviewTag', 'cmCreateShopAction5Tag', 'cmCreateShopAction9Tag',
        'cmCreateOrderTag', 'cmCreateRegistrationTag',
        'cmCreateElementTag', 'cmCreateConversionEventTag'
    ]);
    window["_LVMAMA_COREMETRICS"] = window["_LVMAMA_COREMETRICS"] || {};
    _LVMAMA_COREMETRICS.CURRENT_ENV = _LVMAMA_COREMETRICS.CURRENT_ENV || 'PRODUCTION';
    _LVMAMA_COREMETRICS.ENV = {
        DEVELOPMENT: ['82710000', false, 'testdata.de.coremetrics.com'],
        PRODUCTION: ['52710000', true, 'data.de.coremetrics.com']
    };
    window["cmSetSiteIDs"] = function(aliases){
    	window["cmMultiSiteAlias"] = aliases;
    	var config = _LVMAMA_COREMETRICS.ENV[_LVMAMA_COREMETRICS.CURRENT_ENV];
    	cmSetClientID(
			cmGetMultiSiteCID(config[0]),
    		config[1],
    		config[2],
    		getCmCookieDomain()
    	);
    };
    _LVMAMA_COREMETRICS.init = function(domain) {};
})();
//Set 'PC' subsite ID by default.
cmSetSiteIDs(['PC']);