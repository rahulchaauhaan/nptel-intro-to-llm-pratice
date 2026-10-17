import { allQuestions } from '../data/questionsData.js';
import { store } from '../state/store.js';
import { renderQuestionCard } from './QuestionCard.js';

export function renderBookmarksView(container, onNavigate) {
  function render() {
    const bookmarkedIds = store.getBookmarks();
    const bookmarkedQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));

    container.innerHTML = `
      <div class="container practice-page-layout">
        <!-- Top Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <button class="btn btn-secondary btn-sm" id="btn-bookmarks-home" style="margin-bottom:0.75rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
              <span>Back to Dashboard</span>
            </button>
            <h1 style="font-size:1.85rem; font-weight:800; color:#fff;">
              Saved Bookmarks & Review List
            </h1>
            <p style="color:var(--text-secondary); font-size:0.9rem;">
              Questions you have flagged for revision before the final examination (${bookmarkedQuestions.length} saved).
            </p>
          </div>

          ${bookmarkedQuestions.length > 0 ? `
            <button class="btn btn-secondary btn-sm" id="btn-clear-all-bookmarks" style="color:var(--text-muted);">
              <span>Clear All Bookmarks</span>
            </button>
          ` : ''}
        </div>

        <!-- Question List or Empty State -->
        ${bookmarkedQuestions.length === 0 ? `
          <div class="glass-panel" style="text-align:center; padding:4rem 2rem; max-width:600px; margin:2rem auto;">
            <div style="width:64px; height:64px; border-radius:50%; background:rgba(245, 158, 11, 0.12); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; color:#f59e0b;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 style="font-size:1.35rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">No bookmarked questions yet</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.6; margin-bottom:1.5rem;">
              While practicing weekly assignments or taking mock exams, click the <strong>Bookmark</strong> button on any tricky question to review it here.
            </p>
            <button class="btn btn-primary" id="btn-empty-start">
              <span>Start Practicing Week 1 →</span>
            </button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:1.75rem;" id="bookmarks-cards-root">
            <!-- Cards rendered dynamically -->
          </div>
        `}
      </div>
    `;

    container.querySelector('#btn-bookmarks-home').onclick = () => onNavigate('dashboard');

    const emptyStartBtn = container.querySelector('#btn-empty-start');
    if (emptyStartBtn) {
      emptyStartBtn.onclick = () => onNavigate('week', { week: 1, mode: 'study' });
    }

    const clearAllBtn = container.querySelector('#btn-clear-all-bookmarks');
    if (clearAllBtn) {
      clearAllBtn.onclick = () => {
        if (confirm('Remove all questions from bookmarks?')) {
          bookmarkedIds.forEach(id => store.toggleBookmark(id));
          render();
        }
      };
    }

    const cardsRoot = container.querySelector('#bookmarks-cards-root');
    if (cardsRoot) {
      bookmarkedQuestions.forEach((q, idx) => {
        const cardEl = renderQuestionCard({
          question: q,
          questionIndex: idx,
          totalQuestions: bookmarkedQuestions.length,
          userAnswer: null,
          onAnswerChange: () => {},
          mode: 'study',
          isSubmitted: true,
          isBookmarked: true,
          onBookmarkToggle: (qId) => {
            store.toggleBookmark(qId);
            render();
          }
        });
        cardsRoot.appendChild(cardEl);
      });
    }
  }

  render();

  return {
    destroy: () => {}
  };
}
