export const week7Questions = [
  {
    "id": "w7-q1",
    "week": 7,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "BERT vs T5 Pre-training",
    "question": "Which of the following statements correctly differentiates the pre-training paradigms of BERT and T5?",
    "options": [
      {
        "id": "A",
        "text": "BERT uses masked language modeling with bidirectional attention, whereas T5 utilizes a span corruption objective within an encoder-decoder architecture."
      },
      {
        "id": "B",
        "text": "BERT uses next-token prediction, whereas T5 uses next-sentence prediction."
      },
      {
        "id": "C",
        "text": "BERT is an encoder-decoder model, whereas T5 is a decoder-only model."
      },
      {
        "id": "D",
        "text": "BERT uses span corruption on C4, whereas T5 is trained on BookCorpus using a causal decoder."
      }
    ],
    "acceptedAnswers": [
      "BERT uses masked language modeling with bidirectional attention, whereas T5 utilizes a span corruption objective within an encoder-decoder architecture."
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "BERT is encoder-only with MLM + NSP pre-training objectives, using bidirectional attention. T5 (Text-to-Text Transfer Transformer) is encoder-decoder with a span corruption denoising objective, trained on the C4 corpus."
  },
  {
    "id": "w7-q2",
    "week": 7,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Causal Self-Attention",
    "question": "Which attention mechanism and masking scheme are natively employed during the auto-regressive generation phase in a Transformer decoder to prevent attending to future token positions?",
    "options": [
      {
        "id": "A",
        "text": "Bidirectional attention with a fully-visible mask"
      },
      {
        "id": "B",
        "text": "Causal (autoregressive) self-attention with a lower-triangular mask"
      },
      {
        "id": "C",
        "text": "Prefix-LM mask allowing unrestricted visibility across all generated tokens"
      },
      {
        "id": "D",
        "text": "Cross-attention with a diagonal identity mask"
      }
    ],
    "acceptedAnswers": [
      "Causal (autoregressive) self-attention with a lower-triangular mask"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Autoregressive decoding requires strict temporal causality. A lower-triangular attention mask sets all future positions to -∞ before softmax, ensuring position t can only attend to positions ≤ t."
  },
  {
    "id": "w7-q3",
    "week": 7,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "T5 Pre-training Corpus",
    "question": "Which of the following pre-training corpora was curated specifically for pre-training the T5 model to provide a cleaner, highly-filtered alternative to raw web scrapes?",
    "options": [
      {
        "id": "A",
        "text": "BookCorpus"
      },
      {
        "id": "B",
        "text": "Wikipedia-100M"
      },
      {
        "id": "C",
        "text": "Colossal Clean Crawled Corpus (C4)"
      },
      {
        "id": "D",
        "text": "OpenWebText"
      }
    ],
    "acceptedAnswers": [
      "Colossal Clean Crawled Corpus (C4)"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "C4 (Colossal Clean Crawled Corpus) is a 750GB filtered version of Common Crawl, created specifically for T5. It removes placeholder/boilerplate text, pages with offensive content, and non-natural language text."
  },
  {
    "id": "w7-q4",
    "week": 7,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "ELMo Layer Weights",
    "question": "In the ELMo task-specific combination formula, what is the primary function of the softmax-normalized scalar weights s_j^{task}?",
    "options": [
      {
        "id": "A",
        "text": "They rescale the output embedding dimensionality to match downstream architectures."
      },
      {
        "id": "B",
        "text": "They determine the relative task-specific importance and contribution of each internal bi-LSTM layer representation."
      },
      {
        "id": "C",
        "text": "They prevent gradient explosion during the character-CNN convolution step."
      },
      {
        "id": "D",
        "text": "They linearly combine the forward and backward language model losses during unsupervised pre-training."
      }
    ],
    "acceptedAnswers": [
      "They determine the relative task-specific importance and contribution of each internal bi-LSTM layer representation."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "ELMo: ELMo_k^{task} = γ · Σ_j s_j^{task} · h_{k,j}^{LM}. The softmax weights s_j allow different downstream tasks to learn task-specific mixtures of ELMo's internal layers (character CNN, LSTM-1, LSTM-2)."
  },
  {
    "id": "w7-q5",
    "week": 7,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Seq2Seq Model Architectures",
    "question": "Which model architecture family is natively suited for sequence-to-sequence tasks such as Machine Translation and Abstractive Summarization without requiring structural modifications or prompt-based workarounds?",
    "options": [
      {
        "id": "A",
        "text": "Encoder-only models (e.g., BERT, RoBERTa)"
      },
      {
        "id": "B",
        "text": "Encoder-Decoder models (e.g., BART, T5)"
      },
      {
        "id": "C",
        "text": "Character-level CNNs with unidirectional LSTMs"
      },
      {
        "id": "D",
        "text": "Pure classifier heads with static word embeddings"
      }
    ],
    "acceptedAnswers": [
      "Encoder-Decoder models (e.g., BART, T5)"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Encoder-decoder Transformers are natively designed for Seq2Seq: the encoder processes the full source, and the decoder autoregressively generates the target attending to the encoder via cross-attention."
  },
  {
    "id": "w7-q6",
    "week": 7,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "GPT-2 Architecture",
    "question": "What major modifications were introduced in the GPT-2 architecture and training recipe compared to the original GPT-1?",
    "options": [
      {
        "id": "A",
        "text": "Relocating layer normalization to the input of each sub-block (pre-LN) and adding a layer norm after the final self-attention block."
      },
      {
        "id": "B",
        "text": "Expanding the vocabulary size to ~50,257 and increasing the context window to 1024 tokens."
      },
      {
        "id": "C",
        "text": "Scaling residual layer weights at initialization by a factor of 1/√(2N)."
      },
      {
        "id": "D",
        "text": "All of the above."
      }
    ],
    "acceptedAnswers": [
      "All of the above."
    ],
    "acceptedOptionIds": [
      "D"
    ],
    "explanation": "GPT-2 introduced all three changes: Pre-LN (layer norm before each sub-block), vocabulary expanded to 50,257 (BPE with byte-level encoding), context window from 512 to 1024 tokens, and initialization scaling for stability."
  },
  {
    "id": "w7-q7",
    "week": 7,
    "questionNumber": 7,
    "points": 2,
    "type": "multiple_choice",
    "topic": "Token Representations & Pre-training",
    "question": "Which of the following statement(s) regarding token representations and pre-training objectives is/are TRUE?",
    "options": [
      {
        "id": "A",
        "text": "ELMo employs a character-level CNN at the input layer to handle out-of-vocabulary (OOV) tokens and capture morphological subword patterns."
      },
      {
        "id": "B",
        "text": "BERT generates dynamic, context-dependent token representations using Masked Language Modeling and Next Sentence Prediction."
      },
      {
        "id": "C",
        "text": "Standard autoregressive decoder-only models maximize the bidirectional context likelihood ∏_{t=1}^{T} P(w_t | w_1, ..., w_T)."
      },
      {
        "id": "D",
        "text": "BART incorporates a bidirectional encoder with an autoregressive decoder and trains on various noising schemes including token deletion and sentence permutation."
      }
    ],
    "acceptedAnswers": [
      "ELMo employs a character-level CNN at the input layer to handle out-of-vocabulary (OOV) tokens and capture morphological subword patterns.",
      "BERT generates dynamic, context-dependent token representations using Masked Language Modeling and Next Sentence Prediction.",
      "BART incorporates a bidirectional encoder with an autoregressive decoder and trains on various noising schemes including token deletion and sentence permutation."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "D"
    ],
    "explanation": "A, B, D are TRUE. (C) is FALSE: standard autoregressive models maximize LEFT-TO-RIGHT (causal) likelihood P(w_t | w_1,...,w_{t-1}), not bidirectional likelihood. Bidirectional context is BERT's contribution, not GPT-style models."
  },
  {
    "id": "w7-q8",
    "week": 7,
    "questionNumber": 8,
    "points": 2,
    "type": "numerical",
    "topic": "NumPy Einsum",
    "question": "The einsum function in NumPy is used as a generalized operation for tensor contractions. Consider the two matrices:\n\nA = [[4, -2], [3, 1]]   B = [[5, 2], [-3, 6]]\n\nWhat is the scalar output of the following NumPy operation?\nnumpy.einsum('ij,ji->', A, B)",
    "matrixA": [
      [
        4,
        -2
      ],
      [
        3,
        1
      ]
    ],
    "matrixB": [
      [
        5,
        2
      ],
      [
        -3,
        6
      ]
    ],
    "options": [],
    "acceptedAnswers": [
      "38"
    ],
    "acceptedNumeric": 38,
    "explanation": "The einsum 'ij,ji->' contracts A[i,j] * B[j,i] over all i, j (equivalent to Tr(A @ B)):\ni=0,j=0: A[0,0]*B[0,0] = 4 × 5 = 20\ni=0,j=1: A[0,1]*B[1,0] = (-2) × (-3) = 6\ni=1,j=0: A[1,0]*B[0,1] = 3 × 2 = 6\ni=1,j=1: A[1,1]*B[1,1] = 1 × 6 = 6\nTotal = 20 + 6 + 6 + 6 = 38"
  }
];
