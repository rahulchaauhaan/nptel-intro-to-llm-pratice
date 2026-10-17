import { store } from '../state/store.js';
import { weeksMeta } from '../data/weeksData.js';

export function renderHeader(onNavigate, onOpenSearch) {
  const header = document.createElement('header');
  header.className = 'site-header';

  function update() {
    const state = store.getState();
    const bookmarksCount = state.bookmarks.length;
    const soundOn = state.settings?.soundEnabled ?? true;

    header.innerHTML = `
      <div class="container">
        <div class="header-inner">
          <div class="brand-wrapper" id="nav-brand">
            <div class="brand-logo-icon">LLM</div>
            <div class="brand-text">
              <div class="brand-title">
                NPTEL Practice Hub
                <span class="badge badge-primary">IIT 2026</span>
              </div>
              <div class="brand-subtitle">Introduction to Large Language Models</div>
            </div>
          </div>

          <div class="header-nav">
            <button class="btn btn-secondary btn-sm" id="nav-search-btn" title="Search all questions (Press /)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span class="nav-label-desktop">Search</span>
              <kbd style="font-size:0.68rem; padding:1px 5px; background:rgba(255,255,255,0.1); border-radius:4px; margin-left:3px;">/</kbd>
            </button>

            <!-- Week Quick Picker -->
            <div style="position:relative;">
              <button class="btn btn-secondary btn-sm" id="nav-weeks-dropdown-btn">
                <span>Weeks (1-12)</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div id="nav-weeks-menu" class="glass-panel" style="display:none; position:absolute; right:0; top:calc(100% + 6px); width:230px; max-height:360px; overflow-y:auto; padding:0.5rem; z-index:150; box-shadow:var(--shadow-lg);">
                ${weeksMeta.map(w => `
                  <button class="btn-ghost nav-week-item" data-week="${w.week}" style="width:100%; text-align:left; justify-content:flex-start; padding:0.45rem 0.65rem; font-size:0.8rem; border-radius:6px; display:flex; align-items:center; gap:0.5rem;">
                    <span class="week-number-pill" style="font-size:0.65rem; padding:0.15rem 0.4rem;">W${w.week}</span>
                    <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Week ${w.week} Assignment</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <button class="btn btn-ghost btn-sm" id="nav-flashcards-btn" title="Quick Revision Flashcards">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
              <span class="nav-label-desktop">Flashcards</span>
            </button>

            <button class="btn btn-ghost btn-sm" id="nav-bookmarks-btn" title="Saved Bookmarks">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${bookmarksCount > 0 ? '#f59e0b' : 'none'}" stroke="${bookmarksCount > 0 ? '#f59e0b' : 'currentColor'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span class="nav-label-desktop">Saved</span>
              ${bookmarksCount > 0 ? `<span class="badge badge-warning" style="padding:0.1rem 0.4rem; font-size:0.68rem;">${bookmarksCount}</span>` : ''}
            </button>

            <button class="btn btn-primary btn-sm" id="nav-mock-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>111Q Combined Mock</span>
            </button>

            <button class="btn-icon" id="nav-sound-toggle" title="${soundOn ? 'Sound On' : 'Sound Muted'}">
              ${soundOn 
                ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
                : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
              }
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    header.querySelector('#nav-brand').onclick = () => onNavigate('dashboard');
    header.querySelector('#nav-search-btn').onclick = onOpenSearch;
    header.querySelector('#nav-flashcards-btn').onclick = () => onNavigate('flashcards');
    header.querySelector('#nav-bookmarks-btn').onclick = () => onNavigate('bookmarks');
    header.querySelector('#nav-mock-btn').onclick = () => onNavigate('mock');

    const dropdownBtn = header.querySelector('#nav-weeks-dropdown-btn');
    const dropdownMenu = header.querySelector('#nav-weeks-menu');
    dropdownBtn.onclick = (e) => {
      e.stopPropagation();
      const isVisible = dropdownMenu.style.display === 'block';
      dropdownMenu.style.display = isVisible ? 'none' : 'block';
    };

    document.addEventListener('click', () => {
      if (dropdownMenu) dropdownMenu.style.display = 'none';
    });

    header.querySelectorAll('.nav-week-item').forEach(item => {
      item.onclick = () => {
        const week = parseInt(item.dataset.week);
        onNavigate('week', { week, mode: 'study' });
      };
    });

    header.querySelector('#nav-sound-toggle').onclick = () => {
      store.toggleSound();
      update();
    };
  }

  update();
  store.subscribe(() => update());

  return header;
}
