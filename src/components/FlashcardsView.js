import { flashcardsData } from '../data/flashcardsData.js';
import { weeksMeta } from '../data/weeksData.js';
import { playSound } from '../utils/sound.js';

export function renderFlashcardsView(container, onNavigate) {
  let currentIndex = 0;
  let isFlipped = false;
  let activeWeek = 'all';

  function getCards() {
    if (activeWeek === 'all') return flashcardsData;
    return flashcardsData.filter(c => c.week === parseInt(activeWeek));
  }

  function render() {
    const cards = getCards();
    const currentCard = cards[currentIndex] || cards[0];

    container.innerHTML = `
      <div class="container flashcards-layout">
        <!-- Top Navigation Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <button class="btn btn-secondary btn-sm" id="btn-fc-home">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to Dashboard</span>
          </button>

          <div style="font-size:0.85rem; font-weight:700; color:var(--text-secondary);">
            Card <span style="color:#fff;">${currentIndex + 1}</span> of ${cards.length}
          </div>
        </div>

        <div style="text-align:center; margin-bottom:1.5rem;">
          <h2 style="font-size:1.85rem; font-weight:800; color:#fff; margin-bottom:0.4rem;">
            Rapid Concept & Formula Flashcards
          </h2>
          <p style="color:var(--text-secondary); font-size:0.9rem;">
            Click the card to flip between the question and verified solution.
          </p>
        </div>

        <!-- Week Filter -->
        <div class="mock-filter-scroller" style="justify-content:center; margin-bottom:1rem;">
          <button class="week-filter-pill ${activeWeek === 'all' ? 'active' : ''}" data-week="all">All Weeks</button>
          ${weeksMeta.map(w => `
            <button class="week-filter-pill ${activeWeek === String(w.week) ? 'active' : ''}" data-week="${w.week}">W${w.week}</button>
          `).join('')}
        </div>

        <!-- 3D Flashcard Stage -->
        <div class="flashcard-stage" id="fc-stage">
          <div class="flashcard-inner ${isFlipped ? 'flipped' : ''}">
            <!-- Front -->
            <div class="flashcard-front">
              <span class="badge badge-primary flashcard-badge">Week ${currentCard.week} · ${currentCard.topic}</span>
              <div class="flashcard-text">${currentCard.front}</div>
              <div class="flashcard-hint">Tap card or press [Space] to flip & reveal answer</div>
            </div>

            <!-- Back -->
            <div class="flashcard-back">
              <span class="badge badge-cyan flashcard-badge">Solution / Derivation</span>
              <div class="flashcard-text" style="font-size:1.15rem; color:#f1f5f9;">${currentCard.back}</div>
              <div class="flashcard-hint">Tap card to flip back</div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flashcards-controls">
          <button class="btn btn-secondary" id="fc-prev" ${currentIndex === 0 ? 'disabled style="opacity:0.4;"' : ''}>
            <span>← Previous</span>
          </button>

          <button class="btn btn-primary" id="fc-flip-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
            <span>Flip Card</span>
          </button>

          <button class="btn btn-secondary" id="fc-next" ${currentIndex === cards.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>
            <span>Next →</span>
          </button>
        </div>
      </div>
    `;

    // Attach listeners
    container.querySelector('#btn-fc-home').onclick = () => onNavigate('dashboard');

    container.querySelectorAll('.week-filter-pill').forEach(btn => {
      btn.onclick = () => {
        activeWeek = btn.dataset.week;
        currentIndex = 0;
        isFlipped = false;
        render();
      };
    });

    const flipCard = () => {
      isFlipped = !isFlipped;
      playSound('click');
      const inner = container.querySelector('.flashcard-inner');
      if (inner) inner.classList.toggle('flipped', isFlipped);
    };

    container.querySelector('#fc-stage').onclick = flipCard;
    container.querySelector('#fc-flip-btn').onclick = flipCard;

    container.querySelector('#fc-prev').onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        isFlipped = false;
        render();
      }
    };

    container.querySelector('#fc-next').onclick = () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        isFlipped = false;
        render();
      }
    };
  }

  // Keyboard shortcut listener
  const handleKeyDown = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      isFlipped = !isFlipped;
      const inner = container.querySelector('.flashcard-inner');
      if (inner) inner.classList.toggle('flipped', isFlipped);
    } else if (e.key === 'ArrowRight') {
      const cards = getCards();
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        isFlipped = false;
        render();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        currentIndex--;
        isFlipped = false;
        render();
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  render();

  return {
    destroy: () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  };
}
