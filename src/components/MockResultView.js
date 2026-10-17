import { allQuestions, checkAnswer } from '../data/questionsData.js';
import { weeksMeta } from '../data/weeksData.js';
import { store } from '../state/store.js';
import { renderQuestionCard } from './QuestionCard.js';

export function renderMockResultView(container, mockResult, onNavigate) {
  let activeReviewFilter = 'all'; // 'all' | 'correct' | 'incorrect' | 'flagged' | 'unattempted'
  const userAnswers = mockResult.userAnswers || {};

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  function getCertificateBadge(percent) {
    if (percent >= 90) return { label: 'Elite + Gold Medal', class: 'badge-gold' };
    if (percent >= 75) return { label: 'Elite + Silver Medal', class: 'badge-silver' };
    if (percent >= 60) return { label: 'Elite Certificate', class: 'badge-elite' };
    if (percent >= 40) return { label: 'Successfully Completed', class: 'badge-success' };
    return { label: 'Needs Improvement (<40%)', class: 'badge-error' };
  }

  function render() {
    const cert = getCertificateBadge(mockResult.percentage);

    // Filter questions for the solutions explorer
    const filteredQuestions = allQuestions.filter(q => {
      const ans = userAnswers[q.id];
      const hasAns = ans !== undefined && ans !== null && ans !== '';
      const res = hasAns ? checkAnswer(q, ans) : null;
      const isBookmarked = store.isBookmarked(q.id);

      if (activeReviewFilter === 'correct') return res && res.isCorrect;
      if (activeReviewFilter === 'incorrect') return hasAns && res && !res.isCorrect;
      if (activeReviewFilter === 'unattempted') return !hasAns;
      if (activeReviewFilter === 'flagged') return isBookmarked;
      return true;
    });

    container.innerHTML = `
      <div class="container practice-page-layout">
        <!-- Top Back Bar -->
        <div style="margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-secondary btn-sm" id="btn-result-home">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to Dashboard</span>
          </button>
          
          <button class="btn btn-primary btn-sm" id="btn-result-retake">
            <span>Retake Mock Exam</span>
          </button>
        </div>

        <!-- Result Hero Card -->
        <div class="result-hero-card">
          <div class="result-badge-top ${cert.class}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            <span>${cert.label}</span>
          </div>

          <h1 style="font-size:2.2rem; font-weight:800; color:#fff; margin-bottom:0.4rem;">
            Combined Mock Exam Results
          </h1>
          <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:2rem;">
            NPTEL Introduction to Large Language Models · 111 Questions · ${mockResult.totalScore}/${mockResult.maxPoints} Points
          </p>

          <div class="result-score-circle">
            <span class="result-score-number">${mockResult.totalScore}</span>
            <span class="result-score-percent">${mockResult.percentage}% (${mockResult.totalScore}/${mockResult.maxPoints} pts)</span>
          </div>

          <div class="result-stats-row">
            <div class="result-stat-col">
              <span class="result-stat-val" style="color:#10b981;">${mockResult.correctCount}</span>
              <span class="result-stat-lbl">Correct</span>
            </div>
            <div class="result-stat-col">
              <span class="result-stat-val" style="color:#f43f5e;">${mockResult.totalQuestions - mockResult.correctCount}</span>
              <span class="result-stat-lbl">Incorrect / Skipped</span>
            </div>
            <div class="result-stat-col">
              <span class="result-stat-val" style="color:#38bdf8;">${mockResult.answeredCount} / ${mockResult.totalQuestions}</span>
              <span class="result-stat-lbl">Attempted</span>
            </div>
            <div class="result-stat-col">
              <span class="result-stat-val" style="color:#a5b4fc;">${formatTime(mockResult.timeSpentSeconds)}</span>
              <span class="result-stat-lbl">Time Taken</span>
            </div>
          </div>
        </div>

        <!-- Week-by-Week Performance Breakdown Card -->
        <div class="week-breakdown-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:700; color:#fff;">Week-by-Week Performance Analytics</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">Identify strong topics and target areas requiring extra practice.</p>
            </div>
          </div>

          <div class="week-breakdown-grid">
            ${weeksMeta.map(w => {
              const ws = mockResult.weekScores?.[w.week] || { correct: 0, total: 10, score: 0, maxPoints: 10 };
              const wPercent = ws.maxPoints > 0 ? Math.round((ws.score / ws.maxPoints) * 100) : 0;
              
              let fillClass = 'fill-green';
              if (wPercent < 50) fillClass = 'fill-red';
              else if (wPercent < 75) fillClass = 'fill-amber';

              return `
                <div class="week-bar-item">
                  <div class="week-bar-header">
                    <span style="color:#fff;">Week ${w.week}: ${w.shortTitle.split(':')[1] || w.title}</span>
                    <span style="color:${wPercent >= 75 ? '#34d399' : (wPercent >= 50 ? '#fbbf24' : '#fb7185')}; font-weight:700;">
                      ${ws.score}/${ws.maxPoints} pts (${wPercent}%)
                    </span>
                  </div>
                  <div class="week-progress-track">
                    <div class="week-progress-fill ${fillClass}" style="width:${wPercent}%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Solutions & Detailed Explanations Explorer -->
        <div style="margin-top:2.5rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <h3 style="font-size:1.3rem; font-weight:800; color:#fff;">Comprehensive Solutions Explorer</h3>
              <p style="font-size:0.85rem; color:var(--text-secondary);">Review verified answers, score breakdowns, and detailed mathematical derivations.</p>
            </div>

            <!-- Review Filter Buttons -->
            <div class="mode-toggle-group">
              <button class="mode-toggle-btn ${activeReviewFilter === 'all' ? 'active' : ''}" data-rf="all">
                All (${mockResult.totalQuestions})
              </button>
              <button class="mode-toggle-btn ${activeReviewFilter === 'incorrect' ? 'active' : ''}" data-rf="incorrect">
                Incorrect (${mockResult.totalQuestions - mockResult.correctCount})
              </button>
              <button class="mode-toggle-btn ${activeReviewFilter === 'correct' ? 'active' : ''}" data-rf="correct">
                Correct (${mockResult.correctCount})
              </button>
              <button class="mode-toggle-btn ${activeReviewFilter === 'flagged' ? 'active' : ''}" data-rf="flagged">
                ★ Bookmarked
              </button>
            </div>
          </div>

          <!-- Question Cards Container -->
          <div style="display:flex; flex-direction:column; gap:1.5rem;" id="solutions-list-root">
            ${filteredQuestions.map((q, idx) => {
              const ans = userAnswers[q.id];
              const cardEl = renderQuestionCard({
                question: q,
                questionIndex: allQuestions.indexOf(q),
                totalQuestions: allQuestions.length,
                userAnswer: ans,
                onAnswerChange: () => {},
                mode: 'study',
                isSubmitted: true,
                isBookmarked: store.isBookmarked(q.id),
                onBookmarkToggle: (qId) => {
                  store.toggleBookmark(qId);
                  render();
                }
              });
              return cardEl.outerHTML;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Attach listeners
    container.querySelector('#btn-result-home').onclick = () => onNavigate('dashboard');
    container.querySelector('#btn-result-retake').onclick = () => onNavigate('mock');

    container.querySelectorAll('.mode-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        activeReviewFilter = btn.dataset.rf;
        render();
      };
    });
  }

  render();

  return {
    destroy: () => {}
  };
}
