const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export',
  assetPrefix: isProd ? '/your-repo-name/' : '', // 替换为你的仓库名
  images: {
    unoptimized: true // 禁用图片优化以兼容静态导出
  }
} 