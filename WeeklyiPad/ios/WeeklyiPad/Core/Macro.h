//
//  Constants.h
//  CBNWeekly
//
//  Created by Neo on 15/4/17.
//  Copyright (c) 2015年 Neo. All rights reserved.
//

#ifndef CBNWeekly_Constants_h
#define CBNWeekly_Constants_h


#define CHAT_TEST       0

// @"App Store"  @"AdHoc" @"Enterprise" @"91" @"tongbu" @"pp"
#define kClientChannel_AppStore         @"App Store"
#define kClientChannel_Enterprise       @"Enterprise"
#define kClientChannel_Development      @"dev"
#define kClientChannel_AdHoc            @"AdHoc"
#define kClientChannel_91               @"91"
#define kClientChannel_TongBuTui        @"tongbu"
#define kClientChannel_PP               @"pp"
#define kClientChannel_Haima            @"haima"
#define kClientChannel_Fir              @"fir"
#define kClientChannel_PuGongYing       @"pgy"

#define kf_config_clientChannel         kClientChannel_Enterprise
#if !DEBUG
#warning [ Channel ]: kClientChannel_Enterprise
#endif


typedef enum : NSUInteger {
    
    AppOnline=0,
    AppTest=1,
    
} AppStatus;


#define Online_Test AppTest








#define AppName @"一财周刊"


#define kHadFirstLuanched @"HadFirstLuanched"

/**
 *  custom strings
 */
#define kAttrStyle(string, sytle) [[NSAttributedString alloc] initWithString:string attributes:@{NSParagraphStyleAttributeName: sytle,NSBaselineOffsetAttributeName : @0.0f}]



/**
 *  font
 */
#define kFont(args) [[CustomFont font] systemFontOfSize:args]
#define kFontLight(args) [[CustomFont font] systemLightFontOfSize:args]
#define kFontBold(args) [[CustomFont font] systemBoldFontOfSize:args]
#define kUserPreferredFont  [UIFont preferredFontForTextStyle:UIFontTextStyleBody];

/**
 *  folder
 */
#define DOCUMENT_FOLDER [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0]
#define LIBRARY_FOLDER [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) objectAtIndex:0]


/**
 *  encode
 */
#define ENCODE_PROPERTY(args) [aCoder encodeObject:self.args forKey:@#args]
#define DECODE_PROPERTY(args) self.args = [aDecoder decodeObjectForKey:@#args]



/**
 *  netWork time out
 */
#define YTKTimeOutCode 0
#define AFHTTPTimeOutCode -1001




#define OS_VERSION ([[[UIDevice currentDevice] systemVersion] floatValue])
#define IOS7_OR_LATER ([[[UIDevice currentDevice] systemVersion] doubleValue] >= 7.0)
#define IOS8_OR_LATER ([[[UIDevice currentDevice] systemVersion] doubleValue] >= 8.0)
#define IOS9_OR_LATER ([[[UIDevice currentDevice] systemVersion] doubleValue] >= 9.0)

#define kDeviceWidth [[UIScreen mainScreen] bounds].size.width
#define kDeviceHeight [[UIScreen mainScreen] bounds].size.height
#define kDeviceScale [UIScreen mainScreen].scale

#define kScreenHeight MAX(kDeviceWidth, kDeviceHeight)
#define kIPhone4s (kScreenHeight == 480)
#define kIPhone5 (kScreenHeight == 568)
#define kIPhone6 (kScreenHeight == 667)
#define kIPhone6Plus (kScreenHeight == 736)
#define isiPad [UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad


#define kStatusBarHeight [UIApplication sharedApplication].statusBarFrame.size.height
#define kTabBarHeight [Core globleCore].mainTabbarController.tabBar.height
#define kNavHeight  64.0f
#define kPhoneWidth 320
#define kPhoneHeight 568


#define CGRectIsZero(frame) CGRectEqualToRect(frame, CGRectZero)
#define CGPointIsZero(origin) CGPointEqualToPoint(origin, CGPointZero)

/**
 *  比例
 */
#define Ratio320(args) args/320.0*kDeviceWidth
#define Ratio375(args) args/375.0*kDeviceWidth
#define Ratio568(args) args/568.0*kDeviceHeight
#define Ratio640(args) args/640.0*kDeviceWidth
#define Ratio1136(args) args/1136.0*kDeviceHeight






/**
 *  color
 */
#define HexRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

#define HexRGBAlpha(rgbValue,alp) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:alp]




/**
 * date time format
 */

#define UTCLongDateForamt @"yyyy-MM-dd HH:mm:ss"
#define DetailSubtitleDateForamt @"MM月dd日 HH:mm"

/**
 *  global
 */
#define kGlobalBackgroundColor @"GlobalBackgroundColor"
#define kUserFontPerference @"kUserFontPerference"
#define kFontSystemDefault @"SystemFont"


#define kFontPingFang @"PingFangSC-Regular"
#define kFontPingFangLight @"PingFangSC-Light"
#define kFontPingFangMedium @"PingFangSC-Medium"
#define KFontSemibold @"PingFangSC-SemiBold"


#define kFontHelveLight @"HelveticaNeue-Light"
#define kFontSYH @"NotoSansHans-Regular"
#define kFontSYHM @"NotoSansHans-Medium"

//#define kFontFZLanTingHei_HN_GBK @"FZLanTingHei-HN-GBK"
//#define kFontFZLanTingHei_L_GBK_M @"FZLanTingHei-L-GBK-M"


//====================================Color====================================
#define kGlobalOrange   0xFF5733


#endif
