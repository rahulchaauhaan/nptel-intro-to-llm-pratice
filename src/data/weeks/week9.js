export const week9Questions = [
  {
    "id": "w9-q1",
    "week": 9,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "Knowledge Graph vs Relational DB",
    "question": "Which statement best explains why a knowledge graph (KG) is a more flexible representation than a traditional relational knowledge base?",
    "options": [
      {
        "id": "A",
        "text": "A KG needs no schema at all, whereas a relational knowledge base always does."
      },
      {
        "id": "B",
        "text": "A KG stores entities as nodes joined by typed edges, so heterogeneous relations and multi-hop traversal are represented directly."
      },
      {
        "id": "C",
        "text": "A KG stores every fact as a hypergraph, which removes all redundancy."
      },
      {
        "id": "D",
        "text": "A KG makes textual sources unnecessary because it stores every possible fact."
      }
    ],
    "acceptedAnswers": [
      "A KG stores entities as nodes joined by typed edges, so heterogeneous relations and multi-hop traversal are represented directly."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "KGs represent (subject, relation, object) triples as typed directed edges. This naturally handles heterogeneous fact types and enables graph traversal for multi-hop reasoning without complex joins."
  },
  {
    "id": "w9-q2",
    "week": 9,
    "questionNumber": 2,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Cross-Lingual Entity Alignment",
    "question": "Entity and relation alignment across knowledge graphs in different languages is a hard problem. Which of the following genuinely contribute to effective alignment?",
    "options": [
      {
        "id": "A",
        "text": "Transliteration and cross-lingual string matching over entity labels"
      },
      {
        "id": "B",
        "text": "Comparing the neighbourhood structure of candidate entities in the two graphs"
      },
      {
        "id": "C",
        "text": "Requiring that every alias of an entity appears identically in both graphs"
      },
      {
        "id": "D",
        "text": "Matching relations purely on the lexical similarity of their names, ignoring context"
      }
    ],
    "acceptedAnswers": [
      "Transliteration and cross-lingual string matching over entity labels",
      "Comparing the neighbourhood structure of candidate entities in the two graphs"
    ],
    "acceptedOptionIds": [
      "A",
      "B"
    ],
    "explanation": "(A) and (B) are effective: transliteration handles phonetically similar names across languages; structural (neighbourhood) similarity is language-agnostic and highly informative. (C) and (D) are unreliable assumptions."
  },
  {
    "id": "w9-q3",
    "week": 9,
    "questionNumber": 3,
    "points": 1,
    "type": "multiple_choice",
    "topic": "End-to-End KGQA",
    "question": "Which of the following are learned jointly in an end-to-end differentiable KGQA system, as opposed to a semantic parsing approach?",
    "options": [
      {
        "id": "A",
        "text": "A dense representation of the natural language question"
      },
      {
        "id": "B",
        "text": "Embeddings of the entities and relations in the graph"
      },
      {
        "id": "C",
        "text": "A hand-specified logical form for each question template"
      },
      {
        "id": "D",
        "text": "The scoring mechanism that selects which node answers the question"
      }
    ],
    "acceptedAnswers": [
      "A dense representation of the natural language question",
      "Embeddings of the entities and relations in the graph",
      "The scoring mechanism that selects which node answers the question"
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "D"
    ],
    "explanation": "End-to-end KGQA jointly trains question encoder, KG embeddings, and answer scoring. (C) is wrong — hand-specified logical forms are the semantic parsing approach, not end-to-end learning."
  },
  {
    "id": "w9-q4",
    "week": 9,
    "questionNumber": 4,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Closed-World Assumption",
    "question": "Which statements correctly describe the local closed-world assumption used when generating negatives for KG training?",
    "options": [
      {
        "id": "A",
        "text": "Triples not present in the graph are treated as false during training."
      },
      {
        "id": "B",
        "text": "It is strictly correct, because knowledge graphs are complete by construction."
      },
      {
        "id": "C",
        "text": "Some sampled negatives are in fact missing true triples, so the training signal carries label noise."
      },
      {
        "id": "D",
        "text": "It removes the need for a separate validation split."
      }
    ],
    "acceptedAnswers": [
      "Triples not present in the graph are treated as false during training.",
      "Some sampled negatives are in fact missing true triples, so the training signal carries label noise."
    ],
    "acceptedOptionIds": [
      "A",
      "C"
    ],
    "explanation": "The local CWA treats absent triples as negative examples for training. (B) is FALSE — KGs are inherently incomplete (they don't contain all facts). (C) is TRUE — this incompleteness introduces label noise in negative samples."
  },
  {
    "id": "w9-q5",
    "week": 9,
    "questionNumber": 5,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Sampled Softmax in KGE",
    "question": "A KG completion model is trained with a softmax over entities to model P(o | s, r). Which of the following statements about replacing the full softmax with a sampled one are correct?",
    "options": [
      {
        "id": "A",
        "text": "The exact denominator requires scoring every entity in the graph, which is prohibitively expensive for large KGs."
      },
      {
        "id": "B",
        "text": "The true object must be kept in the sampled denominator, otherwise the estimate is biased."
      },
      {
        "id": "C",
        "text": "Sampling negatives uniformly tends to produce easy negatives, giving a high-variance training signal."
      },
      {
        "id": "D",
        "text": "Sampled softmax removes the need to learn entity embeddings."
      }
    ],
    "acceptedAnswers": [
      "The exact denominator requires scoring every entity in the graph, which is prohibitively expensive for large KGs.",
      "The true object must be kept in the sampled denominator, otherwise the estimate is biased.",
      "Sampling negatives uniformly tends to produce easy negatives, giving a high-variance training signal."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "C"
    ],
    "explanation": "A, B, C are correct. (D) is FALSE — sampled softmax still requires entity embeddings; it only approximates the normalisation denominator."
  },
  {
    "id": "w9-q6",
    "week": 9,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Pairwise Hinge Loss",
    "question": "A model is trained with the pairwise hinge loss max{0, m + f(s', r, o') - f(s, r, o)}, where (s, r, o) is a positive triple, (s', r, o') a sampled negative, m > 0 the margin, and a higher f means a more plausible triple. The loss is strictly positive when:",
    "options": [
      {
        "id": "A",
        "text": "f(s, r, o) ≥ f(s', r, o') + m"
      },
      {
        "id": "B",
        "text": "f(s, r, o) < f(s', r, o') + m"
      },
      {
        "id": "C",
        "text": "f(s', r, o') ≥ f(s, r, o) + m"
      },
      {
        "id": "D",
        "text": "only when m = 0"
      }
    ],
    "acceptedAnswers": [
      "f(s, r, o) < f(s', r, o') + m"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "The hinge loss = max(0, m + f(neg) - f(pos)) > 0 when m + f(neg) - f(pos) > 0, i.e., f(pos) < f(neg) + m. The loss is zero only when the positive score exceeds the negative by at least the margin m."
  },
  {
    "id": "w9-q7",
    "week": 9,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "Hits@K and MRR",
    "question": "For a single test query, a KG completion model ranks the correct entity 4th out of 100 candidates. What are hits@1, hits@5 and the reciprocal rank for this query?",
    "options": [
      {
        "id": "A",
        "text": "0, 1, 0.25"
      },
      {
        "id": "B",
        "text": "1, 1, 4"
      },
      {
        "id": "C",
        "text": "0, 0, 0.25"
      },
      {
        "id": "D",
        "text": "0, 1, 4"
      }
    ],
    "acceptedAnswers": [
      "0, 1, 0.25"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Rank=4: hits@1=0 (not in top 1), hits@5=1 (rank 4 ≤ 5), reciprocal rank=1/4=0.25. Hits@K = 1 if rank ≤ K, else 0."
  },
  {
    "id": "w9-q8",
    "week": 9,
    "questionNumber": 8,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Filtered Evaluation",
    "question": "Which statements about filtered evaluation for KG completion are correct?",
    "options": [
      {
        "id": "A",
        "text": "Candidate entities that form known true triples in the training or validation data are removed from the ranked list before the test entity is scored."
      },
      {
        "id": "B",
        "text": "It avoids penalising the model for placing a different, genuinely correct answer above the held-out one."
      },
      {
        "id": "C",
        "text": "It can only ever lower the reported score compared with the raw setting."
      },
      {
        "id": "D",
        "text": "It changes ranking metrics such as MRR and hits@K."
      }
    ],
    "acceptedAnswers": [
      "Candidate entities that form known true triples in the training or validation data are removed from the ranked list before the test entity is scored.",
      "It avoids penalising the model for placing a different, genuinely correct answer above the held-out one.",
      "It changes ranking metrics such as MRR and hits@K."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "D"
    ],
    "explanation": "A, B, D are correct. (C) is FALSE — filtering raises (not lowers) scores by removing other valid entities from competitors, improving the apparent rank of the test entity."
  },
  {
    "id": "w9-q9",
    "week": 9,
    "questionNumber": 9,
    "points": 1,
    "type": "single_choice",
    "topic": "TransE Symmetry Limitation",
    "question": "Why can TransE not represent a non-trivial symmetric relation?",
    "options": [
      {
        "id": "A",
        "text": "Because the norm of every relation embedding in TransE is constrained to 1."
      },
      {
        "id": "B",
        "text": "Because symmetry would require both s + r ≈ o and o + r ≈ s, which forces r ≈ 0 and collapses the relation."
      },
      {
        "id": "C",
        "text": "Because the subject and object embeddings would have to be orthogonal."
      },
      {
        "id": "D",
        "text": "Because TransE uses complex-valued embeddings that cannot encode symmetry."
      }
    ],
    "acceptedAnswers": [
      "Because symmetry would require both s + r ≈ o and o + r ≈ s, which forces r ≈ 0 and collapses the relation."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "If (s,r,o) and (o,r,s) are both true: s+r≈o and o+r≈s. Adding: s+o+2r≈o+s → 2r≈0 → r≈0. A zero relation vector collapses all symmetric pairs to the same point, losing any meaningful representation."
  },
  {
    "id": "w9-q10",
    "week": 9,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "RotatE Scoring Function",
    "question": "Which of the following is the RotatE scoring function?",
    "options": [
      {
        "id": "A",
        "text": "f(s, r, o) = ‖ s + r - o ‖"
      },
      {
        "id": "B",
        "text": "f(s, r, o) = ‖ s ⊙ r - o ‖, where every component of r has modulus 1"
      },
      {
        "id": "C",
        "text": "f(s, r, o) = s^T M_r o, with M_r a full matrix"
      },
      {
        "id": "D",
        "text": "f(s, r, o) = - <s, r, o>, the real part of a three-way inner product"
      }
    ],
    "acceptedAnswers": [
      "f(s, r, o) = ‖ s ⊙ r - o ‖, where every component of r has modulus 1"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "RotatE (Sun et al., 2019) models relations as element-wise rotations in complex space: each component r_i = e^{iθ_{r,i}} has |r_i|=1. The score is f = -||s ⊙ r - o||, where ⊙ is element-wise complex multiplication."
  }
];
