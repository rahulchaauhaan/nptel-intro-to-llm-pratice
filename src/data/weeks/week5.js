export const week5Questions = [
  {
    "id": "w5-q1",
    "week": 5,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "Temperature in Decoding",
    "question": "State True or False.\n\nLowering the temperature parameter during decoding flattens the output probability distribution and increases the diversity of the generated text.",
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
      "False"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Lowering temperature SHARPENS (makes more peaked) the distribution, reducing diversity and making the model more deterministic. RAISING temperature flattens the distribution and increases diversity."
  },
  {
    "id": "w5-q2",
    "week": 5,
    "questionNumber": 2,
    "points": 3,
    "type": "single_choice",
    "topic": "Attention Weights",
    "question": "Given the following encoder and decoder hidden states, compute the attention weights (use dot product as the scoring function):\n\nEncoder hidden states: h1=[3,1], h2=[1,4], h3=[2,2]\nDecoder hidden state: s=[1,1]",
    "options": [
      {
        "id": "A",
        "text": "0.212, 0.576, 0.212"
      },
      {
        "id": "B",
        "text": "0.576, 0.212, 0.212"
      },
      {
        "id": "C",
        "text": "0.333, 0.333, 0.333"
      },
      {
        "id": "D",
        "text": "0.155, 0.422, 0.423"
      }
    ],
    "acceptedAnswers": [
      "0.212, 0.576, 0.212"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Scores: s1=h1·s=3+1=4, s2=h2·s=1+4=5, s3=h3·s=2+2=4. Softmax: e^4=54.6, e^5=148.4, e^4=54.6. Sum=257.6. α1=54.6/257.6≈0.212, α2=148.4/257.6≈0.576, α3=54.6/257.6≈0.212."
  },
  {
    "id": "w5-q3",
    "week": 5,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Vanishing Gradient in RNNs",
    "question": "What is the primary cause of the vanishing gradient problem in a vanilla RNN?",
    "options": [
      {
        "id": "A",
        "text": "Repeated multiplication by the recurrent weight matrix and by activation derivatives smaller than 1 across many timesteps"
      },
      {
        "id": "B",
        "text": "The absence of any non-linear activation function in the recurrence"
      },
      {
        "id": "C",
        "text": "The use of a fixed-size input window at every timestep"
      },
      {
        "id": "D",
        "text": "The inability of the network to process variable-length sequences"
      }
    ],
    "acceptedAnswers": [
      "Repeated multiplication by the recurrent weight matrix and by activation derivatives smaller than 1 across many timesteps"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "BPTT unrolls the RNN and multiplies the recurrent weight matrix W and activation derivatives at every timestep. If ||∂h_t/∂h_{t-1}|| < 1 (e.g., sigmoid derivatives ≤ 0.25), gradients vanish exponentially over long sequences."
  },
  {
    "id": "w5-q4",
    "week": 5,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "LSTM Gates",
    "question": "Which gate in an LSTM controls how much of the current cell state is exposed as the hidden state at that timestep?",
    "options": [
      {
        "id": "A",
        "text": "Forget gate"
      },
      {
        "id": "B",
        "text": "Input gate"
      },
      {
        "id": "C",
        "text": "Output gate"
      },
      {
        "id": "D",
        "text": "Cell candidate gate"
      }
    ],
    "acceptedAnswers": [
      "Output gate"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "The output gate o_t = σ(W_o·[h_{t-1}, x_t] + b_o) controls how much of the cell state C_t is exposed: h_t = o_t ⊙ tanh(C_t). The forget gate controls what to erase from C_t, the input gate controls what new information to write."
  },
  {
    "id": "w5-q5",
    "week": 5,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Seq2Seq Information Bottleneck",
    "question": "Which limitation of the basic encoder-decoder Seq2Seq model does the attention mechanism directly address?",
    "options": [
      {
        "id": "A",
        "text": "The encoder cannot process variable-length inputs."
      },
      {
        "id": "B",
        "text": "The whole source sequence has to be compressed into a single fixed-length context vector."
      },
      {
        "id": "C",
        "text": "The decoder cannot condition on its own previously generated tokens."
      },
      {
        "id": "D",
        "text": "The model requires the source and target sequences to be of equal length."
      }
    ],
    "acceptedAnswers": [
      "The whole source sequence has to be compressed into a single fixed-length context vector."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "The basic Seq2Seq information bottleneck: the entire source is compressed into the final encoder hidden state h_T. For long sequences, critical early information is lost. Attention allows the decoder to directly access all encoder states."
  },
  {
    "id": "w5-q6",
    "week": 5,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Encoder-Decoder Architecture",
    "question": "Which of the following is a correct statement about the encoder-decoder architecture?",
    "options": [
      {
        "id": "A",
        "text": "The encoder emits one output token per timestep during decoding."
      },
      {
        "id": "B",
        "text": "The decoder produces a summary representation of the input sequence."
      },
      {
        "id": "C",
        "text": "The decoder generates each output conditioned on the encoder representation and on its own previously generated tokens."
      },
      {
        "id": "D",
        "text": "The encoder retains only the first token of the input sequence."
      }
    ],
    "acceptedAnswers": [
      "The decoder generates each output conditioned on the encoder representation and on its own previously generated tokens."
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "The decoder is autoregressive: P(y_t | y_{<t}, encoder_output). It conditions on both the compressed source representation and all previously generated target tokens."
  },
  {
    "id": "w5-q7",
    "week": 5,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "RNN vs Feed-Forward LM",
    "question": "Why are RNNs preferred over fixed-window feed-forward neural language models?",
    "options": [
      {
        "id": "A",
        "text": "They always have a larger number of parameters."
      },
      {
        "id": "B",
        "text": "They can process sequences of arbitrary length and share the same weights across timesteps."
      },
      {
        "id": "C",
        "text": "They remove the need for a word embedding layer."
      },
      {
        "id": "D",
        "text": "None of the above."
      }
    ],
    "acceptedAnswers": [
      "They can process sequences of arbitrary length and share the same weights across timesteps."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Fixed-window FFNNs can only look back n words and have no weight sharing across positions. RNNs maintain a hidden state that accumulates arbitrary-length history and reuse the same W_h at every step."
  },
  {
    "id": "w5-q8",
    "week": 5,
    "questionNumber": 8,
    "points": 1,
    "type": "single_choice",
    "topic": "Seq2Seq Properties",
    "question": "Which of the following statements about Seq2Seq models are true?\n\n(i) The generation of the target sequence is conditioned on the source sequence.\n(ii) In the basic model, the encoder compresses the input into a fixed-size vector representation.\n(iii) The input and output sequences must have the same length.",
    "options": [
      {
        "id": "A",
        "text": "(i) and (ii)"
      },
      {
        "id": "B",
        "text": "(ii) only"
      },
      {
        "id": "C",
        "text": "(iii) only"
      },
      {
        "id": "D",
        "text": "(i), (ii) and (iii)"
      }
    ],
    "acceptedAnswers": [
      "(i) and (ii)"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "(i) TRUE: decoder conditions on encoder output. (ii) TRUE: the final encoder hidden state is the context vector (bottleneck). (iii) FALSE: a key feature of Seq2Seq is handling variable and unequal source/target lengths."
  }
];
