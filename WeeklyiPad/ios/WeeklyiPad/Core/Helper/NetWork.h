//
//  NetWork.h
//  CBNWeekly
//
//  Created by Neo on 15/6/25.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import "Reachability.h"

@interface NetWork : NSObject

+ (NetWork *)sharedInstance;

@property (nonatomic, assign) BOOL isConnect;//是否联网
@property (nonatomic, assign) BOOL isWifi;

@end
