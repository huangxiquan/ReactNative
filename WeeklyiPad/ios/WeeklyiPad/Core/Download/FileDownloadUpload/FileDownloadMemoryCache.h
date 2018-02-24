//
//  FileDownloadMemoryCache.h
//  Hugo
//
//  Created by Neo on 15/12/1.
//  Copyright © 2015年 CBN. All rights reserved.
//

#import <ESFrameworkCore/ESCache.h>

@interface FileDownloadMemoryCache : ESMemoryCache

+ (NSString *)cacheKeyForURL:(NSURL *)url;
- (NSString *)cacheKeyForURL:(NSURL *)url;

@end
