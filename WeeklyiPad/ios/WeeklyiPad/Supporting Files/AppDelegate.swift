//
//  AppDelegate.swift
//  Weekly
//
//  Created by Neo on 2017/8/15.
//  Copyright © 2017年 CBN. All rights reserved.
//

import UIKit

class AppDelegate: UIResponder,UIApplicationDelegate {
  
  var window: UIWindow?
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)
    window!.makeKeyAndVisible()
    window!.backgroundColor = UIColor.white
    
    window!.rootViewController = RNMainController()
    Context.setAppBase()
    YTKNetworkConfig.shared().baseUrl = BaseURL.apiPath()
    DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
      let manager = JSEventManager()
      manager.subscribeResult(true)
    }
    
    return true
  }
  
}
