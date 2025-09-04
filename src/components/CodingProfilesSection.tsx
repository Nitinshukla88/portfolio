
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

const codingProfiles = [
  {
    name: "LeetCode",
    username: "Nitin_777",
    rating: "Unrated",
    solved: "200+",
    achievements: [
      "2 Badges",
      // "Top 30% globally",
      "15 Days Streak"
    ],
    link: "https://leetcode.com/u/Nitin_777/",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png",
    badge: "Gold",
    badgeColor: "bg-amber-500",
    progress: 50,
    problemsLabel: "Problems Solved",
  },
  // {
  //   name: "CodeChef",
  //   username: "kusuma08",
  //   rating: "3★ (1614)",
  //   solved: "400+",
  //   achievements: [
  //     "Participated in 70+ contests",
  //     "Top 10% on platform",
  //     "100 Days Streak"
  //   ],
  //   link: "https://www.codechef.com/users/kusuma08",
  //   logo: assets.codechef,
  //   badge: "Expert",
  //   badgeColor: "bg-blue-500",
  //   progress: 65,
  //   problemsLabel: "Problems Solved",
  // },
  {
    name: "Geeks For Geeks",
    username: "nitinshukvrgf",
    solved: "50+",
    rating: "--",
    achievements: [
      "Problem Solver",
      "15+ Days Streak",
    ],
    link: "https://www.geeksforgeeks.org/user/nitinshukvrgf/",
    logo: assets.geeksforgeeks,
    badge: "Gold",
    badgeColor: "bg-amber-500",
    progress: 40,
    problemsLabel: "Challenges Solved",
  },
  {
    name: "GitHub",
    username: "Nitinshukla88",
    rating: "--",
    solved: "40+",
    achievements: [
      "600+ contributions",
      "10+ PRs merged",
      // "10+ Stars received"
    ],
    link: "https://github.com/Nitinshukla88",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-github-153-675523.png",
    badge: "Active",
    badgeColor: "bg-green-500",
    progress: 80,
    problemsLabel: "Repositories",
  }
];

const codingJourney = [
  {
    year: "2023",
    event: "Started FullStack developer Journey",
    description: "Began with fundamental concepts of web development"
  },
  {
    year: "23-24",
    event: "Built initial web applications using Js",
    description: "Gained hands-on experience in vanilla JavaScript alongside coding with Java"
  },
  {
    year: "2024",
    event: "Started learning frameworks and Libraries",
    // description: "Built RESTful APIs and implemented backend functionalities using FastAPI"
    description: "Dived into React and Redux for frontend development"
  },
  {
    year: "2025",
    event: "Started Learning backend with TypeScript",
    description: "Built RESTful APIs and made fullStack projects using Express.js"
  },
  {
    year: "2026",
    event: "Will Continue Learning and Growing",
    description: "Embracing new challenges and technologies to enhance my skill set"
  },
];

export function CodingProfilesSection() {
  return (
    <SectionWrapper id="coding-profiles">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading>Coding Profiles</SectionHeading>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-primary mb-3">
            <span className="gradient-text">Algorithmic Problem Solver</span>
          </h3>
          <p className="text-muted-foreground">
            Tracking my competitive programming journey and algorithmic problem-solving skills across 
            various platforms, showcasing my dedication to continuous improvement and technical excellence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codingProfiles.map((profile) => (
            <Card 
              key={profile.name} 
              className="overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 border-border hover:border-primary/30"
            >
              <CardHeader className="pb-2 relative bg-card/80">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-background/80 flex items-center justify-center p-2 shadow-inner">
                        <img 
                          src={profile.logo} 
                          alt={`${profile.name} logo`} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{profile.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      </div>
                    </div>
                    <Badge className={`${profile.badgeColor} text-white`}>
                      {profile.badge}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">Rating:</span>
                    </div>
                    <div className="text-lg font-bold text-primary">{profile.rating}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{profile.problemsLabel}:</p>
                    <p className="text-lg font-bold text-accent">{profile.solved}</p>
                  </div>
                  <div className="relative h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-500 group-hover:bg-primary"
                      style={{ width: `${profile.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="space-y-1 pt-2">
                    {profile.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 pb-4 bg-card/80">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <a href={profile.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    View Profile
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Coding Journey</h3>
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {codingJourney.map((milestone, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="relative flex flex-col items-center cursor-pointer group">
                      <div className="rounded-full bg-card border-2 border-primary z-10 h-12 w-12 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                        <span className="font-bold text-sm">{milestone.year}</span>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="font-medium text-sm">{milestone.event}</p>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{milestone.event}</h4>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
