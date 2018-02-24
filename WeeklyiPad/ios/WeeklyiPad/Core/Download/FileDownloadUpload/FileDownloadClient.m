//
//  FileDownloadClient.m
//  Hugo
//
//  Created by Neo on 15/12/1.
//  Copyright © 2015年 CBN. All rights reserved.
//


#import "FileDownloadClient.h"
#import "FileDownloadMemoryCache.h"



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark -

#define kFolderName @"OfflineMagazine"

@interface FileDownloadClient()

@property (nonatomic,strong) NSMutableDictionary *resumeQueueKeys;
@property (nonatomic,strong) NSMutableArray *downloadingPaths;

@end

@implementation FileDownloadClient

static FileDownloadClient *_sharedFileDownloadClient = nil;
+ (instancetype)shareManager
{
    static dispatch_once_t pred;
    dispatch_once(&pred, ^{
        _sharedFileDownloadClient = [[self alloc] initWithSessionConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
        _sharedFileDownloadClient.resumeQueueKeys = [NSMutableDictionary dictionary];
        _sharedFileDownloadClient.downloadingPaths = [NSMutableArray array];
        [[NSNotificationCenter defaultCenter] addObserver:_sharedFileDownloadClient selector:@selector(applicationWillTerminate) name:UIApplicationWillTerminateNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:_sharedFileDownloadClient selector:@selector(applicationDidFinishLaunching) name:UIApplicationDidFinishLaunchingNotification object:nil];
        
    });
    return _sharedFileDownloadClient;
}

- (void)applicationDidFinishLaunching{
    NSArray *array = [[NSUserDefaults standardUserDefaults] valueForKey:@"KDownloadingPaths"];
    if (array){
        _downloadingPaths = [NSMutableArray arrayWithArray:array];
    }
    for (NSURL *url in _downloadingPaths) {
        [self resumeDownLoadFileRequest:url success:nil failure:nil downProgressBlock:nil];
    }
}

- (void)applicationWillTerminate{
    [[NSUserDefaults standardUserDefaults] setObject:self.downloadingPaths forKey:@"KDownloadingPaths"];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)applicationWillEnterForeground{
    
}


- (void)downloadFile:(NSURL *)url
             success:(FTDownloadCompletionHandler)success
             failure:(FailureBlock)failure
            progress:(ProgressBlock)progress
{
    [self downloadFile:url fileType:@"" success:success failure:failure progress:progress];
}


- (void)downloadFile:(NSURL *)url
            fileType: (NSString *)fileType
             success:(FTDownloadCompletionHandler)success
             failure:(FailureBlock)failure
            progress:(ProgressBlock)progress
{
    
    if (![url isKindOfClass:[NSURL class]])
        return;
    
    // Check memory cache
    FileDownloadMemoryCache *memoryCache = [FileDownloadMemoryCache sharedCache];
    NSString *cacheKey = [memoryCache cacheKeyForURL:url];
    id cachedObject = [memoryCache objectForKey:cacheKey];
    if (cachedObject) {
        if (progress)
            progress(1.f);
        if (success)
            success(cachedObject);
        return;
    }
    
    // Check disk cache
    NSString *cacheFilePath = FileCacheFilePath(url,fileType);
    NSString *zipFilePath = cacheFilePath;
    if ([zipFilePath hasSuffix:@".zip"]){
        zipFilePath = [zipFilePath componentsSeparatedByString:@".zip"].firstObject;
    }
    if ([[NSFileManager defaultManager] fileExistsAtPath:zipFilePath]) {
        [memoryCache setObject:cacheFilePath forKey:cacheKey block:nil];
        ESDispatchAsyncOnMainThread(^{
            if (progress)
                progress(1.f);
            if (success)
                success(cacheFilePath);
        });
        
        return;
    }
    
    // Check queue
    [self downLoadFileRequest:url
                      success:^(NSDictionary *result){
                          // 拷贝本地文件到缓存目标位置
                          NSURL *filePath = (NSURL *)result[@"filePath"];
                          [[NSFileManager defaultManager] moveItemAtPath:filePath.path toPath:cacheFilePath error:NULL];
                          success(cacheFilePath);
                      }
                      failure:^(NSError *error){
                          if(failure)
                              failure(error);
                      }
            downProgressBlock:progress];
}


- (void)downLoadFileRequest:(NSURL *)url
                    success:(void (^)(NSDictionary *result))success
                    failure:(FailureBlock)failure
          downProgressBlock:(ProgressBlock)progressBlock
{
    
    if (!_resumeQueueKeys[url]){
        NSURLRequest *request = [NSURLRequest requestWithURL:url];
        NSURLSessionDownloadTask *downloadTask = [self downloadTaskWithRequest:request progress:^(NSProgress * _Nonnull downloadProgress) {
            progressBlock(downloadProgress.fractionCompleted);
            NSLog(@"Progress--->%f", downloadProgress.fractionCompleted);
        } destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
            NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
            NSURL *urlPath = [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
            if (![_downloadingPaths containsObject:urlPath]) {
                [_downloadingPaths addObject:urlPath];
            }
            return urlPath;
        } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
            if (error) {
                //if (error.code == NSURLErrorNetworkConnectionLost)
                [_resumeQueueKeys removeObjectForKey:url];
                debugLog("DownloadClient:网络连接异常");
                failure(error);
            }else{
                [_downloadingPaths removeObject:filePath];
                success(@{@"filePath":filePath});
            }
        }];
        
        [downloadTask resume];
        _resumeQueueKeys[url] = downloadTask;
    }else{
        NSURLSessionDownloadTask *task = _resumeQueueKeys[url];
        if (task.state == NSURLSessionTaskStateSuspended) {
            [task resume];
        }
    }
}


- (void)resumeDownLoadFileRequest:(NSURL *)url
                          success:(void (^)(NSDictionary *result))success
                          failure:(FailureBlock)failure
                downProgressBlock:(ProgressBlock)progressBlock
{
    
    if (!_resumeQueueKeys[url]){
        
        NSData *data = [NSData dataWithContentsOfURL:url];
        NSURLSessionDownloadTask *downloadTask = [self downloadTaskWithResumeData:data progress:^(NSProgress * _Nonnull downloadProgress) {
            progressBlock(downloadProgress.fractionCompleted);
            NSLog(@"Progress--->%f", downloadProgress.fractionCompleted);
        } destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
//            NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
//            NSURL *urlPath = [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
//            if (![_downloadingPaths containsObject:urlPath]) {
//                [_downloadingPaths addObject:urlPath];
//            }
            return url;
        } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
            if (error) {
                //if (error.code == NSURLErrorNetworkConnectionLost)
                [_resumeQueueKeys removeObjectForKey:url];
//                debuglog("DownloadClient:网络连接异常");
                failure(error);
            }else{
                [_downloadingPaths removeObject:filePath];
                success(@{@"filePath":filePath});
            }
        }];
        
        [downloadTask resume];
        _resumeQueueKeys[url] = downloadTask;
    }else{
        NSURLSessionDownloadTask *task = _resumeQueueKeys[url];
        if (task.state == NSURLSessionTaskStateSuspended) {
            [task resume];
        }
    }
}


+ (NSString *)zipFilePathByURL:(NSString *)urlString{
    NSURL *url = [[NSURL alloc] initWithString:[urlString normalURLString]];
    FileDownloadMemoryCache *memoryCache = [FileDownloadMemoryCache sharedCache];
    NSString *cacheKey = [memoryCache cacheKeyForURL:url];
    id cachedObject = [memoryCache objectForKey:cacheKey];
    if (cachedObject) {
        return cachedObject;
    }
    
    // Check disk cache
    NSString *zipFilePath = FileCacheFilePath(url,@"zip");
    zipFilePath = [zipFilePath componentsSeparatedByString:@".zip"].firstObject;
    if ([[NSFileManager defaultManager] fileExistsAtPath:zipFilePath]) {
        return zipFilePath;
    }
    return nil;
}


NSString *FileCacheFilePath(NSURL *url,NSString *type)
{
    if ([url isFileURL]) {
        return url.path;
    }
    return [FileDirectory() appendPathComponent:FileCacheName(url,type)];
    //return [FileDirectory() appendPathComponent:[url.absoluteString md5Hash]];
}

NSString *FileCacheName(NSURL *url,NSString *type)
{
    return [NSString stringWithFormat:@"%@.%@",[url.absoluteString md5Hash],type];
}

NSString *FileDirectory(void)
{
    static NSString *__gFileDirectory = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        __gFileDirectory = [DOCUMENT_FOLDER appendPathComponent:kFolderName];
        ESTouchDirectory(__gFileDirectory);
    });
    return __gFileDirectory;
}

- (void)clearCache
{
    NSError *error;
    [[NSFileManager defaultManager] removeItemAtPath:FileDirectory() error:&error];
    [[FileDownloadMemoryCache sharedCache] removeAllObjects];
    NSString *__gFileDirectory = [DOCUMENT_FOLDER appendPathComponent:kFolderName];
    ESTouchDirectory(__gFileDirectory);
    if (error)
    {
        debugLog(@"%s  %@",__func__,error);
    }
}

+ (void)removeTaskForKey:(NSURL *)url{
    if([FileDownloadClient shareManager].resumeQueueKeys[url] != nil){
        [[FileDownloadClient shareManager].resumeQueueKeys removeObjectForKey:url];
    }
}

@end
