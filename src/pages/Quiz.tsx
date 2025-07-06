
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '../components/Navbar';
import { Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Quiz = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const questionSets: Record<string, Question[]> = {
    'javascript': [
      {
        id: 1,
        question: "What is the output of: console.log(typeof null)?",
        options: ["null", "undefined", "object", "boolean"],
        correctAnswer: 2,
        explanation: "In JavaScript, typeof null returns 'object' due to a historical bug in the language.",
        difficulty: 'medium'
      },
      {
        id: 2,
        question: "Which method creates a new array with all elements that pass a test?",
        options: ["forEach()", "map()", "filter()", "reduce()"],
        correctAnswer: 2,
        explanation: "filter() creates a new array with all elements that pass the test implemented by the provided function.",
        difficulty: 'easy'
      },
      {
        id: 3,
        question: "What is a closure in JavaScript?",
        options: [
          "A function that returns another function",
          "A function that has access to variables in its outer scope",
          "A function that is immediately invoked",
          "A function without parameters"
        ],
        correctAnswer: 1,
        explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
        difficulty: 'hard'
      },
      {
        id: 4,
        question: "What does the 'this' keyword refer to in a regular function?",
        options: ["The function itself", "The global object", "The parent object", "undefined"],
        correctAnswer: 1,
        explanation: "In a regular function, 'this' refers to the global object (window in browsers, global in Node.js).",
        difficulty: 'medium'
      },
      {
        id: 5,
        question: "Which of these is NOT a primitive data type in JavaScript?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2,
        explanation: "Array is not a primitive data type. The primitive types are: string, number, boolean, null, undefined, symbol, and bigint.",
        difficulty: 'easy'
      }
    ],
    'react': [
      {
        id: 1,
        question: "What is the purpose of useEffect hook?",
        options: [
          "To manage component state",
          "To perform side effects in functional components",
          "To create new components",
          "To handle user input"
        ],
        correctAnswer: 1,
        explanation: "useEffect is used to perform side effects in functional components, such as API calls, subscriptions, or DOM manipulation.",
        difficulty: 'easy'
      },
      {
        id: 2,
        question: "When should you use useCallback hook?",
        options: [
          "To cache expensive calculations",
          "To prevent unnecessary re-renders of child components",
          "To manage complex state",
          "To handle form inputs"
        ],
        correctAnswer: 1,
        explanation: "useCallback is used to memoize functions and prevent unnecessary re-renders of child components that depend on those functions.",
        difficulty: 'hard'
      },
      {
        id: 3,
        question: "What is the difference between controlled and uncontrolled components?",
        options: [
          "Controlled components use refs, uncontrolled use state",
          "Controlled components have state managed by React, uncontrolled manage their own state",
          "There is no difference",
          "Controlled components are class-based, uncontrolled are functional"
        ],
        correctAnswer: 1,
        explanation: "Controlled components have their state managed by React through props and callbacks, while uncontrolled components manage their own state internally.",
        difficulty: 'medium'
      },
      {
        id: 4,
        question: "What is the virtual DOM?",
        options: [
          "A copy of the real DOM stored in memory",
          "A JavaScript representation of the DOM",
          "A faster version of the DOM",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "The virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates and improve performance.",
        difficulty: 'medium'
      },
      {
        id: 5,
        question: "How do you pass data from child to parent component?",
        options: [
          "Using props",
          "Using callback functions passed as props",
          "Using state",
          "Using context"
        ],
        correctAnswer: 1,
        explanation: "Data is passed from child to parent using callback functions that are passed down as props from the parent.",
        difficulty: 'easy'
      }
    ],
    'python': [
      {
        id: 1,
        question: "What is the output of: print(3 * '7')?",
        options: ["21", "777", "Error", "3"],
        correctAnswer: 1,
        explanation: "In Python, multiplying a string by a number repeats the string that many times. So 3 * '7' returns '777'.",
        difficulty: 'easy'
      },
      {
        id: 2,
        question: "Which of these is used to handle exceptions in Python?",
        options: ["try-catch", "try-except", "catch-except", "handle-error"],
        correctAnswer: 1,
        explanation: "Python uses try-except blocks to handle exceptions, not try-catch like some other languages.",
        difficulty: 'easy'
      },
      {
        id: 3,
        question: "What is a list comprehension?",
        options: [
          "A way to create lists using a concise syntax",
          "A method to sort lists",
          "A function to find elements in lists",
          "A way to delete list elements"
        ],
        correctAnswer: 0,
        explanation: "List comprehension is a concise way to create lists in Python using a single line of code with optional conditions.",
        difficulty: 'medium'
      },
      {
        id: 4,
        question: "What is the difference between == and is operators?",
        options: [
          "No difference",
          "== compares values, is compares identity",
          "== compares identity, is compares values",
          "is is used for numbers only"
        ],
        correctAnswer: 1,
        explanation: "== compares the values of objects, while 'is' compares their identity (whether they are the same object in memory).",
        difficulty: 'hard'
      },
      {
        id: 5,
        question: "What is a decorator in Python?",
        options: [
          "A way to modify or extend functions",
          "A data structure",
          "A loop type",
          "An error handling mechanism"
        ],
        correctAnswer: 0,
        explanation: "A decorator is a way to modify or extend the functionality of functions or classes without permanently modifying their structure.",
        difficulty: 'hard'
      }
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startQuiz = () => {
    if (!selectedDomain) {
      toast({
        title: "Select a domain",
        description: "Please select a quiz domain to continue.",
        variant: "destructive",
      });
      return;
    }
    setIsActive(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(900);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    const questions = questionSets[selectedDomain];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    setIsActive(false);
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    const questions = questionSets[selectedDomain];
    let correctAnswers = 0;
    
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    setScore(percentage);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsActive(false);
    setTimeLeft(900);
    setSelectedDomain('');
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestions = () => {
    return selectedDomain ? questionSets[selectedDomain] : [];
  };

  const currentQuestionData = getCurrentQuestions()[currentQuestion];

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Quiz Completed! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {score}%
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedAnswers.filter((answer, index) => 
                      answer === getCurrentQuestions()[index].correctAnswer
                    ).length}
                  </div>
                  <div className="text-green-800">Correct</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {getCurrentQuestions().length - selectedAnswers.filter((answer, index) => 
                      answer === getCurrentQuestions()[index].correctAnswer
                    ).length}
                  </div>
                  <div className="text-red-800">Incorrect</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {getCurrentQuestions().length}
                  </div>
                  <div className="text-blue-800">Total</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Review Your Answers</h3>
                {getCurrentQuestions().map((question, index) => (
                  <Card key={question.id} className="text-left">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {selectedAnswers[index] === question.correctAnswer ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                          </p>
                          {selectedAnswers[index] !== question.correctAnswer && (
                            <p className="text-sm text-red-600 mb-2">
                              <strong>Your answer:</strong> {selectedAnswers[index] !== undefined ? question.options[selectedAnswers[index]] : 'Not answered'}
                            </p>
                          )}
                          <p className="text-sm text-gray-700">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={resetQuiz} size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <RotateCcw className="h-5 w-5 mr-2" />
                Take Another Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Knowledge Quiz 📚
          </h1>
          <p className="text-xl text-gray-600">
            Test your knowledge with adaptive questions that match your skill level
          </p>
        </div>

        {!isActive ? (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Choose Your Quiz Domain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Domain
                </label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a domain to test your knowledge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript Fundamentals</SelectItem>
                    <SelectItem value="react">React Development</SelectItem>
                    <SelectItem value="python">Python Programming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Quiz Information</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 5 carefully crafted questions</li>
                  <li>• 15 minutes time limit</li>
                  <li>• Mixed difficulty levels</li>
                  <li>• Detailed explanations provided</li>
                  <li>• Instant results and feedback</li>
                </ul>
              </div>

              <Button 
                onClick={startQuiz} 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!selectedDomain}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">
                    Question {currentQuestion + 1} of {getCurrentQuestions().length}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant={currentQuestionData?.difficulty === 'easy' ? 'default' : 
                                 currentQuestionData?.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                      {currentQuestionData?.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono font-bold text-lg">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Progress 
                      value={((currentQuestion + 1) / getCurrentQuestions().length) * 100} 
                      className="mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {currentQuestionData?.question}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {currentQuestionData?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-purple-500 bg-purple-50 text-purple-900'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="font-medium">
                            {String.fromCharCode(65 + index)}. {option}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {currentQuestion === getCurrentQuestions().length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getCurrentQuestions().map((_, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-sm ${
                          index === currentQuestion
                            ? 'bg-purple-100 text-purple-800 font-medium'
                            : selectedAnswers[index] !== undefined
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Question {index + 1}
                        {selectedAnswers[index] !== undefined && index !== currentQuestion && ' ✓'}
                        {index === currentQuestion && ' (Current)'}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-medium">
                      {selectedAnswers.filter(a => a !== undefined).length} / {getCurrentQuestions().length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Left:</span>
                    <span className="font-mono font-bold text-purple-600">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domain:</span>
                    <Badge variant="outline">
                      {selectedDomain === 'javascript' ? 'JavaScript' : 
                       selectedDomain === 'react' ? 'React' : 'Python'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                onClick={finishQuiz}
                className="w-full"
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
