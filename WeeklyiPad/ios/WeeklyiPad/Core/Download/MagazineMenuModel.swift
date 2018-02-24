//
//  MagazineMenuModel.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//


//杂志首页
class MagazineModel: NSObject {
  var id = ""
  var name = ""
  var summary = ""
  var cover_url = ""
  var maga_all_number = ""
  var maga_year = ""
  var maga_month = ""
  var maga_day = ""
  var publish_at = ""
  var package_path = ""
  var displayName = ""
  // 本地离线
  var localThumbnail : UIImage?
  class func arrayWithDictionary(_ dict : NSDictionary) -> [MagazineModel] {
    var modelArray : [MagazineModel] = []
    let array = dict["data"] as! NSArray
    for dic in array
    {
      let model = MagazineModel(dict: dic as! NSDictionary)
      modelArray.append(model)
    }
    return modelArray
  }
  
  convenience init(dict : NSDictionary)
  {
    self.init()
    id = ftString(dict["id"])
    name = ftString(dict["name"])
    summary = ftString(dict["summary"])
    maga_all_number = ftString(dict["maga_all_number"])
    package_path = ftString(dict["package_path"])
    cover_url = ftString(dict["cover_url"])
    maga_year = ftString(dict["maga_year"])
    maga_month = ftString(dict["maga_month"])
    maga_day = ftString(dict["maga_day"])
    displayName = ftString(dict["listing_name"])
  }
}






//杂志目录
class MagazineMenuModel: NSObject {
  var column_name = ""
  var column_icon = ""
  var hightlight_icon = ""
  var default_icon = ""
  var id = ""
  
  // 本地离线
  var articleModels : [ArticleModel] = []
  class func arrayWithDictionary(_ dict : NSDictionary) -> [MagazineMenuModel] {
    var modelArray : [MagazineMenuModel] = []
    let array = dict["data"] as! NSArray
    for dic in array
    {
      let model = MagazineMenuModel(dict: dic as! NSDictionary)
      modelArray.append(model)
    }
    return modelArray
  }
  
  fileprivate convenience init(dict : NSDictionary)
  {
    self.init()
    id = ftString(dict["column_id"])
    column_icon = ftString(dict["column_icon"])
    hightlight_icon = ftString(dict["column_selected_mini_icon"])
    default_icon = ftString(dict["column_default_mini_icon"])
    column_name = ftString(dict["column_name"])
    if isArray(dict["articles"]) {
      let array = dict["articles"] as! [NSDictionary]
      for dic in array{
        let articleModel : ArticleModel!
        articleModel = ArticleModel(localDict: dic)// .arrayWithDictionary(dic as! NSDictionary)
        articleModels.append(articleModel)
      }
    }
    
    //替换本地路径
    column_icon = ftString(column_icon.components(separatedBy: "/").last)
    column_icon = "\(CacheMagazine.instance.assetPath)\(column_icon)"
    hightlight_icon = ftString(hightlight_icon.components(separatedBy: "/").last)
    hightlight_icon = "\(CacheMagazine.instance.assetPath)\(hightlight_icon)"
    default_icon = ftString(default_icon.components(separatedBy: "/").last)
    default_icon = "\(CacheMagazine.instance.assetPath)\(default_icon)"
  }
  
}
