//
//  Request.swift
//  WeeklyiPad
//
//  Created by Neo on 2017/9/8.
//  Copyright © 2017年 Facebook. All rights reserved.
//

typealias CommonSimpleClosure = () -> ()
typealias CommonModelClosure = (AnyObject) -> ()
typealias CommonBoolClosure = (Bool) -> ()
typealias CommonStringClosure = (String) -> ()
typealias CommonFloatClosure = (CGFloat) -> ()
typealias CommonArrayClosure = ([Any]) -> ()
typealias CommonAnyClosure = (Any) -> ()
typealias CommonDictionaryClosure = ([String : Any]) -> ()


//MARK: - 获取用户信息
class UserInfoRequest : YTKRequest {
  var finishAction : CommonBoolClosure?
  override func requestUrl() -> String {
    return "users/\(User.userId())"
  }
  
  override func requestHeaderFieldValueDictionary() -> [String : String] {
    if User.userToken().characters.count > 0{
      return ["Authorization" : User.userToken()]
    }
    return [:]
  }
  
  func startRequest() {
    startWithCompletionBlock(success: {[weak self](request) -> Void in
      guard let strongSelf = self else {return}
      strongSelf.finishAction?(true)
      debuglog("信息更新成功")
      }, failure: { [weak self](request) -> Void in
        guard let strongSelf = self else {return}
        strongSelf.finishAction?(false)
        debuglog("信息获取失败")
    })
  }
}
