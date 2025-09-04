import { Trophy, Star, Award, Medal, ExternalLink, Calendar, Building, FileText } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { Card, CardContent } from "./ui/card";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const achievements = [
  {
    title: "Passed Postman Certification",
    year: "2023",
    description: "Qualified Postman API Fundamentals Student Expert Certification Exam by demonstrating proficiency in API testing and development",
    icon: Award,
    features: [
      "First learned all the basics of APIs and API testing",
      "Practiced with Postman to test APIs",
      "In the end, I successfully passed the certification exam"
    ]
  },
  {
    title: "Got a rank of 4k in TCS CodeVita",
    year: "2024",
    description: "Participated in TCS CodeVita and secured a rank of 4000 among 10000+ participants",
    icon: Star,
    features: [
      "Solved complex problems under time constraints",
      "Demonstrated strong coding and problem-solving skills",
    ]
  },
  {
    title: "Achieved LiFT Scholarship",
    year: "2024",
    description: "Awarded the Shubhra Kar Linux Foundation Training Scholarship for demonstrating excellence in Linux and open-source technologies",
    icon: Trophy,
    features: [
      "Completed a comprehensive training program on Linux and open-source tools",
      "Contributed to open-source projects as part of the scholarship",
      "Gained hands-on experience with real-world applications of Linux"
    ]
  },
  {
    title: "Awarded Keploy API fellowship",
    year: "2025",
    description: "It's a 3-weeks training cohort focused on API development and testing. Out of 18.7K+ applicants, I was selected as one of the 1K fellows.",
    icon: Medal,
    features: [
      "Completed a comprehensive training program on API development and testing",
      "Gained hands-on experience with real-world applications of API technologies"
    ]
  },
  {
    title: "Passed KCNA Certification",
    year: "2025",
    description: "Successfully cleared the KCNA (Kubernetes and Cloud Native Associate) certification by demonstrating proficiency in Kubernetes and cloud-native technologies.",
    link: "https://www.credly.com/badges/30a71ef2-a467-47f0-9967-a1a271454724/public_url",
    icon: Award,
    features: [
    "Recognized for contributions to Cloud Native Computing Foundation projects",
    "Awarded for excellence and impact in the cloud native community"
    ]
  },
  {
    title: "Got Dan Kohn Scholarship",
    year: "2025",
    description: "Awarded the Dan Kohn Scholarship for contributions in Cloud Native Computing Foundation Projects.",
    icon: Trophy,
    features: [
    "Demonstrated proficiency in Kubernetes and cloud-native technologies",
    "Successfully cleared the KCNA certification exam with hands-on expertise"
    ]
  }
];

export function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);
  
  return (
    <SectionWrapper id="achievements" className="relative overflow-hidden">
      <div className="container mx-auto max-w-4xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Achievements</SectionHeading>
        </motion.div>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-primary mb-3">
            <span className="gradient-text">Milestones & Recognition</span>
          </h3>
          <p className="text-muted-foreground">
            Highlights of my professional journey, showcasing awards, competitions, and contributions 
            that reflect my commitment to excellence and innovation in the tech community.
          </p>
        </motion.div>
        
        <div className="mt-10">
          <div className="grid gap-8">
            {achievements.map((achievement, index) => {
              const isExpanded = expandedAchievement === index;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: isInView ? 1 : 0, 
                    y: isInView ? 0 : 50,
                    height: isExpanded ? 'auto' : undefined
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.1 * index },
                    y: { duration: 0.6, delay: 0.1 * index },
                    height: { duration: 0.3 }
                  }}
                  layout
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-border hover:border-primary/20 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <CardContent className="p-0">
                      <div className="flex relative">
                        <div className="w-20 md:w-28 bg-primary/10 flex flex-col items-center justify-center py-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <achievement.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                          </motion.div>
                          
                          <div className="mt-2 px-2 py-1 rounded-full bg-background/80 border border-border/50 text-xs font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-primary" />
                            <span>{achievement.year.split(' - ')[0]}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <h3 className="font-bold text-xl">{achievement.title}</h3>
                              {achievement.link && (
                                <a 
                                  href={achievement.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 text-sm"
                                >
                                  <span>View Badge</span>
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 text-xs gap-1"
                              onClick={() => setExpandedAchievement(isExpanded ? null : index)}
                            >
                              {isExpanded ? 'Less' : 'More'}
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </motion.div>
                            </Button>
                          </div>
                          
                          <p className="mt-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {achievement.description}
                          </p>
                          
                          {isExpanded && (
                            <motion.div 
                              className="mt-4 pt-4 border-t border-border/50"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Medal className="h-4 w-4 text-primary" />
                                Key Highlights
                              </h4>
                              <ul className="text-sm text-muted-foreground space-y-2">
                                {achievement.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="text-xs font-medium text-primary">{featureIndex + 1}</span>
                                    </div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
