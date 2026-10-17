export const flashcardsData = [
  {
    id: "fc-1",
    week: 1,
    topic: "Distributional Hypothesis",
    front: "What is the core principle of Distributional Semantics according to J.R. Firth?",
    back: "“You shall know a word by the company it keeps.” Words occurring in similar linguistic contexts have similar semantic meanings, founding modern vector embeddings."
  },
  {
    id: "fc-2",
    week: 1,
    topic: "Taxonomic Relations",
    front: "Differentiate Hyponym vs Hypernym and Meronym vs Holonym.",
    back: "• Hyponym: specific instance (Sparrow is a hyponym of Bird)\n• Hypernym: general category (Bird is a hypernym of Sparrow)\n• Meronym: part-of (Wheel is a meronym of Car)\n• Holonym: whole-of (Car is a holonym of Wheel)"
  },
  {
    id: "fc-3",
    week: 2,
    topic: "Perplexity Formula",
    front: "What is the mathematical definition and intuitive interpretation of Perplexity (PP)?",
    back: "PP(W) = P(w1...wN)^(-1/N) = 2^(H(W)).\nIt represents the effective branching factor — how many equally likely words the model is 'confused' between at each step. Lower is better!"
  },
  {
    id: "fc-4",
    week: 2,
    topic: "Kneser-Ney Smoothing",
    front: "What makes Kneser-Ney smoothing superior to simple unigram backoff?",
    back: "It uses Continuation Probability: measuring how versatile a word is across diverse preceding contexts |{w' : C(w', w) > 0}| rather than raw unigram count (e.g. 'San Francisco' makes 'Francisco' frequent, but only after 'San')."
  },
  {
    id: "fc-5",
    week: 3,
    topic: "Sigmoid Derivative",
    front: "What is the derivative of the sigmoid function σ(x) and its maximum value?",
    back: "dσ/dx = σ(x) · (1 - σ(x)).\nIts maximum value is 0.25 (at x = 0). Multiplying this across deep networks causes the vanishing gradient problem!"
  },
  {
    id: "fc-6",
    week: 3,
    topic: "L1 vs L2 Regularization",
    front: "Why does L1 regularization induce weight sparsity while L2 does not?",
    back: "L1 adds λ|w| (constant gradient ±λ), driving small weights strictly to zero.\nL2 adds λw² (gradient 2λw), shrinking weights proportionally without forcing them to exactly zero."
  },
  {
    id: "fc-7",
    week: 4,
    topic: "WordPiece vs BPE",
    front: "How do BPE and WordPiece differ in choosing adjacent token pairs to merge?",
    back: "• BPE: Merges the pair with the highest raw co-occurrence frequency Count(A, B).\n• WordPiece: Merges the pair maximizing Count(A, B) / (Count(A) × Count(B)) (mutual information / language model likelihood)."
  },
  {
    id: "fc-8",
    week: 4,
    topic: "Negative Sampling",
    front: "Why is negative sampling used in Word2Vec Skip-gram?",
    back: "Full softmax requires summing exp(v'_w · v_c) over the entire vocabulary |V| (prohibitive). Negative sampling turns it into binary logistic regressions over 1 positive target and k noise samples."
  },
  {
    id: "fc-9",
    week: 5,
    topic: "Seq2Seq Bottleneck & Attention",
    front: "What fundamental bottleneck in classical Seq2Seq did the Attention Mechanism solve?",
    back: "In vanilla Seq2Seq, the encoder compresses the entire variable-length source sentence into a single fixed-length context vector. Attention allows the decoder to dynamically attend to all encoder hidden states."
  },
  {
    id: "fc-10",
    week: 5,
    topic: "Temperature Decoding",
    front: "How does temperature parameter T affect token sampling probabilities?",
    back: "Logits are scaled as z_i / T.\n• T < 1 (Low): Sharpens distribution → more greedy, confident, deterministic.\n• T > 1 (High): Flattens distribution → more diverse, creative, exploratory."
  },
  {
    id: "fc-11",
    week: 6,
    topic: "Scaled Dot-Product Attention",
    front: "Why is the dot product Q·K^T divided by √d_k in Transformer attention?",
    back: "For large d_k, dot products grow large in variance (Var = d_k), pushing softmax into regions with near-zero gradients. Dividing by √d_k normalizes the variance back to 1."
  },
  {
    id: "fc-12",
    week: 6,
    topic: "Rotary Position Embedding (RoPE)",
    front: "How does Rotary Position Embedding (RoPE) represent token positions?",
    back: "It rotates 2D chunks of Query and Key vectors in the complex plane by angle m·θ. The inner product <R_m q, R_n k> naturally decays with relative distance (m - n) without adding static vectors."
  },
  {
    id: "fc-13",
    week: 7,
    topic: "BERT vs T5 Paradigms",
    front: "Differentiate the architectures and pre-training objectives of BERT and T5.",
    back: "• BERT: Encoder-only, bidirectional self-attention, trained on Masked LM (MLM) + Next Sentence Prediction (NSP).\n• T5: Encoder-decoder, text-to-text unified framing, trained on Span Corruption on C4 corpus."
  },
  {
    id: "fc-14",
    week: 7,
    topic: "NumPy Einsum Tensor Contraction",
    front: "What does numpy.einsum('ij,ji->', A, B) compute?",
    back: "It multiplies elements A[i, j] · B[j, i] and sums over all i and j. This equals the matrix trace: Tr(A @ B) = sum_i (A @ B)[i, i]."
  },
  {
    id: "fc-15",
    week: 8,
    topic: "RLHF & Bradley-Terry",
    front: "What is the Bradley-Terry preference objective in reward model training?",
    back: "Maximizes log σ(r(x, y_w) - r(x, y_l)), pushing the scalar reward of the human-preferred response y_w higher than the rejected response y_l."
  },
  {
    id: "fc-16",
    week: 8,
    topic: "RLHF KL Penalty",
    front: "Why is a KL penalty term added in PPO during RLHF?",
    back: "To prevent the policy π_θ from drifting too far from the reference policy π_ref, avoiding 'reward hacking' (exploiting flaws in the proxy reward model with repetitive or degenerate outputs)."
  },
  {
    id: "fc-17",
    week: 9,
    topic: "TransE Symmetry Limitation",
    front: "Why can TransE (score = ||s + r - o||) not model symmetric relations?",
    back: "If (s, r, o) and (o, r, s) both hold: s + r ≈ o and o + r ≈ s. Adding both yields 2r ≈ 0 → r ≈ 0. TransE collapses symmetric relation vectors to zero!"
  },
  {
    id: "fc-18",
    week: 10,
    topic: "LoRA Parameter Scaling",
    front: "For weight matrix W of size d × k with LoRA rank r, how many trainable parameters are added?",
    back: "Parameters = (d × r) + (r × k) = r · (d + k).\nFor d = k = 4096 and r = 8: 8 · (4096 + 4096) = 65,536 parameters (<0.4% of original 16.7M weights)!"
  },
  {
    id: "fc-19",
    week: 11,
    topic: "Hyperbolic (Poincaré Ball) Spaces",
    front: "Why are hyperbolic spaces naturally suited for hierarchical tree embeddings?",
    back: "In hyperbolic space (constant negative curvature), surface area and volume expand exponentially with radius sinh(r). Trees grow exponentially with depth, so trees embed with virtually zero distortion!"
  },
  {
    id: "fc-20",
    week: 12,
    topic: "StereoSet & ICAT Metric",
    front: "What is the Idealized CAT (iCAT) score formula in StereoSet?",
    back: "icat = LMS × min(SS, 100 - SS) / 50.\nWhere LMS is language modeling score and SS is stereotype score (ideal SS = 50 for demographic parity)."
  }
];
