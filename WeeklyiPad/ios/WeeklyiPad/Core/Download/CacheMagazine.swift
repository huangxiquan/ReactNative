//
//  CacheMagazine.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

private let ImageFolder = "assets"
typealias CacheMagazineStruct = (coverModel: MagazineModel?,menuModel : [MagazineMenuModel]?)
typealias OfflineClosure = (CacheMagazineStruct) -> Void

class CacheMagazine: NSObject {
    static let instance = CacheMagazine()
    fileprivate(set) var assetPath = ""
    fileprivate(set) var assetFolder = ""
    fileprivate(set) var filePath = ""
    fileprivate(set) var existDict = [String : String]()
    fileprivate(set) var progressingMap = [String : CGFloat]()
  
  class func magazineZipData(_ url : String,closure : OfflineClosure?, progressClosure : CommonFloatClosure?,failure: FailureBlock?) {
    onHigh {
      let localFilePath = FileDownloadClient.zipFilePath(byURL: url)
      if let filePath = localFilePath{//判断是否下载
        debuglog("already downloaded:\(filePath)")
        localMagazineData(url,filePath : filePath,closure: closure,progressClosure : progressClosure)
      }else{
        let zipPath = url.normalURLString()
        if let zipURL = URL(string: ftString(zipPath)){
          FileDownloadClient.shareManager().downloadFile(zipURL,fileType:"zip",success: { (filePath) in
            debuglog("download success:\(filePath)")
            onHigh({
              CacheMagazine.archiveData(url,filePath : filePath!,closure: closure,progressClosure : progressClosure)
            })
          }, failure: { (error) in
            failure?(error)
            debuglog("download error:\(error)")
          }) { (progress) in
            progressClosure?(progress)
          }
        }else{
          debuglog("download url error")
        }
      }
    }
  }
  
  class func isFileExist(_ id : String) -> Bool{
    if CacheMagazine.instance.existDict[id] != nil{
      return true
    }
    return false
  }
  
  class func isFileUpdate(_ id : String,url : String) -> (isExist : Bool, isUpdate : Bool){
    if let result = CacheMagazine.instance.existDict[id]{
      return (true,result != url)
    }
    return (false,false)
  }
  
  class func getAllEntityFromDatebase(){
    if User.userId().length == 0{
      return
    }
    CacheMagazine.clearAllExistsURL()
    let entitys = MagazineEntity.findCurrentUserMagazines()
      if entitys != nil{
      for entity in entitys!{
        if  ftString(entity.url).length > 0{
          CacheMagazine.instance.existDict[entity.uid!] = entity.url
        }
      }
    }
  }
  
  class func clearAllExistsURL(){
    CacheMagazine.instance.existDict.removeAll()
  }
  
  class func clearURLForKey(_ id : String){
    let instance = CacheMagazine.instance
    if let url = instance.existDict[id]{
      instance.existDict.removeValue(forKey: id)
      removeProgressingMapFor(url)
      FileDownloadClient.removeTask(forKey: URL(string:ftString(url.normalURLString())))
    }
  }
  
  //MARK:- ProgressingMap
  class func setProgressingMap(_ key : String,value : CGFloat){
    CacheMagazine.instance.progressingMap[key] = value
  }
  
  class func removeProgressingMapFor(_ key : String){
    if CacheMagazine.instance.progressingMap[key] != nil{
      CacheMagazine.instance.progressingMap.removeValue(forKey: key)
    }
  }
  
  //MARK:- articles.json magazine.json assets
  class func archiveData(_ url : String,filePath : String,closure : OfflineClosure?,progressClosure : CommonFloatClosure?){
    
    if filePath.length < 1 {
      return
    }
    
    let folderPath = "\(ftString(filePath.components(separatedBy: ".zip").first))"
    
    if FileManager.default.fileExists(atPath: folderPath){
      debuglog("already exist:\(folderPath)")
    }else{
      let zipSuccess = SSZipArchive.unzipFile(atPath: filePath, toDestination: folderPath, preserveAttributes: false, overwrite: false, password: "e81188ee4249f48f924f0b5a4", error: nil, delegate: nil)
      debuglog("file path:\(filePath)")
      if !zipSuccess{
        return
      }
      
      //let zipSuccess = try SSZipArchive.unzipFileAtPath("\(filePath)", toDestination: "\(folderPath)", overwrite: false, password: "e81188ee4249f48f924f0b5a4")
      // let zipSuccess = SSZipArchive.unzipFileAtPath("\(filePath)", toDestination:"\(folderPath)")
    }
    
    do {
      if FileManager.default.fileExists(atPath: filePath){
        try FileManager.default.removeItem(atPath: filePath)
      }
      //            if NSFileManager.defaultManager().fileExistsAtPath("\(tempPath))"){
      //                try NSFileManager.defaultManager().moveItemAtPath("\(tempPath))", toPath: tempPath)
      //            }
    }catch{
      debuglog("move file error:\(error)")
    }
    
    
    localMagazineData(url,filePath : filePath,closure: closure,progressClosure : progressClosure)
  }
  
  class func localMagazineData(_ url : String,filePath : String,closure : OfflineClosure?,progressClosure : CommonFloatClosure?)
  {
    
    let folderPath = "\(ftString(filePath.components(separatedBy: ".zip").first))"
    
    // /Users/apple/Library/Developer/CoreSimulator/Devices/8390C6E8-E315-4120-8D4B-F06C68C3C803/data/Containers/Data/Application/848153E2-B552-48D1-B556-81E17090F443/Documents/OfflineMagazine/ddbe58cf17844d0d8bd1b15a5dab479a/2016.10.09第36期
    var finalFolder = ""
    if FileManager.default.fileExists(atPath: folderPath){
      finalFolder = "\(folderPath)/\(FileManager.default.subpaths(atPath: folderPath)!.first!)"
    }
    CacheMagazine.instance.filePath = finalFolder
    
    // /OfflineMagazine/ddbe58cf17844d0d8bd1b15a5dab479a/2016.10.09第36期/assets/
    var folderName = ""
    
    // ddbe58cf17844d0d8bd1b15a5dab479a
    var magazineWrapFolder = ""
    let zipFolderNames = folderPath.components(separatedBy: "OfflineMagazine/")
    if zipFolderNames.count > 0{
      magazineWrapFolder = ftString(zipFolderNames.last)
    }
    
    if let assetPath = finalFolder.components(separatedBy: "Documents/").last{
      CacheMagazine.instance.assetPath = "\(DOCUMENT_FOLDER())/\(assetPath)/\(ImageFolder)/"
      folderName = "/\(assetPath)/\(ImageFolder)/"
      CacheMagazine.instance.assetFolder = folderName
    }
    let articlePath = "\(finalFolder)/articles.json"
    let magazinePath = "\(finalFolder)/magazine.json"
    var listModels : [MagazineMenuModel]?
    var coverModel : MagazineModel?
    if let data = try? Data(contentsOf: URL(fileURLWithPath: articlePath))
    {
      var articleJson : NSDictionary?
      do
      {
        articleJson = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as? NSDictionary
      }catch{
        debuglog("jsonConvertError:\(error)")
      }
      // debuglog("articleResult:\(articleJson!)")
      if let dict = articleJson{
        listModels = MagazineMenuModel.arrayWithDictionary(dict)
      }
    }
    
    if let data = try? Data(contentsOf: URL(fileURLWithPath: magazinePath))
    {
      var magazineJson : NSDictionary?
      do
      {
        magazineJson = try JSONSerialization.jsonObject(with: data, options: .allowFragments)  as? NSDictionary
      }catch{
        debuglog("jsonConvertError:\(error)")
      }
      guard magazineJson != nil else { return }
      debuglog("MagazineResult:\(magazineJson)")
      if let dictWrap = magazineJson!["data"]{
        let dict = dictWrap as! NSDictionary
        coverModel = MagazineModel()
        coverModel!.id = ftString(dict["id"])
        coverModel!.name = ftString(dict["name"])
        coverModel!.summary = ftString(dict["summary"])
        coverModel!.localThumbnail = UIImage(contentsOfFile: "\(CacheMagazine.instance.assetPath)magazine.png")
        coverModel!.maga_year = ftString(dict["maga_year"])
        coverModel!.maga_month = ftString(dict["maga_month"])
        coverModel!.maga_day = ftString(dict["maga_day"])
        coverModel!.publish_at = ftString(dict["publish_at"])
        coverModel!.maga_all_number = ftString(dict["maga_all_number"])
        
        let entityDict : NSDictionary = [
          "id" : coverModel!.id,
          "url" : url,
          "title" : coverModel!.summary,
          "num" : coverModel!.name,
          "maga_all_number" : coverModel!.maga_all_number,
          "date" : coverModel!.publish_at,
          "thumbnailPath" : "\(DOCUMENT_FOLDER())\(folderName)magazine.png",
          "folderPath" : "\(magazineWrapFolder)"
        ]
        onMain {
          MagazineEntity.fillEntityWithDictionary(entityDict)
          CacheMagazine.instance.existDict[coverModel!.id] = url
        }
      }
    }
    
    onMain {
      progressClosure?(1)
      closure?((coverModel,listModels))
    }
  }
  
  class func getLocalImage(_ name : String) -> UIImage?{
    return UIImage(contentsOfFile: CacheMagazine.instance.filePath)
  }
  
  class func isLocalImage(_ name : String) -> Bool{
    return name.contains("\(DOCUMENT_FOLDER())")
  }
}


class DownLoadAlert{
  class func showOn(_ controller : UIViewController,continueAction : @escaping CommonSimpleClosure){
    let alertController = UIAlertController(title: "下载杂志", message: "温馨提示：当前为非Wifi环境，下载将使用流量。", preferredStyle: .alert)
    let sure = UIAlertAction(title: "确定", style: .destructive) { (action) in
      continueAction()
    }
    let cancel = UIAlertAction(title: "取消", style: .cancel) { (action) in
      
    }
    alertController.addAction(sure)
    alertController.addAction(cancel)
    controller.present(alertController, animated: true, completion: nil)
  }
}
