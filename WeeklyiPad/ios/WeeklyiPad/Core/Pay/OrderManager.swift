//
//  OrderStore.swift
//  CBNWeekly
//
//  Created by Neo on 16/9/20.
//  Copyright © 2016年 CBN. All rights reserved.
//
enum IAPurchaseType {
  case none,magazine,column
}


import StoreKit

class OrderManager : NSObject{
  
  class func sendOrderToVerify(_ model : OrderVerifyModel,type : IAPurchaseType,showError: Bool){
    let params : [String : String] =
      [
        "trade_no" : model.tradeNo,
        "receipt" : model.receipt
    ]
    let url = "orders/verify_ios_receipt"
    HTTPRequestManager.share().post(url, parameters: params, success: { (response, responseObject) in
      debuglog("response：\(responseObject!)")
      let request = UserInfoRequest()
      request.finishAction = {readable in
        if readable{
          Tools.window().makeToast("操作成功", duration: 1, position: CSToastPositionCenter)
        }else{
          
        }
        let manager = JSEventManager()
        manager.subscribeResult(readable)
      }
      request.startRequest()
    }) { (response, responseObject, error) in
      if showError{
        Tools.window().makeToast("出错了，请重试")
      }
        debuglog("verify error：\(error) \(responseObject) \(params)")
    }
  }
}



struct OrderVerifyModel {
  var columnId = ""
  var title = ""
  var tradeNo = ""
  var receipt = ""
  
  init(){
    
  }
  
  init(columnId : String,title : String) {
    self.columnId = columnId
    self.title = title
  }
  
  init(tradeNo : String,receipt : String) {
    self.tradeNo = tradeNo
    self.receipt = receipt
  }
}
