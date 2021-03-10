/**
GRADLE - KNOWLEDGE IS POWER
***** PROPRIETARY CODE *****
@author : gradle (gradlecode@outlook.com)
@update: 02/07/2019 12:39:00
@version_name: gradle-logic
@version_code: v6.0.0
copyright @2012-2020
*/
class GradleAdmob{
	constructor(){
		this.configAdmob();
		this.prepare();
	}
	
	configAdmob(){
		if(typeof admob !='undefined'){
            if(gradle.isTesting){
                admob.banner.config({
                    id: gradle.banner,
                    isTesting: true,
                    autoShow: true,
                    overlap: gradle.overlap,
                    offsetTopBar: false,
                    bannerAtTop: !gradle.bannerAtBottom,
                    size : 'SMART_BANNER'
                });

                admob.interstitial.config({
                    id: gradle.interstitial,
                    isTesting: true,
                    autoShow: false
                });
				/*
				admob.rewardvideo.config({
                    id: gradle.rewardvideo,
                    isTesting: true
                });
				*/
            }
            else{
                admob.banner.config({
                    id: gradle.banner,
                    autoShow: true,
                    overlap: gradle.overlap,
                    offsetTopBar: false,
                    bannerAtTop: !gradle.bannerAtBottom,
                    size : 'SMART_BANNER'
                });

                admob.interstitial.config({
                    id: gradle.interstitial,
                    autoShow: false,
                });
				/*
				admob.rewardvideo.config({
                    id: gradle.rewardvideo
                });
				*/
            }
        }
        
	}


	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
	prepare() {
        gradle.event('gradle admob ready ...');
		
		if(gradle.enableBanner && typeof admob!=='undefined'){
            admob.banner.prepare();
        }
		
        if(gradle.enableInterstitial && typeof admob!=='undefined'){
			admob.interstitial.prepare();
		}
		
        document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
           gradle.log(event);
		   //setTimeout(function(){admob.banner.prepare();}, 3*60*1000);
        });

        document.addEventListener('admob.banner.events.LOAD', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
           gradle.log(event);
		   //setTimeout(function(){admob.interstitial.prepare();}, 3*60*1000);
        });

        document.addEventListener('admob.interstitial.events.LOAD', function(event) {
           gradle.log(event);
        });

        
		document.addEventListener('admob.interstitial.events.OPEN', function(event) {	
            gradle.log(event);
			admob.banner.hide();
        });
		
		document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
           gradle.log(event);
		   admob.banner.show();
           admob.interstitial.prepare();
        });
		/*
		document.addEventListener('admob.rewardvideo.events.CLOSE', function(event) {
           gradle.log(event);
           gradle.prepareVideo();
        });
		
		document.addEventListener('admob.rewardvideo.events.REWARD', function(event) {
           gradle.log(event);
		   gradle.videoCallback.success();
        });
		*/

		/*
		All Events :
		============
		admob.banner.events.LOAD
		admob.banner.events.LOAD_FAIL
		admob.banner.events.OPEN
		admob.banner.events.CLOSE
		admob.banner.events.EXIT_APP
		
		admob.banner.prepare()
		admob.banner.show()
		admob.banner.hide()
		admob.banner.remove()
		
		admob.interstitial.events.LOAD
		admob.interstitial.events.LOAD_FAIL
		admob.interstitial.events.OPEN
		admob.interstitial.events.CLOSE
		admob.interstitial.events.EXIT_APP
		
		admob.interstitial.prepare()
		admob.interstitial.show()
		
		admob.rewardvideo.events.LOAD
		admob.rewardvideo.events.LOAD_FAIL
		admob.rewardvideo.events.OPEN
		admob.rewardvideo.events.CLOSE
		admob.rewardvideo.events.EXIT_APP
		admob.rewardvideo.events.START
		admob.rewardvideo.events.REWARD
		
		admob.rewardvideo.prepare()
		admob.rewardvideo.show()
		*/
    }

    showInter(){
		//console.log('show inter admob');
		if(!gradle.enableInterstitial) return;
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
        admob.interstitial.show();
    }

	/*
	enableVideo = false, //Ads enable the reward video.
	prepareVideoAdmob(){
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
        admob.rewardvideo.prepare();
    }

	videoCallback = { success: null, canceled: null}
    showVideo(success, canceled){
		gradle.videoCallback.success  = success;
		gradle.videoCallback.canceled = canceled;
		if(!gradle.enableVideo) return;
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
		admob.rewardvideo.show();
    }
	*/
}






