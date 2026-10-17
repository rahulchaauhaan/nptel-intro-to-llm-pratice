export const week6Questions = [
  {
    "id": "w6-q1",
    "week": 6,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "Rotary Position Embedding (RoPE)",
    "question": "State True or False.\n\nRotary Position Embedding (RoPE) encodes position by applying a rotation to the query and key vectors rather than by adding a positional vector to the input embedding.",
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
    "explanation": "RoPE (Su et al., 2022) applies a position-dependent rotation matrix to Q and K vectors in attention, encoding relative positions directly in the attention scores without modifying the input embeddings."
  },
  {
    "id": "w6-q2",
    "week": 6,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Multi-Head Attention",
    "question": "Which of the following is true about multi-head attention?",
    "options": [
      {
        "id": "A",
        "text": "All heads share a single set of attention weights, which improves interpretability."
      },
      {
        "id": "B",
        "text": "Each head uses its own learned projections and can attend to different representation subspaces in parallel."
      },
      {
        "id": "C",
        "text": "It reduces the total number of parameters relative to single-head attention of the same width."
      },
      {
        "id": "D",
        "text": "The heads are averaged before the softmax is applied."
      }
    ],
    "acceptedAnswers": [
      "Each head uses its own learned projections and can attend to different representation subspaces in parallel."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Multi-head attention runs h independent attention functions in parallel. Each head has its own W_Q, W_K, W_V projection matrices, allowing specialisation in different aspects (syntax, coreference, etc.). Outputs are concatenated and projected."
  },
  {
    "id": "w6-q3",
    "week": 6,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Residual Connections",
    "question": "What is the role of the residual connection in a Transformer block?",
    "options": [
      {
        "id": "A",
        "text": "It improves gradient flow during backpropagation and makes deep stacks trainable."
      },
      {
        "id": "B",
        "text": "It normalises the input embeddings."
      },
      {
        "id": "C",
        "text": "It reduces the computational complexity of attention."
      },
      {
        "id": "D",
        "text": "It removes the need for positional information."
      }
    ],
    "acceptedAnswers": [
      "It improves gradient flow during backpropagation and makes deep stacks trainable."
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Residual connections (He et al., 2016) create a direct identity pathway: x_{l+1} = x_l + F(x_l). Gradients can flow directly through these skip connections, enabling training of very deep Transformers (100+ layers)."
  },
  {
    "id": "w6-q4",
    "week": 6,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "Layer Normalization",
    "question": "What is the primary reason Transformers use layer normalization instead of batch normalization?",
    "options": [
      {
        "id": "A",
        "text": "Layer normalization is always faster to compute than batch normalization."
      },
      {
        "id": "B",
        "text": "Batch normalization is not effective for sequence models, where statistics vary with batch composition and sequence length."
      },
      {
        "id": "C",
        "text": "Layer normalization by itself prevents overfitting."
      },
      {
        "id": "D",
        "text": "Batch normalization is incompatible with positional encodings."
      }
    ],
    "acceptedAnswers": [
      "Batch normalization is not effective for sequence models, where statistics vary with batch composition and sequence length."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Batch norm computes statistics across the batch dimension, which is unstable for variable-length sequences. Layer norm computes statistics across the feature dimension for each token independently, making it suitable for NLP."
  },
  {
    "id": "w6-q5",
    "week": 6,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Transformer Properties",
    "question": "Which of the following statements is NOT true?",
    "options": [
      {
        "id": "A",
        "text": "Self-attention allows every token to attend to every other token in the sequence."
      },
      {
        "id": "B",
        "text": "Multi-head attention increases the output dimensionality of the Transformer block relative to a single head of the same total width."
      },
      {
        "id": "C",
        "text": "Relative positional encoding captures the distance between tokens rather than their absolute positions."
      },
      {
        "id": "D",
        "text": "Positional encoding is necessary because self-attention on its own is permutation invariant."
      }
    ],
    "acceptedAnswers": [
      "Multi-head attention increases the output dimensionality of the Transformer block relative to a single head of the same total width."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Multi-head attention with h heads of dimension d_k each has the SAME total output dimension as single-head attention (d_model = h·d_k). The outputs are concatenated and projected back to d_model, maintaining the same dimensionality."
  },
  {
    "id": "w6-q6",
    "week": 6,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Masked Self-Attention",
    "question": "How does masked self-attention support autoregressive generation?",
    "options": [
      {
        "id": "A",
        "text": "By allowing every position to attend to all tokens, including future ones."
      },
      {
        "id": "B",
        "text": "By restricting each position to attend only to itself and earlier positions, preventing information leakage from the future."
      },
      {
        "id": "C",
        "text": "By discarding positional information within the sequence."
      },
      {
        "id": "D",
        "text": "By disabling the attention mechanism during training."
      }
    ],
    "acceptedAnswers": [
      "By restricting each position to attend only to itself and earlier positions, preventing information leakage from the future."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Causal (masked) self-attention applies a lower-triangular mask: position t can only attend to positions 1..t. Setting future positions to -∞ before softmax ensures the model cannot 'see ahead' during autoregressive decoding."
  },
  {
    "id": "w6-q7",
    "week": 6,
    "questionNumber": 7,
    "points": 2,
    "type": "single_choice",
    "topic": "Multi-Head Attention Dimensions",
    "question": "A self-attention layer has input dimension d_model = 1024 and uses 16 heads. What is the dimension of the output of each individual head?",
    "options": [
      {
        "id": "A",
        "text": "64.0"
      },
      {
        "id": "B",
        "text": "128.0"
      },
      {
        "id": "C",
        "text": "32.0"
      },
      {
        "id": "D",
        "text": "256.0"
      }
    ],
    "acceptedAnswers": [
      "64.0"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Each head operates on a d_k = d_model / h = 1024 / 16 = 64-dimensional projection. The outputs of all 16 heads are concatenated to recover the original d_model = 1024 dimension before the final projection."
  },
  {
    "id": "w6-q8",
    "week": 6,
    "questionNumber": 8,
    "points": 2,
    "type": "single_choice",
    "topic": "Positional Encoding",
    "question": "For a Transformer with d_model = 512, compute the positional encoding for position p = 20 at dimensions 4 and 5, using:\nPE(p, 2i) = sin(p / 10000^(2i/d_model))\nPE(p, 2i+1) = cos(p / 10000^(2i/d_model))",
    "options": [
      {
        "id": "A",
        "text": "sin(20 / 10000^(1/128)), cos(20 / 10000^(1/128))"
      },
      {
        "id": "B",
        "text": "cos(20 / 10000^(1/128)), sin(20 / 10000^(1/128))"
      },
      {
        "id": "C",
        "text": "sin(20 / 10000^(4/512)), cos(20 / 10000^(5/512))"
      },
      {
        "id": "D",
        "text": "sin(20 / 10000^(1/256)), cos(20 / 10000^(1/128))"
      }
    ],
    "acceptedAnswers": [
      "sin(20 / 10000^(1/128)), cos(20 / 10000^(1/128))"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "For dimensions 4 and 5: 2i=4 → i=2. PE(20,4)=sin(20/10000^(4/512))=sin(20/10000^(1/128)). PE(20,5)=cos(20/10000^(2·2/512))=cos(20/10000^(1/128)). Both use the same exponent i=2."
  }
];
