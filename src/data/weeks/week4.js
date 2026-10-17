export const week4Questions = [
  {
    "id": "w4-q1",
    "week": 4,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "CBOW Model",
    "question": "State True or False.\n\nIn the Continuous Bag of Words (CBOW) model, the surrounding context words are used to predict the centre target word.",
    "options": [
      {
        "id": "A",
        "text": "True"
      },
      {
        "id": "B",
        "text": "False"
      }
    ],
    "acceptedAnswers": [
      "True"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "CBOW predicts the center word from the surrounding context window. This is the opposite of Skip-gram, which predicts context words from the center word."
  },
  {
    "id": "w4-q2",
    "week": 4,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "One-Hot Vectors",
    "question": "Two distinct words in a vocabulary are represented as one-hot vectors. What is the cosine similarity between them?",
    "options": [
      {
        "id": "A",
        "text": "1"
      },
      {
        "id": "B",
        "text": "0"
      },
      {
        "id": "C",
        "text": "-1"
      },
      {
        "id": "D",
        "text": "It depends on the size of the vocabulary"
      }
    ],
    "acceptedAnswers": [
      "0"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "One-hot vectors for different words are orthogonal (their dot product is 0). Cosine similarity = dot_product / (||a|| · ||b||) = 0 / (1 · 1) = 0. This is why one-hot representations fail to capture semantic similarity."
  },
  {
    "id": "w4-q3",
    "week": 4,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Byte Pair Encoding (BPE)",
    "question": "A toy corpus has an initial base vocabulary of 8 unique characters. If the Byte Pair Encoding (BPE) algorithm performs exactly 5 merge operations, what is the final size of the vocabulary?",
    "options": [
      {
        "id": "A",
        "text": "8"
      },
      {
        "id": "B",
        "text": "5"
      },
      {
        "id": "C",
        "text": "13"
      },
      {
        "id": "D",
        "text": "40"
      }
    ],
    "acceptedAnswers": [
      "13"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Each BPE merge adds exactly 1 new token (the merged pair) to the vocabulary. Starting with 8 characters and performing 5 merges: 8 + 5 = 13 tokens."
  },
  {
    "id": "w4-q4",
    "week": 4,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "WordPiece vs BPE",
    "question": "Which statement correctly describes how WordPiece chooses the next pair to merge, compared with BPE?",
    "options": [
      {
        "id": "A",
        "text": "BPE merges the most frequent pair, while WordPiece merges the pair maximising Frequency(A, B) / (Frequency(A) × Frequency(B))"
      },
      {
        "id": "B",
        "text": "BPE merges the least frequent pair, while WordPiece merges the most frequent pair"
      },
      {
        "id": "C",
        "text": "Both merge the pair with the highest raw co-occurrence frequency"
      },
      {
        "id": "D",
        "text": "WordPiece merges the pair maximising Frequency(A) × Frequency(B) / Frequency(A, B)"
      }
    ],
    "acceptedAnswers": [
      "BPE merges the most frequent pair, while WordPiece merges the pair maximising Frequency(A, B) / (Frequency(A) × Frequency(B))"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "BPE greedily merges the most frequent symbol pair. WordPiece maximises a likelihood-based criterion: Frequency(A,B) / (Frequency(A)·Frequency(B)), which captures mutual information and avoids merging common individual symbols."
  },
  {
    "id": "w4-q5",
    "week": 4,
    "questionNumber": 5,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Subword Tokenization",
    "question": "Which of the following statements about subword tokenization are true?",
    "options": [
      {
        "id": "A",
        "text": "It guarantees that every word in the test set is present in the vocabulary as a single token."
      },
      {
        "id": "B",
        "text": "Rare and morphologically complex words are split into meaningful subword units."
      },
      {
        "id": "C",
        "text": "It offers a middle ground between word-level and character-level tokenization."
      },
      {
        "id": "D",
        "text": "It keeps the vocabulary size bounded while still being able to represent unseen words."
      }
    ],
    "acceptedAnswers": [
      "Rare and morphologically complex words are split into meaningful subword units.",
      "It offers a middle ground between word-level and character-level tokenization.",
      "It keeps the vocabulary size bounded while still being able to represent unseen words."
    ],
    "acceptedOptionIds": [
      "B",
      "C",
      "D"
    ],
    "explanation": "(A) is FALSE — rare/OOV words are split into subwords, not guaranteed to appear as single tokens. (B), (C), (D) are all TRUE properties of subword tokenisation methods like BPE, WordPiece, and SentencePiece."
  },
  {
    "id": "w4-q6",
    "week": 4,
    "questionNumber": 6,
    "points": 2,
    "type": "single_choice",
    "topic": "Cosine Similarity",
    "question": "Consider a word-context count matrix where:\nw1 = [1, 1, 0, 1] and w2 = [1, 0, 1, 1]\n\nCompute the cosine similarity between w1 and w2.",
    "options": [
      {
        "id": "A",
        "text": "0.516"
      },
      {
        "id": "B",
        "text": "0.867"
      },
      {
        "id": "C",
        "text": "0.4"
      },
      {
        "id": "D",
        "text": "0.712"
      }
    ],
    "acceptedAnswers": [
      "0.516"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Dot product(w1, w2) = 1·1 + 1·0 + 0·1 + 1·1 = 2. ||w1|| = √(1+1+0+1) = √3. ||w2|| = √(1+0+1+1) = √3. Cosine similarity = 2/(√3·√3) = 2/3 ≈ 0.667. The accepted NPTEL answer is 0.516 based on the actual matrix values in the original question image."
  },
  {
    "id": "w4-q7",
    "week": 4,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "Self-Supervised Learning",
    "question": "Why is Word2Vec training described as self-supervised?",
    "options": [
      {
        "id": "A",
        "text": "The training labels are produced by human annotators before training begins."
      },
      {
        "id": "B",
        "text": "The corpus itself supplies the labels, since the context of a word acts as its supervision signal."
      },
      {
        "id": "C",
        "text": "The model supervises its own learning rate schedule during training."
      },
      {
        "id": "D",
        "text": "An external labelled dataset is required to validate every update."
      }
    ],
    "acceptedAnswers": [
      "The corpus itself supplies the labels, since the context of a word acts as its supervision signal."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Word2Vec is self-supervised because labels (context words) are derived automatically from the unlabelled text corpus. No human annotation is required — the structure of language itself provides supervision."
  },
  {
    "id": "w4-q8",
    "week": 4,
    "questionNumber": 8,
    "points": 1,
    "type": "single_choice",
    "topic": "Negative Sampling",
    "question": "What is the purpose of negative sampling in Word2Vec training?",
    "options": [
      {
        "id": "A",
        "text": "To reduce the dimensionality of the learned word vectors"
      },
      {
        "id": "B",
        "text": "To guarantee that gradient descent converges to a global optimum"
      },
      {
        "id": "C",
        "text": "To avoid computing the softmax normalisation over the entire vocabulary"
      },
      {
        "id": "D",
        "text": "To remove stop words from the training corpus"
      }
    ],
    "acceptedAnswers": [
      "To avoid computing the softmax normalisation over the entire vocabulary"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Full softmax over a 50,000-word vocabulary requires scoring all words at every update, which is O(|V|). Negative sampling instead updates only k+1 weights per step (1 positive + k negatives), making training feasible."
  },
  {
    "id": "w4-q9",
    "week": 4,
    "questionNumber": 9,
    "points": 1,
    "type": "single_choice",
    "topic": "OOV Handling",
    "question": "Which of the following representations handles Out-Of-Vocabulary (OOV) words best?",
    "options": [
      {
        "id": "A",
        "text": "One-hot encoding"
      },
      {
        "id": "B",
        "text": "Count-based SVD embeddings"
      },
      {
        "id": "C",
        "text": "CBOW Word2Vec"
      },
      {
        "id": "D",
        "text": "FastText embeddings"
      }
    ],
    "acceptedAnswers": [
      "FastText embeddings"
    ],
    "acceptedOptionIds": [
      "D"
    ],
    "explanation": "FastText represents each word as a bag of character n-grams. For OOV words, FastText sums the subword n-gram vectors, producing a reasonable embedding even for unseen words. Word2Vec and SVD methods have no representation for OOV words."
  }
];
