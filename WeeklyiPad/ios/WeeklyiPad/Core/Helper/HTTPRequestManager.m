//
//  HTTPRequestManager.m
//  CBNWeekly
//
//  Created by Neo on 15/4/23.
//  Copyright (c) 2015年 CBN. All rights reserved.
//

#import "HTTPRequestManager.h"
#import <AFNetworking.h>

@interface HTTPRequestManager() <NSURLSessionDelegate>

@property (nonatomic, strong) NSURLSession *session;
@property (nonatomic, strong) NSOperationQueue *sessionQueue;

@end

@implementation HTTPRequestManager

static HTTPRequestManager *_manager = nil;

+(HTTPRequestManager *)shareManager
{
  static dispatch_once_t pred;
  dispatch_once(&pred, ^{
    _manager = [self new];
  });
  return _manager;
}

- (NSURLSession *)session
{
  if (!_session) {
    NSURLSessionConfiguration *cfg = [NSURLSessionConfiguration defaultSessionConfiguration];
    cfg.timeoutIntervalForResource = 15;
    _session = [NSURLSession sessionWithConfiguration:cfg
                                             delegate:self
                                        delegateQueue:self.sessionQueue];
  }
  return _session;
}

- (NSOperationQueue *)sessionQueue
{
  if (!_sessionQueue) {
    _sessionQueue = [[NSOperationQueue alloc] init];
    _sessionQueue.maxConcurrentOperationCount = 3;
  }
  return _sessionQueue;
}

//MARK:- JSONFormatRequest
- (void)GET:(NSString *)URLString
 parameters:(id)parameters
    success:(HTTPSuccessBlock)success
    failure:(HTTPFailureBlock)failure
{
  NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"GET" usingBaseURL:true URLString:URLString parameters:parameters success:success failure:failure];
  [dataTask resume];
}

- (void)POST:(NSString *)URLString
  parameters:(id)parameters
     success:(HTTPSuccessBlock)success
     failure:(HTTPFailureBlock)failure
{
  NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"POST" usingBaseURL:true URLString:URLString parameters:parameters success:success failure:failure];
  [dataTask resume];
}

- (void)POST:(NSString *)URLString
usingBaseURL:(BOOL)isUsing
  parameters:(id)parameters
     success:(HTTPSuccessBlock)success
     failure:(HTTPFailureBlock)failure
{
  NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"POST" usingBaseURL:isUsing URLString:URLString parameters:parameters success:success failure:failure];
  [dataTask resume];
}

- (void)PUT:(NSString *)URLString
 parameters:(id)parameters
    success:(HTTPSuccessBlock)success
    failure:(HTTPFailureBlock)failure
{
  NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"PUT" usingBaseURL:true URLString:URLString parameters:parameters success:success failure:failure];
  [dataTask resume];
}


- (void)PATCH:(NSString *)URLString
   parameters:(id)parameters
      success:(HTTPSuccessBlock)success
      failure:(HTTPFailureBlock)failure
{
  NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"PATCH" usingBaseURL:true URLString:URLString parameters:parameters success:success failure:failure];
  [dataTask resume];
}

- (void)DELETE:(NSString *)URLString
    parameters:(id)parameters
       success:(HTTPSuccessBlock)success
       failure:(HTTPFailureBlock)failure
{
  NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"DELETE" usingBaseURL:true URLString:URLString parameters:parameters success:success failure:failure];
  [dataTask resume];
}

- (NSURLSessionDataTask *)dataTaskWithHTTPMethod:(NSString *)method
                                    usingBaseURL:(BOOL)isUsing
                                       URLString:(NSString *)URLString
                                      parameters:(id)parameters
                                         success:(HTTPSuccessBlock)success
                                         failure:(HTTPFailureBlock)failure
{
  if (!URLString) return nil;
  NSString *url = @"";
  if (isUsing) {
    url = [[BaseURL APIPath] stringByAppendingString:URLString];
  }else{
    url = URLString;
  }
  NSMutableURLRequest *request = [[AFJSONRequestSerializer serializerWithWritingOptions:NSJSONWritingPrettyPrinted] requestWithMethod:method URLString:url parameters:parameters error:nil];
  [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
  [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
  [self fillAuthorizationHeader:request];
  //添加v2请求头
  //[request setValue:[NSString stringWithFormat:@"v2"] forHTTPHeaderField:@"Accept-Version"];
  NSURLSessionDataTask *task = [self.session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
    dispatch_async(dispatch_get_main_queue(), ^{
      NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse*)response;
      if (httpResponse && data) {
        NSError *error = nil;
        id responseObject = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
        if (![self isSuccessCode:httpResponse.statusCode]) {
          if (failure) {
            failure(httpResponse,responseObject, error);
          }
          if (error) {
            NSLog(@"%@\nurl为-————————>%@", error,url);
          }
        } else {
          if (success){
            success((NSHTTPURLResponse *)response, responseObject);
          } else {
            success((NSHTTPURLResponse *)response, nil);
          }
        }
      }
    });
  }];
  
  return task;
}

- (void)cancelAllOperations
{
  // [_requestManager.operationQueue cancelAllOperations];
}
/*
 - (void)cancelHTTPOperationsWithMethod:(NSString *)method
 path:(NSString *)path
 {
 for (NSOperation *operation in [_requestManager.operationQueue operations]) {
 if (![operation isKindOfClass:[AFHTTPRequestOperation class]]) {
 continue;
 }
 
 BOOL hasMatchingMethod = !method || [method isEqualToString:[[(AFHTTPRequestOperation *)operation request] HTTPMethod]];
 BOOL hasMatchingPath = [[[[(AFHTTPRequestOperation *)operation request] URL] path] isEqual:path];
 
 if (hasMatchingMethod && hasMatchingPath) {
 [operation cancel];
 }
 }
 }
 
 - (void)requestError:(AFHTTPRequestOperation *)operation
 {
 NSString *message = [[operation responseObject] objectForKey:@"message"];
 NSString *errorCode = [[operation responseObject] objectForKey:@"errors"];
 debugLog(@"errorCode =%@ /n 请求出错%@",errorCode,message);
 }*/

- (BOOL)isSuccessCode:(NSInteger)statusCode{
  if (statusCode >= 200 && statusCode <=299)
    return true;
  return false;
}

//MARK:- 填充请求头
- (void)fillAuthorizationHeader:(NSMutableURLRequest *)request{
  if ([User mine].token) {
    [request setValue:[User mine].token forHTTPHeaderField:@"Authorization"];
  }
}

- (void)setAuthorizationHeader:(AFHTTPRequestSerializer *)requestSerializer{
  if ([User mine].token) {
    [requestSerializer setValue:[User mine].token forHTTPHeaderField:@"Authorization"];
  }
}

@end
