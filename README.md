# Job Posting Website

一个基于 Nuxt 4 构建的招聘网站示例项目，支持职位浏览、职位发布、职位申请、登录鉴权和个人控制台等能力。项目采用前后端一体化开发方式，页面、服务端 API、鉴权和数据库模型都在同一仓库中维护。

## 技术栈

- `Nuxt 4`：应用框架，负责页面路由、SSR/全栈能力与构建。
- `Vue 3`：前端视图层。
- `TypeScript`：前后端统一类型开发。
- `@nuxt/ui` + `Tailwind CSS 4`：页面组件与样式体系。
- `Nitro Server`：服务端 API 与任务能力。
- `better-auth` + `@nuxtjs/better-auth`：登录鉴权与会话管理。
- `GitHub OAuth`：第三方登录提供方。
- `Prisma` + `@prisma/adapter-mariadb`：数据库访问与 ORM。
- `MySQL / MariaDB`：业务数据存储。
- `date-fns`：时间格式化展示。

## 核心功能

- 职位列表：支持按关键字、职位类型、地点筛选职位。
- 职位详情：查看职位描述、薪资、发布时间和发布者信息。
- GitHub 登录：用户可通过 GitHub 进行登录。
- 发布职位：登录后可创建新的职位信息。
- 申请职位：登录后可对职位发起申请，并避免重复申请。
- 个人控制台：查看自己发布的职位与已投递的申请记录。
- 接口鉴权：除公开接口外，其余 API 统一经过服务端鉴权中间件保护。

## 项目结构

```text
.
├── app/                    # Nuxt 应用目录
│   ├── components/         # 通用组件，如导航、申请按钮
│   ├── layouts/            # 页面布局
│   ├── middleware/         # 前端路由鉴权中间件
│   └── pages/              # 页面路由：职位、登录、控制台等
├── server/
│   ├── api/                # 服务端 API
│   ├── middleware/         # 服务端鉴权中间件
│   ├── tasks/              # Nitro 定时任务示例
│   └── utils/              # 数据库与响应工具
├── prisma/
│   ├── model/              # Prisma 模型拆分定义
│   ├── migrations/         # 数据库迁移文件
│   └── schema.prisma       # Prisma 入口 schema
├── nuxt.config.ts          # Nuxt 配置
└── package.json            # 脚本与依赖
```

## 环境要求

- `Node.js` 18+ 或更高版本
- `pnpm` 10+（推荐，仓库内已包含 `pnpm-lock.yaml`）
- 可用的 `MySQL` 或 `MariaDB` 数据库
- 一个 GitHub OAuth 应用，用于登录授权

## 环境变量

项目依赖数据库连接与 GitHub OAuth 配置。请在项目根目录创建 `.env` 文件，例如：

```bash
DATABASE_URL="mysql://root:password@127.0.0.1:3306/job_posting"

DATABASE_HOST="127.0.0.1"
DATABASE_USER="root"
DATABASE_PASSWORD="password"
DATABASE_NAME="job_posting"

GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

说明：

- `DATABASE_URL` 供 Prisma 迁移使用。
- `DATABASE_HOST`、`DATABASE_USER`、`DATABASE_PASSWORD`、`DATABASE_NAME` 供运行时 Prisma MariaDB Adapter 使用。
- `GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET` 用于 Better Auth 的 GitHub 登录。

## 安装依赖

```bash
pnpm install
```

## 初始化数据库

首次启动前，先确保数据库已创建，然后执行 Prisma 迁移：

```bash
pnpm exec prisma migrate dev
```

如果只需要在生产环境应用已有迁移，可使用：

```bash
pnpm exec prisma migrate deploy
```

## 本地开发

启动开发服务器：

```bash
pnpm dev
```

默认访问地址：

```text
http://localhost:3000
```

应用首页会自动重定向到 `/jobs`。

## 生产打包

构建生产版本：

```bash
pnpm build
```

本地预览生产构建结果：

```bash
pnpm preview
```

如果需要生成静态资源，也可执行：

```bash
pnpm generate
```

但当前项目包含服务端 API、鉴权和数据库访问，常规部署方式更推荐使用 `build + preview / Node Server` 方案。

## 常用脚本

```bash
pnpm dev        # 启动本地开发
pnpm build      # 构建生产版本
pnpm preview    # 预览生产构建
pnpm generate   # 生成静态站点
```

## 当前业务模型

项目当前主要包含以下几类核心数据：

- `User`：用户信息、账号与会话。
- `Job`：职位信息，包括标题、公司、地点、类型、描述、薪资、发布者。
- `Application`：职位申请记录，限制同一用户不能重复申请同一职位。

## 说明

- `/api/jobs` 的 `GET` 接口为公开接口，用于职位列表查询。
- 发布职位、申请职位、查看个人控制台等能力需要登录后使用。
- 项目中已包含一个 Nitro 定时任务示例，可按需扩展为业务任务。
