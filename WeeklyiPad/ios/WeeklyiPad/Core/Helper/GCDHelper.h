//
//  GCD.h
//  CBNWeekly
//
//  Created by Neo on 15/7/3.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import <Foundation/Foundation.h>


extern void onMain(dispatch_block_t block);

extern void onHigh(dispatch_block_t block);

extern void onDefault(dispatch_block_t block);

extern void onBackground(dispatch_block_t block);

extern void onMyQueue(NSString *queueName, dispatch_block_t block);

@interface GCDHelper : NSObject


@end
