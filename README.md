# 宠物领养APP

基于React + Node.js的在线宠物领养平台前端应用。

## 技术栈

- **前��**: React 19 + Vite + Tailwind CSS 4 + React Router 7
- **后端**: Node.js + Express
- **UI**: Material Symbols Icons + Google Fonts

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 同时启动前后端
npm start

# 或分别启动
npm run server  # 后端服务 (http://localhost:3001)
npm run dev     # 前端服务 (http://localhost:3000)
```

### 访问应用

打开浏览器访问 http://localhost:3000

## 项目结构

```
pet-adoption-app/
├── src/
│   ├── components/       # 通用组件
│   │   └── BottomNav.jsx
│   ├── context/          # Context状态管理
│   │   └── AppContext.jsx
│   ├── pages/            # 页面组件
│   │   ├── Welcome.jsx   # 欢迎页
│   │   ├── PetList.jsx   # 宠物列表
│   │   ├── PetDetail.jsx # 宠物详情
│   │   ├── Apply.jsx     # 领养申请
│   │   ├── Success.jsx   # 申请成功
│   │   └── Profile.jsx   # 个人中心
│   ├── services/         # API服务
│   │   └── api.js
│   ├── App.jsx
│   └── index.css
├── server/
│   └── index.js          # Express后端
└── package.json
```

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Welcome | 欢迎页，引导用���进入 |
| `/pets` | PetList | 宠物列表，支持搜索筛选 |
| `/pets/:id` | PetDetail | 宠物详情，AI功能入口 |
| `/apply/:petId` | Apply | 领养申请表单 |
| `/success` | Success | 申请成功反馈 |
| `/profile` | Profile | 用户个人中心 |

## API接口

### 宠物相关
- `GET /api/pets` - 获取宠物列表
- `GET /api/pets/:id` - 获取宠物详情

### 申请相关
- `POST /api/applications` - 提交领养申请
- `GET /api/applications` - 获取申请列表

### 用户相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### AI功能（预留接口）
- `POST /api/ai/photo` - AI合照生成
- `POST /api/ai/growth` - 成长预测
- `POST /api/ai/portrait` - 风格写真

## 功能特性

- 欢迎引导页
- 宠物列表展示与搜索
- 多条件筛选（品种、性别）
- 宠物详情查看
- 收藏功能（本地存储）
- 领养申请表单
- 申请状态追踪
- 个人中心
- AI功能预留接口

## 构建生产版本

```bash
npm run build
```

## 注意事项

1. AI功能API接口已预留，需要后续对接AI智能体服务
2. 用户数据存储在localStorage中
3. 后端使用内存存储，重启后数据会重置
