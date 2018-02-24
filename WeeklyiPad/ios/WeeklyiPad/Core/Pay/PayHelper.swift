//
//  PayHelper.swift
//  PayAction
//
//  Created by Neo on 16/9/13.
//  Copyright © 2016年 Neo. All rights reserved.
//

class PayHelper : NSObject {
  
  class func restorePay() {
    let progressHUD = MBProgressHUD.showAdded(to: Tools.window(), animated: true)!
    progressHUD.labelText = "恢复订阅中"
    IAPManager.instance.restoreTransaction()
  }
  
  class func showMagazine(_ controller : UIViewController) {
    onMain({
      if !IAPView.instance.isDescendant(of: Tools.window()){
        Tools.window().addSubview(IAPView.instance)
      }
    })
    return
    let cycleAlertController = UIAlertController(title: "选择订阅模式", message: "订阅后解锁全部文章 同时可享受单行本优惠价", preferredStyle: UIAlertControllerStyle.alert)
    for product in IAPManager.magazineProducts(){
      let action = UIAlertAction(title: "\(ftString(product.desc)) ￥\(product.price)", style: .default, handler: { (action) -> Void in
        IAPManager.instance.startOrder(product.id, type: .magazine,model: nil)
      })
      cycleAlertController.addAction(action)
    }
    
    let cancelAction = UIAlertAction(title: "取消", style: UIAlertActionStyle.cancel, handler: nil)
    cycleAlertController.addAction(cancelAction)
    controller.present(cycleAlertController, animated: true, completion: nil)
  }
  
}

class IAPView : UIView{
  
  static let instance = IAPView(frame: CGRect.zero)
  fileprivate let bgView = UIView()
  fileprivate let whiteView = UIView(frame: CGRect(x: Ratio320(60), y: Ratio568(100), width: kDeviceWidth - 2 * Ratio320(60), height: Ratio568(240)))
  fileprivate let title = UILabel(frame: CGRect(x: 0, y: 60, width: kDeviceWidth - 2 * Ratio320(60), height: 0))
  fileprivate let p1Button = UIButton(frame: CGRect(x: 5, y: 0, width: kDeviceWidth - 2 * Ratio320(60), height: 50))
  fileprivate let p2Button = UIButton(frame: CGRect(x: 5, y: 0, width: kDeviceWidth - 2 * Ratio320(60), height: 50))
  fileprivate let p3Button = UIButton(frame: CGRect(x: 5, y: 0, width: kDeviceWidth - 2 * Ratio320(60), height: 50))
  fileprivate let cancel = UIButton(frame: CGRect(x: 5, y: 0, width: kDeviceWidth - 2 * Ratio320(60), height: 50))
  private let p1 = IAPManager.magazineProducts().first!
  private let p2 = IAPManager.magazineProducts()[1]
  private let p3 = IAPManager.magazineProducts()[2]
  override init(frame: CGRect) {
    super.init(frame: UIScreen.main.bounds)
    bgView.frame = UIScreen.main.bounds
    bgView.backgroundColor = UIColor.black
    bgView.alpha = 0.5
    whiteView.backgroundColor = UIColor.white
    whiteView.layer.cornerRadius = 8
    whiteView.layer.masksToBounds = true
    whiteView.y = (kDeviceHeight - whiteView.height) / 2
    
    title.font = UIFont.systemFont(ofSize: 18)
    title.lineBreakMode = .byWordWrapping
    
    p1Button.setTitle("\(ftString(p1.desc)) ￥\(p1.price)", for: .normal)
    p2Button.setTitle("\(ftString(p2.desc)) ￥\(p2.price)", for: .normal)
    p3Button.setTitle("\(ftString(p3.desc)) ￥\(p3.price)", for: .normal)
    cancel.setTitle("取消", for: .normal)
    
    p1Button.setTitleColor(UIColor.midnightBlue(), for: .normal)
    p2Button.setTitleColor(UIColor.midnightBlue(), for: .normal)
    p3Button.setTitleColor(UIColor.midnightBlue(), for: .normal)
    cancel.setTitleColor(UIColor.red, for: .normal)
    
    title.attributedText = NSAttributedString(string:"选择订阅模式 订阅后解锁全部")
    title.sizeToFit()
    title.x = (whiteView.width - title.width) / 2
    
    p1Button.y = title.yHeight + Ratio568(36)
    p2Button.y = p1Button.yHeight + 8
    p3Button.y = p2Button.yHeight + 8
    cancel.y = whiteView.height - 62
    
    [title,p1Button,p2Button,p3Button,cancel].forEach({ whiteView.addSubview($0) })
    
    addSubview(bgView)
    addSubview(whiteView)
    
    p1Button.addTarget(self, action: #selector(payOne), for: .touchUpInside)
    p2Button.addTarget(self, action: #selector(payTwo), for: .touchUpInside)
    p3Button.addTarget(self, action: #selector(payThree), for: .touchUpInside)
    cancel.addTarget(self, action: #selector(cancelAction), for: .touchUpInside)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func cancelAction(){
    removeFromSuperview()
  }
  
  func payOne()
  {
    IAPManager.instance.startOrder(p1.id, type: .magazine,model: nil)
    removeFromSuperview()
  }
  
  func payTwo(){
    IAPManager.instance.startOrder(p1.id, type: .magazine,model: nil)
    removeFromSuperview()
  }
  
  func payThree(){
    IAPManager.instance.startOrder(p3.id, type: .magazine,model: nil)
    removeFromSuperview()
  }
}

