export const week3Questions = [
  {
    "id": "w3-q1",
    "week": 3,
    "questionNumber": 1,
    "points": 1,
    "type": "single_choice",
    "topic": "Non-linearity",
    "question": "Which component of a neural network introduces non-linearity into the model?",
    "options": [
      {
        "id": "A",
        "text": "Weights"
      },
      {
        "id": "B",
        "text": "Bias"
      },
      {
        "id": "C",
        "text": "Activation function"
      },
      {
        "id": "D",
        "text": "Loss function"
      }
    ],
    "acceptedAnswers": [
      "Activation function"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Without non-linear activation functions, stacking multiple linear layers would still produce a linear function. Activations like ReLU, sigmoid, and tanh enable networks to learn complex non-linear mappings."
  },
  {
    "id": "w3-q2",
    "week": 3,
    "questionNumber": 2,
    "points": 1,
    "type": "single_choice",
    "topic": "Backpropagation",
    "question": "In backpropagation, which method is used to compute the gradients?",
    "options": [
      {
        "id": "A",
        "text": "Gradient descent"
      },
      {
        "id": "B",
        "text": "Chain rule of derivatives"
      },
      {
        "id": "C",
        "text": "Matrix factorization"
      },
      {
        "id": "D",
        "text": "Linear regression"
      }
    ],
    "acceptedAnswers": [
      "Chain rule of derivatives"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "Backpropagation applies the chain rule of calculus to efficiently compute gradients of the loss with respect to all parameters by propagating error signals from output to input layers."
  },
  {
    "id": "w3-q3",
    "week": 3,
    "questionNumber": 3,
    "points": 1,
    "type": "single_choice",
    "topic": "Activation Functions",
    "question": "Which of the following functions is not differentiable at zero?",
    "options": [
      {
        "id": "A",
        "text": "Sigmoid"
      },
      {
        "id": "B",
        "text": "Tanh"
      },
      {
        "id": "C",
        "text": "ReLU"
      },
      {
        "id": "D",
        "text": "Linear"
      }
    ],
    "acceptedAnswers": [
      "ReLU"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "ReLU(x) = max(0, x) has a kink at x=0 where the left derivative is 0 and the right derivative is 1. It is not differentiable at x=0 (though in practice we use a subgradient of 0 or 1)."
  },
  {
    "id": "w3-q4",
    "week": 3,
    "questionNumber": 4,
    "points": 1,
    "type": "single_choice",
    "topic": "Vanishing Gradients",
    "question": "Which activation function is least likely to suffer from vanishing gradients?",
    "options": [
      {
        "id": "A",
        "text": "Tanh"
      },
      {
        "id": "B",
        "text": "Sigmoid"
      },
      {
        "id": "C",
        "text": "ReLU"
      }
    ],
    "acceptedAnswers": [
      "ReLU"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Sigmoid and tanh saturate for large |x|, producing near-zero gradients. ReLU has a constant gradient of 1 for positive inputs, avoiding saturation and mitigating the vanishing gradient problem in deep networks."
  },
  {
    "id": "w3-q5",
    "week": 3,
    "questionNumber": 5,
    "points": 1,
    "type": "single_choice",
    "topic": "Sigmoid Derivative",
    "question": "Which of the following equations correctly represents the derivative of the sigmoid function?",
    "options": [
      {
        "id": "A",
        "text": "σ(x) · (1 + σ(x))"
      },
      {
        "id": "B",
        "text": "σ(x)²"
      },
      {
        "id": "C",
        "text": "σ(x) · (1 − σ(x))"
      },
      {
        "id": "D",
        "text": "1 / (1 + e^x)"
      }
    ],
    "acceptedAnswers": [
      "σ(x) · (1 − σ(x))"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "If σ(x) = 1/(1+e^{-x}), then dσ/dx = σ(x)·(1-σ(x)). This ranges from 0 (at saturated extremes) to 0.25 (at x=0), which is why sigmoid causes vanishing gradients in deep networks."
  },
  {
    "id": "w3-q6",
    "week": 3,
    "questionNumber": 6,
    "points": 1,
    "type": "single_choice",
    "topic": "XOR Problem",
    "question": "Why can a single-layer perceptron not solve the XOR problem?",
    "options": [
      {
        "id": "A",
        "text": "XOR requires probabilistic outputs"
      },
      {
        "id": "B",
        "text": "XOR is non-linear and not linearly separable"
      },
      {
        "id": "C",
        "text": "XOR has more than two classes"
      },
      {
        "id": "D",
        "text": "XOR requires backpropagation"
      }
    ],
    "acceptedAnswers": [
      "XOR is non-linear and not linearly separable"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "XOR cannot be separated by a single hyperplane — the four input points (0,0), (0,1), (1,0), (1,1) are not linearly separable. A single-layer perceptron can only learn linearly separable functions."
  },
  {
    "id": "w3-q7",
    "week": 3,
    "questionNumber": 7,
    "points": 1,
    "type": "single_choice",
    "topic": "Regularization",
    "question": "Which type of regularization encourages sparsity in the weights?",
    "options": [
      {
        "id": "A",
        "text": "L1 regularization"
      },
      {
        "id": "B",
        "text": "L2 regularization"
      },
      {
        "id": "C",
        "text": "Dropout"
      },
      {
        "id": "D",
        "text": "Early stopping"
      }
    ],
    "acceptedAnswers": [
      "L1 regularization"
    ],
    "acceptedOptionIds": [
      "A"
    ],
    "explanation": "L1 regularization adds λ·|w| to the loss, which pushes small weights exactly to zero, producing sparse solutions. L2 (||w||²) shrinks weights toward zero but rarely to exactly zero."
  },
  {
    "id": "w3-q8",
    "week": 3,
    "questionNumber": 8,
    "points": 1,
    "type": "single_choice",
    "topic": "Dropout",
    "question": "What happens to dropout during inference?",
    "options": [
      {
        "id": "A",
        "text": "It is applied with a higher probability"
      },
      {
        "id": "B",
        "text": "It is applied with a lower probability"
      },
      {
        "id": "C",
        "text": "It is disabled and all neurons are used"
      },
      {
        "id": "D",
        "text": "It is replaced by L2 regularization"
      }
    ],
    "acceptedAnswers": [
      "It is disabled and all neurons are used"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "During inference (test time), dropout is turned off — all neurons are active. Weights are typically scaled by (1-p) during training (inverted dropout), so no adjustment is needed at inference."
  },
  {
    "id": "w3-q9",
    "week": 3,
    "questionNumber": 9,
    "points": 1,
    "type": "single_choice",
    "topic": "Output Activation",
    "question": "What is typically the output activation function for an MLP solving a binary classification task?",
    "options": [
      {
        "id": "A",
        "text": "Tanh"
      },
      {
        "id": "B",
        "text": "ReLU"
      },
      {
        "id": "C",
        "text": "Sigmoid"
      },
      {
        "id": "D",
        "text": "Softmax"
      }
    ],
    "acceptedAnswers": [
      "Sigmoid"
    ],
    "acceptedOptionIds": [
      "C"
    ],
    "explanation": "Sigmoid squashes the output to (0,1), making it interpretable as a probability for the positive class in binary classification. Softmax is used for multi-class classification (K classes)."
  },
  {
    "id": "w3-q10",
    "week": 3,
    "questionNumber": 10,
    "points": 1,
    "type": "single_choice",
    "topic": "Learning Rate",
    "question": "What can be observed during training if the learning rate in gradient descent is set too high?",
    "options": [
      {
        "id": "A",
        "text": "Loss decreases smoothly"
      },
      {
        "id": "B",
        "text": "Loss oscillates or diverges"
      },
      {
        "id": "C",
        "text": "Loss always stays zero"
      },
      {
        "id": "D",
        "text": "None of these"
      }
    ],
    "acceptedAnswers": [
      "Loss oscillates or diverges"
    ],
    "acceptedOptionIds": [
      "B"
    ],
    "explanation": "A too-large learning rate causes the optimizer to overshoot the minimum, leading to oscillation around or divergence away from the optimum. The loss curve becomes unstable or grows instead of decreasing."
  }
];
