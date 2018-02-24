# 周刊ipad经典版说明文档


## 项目说明

项目只支持ios版，并且屏幕适配ipad，在iphone上无法正常显示。除了订阅以及杂志下载使用ios原生，其它的都是使用RN来写


## 环境配置

NodeJS 5.0以上版本

Xcode 8.0 以上版本

React Native的命令行工具react-native-cli

具体细节参考[RN官网(0.47版本)](http://reactnative.cn/docs/0.47/getting-started.html)


## 项目初始化

```
git clone https://github.com/TapasTech/WeeklyiPad.git

cd WeeklyiPad

react-native run-ios 或者 使用xcode直接编译运行

```

## 项目结构

```
.
├── _tests                                       // 自动化测试
├── android                                      // android原生代码
├── ios                                          // ios原生代码
├── node_modules                                 // node模块
├── ReactNative                                  // RN代码
│   ├── actions                             
│   │   ├── index.js                             // 所有redux事件类型
│   │   ├── magazine.js                          // 杂志页数据请求事件对象
│   │   ├── magazineDetail.js                    // 杂志详情页数据请求事件对象
│   │   ├── magazineDir.vue                      // 杂志目录页数据请求事件对象
│   │   └── user.js                              // 用户改变事件对象
│   ├── components                               //自定义组件    
│   │   ├── backNavigation.js                    // 返回按钮
│   │   ├── loading.js                           // 加载圈
│   │   ├── loginListener.js                     // 杂志页监听用户更新刷新state
│   │   ├── magazineItem.js                      // 杂志列表item
│   │   ├── magazineLeftMenu.js                  // 年份选择
│   │   ├── magazineRightMenu.js                 // 登录离线设置等功能入口
│   │   └── offlineItem.js                       // 离线杂志item
│   ├── function     
│   │   ├── Subscribe.js                         // 会员订阅
│   ├── images                                   //图片资源    
│   ├── network                          
│   │   ├── ApiServer.js                         // 所有登录注册接口
│   │   └── NetworkUtil.js                       // fetch封装
│   ├── pages                          
│   │   ├── forgetPassword.js                    // 忘记密码页面
│   │   ├── login.js                             // 登录页面
│   │   ├── magazine.js                          // 杂志首页
│   │   ├── magazineDetail.js                    // 杂志详情页
│   │   ├── magazineDir.js                       // 杂志目录页
│   │   ├── personalCenter.js                    // 个人中心页面
│   │   ├── registration.js                      // 注册页面
│   │   ├── setting.js                           // 设置页面
│   │   └── userWebView.js                       // 设置页面协议组件
│   ├── raw                                      //杂志详情页                          
│   ├── reducer                                                       
│   │   ├── index.js                             // 注册reducer的所有工厂函数
│   │   ├── magazine.js                          // 杂志请求成功后state数据更新
│   │   ├── magazineDetail.js                    // 杂志详情请求成功后state数据更新
│   │   ├── magazineDir.js                       // 杂志目录请求成功后state数据更新
│   │   ├── user.js                              // user改变后state数据更新
│   │   ├── forgetPassword.js                    // 忘记密码页面
│   │   └── user.js                              // user改变后state数据更新
│   ├── store                                                       
│   │   ├── DBStore.js                           // 本地存储
│   │   ├── index.js                             // 将action和reducer以及state联系在一起
│   │   └── user.js                              // user增删改查
│   ├── config.js                                //颜色、接口、事件等key value    
│   ├── DataUtil                                 //时间工具类                                          
│   ├── root                                     //navigation页面注册       
│   ├── RPC                                      //头像上传七牛 
│   └── util.js    
├── index.android.js                             // android 入口                       
├── index.ios.js                                 //ios入口              
└── setup.js                                     //入口组件，写一写需要初始化的东西
