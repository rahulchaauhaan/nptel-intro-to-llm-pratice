export const courseInfo = {
  courseName: "Introduction to Large Language Models",
  courseCode: "NPTEL-CS-LLM",
  offeredBy: "IIT & NPTEL Online Certification",
  instructor: "IIT Faculty & Research Team",
  totalWeeks: 12,
  totalQuestions: 111,
  questionsPerWeek: 10,
  passingScorePercent: 40,
  eliteScorePercent: 60,
  silverScorePercent: 75,
  goldScorePercent: 90
};

export const weeksMeta = [
  {
    week: 1,
    title: "Distributional Semantics & Lexical Meaning",
    shortTitle: "Week 1: Semantics & Lexicons",
    summary: "Distributional semantics, polysemy, entailment, homonyms, meronyms, pragmatics, coreference, and semantic role labeling.",
    topics: ["Distributional Semantics", "Polysemy & Homonyms", "Entailment & Pragmatics", "Taxonomic Relations (Hyponym/Meronym)", "Semantic Role Labelling"],
    totalQuestions: 10,
    dueDate: "2026-07-29, 23:59 IST"
  },
  {
    week: 2,
    title: "Statistical & N-Gram Language Models",
    shortTitle: "Week 2: N-Gram Models & Smoothing",
    summary: "Probabilistic language modeling, chain rule, Markov assumption, perplexity, zero probability problem, and Kneser-Ney smoothing.",
    topics: ["Probabilistic Modeling", "Chain Rule & Markov Assumption", "Perplexity & Evaluation", "Kneser-Ney & Smoothing Techniques", "Bigram Calculations"],
    totalQuestions: 10,
    dueDate: "2026-08-05, 23:59 IST"
  },
  {
    week: 3,
    title: "Neural Networks & Backpropagation",
    shortTitle: "Week 3: Neural Nets & Optimization",
    summary: "Non-linear activations, backpropagation derivatives, ReLU & Sigmoid gradients, XOR problem, L1/L2 regularization, and dropout.",
    topics: ["Activation Functions (ReLU, Sigmoid)", "Backpropagation & Chain Rule", "XOR Problem & Perceptrons", "Regularization (L1, L2, Dropout)", "Gradient Descent Dynamics"],
    totalQuestions: 10,
    dueDate: "2026-08-14, 23:59 IST"
  },
  {
    week: 4,
    title: "Word Embeddings & Subword Tokenization",
    shortTitle: "Week 4: Embeddings & Tokenization",
    summary: "Continuous Bag of Words (CBOW), Skip-gram, Byte Pair Encoding (BPE), WordPiece, Word2Vec negative sampling, and FastText for OOV.",
    topics: ["CBOW & Skip-Gram Architectures", "BPE & WordPiece Algorithms", "Subword Tokenization", "Cosine Similarity & PPMI", "Negative Sampling & FastText"],
    totalQuestions: 10,
    dueDate: "2026-08-19, 23:59 IST"
  },
  {
    week: 5,
    title: "Recurrent Neural Networks, LSTMs & Seq2Seq",
    shortTitle: "Week 5: RNNs, LSTMs & Attention",
    summary: "Vanishing gradients in vanilla RNNs, LSTM gates, encoder-decoder Seq2Seq bottleneck, Bahdanau attention, and temperature decoding.",
    topics: ["Vanilla RNN Dynamics", "LSTM Gating Mechanisms", "Seq2Seq Bottleneck", "Attention Mechanism & Weights", "Temperature & Decoding Strategies"],
    totalQuestions: 10,
    dueDate: "2026-08-26, 23:59 IST"
  },
  {
    week: 6,
    title: "Transformer Architecture & Self-Attention",
    shortTitle: "Week 6: Transformer Core Architecture",
    summary: "Scaled dot-product attention, multi-head attention subspaces, residual connections, layer normalization, RoPE, and sinusoidal positional encodings.",
    topics: ["Multi-Head Attention", "LayerNorm vs BatchNorm", "Residual Stream & Gradients", "Sinusoidal & RoPE Positional Encoding", "Causal Masking"],
    totalQuestions: 10,
    dueDate: "2026-09-02, 23:59 IST"
  },
  {
    week: 7,
    title: "Pre-trained Language Models: BERT, GPT-2 & T5",
    shortTitle: "Week 7: BERT, GPT & T5 Pre-training",
    summary: "Masked language modeling (MLM), autoregressive causal decoders, span corruption in T5, ELMo layer representations, and NumPy einsum contractions.",
    topics: ["BERT vs T5 Paradigms", "Autoregressive Causal Attention", "C4 & Pretraining Corpora", "ELMo Layer Ensembles", "Tensor Contraction (einsum)"],
    totalQuestions: 10,
    dueDate: "2026-09-09, 23:59 IST"
  },
  {
    week: 8,
    title: "Instruction Tuning, Alignment & RLHF",
    shortTitle: "Week 8: Instruction Tuning & RLHF",
    summary: "Prompt tuning vs fine-tuning, Tree-of-Thought (ToT), POSIX prompt sensitivity, Bradley-Terry reward models, KL divergence constraint, and PPO-CLIP.",
    topics: ["Instruction & Prompt Tuning", "Tree-of-Thought Prompting", "POSIX Prompt Sensitivity", "Bradley-Terry Preference Models", "RLHF, KL Penalty & PPO-CLIP"],
    totalQuestions: 10,
    dueDate: "2026-09-16, 23:59 IST"
  },
  {
    week: 9,
    title: "Knowledge Graphs & Differentiable KGQA",
    shortTitle: "Week 9: Knowledge Graphs & KGQA",
    summary: "Knowledge graphs vs relational models, cross-lingual entity alignment, end-to-end KGQA, closed-world assumption, pairwise hinge loss, and TransE.",
    topics: ["Graph vs Relational Representations", "Entity & Relation Alignment", "Differentiable KGQA", "Filtered Evaluation (MRR/Hits@K)", "TransE & RotatE Scoring"],
    totalQuestions: 10,
    dueDate: "2026-09-23, 23:59 IST"
  },
  {
    week: 10,
    title: "Parameter-Efficient Fine-Tuning (PEFT) & Circuits",
    shortTitle: "Week 10: PEFT, LoRA & Interpretability",
    summary: "LoRA rank decomposition, prefix tuning & adapters, QLoRA 4-bit double quantization, structured pruning, knowledge distillation, and induction heads.",
    topics: ["LoRA & Adapter Architectures", "QLoRA Double Quantization & PTQ", "Knowledge Distillation", "Mechanistic Interpretability Circuits", "Induction Heads (QK & OV)"],
    totalQuestions: 10,
    dueDate: "2026-09-30, 23:59 IST"
  },
  {
    week: 11,
    title: "KG Embeddings, Hyperbolic Spaces & Factorisation",
    shortTitle: "Week 11: Factorisation & Hyperbolic KGs",
    summary: "DistMult symmetric interactions, ComplEx Hermitian embeddings, SimplE dual roles, 3D tensor reshaping, hyperbolic Poincaré ball, and box embeddings.",
    topics: ["DistMult & ComplEx Models", "SimplE Inverse Representations", "Tensor Reshaping & Factorisation", "Hyperbolic Poincaré Embeddings", "Order & Box Embeddings"],
    totalQuestions: 10,
    dueDate: "2026-10-07, 23:59 IST"
  },
  {
    week: 12,
    title: "Bias, Fairness, Safety & Responsible LLMs",
    shortTitle: "Week 12: Bias, Safety & Responsible AI",
    summary: "StereoSet and ICAT evaluation, Regard metric, adversarial triggers, safety through in-context learning, high vs low resource languages, and responsible AI.",
    topics: ["StereoSet & ICAT Metric", "Regard & Sentiment Bias", "Adversarial Triggers & Safety", "Multilingual Disparity (HRL vs LRL)", "Counterfactual Data Augmentation"],
    totalQuestions: 10,
    dueDate: "2026-10-14, 23:59 IST"
  }
];
