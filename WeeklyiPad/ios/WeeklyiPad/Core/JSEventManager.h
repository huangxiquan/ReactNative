//
//  JSEventManager.h
//  WeeklyiPad
//
//  Created by Neo on 2017/8/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface JSEventManager : RCTEventEmitter<RCTBridgeModule>

- (void)subscribeResult:(BOOL)isSuccess;
- (void)downloadGoShowData:(NSArray *)data;
- (void)downloadResult:(NSDictionary *)resultDict;
- (void)deleteMagazineData:(NSArray *)data;

@end
