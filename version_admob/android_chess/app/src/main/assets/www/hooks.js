class GradleHooks extends GradleManager{ print(val){ console.log(val); }
/**
GRADLE - KNOWLEDGE IS POWER
***** PROPRIETARY CODE *****
@author : gradle (gradlecode@outlook.com)
@update: 04/08/2019 01:42:00
@version_name: gradle-logic
@version_code: v6.4.0
copyright @2012-2020
*/
	properties(){
		//Ads information
		//===============
		this.banner             = 'ca-app-pub-3940256099942544/6300978111';      //id placement banner
		this.interstitial       = 'ca-app-pub-3940256099942544/1033173712';      //id placement interstitial
		
		this.isTesting          = true; 		//Ads mode testing. set to false for a production mode.
		this.enableBanner       = true; 		//Ads enable the banner. set to false to disable the banner.
		this.enableInterstitial = true; 		//Ads enable the interstitial. set to false to disable all interstitials.
		
		this.bannerAtBottom     = true; 		//if false the banner will be at top
		this.overlap            = false;
		
		this.notifiBackbutton   = true; 		//for confirmation backbutton
		this.notifiMessage      = 'Do you want to exit the game ?';
		
		this.intervalAds        = 1;     		//Ads each interval for example each n times	
		
		
		//Game settings :
		//===============
		this.fullsize           = true;

		// more games :
		//=============
							//change the value with your id developer :
		this.developer_link    = 'https://play.google.com/store/apps/developer?id=Childrens+Games';
		

		//About the game :
		//================
		this.company        = 'gradle';          //developer name
		this.version        = '1.0.0';           //game version
		this.game_name      = 'kasparov chess';  //game name
		
		//Design : positions of buttons
		//=============================
		this.position ={
			home :{
				one_player  : {x: -100, y: 0,   enabled: true},  	//button one player
				two_players : {x:  100, y: 0,   enabled: true},  	//button two player
				resume      : {x: -100, y: 150, enabled: true},  	//button resume
				sound       : {x:  100, y: 150, enabled: true},  	//button options
			},
			options:{

			}
		};
		

	}

	//Events manager :
	//================
    do_event(ev, msg){switch(ev){
		
		case 'first_start':
			//gradle.showInter();
			break;
		case 'SCREEN_LEVELSELECT': //Button select one or two players
			//gradle.showInter();
			break;
		case 'SCREEN_LEVEL': //Button play
			gradle.checkInterval() && gradle.showInter();
			break;
		case 'SCREEN_LEVELRESULT': //page win
			//gradle.checkInterval() && gradle.showInter(); // <-- we check the interval if ok we show interstitial
			break;
		case 'SCREEN_HOME':
			//gradle.showInter();
			break;
		case 'SCREEN_PAUSE': // <-- page pause
			//gradle.showInter();
			break;
		case "SCREEN_SAVELOAD":   //show screen saved games
			//gradle.checkInterval() && gradle.showInter();
			break;
		case 'EVENT_VOLUMECHANGE': // <-- sound button
			//gradle.showInter();
			break;		
		case 'more_games':
			gradle.share.apply();
			break;
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;				
    }}

}

gradle = new GradleHooks();
gradle.run();


