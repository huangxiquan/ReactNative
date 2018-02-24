//
//  RNMainController.swift
//  Weekly
//
//  Created by Neo on 2017/8/18.
//  Copyright © 2017年 CBN. All rights reserved.
//

class RNMainController: BaseController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let rnView = RNView(frame: view.bounds)
        view = rnView
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
