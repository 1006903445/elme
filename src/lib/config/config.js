export default {
	install(Vue,options){
		Vue.prototype.ERR_OK = 0; //正确状态吗

		Vue.filter('formatDate', (val, fmt)=>{  //时间格式化
			let date = new Date(val);
			let o = {
				'y+': date.getFullYear(),
				'M+': date.getMonth() + 1,
				'd+': date.getDate(),
				'h+': date.getHours(),
				'm+': date.getMinutes(),
				's+': date.getSeconds()
			}
			for(let k in o){
				if(new RegExp(`(${k})`).test(fmt)){
					let str = o[k] + '';
					str = str.length > 1 ? str : 0 + str;
					fmt = fmt.replace(RegExp.$1, str);
				}
			}
			return fmt;
		});

		// 解析url 
		Vue.prototype.urlParse = function(){
			let url = location.href;
			let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			let urlPara = {};
			for (let i = 0; i < paraString.length; i++) {
				let j = paraString[i];
				urlPara[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
			};
			return urlPara;
		}
		
		// localStorage
		Vue.prototype.localStorageSet = function(id, key, val){
			let OBJ = window.localStorage.__elme__;
			if(!OBJ){
				OBJ = {};
				OBJ[id] = {};
			}else{
				OBJ = JSON.parse(OBJ);
				if(!OBJ[id]){
					OBJ[id] = {};
				}
			}
			OBJ[id][key] = val;
			localStorage.__elme__ = JSON.stringify(OBJ); 
		}
		Vue.prototype.localStorageGet = function(id, key, def){
			let OBJ = window.localStorage.__elme__;
			if(!OBJ){
				return def;
			}else{
				OBJ = JSON.parse(OBJ)[id];
				if(!OBJ){
					return def;
				}
			}
			return OBJ[key] || def;
		}
	}
}