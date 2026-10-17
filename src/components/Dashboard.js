import { weeksMeta, courseInfo } from '../data/weeksData.js';
import { store } from '../state/store.js';

export function renderDashboard(container, onNavigate) {
  function update() {
    const stats = store.getGlobalStats(111);
    const state = store.getState();

    container.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-pill-badge">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981;"></span>
              ${courseInfo.offeredBy} · NPTEL 2026
            </div>
            
            <h1 class="hero-title">
              Master <span class="hero-title-gradient">Large Language Models</span>
            </h1>

            <p class="hero-description">
              Interactive practice portal for NPTEL's <strong>Introduction to Large Language Models</strong> course.
              Practice all 12 weekly assignments with instant verified explanations, or simulate the full <strong>111-Question Combined Mock Exam</strong>.
            </p>

            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" id="hero-btn-start-w1">
                <span>Start Practicing Week 1 →</span>
              </button>
              <button class="btn btn-secondary btn-lg" id="hero-btn-mock">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Take Combined Mock (111 Qs)</span>
              </button>
            </div>
          </div>

          <!-- Stats Overview Bar -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-card-glow"></div>
              <div class="stat-label">Questions Practiced</div>
              <div class="stat-value">
                <span>${stats.totalAnswered}</span>
                <span style="font-size:0.95rem; color:var(--text-muted); font-weight:600;">/ 111</span>
              </div>
              <div class="stat-subtext">${stats.completionRate}% of course bank attempted</div>
            </div>

            <div class="stat-card">
              <div class="stat-card-glow"></div>
              <div class="stat-label">Overall Accuracy</div>
              <div class="stat-value">
                <span>${stats.accuracy}%</span>
              </div>
              <div class="stat-subtext">${stats.totalCorrect} correct of ${stats.totalAnswered} attempted</div>
            </div>

            <div class="stat-card">
              <div class="stat-card-glow"></div>
              <div class="stat-label">Modules Completed</div>
              <div class="stat-value">
                <span>${stats.weeksCompleted}</span>
                <span style="font-size:0.95rem; color:var(--text-muted); font-weight:600;">/ 12</span>
              </div>
              <div class="stat-subtext">Assignments submitted</div>
            </div>

            <div class="stat-card">
              <div class="stat-card-glow"></div>
              <div class="stat-label">Best Mock Exam</div>
              <div class="stat-value">
                <span>${stats.bestMock !== null ? stats.bestMock + '%' : '--'}</span>
              </div>
              <div class="stat-subtext">${state.mockExams.length} mock tests attempted</div>
            </div>
          </div>

          <!-- Featured Combined Mock Banner -->
          <div class="mock-featured-card">
            <div class="mock-featured-inner">
              <div class="mock-featured-content">
                <div class="mock-tag-row">
                  <span class="badge badge-primary">Full Exam Simulation</span>
                  <span class="badge badge-cyan">111 Questions</span>
                  <span class="badge badge-warning">All 12 Weeks Combined</span>
                </div>
                <h2 class="mock-featured-title">NPTEL Final Certification Combined Mock</h2>
                <p class="mock-featured-desc">
                  Simulate real exam conditions with 111 verified NPTEL questions spanning all 12 weeks — from Distributional Semantics and N-grams, to Transformers, LoRA, Knowledge Graphs, and Responsible AI. Choose Sequential or Shuffled mode, with a live countdown timer and detailed analytics.
                </p>
              </div>

              <div style="display:flex; flex-direction:column; gap:0.6rem; min-width:200px;">
                <button class="btn btn-primary btn-lg" id="featured-mock-btn" style="width:100%;">
                  <span>Launch Mock Exam →</span>
                </button>
                <button class="btn btn-secondary btn-sm" id="featured-flashcards-btn" style="width:100%;">
                  <span>Quick Formula Revision</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Section: Weekly Assignments -->
          <div class="section-header">
            <div>
              <h2 class="section-title">Weekly Course Assignments</h2>
              <p class="section-subtitle">Practice each week in interactive Study Mode (instant solutions) or Exam Mode (timed submission).</p>
            </div>

            <div style="display:flex; align-items:center; gap:0.75rem;">
              <button class="btn btn-ghost btn-sm" id="btn-reset-progress" style="color:var(--text-faint); font-size:0.75rem;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Reset All Progress</span>
              </button>
            </div>
          </div>

          <!-- Weekly Modules 1 to 12 Cards Grid -->
          <div class="weeks-grid">
            ${weeksMeta.map(w => {
              const weekStat = state.weekProgress[w.week] || {};
              const attemptedCount = Object.keys(weekStat.answers || {}).length;
              const isCompleted = weekStat.completed;
              const bestScore = weekStat.bestScore;

              let statusBadge = `<span class="badge badge-subtle">Not Started</span>`;
              if (isCompleted) {
                statusBadge = `<span class="badge badge-success">Completed (${bestScore}%)</span>`;
              } else if (attemptedCount > 0) {
                statusBadge = `<span class="badge badge-warning">In Progress (${attemptedCount}/${w.totalQuestions})</span>`;
              }

              return `
                <div class="week-card" id="week-card-${w.week}">
                  <div class="week-card-top">
                    <span class="week-number-pill">Week ${w.week}</span>
                    ${statusBadge}
                  </div>

                  <h3 class="week-card-title">${w.title}</h3>
                  <p class="week-card-summary">${w.summary}</p>

                  <div class="week-topics-chips">
                    ${w.topics.slice(0, 3).map(t => `<span class="topic-chip">${t}</span>`).join('')}
                    ${w.topics.length > 3 ? `<span class="topic-chip">+${w.topics.length - 3} more</span>` : ''}
                  </div>

                  <div class="week-card-actions">
                    <button class="btn btn-primary btn-sm btn-practice-week" data-week="${w.week}" data-mode="study">
                      <span>Study Mode</span>
                    </button>
                    <button class="btn btn-secondary btn-sm btn-exam-week" data-week="${w.week}" data-mode="exam">
                      <span>Exam Mode</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;

    // Attach listeners
    container.querySelector('#hero-btn-start-w1').onclick = () => onNavigate('week', { week: 1, mode: 'study' });
    container.querySelector('#hero-btn-mock').onclick = () => onNavigate('mock');
    container.querySelector('#featured-mock-btn').onclick = () => onNavigate('mock');
    container.querySelector('#featured-flashcards-btn').onclick = () => onNavigate('flashcards');

    container.querySelector('#btn-reset-progress').onclick = () => {
      if (confirm('Are you sure you want to reset all practice progress, mock test scores, and bookmarks?')) {
        store.resetAllProgress();
        update();
      }
    };

    container.querySelectorAll('.btn-practice-week').forEach(btn => {
      btn.onclick = () => {
        const week = parseInt(btn.dataset.week);
        onNavigate('week', { week, mode: 'study' });
      };
    });

    container.querySelectorAll('.btn-exam-week').forEach(btn => {
      btn.onclick = () => {
        const week = parseInt(btn.dataset.week);
        onNavigate('week', { week, mode: 'exam' });
      };
    });
  }

  update();
  return {
    destroy: () => {}
  };
}
