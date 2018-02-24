//
//  JSEventManager.m
//  WeeklyiPad
//
//  Created by Neo on 2017/8/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "JSEventManager.h"

@implementation JSEventManager
{
  BOOL hasListeners;
}

RCT_EXPORT_MODULE();

+ (instancetype)allocWithZone:(struct _NSZone *)zone{
  static JSEventManager *manager = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    manager = [super allocWithZone:zone];
  });
  return manager;
}

#pragma mark - Lifecycle
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"SubscribeResult", @"DownloadData",@"DownloadSucceed",@"DeleteMagazineData"];
}

- (void)startObserving
{
  hasListeners = true;
}

- (void)stopObserving
{
  hasListeners = false;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

// 订阅事件
- (void)subscribeResult:(BOOL)isSuccess{
  if (hasListeners) {
    [self sendEventWithName:@"SubscribeResult"
                       body:@{
                              @"result" : @(isSuccess)
                              }];
  }
}

// 查看杂志返回数据事件
- (void)downloadGoShowData:(NSArray *)data{
  if (hasListeners) {
    [self sendEventWithName:@"DownloadData"
                       body:@{
                              @"data" : data
                              }];
  }
}

// 下载完成
- (void)downloadResult:(NSDictionary *)resultDict{
  if (hasListeners) {
    [self sendEventWithName:@"DownloadSucceed"
                       body:@{
                              @"resultDict" : resultDict,
                              }];
  }
}

// 删除杂志返回数据事件
- (void)deleteMagazineData:(NSArray *)data{
  if (hasListeners) {
    [self sendEventWithName:@"DeleteMagazineData"
                       body:@{
                              @"data" : data
                              }];
  }
}

@end


