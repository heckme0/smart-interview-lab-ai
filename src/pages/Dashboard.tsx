
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { User, Calendar, Book, Code, ArrowRight, Trophy, Target, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { userStats } = useUser();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  const quickActions = [
    {
      title: 'Start Interview',
      description: 'Practice with AI interviewer',
      icon: User,
      link: '/interview',
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: Book,
      link: '/quiz',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'AI Q&A Session',
      description: 'Adaptive questioning',
      icon: Code,
      link: '/ai-qna',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {greeting}, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to level up your interview skills today?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{userStats.interviewsCompleted}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quizzes Taken</p>
                  <p className="text-3xl font-bold text-gray-900">{userStats.quizzesCompleted}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                  <Book className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">{userStats.averageScore}%</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skill Level</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.skillLevel}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.link}>
                      <div className="group p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`bg-gradient-to-r ${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                              <action.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {action.title}
                              </h3>
                              <p className="text-gray-600">
                                {action.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress & Upcoming */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Interview Practice</span>
                      <span className="font-medium">7/10 sessions</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Quiz Completion</span>
                      <span className="font-medium">4/5 quizzes</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Skill Improvement</span>
                      <span className="font-medium">85% goal</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Upcoming Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Technical Interview</p>
                      <p className="text-sm text-gray-600">Practice algorithms</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Behavioral Round</p>
                      <p className="text-sm text-gray-600">STAR method practice</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                    <Target className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-900">System Design</p>
                      <p className="text-sm text-gray-600">Architecture concepts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
