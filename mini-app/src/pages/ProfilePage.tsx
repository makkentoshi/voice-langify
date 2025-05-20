import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import { Card } from '@/components/ui/card';
import { 
  Flame, 
  Trophy, 
  BarChart2, 
  Calendar, 
  CheckCircle2,
  Clock,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfilePage: React.FC = () => {
  const streak = 7; // This would be fetched from storage
  const totalPoints = 450;
  
  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", completed: true },
    { id: 2, title: "On Fire", description: "Reach a 7-day streak", completed: true },
    { id: 3, title: "Vocabulary Master", description: "Learn 100 words", completed: false },
    { id: 4, title: "Grammar Guru", description: "Complete all grammar lessons", completed: false }
  ];
  
  const stats = [
    { label: "Words Learned", value: 78 },
    { label: "Quizzes Completed", value: 12 },
    { label: "Perfect Scores", value: 5 }
  ];
  
  const recentActivity = [
    { date: "Today", activity: "Completed Animals vocabulary" },
    { date: "Yesterday", activity: "Achieved a new streak record" },
    { date: "3 days ago", activity: "Scored 100% on Spanish quiz" }
  ];
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Profile</h1>
        </motion.div>
        
        <Card className="p-5">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">User</h2>
              <div className="flex items-center mt-1">
                <Flame className="text-accent-500 mr-1" size={16} />
                <span className="text-sm">{streak} day streak</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Points</span>
              <span className="font-semibold">{totalPoints}</span>
            </div>
            
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(totalPoints / 1000) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
              <span>Level 1</span>
              <span>1000 points to Level 2</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center mb-4">
            <Trophy className="text-warning-500 mr-2" size={20} />
            <h2 className="text-lg font-semibold">Achievements</h2>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="flex items-center p-3 bg-gray-50 rounded-ios"
              >
                <CheckCircle2 
                  size={18} 
                  className={achievement.completed ? "text-success-500" : "text-gray-300"}
                  fill={achievement.completed ? "rgba(52, 199, 89, 0.2)" : "none"}
                />
                <div className="ml-3">
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center mb-4">
            <BarChart2 className="text-primary-500 mr-2" size={20} />
            <h2 className="text-lg font-semibold">Statistics</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-3 rounded-ios text-center"
              >
                <p className="text-xl font-semibold text-primary-500">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center mb-4">
            <Calendar className="text-accent-500 mr-2" size={20} />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div 
                key={index}
                className="flex p-3 bg-gray-50 rounded-ios"
              >
                <Clock size={16} className="text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="pt-4">
          <Button 
            variant="outline"
            fullWidth
            icon={<LogOut size={18} />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;