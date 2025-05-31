// Stagewise Toolbar Integration for Hexo
// Only runs in debug mode
(function() {
  'use strict';
  
  // Check if we're in debug mode
  const isDebugMode = 
    window.location.search.includes('debug=true') ||
    window.location.search.includes('stagewise=true') ||
    localStorage.getItem('hexo-debug') === 'true' ||
    sessionStorage.getItem('stagewise-debug') === 'true';
  
  const isDevelopment = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.port === '4000';
  
  if (!isDevelopment || !isDebugMode) {
    console.log('Stagewise: Debug mode not enabled. Add ?debug=true or ?stagewise=true to URL to enable, or set localStorage.setItem("hexo-debug", "true")');
    return;
  }
  
  console.log('Stagewise: Debug mode detected, initializing toolbar');
  
  // Fix process undefined error by providing a minimal polyfill
  if (typeof window.process === 'undefined') {
    window.process = {
      env: {
        NODE_ENV: 'development'
      }
    };
  }
  
  // Basic stagewise configuration
  const stagewiseConfig = {
    plugins: []
  };
  
  // Function to initialize stagewise using framework-agnostic approach
  function initStagewise() {
    try {
      // Check if stagewise is available
      if (typeof window.stagewise !== 'undefined' && typeof window.stagewise.initToolbar === 'function') {
        console.log('Stagewise: Initializing toolbar with config:', stagewiseConfig);
        window.stagewise.initToolbar(stagewiseConfig);
        console.log('Stagewise: Toolbar initialized successfully');
        return true;
      } else {
        console.warn('Stagewise: initToolbar function not found on window.stagewise');
        return false;
      }
    } catch (error) {
      console.error('Stagewise: Failed to initialize toolbar:', error);
      return false;
    }
  }
  
  // Function to load stagewise dynamically
  function loadStagewise() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.onload = () => {
        console.log('Stagewise: Script loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('Stagewise: Failed to load script');
        reject(new Error('Failed to load stagewise script'));
      };
      
      // Use CDN since local npm modules might not be accessible in Hexo
      script.src = 'https://unpkg.com/@stagewise/toolbar@latest/dist/index.js';
      document.head.appendChild(script);
    });
  }
  
  // Main initialization logic
  async function main() {
    // Try to initialize if already loaded
    if (initStagewise()) {
      return;
    }
    
    // Load stagewise dynamically
    try {
      await loadStagewise();
      
      // Wait a bit for the script to fully initialize
      setTimeout(() => {
        if (!initStagewise()) {
          console.warn('Stagewise: Toolbar loaded but initialization still failed');
        }
      }, 500);
    } catch (error) {
      console.error('Stagewise: Failed to load and initialize:', error);
    }
  }
  
  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
  
  // Add debug helper
  console.log('Stagewise Debug Helper: To enable stagewise, use one of these methods:');
  console.log('1. Add ?debug=true to URL');
  console.log('2. Add ?stagewise=true to URL'); 
  console.log('3. Run: localStorage.setItem("hexo-debug", "true")');
  console.log('4. Run: sessionStorage.setItem("stagewise-debug", "true")');
})(); 