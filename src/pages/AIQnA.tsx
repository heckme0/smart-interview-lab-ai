
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '../components/Navbar';
import { MessageSquare, User, Code, Send, RotateCcw, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  difficulty?: string;
}

const AIQnA = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [domain, setDomain] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const { toast } = useToast();

  const aiQuestions = {
    'software': {
      'beginner': [
        "What is the difference between == and === in JavaScript?",
        "Explain what a function is and how to declare one.",
        "What is the purpose of HTML and CSS?",
        "How do you handle errors in programming?",
        "What is version control and why is it important?"
      ],
      'intermediate': [
        "Explain the concept of closures in JavaScript with an example.",
        "What are the differences between SQL and NoSQL databases?",
        "How would you optimize a slow-loading web page?",
        "Explain the concept of RESTful APIs.",
        "What is the difference between synchronous and asynchronous programming?"
      ],
      'advanced': [
        "Design a system to handle 1 million concurrent users.",
        "Explain the trade-offs between microservices and monolithic architecture.",
        "How would you implement a distributed caching system?",
        "Discuss the CAP theorem and its implications.",
        "How would you handle database sharding in a high-traffic application?"
      ]
    },
    'data-science': {
      'beginner': [
        "What is the difference between supervised and unsupervised learning?",
        "Explain what a dataset is and its components.",
        "What is the purpose of data visualization?",
        "What are the basic steps in a data science project?",
        "What is the difference between correlation and causation?"
      ],
      'intermediate': [
        "How would you handle missing data in a dataset?",
        "Explain the bias-variance tradeoff in machine learning.",
        "What is cross-validation and why is it important?",
        "How do you evaluate the performance of a classification model?",
        "What is feature engineering and why is it crucial?"
      ],
      'advanced': [
        "How would you build a recommendation system for a streaming platform?",
        "Explain the mathematics behind gradient descent optimization.",
        "How would you handle concept drift in a production ML model?",
        "Design an A/B testing framework for a large-scale application.",
        "How would you build a real-time fraud detection system?"
      ]
    },
    'product': {
      'beginner': [
        "What is the role of a product manager?",
        "How do you prioritize features in a product roadmap?",
        "What is user experience (UX) and why is it important?",
        "Explain the concept of MVP (Minimum Viable Product).",
        "How do you gather user feedback?"
      ],
      'intermediate': [
        "How would you measure the success of a new feature?",
        "Explain the difference between product-led and sales-led growth.",
        "How do you conduct user research effectively?",
        "What is the product-market fit and how do you achieve it?",
        "How would you handle conflicting stakeholder requirements?"
      ],
      'advanced': [
        "How would you launch a product in a saturated market?",
        "Design a pricing strategy for a new SaaS product.",
        "How would you build and scale a product team?",
        "Explain how you would pivot a failing product.",
        "How would you develop a go-to-market strategy for enterprise clients?"
      ]
    }
  };

  const startSession = () => {
    if (!skillLevel || !domain) {
      toast({
        title: "Missing information",
        description: "Please select both skill level and domain to start.",
        variant: "destructive",
      });
      return;
    }

    setSessionStarted(true);
    setMessages([]);
    setQuestionCount(0);
    generateNextQuestion();
    
    toast({
      title: "AI Q&A Session Started!",
      description: "Answer questions to receive personalized feedback and adaptive difficulty.",
    });
  };

  const generateNextQuestion = () => {
    const domainQuestions = aiQuestions[domain as keyof typeof aiQuestions];
    const levelQuestions = domainQuestions[skillLevel as keyof typeof domainQuestions];
    
    if (levelQuestions && levelQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * levelQuestions.length);
      const question = levelQuestions[randomIndex];
      
      const aiMessage: Message = {
        id: Date.now(),
        type: 'ai',
        content: question,
        timestamp: new Date(),
        difficulty: difficulty
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Empty answer",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: currentAnswer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI feedback
    setTimeout(() => {
      const feedback = generateFeedback(currentAnswer);
      const feedbackMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: feedback,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, feedbackMessage]);
      
      // Generate next question after feedback
      setTimeout(() => {
        setQuestionCount(prev => prev + 1);
        adaptDifficulty();
        generateNextQuestion();
      }, 1000);
    }, 1500);

    setCurrentAnswer('');
  };

  const generateFeedback = (answer: string) => {
    const feedbacks = [
      `Great answer! I can see you understand the concept well. Your explanation about "${answer.slice(0, 50)}..." shows good technical depth. To make it even stronger, consider adding a practical example.`,
      `Good effort! Your answer demonstrates solid understanding. The way you approached "${answer.slice(0, 50)}..." is on the right track. Let me suggest some additional considerations...`,
      `Excellent response! Your detailed explanation shows strong expertise. I particularly liked how you mentioned "${answer.slice(0, 50)}...". This level of insight is impressive.`,
      `Nice work! You've covered the key points effectively. Your answer about "${answer.slice(0, 50)}..." demonstrates good problem-solving skills. Here's how you could expand on this...`,
      `Strong answer! Your technical understanding is clear. The approach you described regarding "${answer.slice(0, 50)}..." is practical and well-thought-out.`
    ];
    
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const adaptDifficulty = () => {
    // Simple difficulty adaptation logic
    if (questionCount > 0 && questionCount % 3 === 0) {
      if (difficulty === 'medium' && Math.random() > 0.5) {
        setDifficulty('advanced');
      } else if (difficulty === 'beginner') {
        setDifficulty('intermediate');
      }
    }
  };

  const resetSession = () => {
    setSessionStarted(false);
    setMessages([]);
    setCurrentAnswer('');
    setQuestionCount(0);
    setDifficulty('medium');
    setSkillLevel('');
    setDomain('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            AI Q&A Session 🤖
          </h1>
          <p className="text-xl text-gray-600">
            Interactive questioning with adaptive difficulty based on your responses
          </p>
        </div>

        {!sessionStarted ? (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Configure Your AI Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Skill Level
                  </label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Domain
                  </label>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software Engineering</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="product">Product Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">How AI Q&A Works</h3>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• AI asks questions tailored to your skill level and domain</li>
                      <li>• Receive personalized feedback on your answers</li>
                      <li>• Difficulty adapts based on your performance</li>
                      <li>• Practice real interview scenarios</li>
                      <li>• Get tips for improvement after each response</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={startSession} 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!skillLevel || !domain}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Start AI Q&A Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">AI Interview Coach</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      Question {questionCount + 1}
                    </Badge>
                    <Badge variant={difficulty === 'beginner' ? 'default' : 
                                 difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                      {difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Chat Messages */}
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-3xl rounded-lg p-4 ${
                          message.type === 'user' 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white ml-12' 
                            : 'bg-gray-100 text-gray-900 mr-12'
                        }`}>
                          <div className="flex items-start space-x-3">
                            {message.type === 'ai' && (
                              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full flex-shrink-0">
                                <Code className="h-4 w-4 text-white" />
                              </div>
                            )}
                            {message.type === 'user' && (
                              <div className="bg-white/20 p-2 rounded-full flex-shrink-0">
                                <User className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p className={`text-xs mt-2 ${
                                message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Answer Input */}
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Type your answer here... Be as detailed as you'd like!"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="min-h-24"
                      rows={4}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {currentAnswer.length} characters
                      </span>
                      <Button 
                        onClick={submitAnswer}
                        disabled={!currentAnswer.trim()}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Answer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Session Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domain:</span>
                    <Badge variant="outline">
                      {domain === 'software' ? 'Software Eng.' : 
                       domain === 'data-science' ? 'Data Science' : 'Product Mgmt.'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <Badge variant="secondary">{skillLevel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{questionCount + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <Badge variant={difficulty === 'beginner' ? 'default' : 
                                 difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                      {difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900 mb-1">💡 Structure Your Answer</p>
                      <p className="text-blue-800">Use frameworks like STAR method for behavioral questions.</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900 mb-1">🎯 Be Specific</p>
                      <p className="text-green-800">Include concrete examples and numbers when possible.</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-900 mb-1">🚀 Think Aloud</p>
                      <p className="text-purple-800">Explain your thought process and reasoning.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                onClick={resetSession}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Session
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIQnA;
