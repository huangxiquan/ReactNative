//
//  FileDownloadMemoryCache.m
//  Hugo
//
//  Created by Neo on 15/12/1.
//  Copyright © 2015年 CBN. All rights reserved.
//


#import "FileDownloadMemoryCache.h"

@implementation FileDownloadMemoryCache

ES_SINGLETON_IMP_AS(sharedCache, gSharedFileDownloadClientMemoryCache);

- (instancetype)init
{
        self = [super init];
        if (self) {
                ESWeakSelf;
                [self addNotification:UIApplicationDidReceiveMemoryWarningNotification handler:^(NSNotification *notification, NSDictionary *userInfo) {
                        ESStrongSelf;
                        [_self removeAllObjects];
                }];
        }
        return self;
}

+ (NSString *)cacheKeyForURL:(NSURL *)url
{
        return url.absoluteString.md5Hash;
}

- (NSString *)cacheKeyForURL:(NSURL *)url
{
        return [self.class cacheKeyForURL:url];
}

@end