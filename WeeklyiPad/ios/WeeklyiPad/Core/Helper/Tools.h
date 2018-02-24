//
//  Tools.h
//  Das
//
//  Created by Neo on 14-8-13.
//  Copyright (c) 2014年 Neo. All rights reserved.
//

#import <Foundation/Foundation.h>
@class AppDelegate;
@class UIWindow;
#import <UIKit/UIKit.h>




@interface Tools : NSObject


@property (nonatomic,strong)NSDateFormatter *localDateToDetailFormatter;
@property (nonatomic,strong)NSTimeZone *localDateToDetailTimeZone;


+ (Tools *)sharedManager;
+ (AppDelegate *)appDelegate;
+ (UIWindow *)window;
+ (UINavigationController *)currentNavigationConroller;
+ (NSString *)inviteToken;
+ (NSString *)appVersion;
+ (NSString *)displayName;
+ (NSString *)deviceUUIDString;
+ (NSString *)platformString;

/**
 *  设置BaseURL
 *
 *  @return
 */
#ifdef DEBUG
+ (BOOL)isReleasedBaseURL;
+ (void)setReleaseBaseURL;
#endif

/**
 *  播放音频
 *
 *  @param AVAudioName 文件名字
 *  @param type        文件类型
 */
+ (void)doSound:(id)AVAudioName type:(NSString *)type;

///**
// *  APP通知设置
// *
// *  @return 
// */
+ (BOOL)isPushNotificationEnabled;


/**
 *  验证邮箱格式
 *
 *  @param email 字符串
 *
 *  @return 真或假
 */
+ (BOOL)isValidEmail:(NSString *)email;

+ (BOOL)isValidPhone:(NSString*)string;

+ (BOOL)isValidateUrl: (NSString *)candidate;



//替换字符串
+ (NSString *)ReplaceString:(NSString *)targetString useRegExp:(NSString *) regExp byString:(NSString *) replaceString;


+ (void)showAlert:(NSString *)message;

+ (void)showToast:(NSString *)toast;


+ (NSString*)urlEncode:(NSString*)str;
/**
 *  填充uuid的参数进入原来的参数表里
 *
 *  @param params 原来的参数
 *
 *  @return 处理后的参数表
 */
+ (NSMutableDictionary *)fillInviteWithParams:(NSDictionary *)params;

NSMutableDictionary * fillUidOrTokenParams(NSDictionary *params);

/**
 *  检查是否为七牛的图片
 *
 *  @param urlStr
 *
 *  @return 处理后的url
 */
+ (NSString *)checkQiniuUrl:(NSString *)urlStr;
+ (NSString *)qiniuThumbnail:(NSString *)urlStr centerCropSize:(CGSize)size;
+ (NSString *)checkQiniuUrl:(NSString *)urlStr forSuffix:(NSString *)suffix;
+ (NSString *)qiniuOrigin:(NSString *)urlStr centerCropSize:(CGSize)size;
+ (NSString *)qiniuThumbnail:(NSString *)urlStr forThumbnail:(CGSize)size;


@end
