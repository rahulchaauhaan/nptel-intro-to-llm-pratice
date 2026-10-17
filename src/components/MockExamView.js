import { allQuestions, checkAnswer } from '../data/questionsData.js';
import { weeksMeta } from '../data/weeksData.js';
import { store } from '../state/store.js';
import { renderQuestionCard } from './QuestionCard.js';
import { renderQuestionPalette } from './QuestionPalette.js';
import { playSound } from '../utils/sound.js';
import { fireConfetti } from '../utils/confetti.js';

// Fisher-Yates shuffle (in-place)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function renderMockExamLanding(container, onStart) {
  container.innerHTML = `
    <div class="container" style="max-width:680px; margin:4rem auto; padding:0 1.5rem;">
      <div class="mock-landing-card glass-panel" style="padding:3rem 2rem; text-align:center; border-radius:var(--radius-xl); border:1px solid rgba(99,102,241,0.35);">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg,#6366f1,#8b5cf6); margin-bottom:1.5rem; box-shadow:0 0 30px rgba(99,102,241,0.4);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h1 style="font-size:1.9rem; font-weight:800; color:#fff; margin-bottom:0.6rem;">Combined Mock Exam</h1>
        <p style="color:var(--text-secondary); margin-bottom:0.5rem;">111 Questions · 12 Weeks of NPTEL LLM Content</p>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:2.5rem;">Choose your question order before starting. You can't change this mid-exam.</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:2rem;">
          <label for="mode-sequential" class="mode-select-card" id="label-sequential" style="cursor:pointer; border:2px solid var(--primary); border-radius:var(--radius-lg); padding:1.5rem 1rem; background:rgba(99,102,241,0.1); transition:all 0.2s;">
            <input type="radio" name="order-mode" id="mode-sequential" value="sequential" checked style="display:none;">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">📋</div>
            <div style="font-weight:700; color:#fff; margin-bottom:0.3rem;">Sequential</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Week 1 → Week 12, in order</div>
            <div style="font-size:0.75rem; color:var(--primary); margin-top:0.5rem; font-weight:600;">✓ Selected</div>
          </label>

          <label for="mode-shuffled" class="mode-select-card" id="label-shuffled" style="cursor:pointer; border:2px solid var(--border-medium); border-radius:var(--radius-lg); padding:1.5rem 1rem; background:rgba(255,255,255,0.03); transition:all 0.2s;">
            <input type="radio" name="order-mode" id="mode-shuffled" value="shuffled" style="display:none;">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">🔀</div>
            <div style="font-weight:700; color:#fff; margin-bottom:0.3rem;">Shuffled</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">All 111 questions randomised</div>
            <div style="font-size:0.75rem; color:var(--text-faint); margin-top:0.5rem;">Click to select</div>
          </label>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <button class="btn btn-primary btn-lg" id="landing-start-btn" style="font-size:1.05rem; padding:0.9rem 2.5rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Start Mock Exam</span>
          </button>
          <button class="btn btn-ghost btn-sm" id="landing-back-btn" style="color:var(--text-muted);">← Back to Dashboard</button>
        </div>
      </div>
    </div>
  `;

  let selectedMode = 'sequential';

  const labelSeq = container.querySelector('#label-sequential');
  const labelShu = container.querySelector('#label-shuffled');
  const radioSeq = container.querySelector('#mode-sequential');
  const radioShu = container.querySelector('#mode-shuffled');

  function updateSelection(mode) {
    selectedMode = mode;
    if (mode === 'sequential') {
      labelSeq.style.borderColor = 'var(--primary)';
      labelSeq.style.background = 'rgba(99,102,241,0.1)';
      labelSeq.querySelector('div:last-child').textContent = '✓ Selected';
      labelSeq.querySelector('div:last-child').style.color = 'var(--primary)';
      labelShu.style.borderColor = 'var(--border-medium)';
      labelShu.style.background = 'rgba(255,255,255,0.03)';
      labelShu.querySelector('div:last-child').textContent = 'Click to select';
      labelShu.querySelector('div:last-child').style.color = 'var(--text-faint)';
    } else {
      labelShu.style.borderColor = '#8b5cf6';
      labelShu.style.background = 'rgba(139,92,246,0.1)';
      labelShu.querySelector('div:last-child').textContent = '✓ Selected';
      labelShu.querySelector('div:last-child').style.color = '#8b5cf6';
      labelSeq.style.borderColor = 'var(--border-medium)';
      labelSeq.style.background = 'rgba(255,255,255,0.03)';
      labelSeq.querySelector('div:last-child').textContent = 'Click to select';
      labelSeq.querySelector('div:last-child').style.color = 'var(--text-faint)';
    }
  }

  labelSeq.onclick = () => { radioSeq.checked = true; updateSelection('sequential'); };
  labelShu.onclick = () => { radioShu.checked = true; updateSelection('shuffled'); };

  container.querySelector('#landing-start-btn').onclick = () => onStart(selectedMode);
  container.querySelector('#landing-back-btn').onclick = () => onStart('back');
}

export function renderMockExamView(container, onNavigate, orderMode = 'sequential') {
  const TOTAL_QUESTIONS = allQuestions.length; // 111
  const TOTAL_TIME_SECONDS = TOTAL_QUESTIONS * 60; // 1 min per question
  let timeRemaining = TOTAL_TIME_SECONDS;
  let timerInterval = null;
  let isTimerPaused = false;

  let currentIndex = 0;
  let activeWeekFilter = 'all';
  let userAnswers = {};
  let flaggedQuestionIds = store.getBookmarks();

  // Build the ordered question list based on mode
  let examQuestions = orderMode === 'shuffled' ? shuffle(allQuestions) : [...allQuestions];

  function reshuffleQuestions() {
    if (!confirm('Reshuffle all questions? Your current answers will be cleared.')) return;
    examQuestions = shuffle(allQuestions);
    userAnswers = {};
    currentIndex = 0;
    activeWeekFilter = 'all';
    render();
  }

  function getFilteredQuestions() {
    if (activeWeekFilter === 'all') return examQuestions;
    if (activeWeekFilter === 'flagged') {
      return examQuestions.filter(q => flaggedQuestionIds.includes(q.id));
    }
    const weekNum = parseInt(activeWeekFilter);
    return examQuestions.filter(q => q.week === weekNum);
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isTimerPaused) {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
          clearInterval(timerInterval);
          autoSubmitMock();
        }
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    const timerEl = container.querySelector('#mock-timer-display');
    if (!timerEl) return;
    timerEl.textContent = formatTime(timeRemaining);
    if (timeRemaining < 300) {
      timerEl.parentElement.className = 'mock-timer-box timer-critical';
    } else if (timeRemaining < 900) {
      timerEl.parentElement.className = 'mock-timer-box timer-warning';
    }
  }

  function render() {
    const modeBadge = orderMode === 'shuffled'
      ? `<span class="badge" style="background:rgba(139,92,246,0.2); color:#a78bfa; border:1px solid rgba(139,92,246,0.4);">🔀 Shuffled</span>`
      : `<span class="badge" style="background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">📋 Sequential</span>`;

    container.innerHTML = `
      <div class="container practice-page-layout">
        <!-- Mock Top Bar -->
        <div class="mock-topbar">
          <div class="mock-info-group">
            <button class="btn btn-ghost btn-sm" id="btn-back-dashboard">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
              <span>Dashboard</span>
            </button>
            <div class="mock-title-badge">
              <span>Combined Mock Exam</span>
              <span class="badge badge-primary">111 Questions</span>
              ${modeBadge}
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
            <div class="mock-timer-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span id="mock-timer-display">${formatTime(timeRemaining)}</span>
            </div>

            ${orderMode === 'shuffled' ? `
              <button class="btn btn-secondary btn-sm" id="btn-reshuffle" title="Reshuffle all questions">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                <span>Reshuffle</span>
              </button>
            ` : ''}

            <button class="btn btn-secondary btn-sm" id="btn-toggle-pause">
              <span id="pause-btn-text">Pause</span>
            </button>

            <button class="btn btn-primary btn-sm" id="btn-submit-mock-top">
              <span>Submit Exam</span>
            </button>
          </div>
        </div>

        <!-- Week Filter Pills -->
        <div class="mock-filter-scroller">
          <button class="week-filter-pill ${activeWeekFilter === 'all' ? 'active' : ''}" data-filter="all">
            All Questions (${examQuestions.length})
          </button>
          ${weeksMeta.map(w => `
            <button class="week-filter-pill ${activeWeekFilter === String(w.week) ? 'active' : ''}" data-filter="${w.week}">
              W${w.week} (${examQuestions.filter(q=>q.week===w.week).length})
            </button>
          `).join('')}
          <button class="week-filter-pill ${activeWeekFilter === 'flagged' ? 'active' : ''}" data-filter="flagged">
            ★ Flagged (${flaggedQuestionIds.length})
          </button>
        </div>

        <!-- Main Layout Grid -->
        <div class="practice-grid">
          <div class="question-column" id="mock-question-column"></div>
          <div class="palette-column" id="mock-palette-column"></div>
        </div>
      </div>

      <div id="mock-modal-container"></div>
    `;

    container.querySelector('#btn-back-dashboard').onclick = () => {
      if (confirm('Leave the mock exam? Progress on this test will be lost unless submitted.')) {
        clearInterval(timerInterval);
        onNavigate('dashboard');
      }
    };

    container.querySelector('#btn-toggle-pause').onclick = () => {
      isTimerPaused = !isTimerPaused;
      container.querySelector('#pause-btn-text').textContent = isTimerPaused ? 'Resume' : 'Pause';
    };

    container.querySelector('#btn-submit-mock-top').onclick = confirmSubmitMock;

    const reshuffleBtn = container.querySelector('#btn-reshuffle');
    if (reshuffleBtn) reshuffleBtn.onclick = reshuffleQuestions;

    container.querySelectorAll('.week-filter-pill').forEach(btn => {
      btn.onclick = () => {
        activeWeekFilter = btn.dataset.filter;
        currentIndex = 0;
        renderCurrentQuestionAndPalette();
        // Re-render just the filter pills
        container.querySelectorAll('.week-filter-pill').forEach(b => {
          b.classList.toggle('active', b.dataset.filter === activeWeekFilter);
        });
      };
    });

    renderCurrentQuestionAndPalette();
    startTimer();
  }

  function renderCurrentQuestionAndPalette() {
    const questionCol = container.querySelector('#mock-question-column');
    const paletteCol = container.querySelector('#mock-palette-column');
    if (!questionCol || !paletteCol) return;

    const filtered = getFilteredQuestions();

    if (filtered.length === 0) {
      questionCol.innerHTML = `
        <div class="question-card" style="text-align:center; padding:3rem 1.5rem;">
          <h3 style="font-size:1.3rem; margin-bottom:0.5rem; color:#fff;">No questions match filter</h3>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">No questions are flagged for review yet.</p>
          <button class="btn btn-primary btn-sm" id="btn-reset-filter">Show All ${examQuestions.length} Questions</button>
        </div>
      `;
      questionCol.querySelector('#btn-reset-filter').onclick = () => {
        activeWeekFilter = 'all';
        render();
      };
      return;
    }

    if (currentIndex >= filtered.length) currentIndex = 0;
    const currentQ = filtered[currentIndex];
    const currentAns = userAnswers[currentQ.id];
    const isBookmarked = flaggedQuestionIds.includes(currentQ.id);

    const cardEl = renderQuestionCard({
      question: currentQ,
      questionIndex: currentIndex,
      totalQuestions: filtered.length,
      userAnswer: currentAns,
      onAnswerChange: (newAns) => {
        if (newAns === null) delete userAnswers[currentQ.id];
        else userAnswers[currentQ.id] = newAns;
        renderCurrentQuestionAndPalette();
      },
      mode: 'exam',
      isSubmitted: false,
      isBookmarked,
      onBookmarkToggle: (qId) => {
        store.toggleBookmark(qId);
        flaggedQuestionIds = store.getBookmarks();
        renderCurrentQuestionAndPalette();
      }
    });

    const navBar = document.createElement('div');
    navBar.className = 'question-nav-bar';
    navBar.innerHTML = `
      <div class="nav-buttons-left">
        <button class="btn btn-secondary" id="mock-btn-prev" ${currentIndex === 0 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
          <span>← Previous</span>
        </button>
        <button class="btn btn-primary" id="mock-btn-next">
          <span>${currentIndex === filtered.length - 1 ? 'Review & Submit Exam' : 'Next Question →'}</span>
        </button>
      </div>
      <div class="nav-buttons-right">
        <button class="btn btn-ghost btn-sm" id="mock-btn-clear" style="color:var(--text-muted);">
          <span>Clear Answer</span>
        </button>
      </div>
    `;

    navBar.querySelector('#mock-btn-prev').onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestionAndPalette();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    };

    navBar.querySelector('#mock-btn-next').onclick = () => {
      if (currentIndex < filtered.length - 1) {
        currentIndex++;
        renderCurrentQuestionAndPalette();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        confirmSubmitMock();
      }
    };

    navBar.querySelector('#mock-btn-clear').onclick = () => {
      if (userAnswers[currentQ.id]) {
        delete userAnswers[currentQ.id];
        renderCurrentQuestionAndPalette();
      }
    };

    questionCol.innerHTML = '';
    questionCol.appendChild(cardEl);
    questionCol.appendChild(navBar);

    paletteCol.innerHTML = '';
    const paletteEl = renderQuestionPalette({
      questions: filtered,
      currentIndex,
      userAnswers,
      flaggedIds: flaggedQuestionIds,
      mode: 'exam',
      isSubmitted: false,
      onSelectIndex: (idx) => {
        currentIndex = idx;
        renderCurrentQuestionAndPalette();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      },
      onSubmit: confirmSubmitMock,
      submitLabel: 'Finish & Submit Exam',
      is180Grid: true
    });
    paletteCol.appendChild(paletteEl);
  }

  function confirmSubmitMock() {
    const total = examQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = total - answeredCount;

    const modalRoot = container.querySelector('#mock-modal-container');
    modalRoot.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">Submit Combined Mock Exam?</h3>
            <button class="btn-icon" id="mock-modal-close">&times;</button>
          </div>

          <div class="modal-body">
            <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.25rem;">
              You have answered <strong>${answeredCount} of ${total}</strong> questions.
              ${unansweredCount > 0 ? `<br><span style="color:#f59e0b; font-weight:600;">⚠️ ${unansweredCount} questions remain unattempted!</span>` : '<br><span style="color:#10b981; font-weight:600;">✓ All questions answered!</span>'}
            </p>

            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-around; text-align:center;">
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:#fff;">${answeredCount}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Answered</div>
              </div>
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:#f59e0b;">${unansweredCount}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Unanswered</div>
              </div>
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">${formatTime(TOTAL_TIME_SECONDS - timeRemaining)}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Time Spent</div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="mock-modal-cancel">Continue Exam</button>
            <button class="btn btn-primary" id="mock-modal-submit-now">
              <span>Submit & View Results</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const close = () => { modalRoot.innerHTML = ''; };
    modalRoot.querySelector('#mock-modal-close').onclick = close;
    modalRoot.querySelector('#mock-modal-cancel').onclick = close;
    modalRoot.querySelector('#mock-modal-submit-now').onclick = () => {
      close();
      autoSubmitMock();
    };
  }

  function autoSubmitMock() {
    clearInterval(timerInterval);

    let totalScore = 0;
    let maxPoints = 0;
    let correctCount = 0;
    const weekScores = {};

    for (let w = 1; w <= 12; w++) {
      weekScores[w] = { correct: 0, total: 0, score: 0, maxPoints: 0 };
    }

    examQuestions.forEach(q => {
      maxPoints += q.points;
      weekScores[q.week].total++;
      weekScores[q.week].maxPoints += q.points;

      const ans = userAnswers[q.id];
      if (ans) {
        const res = checkAnswer(q, ans);
        totalScore += res.score;
        weekScores[q.week].score += res.score;
        if (res.isCorrect) {
          correctCount++;
          weekScores[q.week].correct++;
        }
      }
    });

    const percentage = maxPoints > 0 ? Math.round((totalScore / maxPoints) * 100) : 0;
    const timeSpentSeconds = TOTAL_TIME_SECONDS - timeRemaining;

    const mockResult = store.saveMockResult({
      totalQuestions: examQuestions.length,
      answeredCount: Object.keys(userAnswers).length,
      correctCount,
      totalScore,
      maxPoints,
      percentage,
      timeSpentSeconds,
      weekScores,
      userAnswers,
      orderMode
    });

    if (percentage >= 60) {
      fireConfetti();
      playSound('complete');
    }

    onNavigate('mock-result', { result: mockResult });
  }

  render();

  return {
    destroy: () => {
      if (timerInterval) clearInterval(timerInterval);
    }
  };
}
