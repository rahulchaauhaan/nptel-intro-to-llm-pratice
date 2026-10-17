import { renderHeader } from './components/Header.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderWeekAssignmentView } from './components/WeekAssignmentView.js';
import { renderMockExamView, renderMockExamLanding } from './components/MockExamView.js';
import { renderMockResultView } from './components/MockResultView.js';
import { renderFlashcardsView } from './components/FlashcardsView.js';
import { renderBookmarksView } from './components/BookmarksView.js';
import { openSearchModal } from './components/SearchModal.js';

class App {
  constructor() {
    this.appRoot = document.getElementById('app');
    this.currentViewInstance = null;
    this.currentRoute = { name: 'dashboard', params: {} };
    
    this.init();
  }

  init() {
    this.appRoot.innerHTML = `
      <div id="site-header-container"></div>
      <main id="main-content" style="flex:1;"></main>
      <footer class="site-footer">
        <div class="container footer-inner">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <div style="width:22px; height:22px; border-radius:4px; background:#6366f1; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.65rem;">LLM</div>
            <span>NPTEL Introduction to Large Language Models Practice Hub</span>
          </div>
          <div>All 12 Weeks · 111 Questions · Built for NPTEL LLM Aspirants</div>
        </div>
      </footer>
    `;

    // Render persistent site header
    const headerContainer = document.getElementById('site-header-container');
    const headerEl = renderHeader(
      (routeName, params) => this.navigate(routeName, params),
      () => this.openSearch()
    );
    headerContainer.appendChild(headerEl);

    // Global keyboard listener for search shortcut '/'
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.openSearch();
      }
    });

    // Handle browser popstate / initial URL hash
    this.handleInitialRoute();
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('week/')) {
      const parts = hash.split('/');
      const week = parseInt(parts[1]) || 1;
      this.navigate('week', { week, mode: 'study' });
    } else if (hash === 'mock') {
      this.navigate('mock');
    } else if (hash === 'flashcards') {
      this.navigate('flashcards');
    } else if (hash === 'bookmarks') {
      this.navigate('bookmarks');
    } else {
      this.navigate('dashboard');
    }
  }

  navigate(routeName, params = {}) {
    if (this.currentViewInstance && typeof this.currentViewInstance.destroy === 'function') {
      this.currentViewInstance.destroy();
    }

    this.currentRoute = { name: routeName, params };
    const contentRoot = document.getElementById('main-content');
    contentRoot.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update URL hash without reload
    let newHash = '';
    if (routeName === 'week') newHash = `week/${params.week || 1}`;
    else if (routeName === 'mock') newHash = 'mock';
    else if (routeName === 'flashcards') newHash = 'flashcards';
    else if (routeName === 'bookmarks') newHash = 'bookmarks';
    
    if (window.location.hash.slice(1) !== newHash) {
      history.replaceState(null, '', newHash ? `#${newHash}` : window.location.pathname);
    }

    switch (routeName) {
      case 'dashboard':
        this.currentViewInstance = renderDashboard(contentRoot, (r, p) => this.navigate(r, p));
        break;

      case 'week':
        this.currentViewInstance = renderWeekAssignmentView(
          contentRoot, 
          params.week || 1, 
          params.mode || 'study', 
          (r, p) => this.navigate(r, p)
        );
        break;

      case 'mock':
        // Show landing screen with mode selection
        renderMockExamLanding(contentRoot, (modeOrBack) => {
          if (modeOrBack === 'back') {
            this.navigate('dashboard');
          } else {
            contentRoot.innerHTML = '';
            this.currentViewInstance = renderMockExamView(contentRoot, (r, p) => this.navigate(r, p), modeOrBack);
          }
        });
        break;

      case 'mock-result':
        this.currentViewInstance = renderMockResultView(contentRoot, params.result, (r, p) => this.navigate(r, p));
        break;

      case 'flashcards':
        this.currentViewInstance = renderFlashcardsView(contentRoot, (r, p) => this.navigate(r, p));
        break;

      case 'bookmarks':
        this.currentViewInstance = renderBookmarksView(contentRoot, (r, p) => this.navigate(r, p));
        break;

      default:
        this.currentViewInstance = renderDashboard(contentRoot, (r, p) => this.navigate(r, p));
        break;
    }
  }

  openSearch() {
    openSearchModal((week, qid) => {
      this.navigate('week', { week, mode: 'study', targetQid: qid });
    });
  }
}

// Start app on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
