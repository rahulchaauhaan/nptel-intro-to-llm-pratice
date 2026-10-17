// State manager with localStorage persistence and pub-sub events

const STORAGE_KEY = 'nptel_llm_hub_v1';

function getDefaultState() {
  return {
    weekProgress: {}, // { [weekNum]: { answers: {}, completed: false, lastScore: 0, bestScore: 0, attempts: 0 } }
    bookmarks: [],    // array of question IDs
    mockExams: [],    // history of completed mocks
    activeMockSession: null, // in-progress mock state: { startTime, timeRemaining, answers: {}, flagged: [] }
    settings: {
      soundEnabled: true,
      instantFeedbackInPractice: true
    }
  };
}

let state = loadState();
const listeners = new Set();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    return { ...getDefaultState(), ...parsed };
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return getDefaultState();
  }
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(eventType, payload) {
  persistState();
  listeners.forEach(fn => {
    try {
      fn(eventType, payload, state);
    } catch (err) {
      console.error('Error in store listener:', err);
    }
  });
}

export const store = {
  subscribe,
  getState() {
    return state;
  },

  // Bookmarks
  toggleBookmark(questionId) {
    const index = state.bookmarks.indexOf(questionId);
    let isBookmarkedNow = false;
    if (index >= 0) {
      state.bookmarks.splice(index, 1);
      isBookmarkedNow = false;
    } else {
      state.bookmarks.push(questionId);
      isBookmarkedNow = true;
    }
    notify('BOOKMARKS_UPDATED', { questionId, isBookmarked: isBookmarkedNow });
    return isBookmarkedNow;
  },

  isBookmarked(questionId) {
    return state.bookmarks.includes(questionId);
  },

  getBookmarks() {
    return [...state.bookmarks];
  },

  // Week Assignment Progress
  saveWeekAnswer(weekNum, questionId, answer, isCorrect, score) {
    if (!state.weekProgress[weekNum]) {
      state.weekProgress[weekNum] = {
        answers: {},
        completed: false,
        lastScore: 0,
        bestScore: 0,
        attempts: 0
      };
    }
    const wp = state.weekProgress[weekNum];
    wp.answers[questionId] = {
      answer,
      isCorrect,
      score,
      answeredAt: Date.now()
    };
    notify('WEEK_ANSWER_SAVED', { weekNum, questionId });
  },

  getWeekAnswers(weekNum) {
    return state.weekProgress[weekNum]?.answers || {};
  },

  submitWeekAssignment(weekNum, results) {
    if (!state.weekProgress[weekNum]) {
      state.weekProgress[weekNum] = {
        answers: {},
        completed: false,
        lastScore: 0,
        bestScore: 0,
        attempts: 0
      };
    }
    const wp = state.weekProgress[weekNum];
    wp.completed = true;
    wp.attempts = (wp.attempts || 0) + 1;
    wp.lastScore = results.percentage;
    wp.bestScore = Math.max(wp.bestScore || 0, results.percentage);
    wp.lastSubmittedAt = Date.now();
    
    notify('WEEK_SUBMITTED', { weekNum, results });
  },

  getWeekStats(weekNum) {
    return state.weekProgress[weekNum] || {
      answers: {},
      completed: false,
      lastScore: 0,
      bestScore: 0,
      attempts: 0
    };
  },

  clearWeekProgress(weekNum) {
    if (state.weekProgress[weekNum]) {
      delete state.weekProgress[weekNum];
      notify('WEEK_CLEARED', { weekNum });
    }
  },

  // Mock Exams
  saveActiveMockSession(sessionData) {
    state.activeMockSession = sessionData;
    persistState();
  },

  clearActiveMockSession() {
    state.activeMockSession = null;
    persistState();
  },

  getActiveMockSession() {
    return state.activeMockSession;
  },

  saveMockResult(mockResult) {
    const resultObj = {
      id: 'mock_' + Date.now(),
      date: new Date().toISOString(),
      ...mockResult
    };
    state.mockExams.unshift(resultObj);
    state.activeMockSession = null;
    notify('MOCK_COMPLETED', resultObj);
    return resultObj;
  },

  getMockHistory() {
    return state.mockExams || [];
  },

  getBestMockScore() {
    if (!state.mockExams || state.mockExams.length === 0) return null;
    return Math.max(...state.mockExams.map(m => m.percentage || 0));
  },

  // Global Aggregate Stats
  getGlobalStats(totalQuestions = 111) {
    let totalAnswered = 0;
    let totalCorrect = 0;
    let totalPoints = 0;
    let weeksCompleted = 0;

    Object.entries(state.weekProgress).forEach(([w, data]) => {
      if (data.completed) weeksCompleted++;
      Object.values(data.answers || {}).forEach(ans => {
        totalAnswered++;
        if (ans.isCorrect) totalCorrect++;
        totalPoints += (ans.score || 0);
      });
    });

    const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    const bestMock = this.getBestMockScore();

    return {
      totalAnswered,
      totalCorrect,
      totalPoints,
      accuracy,
      weeksCompleted,
      bestMock,
      totalBookmarks: state.bookmarks.length,
      completionRate: Math.round((totalAnswered / totalQuestions) * 100)
    };
  },

  // Settings
  toggleSound() {
    state.settings.soundEnabled = !state.settings.soundEnabled;
    notify('SETTINGS_UPDATED', state.settings);
    return state.settings.soundEnabled;
  },

  resetAllProgress() {
    state = getDefaultState();
    persistState();
    notify('RESET_ALL', {});
  }
};
