//
//  LabelColumnModel.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

@objc protocol LabelColumnProtocol{
  var columns : [ColumnModel]? {get set}
  var authors : [AuthorModel]? {get set}

}



extension LabelColumnProtocol{
  
  func fillLabelModelsWithDict(_ dict : NSDictionary,isLocal : Bool) -> ([ColumnModel]?,[AuthorModel]?){
    
    var columns : [ColumnModel]?
    var authors : [AuthorModel]?
    if isDictionary(dict["column"]){
      columns = []
      let dic = dict["column"] as! NSDictionary
      let model = ColumnModel(dict: dic)
      columns!.append(model)
    }
    
    
    if isArray(dict["authors"]){
      let array = dict["authors"] as! [NSDictionary]
      for dic in array {
        if authors == nil{
          authors = []
        }
        let model = AuthorModel(dict: dic, isLocal:isLocal)
        authors!.append(model)
      }
    }
    
    return (columns,authors)
  }
}


//栏目
class ColumnModel : NSObject {
  
  var id = ""
  var name = ""
  var parentColumn : ColumnModel?
  
  
  class func arrayWithDictionary(_ dict : NSDictionary) -> [ColumnModel] {
    var modelArray : [ColumnModel] = []
    let array = dict["data"] as! NSArray
    for dic in array
    {
      let model = ColumnModel(dict: dic as! NSDictionary)
      modelArray.append(model)
    }
    return modelArray
  }
  
  convenience init(dict : NSDictionary)
  {
    self.init()
    id = ftString(dict["id"])
    name = ftString(dict["name"])
    if isDictionary(dict["parent_column"]){
      let dic = dict["parent_column"] as! NSDictionary
      parentColumn = ColumnModel(dict:dic)
    }
  }
}

//作者
class AuthorModel : NSObject {
  
  var id = ""
  var name = ""
  var avatar = ""
  var short_avatar = ""//不包含本地全路径 用于本地存储

  class func arrayWithDictionary(_ dict : NSDictionary,isLocal : Bool) -> [AuthorModel] {
    var modelArray : [AuthorModel] = []
    let array = dict["data"] as! NSArray
    for dic in array
    {
      let model = AuthorModel(dict: dic as! NSDictionary,isLocal: isLocal)
      modelArray.append(model)
    }
    return modelArray
  }
  
  convenience init(dict : NSDictionary,isLocal : Bool)
  {
    self.init()
    fillValues(dict,isLocal:isLocal)
    
  }
  
  convenience init(dictWithKey : NSDictionary,isLocal : Bool)
  {
    self.init()
    let dict = dictWithKey["data"] as! NSDictionary
    fillValues(dict, isLocal: false)
  }
  
  fileprivate func fillValues(_ dict : NSDictionary,isLocal : Bool){
    id = ftString(dict["id"])
    name = ftString(dict["name"])
    avatar = ftString(dict["avatar"])
    
    if isLocal{
      avatar = ftString(avatar.components(separatedBy: "/").last)
      avatar = "\(CacheMagazine.instance.assetPath)\(avatar)"
      short_avatar = ftString(avatar.components(separatedBy: "Documents/").last)
    }
  }
  
  override init() {
  }
  
  required init(coder aDecoder: NSCoder) {
    super.init()
    id = ftString(aDecoder.decodeObject(forKey: "id"))
    name = ftString(aDecoder.decodeObject(forKey: "name"))
    
    short_avatar = ftString(aDecoder.decodeObject(forKey: "short_avatar"))
    avatar = "\(DOCUMENT_FOLDER())/\(short_avatar)"
  
  }
  
  func encode(with aCoder: NSCoder) {
    aCoder.encode(id, forKey: "id")
    aCoder.encode(name, forKey: "name")
    aCoder.encode(short_avatar, forKey: "short_avatar")
  }
}
