# Image2Prompt shadcn UI 风格设计规范

## 设计理念

### 核心原则
- **组件化设计**: 每个UI元素都是独立的、可复用的组件
- **现代简约**: 干净的界面，充足的留白，精致的细节
- **一致性**: 统一的颜色、间距、字体和交互模式
- **可访问性**: 高对比度，键盘导航支持，语义化HTML

### 色彩系统
- **主色调**: 
  - 背景: slate-50 (#f8fafc) - 极浅的灰白背景
  - 卡片背景: white (#ffffff) - 纯白卡片
  - 主要文字: slate-900 (#0f172a) - 深蓝黑色
  - 次要文字: slate-600 (#475569) - 中灰色
  - 边框: slate-200 (#e2e8f0) - 浅灰色边框

- **强调色**:
  - 主要按钮: blue-600 (#2563eb) - 蓝色
  - 次要按钮: slate-100 (#f1f5f9) - 浅灰色
  - 成功状态: green-600 (#16a34a) - 绿色
  - 警告状态: amber-500 (#f59e0b) - 琥珀色

### 字体系统
- **主字体**: Inter (无衬线字体，现代简洁)
- **标题字体**: Inter Display (用于大标题)
- **代码字体**: JetBrains Mono (用于代码块)

### 间距系统
- **基础单位**: 4px
- **常用间距**: 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **组件内边距**: 16px (卡片), 12px (按钮), 8px (小元素)

### 圆角系统
- **小圆角**: 6px (按钮、输入框)
- **中圆角**: 8px (卡片、面板)
- **大圆角**: 12px (大卡片、模态框)
- **圆形**: 50% (头像、图标按钮)

### 阴影系统
- **轻微阴影**: shadow-sm (0 1px 2px 0 rgb(0 0 0 / 0.05))
- **标准阴影**: shadow (0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1))
- **明显阴影**: shadow-md (0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))

## 组件设计规范

### 按钮组件
- **主要按钮**: bg-blue-600, text-white, rounded-lg, px-4 py-2, font-medium
- **次要按钮**: bg-slate-100, text-slate-900, rounded-lg, px-4 py-2, font-medium
- **文本按钮**: text-blue-600, hover:underline, font-medium
- **图标按钮**: w-10 h-10, rounded-full, flex items-center justify-center

### 卡片组件
- **基础卡片**: bg-white, rounded-lg, shadow, border border-slate-200
- **交互卡片**: hover:shadow-md, hover:border-slate-300, transition-all
- **卡片内容**: p-6 (大卡片), p-4 (小卡片)

### 表单组件
- **输入框**: bg-white, border border-slate-200, rounded-lg, px-3 py-2
- **标签**: text-sm font-medium text-slate-700, mb-2
- **帮助文本**: text-sm text-slate-500, mt-1

### 导航组件
- **导航栏**: bg-white/80, backdrop-blur-sm, border-b border-slate-200
- **导航链接**: text-slate-600 hover:text-slate-900, font-medium
- **活动状态**: text-blue-600, border-b-2 border-blue-600

## 布局规范

### 网格系统
- **容器**: max-w-7xl mx-auto, px-4 sm:px-6 lg:px-8
- **响应式断点**: sm(640px), md(768px), lg(1024px), xl(1280px)

### 间距规范
- **页面垂直间距**: py-16 (大区块), py-12 (小区块)
- **组件间距**: space-y-6 (垂直), space-x-4 (水平)
- **内容内边距**: p-6 (大卡片), p-4 (小卡片)

## 交互设计

### 悬停效果
- **按钮悬停**: hover:bg-blue-700 (主要按钮), hover:bg-slate-200 (次要按钮)
- **卡片悬停**: hover:shadow-md, hover:border-slate-300
- **链接悬停**: hover:text-blue-600, hover:underline

### 焦点状态
- **焦点环**: focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
- **焦点边框**: focus:border-blue-500

### 过渡动画
- **标准过渡**: transition-all duration-200 ease-in-out
- **快速过渡**: transition-all duration-150 ease-in-out
- **慢速过渡**: transition-all duration-300 ease-in-out

## 特殊效果

### 渐变效果
- **标题渐变**: bg-gradient-to-r from-blue-600 to-purple-600
- **按钮渐变**: bg-gradient-to-r from-blue-600 to-blue-700

### 动画效果
- **入场动画**: animate-in fade-in slide-in-from-bottom-4 duration-500
- **悬停动画**: hover:scale-105, hover:rotate-1
- **加载动画**: animate-pulse, animate-spin

## 响应式设计

### 断点系统
- **移动端**: < 640px (默认)
- **平板端**: 640px - 768px (sm)
- **桌面端**: > 768px (md及以上)

### 响应式组件
- **网格布局**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **字体大小**: text-sm md:text-base lg:text-lg
- **间距调整**: space-y-4 md:space-y-6 lg:space-y-8

## 可访问性

### 颜色对比
- **文字对比度**: 至少 4.5:1 (WCAG AA标准)
- **大文字对比度**: 至少 3:1 (WCAG AA标准)

### 键盘导航
- **Tab顺序**: 逻辑顺序，可见焦点指示
- **快捷键**: 支持常用快捷键操作

### 屏幕阅读器
- **语义化标签**: 正确使用header, nav, main, footer
- **ARIA标签**: 适当的aria-label和aria-describedby