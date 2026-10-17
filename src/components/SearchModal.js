import { searchQuestions } from '../data/questionsData.js';

export function openSearchModal(onSelectQuestion) {
  const existing = document.getElementById('search-modal-root');
  if (existing) existing.remove();

  const modalContainer = document.createElement('div');
  modalContainer.id = 'search-modal-root';
  modalContainer.className = 'modal-overlay';

  modalContainer.innerHTML = `
    <div class="modal-dialog" style="max-width:680px; max-height:85vh; display:flex; flex-direction:column;">
      <div style="padding:1.15rem 1.5rem; border-bottom:1px solid var(--border-subtle); display:flex; align-items:center; gap:0.75rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--text-muted);"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input 
          type="text" 
          id="search-input-field" 
          placeholder="Search by topic, formula, or keyword (e.g. einsum, LoRA, Kneser-Ney, attention)..."
          style="width:100%; background:transparent; border:none; color:#fff; font-size:1.05rem; font-weight:500; outline:none;"
        />
        <kbd style="font-size:0.7rem; padding:2px 6px; background:rgba(255,255,255,0.08); border-radius:4px; color:var(--text-muted);">ESC</kbd>
      </div>

      <div id="search-results-list" style="overflow-y:auto; padding:1rem; flex:1; display:flex; flex-direction:column; gap:0.6rem;">
        <div style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding:2.5rem 1rem;">
          Type anything above to search through all 111 NPTEL LLM questions and explanations.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  const inputField = modalContainer.querySelector('#search-input-field');
  const resultsContainer = modalContainer.querySelector('#search-results-list');

  inputField.focus();

  const closeModal = () => {
    modalContainer.remove();
    document.removeEventListener('keydown', handleEsc);
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', handleEsc);

  modalContainer.onclick = (e) => {
    if (e.target === modalContainer) closeModal();
  };

  inputField.oninput = () => {
    const query = inputField.value.trim();
    if (query === '') {
      resultsContainer.innerHTML = `
        <div style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding:2.5rem 1rem;">
          Type anything above to search through all 111 NPTEL LLM questions and explanations.
        </div>
      `;
      return;
    }

    const results = searchQuestions(query);

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:2.5rem 1rem;">
          No questions found matching "<strong>${query}</strong>". Try searching for topics like <em>RoPE</em>, <em>BPE</em>, <em>Perplexity</em>, or <em>einsum</em>.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = results.map(q => `
      <div 
        class="search-result-item" 
        data-qid="${q.id}" 
        data-week="${q.week}"
        style="padding:0.85rem 1rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-md); cursor:pointer; transition:all 0.15s ease;"
      >
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
          <span class="week-number-pill" style="font-size:0.65rem; padding:0.15rem 0.45rem;">Week ${q.week}</span>
          <span class="badge badge-cyan" style="font-size:0.65rem; padding:0.15rem 0.45rem;">${q.topic}</span>
          <span class="badge badge-subtle" style="font-size:0.65rem; padding:0.15rem 0.45rem;">${q.points} pt</span>
        </div>
        <div style="font-size:0.88rem; font-weight:600; color:#fff; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
          ${q.question}
        </div>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.onmouseenter = () => {
        item.style.background = 'rgba(99, 102, 241, 0.12)';
        item.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      };
      item.onmouseleave = () => {
        item.style.background = 'rgba(255,255,255,0.03)';
        item.style.borderColor = 'var(--border-subtle)';
      };
      item.onclick = () => {
        const week = parseInt(item.dataset.week);
        const qid = item.dataset.qid;
        closeModal();
        onSelectQuestion(week, qid);
      };
    });
  };
}
