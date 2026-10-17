export const week2Questions = [
  {
    "id": "w2-q1",
    "week": 2,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "Perplexity",
    "question": "Which of the following has the least direct effect on a model's perplexity over a fixed test set?",
    "options": [
      {
        "id": "A",
        "text": "Vocabulary size"
      },
      {
        "id": "B",
        "text": "Probability assigned to the test sentences"
      },
      {
        "id": "C",
        "text": "Number of tokens in the test set"
      },
      {
        "id": "D",
        "text": "Average sentence length"
      }
    ],
    "acceptedAnswers": [
      "Vocabulary size"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Perplexity is 2^(-average log-prob per token). Vocabulary size does not directly appear in this formula — it indirectly affects the model's parameter space, but the direct factors are the log-probabilities assigned to each token in the test set."
  },
  {
    "id": "w2-q2",
    "week": 2,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Language Model Objective",
    "question": "What is the central task of a probabilistic language model?",
    "options": [
      {
        "id": "A",
        "text": "Translating between languages"
      },
      {
        "id": "B",
        "text": "Assigning probabilities to word sequences (predicting the next word)"
      },
      {
        "id": "C",
        "text": "Clustering documents by topic"
      },
      {
        "id": "D",
        "text": "Extracting named entities"
      }
    ],
    "acceptedAnswers": [
      "Assigning probabilities to word sequences (predicting the next word)"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "A probabilistic language model assigns a probability P(w1, w2, ..., wn) to a word sequence. Equivalently, it models the conditional probability P(wt | w1, ..., w_{t-1}) of the next word given its history."
  },
  {
    "id": "w2-q3",
    "week": 2,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Chain Rule of Probability",
    "question": "Which equation correctly expresses the chain rule for a 3-word sentence?",
    "options": [
      {
        "id": "A",
        "text": "P(w1, w2, w3) = P(w1) × P(w2|w1) × P(w3|w1, w2)"
      },
      {
        "id": "B",
        "text": "P(w1, w2, w3) = P(w1) + P(w2|w1) + P(w3|w2)"
      },
      {
        "id": "C",
        "text": "P(w1, w2, w3) = P(w1) × P(w2) × P(w3)"
      },
      {
        "id": "D",
        "text": "P(w1, w2, w3) = P(w3|w2) × P(w2|w1)"
      }
    ],
    "acceptedAnswers": [
      "P(w1, w2, w3) = P(w1) × P(w2|w1) × P(w3|w1, w2)"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "The probability chain rule: P(A,B,C) = P(A)·P(B|A)·P(C|A,B). For a sentence, each word's probability is conditioned on all preceding words."
  },
  {
    "id": "w2-q4",
    "week": 2,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "Markov Assumption",
    "question": "Which assumption allows n-gram models to reduce computation?",
    "options": [
      {
        "id": "A",
        "text": "Bayes Assumption"
      },
      {
        "id": "B",
        "text": "Chain Rule"
      },
      {
        "id": "C",
        "text": "Independence Assumption"
      },
      {
        "id": "D",
        "text": "Markov Assumption"
      }
    ],
    "acceptedAnswers": [
      "Markov Assumption"
    ],
    "acceptedOptionIds": [
      "D"
    ],
    "explanation": "The Markov Assumption states that the probability of the next word depends only on the previous n-1 words, not the full history. This makes computation tractable."
  },
  {
    "id": "w2-q5",
    "week": 2,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "N-gram Order",
    "question": "A model that conditions each word on the previous two words is equivalent to which Markov model?",
    "options": [
      {
        "id": "A",
        "text": "First-order"
      },
      {
        "id": "B",
        "text": "Second-order"
      },
      {
        "id": "C",
        "text": "Third-order"
      },
      {
        "id": "D",
        "text": "Fourth-order"
      }
    ],
    "acceptedAnswers": [
      "Second-order"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "A trigram model conditions on the previous 2 words: P(wt | w_{t-1}, w_{t-2}). This is a 2nd-order Markov model because it looks back 2 steps. A bigram (1 word back) is 1st-order."
  },
  {
    "id": "w2-q6",
    "week": 2,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Smoothing Techniques",
    "question": "Which smoothing technique leverages the number of unique contexts a word appears in?",
    "options": [
      {
        "id": "A",
        "text": "Good-Turing"
      },
      {
        "id": "B",
        "text": "Add-k"
      },
      {
        "id": "C",
        "text": "Kneser-Ney"
      },
      {
        "id": "D",
        "text": "Absolute Discounting"
      }
    ],
    "acceptedAnswers": [
      "Kneser-Ney"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Kneser-Ney smoothing uses the continuation probability — the number of unique contexts (different preceding words) a word appears in. Words like 'Francisco' appear only after 'San', so they get low continuation probability."
  },
  {
    "id": "w2-q7",
    "week": 2,
    "questionNumber": 7,
    "points": 2,
    "type": "single_choice",
    "topic": "Bigram Probability",
    "question": "For Questions 7–8, consider the following corpus:\n<s> the river flows to sea </s>\n<s> boats sail on the river </s>\n<s> the sea is deep </s>\n\nAssuming a bigram language model, calculate the probability of the sentence:\n'the sea flows to river'\n(Ignore the unigram probability of P(<s>) in your calculation.)",
    "options": [
      {
        "id": "A",
        "text": "2/37"
      },
      {
        "id": "B",
        "text": "1/27"
      },
      {
        "id": "C",
        "text": "0"
      },
      {
        "id": "D",
        "text": "1/36"
      }
    ],
    "acceptedAnswers": [
      "0"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "P('the sea flows to river') requires P(flows|sea). In the corpus, 'sea' is only followed by '</s>' (in sentence 1) and 'is' (in sentence 3). The bigram (sea, flows) never occurs, so P(flows|sea) = 0, making the entire sentence probability 0."
  },
  {
    "id": "w2-q8",
    "week": 2,
    "questionNumber": 8,
    "points": 2,
    "type": "single_choice",
    "topic": "Perplexity Calculation",
    "question": "Assuming a bigram language model, calculate the perplexity of the sentence:\n'the sea flows to river'\n(Do not consider <s> and </s> as words of the sentence.)",
    "options": [
      {
        "id": "A",
        "text": "122^(3/4)"
      },
      {
        "id": "B",
        "text": "91^(1/5)"
      },
      {
        "id": "C",
        "text": "0"
      },
      {
        "id": "D",
        "text": "None of these"
      }
    ],
    "acceptedAnswers": [
      "None of these"
    ],
    "acceptedOptionIds": [
      "D"
    ],
    "explanation": "Since P('the sea flows to river') = 0 (as shown in Q7, the bigram 'sea flows' never occurred), log(0) = -∞, and perplexity = 2^(-(-∞)/N) = 2^∞ = ∞. None of the given finite options is correct."
  }
];
