/**
	GRADLE - KNOWLEDGE IS POWER
	***** PROPRIETARY CODE *****
	@author : gradle (gradlecode@outlook.com)
	@update: 02/07/2019 12:39:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2012-2020
*/

class GradleImage {
	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
	save(base64Data){
		var imageData = base64Data.replace(/data:image\/png;base64,/,'');
		cordova.exec(
			function(msg){
				navigator.notification.alert(gradle.saveImageSuccess, function(buttonIndex){
					if(buttonIndex == 1) {
						navigator.app.exitApp();
						return true;
					}
					else {
						return false;
					}
				},gradle.dialogTitleSaveImg);
				console.log(msg);
			},
			function(err){
				navigator.notification.alert(gradle.saveImageFailed, function(buttonIndex){
					if(buttonIndex == 1) {
						navigator.app.exitApp();
						return true;
					}
					else {
						return false;
					}
				},gradle.dialogTitleSaveImg);
				console.log(err);
			},
			"Base64SaveImage","saveImageDataToLibrary",
			[imageData]
		);
	}
	
}




