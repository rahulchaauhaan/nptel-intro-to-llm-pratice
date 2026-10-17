export const week11Questions = [
  {
    "id": "w11-q1",
    "week": 11,
    "questionNumber": 1,
    "points": 1,
    "type": "multiple_choice",
    "topic": "DistMult Model",
    "question": "Which statements correctly characterise the DistMult model for knowledge graph completion?",
    "options": [
      {
        "id": "A",
        "text": "Each relation is parameterised by a full D × D matrix, which lets it capture asymmetric relations."
      },
      {
        "id": "B",
        "text": "The relation is represented by a diagonal matrix, so the score is a multiplicative interaction of the entity embeddings."
      },
      {
        "id": "C",
        "text": "Because the diagonal form makes the score symmetric in the subject and object, it cannot distinguish a relation from its inverse."
      },
      {
        "id": "D",
        "text": "DistMult can only be evaluated on knowledge graphs whose relations are all symmetric."
      }
    ],
    "acceptedAnswers": [
      "The relation is represented by a diagonal matrix, so the score is a multiplicative interaction of the entity embeddings.",
      "Because the diagonal form makes the score symmetric in the subject and object, it cannot distinguish a relation from its inverse."
    ],
    "acceptedOptionIds": [
      "B",
      "C"
    ],
    "explanation": "DistMult: score(s,r,o) = Σ_i s_i r_i o_i = Σ_i o_i r_i s_i. Symmetric in s and o, so DistMult cannot model asymmetric relations like 'parent-of'. (A) is wrong — full matrices describe TransR, not DistMult."
  },
  {
    "id": "w11-q2",
    "week": 11,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "DistMult Score Calculation",
    "question": "In DistMult the score of a triple is the sum over dimensions of the element-wise product of the subject, relation and object embeddings. Given:\n\ns = [1, 2, 0], r = [2, -1, 3], o = [3, 1, 4]\n\nWhat are the scores of (s, r, o) and of the reversed triple (o, r, s)?",
    "options": [
      {
        "id": "A",
        "text": "4 and 4"
      },
      {
        "id": "B",
        "text": "4 and -4"
      },
      {
        "id": "C",
        "text": "4 and 12"
      },
      {
        "id": "D",
        "text": "6 and 4"
      }
    ],
    "acceptedAnswers": [
      "4 and 4"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "Score(s,r,o) = 1×2×3 + 2×(-1)×1 + 0×3×4 = 6 - 2 + 0 = 4. Score(o,r,s) = 3×2×1 + 1×(-1)×2 + 4×3×0 = 6 - 2 + 0 = 4. Both are 4, demonstrating DistMult's symmetry: score(s,r,o) = score(o,r,s)."
  },
  {
    "id": "w11-q3",
    "week": 11,
    "questionNumber": 3,
    "points": 1,
    "type": "multiple_choice",
    "topic": "ComplEx Model",
    "question": "Which statements about the ComplEx extension of DistMult are true?",
    "options": [
      {
        "id": "A",
        "text": "It moves the embeddings into the complex domain and takes the complex conjugate of the object embedding in the score."
      },
      {
        "id": "B",
        "text": "It replaces multiplicative interaction with element-wise addition of real-valued vectors."
      },
      {
        "id": "C",
        "text": "Setting the imaginary part of a relation embedding to zero recovers a symmetric, DistMult-like score."
      },
      {
        "id": "D",
        "text": "Every entity embedding must have unit norm for the model to be valid."
      }
    ],
    "acceptedAnswers": [
      "It moves the embeddings into the complex domain and takes the complex conjugate of the object embedding in the score.",
      "Setting the imaginary part of a relation embedding to zero recovers a symmetric, DistMult-like score."
    ],
    "acceptedOptionIds": [
      "A",
      "C"
    ],
    "explanation": "ComplEx: score = Re(Σ_k s_k r_k ō_k) where ō is the conjugate of o. The conjugate breaks symmetry, enabling asymmetric relations. When Im(r)=0, the conjugate has no effect, recovering the symmetric DistMult score."
  },
  {
    "id": "w11-q4",
    "week": 11,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "SimplE Model",
    "question": "What is the main modification SimplE makes to DistMult-style models in order to handle asymmetric relations?",
    "options": [
      {
        "id": "A",
        "text": "It replaces the entity embeddings with fixed random vectors."
      },
      {
        "id": "B",
        "text": "It gives every entity two embeddings, one for its subject role and one for its object role, and learns an embedding for each inverse relation."
      },
      {
        "id": "C",
        "text": "It constrains the relation tensor to rank one."
      },
      {
        "id": "D",
        "text": "It samples negatives for only half of the training triples."
      }
    ],
    "acceptedAnswers": [
      "It gives every entity two embeddings, one for its subject role and one for its object role, and learns an embedding for each inverse relation."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "SimplE (Kazemi & Poole, 2018): score(s,r,o) = ½(Σ s_i r_i o_i + Σ o_i r^{-1}_i s_i). Each entity has a head embedding (as subject) and a tail embedding (as object), and each relation has an inverse relation embedding."
  },
  {
    "id": "w11-q5",
    "week": 11,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Factorised KG Representations",
    "question": "What is the main advantage of a factorised representation such as DistMult or ComplEx for a large knowledge graph?",
    "options": [
      {
        "id": "A",
        "text": "It forces every relation in the graph to be symmetric."
      },
      {
        "id": "B",
        "text": "It stores each entity as a one-hot vector, which simplifies nearest-neighbour search."
      },
      {
        "id": "C",
        "text": "It collapses the graph into a single scalar summary."
      },
      {
        "id": "D",
        "text": "It replaces the full adjacency tensor with low-rank factors, which cuts the parameter count and lets the model generalise to unseen triples."
      }
    ],
    "acceptedAnswers": [
      "It replaces the full adjacency tensor with low-rank factors, which cuts the parameter count and lets the model generalise to unseen triples."
    ],
    "acceptedOptionIds": [
      "D"
    ],
    "explanation": "A KG with |E| entities and |R| relations requires |E|²·|R| parameters to store all facts. Factorised models represent entities and relations with d-dimensional embeddings: |E|·d + |R|·d parameters, enabling generalisation to unseen (s,r,o) triples."
  },
  {
    "id": "w11-q6",
    "week": 11,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Tensor Reshaping",
    "question": "How is a 3D knowledge graph tensor of shape |E| × |R| × |E| commonly reshaped into a matrix factorisation problem?",
    "options": [
      {
        "id": "A",
        "text": "The entire tensor is flattened into a 1D array and factorised with SVD."
      },
      {
        "id": "B",
        "text": "Each subject-relation pair is collapsed into a single index along one axis, while the objects remain along the other axis."
      },
      {
        "id": "C",
        "text": "The subject dimension is repeated until it matches the relation dimension."
      },
      {
        "id": "D",
        "text": "The relation axis is discarded and the remaining two axes are factorised."
      }
    ],
    "acceptedAnswers": [
      "Each subject-relation pair is collapsed into a single index along one axis, while the objects remain along the other axis."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "The 3D tensor X[s,r,o] is reshaped as X[(s,r), o] — a matrix of size (|E|·|R|) × |E|. This matrix is then factorised as M ≈ U V^T where rows represent (entity, relation) pairs and columns represent object entities."
  },
  {
    "id": "w11-q7",
    "week": 11,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "Hierarchical Embeddings Motivation",
    "question": "Which property of hierarchical relations motivates specialised embedding geometries rather than standard Euclidean KG embeddings?",
    "options": [
      {
        "id": "A",
        "text": "Symmetry: (A, is-a, B) implying (B, is-a, A)"
      },
      {
        "id": "B",
        "text": "The frequent presence of cycles in a taxonomy"
      },
      {
        "id": "C",
        "text": "Transitivity: (camel, is-a, mammal) and (mammal, is-a, animal) implying (camel, is-a, animal)"
      },
      {
        "id": "D",
        "text": "The high dimensionality of the entity embeddings"
      }
    ],
    "acceptedAnswers": [
      "Transitivity: (camel, is-a, mammal) and (mammal, is-a, animal) implying (camel, is-a, animal)"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Hierarchies grow exponentially (each node has exponentially many descendants). Euclidean space grows polynomially with dimension. Hyperbolic spaces have exponential volume growth, perfectly matching the tree-like structure of transitive hierarchies."
  },
  {
    "id": "w11-q8",
    "week": 11,
    "questionNumber": 8,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Poincaré Ball Embeddings",
    "question": "Which statements about hyperbolic (Poincaré ball) embeddings for hierarchical data are correct?",
    "options": [
      {
        "id": "A",
        "text": "The volume available grows exponentially with radius, which matches the exponential growth in the number of nodes at each level of a tree."
      },
      {
        "id": "B",
        "text": "Distances grow slowly near the centre and increase sharply towards the boundary, so depth in a hierarchy maps naturally onto radius."
      },
      {
        "id": "C",
        "text": "Every node must be placed exactly on the boundary of the unit ball."
      },
      {
        "id": "D",
        "text": "They give arbitrarily low distortion for any graph, not only tree-like ones."
      }
    ],
    "acceptedAnswers": [
      "The volume available grows exponentially with radius, which matches the exponential growth in the number of nodes at each level of a tree.",
      "Distances grow slowly near the centre and increase sharply towards the boundary, so depth in a hierarchy maps naturally onto radius."
    ],
    "acceptedOptionIds": [
      "A",
      "B"
    ],
    "explanation": "A, B are correct. (C) is FALSE — nodes near the boundary represent leaf nodes, but most nodes are inside the ball, with root near the centre. (D) is FALSE — hyperbolic embeddings excel for tree-like graphs; general graphs may still have high distortion."
  },
  {
    "id": "w11-q9",
    "week": 11,
    "questionNumber": 9,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Order Embeddings for Is-A",
    "question": "Why can a partial-order approach such as order embeddings suit 'is-a' relations better than a purely distance-based one?",
    "options": [
      {
        "id": "A",
        "text": "It encodes the ancestor-descendant relation directly as a coordinate-wise inequality or containment."
      },
      {
        "id": "B",
        "text": "It guarantees the full transitive closure of the hierarchy is recovered without any training."
      },
      {
        "id": "C",
        "text": "It represents sibling and ancestor pairs as negatively correlated vectors."
      },
      {
        "id": "D",
        "text": "It replaces symmetric pairwise distance with an asymmetric notion of ordering, which matches the asymmetry of is-a."
      }
    ],
    "acceptedAnswers": [
      "It encodes the ancestor-descendant relation directly as a coordinate-wise inequality or containment.",
      "It replaces symmetric pairwise distance with an asymmetric notion of ordering, which matches the asymmetry of is-a."
    ],
    "acceptedOptionIds": [
      "A",
      "D"
    ],
    "explanation": "Order embeddings (Vendrov et al.): u ≼ v iff u_i ≤ v_i for all i (coordinate-wise). This directly encodes the is-a hierarchy asymmetrically — 'dog ≼ mammal ≼ animal'. Distance-based methods are symmetric and cannot represent direction."
  },
  {
    "id": "w11-q10",
    "week": 11,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "Box Embeddings",
    "question": "Which limitation of axis-aligned cone embeddings do box embeddings address?",
    "options": [
      {
        "id": "A",
        "text": "Cones cannot represent containment at all, whereas boxes can."
      },
      {
        "id": "B",
        "text": "A cone has the same measure regardless of how broad or narrow it is, so the size of a category cannot be read off its region, whereas a box has a finite volume that can."
      },
      {
        "id": "C",
        "text": "Cones require all sibling categories to share an apex."
      },
      {
        "id": "D",
        "text": "Cones cannot be trained with gradient descent."
      }
    ],
    "acceptedAnswers": [
      "A cone has the same measure regardless of how broad or narrow it is, so the size of a category cannot be read off its region, whereas a box has a finite volume that can."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Cones extend infinitely into their positive orthant, giving them infinite volume regardless of angle. Box embeddings (axis-aligned hyperrectangles) have finite, computable volume, enabling: P(A|B) ≈ Vol(Box_A ∩ Box_B) / Vol(Box_B)."
  }
];
