//
//  MagazineEntity+CoreDataProperties.swift
//  WeeklyiPad
//
//  Created by yang on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import Foundation
import CoreData


extension MagazineEntity {

  @nonobjc open override class func fetchRequest() -> NSFetchRequest<NSFetchRequestResult> {
    return NSFetchRequest(entityName: "MagazineEntity");
  }

    @NSManaged public var uid: String?
    @NSManaged public var url: String?
    @NSManaged public var userId: String?
    @NSManaged public var date: String?
    @NSManaged public var folderPath: String?
    @NSManaged public var maga_all_number: String?
    @NSManaged public var num: String?
    @NSManaged public var thumbnailPath: String?
    @NSManaged public var title: String?

}
