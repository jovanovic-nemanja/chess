/**
	GRADLE - KNOWLEDGE IS POWER
	***** PROPRIETARY CODE *****
	@author : gradle (gradlecode@outlook.com)
	@update: 02/07/2019 12:39:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2012-2020
*/
var snd_track = null;
class GradleApi {
	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================

	start(){
		//ok
		snd_track = new Audio('./snd/soundtrack.mp3'); 
		if (typeof snd_track.loop == 'boolean'){
			snd_track.loop = true;
		}
		else{
			snd_track.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
		}
		snd_track.play();
		setTimeout(function(){gradle.hideSplash()}, 2000);
	}
	
	processBackbutton(){ //return null;
		var key=null;
		
		return key;
	}
	
	event(ev, msg){
		if(gradle.first_start && ev=='splash'){setTimeout(function(){gradle.hideSplash()}, 1000);return !1;}
		if(ev=='sta'+'rter'){
			ApplicationMain.main();
			lime.embed ("openfl-content", 0, 0, null);
		}
		if(ev=='EVENT_VOLUMECHANGE0'){
			snd_track.pause();
		}
		if(ev=='EVENT_VOLUMECHANGE1'){
			snd_track.play();
		}
		
		/*switch(ev){
			case 'main_menu':
				//document.body.style.backgroundImage = "url('images/bg_menu.jpg')";
				break;
			case 'list_picture':
				//document.body.style.backgroundImage = "url('images/bg_select.jpg')";
				break;
			case 'draw_image':
				//document.body.style.backgroundImage = "url('images/bg_game.jpg')";
				break;
		}*/
	}
	
	onVisibilityNo(){
		gradle.log('visibility no');
		//gradle_onPauseRequested();
		gradle.event('EVENT_VOLUMECHANGE0');
	}
	
	onVisibilityYes(){
		gradle.log('visibility yes');
		//gradle_onResumeRequested();
		gradle.event('EVENT_VOLUMECHANGE1');
	}	
}




