
太好了！给 2 岁宝宝做 **数字点击（Number Click）**，目标就是：**大按钮、点一下就有“声音 + 动画”的即时反馈**。下面是我给你的实战建议与注意点，做完基本就能稳稳好用、耐玩。

---

# 设计与玩法建议

1. 界面与交互

* **大面积点击区**：每个数字至少占屏宽的 1/3（手机竖屏 2×2 或 3×3 网格），避免点不中。
* **高对比+简洁配色**：白底+纯色大号数字（≥120px），避免复杂背景。
* **单步交互**：只需“点一下”；不做长按、双击、滑动。
* **即时反馈**：同一时刻触发三件事：播放语音、数字弹跳/放大、屏幕小彩屑/光圈。
* **节律控制**：点击后 **500–800ms** 动画即可结束，宝宝不会等太久。

2. 学习节奏与模式

* **学习模式**（Learn）：点击“1”就读“one/一”，不考核。
* **练习模式**（Practice）：屏幕播“Three”，让宝宝去点“3”，点对放大庆祝，点错轻震动/柔和提示。
* **数一数**（Count）：屏幕出现 1～N 个大圆点，宝宝点每个点都会数数（“one… two…”）。
* **范围可调**：默认 1–5；进阶 1–10、1–20（2 岁建议停在 1–10）。

3. 语音与声音

* **预录音频更稳**：相对 Web TTS，**本地 mp3** 响应快、离线可用。
* **多语言包**：`/audio/zh/1.mp3`、`/audio/en/1.mp3`、`/audio/yue/1.mp3`（普通话/英语/粤语）。
* **时长短、清晰**：每段 0.4–0.8s；采样 44.1kHz，单声道 64–96kbps 足够。
* **轻音效**：点击“咚”、对的“叮”、通关“啦啦”一段短音效，注意音量统一。

4. 动画与视觉反馈

* **数字弹跳/缩放**：CSS `transform: scale(1.2)` + `transition: 200ms`，回弹即可。
* **小彩屑**：点中后播 10–20 个粒子飞散（Canvas 或轻量 DOM 粒子）。
* **避免眩晕**：不闪烁，不频繁全屏强光。

5. 可用性与家长控制

* **全屏模式**：提供“全屏/退出全屏”按钮。
* **误触保护**：右上角 **长按 2–3 秒** 才进入家长设置；返回、外链都放在家长区。
* **色弱友好**：数字与背景保持高对比；不要只靠颜色传达信息。
* **离线可用（PWA）**：加 manifest + Service Worker，断网也能玩。
* **无广告/无外链**：纯本地资源，避免跳出。

6. 性能与兼容

* **音频预加载**：首次进入加载 1–10 的音频，点了就秒播。
* **iOS 自动播放限制**：第一次点击后初始化 AudioContext；不要期待自动播放。
* **节流/去抖**：同一数字 500ms 内忽略二次点，防止“连点音频叠加”。
* **资源体积控制**：整站 < 1MB 更丝滑，图片尽量 SVG/纯文本渲染。

---

# 结构与文件命名（简单清单）

```
/index.html
/style.css
/app.js
/audio/
  en/1.mp3 ... 10.mp3
  zh/1.mp3 ... 10.mp3
  yue/1.mp3 ... 10.mp3
/sfx/click.mp3  correct.mp3  cheer.mp3
/manifest.webmanifest
/sw.js
```

* 语言代码：`en`（英语）、`zh`（普通话）、`yue`（粤语）。
* 你可以先只放一种语言跑通，再慢慢加。

---

# 关键实现建议（代码要点）

**1. 统一的播放函数（避免叠音）**

```js
// app.js 片段
const audioCache = new Map();
let playing = null;

async function playOnce(path) {
  // 停掉上一段
  if (playing) { playing.pause(); playing.currentTime = 0; }
  if (!audioCache.has(path)) audioCache.set(path, new Audio(path));
  const a = audioCache.get(path);
  playing = a;
  try { await a.play(); } catch(e) { /* iOS 首次手势后再调一次 */ }
}
```

**2. 点击节流 + 动画回弹**

```js
let lock = false;
function onNumberTap(n, lang='zh') {
  if (lock) return;
  lock = true;

  const el = document.querySelector(`[data-num="${n}"]`);
  el.classList.add('pop'); // CSS: transform: scale(1.2)
  playOnce(`/audio/${lang}/${n}.mp3`).finally(() => {
    setTimeout(() => {
      el.classList.remove('pop');
      lock = false;
    }, 300);
  });
}
```

**3. 首次手势解锁 iOS 音频**

```js
window.addEventListener('touchstart', initAudioOnce, { once: true });
window.addEventListener('click', initAudioOnce, { once: true });

function initAudioOnce() {
  // 触发一次静音播放，解锁后续 play()
  const silent = new Audio();
  silent.play().catch(()=>{});
}
```

**4. 简单粒子庆祝（可选）**
点对后在数字中心生成十几个小圆点，`requestAnimationFrame` 向四周散开，500ms 自动清理。

---

# 内容与家长引导

* **时长建议**：单次 3–5 分钟即可，注意视力与专注力。
* **正向反馈**：多说“太棒了”“做得好”，少用“错误”“失败”等词。
* **渐进目标**：先 1–5，再 1–10；等熟练后再开启“听音找数”的练习模式。
* **多语切换**：可以让宝宝在中文基础上听英语/粤语发音，寓教于乐。
* **家长录音**（很加分）：你自己的声音更亲切，录十个数字就够用。

---

# 下一步我可以帮你

* 给你一个 **可直接运行的最小完整版本（HTML+CSS+JS）**，含：

  * 1–10 网格、点击弹跳、音频预加载、语言切换、全屏、简单彩屑。
  * 模式切换（学习/练习）。
  * PWA 离线支持的模板文件（manifest + sw）。
* 也可以把语音改成 **中文+英语+粤语** 的三套占位文件名，方便你后续替换。

你是想先要一个“极简可跑”的版本，还是要“带练习模式+PWA”的增强版？告诉我你的取舍（比如是否要多语言、是否要离线），我就直接把完整代码发给你。
