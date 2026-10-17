import { checkAnswer } from '../data/questionsData.js';

export function renderQuestionPalette({
  questions,
  currentIndex,
  userAnswers = {},
  flaggedIds = [],
  mode = 'study',
  isSubmitted = false,
  onSelectIndex,
  onSubmit,
  submitLabel = 'Submit Assignment',
  showSubmit = true,
  is180Grid = false
}) {
  const container = document.createElement('div');
  container.className = 'palette-card';

  const total = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = flaggedIds.length;

  container.innerHTML = `
    <div class="palette-header">
      <span class="palette-title">Question Palette</span>
      <span class="badge badge-subtle">${answeredCount} / ${total} Answered</span>
    </div>

    <div class="${is180Grid ? 'palette-grid-180' : 'palette-grid'}">
      ${questions.map((q, idx) => {
        const isCurrent = idx === currentIndex;
        const ans = userAnswers[q.id];
        const hasAnswer = ans !== undefined && ans !== null && ans !== '';
        const isFlagged = flaggedIds.includes(q.id);

        let pillClass = 'q-pill';
        if (isCurrent) pillClass += ' current';
        if (hasAnswer) pillClass += ' answered';
        if (isFlagged) pillClass += ' flagged';

        if ((mode === 'study' || isSubmitted) && hasAnswer) {
          const res = checkAnswer(q, ans);
          if (res.isCorrect) pillClass += ' correct-pill';
          else pillClass += ' incorrect-pill';
        }

        return `
          <button 
            type="button" 
            class="${pillClass}" 
            data-index="${idx}"
            title="Question ${idx + 1}"
          >
            ${idx + 1}
          </button>
        `;
      }).join('')}
    </div>

    <!-- Palette Status Legend -->
    <div class="palette-legend">
      <div class="legend-item">
        <span class="legend-dot" style="background:var(--primary);"></span>
        <span>Answered (${answeredCount})</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background:#f59e0b;"></span>
        <span>Flagged (${flaggedCount})</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background:rgba(255,255,255,0.2);"></span>
        <span>Remaining (${total - answeredCount})</span>
      </div>
      ${mode === 'study' || isSubmitted ? `
        <div class="legend-item">
          <span class="legend-dot" style="background:var(--success);"></span>
          <span>Correct</span>
        </div>
      ` : ''}
    </div>

    ${showSubmit ? `
      <button class="btn btn-primary btn-sm" id="palette-btn-submit" style="width:100%; margin-top:0.5rem;">
        <span>${submitLabel}</span>
      </button>
    ` : ''}
  `;

  // Attach jump events
  container.querySelectorAll('.q-pill').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.index);
      onSelectIndex(idx);
    };
  });

  const submitBtn = container.querySelector('#palette-btn-submit');
  if (submitBtn) {
    submitBtn.onclick = onSubmit;
  }

  return container;
}
