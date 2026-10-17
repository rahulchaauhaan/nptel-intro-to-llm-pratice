export const week10Questions = [
  {
    "id": "w10-q1",
    "week": 10,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "LoRA Parameters",
    "question": "In LoRA, the update to a frozen weight matrix W of shape d × k is parameterised as ΔW = B A, with B of shape d × r and A of shape r × k. For d = k = 4096 and rank r = 8, how many trainable parameters does this adapter introduce for that one matrix?",
    "options": [
      {
        "id": "A",
        "text": "65,536"
      },
      {
        "id": "B",
        "text": "32,768"
      },
      {
        "id": "C",
        "text": "16,777,216"
      },
      {
        "id": "D",
        "text": "8,192"
      }
    ],
    "acceptedAnswers": [
      "65,536"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Trainable params = d×r + r×k = 4096×8 + 8×4096 = 32,768 + 32,768 = 65,536. Compare to the full weight matrix 4096×4096 = 16,777,216 — LoRA reduces this by 256× for rank 8."
  },
  {
    "id": "w10-q2",
    "week": 10,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Prefix Tuning vs Adapters",
    "question": "Where do prefix tuning and adapters inject their task-specific parameters in a Transformer?",
    "options": [
      {
        "id": "A",
        "text": "Prefix tuning inserts bottleneck feed-forward modules inside each block, while adapters prepend trainable vectors to the input."
      },
      {
        "id": "B",
        "text": "Prefix tuning prepends trainable key and value vectors at every layer, while adapters insert small bottleneck modules inside the blocks."
      },
      {
        "id": "C",
        "text": "Both modify only the final output projection, differing in how they initialise it."
      },
      {
        "id": "D",
        "text": "Both work purely by altering the attention mask."
      }
    ],
    "acceptedAnswers": [
      "Prefix tuning prepends trainable key and value vectors at every layer, while adapters insert small bottleneck modules inside the blocks."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Prefix tuning (Li & Liang, 2021) prepends trainable 'soft prompts' as key-value pairs at every attention layer. Adapters (Houlsby et al.) insert small bottleneck MLP modules (down-project → non-linear → up-project) inside each Transformer block."
  },
  {
    "id": "w10-q3",
    "week": 10,
    "questionNumber": 3,
    "points": 1,
    "type": "multiple_choice",
    "topic": "LoRA Extensions",
    "question": "Which of the following statements about extensions of LoRA are correct?",
    "options": [
      {
        "id": "A",
        "text": "QLoRA trains low-rank adapters on top of a base model quantised to 4 bits."
      },
      {
        "id": "B",
        "text": "DyLoRA trains over a range of ranks so that a rank can be selected afterwards without retraining."
      },
      {
        "id": "C",
        "text": "AdaLoRA distributes a parameter budget across modules by importance instead of fixing one rank everywhere."
      },
      {
        "id": "D",
        "text": "LoRA adapters cannot be folded back into the base weights, so they always add inference latency."
      }
    ],
    "acceptedAnswers": [
      "QLoRA trains low-rank adapters on top of a base model quantised to 4 bits.",
      "DyLoRA trains over a range of ranks so that a rank can be selected afterwards without retraining.",
      "AdaLoRA distributes a parameter budget across modules by importance instead of fixing one rank everywhere."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "C"
    ],
    "explanation": "A, B, C are correct. (D) is FALSE — LoRA adapters can be merged: W' = W + BA. After merging, there is zero inference overhead since the adapter parameters are absorbed into the original weight matrix."
  },
  {
    "id": "w10-q4",
    "week": 10,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "Unstructured Pruning",
    "question": "Why does unstructured magnitude pruning often fail to deliver a wall-clock speedup even at high sparsity?",
    "options": [
      {
        "id": "A",
        "text": "Because it removes entire attention heads and so changes the output dimension."
      },
      {
        "id": "B",
        "text": "Because the surviving weights are scattered irregularly, and dense kernels cannot exploit that sparsity without specialised hardware or sparse formats."
      },
      {
        "id": "C",
        "text": "Because the pruned model must be retrained from random initialisation."
      },
      {
        "id": "D",
        "text": "Because only bias terms are eligible for removal."
      }
    ],
    "acceptedAnswers": [
      "Because the surviving weights are scattered irregularly, and dense kernels cannot exploit that sparsity without specialised hardware or sparse formats."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Unstructured pruning zeroes individual weights in irregular patterns. Dense GPU/CPU matrix multiplication kernels can't skip zero-valued operations without sparse tensor hardware. Structured pruning (removing entire heads/channels) directly reduces FLOPs."
  },
  {
    "id": "w10-q5",
    "week": 10,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "QAT vs PTQ",
    "question": "What distinguishes quantization-aware training (QAT) from post-training quantization (PTQ)?",
    "options": [
      {
        "id": "A",
        "text": "QAT simulates the quantisation error during training so the weights adapt to it, while PTQ quantises an already trained model using a small calibration set."
      },
      {
        "id": "B",
        "text": "QAT is applied only to activations and PTQ only to weights."
      },
      {
        "id": "C",
        "text": "PTQ requires more compute than QAT because it retrains every layer."
      },
      {
        "id": "D",
        "text": "PTQ can only be applied to models below one billion parameters."
      }
    ],
    "acceptedAnswers": [
      "QAT simulates the quantisation error during training so the weights adapt to it, while PTQ quantises an already trained model using a small calibration set."
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "QAT uses fake quantisation nodes in the forward pass so gradients flow through quantised values, adapting weights to quantisation noise. PTQ applies quantisation post-hoc to a pre-trained model, requiring only calibration data."
  },
  {
    "id": "w10-q6",
    "week": 10,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "QLoRA Double Quantization",
    "question": "In QLoRA, what does double quantization actually quantise a second time?",
    "options": [
      {
        "id": "A",
        "text": "The attention weights, taken down to 1 bit in a second pass."
      },
      {
        "id": "B",
        "text": "The gradients, before they are accumulated into the optimiser state."
      },
      {
        "id": "C",
        "text": "The quantisation constants themselves, that is the per-block scale factors produced by the first quantisation."
      },
      {
        "id": "D",
        "text": "Portions of the model that are reverted to FP16 whenever accuracy drops."
      }
    ],
    "acceptedAnswers": [
      "The quantisation constants themselves, that is the per-block scale factors produced by the first quantisation."
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "QLoRA's double quantization (Dettmers et al., 2023) applies quantisation twice: first to model weights (NF4), then to the quantisation scale factors themselves (8-bit). This saves ~0.37 bits/parameter on average."
  },
  {
    "id": "w10-q7",
    "week": 10,
    "questionNumber": 7,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Knowledge Distillation",
    "question": "Which of the following statements about knowledge distillation for language models are correct?",
    "options": [
      {
        "id": "A",
        "text": "Word-level distillation trains the student to match the teacher's output distribution at each token position."
      },
      {
        "id": "B",
        "text": "Sequence-level distillation trains the student on sequences generated by the teacher rather than on per-token distributions alone."
      },
      {
        "id": "C",
        "text": "The two can be combined so the student learns both local token probabilities and global sequence structure."
      },
      {
        "id": "D",
        "text": "Sequence-level distillation requires the teacher to emit a chain-of-thought explanation for every example."
      }
    ],
    "acceptedAnswers": [
      "Word-level distillation trains the student to match the teacher's output distribution at each token position.",
      "Sequence-level distillation trains the student on sequences generated by the teacher rather than on per-token distributions alone.",
      "The two can be combined so the student learns both local token probabilities and global sequence structure."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "C"
    ],
    "explanation": "A, B, C are correct. (D) is FALSE — sequence-level distillation uses teacher-generated sequences as training targets, not chain-of-thought explanations. The student mimics the teacher's output sequences, not its reasoning process."
  },
  {
    "id": "w10-q8",
    "week": 10,
    "questionNumber": 8,
    "points": 1,
    "type": "single_choice",
    "topic": "Mechanistic Interpretability Circuits",
    "question": "In mechanistic interpretability, what is meant by a circuit?",
    "options": [
      {
        "id": "A",
        "text": "A pipeline that collects and batches training examples for an autoregressive model"
      },
      {
        "id": "B",
        "text": "A recurrent module inserted into a Transformer to give it additional memory"
      },
      {
        "id": "C",
        "text": "A subgraph of the network - particular heads, neurons and connections - hypothesised to implement a specific behaviour"
      },
      {
        "id": "D",
        "text": "An external tool used to adjust parameters after training has finished"
      }
    ],
    "acceptedAnswers": [
      "A subgraph of the network - particular heads, neurons and connections - hypothesised to implement a specific behaviour"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "In mechanistic interpretability (Elhage et al., Olah et al.), a circuit is an identifiable computational subgraph of attention heads, MLP neurons, and residual stream connections that analysis shows implements a specific algorithm."
  },
  {
    "id": "w10-q9",
    "week": 10,
    "questionNumber": 9,
    "points": 1,
    "type": "single_choice",
    "topic": "Induction Heads",
    "question": "In-context copying of the pattern [A][B] ... [A] → [B] is attributed to induction heads. Which description matches the mechanism?",
    "options": [
      {
        "id": "A",
        "text": "A single head that attends to punctuation to segment the sequence into repeated units"
      },
      {
        "id": "B",
        "text": "A previous-token head that writes information about the preceding token, composed with a later head that attends to the token following the earlier occurrence of A and copies it"
      },
      {
        "id": "C",
        "text": "A feed-forward sub-layer that raises the probability of any token seen earlier in the context"
      },
      {
        "id": "D",
        "text": "A head that masks future positions so that repeated tokens cannot be attended to"
      }
    ],
    "acceptedAnswers": [
      "A previous-token head that writes information about the preceding token, composed with a later head that attends to the token following the earlier occurrence of A and copies it"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Induction circuit: Layer L has a previous-token head that shifts the identity of preceding tokens into each token's representation. Layer L+1 attends to positions where the shifted representation matches the current token [A], copying the next token [B]."
  },
  {
    "id": "w10-q10",
    "week": 10,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "QK vs OV Circuits",
    "question": "In the transformer circuits framing, what do the QK and OV circuits respectively determine for an attention head?",
    "options": [
      {
        "id": "A",
        "text": "QK determines where the head attends, OV determines what is read from the attended position and written to the output."
      },
      {
        "id": "B",
        "text": "QK determines what is written to the output, OV determines where the head attends."
      },
      {
        "id": "C",
        "text": "Both determine how positional information is encoded."
      },
      {
        "id": "D",
        "text": "Both are normalisation terms that keep the attention scores in a fixed range."
      }
    ],
    "acceptedAnswers": [
      "QK determines where the head attends, OV determines what is read from the attended position and written to the output."
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "W_QK = W_Q^T W_K determines the attention pattern (WHERE to attend via the bilinear A = softmax(x^T W_QK x')). W_OV = W_V W_O determines WHAT information is extracted from attended positions and written to the residual stream."
  }
];
