//
//  FileDownloadClient.h
//  Hugo
//
//  Created by Neo on 15/12/1.
//  Copyright © 2015年 CBN. All rights reserved.
//



#import "AFURLSessionManager.h"

typedef void (^ProgressBlock)(CGFloat progress);
typedef void (^FTDownloadCompletionHandler)(NSString *filePath);
typedef void (^FailureBlock)(NSError *error);

extern NSString *FileDirectory(void);

@interface FileDownloadClient : AFURLSessionManager

+(instancetype)shareManager;

- (void)downloadFile:(NSURL *)url
             success:(FTDownloadCompletionHandler)success
             failure:(FailureBlock)failure
            progress:(ProgressBlock)progress;

- (void)downloadFile:(NSURL *)url
            fileType: (NSString *)fileType
             success:(FTDownloadCompletionHandler)success
             failure:(FailureBlock)failure
            progress:(ProgressBlock)progress;

- (void)resumeDownLoadFileRequest:(NSURL *)url
                          success:(void (^)(NSDictionary *result))success
                          failure:(FailureBlock)failure
                downProgressBlock:(ProgressBlock)progressBlock;

//通过URL返回本地文件路径
+ (NSString *)zipFilePathByURL:(NSString *)urlString;

//移除下载任务
+ (void)removeTaskForKey:(NSURL *)url;

- (void)clearCache;

@end
