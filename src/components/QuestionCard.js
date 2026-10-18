import { checkAnswer } from '../data/questionsData.js';
import { playSound } from '../utils/sound.js';

export function renderQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  pendingAnswer = null,
  onAnswerChange,
  onPendingChange,
  onReattempt,
  mode = 'study',
  isSubmitted = false,
  isBookmarked = false,
  onBookmarkToggle
}) {
  const card = document.createElement('div');
  card.className = 'question-card animate-fade';

  const isMultiple = question.type === 'multiple_choice';
  const isNumerical = question.type === 'numerical';
  
  const hasSubmittedAnswer = userAnswer !== null && userAnswer !== undefined && 
    (Array.isArray(userAnswer) ? userAnswer.length > 0 : userAnswer !== '');

  const showFeedback = mode === 'study' ? (isMultiple ? hasSubmittedAnswer : Boolean(userAnswer)) : isSubmitted;
  
  const evaluatedAnswer = isMultiple ? (userAnswer || null) : userAnswer;
  const checkResult = showFeedback && evaluatedAnswer !== null ? checkAnswer(question, evaluatedAnswer) : null;

  // Render Einsum matrix if present
  let matrixHtml = '';
  if (question.matrixA && question.matrixB) {
    matrixHtml = `
      <div class="matrix-comparison-box">
        <div class="matrix-grid-wrapper">
          <div class="matrix-card">
            <div class="matrix-label">Matrix A</div>
            <div class="matrix-bracket-table">
              <div class="matrix-inner-grid">
                <div>${question.matrixA[0][0]}</div>
                <div>${question.matrixA[0][1]}</div>
                <div>${question.matrixA[1][0]}</div>
                <div>${question.matrixA[1][1]}</div>
              </div>
            </div>
          </div>

          <div class="matrix-card">
            <div class="matrix-label">Matrix B</div>
            <div class="matrix-bracket-table">
              <div class="matrix-inner-grid">
                <div>${question.matrixB[0][0]}</div>
                <div>${question.matrixB[0][1]}</div>
                <div>${question.matrixB[1][0]}</div>
                <div>${question.matrixB[1][1]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render options or numeric input
  let optionsHtml = '';
  let currentSelections = [];

  if (isNumerical) {
    const val = userAnswer || '';
    optionsHtml = `
      <div class="numerical-input-container">
        <input 
          type="number" 
          step="any"
          class="numerical-input" 
          id="num-input-${question.id}" 
          placeholder="Enter numeric scalar..."
          value="${val}"
        />
        <button class="btn btn-primary btn-sm" id="btn-submit-num">
          <span>Apply</span>
        </button>
      </div>
    `;
  } else if (isMultiple) {
    if (hasSubmittedAnswer) {
      currentSelections = Array.isArray(userAnswer) ? [...userAnswer] : [userAnswer];
    } else {
      currentSelections = Array.isArray(pendingAnswer) ? [...pendingAnswer] : [];
    }

    optionsHtml = `
      <div class="mcq-badge-indicator">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span>Multiple Choice (Select all that apply${mode === 'study' ? ', then click Submit Answer' : ''})</span>
      </div>

      <div class="options-list">
        ${question.options.map(opt => {
          const isSelected = currentSelections.includes(opt.id);
          const isCorrectChoice = (question.acceptedOptionIds || []).includes(opt.id);

          let stateClass = '';
          if (isSelected) stateClass += ' selected';

          if (showFeedback) {
            if (isCorrectChoice) {
              stateClass += ' correct';
            } else if (isSelected && !isCorrectChoice) {
              stateClass += ' incorrect';
            } else {
              stateClass += ' dimmed';
            }
          }

          const checkmarkSvg = (isSelected || (showFeedback && isCorrectChoice))
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`
            : '';

          return `
            <button 
              type="button" 
              class="option-btn ${stateClass}" 
              data-opt-id="${opt.id}"
            >
              <span class="option-checkbox">${checkmarkSvg}</span>
              <span class="option-letter">${opt.id}</span>
              <span class="option-text">${opt.text}</span>
            </button>
          `;
        }).join('')}
      </div>

      ${mode === 'study' ? `
        <div class="mcq-submit-wrapper">
          ${!showFeedback ? `
            <button 
              type="button" 
              class="btn btn-primary" 
              id="btn-submit-mcq" 
              ${currentSelections.length === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Submit Answer</span>
            </button>
            <span class="mcq-selection-hint" id="mcq-hint-text">
              ${currentSelections.length === 0 ? 'Select all applicable options, then click Submit' : `${currentSelections.length} option${currentSelections.length > 1 ? 's' : ''} selected`}
            </span>
          ` : `
            <button type="button" class="btn btn-secondary btn-sm" id="btn-reattempt-mcq">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              <span>Re-attempt Question</span>
            </button>
          `}
        </div>
      ` : ''}
    `;
  } else {
    // Single choice
    const selectedOption = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;

    optionsHtml = `
      <div class="options-list">
        ${question.options.map(opt => {
          const isSelected = selectedOption === opt.id;
          const isCorrectChoice = (question.acceptedOptionIds || []).includes(opt.id);

          let stateClass = '';
          if (isSelected) stateClass += ' selected';

          if (showFeedback) {
            if (isCorrectChoice) {
              stateClass += ' correct';
            } else if (isSelected && !isCorrectChoice) {
              stateClass += ' incorrect';
            } else {
              stateClass += ' dimmed';
            }
          }

          return `
            <button 
              type="button" 
              class="option-btn ${stateClass}" 
              data-opt-id="${opt.id}"
            >
              <span class="option-letter">${opt.id}</span>
              <span class="option-text">${opt.text}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  // Render feedback banner
  let feedbackHtml = '';
  if (showFeedback && checkResult) {
    const isCorrect = checkResult.isCorrect;
    const score = checkResult.score;

    let acceptedStr = '';
    if (isNumerical) {
      acceptedStr = `Type: Numeric: ${question.acceptedNumeric}`;
    } else {
      acceptedStr = (question.acceptedAnswers || []).join(', ');
    }

    feedbackHtml = `
      <div class="feedback-banner ${isCorrect ? 'feedback-banner-correct' : 'feedback-banner-incorrect'}">
        <div class="feedback-top-row">
          <div class="feedback-status-pill" style="color:${isCorrect ? '#34d399' : '#fb7185'};">
            ${isCorrect 
              ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Yes, the answer is correct.`
              : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> No, the answer is incorrect.`
            }
          </div>
          <div class="badge ${isCorrect ? 'badge-success' : 'badge-error'}">
            Score: ${score} / ${question.points} Point${question.points > 1 ? 's' : ''}
          </div>
        </div>

        <div class="feedback-accepted-row">
          <span style="color:var(--text-muted); font-size:0.8rem;">Accepted answer is:</span>
          <span class="accepted-answer-text">${acceptedStr}</span>
        </div>

        ${question.explanation ? `
          <div class="explanation-box">
            <div class="explanation-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>Solution & Explanation</span>
            </div>
            <div class="explanation-body">${question.explanation}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  card.innerHTML = `
    <div class="question-meta-row">
      <div class="question-tags-left">
        <span class="badge badge-primary">Q${questionIndex + 1} of ${totalQuestions}</span>
        <span class="badge badge-cyan">${question.topic}</span>
        <span class="badge badge-subtle">${question.points} Point${question.points > 1 ? 's' : ''}</span>
      </div>

      <div class="question-actions-right">
        <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" id="btn-toggle-star">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${isBookmarked ? '#f59e0b' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>
    </div>

    <div class="question-prompt">${question.question}</div>

    ${matrixHtml}
    ${optionsHtml}
    ${feedbackHtml}
  `;

  // Attach Handlers
  if (isNumerical) {
    const numInput = card.querySelector(`#num-input-${question.id}`);
    const submitBtn = card.querySelector('#btn-submit-num');

    const handleNumSubmit = () => {
      const val = numInput.value.trim();
      if (val === '') return;
      onAnswerChange(val);

      if (mode === 'study') {
        const res = checkAnswer(question, val);
        if (res.isCorrect) playSound('correct');
        else playSound('incorrect');
      } else {
        playSound('click');
      }
    };

    submitBtn.onclick = handleNumSubmit;
    numInput.onkeydown = (e) => {
      if (e.key === 'Enter') handleNumSubmit();
    };
  } else if (isMultiple) {
    if (mode === 'study') {
      if (!showFeedback) {
        // Unsubmitted state: allow toggling multiple answers without evaluating
        card.querySelectorAll('.option-btn').forEach(btn => {
          btn.onclick = () => {
            const optId = btn.dataset.optId;
            const idx = currentSelections.indexOf(optId);
            if (idx >= 0) {
              currentSelections.splice(idx, 1);
            } else {
              currentSelections.push(optId);
            }

            const isSel = currentSelections.includes(optId);
            btn.classList.toggle('selected', isSel);
            const cb = btn.querySelector('.option-checkbox');
            if (cb) {
              cb.innerHTML = isSel 
                ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` 
                : '';
            }

            const submitBtn = card.querySelector('#btn-submit-mcq');
            const hintEl = card.querySelector('#mcq-hint-text');
            if (submitBtn) {
              if (currentSelections.length > 0) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
              } else {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
              }
            }
            if (hintEl) {
              hintEl.textContent = currentSelections.length === 0 
                ? 'Select all applicable options, then click Submit' 
                : `${currentSelections.length} option${currentSelections.length > 1 ? 's' : ''} selected`;
            }

            playSound('click');
            if (onPendingChange) {
              onPendingChange([...currentSelections]);
            }
          };
        });

        const submitBtn = card.querySelector('#btn-submit-mcq');
        if (submitBtn) {
          submitBtn.onclick = () => {
            if (currentSelections.length === 0) return;
            const res = checkAnswer(question, currentSelections);
            if (res.isCorrect) playSound('correct');
            else playSound('incorrect');
            onAnswerChange([...currentSelections]);
          };
        }
      } else {
        // Feedback is shown: handle re-attempt
        const reattemptBtn = card.querySelector('#btn-reattempt-mcq');
        const triggerReattempt = () => {
          playSound('click');
          if (onReattempt) {
            onReattempt();
          } else {
            onAnswerChange(null);
          }
        };

        if (reattemptBtn) {
          reattemptBtn.onclick = triggerReattempt;
        }

        // Clicking any option button also unlocks the question for editing
        card.querySelectorAll('.option-btn').forEach(btn => {
          btn.onclick = triggerReattempt;
        });
      }
    } else {
      // Exam Mode: toggling saves answer silently without evaluating
      card.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = () => {
          const optId = btn.dataset.optId;
          const idx = currentSelections.indexOf(optId);
          if (idx >= 0) {
            currentSelections.splice(idx, 1);
          } else {
            currentSelections.push(optId);
          }
          btn.classList.toggle('selected', currentSelections.includes(optId));
          const cb = btn.querySelector('.option-checkbox');
          if (cb) {
            cb.innerHTML = currentSelections.includes(optId) 
              ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` 
              : '';
          }
          playSound('click');
          onAnswerChange(currentSelections.length > 0 ? [...currentSelections] : null);
        };
      });
    }
  } else {
    // Single choice questions
    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.onclick = () => {
        const optId = btn.dataset.optId;
        if (mode === 'study') {
          const res = checkAnswer(question, optId);
          if (res.isCorrect) playSound('correct');
          else playSound('incorrect');
        } else {
          playSound('click');
        }
        onAnswerChange(optId);
      };
    });
  }

  // Bookmark Toggle
  card.querySelector('#btn-toggle-star').onclick = () => {
    playSound('click');
    onBookmarkToggle(question.id);
  };

  return card;
}
