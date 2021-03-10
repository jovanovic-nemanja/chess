/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.company.gamename;

import android.os.Bundle;

import org.apache.cordova.CordovaActivity;

import android.util.Log;
import com.google.ads.consent.*;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends CordovaActivity
{

    // TODO: define the theme of dialog confirmation :
    //================================================
    public final static int dialog_theme = android.R.style.Theme_Material_Dialog_Alert;
    public final static int dialog_input_text_color = android.R.color.white;



    //==============================================================================================
    ConsentForm form;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);


        // enable the app to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }loadUrl(launchUrl);


        // Here is GDPR  :
        //================
        ConsentInformation consentInformation = ConsentInformation.getInstance(MainActivity.this);

        // TODO: make your publisher id here :
        //====================================
        String[] publisherIds = {"pub-9777034540867573"};

        consentInformation.requestConsentInfoUpdate(publisherIds, new ConsentInfoUpdateListener() {
            @Override
            public void onConsentInfoUpdated(ConsentStatus consentStatus) {
                // User's consent status successfully updated.
                Log.d(TAG,"onConsentInfoUpdated");
                switch (consentStatus){
                    case PERSONALIZED:
                        Log.d(TAG,"PERSONALIZED");
                        ConsentInformation.getInstance(MainActivity.this)
                                .setConsentStatus(ConsentStatus.PERSONALIZED);
                        break;

                    case NON_PERSONALIZED:
                        Log.d(TAG,"NON_PERSONALIZED");
                        ConsentInformation.getInstance(MainActivity.this)
                                .setConsentStatus(ConsentStatus.PERSONALIZED);
                        break;

                    case UNKNOWN:
                        Log.d(TAG,"UNKNOWN");
                        if(ConsentInformation.getInstance(MainActivity.this).isRequestLocationInEeaOrUnknown()){


                            URL privacyUrl = null;
                            try {
                                // TODO: Replace with your app's privacy policy URL :
                                //       if you don't have a website use our link, no problem.
                                //============================================================
                                privacyUrl = new URL("https://sites.google.com/view/gradlegames/privacy");
                            } catch (MalformedURLException e) {
                                e.printStackTrace();
                                // Handle error.
                            }
                            form = new ConsentForm.Builder(MainActivity.this, privacyUrl)
                                    .withListener(new ConsentFormListener() {
                                        @Override
                                        public void onConsentFormLoaded() {
                                            // Consent form loaded successfully.
                                            Log.d(TAG,"onConsentFormLoaded");
                                            showform();
                                        }

                                        @Override
                                        public void onConsentFormOpened() {
                                            // Consent form was displayed.
                                            Log.d(TAG,"onConsentFormOpened");
                                        }

                                        @Override
                                        public void onConsentFormClosed(
                                                ConsentStatus consentStatus, Boolean userPrefersAdFree) {
                                            // Consent form was closed.
                                            Log.d(TAG,"onConsentFormClosed");
                                        }

                                        @Override
                                        public void onConsentFormError(String errorDescription) {
                                            // Consent form error.
                                            Log.d(TAG,"onConsentFormError");
                                            Log.d(TAG,errorDescription);
                                        }
                                    })
                                    .withPersonalizedAdsOption()
                                    .withNonPersonalizedAdsOption()
                                    .build();

                            form.load();

                        }else{
                            Log.d(TAG,"PERSONALIZED else");
                            ConsentInformation.getInstance(MainActivity.this)
                                    .setConsentStatus(ConsentStatus.PERSONALIZED);
                        }


                        break;

                    default:
                        break;
                }
            }

            @Override
            public void onFailedToUpdateConsentInfo(String errorDescription) {
                // User's consent status failed to update.
                Log.d(TAG,"onFailedToUpdateConsentInfo");
                Log.d(TAG,errorDescription);
            }
        });




    }

    private void showform(){
        if (form!=null){
            Log.d(TAG,"show ok");
            form.show();
        }

    }

    // TODO: is for children's ? (gradle beta version)
    //================================================
    public final static int game_for_children = 1;
    //  1: directed for children's under 13,
    //  0: for +13 (COPPA)
    // read more on this link :
    // https://www.ftc.gov/tips-advice/business-center/privacy-and-security/children%27s-privacy


}

