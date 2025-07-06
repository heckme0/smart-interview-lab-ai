
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { User, Calendar, Trophy, Target, Book, Clock } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { userStats } = useUser();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate software engineer with a love for problem-solving and continuous learning. Always eager to take on new challenges and grow professionally.',
    location: 'San Francisco, CA',
    experience: 'intermediate',
    domain: 'software',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    goals: 'Prepare for senior software engineer roles at top tech companies'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (skills: string) => {
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    setProfileData(prev => ({ ...prev, skills: skillsArray }));
  };

  const saveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  const achievements = [
    { title: "First Interview", description: "Completed your first mock interview", earned: true },
    { title: "Quiz Master", description: "Scored 90%+ on 3 consecutive quizzes", earned: true },
    { title: "Consistent Learner", description: "Practice for 7 days straight", earned: false },
    { title: "AI Challenger", description: "Complete 20 AI Q&A sessions", earned: false },
    { title: "Domain Expert", description: "Score 95%+ in your domain specialty", earned: true }
  ];

  const recentActivity = [
    { action: "Completed Technical Interview", time: "2 hours ago", score: "85%" },
    { action: "Finished JavaScript Quiz", time: "1 day ago", score: "92%" },
    { action: "AI Q&A Session", time: "2 days ago", score: "Good" },
    { action: "Behavioral Interview Practice", time: "3 days ago", score: "78%" },
    { action: "System Design Quiz", time: "1 week ago", score: "88%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Profile 👤
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and manage your interview preparation journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? saveProfile : () => setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
                    <p className="text-gray-600">{profileData.email}</p>
                    <p className="text-gray-600">{profileData.location}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select value={profileData.experience} onValueChange={(value) => handleInputChange('experience', value)} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="domain">Primary Domain</Label>
                      <Select value={profileData.domain} onValueChange={(value) => handleInputChange('domain', value)} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software Engineering</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                          <SelectItem value="product">Product Management</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input
                        id="skills"
                        value={profileData.skills.join(', ')}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        disabled={!isEditing}
                        placeholder="JavaScript, React, Python..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Career Goals</Label>
                  <Textarea
                    id="goals"
                    value={profileData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Your Skills
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          <Trophy className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            achievement.earned ? 'text-green-900' : 'text-gray-700'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && (
                            <Badge variant="default" className="mt-2 text-xs">
                              Earned ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats & Activity */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">Interviews</span>
                  </div>
                  <span className="font-bold text-purple-600">{userStats.interviewsCompleted}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Book className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Quizzes</span>
                  </div>
                  <span className="font-bold text-blue-600">{userStats.quizzesCompleted}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Avg Score</span>
                  </div>
                  <span className="font-bold text-green-600">{userStats.averageScore}%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-700">Level</span>
                  </div>
                  <Badge variant="default">{userStats.skillLevel}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {activity.action}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {activity.score}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals Progress */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">This Week's Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Practice Sessions</span>
                    <span>7/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Quiz Score Goal</span>
                    <span>85/90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>AI Sessions</span>
                    <span>4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
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

export default Profile;
