//
//  RNView.swift
//  Weekly
//
//  Created by Neo on 2017/8/18.
//  Copyright © 2017年 CBN. All rights reserved.
//

import UIKit

class RNView: UIView {

    override init(frame: CGRect) {
        super.init(frame: frame)
        
        RCTBundleURLProvider.sharedSettings().setDefaults()
        let jsLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index.ios", fallbackResource: nil)
      print(jsLocation?.absoluteString);
        let rootView = RCTRootView.init(bundleURL: jsLocation, moduleName: "WeeklyiPad", initialProperties: nil, launchOptions: nil)
        addSubview(rootView!)
        rootView?.frame = bounds
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    

}
