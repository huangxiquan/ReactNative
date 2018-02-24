//
//  Macro.swift
//  CBNWeekly
//
//  Created by Neo on 15/8/17.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

import Foundation
import UIKit

// MARK:- URL中文问题处理
public extension String{
  
  /**
   String length
   */
  var length: Int { return self.characters.count }
  
  func normalURLString() -> String?{
    return addingPercentEncoding(withAllowedCharacters: CharacterSet(charactersIn: "`#%^{}\"[]|\\<> ").inverted)
  }
}

public extension NSString{
  func normalURLString() -> String?{
    return addingPercentEncoding(withAllowedCharacters: CharacterSet(charactersIn: "`#%^{}\"[]|\\<> ").inverted)
  }
}


/**
 *  folder
 */

func Cache_FOLDER() -> NSString
{
    return NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0] as NSString
}

func DOCUMENT_FOLDER() -> NSString
{
    return NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0] as NSString
}

func LIBRARY_FOLDER() -> NSString
{
    return NSSearchPathForDirectoriesInDomains(.libraryDirectory,.userDomainMask, true)[0] as NSString
}


/**
*  netWork time out
*/

let YTKTimeOutCode = 0
let AFHTTPTimeOutCode = -1001



/**
 *  version
 */

func OS_VERSION() -> Float
{
    return (UIDevice.current.systemVersion as NSString).floatValue
}

let IOS7_OR_LATER = (UIDevice.current.systemVersion as NSString).floatValue >= 7.0
let IOS8_OR_LATER = (UIDevice.current.systemVersion as NSString).floatValue >= 8.0
let IOS9_OR_LATER = (UIDevice.current.systemVersion as NSString).floatValue >= 9.0

let isiPad = (UIDevice.current.userInterfaceIdiom == .pad)

/**
*  screenSize
*/
let kDeviceWidth = UIScreen.main.bounds.size.width
let kDeviceHeight = UIScreen.main.bounds.size.height
let kStatusBarHeight = UIApplication.shared.statusBarFrame.size.height
let kNavHeight = CGFloat(64.0)
let kPhoneWidth = 320
let kPhoneHeight = 568



//AdvertisementRatio
let kIndexADRatio = 0.41


/**
 *  color
 */

func HexRGB(_ rgbValue: UInt) -> UIColor {
    return UIColor(
        red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
        green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
        blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
        alpha: CGFloat(1.0)
    )
}

func HexRGBAlpha(_ rgbValue: UInt,alpha : Float) -> UIColor {
    return UIColor(
        red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
        green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
        blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
        alpha: CGFloat(alpha)
    )
}



/**
 * screen
 */

func kIPhone4() -> Bool{
    return kDeviceHeight == 480
}
func kIPhone5() -> Bool{
    return kDeviceHeight == 568
}
func kIPhone6() -> Bool{
    return kDeviceHeight == 667
}

func kIPhone6Plus() -> Bool{
    return kDeviceHeight == 736
}


/**
 *  ratio
 */

//MARK:- Width
func Ratio320(_ args : CGFloat) -> CGFloat{
    return args/320.0*kDeviceWidth
}

func Ratio375(_ args : CGFloat) -> CGFloat{
    return args/375.0*kDeviceWidth
}

func Ratio414(_ args : CGFloat) -> CGFloat{
    return args/414.0*kDeviceWidth
}


//MARK:- Height
func Ratio568(_ args : CGFloat) -> CGFloat{
    return args/568.0*kDeviceHeight
}

func Ratio667(_ args : CGFloat) -> CGFloat{
    return  args/667.0*kDeviceHeight
}

func Ratio736(_ args : CGFloat) -> CGFloat{
    return  args/736.0*kDeviceHeight
}


//MARK:- Zoom
func Ratio640(_ args : CGFloat) -> CGFloat{
    return  args/640.0*kDeviceWidth
}

func Ratio1136(_ args : CGFloat) -> CGFloat{
    return args/1136.0*kDeviceHeight
}





/**
 * date time format
 */

let UTCLongDateForamt = "yyyy-MM-dd HH:mm:ss"
let DetailSubtitleDateForamt = "MM月dd日 HH:mm"

/**
 *  global
 */
let kGlobalBackgroundColor = "GlobalBackgroundColor"
let kUserFontPerference = "kUserFontPerference"
let kFontSystemDefault = "SystemFont"
let kGlobalOrange = UInt(0xFF5733)

let kFontPingFang = "PingFangSC-Regular"


/**
 *  fontName
 */
let kFontSYH = "NotoSansHans-Regular"
let kFontSYHM = "NotoSansHans-Medium"
