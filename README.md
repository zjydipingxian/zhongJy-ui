# JY-UI

一个基于 Vue 3 的组件库，使用 TypeScript 开发。

## 特性

- 🚀 Vue 3 Composition API
- 💪 完整的 TypeScript 支持
- 📦 支持按需引入
- 🔥 提供组合式 API Hooks
- ✅ 单元测试覆盖
- 📚 自动生成文档
- 🛠️ CLI 工具支持

## 功能介绍

### 1. 组件系统

- 基于 Vue 3 SFC 开发
- BEM 命名规范
- 支持 TypeScript 类型推导
- 组件自动注册
- 支持按需引入

### 2. 工程化工具

- `pnpm cli create` - 自动创建组件模板
  - 生成组件目录结构
  - 创建组件文件
  - 自动注册到入口
  - 生成测试文件
  - 更新类型声明

### 3. 样式系统

- SCSS 变量系统
- BEM 命名规范
- 主题定制能力
- 按需加载样式

### 4. 测试系统

- Vitest 单元测试
- Vue Test Utils 组件测试
- 测试覆盖率报告
- 支持 UI 界面查看测试结果

### ❎ 5. 构建系统 （未完成）

- Vite 构建
- 支持多种输出格式 (ES/CJS/UMD)
- 自动生成类型声明
- Tree-shaking 优化

### 6. 开发工具

- TypeScript 支持
- ESLint 代码检查
- Prettier 代码格式化
- Husky Git Hooks
- Commitlint 提交规范
- Commitizen 提交助手

### 7. 版本发布

- Changesets 版本管理
- 自动生成 CHANGELOG
- 自动发布到 NPM

## 开发指南

### 环境准备

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
pnpm install
```

### 开发命令

启动开发环境

```bash
pnpm dev
```

创建新组件

```bash
pnpm cli
```

运行测试

```bash
pnpm test
```

## 发布流程

我们使用 [changesets](https://github.com/changesets/changesets) 来管理版本和发布。

### 1. 记录变更

```bash
pnpm changeset
```

这会启动一个交互式命令行，引导你：

- 选择要发布的包
- 选择版本类型 (major/minor/patch)
- 写入变更说明

例如：

```
$ pnpm changeset
🦋  Which packages would you like to include? ...
✔ jy-ui
✔ @jy-ui/components
✔ @jy-ui/hooks

🦋  Which type of change is this for jy-ui? ...
✔ patch
✔ minor
✔ major

🦋  What changes should go in the changelog?
✔ Added new Icon component
```

### 2. 运行发布命令：

```bash
pnpm pub
```
