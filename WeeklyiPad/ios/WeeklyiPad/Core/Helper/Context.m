//
//  Context.m
//  CBNWeekly
//
//  Created by Neo on 15/4/22.
//  Copyright (c) 2015年 Neo. All rights reserved.
//

#import "Context.h"
#import "AFNetworkActivityIndicatorManager.h"

@implementation Context

static NSString * const kCBNWeeklyStoreName = @"Weekly.sqlite";
static Context *shareContext;

+ (Context *)shareContext
{
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        shareContext = [[self alloc] init];
    });
    return shareContext;
}



+ (void)setAppBase
{
    [self copyDefaultStoreIfNecessary];
    [MagicalRecord setLoggingLevel:MagicalRecordLoggingLevelDebug];
    //[MagicalRecord setupCoreDataStackWithStoreNamed:kCBNWeeklyStoreName];
    //[NSPersistentStoreCoordinator MR_coordinatorWithAutoMigratingSqliteStoreNamed:kCBNWeeklyStoreName];
    [MagicalRecord setupCoreDataStackWithAutoMigratingSqliteStoreNamed:kCBNWeeklyStoreName];
}

+ (void)copyDefaultStoreIfNecessary
{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSURL *storeURL = [NSPersistentStore MR_urlForStoreName:kCBNWeeklyStoreName];
    
    // If the expected store doesn't exist, copy the default store.
    if (![fileManager fileExistsAtPath:[storeURL path]])
    {
        NSString *defaultStorePath = [[NSBundle mainBundle] pathForResource:[kCBNWeeklyStoreName stringByDeletingPathExtension] ofType:[kCBNWeeklyStoreName pathExtension]];
        
        if (defaultStorePath)
        {
            NSError *error;
            BOOL success = [fileManager copyItemAtPath:defaultStorePath toPath:[storeURL path] error:&error];
            if (!success)
            {
                NSLog(@"Failed to install default recipe store");
            }
        }
    }
}


@end
