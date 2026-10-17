export const week1Questions = [
  {
    "id": "w1-q1",
    "week": 1,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "Distributional Semantics",
    "question": "Which of the following best captures the principle of distributional semantics?",
    "options": [
      {
        "id": "A",
        "text": "Words that appear in similar contexts tend to have similar meanings."
      },
      {
        "id": "B",
        "text": "A word's meaning is fully fixed by its dictionary definition."
      },
      {
        "id": "C",
        "text": "Meaning is determined solely by a word's spelling."
      },
      {
        "id": "D",
        "text": "Distributional semantics has no connection to word embeddings."
      }
    ],
    "acceptedAnswers": [
      "Words that appear in similar contexts tend to have similar meanings."
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "The distributional hypothesis (Firth, 1957) states that words that occur in similar contexts (co-occur with similar words) tend to have similar meanings. This is the theoretical foundation for word embeddings like Word2Vec and GloVe."
  },
  {
    "id": "w1-q2",
    "week": 1,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Polysemy",
    "question": "Which of the following words is least likely to be polysemous?",
    "options": [
      {
        "id": "A",
        "text": "Bank"
      },
      {
        "id": "B",
        "text": "Point"
      },
      {
        "id": "C",
        "text": "Oxygen"
      },
      {
        "id": "D",
        "text": "Head"
      }
    ],
    "acceptedAnswers": [
      "Oxygen"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Oxygen is a scientific/chemical term with a single, precise meaning. 'Bank', 'Point', and 'Head' are highly polysemous words with many distinct meanings depending on context."
  },
  {
    "id": "w1-q3",
    "week": 1,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Entailment",
    "question": "Consider the following sentence pair:\nSentence 1: The cat chased the mouse.\nSentence 2: The mouse was caught.\nDoes Sentence 1 entail Sentence 2?",
    "options": [
      {
        "id": "A",
        "text": "Yes"
      },
      {
        "id": "B",
        "text": "No"
      }
    ],
    "acceptedAnswers": [
      "No"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Entailment requires that if Sentence 1 is true, Sentence 2 must also be true. Chasing does not guarantee catching — the mouse could have escaped. Therefore S1 does NOT entail S2."
  },
  {
    "id": "w1-q4",
    "week": 1,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "Homonymy",
    "question": "Which sentence contains a homonym?",
    "options": [
      {
        "id": "A",
        "text": "He filled the glass with water."
      },
      {
        "id": "B",
        "text": "The bat flew out of the cave at dusk."
      },
      {
        "id": "C",
        "text": "She painted the wooden fence white."
      },
      {
        "id": "D",
        "text": "They walked slowly along the shore."
      }
    ],
    "acceptedAnswers": [
      "The bat flew out of the cave at dusk."
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "'Bat' is a homonym — it can refer to the flying mammal or a sports implement (cricket/baseball bat). The sentence is deliberately ambiguous between these two unrelated meanings."
  },
  {
    "id": "w1-q5",
    "week": 1,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Lexical Relations",
    "question": "Which of the following relationships is incorrectly labeled?",
    "options": [
      {
        "id": "A",
        "text": "Petal is a holonym of flower."
      },
      {
        "id": "B",
        "text": "Sparrow is a hyponym of bird."
      },
      {
        "id": "C",
        "text": "Oak is a hyponym of tree."
      },
      {
        "id": "D",
        "text": "Wheel is a meronym of car."
      }
    ],
    "acceptedAnswers": [
      "Petal is a holonym of flower."
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "A meronym is a PART of a whole. A holonym is the WHOLE containing parts. A petal is a PART of a flower, so petal is a MERONYM of flower — not a holonym. The label is incorrectly reversed."
  },
  {
    "id": "w1-q6",
    "week": 1,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "Pragmatics",
    "question": "_________ studies how context influences the interpretation of meaning.",
    "options": [
      {
        "id": "A",
        "text": "Syntax"
      },
      {
        "id": "B",
        "text": "Morphology"
      },
      {
        "id": "C",
        "text": "Pragmatics"
      },
      {
        "id": "D",
        "text": "Phonology"
      }
    ],
    "acceptedAnswers": [
      "Pragmatics"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Pragmatics is the branch of linguistics that studies how context (speaker intent, social context, prior discourse) shapes the interpretation of utterances beyond their literal semantic content."
  },
  {
    "id": "w1-q7",
    "week": 1,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "Coreference Resolution",
    "question": "In the sentence, \"After Meena scolded Priya, she walked away,\" who does \"she\" most likely refer to?",
    "options": [
      {
        "id": "A",
        "text": "Meena"
      },
      {
        "id": "B",
        "text": "Priya"
      },
      {
        "id": "C",
        "text": "Ambiguous"
      },
      {
        "id": "D",
        "text": "Neither"
      }
    ],
    "acceptedAnswers": [
      "Ambiguous"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "The pronoun 'she' could refer to either Meena or Priya. There is no linguistic or contextual clue to resolve the ambiguity definitively, making this a classic case of ambiguous coreference."
  },
  {
    "id": "w1-q8",
    "week": 1,
    "questionNumber": 8,
    "points": 1,
    "type": "single_choice",
    "topic": "Word Embeddings & Lexical Knowledge",
    "question": "Which of the following statements is true?\n(i) Word embeddings capture semantic similarity through context.\n(ii) A hyponym is more general than its hypernym.\n(iii) Morphological analysis has no role in language modelling.",
    "options": [
      {
        "id": "A",
        "text": "Only (i)"
      },
      {
        "id": "B",
        "text": "Only (i) and (ii)"
      },
      {
        "id": "C",
        "text": "Only (ii) and (iii)"
      },
      {
        "id": "D",
        "text": "All of the above"
      }
    ],
    "acceptedAnswers": [
      "Only (i)"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "(i) is TRUE: word embeddings like Word2Vec capture semantic similarity via context. (ii) is FALSE: a hyponym is MORE SPECIFIC than its hypernym (sparrow < bird). (iii) is FALSE: morphological analysis (stemming, lemmatisation, subword tokenisation) plays a key role in language modelling."
  },
  {
    "id": "w1-q9",
    "week": 1,
    "questionNumber": 9,
    "points": 1,
    "type": "multiple_choice",
    "topic": "NLP Challenges",
    "question": "What issues can be observed in the following text?\n\n\"Loving this staycation vibe – feelin chill n totally zen, no worries!\"",
    "options": [
      {
        "id": "A",
        "text": "Idioms"
      },
      {
        "id": "B",
        "text": "Non-standard English"
      },
      {
        "id": "C",
        "text": "Tricky Entity Names"
      },
      {
        "id": "D",
        "text": "Neologisms"
      }
    ],
    "acceptedAnswers": [
      "Non-standard English",
      "Tricky Entity Names"
    ],
    "acceptedOptionIds": [
      "B",
      "C"
    ],
    "explanation": "The text contains Non-standard English ('feelin', 'chill n', 'zen', informal spelling/contractions). 'Staycation' can also be considered a tricky entity/neologism. The accepted answer from NPTEL is Non-standard English and Tricky Entity Names."
  },
  {
    "id": "w1-q10",
    "week": 1,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "Semantic Role Labelling",
    "question": "In semantic role labelling, we determine the semantic role of each argument with respect to the ___________ of the sentence.",
    "options": [
      {
        "id": "A",
        "text": "noun phrase"
      },
      {
        "id": "B",
        "text": "subject"
      },
      {
        "id": "C",
        "text": "predicate"
      },
      {
        "id": "D",
        "text": "adjunct"
      }
    ],
    "acceptedAnswers": [
      "predicate"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Semantic Role Labelling (SRL) assigns roles (Agent, Patient, Theme, Location, etc.) to each argument relative to the main predicate (verb or eventuality) of the sentence."
  }
];
