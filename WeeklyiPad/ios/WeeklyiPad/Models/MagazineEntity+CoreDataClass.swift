//
//  MagazineEntity+CoreDataClass.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import Foundation
import CoreData


public class MagazineEntity: NSManagedObject {
  class func entityWithId(_ id : String) -> Self?
  {
    return mr_findFirst(byAttribute: "uid", withValue: id)
  }
  
  class func fillEntityWithDictionary(_ dict : NSDictionary)
  {
    var entity : MagazineEntity? = entityWithId(ftString(dict["id"]))
    if entity == nil{
      entity = mr_createEntity()
    }
    if let entity = entity{
      entity.uid = ftString(dict["id"])
      entity.userId = ftString(User.userId())
      entity.title = ftString(dict["title"])
      entity.num = ftString(dict["num"])
      entity.maga_all_number = ftString(dict["maga_all_number"])
      entity.thumbnailPath = ftString(dict["thumbnailPath"])
      entity.date = ftString(dict["date"])
      entity.folderPath = ftString(dict["folderPath"])
      entity.url = ftString(dict["url"])
      save()
    }
  }
  
  class func save()
  {
    NSManagedObjectContext.mr_default().mr_saveToPersistentStoreAndWait()
  }
  
  class func findSortByYearMoth(){
    
  }
  
  class func deleteEntityById(_ id : String){
    if let entity = entityWithId(id){
      print(entity)
      let path = "\(FileDirectory()!)/\(entity.folderPath!)"
      if FileManager.default.fileExists(atPath: path){
        do {
          try FileManager.default.removeItem(atPath: path)
        }catch{
          debuglog("remove file error")
        }
      }
      entity.mr_deleteEntity()
      save()
    }
  }
  
  class func deleteAll(){
    for entity in MagazineEntity.mr_findAll()!{
      let magazine = entity as! MagazineEntity
      magazine.mr_deleteEntity()
    }
    save()
  }
  
  class func findCurrentUserMagazines() -> [MagazineEntity]?{
    var predicate = NSPredicate(format: "SELF.userId == $userId")
    predicate = predicate.withSubstitutionVariables(["userId" : User.userId()])
    let entitys = MagazineEntity.mr_findAll(with: predicate) as? [MagazineEntity]
    return entitys
  }
}
