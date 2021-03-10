package org.apache.exit;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.os.Build;
import android.util.Log;

public class Exit extends CordovaPlugin {
    protected void pluginInitialize() {}

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        /*
         * Finishes the activity provided by CordovaInterface.
         */

        if (action.equals("exit")) {
            try {
                Activity activity = this.cordova.getActivity();

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    activity.finishAndRemoveTask();
                }
                else {
                    activity.finish();
                }
                Log.d("gradle","--------- Exit app ---------");
                //Process.killProcess(Process.myPid());
                //System.exit(1);
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
            } catch (Exception e) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, 1));
            }
            return true;
        }
        return false;
    }
}
