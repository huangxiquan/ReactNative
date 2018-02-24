//
//  FTValue.swift
//  CBNWeekly
//
//  Created by Neo on 2017/3/31.
//  Copyright © 2017年 XM. All rights reserved.
//

/**
 * system
 */

func debuglog(_ logMessage: String, functionName: String = #function) {
  debugPrint("\(functionName): \(logMessage)")
}

private func isNumber(_ id : Any?) -> Bool{
  return id is Integer || id is Float || id is Float32 || id is Float64 || id is Double || id is Int || id is Int8 ||  id is Int8 || id is Int16 || id is Int32 || id is Int64 || id is UInt || id is UInt16 || id is UInt32 || id is UInt64 || id is CGFloat
}

func ftString(_ id : Any?) -> String{
  let value = ""
  if id != nil{
    if id is String{
      return id! as! String
    }else if isNumber(id) || id is Bool{
      return "\(id!)"
    }
  }
  return value
}

func ftInt(_ id : Any?) -> Int{
  let value : Int = 0
  if id != nil{
    if isNumber(id){
      return ftNumber(id).intValue
    }else if id is String{
      if (id! as! String).characters.count < 1{
        return 0
      }
      
      if let result = Int(id! as! String){
        return result
      }
    }
  }
  return value
}

func ftFloat(_ id : Any?) -> Float{
  let value : Float = 0.00
  if id != nil {
    if isNumber(id){
      return ftNumber(id).floatValue
    }else if id is String{
      if let result = Float(id! as! String){
        return result
      }
    }
  }
  return value
}

func ftCGFloat(_ id : Any?) -> CGFloat{
  let value : CGFloat = 0.00
  if id != nil && id is CGFloat{
    return id! as! CGFloat
  }
  return value
}

func ftDouble(_ id : Any?) -> Double{
  let value : Double = 0.00
  if id != nil{
    if isNumber(id){
      return ftNumber(id).doubleValue
    }else if id is String{
      if let result = Double(id! as! String){
        return result
      }
    }
  }
  return value
}

func ftBool(_ id : Any?) -> Bool{
  let value = false
  if id != nil {
    if id is Bool{
      return id as! Bool
    }else if ftString(id!) == "true" || ftString(id!) == "1"{
      return true
    }
  }
  return value
}

func ftNumber(_ id : Any?) -> NSNumber{
  let value = NSNumber(value: 0)
  if id != nil{
    if id is Double{
      return NSNumber(value: id! as! Double)
    }else if id is Float{
      return NSNumber(value: id! as! Float)
    }else if id is Int{
      return NSNumber(value: id! as! Int)
    }else if id is Int8{
      return NSNumber(value: id! as! Int8)
    }else if id is Int16{
      return NSNumber(value: id! as! Int16)
    }else if id is Int32{
      return NSNumber(value: id! as! Int32)
    }else if id is Int64{
      return NSNumber(value: id! as! Int64)
    }else if id is UInt{
      return NSNumber(value: id! as! UInt)
    }else if id is UInt8{
      return NSNumber(value: id! as! UInt8)
    }else if id is UInt16{
      return NSNumber(value: id! as! UInt16)
    }else if id is UInt32{
      return NSNumber(value: id! as! UInt32)
    }else if id is UInt64{
      return NSNumber(value: id! as! UInt64)
    }else if id is Bool{
      return NSNumber(value: id! as! Bool)
    }else if id is CGFloat{
      return NSNumber(value: Float(id! as! CGFloat))
    }else if id is String{
      return NSNumber(value: (id as! String).toFloat())
    }
  }
  return value
}


func isDictionary(_ id : Any?) -> Bool{
  if id != nil && (id is [AnyHashable : Any] || id is NSDictionary){
    return true
  }
  return false
}

func isArray(_ id : Any?) -> Bool{
  if id != nil && id is Array<Any>{
    return true
  }
  return false
}

func isNSArray(_ id : Any?) -> Bool{
  if id != nil && id is NSArray{
    return true
  }
  return false
}


public extension String {
  func toFloat() -> Float {
    
    let scanner = Scanner(string: self)
    var float: Float = 0
    
    if scanner.scanFloat(&float) {
      return float
    }
    
    return 0
  }
}
