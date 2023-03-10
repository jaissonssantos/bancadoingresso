package com.app;

import com.app.pagseguro.PaymentModule;
import com.app.pagseguro.AuthenticationModule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReactNativePackages implements ReactPackage {
  private ReactNativeHost mReactNativeHost;

  public ReactNativePackages(ReactNativeHost reactNativeHost) {
    super();
    if (BuildConfig.DEBUG) {
      mReactNativeHost = reactNativeHost;
    }
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new AuthenticationModule(reactContext));
    modules.add(new PaymentModule(reactContext));

    if (BuildConfig.DEBUG) {
      // modules.add(new DevMenuManager(reactContext, mReactNativeHost));
    }

    return modules;
  }

}
