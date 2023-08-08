---
title: 常用 git 指令
date: 2023-04-03 16:38:00
categories:
  - tool
---

## 基础操作

```txt
git clone *** // 克隆
git init // 初始化
git status // 查看本地文件改动
git stash // 将本地文件加入暂存区
git stash pop // 将暂存区文件恢复
git checkout . // 恢复所改动文件  git checkout /src 、 git checkout Readme.md
git add . // 添加本地所有修改文件 git add Readme.md、git add /src
git commit -m "提交信息" // 推送到本地仓库
git pull // 拉取
git push // 推送
```

## 分支操作

```txt
git branch // 查看本地分支
git branch -a // 查看远程所有分支
git branch 分支名 // 创建分支
git checkout 分支名 // 切换分支
git checkout -b 分支名 // 创建一个分支并切换到对应分支
git branch -D // 删除分支
git merge 分支名 // 当前分支和 合并分支进行代码合并
```

## 代码回退

```txt
git reflog 查看记录

git reset [ --soft | --mixed | --hard ] 记录id

--soft 撤销 commit 不撤销 add
--mixed 撤销 commit 和 add 保留修改代码
--hard 删除工作空间改动代码，撤销commit，撤销git add .

```

## git revert <commit_id>

用一次新的 commit 来回滚之前的 commit,此次提交前的 commit -m 依然存在

## 修改 commit 注释

```txt
git commit --amend
```

## 日志

```txt
git log 查看提交记录

git reflog 查看本地所有提交记录
```

## 回退到之前的提交记录后，不小心 git push -f 后，中间区域代码没有了，怎么办？

```txt
这种情况下，远程和 git log 都无法查看恢复
采用 git reflog 可以查看本地所有的改动记录，撤销本地上一次提交就可以。
版本回退采用 git revert
```

## git 提交规范

```txt
feat：新增功能（feature）
fix：修复补丁（bug）
docs：修订文档，如 Readme, Change Log, Contribute 等
refactor：代码重构，未新增任何功能和修复任何 bug
style： 仅调整空格、格式缩进等（不改变代码逻辑的变动）
perf：优化相关，改善性能和体验的修改
test：测试用例的增加/修改
chore：非 src 和 test 的修改
merge：合并分支或冲突等
revert： 回滚到上一个版本
build：改变构建流程，新增依赖库、工具等（例如 webpack、maven 修改）
ci：自动化流程配置修改
```

## merge

```txt
// 普通合并
git commit -m "Merge branch 'other_branch' into dev"
// 只合并一次提交记录
git merge --squash other_branch
```

## stash

```txt
// 将代码加入暂存区
git stash
// 查看暂存区
git stash list
// 应用并删除最后一条记录
git stash pop
// 应用某条记录
git stash apply @stahs{0}
// 删除记录
git stash clear
```
