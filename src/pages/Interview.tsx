
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '../components/Navbar';
import { Camera, Mic, MicOff, Video, VideoOff, Play, Square, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewType, setInterviewType] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const interviewQuestions = {
    'technical': [
      "Tell me about a challenging technical problem you've solved recently.",
      "How do you approach debugging a complex issue in production?",
      "Explain the difference between synchronous and asynchronous programming.",
      "How would you optimize a slow-performing database query?",
      "Describe your experience with version control and collaboration."
    ],
    'behavioral': [
      "Tell me about a time when you had to work under pressure.",
      "Describe a situation where you had to resolve a conflict with a team member.",
      "How do you handle feedback and criticism?",
      "Tell me about a project you're particularly proud of.",
      "Describe a time when you had to learn something completely new."
    ],
    'system-design': [
      "Design a URL shortening service like bit.ly.",
      "How would you design a chat application like WhatsApp?",
      "Design a content delivery network (CDN).",
      "How would you build a recommendation system?",
      "Design a distributed caching system."
    ]
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
        setIsMicOn(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to start the interview.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsMicOn(false);
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const startInterview = () => {
    if (!interviewType) {
      toast({
        title: "Select interview type",
        description: "Please select an interview type to continue.",
        variant: "destructive",
      });
      return;
    }
    setHasStarted(true);
    setIsRecording(true);
    toast({
      title: "Interview started!",
      description: "Good luck! Take your time to answer each question.",
    });
  };

  const nextQuestion = () => {
    const questions = interviewQuestions[interviewType as keyof typeof interviewQuestions];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    setIsRecording(false);
    setHasStarted(false);
    setCurrentQuestion(0);
    toast({
      title: "Interview completed!",
      description: "Great job! Your responses have been recorded for review.",
    });
  };

  const resetInterview = () => {
    setIsRecording(false);
    setHasStarted(false);
    setCurrentQuestion(0);
    setInterviewType('');
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getCurrentQuestions = () => {
    if (!interviewType) return [];
    return interviewQuestions[interviewType as keyof typeof interviewQuestions];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Interview Simulation 🎯
          </h1>
          <p className="text-xl text-gray-600">
            Practice with our AI-powered interview coach in a realistic environment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Interview Camera</span>
                  <div className="flex items-center space-x-2">
                    {isRecording && (
                      <Badge className="bg-red-500 animate-pulse">
                        REC
                      </Badge>
                    )}
                    <Badge variant={isCameraOn ? "default" : "secondary"}>
                      {isCameraOn ? "Camera On" : "Camera Off"}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    {isCameraOn ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg">Camera is off</p>
                          <p className="text-sm opacity-75">Click "Start Camera" to enable</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Camera Controls */}
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button
                      variant={isCameraOn ? "destructive" : "default"}
                      size="lg"
                      onClick={isCameraOn ? stopCamera : startCamera}
                    >
                      {isCameraOn ? (
                        <>
                          <VideoOff className="h-5 w-5 mr-2" />
                          Stop Camera
                        </>
                      ) : (
                        <>
                          <Video className="h-5 w-5 mr-2" />
                          Start Camera
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant={isMicOn ? "default" : "secondary"}
                      size="lg"
                      onClick={toggleMic}
                      disabled={!isCameraOn}
                    >
                      {isMicOn ? (
                        <>
                          <Mic className="h-5 w-5 mr-2" />
                          Mic On
                        </>
                      ) : (
                        <>
                          <MicOff className="h-5 w-5 mr-2" />
                          Mic Off
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview Controls */}
          <div className="space-y-6">
            {/* Interview Setup */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Interview Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Interview Type
                  </label>
                  <Select value={interviewType} onValueChange={setInterviewType} disabled={hasStarted}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Interview</SelectItem>
                      <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                      <SelectItem value="system-design">System Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-3">
                  {!hasStarted ? (
                    <Button 
                      onClick={startInterview}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      disabled={!isCameraOn || !interviewType}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Interview
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button onClick={nextQuestion} className="w-full">
                        {currentQuestion < getCurrentQuestions().length - 1 ? 'Next Question' : 'Finish Interview'}
                      </Button>
                      <Button variant="outline" onClick={endInterview} className="w-full">
                        <Square className="h-4 w-4 mr-2" />
                        End Interview
                      </Button>
                    </div>
                  )}
                  
                  <Button variant="outline" onClick={resetInterview}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            {hasStarted && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Current Question</span>
                    <Badge>
                      {currentQuestion + 1} / {getCurrentQuestions().length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-gray-800 leading-relaxed">
                    {getCurrentQuestions()[currentQuestion]}
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tip:</strong> Take your time to structure your answer. 
                      Use the STAR method for behavioral questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interview Progress */}
            {hasStarted && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getCurrentQuestions().map((_, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-sm ${
                          index === currentQuestion
                            ? 'bg-purple-100 text-purple-800 font-medium'
                            : index < currentQuestion
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Question {index + 1}
                        {index < currentQuestion && ' ✓'}
                        {index === currentQuestion && ' (Current)'}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
