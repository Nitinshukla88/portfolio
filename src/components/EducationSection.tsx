
import { GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

const educations = [
  {
    degree: "Computer Science and Engineering",
    institution: "Vignan's Institute of Information Technology",
    year: "2022 - 2026",
    description: "Focused on Advanced Algorithms and Machine Learning",
    achievements: "CGPA: 9.1"
  },
  {
    degree: "Online Specializations",
    institution: "Various Platforms",
    year: "Ongoing",
    description: "Continuous learning through courses on platforms like Coursera, edX, and Udemy",
    achievements: "20+ Certifications in various technologies"
  }
];

export function EducationSection() {
  return (
    <SectionWrapper id="education" className="bg-secondary/20">
      <div className="container px-4 sm:px-6 mx-auto max-w-4xl">
        <SectionHeading>Education</SectionHeading>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 mt-4 px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-primary mb-2 sm:mb-3">
            <span className="gradient-text">Foundation of Knowledge</span>
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            My academic journey and commitment to lifelong learning have provided me with a strong foundation 
            in computer science principles and cutting-edge technologies, enabling me to tackle complex challenges 
            with confidence and expertise.
          </p>
        </motion.div>
        
        <div className="grid gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
          {educations.map((education, index) => (
            <Card 
              key={index}
              className="opacity-0 animate-fade-up hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border hover:border-primary/40 hover:bg-card/80 group"
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: "forwards" }}
            >
              <CardContent className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 animate-pulse">
                    <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl">{education.degree}</h3>
                    <p className="text-accent text-base sm:text-lg mt-0.5 sm:mt-1">{education.institution}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">{education.year}</p>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base">{education.description}</p>
                    <div className="mt-3 sm:mt-4 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary">
                      <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{education.achievements}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
