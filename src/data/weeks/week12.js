export const week12Questions = [
  {
    "id": "w12-q1",
    "week": 12,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "LLM Bias",
    "question": "Which of the following statements about bias in large language models are correct?\n1. Stereotypical associations can appear in model outputs even when no one involved in building the model intended them.\n2. Bias enters only during fine-tuning and never from the pretraining corpus.\n3. Biased outputs can cause real-world harm by reinforcing discrimination against particular groups.\n4. A model that scores highly on standard accuracy benchmarks is necessarily free of bias.",
    "options": [
      {
        "id": "A",
        "text": "1 and 2"
      },
      {
        "id": "B",
        "text": "1 and 3"
      },
      {
        "id": "C",
        "text": "2 and 4"
      },
      {
        "id": "D",
        "text": "1, 3 and 4"
      }
    ],
    "acceptedAnswers": [
      "1 and 3"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "(1) TRUE: emergent biases arise from training data without intent. (3) TRUE: biased language models can reinforce real-world discrimination. (2) FALSE: bias comes primarily from pretraining corpora. (4) FALSE: a model can be accurate but still biased."
  },
  {
    "id": "w12-q2",
    "week": 12,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "StereoSet Metric",
    "question": "In the StereoSet framework, what does a Stereotype Score (ss) of 50 indicate?",
    "options": [
      {
        "id": "A",
        "text": "The model refuses half of all prompts that mention a demographic group."
      },
      {
        "id": "B",
        "text": "The model chooses the stereotypical and the anti-stereotypical association equally often, which is the ideal value for this metric."
      },
      {
        "id": "C",
        "text": "Half of the model's completions are meaningless rather than meaningful."
      },
      {
        "id": "D",
        "text": "The model's accuracy on the stereotype detection task is 50 percent."
      }
    ],
    "acceptedAnswers": [
      "The model chooses the stereotypical and the anti-stereotypical association equally often, which is the ideal value for this metric."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "ss = % of times model prefers stereotypical over anti-stereotypical. ss=50 means equal preference (ideal unbiased model). ss>50 indicates stereotype preference; ss<50 is anti-stereotype preference. Either extreme is biased."
  },
  {
    "id": "w12-q3",
    "week": 12,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "ICAT Score",
    "question": "StereoSet reports the idealised CAT score as:\nicat = lms × min(ss, 100 - ss) / 50\n\nFor a model with a language modelling score lms = 80 and a stereotype score ss = 70, what is its icat?",
    "options": [
      {
        "id": "A",
        "text": "48"
      },
      {
        "id": "B",
        "text": "56"
      },
      {
        "id": "C",
        "text": "40"
      },
      {
        "id": "D",
        "text": "24"
      }
    ],
    "acceptedAnswers": [
      "48"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "min(ss, 100-ss) = min(70, 30) = 30. icat = 80 × 30 / 50 = 80 × 0.6 = 48. The icat score penalizes both high language modeling AND high stereotype bias. A perfect score requires lms=100 and ss=50."
  },
  {
    "id": "w12-q4",
    "week": 12,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "Sources of Bias in LLMs",
    "question": "Which of the following are recognised sources of bias in large language models?\n\n1. Skewed selection of training data, over-representing some topics or communities.\n2. Reliance on older corpora, producing temporal bias against current usage and norms.\n3. Over-representation of low-resource languages, producing what is termed linguistic inversion.\n4. Dominance of a few high-resource languages, producing cultural bias in what the model treats as default.",
    "options": [
      {
        "id": "A",
        "text": "1 and 2 only"
      },
      {
        "id": "B",
        "text": "2 and 3 only"
      },
      {
        "id": "C",
        "text": "1, 2 and 4"
      },
      {
        "id": "D",
        "text": "1, 3 and 4"
      }
    ],
    "acceptedAnswers": [
      "1, 2 and 4"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "1, 2, 4 are recognised sources. (3) is FALSE — it's the UNDER-representation of low-resource languages (not over-representation) that creates 'linguistic imperialism' / cultural bias favouring high-resource language norms."
  },
  {
    "id": "w12-q5",
    "week": 12,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Regard Metric",
    "question": "Which of the following best describes the 'regard' metric?",
    "options": [
      {
        "id": "A",
        "text": "A measure of how well a model can explain its own decision process."
      },
      {
        "id": "B",
        "text": "The perplexity of a model on demographically sensitive text."
      },
      {
        "id": "C",
        "text": "A classifier-assigned label capturing the attitude that generated text expresses towards a demographic group."
      },
      {
        "id": "D",
        "text": "The proportion of occasions on which a model spontaneously corrects discriminatory language."
      }
    ],
    "acceptedAnswers": [
      "A classifier-assigned label capturing the attitude that generated text expresses towards a demographic group."
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "'Regard' (Sheng et al., 2019) is a sentiment-like classifier that labels generated text as positive, negative, neutral, or other regarding a demographic group. It captures the attitude/valence of generated text, not just polarity."
  },
  {
    "id": "w12-q6",
    "week": 12,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Adversarial Trigger Debiasing",
    "question": "In bias mitigation with adversarial triggers, what is the aim of prepending a specially chosen token sequence to the prompt?",
    "options": [
      {
        "id": "A",
        "text": "To fine-tune the model parameters so the bias is removed permanently."
      },
      {
        "id": "B",
        "text": "To overwrite the model's prior knowledge and effectively reset it."
      },
      {
        "id": "C",
        "text": "To exploit the model's existing distribution so that biased associations in the continuation are neutralised or reversed."
      },
      {
        "id": "D",
        "text": "To randomise the token order so the model becomes robust to input perturbation."
      }
    ],
    "acceptedAnswers": [
      "To exploit the model's existing distribution so that biased associations in the continuation are neutralised or reversed."
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Adversarial triggers are short token sequences (found via gradient search) that steer the model's generation away from biased outputs without modifying model weights. They exploit the model's existing distribution to shift it toward less biased continuations."
  },
  {
    "id": "w12-q7",
    "week": 12,
    "questionNumber": 7,
    "points": 1,
    "type": "multiple_choice",
    "topic": "Safety Through In-Context Learning",
    "question": "Which steps make up the approach of improving response safety through in-context learning?",
    "options": [
      {
        "id": "A",
        "text": "Retrieving safety demonstrations that resemble the incoming user query."
      },
      {
        "id": "B",
        "text": "Fine-tuning the model on newly labelled data after each generation."
      },
      {
        "id": "C",
        "text": "Including the retrieved demonstrations in the prompt as examples that guide the response."
      },
      {
        "id": "D",
        "text": "Sampling many responses and returning whichever opinion appears most often."
      }
    ],
    "acceptedAnswers": [
      "Retrieving safety demonstrations that resemble the incoming user query.",
      "Including the retrieved demonstrations in the prompt as examples that guide the response."
    ],
    "acceptedOptionIds": [
      "A",
      "C"
    ],
    "explanation": "Safety through ICL: (1) retrieve similar safety examples from a demonstration bank (retrieval-augmented) and (2) include them in the prompt context. The model learns to match safe demonstration behaviour. No fine-tuning (B) or majority voting (D) required."
  },
  {
    "id": "w12-q8",
    "week": 12,
    "questionNumber": 8,
    "points": 1,
    "type": "multiple_choice",
    "topic": "High vs Low Resource Languages",
    "question": "Which statements about the effect of high-resource (HRL) and low-resource languages (LRL) on model training are correct?",
    "options": [
      {
        "id": "A",
        "text": "LRLs tend to show higher performance because they are spoken by smaller populations."
      },
      {
        "id": "B",
        "text": "HRLs contribute far more training data, so the model can overfit to the cultural perspectives carried in them."
      },
      {
        "id": "C",
        "text": "LRLs are under-represented, so the model captures their cultural nuances poorly."
      },
      {
        "id": "D",
        "text": "The dominance of HRLs is self-reinforcing, since better performance attracts more data and more investment."
      }
    ],
    "acceptedAnswers": [
      "HRLs contribute far more training data, so the model can overfit to the cultural perspectives carried in them.",
      "LRLs are under-represented, so the model captures their cultural nuances poorly.",
      "The dominance of HRLs is self-reinforcing, since better performance attracts more data and more investment."
    ],
    "acceptedOptionIds": [
      "B",
      "C",
      "D"
    ],
    "explanation": "B, C, D are correct. (A) is FALSE — smaller population size does not confer higher performance; LRLs actually have LOWER performance due to data scarcity."
  },
  {
    "id": "w12-q9",
    "week": 12,
    "questionNumber": 9,
    "points": 1,
    "type": "single_choice",
    "topic": "Counterfactual Data Augmentation",
    "question": "What does counterfactual data augmentation mean as a debiasing technique?",
    "options": [
      {
        "id": "A",
        "text": "Generating synthetic examples with a second model and filtering them by a reward score."
      },
      {
        "id": "B",
        "text": "Creating additional training examples by swapping demographic terms in existing text, so that associations are balanced across groups."
      },
      {
        "id": "C",
        "text": "Removing every sentence that mentions a demographic group from the training corpus."
      },
      {
        "id": "D",
        "text": "Adding a penalty term to the loss whenever the model generates a demographic term."
      }
    ],
    "acceptedAnswers": [
      "Creating additional training examples by swapping demographic terms in existing text, so that associations are balanced across groups."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "CDA (Lu et al., 2020): takes a sentence like 'The doctor drove his car' and generates 'The doctor drove her car'. By augmenting with gender-swapped versions, spurious associations between roles (doctor) and demographic attributes (gender) are broken."
  },
  {
    "id": "w12-q10",
    "week": 12,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "Responsible LLM",
    "question": "The idea of a 'Responsible LLM' is presented as addressing which of the following?",
    "options": [
      {
        "id": "A",
        "text": "Bias and fairness alone"
      },
      {
        "id": "B",
        "text": "A set of concerns spanning fairness, explainability, robustness, privacy and security"
      },
      {
        "id": "C",
        "text": "Only the trade-off between training cost and carbon footprint"
      },
      {
        "id": "D",
        "text": "The deployment of purely rule-based output filters"
      }
    ],
    "acceptedAnswers": [
      "A set of concerns spanning fairness, explainability, robustness, privacy and security"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Responsible AI in LLMs is a holistic discipline addressing: algorithmic fairness, transparency/explainability (XAI), robustness (adversarial, distributional), privacy (memorisation, differential privacy), and cybersecurity (jailbreaks, prompt injection)."
  }
];
