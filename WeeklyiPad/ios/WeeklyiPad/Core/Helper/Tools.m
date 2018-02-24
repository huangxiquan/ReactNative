//
//  Tools.m
//  Das
//
//  Created by Neo on 14-8-13.
//  Copyright (c) 2014年 Neo. All rights reserved.
//

#import "Tools.h"
#import <AVFoundation/AVFoundation.h>
#import <sys/utsname.h>
#import "YTKNetworkConfig.h"
#import <React/RCTBridgeModule.h>

@class MainController;

@interface Tools()

@property (nonatomic, assign) BOOL isReleased;
@property (nonatomic, strong) NSUserDefaults *userDefaults;

@end

@implementation Tools
{
    UIWindow *_tipWindow;
}


static Tools *toolsManager = nil;

+ (Tools *)sharedManager
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        toolsManager = [self new];
    });
    return toolsManager;
}

- (id)init
{
    if (self = [super init]) {
        self.isReleased = [self.userDefaults boolForKey:@"im_sb"];
    }
    return self;
}

+ (BOOL)isReleasedBaseURL
{
    return [self sharedManager].isReleased;
}

- (NSUserDefaults *)userDefaults
{
    if (!_userDefaults) {
        _userDefaults = [NSUserDefaults standardUserDefaults];
    }
    return _userDefaults;
}

+ (NSUserDefaults *)userDefaults{
    return [self sharedManager].userDefaults;
}

+ (AppDelegate *)appDelegate
{
    AppDelegate *appDelegate=(AppDelegate *)[UIApplication sharedApplication].delegate;
    return appDelegate;
}

+ (UIWindow *)window
{
    return [Tools appDelegate].window;
}

+ (UINavigationController *)currentNavigationConroller
{
    id vCtrl = [self appDelegate].window.rootViewController;
    if ([vCtrl isKindOfClass:[UINavigationController class]]) {
        return vCtrl;
    } else if ([vCtrl isKindOfClass:[UIViewController class]]) {
        return [vCtrl navigationController];
    }
    return nil;
}

+ (NSString *)inviteToken
{
    return [self deviceUUIDString];
}

+ (NSString *)appVersion//版本号
{
    NSString *version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
    if (!version || ![version length])
        version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
    return (version ?: @"");
}

+ (NSString *)displayName
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
}

+ (NSString *)deviceUUIDString
{
    return [[UIDevice currentDevice].identifierForVendor UUIDString];
}


+ (NSString *)platformString
{
    struct utsname systemInfo;
    
    uname(&systemInfo);
    
    NSString *platform = [NSString stringWithCString:systemInfo.machine encoding:NSASCIIStringEncoding];
    
    if ([platform isEqualToString:@"iPhone1,1"]) return @"iPhone 2G";
    
    if ([platform isEqualToString:@"iPhone1,2"]) return @"iPhone 3G";
    
    if ([platform isEqualToString:@"iPhone2,1"]) return @"iPhone 3GS";
    
    if ([platform isEqualToString:@"iPhone3,1"]) return @"iPhone 4";
    
    if ([platform isEqualToString:@"iPhone3,2"]) return @"iPhone 4";
    
    if ([platform isEqualToString:@"iPhone3,3"]) return @"iPhone 4";
    
    if ([platform isEqualToString:@"iPhone4,1"]) return @"iPhone 4S";
    
    if ([platform isEqualToString:@"iPhone5,1"]) return @"iPhone 5";
    
    if ([platform isEqualToString:@"iPhone5,2"]) return @"iPhone 5";
    
    if ([platform isEqualToString:@"iPhone5,3"]) return @"iPhone 5c";
    
    if ([platform isEqualToString:@"iPhone5,4"]) return @"iPhone 5c";
    
    if ([platform isEqualToString:@"iPhone6,1"]) return @"iPhone 5s";
    
    if ([platform isEqualToString:@"iPhone6,2"]) return @"iPhone 5s";
    
    if ([platform isEqualToString:@"iPhone7,1"]) return @"iPhone 6 Plus";
    
    if ([platform isEqualToString:@"iPhone7,2"]) return @"iPhone 6";
    
    if ([platform isEqualToString:@"iPhone8,1"]) return @"iPhone 6s";
    
    if ([platform isEqualToString:@"iPhone8,2"]) return @"iPhone 6s Plus";
    
    if ([platform isEqualToString:@"iPhone8,4"]) return @"iPhone SE";
    
    if ([platform isEqualToString:@"iPhone9,1"]) return @"iPhone 7";
    
    if ([platform isEqualToString:@"iPhone9,2"]) return @"iPhone 7 Plus";
    
    if ([platform isEqualToString:@"iPod1,1"])   return @"iPod Touch 1G";
    
    if ([platform isEqualToString:@"iPod2,1"])   return @"iPod Touch 2G";
    
    if ([platform isEqualToString:@"iPod3,1"])   return @"iPod Touch 3G";
    
    if ([platform isEqualToString:@"iPod4,1"])   return @"iPod Touch 4G";
    
    if ([platform isEqualToString:@"iPod5,1"])   return @"iPod Touch 5G";
    
    if ([platform isEqualToString:@"iPad1,1"])   return @"iPad 1G";
    
    if ([platform isEqualToString:@"iPad2,1"])   return @"iPad 2";
    
    if ([platform isEqualToString:@"iPad2,2"])   return @"iPad 2";
    
    if ([platform isEqualToString:@"iPad2,3"])   return @"iPad 2";
    
    if ([platform isEqualToString:@"iPad2,4"])   return @"iPad 2";
    
    if ([platform isEqualToString:@"iPad2,5"])   return @"iPad Mini 1G";
    
    if ([platform isEqualToString:@"iPad2,6"])   return @"iPad Mini 1G";
    
    if ([platform isEqualToString:@"iPad2,7"])   return @"iPad Mini 1G";
    
    if ([platform isEqualToString:@"iPad3,1"])   return @"iPad 3";
    
    if ([platform isEqualToString:@"iPad3,2"])   return @"iPad 3";
    
    if ([platform isEqualToString:@"iPad3,3"])   return @"iPad 3";
    
    if ([platform isEqualToString:@"iPad3,4"])   return @"iPad 4";
    
    if ([platform isEqualToString:@"iPad3,5"])   return @"iPad 4";
    
    if ([platform isEqualToString:@"iPad3,6"])   return @"iPad 4";
    
    if ([platform isEqualToString:@"iPad4,1"])   return @"iPad Air";
    
    if ([platform isEqualToString:@"iPad4,2"])   return @"iPad Air";
    
    if ([platform isEqualToString:@"iPad4,3"])   return @"iPad Air";
    
    if ([platform isEqualToString:@"iPad4,4"])   return @"iPad Mini 2G";
    
    if ([platform isEqualToString:@"iPad4,5"])   return @"iPad Mini 2G";
    
    if ([platform isEqualToString:@"iPad4,6"])   return @"iPad Mini 2G";
    
    if ([platform isEqualToString:@"i386"])      return @"iPhone Simulator";
    
    if ([platform isEqualToString:@"x86_64"])    return @"iPhone Simulator";
    
    return platform;
}


+ (void)doSound:(id)AVAudioName type:(NSString *)type
{
    //type wav mp3 等格式
    NSError *err;
    AVAudioPlayer *player = [[AVAudioPlayer alloc] initWithContentsOfURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:AVAudioName ofType:type]] error:&err];
    player.volume = 1;
    player.numberOfLoops = 1;
    [player prepareToPlay];
    [player play];
}


+ (BOOL)isValidEmail:(NSString *)email
{
    NSString *emailRegex = @"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}";
    NSPredicate *emailTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", emailRegex];
    return [emailTest evaluateWithObject:email];
}

+ (BOOL)isValidPhone:(NSString*)string
{
    NSString *phoneRegex = @"^[0-9]{11,11}$";
    NSRange range = [string rangeOfString:phoneRegex options:NSRegularExpressionSearch];
    return range.location != NSNotFound;
}

+ (BOOL)isValidateUrl: (NSString *)candidate {
    NSString *urlRegEx =
    @"(http|https)://((\\w)*|([0-9]*)|([-|_])*)+([\\.|/]((\\w)*|([0-9]*)|([-|_])*))+";
    NSPredicate *urlTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", urlRegEx];
    return [urlTest evaluateWithObject:candidate];
}

+ (BOOL)isPushNotificationEnabled
{
    BOOL enabled = NO;
    UIApplication *app = [UIApplication sharedApplication];
    if ([app respondsToSelector:@selector(isRegisteredForRemoteNotifications)]) {
        if([app isRegisteredForRemoteNotifications])
        {
            if([app currentUserNotificationSettings].types ==UIUserNotificationTypeNone)
                enabled=NO;
            else
                enabled=YES;
            
        }else{
            enabled=NO;
        }
        
    } else {
        enabled = [app enabledRemoteNotificationTypes] != UIRemoteNotificationTypeNone;
    }
    return enabled;
}

+ (NSString *)ReplaceString:(NSString *)targetString useRegExp:(NSString *)regExp byString:(NSString *) replaceString
{
    NSError *error = NULL;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:regExp options:0 error:&error];
    NSString *lowercaseString = [targetString lowercaseStringWithLocale:[NSLocale currentLocale]];
    NSString *modifiedString = [regex stringByReplacingMatchesInString:lowercaseString options:0 range:NSMakeRange(0,[lowercaseString length]) withTemplate:replaceString];
    return modifiedString;
}


+ (void)showAlert:(NSString *)message
{
    [UIAlertView showWithTitle:nil message:message];
}

+ (void)showToast:(NSString *)toast
{
    [[UIApplication sharedApplication].keyWindow makeToast:toast];
}

+ (NSString*)urlEncode:(NSString*)str{
    NSString *result = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(nil,(CFStringRef)str, nil,(CFStringRef)@"!*'();:@&=+$,/?%#[]", kCFStringEncodingUTF8));
    return result;
}

//按照图片宽高比例裁剪
+ (NSString *)qiniuThumbnail:(NSString *)urlStr forThumbnail:(CGSize)size
{
    if ([urlStr rangeOfString:@"qiniucdn.com"].length > 0 ||
        [urlStr rangeOfString:@"files.cbnweek.com"].length > 0) {
        NSString *result = [NSString stringWithFormat:@"%@?imageView2/0/w/%.0f/h/%.0f", [[urlStr componentsSeparatedByString:@"?"] firstObject], size.width,size.height];
        return result;
    }
    return urlStr;
}


@end
