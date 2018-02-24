//
//  DownloadManager.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/14.
//  Copyright © 2017年 Facebook. All rights reserved.
//

typealias MenuModelClosure = ([MagazineMenuModel]) -> Void
class DownloadManager : NSObject{
  
  class func willDownloadMagazine(controller : UIViewController, currentPath: String){
    if NetWork.sharedInstance().isConnect && !NetWork.sharedInstance().isWifi{
      DownLoadAlert.showOn(controller, continueAction: {
        DownloadManager.downloadMagazine(currentPath)
      })
      return
    }
    DownloadManager.downloadMagazine(currentPath)
  }
  
  
  class func downloadMagazine(_ currentPath : String){
    if currentPath.length > 0{
      CacheMagazine.magazineZipData(currentPath, closure: { (data) in
      }, progressClosure: { progress in
        onMain{
          debuglog("progress==========================:\(progress)")
          if (progress == 1){
            let manager = JSEventManager()
            let dict = ["isSuccess":true, "path":currentPath] as [String : Any]
            manager.downloadResult(dict)
          }
        }
      }, failure: {error in
        let manager = JSEventManager()
        let dict = ["isSuccess":false, "path":currentPath] as [String : Any]
        manager.downloadResult(dict)
        let progressHUD = MBProgressHUD.showAdded(to: Tools.window(), animated: true)!
        progressHUD.mode = .text
        progressHUD.labelText = "下载失败"
        progressHUD.hide(true, afterDelay: 1.5)
      })
    }
  }
  
  class func goShowMenuActionWithCurrentInfo(currentInfo: NSDictionary){
    
    if CacheMagazine.isFileExist(ftString(currentInfo["id"])){
        CacheMagazine.magazineZipData(ftString(currentInfo["path"]), closure: { data in
          let manager = JSEventManager()
          let dictArray = MagazineMenuModel.mj_keyValuesArray(withObjectArray: data.menuModel)
          manager.downloadGoShowData(dictArray as! [Any])
          }, progressClosure: nil, failure:nil)
    }else{
      
    }
  }
  
  class func deleteMagazineEntity(magazinesEntity: NSArray){
    for entity in magazinesEntity{
      let dict = entity as! NSDictionary
      CacheMagazine.clearURLForKey(ftString(dict["uid"]))
      MagazineEntity.deleteEntityById(ftString(dict["uid"]))
    }
    let dictArray = MagazineEntity.mj_keyValuesArray(withObjectArray: magazinesEntity as! [Any])!
    let magager = JSEventManager()
    magager.deleteMagazineData(dictArray as! [Any])
    
  }
  
  class func getMyOfflineMagazine() -> NSArray {
    let entitys = MagazineEntity.mr_find(byAttribute: "userId", withValue: ftString(User.userId()), andOrderBy: "maga_all_number", ascending: false)
    let dictArray = MagazineEntity.mj_keyValuesArray(withObjectArray: entitys)!
    return dictArray
  }
  
}



