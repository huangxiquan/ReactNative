//
//  BaseController.swift
//  CBNWeekly
//
//  Created by 林俊 on 2016/10/7.
//  Copyright © 2016年 CBN. All rights reserved.
//

protocol BaseControllerProtocol {
    
}

extension BaseControllerProtocol where Self : UIViewController{
    func removeExtend(){
        edgesForExtendedLayout = []
        extendedLayoutIncludesOpaqueBars = false
        setNeedsStatusBarAppearanceUpdate()
    }
    
    var _prefersStatusBarHidden: Bool{
        return false
    }
    
    var _preferredStatusBarStyle: UIStatusBarStyle{
        return .default
    }
}

class BaseController: UIViewController,BaseControllerProtocol {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        removeExtend()
    }
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        return _preferredStatusBarStyle
    }
    
    
    override var prefersStatusBarHidden : Bool{
        return _prefersStatusBarHidden
    }
}
