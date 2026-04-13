# Coze Studio 前端架构文档

## 项目概述

Coze Studio 前端是基于 Rush.js 的 monorepo 项目，包含 135+ 个前端包，采用 Rsbuild（Rspack-based）作为构建工具，React 18 + TypeScript + Semi Design + Tailwind CSS 作为技术栈。

## 目录结构

```
frontend/
├── apps/                     # 应用入口（唯一主应用）
│   └── coze-studio/          # 主应用（@coze-studio/app）
├── packages/                 # 共享包（monorepo 核心）
├── config/                   # 共享构建配置
│   ├── eslint-config/        # ESLint 配置
│   ├── postcss-config/       # PostCSS 配置
│   ├── rsbuild-config/       # Rsbuild 基础配置
│   ├── tailwind-config/      # Tailwind 配置
│   ├── ts-config/            # TypeScript 配置
│   └── vitest-config/        # Vitest 测试配置
├── infra/                    # 基础设施（flags 开发工具等）
├── scripts/                  # 构建脚本
└── Dockerfile                # 前端容器化配置
```

## packages 目录说明

### arch/ - 基础架构层
底层公共工具，包名以 `@coze-arch/*` 开头：
- `bot-env` / `bot-env-adapter`：环境变量（`IS_OVERSEA`、`IS_BOE` 等）
- `bot-flags`：Feature Flag 功能开关
- `bot-hooks`：公共 React Hooks
- `i18n`：国际化（支持 `zh-CN` / `en`）
- `web-context`：路由上下文
- `bot-utils` / `utils`：工具函数

### common/ - 通用业务包
跨功能域复用的组件和工具。

### components/ - UI 组件库
- `bot-icons`：所有图标（品牌图标、菜单图标、Logo 等）
- `bot-semi`：Semi Design 封装组件
- `resource-tree`：资源树组件
- `virtual-list`：虚拟列表

### foundation/ - 基础业务层
核心业务，包名以 `@coze-foundation/*` 开头：
- `layout`：全局侧边栏布局组件（`GlobalLayout`、`GlobalLayoutSider`）
- `global-adapter`：全局布局业务适配
- `global-store`：全局状态管理
- `account-adapter` / `account-ui-adapter`：账户/登录适配
- `space-store` / `space-ui-adapter`：工作空间状态和 UI

### agent-ide/ - Agent IDE 功能包
涵盖 Agent 配置、聊天区域、插件、Prompt、工作流卡片等 40+ 子包。

### workflow/ - 工作流功能包
包含工作流核心（`base`、`core`、`framework`）、节点（`nodes`）、画布（`fabric-canvas`）等。

### project-ide/ - Project IDE 功能包
包含 `main`、`ui-adapter`、`view` 等子包。

### data/ - 数据层
知识库、记忆等数据相关功能。

### community/ - 社区/探索页
探索页、模板等相关功能。

### devops/ - DevOps 工具
调试、测试集等开发运维工具。

### studio/ - Studio 核心业务
Studio 核心功能。

## 应用入口 (apps/coze-studio/)

前端唯一应用入口，包名 `@coze-studio/app`：

```
apps/coze-studio/
├── assets/
│   └── favicon.png           # 网站图标（已废弃，建议使用 packages 中的图标）
├── src/
│   ├── index.tsx             # 入口文件（React 挂载点）
│   ├── app.tsx               # App 根组件（RouterProvider）
│   ├── layout.tsx            # 全局布局组件
│   ├── routes/
│   │   ├── index.tsx         # 路由配置（createBrowserRouter）
│   │   └── async-components.tsx  # 懒加载组件
│   └── pages/                # 页面组件
├── index.html                # HTML 模板
├── rsbuild.config.ts         # 主构建配置（重要配置文件）
├── tailwind.config.ts        # Tailwind 配置
└── package.json
```

## 关键配置位置

### 网站标题配置
**文件**: `frontend/apps/coze-studio/rsbuild.config.ts`
```typescript
html: {
  title: '智能问答后台',  // 网站标题
  favicon: '../../packages/components/bot-icons/src/assets/icons/Data-Development-Logo.png',
  template: './index.html',
}
```

### favicon 图标
**文件**: `frontend/packages/components/bot-icons/src/assets/icons/`
- `Data-Development-Logo.png` - 当前使用的 favicon
- `Data-Development-Logo.svg` - SVG 版本
- `brand-round.svg` - 圆形品牌图标
- `icon-menu-logo-text.svg` / `icon-menu-logo-text-cn.svg` - Logo 文字图标

### 侧边栏 Logo
**定义位置**: `frontend/packages/components/bot-icons/src/index.tsx`
**使用位置**: `frontend/packages/foundation/layout/src/components/global-layout/component/sider.tsx`

## 前端入口和路由

### 入口文件
`frontend/apps/coze-studio/src/index.tsx`:
1. 拉取 Feature Flags（`pullFeatureFlags`）
2. 初始化 i18n（默认中文 `zh-CN`）
3. 动态加载 MD Box 样式
4. 挂载 React 到 `#root`

### 路由配置
**文件**: `frontend/apps/coze-studio/src/routes/index.tsx`

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | 重定向到 `/space` | 首页 |
| `/sign` | `LoginPage` | 登录页 |
| `/space/:space_id/develop` | `Develop` | 项目开发页 |
| `/space/:space_id/bot/:bot_id` | `AgentIDE` | Agent IDE |
| `/space/:space_id/bot/:bot_id/publish` | `AgentPublishPage` | Agent 发布页 |
| `/space/:space_id/project-ide/:project_id/*` | `ProjectIDE` | Project IDE |
| `/space/:space_id/library` | `Library` | 资源库 |
| `/work_flow` | `WorkflowPage` | 工作流页面 |
| `/explore/plugin` | `ExplorePluginPage` | 探索-插件市场 |
| `/explore/template` | `ExploreTemplatePage` | 探索-模板 |

## 包命名规范

| 前缀 | 说明 | 示例 |
|------|------|------|
| `@coze-arch/*` | 基础架构层 | `@coze-arch/bot-env`, `@coze-arch/i18n` |
| `@coze-foundation/*` | 基础业务层 | `@coze-foundation/layout`, `@coze-foundation/account-adapter` |
| `@coze-studio/*` | Studio 业务 | （保留） |
| `*-adapter` | 适配器模式 | `bot-env-adapter`, `global-adapter` |
| `*-base` / `*-core` | 基础/核心模块 | `workflow-base`, `workflow-core` |

## 开发命令

```bash
# 安装依赖
rush update

# 构建
rush build
rush build -o @coze-studio/app

# 开发
cd frontend/apps/coze-studio
npm run dev

# 测试
rush test
rush lint
```

## 层级覆盖要求

| 层级 | 覆盖要求 |
|------|---------|
| Level 1 (arch/) | 80% 覆盖，90% 增量 |
| Level 2 (common/) | 30% 覆盖，60% 增量 |
| Level 3-4 | 0% 覆盖（灵活） |