//
//  Bridge.m
//  WeeklyiPad
//
//  Created by Neo on 2017/8/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BridgeManager.h"

@implementation BridgeManager

RCT_EXPORT_MODULE(BridgeManager);

RCT_EXPORT_METHOD(subscribeMagazine)
{
  [PayHelper showMagazine:[UIViewController currentViewController]];
}

RCT_EXPORT_METHOD(storeUser:(NSString *)userId token:(NSString *)token)
{
    NSString *user = [User userId];
    [User setIdWithString:userId];
    [User setTokenWithString:token];
    //登陆获取杂志
    if (user != userId) {
      onMain(^{
             [CacheMagazine getAllEntityFromDatebase];
         });
    }
}

RCT_EXPORT_METHOD(userLogOut)
{
  [User logout];
  [CacheMagazine clearAllExistsURL];
}

//恢复订阅
RCT_EXPORT_METHOD(restorePay)
{
  onMain(^{
    [PayHelper restorePay];
  });
}

RCT_EXPORT_METHOD(getUUIDResult:(RCTResponseSenderBlock)callback) {
  callback(@[[NSUUID UUID].UUIDString]);
}


RCT_EXPORT_METHOD(add:(NSInteger)numA andNumB:(NSInteger)numB result:(RCTResponseSenderBlock)callback) {
  callback(@[@(numA + numB)]);
}

RCT_EXPORT_METHOD(log:(NSString *)text) {
  NSLog(@"result from js:%@", text);
}

//版本号
RCT_EXPORT_METHOD(versionBlock:(RCTResponseSenderBlock)versionStringBlock){
  NSString *version = [Tools appVersion];
  versionStringBlock(@[[NSNull null], version]);
}


//下载杂志
RCT_EXPORT_METHOD(downloadMagazine:(NSString *)currentPath){
  
  [DownloadManager downloadMagazine:currentPath];
}

//查看杂志
RCT_EXPORT_METHOD(goShowMagazine:(NSDictionary *)currentInfo){
  
  [DownloadManager goShowMenuActionWithCurrentInfoWithCurrentInfo:currentInfo];
  
}

//是否下载
RCT_EXPORT_METHOD(isDownloadMagazine:(NSString *)currentID andUserId:(NSString *)userId result:(RCTResponseSenderBlock)callback){
  
  //没有传User值但实际已经登录
  if ([User userId].length == 0 && userId.length != 0) {
    NSString *user = [User userId];
    [User setIdWithString:userId];
    if (user != userId) {
      onMain(^{
        [CacheMagazine getAllEntityFromDatebase];
      });
    }
  }
  
  onMain(^{
    BOOL isDownload = [CacheMagazine isFileExist: currentID];
    callback(@[@(isDownload)]);
  });
}

//我的离线下载数据
RCT_EXPORT_METHOD(myOfflineMagazine:(RCTResponseSenderBlock)callback){
  onMain(^{
    NSArray *dicArray = [DownloadManager getMyOfflineMagazine];
    callback(@[dicArray]);
  });
}

//删除离线下载数据
RCT_EXPORT_METHOD(deleteMagazineEntity:(NSArray *)magazineEntity result:(RCTResponseSenderBlock)callback){
  onMain(^{
    [DownloadManager deleteMagazineEntityWithMagazinesEntity:magazineEntity];
    NSArray *dicArray = [DownloadManager getMyOfflineMagazine];
    callback(@[dicArray]);
  });
}

@end
