//
//  ArticleModel.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//


class ArticleBaseModel: NSObject {
  var id = ""
  var title = ""
  var summary = ""
  var cover_url = ""
  
  class func arrayWithDictionary(_ dict : NSDictionary) -> [ArticleBaseModel] {
    var modelArray : [ArticleBaseModel] = []
    let array = dict["data"] as! NSArray
    for dic in array
    {
      let model = ArticleBaseModel(dict: dic as! NSDictionary)
      modelArray.append(model)
    }
    return modelArray
  }
  
  fileprivate convenience init(dict : NSDictionary)
  {
    self.init()
    id = ftString(dict["id"])
    title = ftString(dict["title"])
    summary = ftString(dict["summary"])
    cover_url = ftString(dict["cover_url"])
  }
}


class ArticleModel: ArticleBaseModel,LabelColumnProtocol {
  var content = ""
  var display_time = ""
  var columns: [ColumnModel]?
  var authors: [AuthorModel]?
  var short_cover_url = ""//不包含本地全路径的url 用于本地
  var short_content = ""
  var short_foler_name = ""
  
  override class func arrayWithDictionary(_ dict : NSDictionary) -> [ArticleBaseModel] {
    var modelArray : [ArticleModel] = []
    let array = dict["data"] as! NSArray
    for dic in array
    {
      let model = ArticleModel(dict: dic as! NSDictionary)
      modelArray.append(model)
    }
    return modelArray
  }
  
  //本地模式
  convenience init(localDict : NSDictionary)
  {
    self.init()
    fillValues(localDict, isLocal: true)
  }
  
  fileprivate func fillValues(_ dict : NSDictionary, isLocal : Bool){
    id = ftString(dict["id"])
    title = ftString(dict["title"])
    summary = ftString(dict["summary"])
    cover_url = ftString(dict["cover_url"])
    content = ftString(dict["content"])

    
    if isLocal{
      //替换本地路径
      short_content = content
      short_foler_name = CacheMagazine.instance.assetFolder
      content = content.replacingOccurrences(of: "assets/", with: CacheMagazine.instance.assetPath)
      cover_url = ftString(cover_url.components(separatedBy: "/").last)
      cover_url = "\(CacheMagazine.instance.assetPath)\(cover_url)"
      short_cover_url = ftString(cover_url.components(separatedBy: "Documents/").last)
      // debuglog("result: \(content)")
    }
    display_time = ftString(dict["display_time"])
    let result = fillLabelModelsWithDict(dict, isLocal:isLocal)
    columns = result.0
    authors = result.1
  }
}
