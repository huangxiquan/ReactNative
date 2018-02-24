//
//  User.swift
//  WeeklyiPad
//
//  Created by Neo on 2017/9/8.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import UIKit

class User: NSObject{
  
  static let mine = User()
  var token = ""
  var id = ""
  class func setId(string : String){
    User.mine.id = string
  }
  
  class func setToken(string : String){
    User.mine.token = string
  }
  
  class func userId()-> String{
    return User.mine.id
  }
  
  class func userToken()-> String{
    return User.mine.token
  }
  
  class func logout() {
    User.mine.token = ""
    User.mine.id = ""
  }
    
  class func hasLogin() -> Bool{
    return User.mine.token.length > 0 && User.mine.id.length > 0
  }
  
}
