/**
	GRADLE - KNOWLEDGE IS POWER
	***** PROPRIETARY CODE *****
	@author : gradle (gradlecode@outlook.com)
	@update: 02/07/2019 12:39:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2012-2020
*/

class GradleStorage {
	
	constructor(){
		this.prefix = "gd.4024.";
	}
	
	buildKey(key){
		return prefix + key;
	}

	getItem(key, default_value){
		var value;
		try {
			value = localStorage.getItem(gradle.buildKey(key));
		}
		catch(error){
			return default_value;
		}
		if(value !== undefined && value !=null){
			value = window.atob(value);
		}
		else{
			value = default_value;
		}
		return value;
	}

	setItem(key, value){
		var v = value;
		if(v !== undefined){
			v = window.btoa(v);
		}
		try{
			localStorage.setItem(gradle.buildKey(key), v);
			return value;
		}
		catch(error){
			return undefined;
		}
	}

	
}




