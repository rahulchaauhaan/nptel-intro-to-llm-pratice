import { getQuestionsForWeek, checkAnswer } from '../data/questionsData.js';
import { weeksMeta } from '../data/weeksData.js';
import { store } from '../state/store.js';
import { renderQuestionCard } from './QuestionCard.js';
import { renderQuestionPalette } from './QuestionPalette.js';
import { fireConfetti } from '../utils/confetti.js';
import { playSound } from '../utils/sound.js';

export function renderWeekAssignmentView(container, weekNum, initialMode = 'study', onNavigate) {
  const weekInfo = weeksMeta.find(w => w.week === weekNum) || {
    week: weekNum,
    title: `Week ${weekNum} Assignment`,
    dueDate: '2026-08-05, 23:59 IST'
  };

  const questions = getQuestionsForWeek(weekNum);
  let currentIndex = 0;
  let mode = initialMode; // 'study' | 'exam'
  let isSubmitted = store.getWeekStats(weekNum).completed || false;
  
  // Load existing answers from store
  const savedAnswers = store.getWeekAnswers(weekNum);
  let userAnswers = {};
  Object.entries(savedAnswers).forEach(([qId, data]) => {
    userAnswers[qId] = data.answer;
  });

  function render() {
    container.innerHTML = `
      <div class="container practice-page-layout">
        <!-- Top Control Bar -->
        <div class="practice-header-bar">
          <div class="practice-breadcrumb">
            <a href="#" class="breadcrumb-link" id="breadcrumb-home">Dashboard</a>
            <span>/</span>
            <span style="color:#fff; font-weight:700;">Week ${weekNum}: ${weekInfo.title}</span>
            <span class="badge badge-subtle" style="margin-left:0.5rem;">Due: ${weekInfo.dueDate}</span>
          </div>

          <div class="practice-controls-group">
            <!-- Mode Toggle -->
            <div class="mode-toggle-group">
              <button class="mode-toggle-btn ${mode === 'study' ? 'active' : ''}" id="mode-study-btn">
                Study Mode
              </button>
              <button class="mode-toggle-btn ${mode === 'exam' ? 'active' : ''}" id="mode-exam-btn">
                Exam Mode
              </button>
            </div>

            <button class="btn btn-secondary btn-sm" id="btn-clear-week" title="Clear your answers for this assignment">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              <span>Clear</span>
            </button>
          </div>
        </div>

        <!-- Main Layout Grid -->
        <div class="practice-grid">
          <!-- Left Question Column -->
          <div class="question-column" id="question-column-root">
            <!-- Rendered dynamically -->
          </div>

          <!-- Right Sidebar Palette -->
          <div class="palette-column" id="palette-column-root">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- Submission Modal Placeholder -->
      <div id="modal-container"></div>
    `;

    // Breadcrumb navigation
    container.querySelector('#breadcrumb-home').onclick = (e) => {
      e.preventDefault();
      onNavigate('dashboard');
    };

    // Mode Toggle
    container.querySelector('#mode-study-btn').onclick = () => {
      mode = 'study';
      renderQuestionAndPalette();
      container.querySelector('#mode-study-btn').classList.add('active');
      container.querySelector('#mode-exam-btn').classList.remove('active');
    };

    container.querySelector('#mode-exam-btn').onclick = () => {
      mode = 'exam';
      renderQuestionAndPalette();
      container.querySelector('#mode-exam-btn').classList.add('active');
      container.querySelector('#mode-study-btn').classList.remove('active');
    };

    container.querySelector('#btn-clear-week').onclick = () => {
      if (confirm('Clear all answers recorded for Week ' + weekNum + '?')) {
        userAnswers = {};
        store.clearWeekProgress(weekNum);
        isSubmitted = false;
        renderQuestionAndPalette();
      }
    };

    renderQuestionAndPalette();
  }

  function renderQuestionAndPalette() {
    const questionCol = container.querySelector('#question-column-root');
    const paletteCol = container.querySelector('#palette-column-root');
    if (!questionCol || !paletteCol) return;

    const currentQ = questions[currentIndex];
    const currentAns = userAnswers[currentQ.id];
    const isBookmarked = store.isBookmarked(currentQ.id);

    // 1. Render Question Card
    const cardEl = renderQuestionCard({
      question: currentQ,
      questionIndex: currentIndex,
      totalQuestions: questions.length,
      userAnswer: currentAns,
      onAnswerChange: (newAns) => {
        if (newAns === null) {
          delete userAnswers[currentQ.id];
        } else {
          userAnswers[currentQ.id] = newAns;
          const res = checkAnswer(currentQ, newAns);
          store.saveWeekAnswer(weekNum, currentQ.id, newAns, res.isCorrect, res.score);
        }
        renderQuestionAndPalette();
      },
      mode,
      isSubmitted,
      isBookmarked,
      onBookmarkToggle: (qId) => {
        store.toggleBookmark(qId);
        renderQuestionAndPalette();
      }
    });

    // 2. Add Bottom Navigation Buttons
    const navBar = document.createElement('div');
    navBar.className = 'question-nav-bar';
    navBar.innerHTML = `
      <div class="nav-buttons-left">
        <button class="btn btn-secondary" id="btn-prev-q" ${currentIndex === 0 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
          <span>← Previous</span>
        </button>
        <button class="btn btn-primary" id="btn-next-q">
          <span>${currentIndex === questions.length - 1 ? 'Review & Submit' : 'Next Question →'}</span>
        </button>
      </div>

      <div class="nav-buttons-right">
        <button class="btn btn-ghost btn-sm" id="btn-clear-answer" style="color:var(--text-muted);">
          <span>Clear Response</span>
        </button>
      </div>
    `;

    navBar.querySelector('#btn-prev-q').onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestionAndPalette();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    };

    navBar.querySelector('#btn-next-q').onclick = () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestionAndPalette();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        openSubmitModal();
      }
    };

    navBar.querySelector('#btn-clear-answer').onclick = () => {
      if (userAnswers[currentQ.id]) {
        delete userAnswers[currentQ.id];
        renderQuestionAndPalette();
      }
    };

    questionCol.innerHTML = '';
    questionCol.appendChild(cardEl);
    questionCol.appendChild(navBar);

    // 3. Render Right Sidebar Palette
    paletteCol.innerHTML = '';
    const paletteEl = renderQuestionPalette({
      questions,
      currentIndex,
      userAnswers,
      flaggedIds: store.getBookmarks(),
      mode,
      isSubmitted,
      onSelectIndex: (idx) => {
        currentIndex = idx;
        renderQuestionAndPalette();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      },
      onSubmit: openSubmitModal,
      submitLabel: `Submit Week ${weekNum}`
    });
    paletteCol.appendChild(paletteEl);
  }

  function openSubmitModal() {
    const total = questions.length;
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = total - answeredCount;

    let totalScore = 0;
    let maxPoints = 0;
    let correctCount = 0;

    questions.forEach(q => {
      maxPoints += q.points;
      const ans = userAnswers[q.id];
      if (ans) {
        const res = checkAnswer(q, ans);
        totalScore += res.score;
        if (res.isCorrect) correctCount++;
      }
    });

    const percentage = maxPoints > 0 ? Math.round((totalScore / maxPoints) * 100) : 0;

    const modalRoot = container.querySelector('#modal-container');
    modalRoot.innerHTML = `
      <div class="modal-overlay" id="submit-confirm-modal">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">Submit Week ${weekNum} Assignment?</h3>
            <button class="btn-icon" id="modal-close-btn">&times;</button>
          </div>

          <div class="modal-body">
            <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.25rem;">
              You have answered <strong>${answeredCount} of ${total}</strong> questions.
              ${unansweredCount > 0 ? `<br><span style="color:#f59e0b;">⚠️ You still have ${unansweredCount} unattempted questions!</span>` : 'You have completed all questions in this assignment!'}
            </p>

            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-around; text-align:center;">
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:#fff;">${answeredCount}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Answered</div>
              </div>
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:#f59e0b;">${unansweredCount}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Unattempted</div>
              </div>
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:#a5b4fc;">${maxPoints}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Max Marks</div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="modal-btn-cancel">Continue Practicing</button>
            <button class="btn btn-primary" id="modal-btn-confirm-submit">
              <span>Submit Assignment Now</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const closeModal = () => { modalRoot.innerHTML = ''; };

    modalRoot.querySelector('#modal-close-btn').onclick = closeModal;
    modalRoot.querySelector('#modal-btn-cancel').onclick = closeModal;

    modalRoot.querySelector('#modal-btn-confirm-submit').onclick = () => {
      closeModal();
      isSubmitted = true;
      mode = 'study'; // Automatically reveal full answers and explanations

      store.submitWeekAssignment(weekNum, {
        totalScore,
        maxPoints,
        percentage,
        correctCount,
        totalQuestions: total
      });

      if (percentage >= 70) {
        fireConfetti();
        playSound('complete');
      } else {
        playSound('correct');
      }

      openScoreResultModal(totalScore, maxPoints, percentage, correctCount, total);
      renderQuestionAndPalette();
    };
  }

  function openScoreResultModal(score, maxScore, percentage, correct, total) {
    const modalRoot = container.querySelector('#modal-container');
    modalRoot.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-dialog" style="text-align:center;">
          <div class="modal-body" style="padding:2.5rem 1.75rem;">
            <div class="badge badge-success" style="margin-bottom:1rem;">Assignment Submitted</div>
            <h2 style="font-size:1.85rem; font-weight:800; color:#fff; margin-bottom:0.5rem;">
              Week ${weekNum} Performance
            </h2>
            <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.75rem;">
              NPTEL Introduction to Large Language Models
            </p>

            <div class="result-score-circle">
              <span class="result-score-number">${score}</span>
              <span class="result-score-percent">/ ${maxScore} Marks</span>
            </div>

            <div style="display:flex; justify-content:center; gap:2rem; margin-bottom:2rem;">
              <div>
                <div style="font-size:1.4rem; font-weight:800; color:#fff;">${percentage}%</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Score</div>
              </div>
              <div>
                <div style="font-size:1.4rem; font-weight:800; color:#10b981;">${correct}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Correct</div>
              </div>
              <div>
                <div style="font-size:1.4rem; font-weight:800; color:#f43f5e;">${total - correct}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Wrong/Skip</div>
              </div>
            </div>

            <div style="display:flex; gap:0.75rem; justify-content:center;">
              <button class="btn btn-secondary" id="score-modal-btn-review">Review Detailed Solutions</button>
              <button class="btn btn-primary" id="score-modal-btn-next">
                <span>Next Week (${weekNum < 12 ? weekNum + 1 : 1}) →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('#score-modal-btn-review').onclick = () => {
      modalRoot.innerHTML = '';
      currentIndex = 0;
      renderQuestionAndPalette();
    };

    modalRoot.querySelector('#score-modal-btn-next').onclick = () => {
      modalRoot.innerHTML = '';
      const nextWeek = weekNum < 12 ? weekNum + 1 : 1;
      onNavigate('week', { week: nextWeek, mode: 'study' });
    };
  }

  // Keyboard navigation handler
  const handleKeyDown = (e) => {
    // Avoid capturing inputs inside text inputs or search modals
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestionAndPalette();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestionAndPalette();
      }
    } else if (['1', '2', '3', '4'].includes(e.key)) {
      const optIndex = parseInt(e.key) - 1;
      const q = questions[currentIndex];
      if (q.options && q.options[optIndex]) {
        const opt = q.options[optIndex];
        userAnswers[q.id] = opt.id;
        const res = checkAnswer(q, opt.id);
        store.saveWeekAnswer(weekNum, q.id, opt.id, res.isCorrect, res.score);
        if (mode === 'study') {
          if (res.isCorrect) playSound('correct');
          else playSound('incorrect');
        } else {
          playSound('click');
        }
        renderQuestionAndPalette();
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
