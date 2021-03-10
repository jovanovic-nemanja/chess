/**
GRADLE - KNOWLEDGE IS POWER
***** PROPRIETARY CODE *****
@author : gradle (gradlecode@outlook.com)
@update: 02/07/2019 12:39:00
@version_name: gradle-logic
@version_code: v6.0.0
copyright @2012-2020
*/
class GradleFirebase{
	constructor(){
		if(typeof cordova=='undefined') return;
		if(typeof cordova.plugins=='undefined') return;
		if(typeof cordova.plugins.firebase=='undefined') return;
		
		//Called when a push message received while app is in foreground :
		cordova.plugins.firebase.messaging.onMessage(function(payload) {
			gradle.log("New foreground FCM message: " + payload);
		});
		
		//Called when a push message received while app is in background :
		cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
			gradle.log("New background FCM message: " + payload);
		});
		
		//Grant permission to recieve push notifications :
		cordova.plugins.firebase.messaging.requestPermission().then(function() {
			gradle.log("Push messaging is allowed");
		});
		
		//Retrieves the app instance id from the service :
		cordova.plugins.firebase.messaging.getInstanceId().then(function(instanceId) {
			gradle.log("Got instanceId: "+ instanceId);
		});
		
		//Returns a promise that fulfills with the current FCM token :
		cordova.plugins.firebase.messaging.getToken().then(function(token) {
			gradle.log("Got device token: "+ token);
		});
	}
	
	logEvent(ev){
		if(gradle.isMobile && typeof cordova!='undefined'){
			cordova.plugins.firebase.analytics.logEvent("event", {param1: ev});
		}
	}
}






