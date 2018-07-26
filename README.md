[![Build Status](https://drone.finogeeks.club/api/badges/front-end/node-api-boilerplate/status.svg)](https://drone.finogeeks.club/front-end/node-api-boilerplate)

Node API boilerplate

## 项目
技术栈：Node v10.7+、Koa2、TSLint、Prettier、Yarn、Husky/lint-staged(Git hooks)


### 目录结构
在项目根目录下执行
```
tree -L 1 src --dirsfirst
```
```
src
├── @types            // 项目内和第三方库的 typings
├── apis              // 其它服务的 API HTTP 调用
├── config            // 不同应用环境下的配置，包括 default、dev、staging、prod
├── constants         // 常量
├── middlewares       // Koa2 自定义 middlewares
├── models            // 对象实体模型
├── routes            // Node 服务对外提供的路由，路由由 Controller + Service 组成
├── services          // 项目内部的 services  
├── app.ts            // Node 入口文件
└── global.d.ts       // 全局 typings
```


## 开发
### 运行项目
1. 安装 Yarn
    ```
    brew install yarn
    ```
2. 下载依赖
    ```
    yarn
    ```
3. 运行
    ```
    yarn dev
    ```
4. 测试
    ```
    curl -i localhost:3000/
    ```

### Lint
TSLint 规则根据需要自行考虑增减，执行 `yarn lint` 校验语法格式

#### 强制 Lint 校验
为保证 remote repo 中的代码格式风格统一，本地 `git commit` 之前 **husky** 会执行 **lint-staged** 进行 `yarn lint`，通过之后才会`commit`；按照 TSLint 规则修复语法格式问题后再提交。

**特殊情况下**，如果提交需要暂时忽略 lint 校验，在 commit 的时候可以加个参数 `--no-verify`
```
git commit -m 'xxx' --no-verify
或者使用 git alias
gcmsg 'xxx' --no-verify
```

#### TSLint Disable
有时候在某一块代码中需要禁用 TSLint，表示这块代码不需要遵守 TSLint 的某条规则，使用下面方法来禁用：

行禁用：
```
// tslint:disable-next-line[:rule1 rule2 rule3...]
code...
```

块禁用：
```
/* tslint:disable[:rule1 rule2 rule3...] */
code...
/* tslint:enable[:rule1 rule2 rule3...] */
```

参考 https://palantir.github.io/tslint/usage/rule-flags/

### Git Commit
小步提交，每次提交都只有一个主题！

遵循 Angular Commit message 规范：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

Commit message 格式：**type(scope 可选): subject**
其中 **type** 必须是下面 8 个标识之一：

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- del: 删除无用的文件或代码（扩展）
- ts: TypeScript 相关修改（扩展）

### 开发注意事项
#### 本地 Docker 测试
为保证测试环境的服务稳定，本地在 **push** 之前尽量先使用 Docker 构建镜像，测试容器服务是否正常运行。执行项目中的 `start-dockek.sh` 脚本构建运行：
```sh
./start-docker.sh
```



## Roadmap
- [ ] API Docs
- [ ] UnitTest（Jest? Mocha?）
- [ ] API Mock
- [x] TypeScript
- [ ] HTTP2

## 部署
### 对外访问
```
https://DOMAIN/api/v1/{SERVICE}/xxx
```
