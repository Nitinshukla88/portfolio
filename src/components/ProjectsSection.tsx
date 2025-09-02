
import { ExternalLink, Github, Code, Eye, Star, Layers, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { useState, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { assets } from "../assets/assets";

// Add custom CSS for medium and large screens
const customStyles = `
  @media (min-width: 800px) {
    .custom-row-even {
      flex-direction: row !important;
    }
    .custom-row-odd {
      flex-direction: row-reverse !important;
    }
    .custom-half-width {
      width: 50% !important;
    }
  }
`;

const projects = [
  {
    title: "Finory",
    description: "An AI-powered personal finance application that helps users track expenses, receive intelligent monthly reports, and get real-time budget alerts. Finory simplifies financial management with secure authentication, AI-driven receipt scanning, and workflow automation using Inngest.",
    image: assets.finory,
    tags: [
      { name: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Prisma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
      { name: "PostgreSQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Inngest", image: "https://avatars.githubusercontent.com/u/99505101?s=200&v=4" },
      { name: "Arcjet", image: "https://avatars.githubusercontent.com/u/149997572?s=200&v=4" }
    ],
    liveLink: "https://finory-app.vercel.app/",
    sourceLink: "https://github.com/Nammi-Kusuma/finory",
    keyFeatures: [
      "🤖 AI-powered receipt scanner to auto-extract and categorize transactions",
      "📊 Intelligent monthly financial reports with insights",
      "💸 Real-time budget alerts for better money management",
      "🔐 Secure authentication and Arcjet protection",
      "⚡ Event-driven workflows powered by Inngest",
      "📱 Responsive UI with modern design using TailwindCSS",
      "☁️ Cloud deployment on Vercel with persistent Convex DB"
    ]
  },
  {
    title: "TaskNest",
    description: "TaskNest is a modern and intuitive task management platform that empowers users to organize and track tasks efficiently. Built with a clean, scalable architecture, it mimics platforms like Trello and Notion to offer a smooth and responsive frontend experience. While backend development is still in progress, the current version showcases a fully functional UI with task boards, card interactions, and layout responsiveness.",
    image: assets.tasknest,
    tags: [
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Netlify", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
    ],
    liveLink: "https://kusuma-tasknet.netlify.app/",
    sourceLink: "https://github.com/Nammi-Kusuma/TaskNest",
    keyFeatures: [
      "🎨 Clean, minimalist UI with Tailwind CSS",
      "⚡ Fast development and build process using Vite",
      "🔐 Type-safe codebase with TypeScript",
      "🧩 Modular component structure for easy maintenance",
      "☁️ Cloud deployment via Netlify"
    ]
  },
  {
    title: "HostHive",
    description: "A feature-rich property rental platform that allows users to list, manage, and explore short-term rental properties. HostHive simplifies the hosting process while delivering a smooth experience for guests, similar to Airbnb.",
    image: assets.hosthive,
    tags: [
      { name: "Javascript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "EJS", }
    ],
    liveLink: "https://hosthive.onrender.com/",
    sourceLink: "https://github.com/Nammi-Kusuma/HostHive",
    keyFeatures: [
      "🔒 Secure authentication with Passport.js",
      "🏡 Full CRUD for property listings",
      "📱 Fully responsive design for mobile and desktop",
      "⚡ Optimized backend performance using Express.js",
      "🧱 Clean MVC architecture and modular codebase",
      "☁️ Cloud deployment via Render with persistent MongoDB Atlas storage"
    ]
  },
  {
    title: "SwiftBites",
    description: "A food ordering web application where users can explore a menu and place orders, while admins manage food items and track orders through a secure dashboard.",
    image: assets.swiftbites,
    tags: [
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Stripe", image: assets.stripe },
    ],
    liveLink: "https://swiftbites.onrender.com/",
    sourceLink: "https://github.com/Nammi-Kusuma/SwiftBites",
    keyFeatures: [
      "🛒 Users can explore the restaurant menu and place orders",
      "🧑‍🍳 Admin panel to add, update, or remove food items",
      "📦 View and manage customer orders from the dashboard",
      "🔐 Secure login system with authentication",
      "📱 Responsive layout for both desktop and mobile",
      "☁️ Cloud deployment via Render with persistent MongoDB Atlas storage"
    ]
  },
  {
    title: "My Portfolio",
    description: "A sleek and responsive personal portfolio website built with modern web technologies, showcasing projects, skills, and contact information. Designed for performance and scalability.",
    image: assets.myportfolio,
    tags: [
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Netlify", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
    ],
    liveLink: "https://portfolio-kusuma.netlify.app/",
    sourceLink: "https://github.com/Nammi-Kusuma/kusuma-portfolio",
    keyFeatures: [
      "🎨 Clean, minimalist UI with Tailwind CSS",
      "⚡ Fast development and build process using Vite",
      "📱 Fully responsive design for mobile and desktop",
      "🔐 Type-safe codebase with TypeScript",
      "🧩 Modular component structure for easy maintenance",
      "☁️ Cloud deployment via Netlify"
    ]
  },
  {
    title: "Weather Forecast App",
    description: "A responsive weather application that provides real-time weather updates for any city using the OpenWeatherMap API. Designed with a clean interface and optimized for performance.",
    image: assets.weatherapp,
    tags: [
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "OpenWeatherMap API", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Geolocation", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Maps", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
    liveLink: "https://nammi-kusuma.github.io/weather-app/",
    sourceLink: "https://github.com/Nammi-Kusuma/weather-app",
    keyFeatures: [
      "🌍 Search any city to get current weather data",
      "🌡️ Displays temperature, humidity, wind speed, and conditions",
      "📱 Fully responsive design",
      "🧩 Simple, clean UI for an intuitive user experience",
    ]
  },
  {
    title: "Currency Converter",
    description: "A responsive web application that allows users to convert between different currencies using real-time exchange rates. The application fetches exchange rates from the ExchangeAPI and displays corresponding country flags using the FlagsAPI.",
    image: assets.cc,
    tags: [
      { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ExchangeAPI", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "FlagsAPI", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
    liveLink: "https://nammi-kusuma.github.io/Currency-Convertor/",
    sourceLink: "https://github.com/Nammi-Kusuma/Currency-Convertor",
    keyFeatures: [
      "🔄 Real-time currency conversion with up-to-date exchange rates",
      "🚩 Displays country flags for selected currencies",
      "✅ Input validation to ensure accurate conversions",
      "📱 Fully responsive and mobile-friendly design",
    ]
  },
  {
    title: "Rock-Paper-Scissors Game",
    description: "A classic Rock-Paper-Scissors game built with HTML, CSS, and JavaScript. Users can play against the computer with a simple and intuitive interface.",
    image: assets.rps,
    tags: [
      { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
    liveLink: "https://nammi-kusuma.github.io/Rock-Paper-Scissors/",
    sourceLink: "https://github.com/Nammi-Kusuma/Rock-Paper-Scissors",
    keyFeatures: [
      "🎮 Interactive gameplay against a computer opponent",
      "🧠 Randomized computer choices for unpredictability",
      "📊 Real-time score tracking for user and computer",
      "🎨 Clean and responsive UI design",
      "🔁 Option to play multiple rounds seamlessly",
    ]
  },
  {
    title: "Spotify Replica",
    description: "A static replica of the Spotify web interface built using pure HTML and CSS. This project focuses on replicating the visual layout and design elements of Spotify.",
    image: assets.spotify,
    tags: [
      { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
    liveLink: "https://nammi-kusuma.github.io/Spotify-Replica/",
    sourceLink: "https://github.com/Nammi-Kusuma/Spotify-Replica",
    keyFeatures: [
      "🎨 Pixel-perfect recreation of Spotify's desktop UI",
      "🧭 Structured layout with sidebar, main content, and footer sections",
      "🖼️ Use of placeholder images and icons to mimic Spotify's aesthetics",
      "📱 Responsive design optimized for various screen sizes",
      "🧩 Clean and organized codebase for easy maintenance",
    ]
  },
  {
    title: "Travel Journal (UI Design)",
    description: "A static travel journal interface designed using React and CSS. This project focuses on clean visual layout, responsiveness, and modern UI aesthetics.",
    image: assets.traveljournal,
    tags: [
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
    liveLink: "https://nammi-kusuma.github.io/travel-journal/",
    sourceLink: "https://github.com/Nammi-Kusuma/travel-journal",
    keyFeatures: [
      "🖼️ Visually appealing layout for showcasing travel destinations",
      "📍 Location and description sections styled for clarity and balance",
      "🎨 Fully responsive and mobile-friendly UI",
      "🧩 Reusable React components for consistent design",
    ]
  },
];

import { motion, useInView } from "framer-motion";
import { useEffect } from "react";

export function ProjectsSection() {
  // Add the custom styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  return (
    <SectionWrapper id="projects">
      <div className="container mx-auto max-w-6xl" ref={sectionRef}>
        <SectionHeading>Projects</SectionHeading>

        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-primary mb-3">
            <span className="gradient-text">Turning Ideas into Digital Reality</span>
          </h3>
          <p className="text-muted-foreground">
            Explore my portfolio of innovative projects that showcase my technical skills,
            problem-solving abilities, and passion for creating impactful digital experiences.
          </p>
        </motion.div>

        <div className="space-y-20 mt-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`flex flex-col gap-8 items-center ${index % 2 === 0 ? 'custom-row-even' : 'custom-row-odd'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              {/* Image */}
              <div className="w-full md:w-full lg:w-1/2 custom-half-width overflow-hidden rounded-lg border border-border/40 hover:border-primary/30 transition-all duration-300 group relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Button size="sm" variant="secondary" className="rounded-full" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full" asChild>
                      <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                        <Code className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Tech badges */}
                <div className="absolute top-3 left-3 flex gap-1">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <div
                      key={idx}
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm p-1 flex items-center justify-center"
                      title={tag.name}
                    >
                      <img src={tag.image} alt={tag.name} className="h-full w-full object-contain" />
                    </div>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm h-8 px-2">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-full lg:w-1/2 custom-half-width space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Tech Stack</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="outline"
                        className="flex items-center gap-1 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                      >
                        {tag.image && <img src={tag.image} alt={tag.name} className="w-4 h-4" />}
                        <span className="text-xs">{tag.name}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Button
                    variant="ghost"
                    className="px-0 text-primary hover:text-accent hover:bg-transparent transition-colors"
                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  >
                    {expandedProject === index ? "Show Less" : "Show More"}
                  </Button>

                  {expandedProject === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4 pt-4 border-t border-border/50"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Key Features</span>
                      </div>

                      <ul className="text-sm text-muted-foreground space-y-2 pl-6 list-disc">
                        {project.keyFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>

                      <div className="flex gap-4 pt-2">
                        <Button size="sm" className="gap-1" asChild>
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-3.5 w-3.5" />
                            Live Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3.5 w-3.5" />
                            Source
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
