import { week1Questions } from './weeks/week1.js';
import { week2Questions } from './weeks/week2.js';
import { week3Questions } from './weeks/week3.js';
import { week4Questions } from './weeks/week4.js';
import { week5Questions } from './weeks/week5.js';
import { week6Questions } from './weeks/week6.js';
import { week7Questions } from './weeks/week7.js';
import { week8Questions } from './weeks/week8.js';
import { week9Questions } from './weeks/week9.js';
import { week10Questions } from './weeks/week10.js';
import { week11Questions } from './weeks/week11.js';
import { week12Questions } from './weeks/week12.js';

export const allQuestions = [
  ...week1Questions,
  ...week2Questions,
  ...week3Questions,
  ...week4Questions,
  ...week5Questions,
  ...week6Questions,
  ...week7Questions,
  ...week8Questions,
  ...week9Questions,
  ...week10Questions,
  ...week11Questions,
  ...week12Questions
];

// Helper mapping week numbers to questions
export const questionsByWeek = {
  1: week1Questions,
  2: week2Questions,
  3: week3Questions,
  4: week4Questions,
  5: week5Questions,
  6: week6Questions,
  7: week7Questions,
  8: week8Questions,
  9: week9Questions,
  10: week10Questions,
  11: week11Questions,
  12: week12Questions
};

export function getQuestionsForWeek(weekNum) {
  return questionsByWeek[weekNum] || [];
}

export function getQuestionById(id) {
  return allQuestions.find(q => q.id === id);
}

export function searchQuestions(query) {
  if (!query || query.trim() === '') return [];
  const lower = query.toLowerCase().trim();
  return allQuestions.filter(q => 
    q.question.toLowerCase().includes(lower) ||
    q.topic.toLowerCase().includes(lower) ||
    (q.explanation && q.explanation.toLowerCase().includes(lower)) ||
    q.options.some(opt => opt.text.toLowerCase().includes(lower))
  );
}

export function checkAnswer(question, userAnswer) {
  if (!userAnswer) return { isCorrect: false, score: 0 };
  
  if (question.type === 'numerical') {
    const numericInput = parseFloat(userAnswer);
    const expected = question.acceptedNumeric;
    const isCorrect = !isNaN(numericInput) && Math.abs(numericInput - expected) < 0.01;
    return {
      isCorrect,
      score: isCorrect ? question.points : 0
    };
  }
  
  if (question.type === 'multiple_choice') {
    const selected = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    const correctIds = question.acceptedOptionIds || [];
    
    // Check if selected options match correct options exactly
    const hasAllCorrect = correctIds.every(id => selected.includes(id));
    const hasNoExtra = selected.every(id => correctIds.includes(id));
    const isCorrect = hasAllCorrect && hasNoExtra;
    
    // Partial score calculation for partial correct selections (common in NPTEL)
    let correctCount = selected.filter(id => correctIds.includes(id)).length;
    let wrongCount = selected.filter(id => !correctIds.includes(id)).length;
    let partialRatio = Math.max(0, (correctCount - wrongCount) / correctIds.length);
    let score = isCorrect ? question.points : (partialRatio > 0 ? Math.round(partialRatio * question.points * 100) / 100 : 0);

    return {
      isCorrect,
      score,
      isPartial: !isCorrect && score > 0
    };
  }
  
  // Single choice
  const selectedId = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;
  const isCorrect = question.acceptedOptionIds.includes(selectedId);
  return {
    isCorrect,
    score: isCorrect ? question.points : 0
  };
}
