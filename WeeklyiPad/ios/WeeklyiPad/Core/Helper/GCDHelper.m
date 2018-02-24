//
//  GCD.m
//  CBNWeekly
//
//  Created by Neo on 15/7/3.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import "GCDHelper.h"

inline void onMain(dispatch_block_t block)
{
    dispatch_queue_t queue = dispatch_get_main_queue();
    dispatch_async(queue, block);
}

inline void onHigh(dispatch_block_t block)
{
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0);
    dispatch_async(queue, block);
}

inline void onDefault(dispatch_block_t block)
{
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, block);
}

inline void onBackground(dispatch_block_t block)
{
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0);
    dispatch_async(queue, block);
}

inline void onMyQueue(NSString *queueName, dispatch_block_t block)
{
    const char * cQueueName = [queueName UTF8String];
    dispatch_queue_t queue = dispatch_queue_create(cQueueName, 0);
    dispatch_async(queue, block);
}


@implementation GCDHelper



@end
