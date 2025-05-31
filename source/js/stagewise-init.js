/**
 * Stagewise Toolbar 初始化
 * 按照官方文档规范，从本地node_modules导入
 */

import { initToolbar } from '@stagewise/toolbar';

// Stagewise配置
const stagewiseConfig = {
  plugins: [
    {
      name: 'hexo-blog-plugin',
      description: 'Adds context for Hexo blog elements',
      shortInfoForPrompt: (element) => {
        if (element.classList.contains('post-content')) {
          return "This is a blog post content area";
        }
        if (element.classList.contains('card-widget')) {
          return "This is a sidebar widget";
        }
        if (element.tagName === 'ARTICLE') {
          return "This is a blog post article";
        }
        return "Context information about the selected element";
      },
      mcp: null,
      actions: [
        {
          name: 'Edit Blog Post',
          description: 'Helps with editing blog post content',
          execute: (element) => {
            console.log('Editing blog post element:', element);
          },
        },
        {
          name: 'Optimize SEO',
          description: 'Provides SEO optimization suggestions',
          execute: (element) => {
            console.log('Optimizing SEO for element:', element);
          },
        },
      ],
    },
  ],
};

// 只在开发环境初始化
function setupStagewise() {
  // 检查是否在开发环境
  const isDevelopment = 
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('localhost');
  
  // 检查是否启用调试模式
  const isDebugMode = 
    window.location.search.includes('debug=true') ||
    window.location.search.includes('stagewise=true') ||
    localStorage.getItem('hexo-debug') === 'true' ||
    sessionStorage.getItem('stagewise-debug') === 'true';
  
  if (isDevelopment && isDebugMode) {
    console.log('Stagewise: 🚀 Initializing from local node_modules...');
    
    try {
      initToolbar(stagewiseConfig);
      console.log('Stagewise: ✅ Toolbar initialized successfully!');
      
      // 显示成功指示器
      const indicator = document.createElement('div');
      indicator.innerHTML = '🚀 Stagewise Active (Local)';
      indicator.style.cssText = `
        position: fixed; top: 10px; left: 10px; background: #4CAF50; 
        color: white; padding: 8px 12px; border-radius: 4px; 
        font-size: 12px; z-index: 9999; font-family: monospace;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(indicator);
      
      setTimeout(() => indicator.remove(), 3000);
      
    } catch (error) {
      console.error('Stagewise: ❌ Failed to initialize:', error);
    }
  } else {
    console.log('Stagewise: ❌ Not in development mode or debug not enabled');
  }
}

// 当DOM准备就绪时初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupStagewise);
} else {
  setupStagewise();
}

// 处理PJAX导航
if (window.pjax || document.querySelector('[data-pjax]')) {
  document.addEventListener('pjax:complete', setupStagewise);
  document.addEventListener('pjax:success', setupStagewise);
} 