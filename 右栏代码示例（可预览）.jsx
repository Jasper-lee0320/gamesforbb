import { useState } from "react";
import QRCode from "qrcode.react";

export default function QRCodeGameDemo() {
  const [gameUrl, setGameUrl] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // 简单示例：用短链接或模拟一个短链接
  const games: Record<string, { name: string; desc: string; url: string }> = {
    plane: {
      name: "🚀 飞机大战",
      desc: "经典射击游戏",
      url: "https://yourname.github.io/games/plane.html", // GitHub Pages 部署后的地址
    },
    snake: {
      name: "🐍 贪吃蛇",
      desc: "怀旧经典",
      url: "https://yourname.github.io/games/snake.html",
    },
  };

  const generateQR = (key: string) => {
    const game = games[key];
    if (!game) return;
    setGameUrl(game.url);
    setStatus(`✅ 已生成 ${game.name} 的二维码`);
  };

  const handleCopy = async () => {
    if (!gameUrl) {
      setStatus("❌ 请先选择一个游戏");
      return;
    }
    try {
      await navigator.clipboard.writeText(gameUrl);
      setStatus("📋 链接已复制");
    } catch {
      setStatus("❌ 复制失败");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-100 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">🎮 游戏二维码生成器 Demo</h1>
        <p className="text-sm text-slate-600 mb-4">
          我帮你改成本地直接生成二维码（不再调用外部 API），并推荐使用 GitHub Pages 部署。
        </p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => generateQR("plane")}
            className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            🚀 飞机大战
          </button>
          <button
            onClick={() => generateQR("snake")}
            className="px-3 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            🐍 贪吃蛇
          </button>
        </div>

        {gameUrl ? (
          <div className="rounded-xl border p-4 bg-white shadow-sm text-center">
            <QRCode value={gameUrl} size={200} includeMargin={true} />
            <p className="mt-2 text-slate-700 break-all">{gameUrl}</p>
            <button
              onClick={handleCopy}
              className="mt-3 px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              📋 复制链接
            </button>
          </div>
        ) : (
          <div className="p-6 text-slate-500 border-2 border-dashed rounded-xl text-center">
            请选择一个游戏生成二维码
          </div>
        )}

        {status && (
          <div className="mt-4 text-sm text-slate-700">{status}</div>
        )}

        <footer className="text-xs text-slate-500 mt-6 space-y-2">
          <p>小提示：部署步骤：</p>
          <ol className="list-decimal list-inside text-slate-600">
            <li>在 GitHub 上新建仓库，例如 <code>games</code></li>
            <li>把 <code>plane.html</code>、<code>snake.html</code> 等文件放进仓库并推送</li>
            <li>在仓库设置（Settings → Pages）里启用 GitHub Pages，选择 <code>main</code> 分支 /root 目录</li>
            <li>等待几分钟后，就可以通过 <code>https://yourname.github.io/games/plane.html</code> 访问</li>
          </ol>
          <p>然后把这些链接放到上方的 <code>games</code> 配置里即可扫码使用。</p>
        </footer>
      </div>
    </div>
  );
}
