
//
//  IAPManager.swift
//  CBNWeekly
//
//  Created by Neo on 16/9/18.
//  Copyright © 2016年 CBN. All rights reserved.
//

import StoreKit
import UIKit
import PassKit

private func verifyURL() -> String{
  
  // receipt-data
  #if DEBUG
    return "https://sandbox.itunes.apple.com/verifyReceipt"
  #else
    return "https://buy.itunes.apple.com/verifyReceipt"
  #endif
  
}

enum IAPType{
  case week,halfYear,year
}

class IAPManager: NSObject,SKProductsRequestDelegate,SKPaymentTransactionObserver {
  
  fileprivate var productId = ""
  fileprivate var model : OrderVerifyModel = OrderVerifyModel()
  fileprivate var type : IAPurchaseType = .none
  fileprivate var products : [IAPProduct] = []
  
  static let instance : IAPManager = {
    let instance = IAPManager()
    SKPaymentQueue.default().add(instance)
    return instance
  }()
  
  func startOrder(_ productId : String,type : IAPurchaseType,model : OrderVerifyModel?){
    self.productId = productId
    if model != nil{
      self.model = model!
    }
    self.type = type
    judgeOrder()
    startPayRequest([productId])
    MBProgressHUD.showAdded(to: Tools.window(), animated: true)
  }
  
  func restoreOrder(){
    judgeOrder()
  }
  
  fileprivate func judgeOrder(){
    if !SKPaymentQueue.canMakePayments(){
      //不允许程序内购
      Tools.showAlert("当前设备无法使用应用程序内购买")
      return
    }
    let transactions = SKPaymentQueue.default().transactions
    if transactions.count > 0 {
      //检测是否有未完成交易
      let transaction : SKPaymentTransaction! = transactions.first!
      if transaction.transactionState == .purchased{
        completeTransaction(transaction)
      }
    }
  }
  
  func startPayRequest(_ id : [String]){
    let productIds = NSSet(array: id)
    let request = SKProductsRequest(productIdentifiers: productIds as! Set<String>)
    request.delegate = self
    request.start()
    //        if !UIApplication.sharedApplication().isIgnoringInteractionEvents(){
    //            UIApplication.sharedApplication().beginIgnoringInteractionEvents()
    //        }
  }
  
  
  //MARK:- SKProdectsRequestDelegate
  func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
    let products = response.products
    if products.count == 0{
      MBProgressHUD.hide(for: Tools.window(), animated: true)
      Tools.window().makeToast("失败，请重试")
      return
    }
    var _product : SKProduct?
    for product in products{
      //            if product.productIdentifier == productId {
      //                _product = product
      //            }
      _product = product
    }
    if let product = _product{
      let payment = SKPayment(product: product)
      SKPaymentQueue.default().add(payment)
    }
  }
  
  func request(_ request: SKRequest, didFailWithError error: Error) {
    Tools.showToast("购买失败")
    MBProgressHUD.hide(for: Tools.window(), animated: true)
  }
  
  func requestDidFinish(_ request: SKRequest) {
  }
  
  
  //MARK:- SKPaymentTransactionObserver
  func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
    for transaction in transactions{
      switch transaction.transactionState {
      case .purchased:
        Tools.showAlert("购买成功")
        completeTransaction(transaction)
        break;
      case .failed:
        //Tools.showAlert("交易失败")
        failedTransaction(transaction)
        break;
      case .purchasing:
        
        break;
      case .restored:
        
        //Tools.showAlert("已经购买过该商品")
        completeTransaction(transaction)
        // restoreTransaction()
        break;
      default:
        
        break;
      }
    }
  }
  
  func paymentQueue(_ queue: SKPaymentQueue, restoreCompletedTransactionsFailedWithError error: Error) {
    MBProgressHUD.hide(for: Tools.window(), animated: true)
    Tools.window().makeToast("失败，请重试")
  }
  
  func paymentQueueRestoreCompletedTransactionsFinished(_ queue: SKPaymentQueue) {
    completeTransaction(nil)
  }
  
  
  //MARK:- Actions
  func completeTransaction(_ transaction : SKPaymentTransaction?){
    if let recepitURL = Bundle.main.appStoreReceiptURL{
      let receipt = try? Data(contentsOf: recepitURL)
      let receiptStr = (receipt as NSData?)?.base64EncodedString()
      let uid =  UUID().uuidString
      //1000000237130894  1000000237130918 1000000237131431 1000000236883657 1000000236883657
      if let transaction = transaction,receiptStr != nil{
        Tools.window().makeToast("操作成功", duration: 1.2, position: CSToastPositionCenter)
      }
      
      model.tradeNo = uid
      model.receipt = ftString(receiptStr)
      if model.receipt.characters.count > 0{
        OrderManager.sendOrderToVerify(model,type : type,showError: true)
      }
    }
    
    MBProgressHUD.hide(for: Tools.window(), animated: true)
    if let transaction = transaction{
      SKPaymentQueue.default().finishTransaction(transaction)
    }
    //        if UIApplication.sharedApplication().isIgnoringInteractionEvents(){
    //            UIApplication.sharedApplication().endIgnoringInteractionEvents()
    //        }
  }
  
  
  func failedTransaction(_ transaction : SKPaymentTransaction) {
    if let error = transaction.error{
      //            switch error {
      ////            case SKErrorCode.unknown:
      ////                break
      ////            case SKErrorCode.clientInvalid:
      ////                break
      ////            case SKErrorCode.paymentCancelled:
      ////                break
      ////            case SKErrorCode.paymentInvalid:
      ////                break
      ////            case SKErrorCode.paymentNotAllowed:
      ////                break
      //            default:
      //                break
      //            }
    }
    SKPaymentQueue.default().finishTransaction(transaction)
    //        if UIApplication.sharedApplication().isIgnoringInteractionEvents(){
    //            UIApplication.sharedApplication().endIgnoringInteractionEvents()
    //        }
    MBProgressHUD.hide(for: Tools.window(), animated: true)
    Tools.window().makeToast("失败，请重试")
  }
  
  func restoreTransaction(){
    if !SKPaymentQueue.canMakePayments(){
      //不允许程序内购
      Tools.showAlert("当前设备无法使用应用程序内购买")
      return
    }
    SKPaymentQueue.default().restoreCompletedTransactions()
    
  }
  
  deinit {
    SKPaymentQueue.default().remove(self)
  }
}

extension IAPManager{
  
  /// 杂志内购
  ///
  class func magazineProducts() -> [IAPProduct]{
    var products = IAPManager.instance.products
    if products.count < 1{
      let month = IAPProduct(id: "com.yicai.cbn_weekly_iphone.2016_month",desc: "一月订阅",price: "12")
      let halfYear = IAPProduct(id: "com.yicai.cbn_weekly_iphone.2016_halfyear",desc: "半年订阅",price: "60")
      let year = IAPProduct(id: "com.yicai.cbn_weekly_iphone.2016_year",desc: "一年订阅",price: "108")
      products.append(month)
      products.append(halfYear)
      products.append(year)
    }
    return products
  }
}


struct IAPProduct {
  var id = ""
  var desc = ""
  var price = ""
}
