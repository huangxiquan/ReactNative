//
//  HTTPRequestManager.h
//  CBNWeekly
//
//  Created by Neo on 15/4/23.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^HTTPSuccessBlock)(NSHTTPURLResponse *response, id responseObject);
typedef void (^HTTPFailureBlock)(NSHTTPURLResponse *response,id responseObject, NSError *error);

@interface HTTPRequestManager : NSObject


+(HTTPRequestManager *)shareManager;

- (void)GET:(NSString *)URLString
     parameters:(id)parameters
        success:(HTTPSuccessBlock)success
        failure:(HTTPFailureBlock)failure;

- (void)POST:(NSString *)URLString
    usingBaseURL:(BOOL)isUsing
      parameters:(id)parameters
         success:(HTTPSuccessBlock)success
         failure:(HTTPFailureBlock)failure;

- (void)POST:(NSString *)URLString
      parameters:(id)parameters
         success:(HTTPSuccessBlock)success
         failure:(HTTPFailureBlock)failure;

- (void)PUT:(NSString *)URLString
     parameters:(id)parameters
        success:(HTTPSuccessBlock)success
        failure:(HTTPFailureBlock)failure;

- (void)PATCH:(NSString *)URLString
   parameters:(id)parameters
      success:(HTTPSuccessBlock)success
      failure:(HTTPFailureBlock)failure;

- (void)DELETE:(NSString *)URLString
        parameters:(id)parameters
           success:(HTTPSuccessBlock)success
           failure:(HTTPFailureBlock)failure;


- (void)cancelAllOperations;
- (void)cancelHTTPOperationsWithMethod:(NSString *)method
                                  path:(NSString *)path;

@end
