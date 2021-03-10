/**
	GRADLE - KNOWLEDGE IS POWER
	***** PROPRIETARY CODE *****
	@author : gradle (gradlecode@outlook.com)
	@update: 02/07/2019 12:39:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2012-2020
*/

class GradleShare {
	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
	constructor(){
		this.enableMoreGames  	= true;
		this.type 				= this.default_type = 'more_games'; 
	}
	
	apply(type){
		if (gradle.developer_link=="") return;
		if(type==null) type = this.default_type;
		
		this.type = type;
		
		switch(this.type){
			case 'more_games':
				window.open(gradle.developer_link);
				break;
			case 'rate':
				window.open('https://play.google.com/store/apps/details?id='+gradle.package_name);
				break;
			case 'facebook':
				window.open('http://m.facebook.com/sharer.php?s=100&u='+gradle.developer_link);
				break;
			case 'email':
				
				break;
			case 'whatsapp':
				//add on config.xml :
				//<allow-intent href="whatsapp:*" />
				//<access origin="whatsapp:*" launch-external="yes" />
				window.open("'whatsapp://send?text=hello world\n"+gradle.developer_link+"'", "_system");
				break;
			
		}
		
	}
}




