
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import { User, Calendar, Book, Code, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: User,
      title: "AI-Powered Interviews",
      description: "Experience realistic interview scenarios with AI that adapts to your responses and provides personalized feedback."
    },
    {
      icon: Calendar,
      title: "Real-Time Practice",
      description: "Practice interviews with live webcam and microphone integration for authentic interview preparation."
    },
    {
      icon: Book,
      title: "Dynamic Quiz System",
      description: "Challenge yourself with domain-specific questions that adapt in difficulty based on your performance."
    },
    {
      icon: Code,
      title: "Skill Assessment",
      description: "Track your progress across different domains and receive targeted recommendations for improvement."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Practice Sessions" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Interview Types" },
    { number: "24/7", label: "AI Availability" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Master Your
              <br />
              Interview Skills
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered platform that transforms your interview preparation with real-time coaching, 
              adaptive questioning, and personalized feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Login to Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Interview.AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven interview preparation methods
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-purple-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who've improved their interview skills with our AI-powered platform
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg">
              Get Started Free
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
