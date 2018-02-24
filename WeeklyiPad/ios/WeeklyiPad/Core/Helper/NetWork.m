//
//  NetWork.m
//  CBNWeekly
//
//  Created by Neo on 15/6/25.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import "NetWork.h"

@interface NetWork (private)

-(void)reachabilityChanged:(NSNotification*)note;

@end

@interface NetWork()

@property (nonatomic, strong) Reachability *reachability;

@end

@implementation NetWork

+ (NetWork *)sharedInstance
{
    static NetWork *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [NetWork new];
    });
    return sharedInstance;
}

- (id)init
{
    if (self = [super init]) {
        self.reachability = [Reachability reachabilityForInternetConnection];
        [self.reachability startNotifier];
        self.isWifi = self.reachability.currentReachabilityStatus == ReachableViaWiFi;
        self.isConnect = self.reachability.currentReachabilityStatus != NotReachable;
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(reachabilityChanged:)
                                                     name:kReachabilityChangedNotification
                                                   object:nil];
    }
    
    return self;
}

- (void)reachabilityChanged:(NSNotification *)note
{
    _isWifi = self.reachability.currentReachabilityStatus == ReachableViaWiFi;
    self.isConnect = self.reachability.currentReachabilityStatus != NotReachable;
}

@end
