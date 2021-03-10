/**
	GRADLE - KNOWLEDGE IS POWER
	***** PROPRIETARY CODE *****
	@author : gradle (gradlecode@outlook.com)
	@update: 02/07/2019 12:39:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2012-2020
*/

class GradleManager {
	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
	constructor(){
		this.adsType  	 		= 'Admob';
		this.debug    	 		= true;
		this.is_ready			= false;
		this.first_start 		= true;
		this.first_play  		= true;
		this.currentInterval   	= 0;
		this.previous_ev		= null;
		
		this.enableMoreGames  	= true;
		this.isMobile 	 		= ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
		this.api 				= new GradleApi();
		this.share				= new GradleShare();
		this.storage 			= new GradleStorage();
		this.imageOp 			= new GradleImage();
		
		this.properties();
	}

	log(val){
		if(!this.debug) return;
		if(typeof val === 'object' && typeof val.isTrusted!='undefined' && val.isTrusted==false) return;
		if(this.isMobile && (typeof val === 'object' && val !== null)){
			val = JSON.stringify(val);
		}
		this.print(val);
	}
	
	event(ev, msg){
		var self = this;
		if(this.previous_ev == ev){
			setTimeout(function(){
				self.previous_ev = null;
			}, 100);
			return !1;
		}
		
		this.log(ev);
		this.api.event(ev, msg);
		this.do_event(ev, msg);
		this.is_ready && this.firebase.logEvent(ev);
		this.previous_ev = ev;
		return !0;
	}
	







	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
	ready() {
		this.firebase 			= new GradleFirebase();
		
		if(this.adsType=='Facebook'){
			this.ads = new GradleFacebook();
		}
		else if(this.adsType=='Admob'){
			this.ads = new GradleAdmob();
		}
		GradleManager.prototype.showInter = this.ads.showInter;
		
		this.event('gradle ready ...');
		this.is_ready = true;
		
		document.addEventListener('pause', gradle, false);
		document.addEventListener('resume', gradle, false);
		document.addEventListener('backbutton', gradle, false);
		window.addEventListener('load', gradle, false);
		
		this.event('first_start');
		this.api.start();			
	}
	
	hideSplash(){
		if(gradle.isMobile && typeof cordova!='undefined'){
			cordova.exec(null, null, "SplashScreen", "hide", []);
		}
		this.first_start=false;
	}
	
	quitDialog(){
		//console.log('>>>>> backbutton event click');
		if(!this.notifiBackbutton){ return true; }
		
		if(this.api.processBackbutton()==null){
			navigator.notification.confirm(this.notifiMessage, function(buttonIndex){
				if(buttonIndex == 1) {
					//navigator.app.exitApp();
					cordova.plugins.exit();
					return true;
				}
				else {
					return false;
				}
			});
		}
	}
	
	handleEvent(ev) {
		// handle events here :
		switch (ev.type) {
			case 'deviceready':
				this.ready();
				break;
			case 'pause':
				this.api.onVisibilityNo();
				break;
			case 'resume':
				this.api.onVisibilityYes();
				break;
			case 'backbutton':
				this.quitDialog();
				break;
			case 'load':
				
				break;
			
			default:
				this.log("gradle unhandled event type : "+ ev.type);
		}
	}
	
	
	run(){
		this.isMobile ? document.addEventListener('deviceready', gradle, false) :  gradle.ready(); 
		setTimeout(function(){
			if(!gradle.is_ready){
				gradle.event('emulator_mode');
				gradle.ready();
			}
		}, 15000);
	}

	trackStats(a, b){ this.event(a, b); } trackScreen(a,b){ this.event(a,b);  } trackEvent(a,b){  this.event(a,b);  }  showAd(){ this.event('showAd'); }

	__(t){ return null;/*t;*/ }

	checkInterval(){ return (++this.currentInterval==gradle.intervalAds) ? !(this.currentInterval=0) : !1; }
	
}




