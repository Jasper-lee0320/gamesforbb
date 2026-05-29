# AGENTS.md

## 项目概述

"蓓蓓游戏中心" — 纯静态 HTML5 游戏合集，部署在 GitHub Pages，包含 9 款单文件 HTML 游戏，面向幼儿和休闲玩家。

## 技术约束

- **纯静态**: HTML + CSS + vanilla JavaScript，无构建工具、无 npm、无服务器
- **部署**: GitHub Pages，提交 `main` 分支即自动生效
- **页面入口**: `index.html`（游戏列表） 和 `github-pages-qr-generator.html`（游戏中心 + QR 码生成）
- **存储**: `localStorage` 保存最佳分数等数据
- **单人开发**: 无 CI/CD，无测试框架

## 项目结构

```
index.html                           # 游戏卡片列表页
github-pages-qr-generator.html       # 游戏中心主页（QR码生成 + 选择器）
beibei-super-heart-fighter.html      # 超级爱心战机 v4.0 — 粒子特效 + 成就系统
beibei-heart-match.html              # 爱心连连看 — 连线消除，主力优化对象
beibei-memory-flip.html              # 记忆翻牌
beibei-archery-challenge.html        # 射箭挑战 — 物理弹道 + 风力
beibei-parkour-adventure.html        # 跑酷冒险 — 横版跑酷
beibei-heart-tetris.html             # 爱心俄罗斯方块
beibei-pink-heart-fighter.html       # 爱心战机 v3.0
beibei-number-click.html             # 数字点击 — 幼儿数字学习
jialin-animal-sounds.html            # 动物叫声 — 幼儿认知
animal.md / request.md               # 需求文档，非代码
```

## 开发方式

每个游戏是独立的 `.html` 文件，无共享代码。修改后直接刷新浏览器：

```powershell
Start-Process beibei-heart-match.html
```

## 响应式布局核心模式

连连看的 cellSize 计算是项目经典模式：

```js
const availableWidth = window.innerWidth - 40;
const availableHeight = window.innerHeight - 200;
const widthBased = Math.floor(availableWidth / cols) - 4;
const heightBased = Math.floor(availableHeight / rows) - 4;
const cellSize = Math.min(widthBased, heightBased, 60);
```

## 主题色

粉色系：`#ff6b6b`、`#ff0066`、`#ff4757`

## 注意事项

- 所有 `.html` 游戏文件相互独立，各自包含完整的 HTML/CSS/JS
- 没有 LICENSE 文件，但 README 声明 MIT
- 文件编码统一 UTF-8
- GitHub Pages 部署地址: https://jasper-lee0320.github.io/gamesforbb/
