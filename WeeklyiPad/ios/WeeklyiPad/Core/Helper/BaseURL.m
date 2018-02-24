//
//  BaseURL.m
//  Hugo
//
//  Created by Neo on 15/4/23.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import "BaseURL.h"


@implementation BaseURL

+ (NSString *)APIPath
{
#ifdef DEBUG
    if ([Tools isReleasedBaseURL]) {
        return ReleasedAPIPath;
    }
    return DeveloperAPIPath;
#else
    return ReleasedAPIPath;
#endif
}

@end
