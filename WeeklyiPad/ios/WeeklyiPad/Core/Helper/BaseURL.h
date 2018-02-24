//
//  BaseURL.h
//  CBNWeekly
//
//  Created by Neo on 15/4/23.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import <Foundation/Foundation.h>

static NSString *const DeveloperAPIPath = @"http://api.cbnweek.dtcj.com/v2/";
static NSString *const ReleasedAPIPath = @"https://api.cbnweek.com/v2/";

@interface BaseURL : NSObject

+ (NSString *)APIPath;


@end
