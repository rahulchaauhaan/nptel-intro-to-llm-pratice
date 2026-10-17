export const week8Questions = [
  {
    "id": "w8-q1",
    "week": 8,
    "questionNumber": 1,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Instruction Tuning",
    "question": "Which of the following statements about instruction tuning of a pretrained language model are true?",
    "options": [
      {
        "id": "A",
        "text": "The prompt tokens are masked out of the next-token loss, so only the response tokens are supervised."
      },
      {
        "id": "B",
        "text": "It updates the parameters of the base model."
      },
      {
        "id": "C",
        "text": "It requires a separately trained reward model."
      },
      {
        "id": "D",
        "text": "Training on several different phrasings of the same task improves generalisation to unseen instructions."
      }
    ],
    "acceptedAnswers": [
      "The prompt tokens are masked out of the next-token loss, so only the response tokens are supervised.",
      "It updates the parameters of the base model.",
      "Training on several different phrasings of the same task improves generalisation to unseen instructions."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "D"
    ],
    "explanation": "A, B, D are TRUE. (C) is FALSE: instruction tuning does not require a reward model — that is needed for RLHF. Instruction tuning is a form of supervised fine-tuning on (instruction, response) pairs."
  },
  {
    "id": "w8-q2",
    "week": 8,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Prompt Tuning",
    "question": "In prompt tuning, which parameters are updated during training?",
    "options": [
      {
        "id": "A",
        "text": "All the weights of the pretrained model"
      },
      {
        "id": "B",
        "text": "Only the continuous prompt embeddings prepended to the input, while the model stays frozen"
      },
      {
        "id": "C",
        "text": "Only the final layer normalisation and the output head"
      },
      {
        "id": "D",
        "text": "The merge rules of the tokenizer"
      }
    ],
    "acceptedAnswers": [
      "Only the continuous prompt embeddings prepended to the input, while the model stays frozen"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Prompt tuning (Lester et al., 2021) keeps the entire pre-trained model frozen and only trains a small set of 'soft prompt' token embeddings prepended to every input. This enables task adaptation with minimal parameters."
  },
  {
    "id": "w8-q3",
    "week": 8,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Tree-of-Thought Prompting",
    "question": "Which capability does Tree-of-Thought (ToT) prompting add over Chain-of-Thought (CoT) prompting?",
    "options": [
      {
        "id": "A",
        "text": "It fine-tunes the model on reasoning traces before inference."
      },
      {
        "id": "B",
        "text": "It maintains several candidate reasoning branches and can backtrack from unpromising ones."
      },
      {
        "id": "C",
        "text": "It removes the need for any prompt design."
      },
      {
        "id": "D",
        "text": "It guarantees that the final answer is factually correct."
      }
    ],
    "acceptedAnswers": [
      "It maintains several candidate reasoning branches and can backtrack from unpromising ones."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "CoT generates a single chain of reasoning. ToT (Yao et al., 2023) explores a tree of reasoning steps, evaluating each node and using search (BFS/DFS) to backtrack from dead ends, enabling deliberate problem-solving."
  },
  {
    "id": "w8-q4",
    "week": 8,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "POSIX Metric",
    "question": "Which of the following is NOT captured by the POSIX metric for prompt sensitivity?",
    "options": [
      {
        "id": "A",
        "text": "Diversity in the responses produced under intent-preserving prompt variations"
      },
      {
        "id": "B",
        "text": "Entropy of the distribution of response frequencies"
      },
      {
        "id": "C",
        "text": "The wall-clock time taken to generate a response"
      },
      {
        "id": "D",
        "text": "Variance in the log-likelihood assigned to the same response across prompt variations"
      }
    ],
    "acceptedAnswers": [
      "The wall-clock time taken to generate a response"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "POSIX measures prompt sensitivity through output diversity and log-likelihood variance across semantically equivalent prompt variations. Wall-clock generation time is a hardware/efficiency metric, not captured by POSIX."
  },
  {
    "id": "w8-q5",
    "week": 8,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Prompt Sensitivity",
    "question": "Which conclusion about prompt sensitivity is supported by POSIX measurements across model families?",
    "options": [
      {
        "id": "A",
        "text": "Prompt sensitivity decreases monotonically with parameter count."
      },
      {
        "id": "B",
        "text": "A larger model within the same family can still be more prompt sensitive than a smaller one."
      },
      {
        "id": "C",
        "text": "Prompt sensitivity is zero for any instruction-tuned model."
      },
      {
        "id": "D",
        "text": "All models of the same parameter count have identical prompt sensitivity."
      }
    ],
    "acceptedAnswers": [
      "A larger model within the same family can still be more prompt sensitive than a smaller one."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "POSIX studies show that scaling alone doesn't guarantee reduced prompt sensitivity. Larger models can be more sensitive to surface-level prompt changes than smaller ones within the same family."
  },
  {
    "id": "w8-q6",
    "week": 8,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Alignment vs Instruction Tuning",
    "question": "Why is alignment performed on top of instruction tuning rather than stopping at instruction tuning?",
    "options": [
      {
        "id": "A",
        "text": "Instruction tuning does not allow the model to follow any instructions at all."
      },
      {
        "id": "B",
        "text": "Instruction tuning can still yield fluent, instruction-following responses that humans judge harmful or unacceptable."
      },
      {
        "id": "C",
        "text": "Instruction tuning destroys the model's performance on downstream tasks."
      },
      {
        "id": "D",
        "text": "Alignment is needed only for models below a few billion parameters."
      }
    ],
    "acceptedAnswers": [
      "Instruction tuning can still yield fluent, instruction-following responses that humans judge harmful or unacceptable."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Instruction tuning makes models helpful (following instructions) but not necessarily harmless or honest. Alignment (RLHF, DPO) further steers the model away from generating harmful, biased, or dishonest outputs."
  },
  {
    "id": "w8-q7",
    "week": 8,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "Bradley-Terry Reward Model",
    "question": "A reward model r(x, y) is trained on preference triples (x, y_w, y_l), where y_w is the preferred response and y_l the rejected one. Using the Bradley-Terry formulation, the training objective maximises:",
    "options": [
      {
        "id": "A",
        "text": "log σ( r(x, y_l) - r(x, y_w) )"
      },
      {
        "id": "B",
        "text": "log σ( r(x, y_w) - r(x, y_l) )"
      },
      {
        "id": "C",
        "text": "the entropy of the policy distribution"
      },
      {
        "id": "D",
        "text": "the KL divergence between the policy and the reference model"
      }
    ],
    "acceptedAnswers": [
      "log σ( r(x, y_w) - r(x, y_l) )"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "The Bradley-Terry model for pairwise comparison: P(y_w > y_l) = σ(r(x,y_w) - r(x,y_l)). Maximizing log-likelihood: max log σ(r(x,y_w) - r(x,y_l)), which pushes the preferred response reward higher than the rejected one."
  },
  {
    "id": "w8-q8",
    "week": 8,
    "questionNumber": 8,
    "points": 1,
    "type": "single_choice",
    "topic": "RLHF KL Penalty",
    "question": "In RLHF the policy is optimised for reward while a KL penalty against a reference policy is applied. What is the primary purpose of that KL term?",
    "options": [
      {
        "id": "A",
        "text": "To make each gradient update cheaper to compute"
      },
      {
        "id": "B",
        "text": "To keep the optimised policy close to the reference model, so it does not drift into degenerate high-reward behaviour"
      },
      {
        "id": "C",
        "text": "To increase the entropy of the sampled responses"
      },
      {
        "id": "D",
        "text": "To remove annotator bias from the preference dataset"
      }
    ],
    "acceptedAnswers": [
      "To keep the optimised policy close to the reference model, so it does not drift into degenerate high-reward behaviour"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Without the KL penalty, the policy would exploit the reward model (reward hacking) — generating gibberish or repetitive outputs that score high but are useless. The KL term constrains: max E[r(x,y)] - β·KL(π||π_ref)."
  },
  {
    "id": "w8-q9",
    "week": 8,
    "questionNumber": 9,
    "points": 1,
    "type": "multiple_choice",
    "topic": "REINFORCE Policy Gradient",
    "question": "Which of the following statements about REINFORCE-style policy optimisation for language models are true?",
    "options": [
      {
        "id": "A",
        "text": "The log-derivative trick yields an unbiased estimator of the policy gradient from sampled responses."
      },
      {
        "id": "B",
        "text": "Weighting the token-level log-probabilities by an advantage rather than the raw return reduces gradient variance."
      },
      {
        "id": "C",
        "text": "Importance ratios are clipped when several updates are taken on samples drawn from an older policy."
      },
      {
        "id": "D",
        "text": "The reward function must be differentiable with respect to the model parameters."
      }
    ],
    "acceptedAnswers": [
      "The log-derivative trick yields an unbiased estimator of the policy gradient from sampled responses.",
      "Weighting the token-level log-probabilities by an advantage rather than the raw return reduces gradient variance.",
      "Importance ratios are clipped when several updates are taken on samples drawn from an older policy."
    ],
    "acceptedOptionIds": [
      "A",
      "B",
      "C"
    ],
    "explanation": "A, B, C are TRUE. (D) is FALSE — a key advantage of REINFORCE/policy gradient is that rewards can be non-differentiable (human ratings, rule-based checks, code execution results). Only log π is differentiated."
  },
  {
    "id": "w8-q10",
    "week": 8,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "PPO-CLIP Objective",
    "question": "Let ratio_t = π_new(a_t|s_t) / π_old(a_t|s_t), and let ε > 0 be the clipping parameter. When the token-level advantage A_t is negative, the PPO-CLIP objective at step t reduces to maximising:",
    "options": [
      {
        "id": "A",
        "text": "min( ratio_t, 1 + ε ) A_t"
      },
      {
        "id": "B",
        "text": "max( ratio_t, 1 - ε ) A_t"
      },
      {
        "id": "C",
        "text": "min( ratio_t, 1 - ε ) A_t"
      },
      {
        "id": "D",
        "text": "max( ratio_t, 1 + ε ) A_t"
      }
    ],
    "acceptedAnswers": [
      "max( ratio_t, 1 - ε ) A_t"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "PPO-CLIP: min(r_t A_t, clip(r_t,1-ε,1+ε) A_t). When A_t < 0 (bad action), multiplying by negative inverts inequalities: min(r_t A_t, clip(...) A_t) = max(r_t, 1-ε) A_t. This prevents the policy from deviating too far below the clip threshold."
  }
];
