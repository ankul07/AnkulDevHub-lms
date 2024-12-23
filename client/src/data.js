export const courses = [
  {
    id: 1,
    title: "Advanced Web Development Bootcamp",
    description:
      "An in-depth web development bootcamp covering frontend, backend, and full-stack technologies with real-world projects.",
    instructor: {
      name: "Mr. Ankit Verma",
      bio: "A seasoned full-stack developer with over 8 years of experience in web development and project management.",
      credentials: "BSc in Computer Science, Certified Full-Stack Developer",
      imageUrl: "https://example.com/instructor-image.jpg",
    },
    institution: "Web Academy",
    price: 1200,
    rating: 4.8,
    reviews: 56,
    imageUrl:
      "https://barcelonacodeschool.com/static/advanced-web-development-bootcamp-banner-f48715b3aba9b65c77f51ac1df56e188.png",
    category: "Web Development",
    level: "Advanced",
    language: "English",
    duration: "12 weeks",
    contentFormat: ["video tutorials", "projects", "exams", "code reviews"],
    prerequisites: "Basic knowledge of HTML, CSS, and JavaScript",
    enrollments: 320,
    startDate: "2024-11-05",
    endDate: "2025-01-30",
    status: "open",
    certification: true,
    syllabus: [
      "Week 1: Introduction to Web Development and Tools",
      "Week 2: Advanced HTML and CSS",
      "Week 3: JavaScript Essentials",
      "Week 4: ES6 and Modern JavaScript",
      "Week 5: Responsive Web Design",
      "Week 6: Frontend Frameworks (React)",
      "Week 7: Node.js and Backend Basics",
      "Week 8: Express and RESTful APIs",
      "Week 9: Database Integration (MongoDB, SQL)",
      "Week 10: Authentication and Authorization",
      "Week 11: Deploying Applications",
      "Week 12: Capstone Project and Code Review",
    ],
    learningObjectives: [
      "Develop proficiency in frontend and backend technologies",
      "Build full-stack applications with modern frameworks",
      "Gain experience in deploying applications",
    ],
    assessmentMethods: ["weekly quizzes", "capstone project", "code reviews"],
    discussionForum: "/forums/web-dev-bootcamp",
    courseMaterials: [
      "/materials/intro_to_web_dev.pdf",
      "/materials/css_guide.pdf",
      "/materials/react_basics.pdf",
    ],
    curriculum: [
      {
        module: "Introduction to Web Development",
        topics: [
          "Overview of Web Technologies",
          "Tools and Environment Setup",
          "Version Control with Git",
        ],
        resources: [
          "/materials/intro_guide.pdf",
          "/materials/git_commands.pdf",
        ],
      },
      {
        module: "Advanced HTML and CSS",
        topics: [
          "Semantic HTML",
          "CSS Grid and Flexbox",
          "Responsive Design Techniques",
        ],
        resources: [
          "/materials/advanced_html.pdf",
          "/materials/responsive_design.pdf",
        ],
      },
      {
        module: "JavaScript Essentials",
        topics: ["JavaScript Basics", "DOM Manipulation", "Event Handling"],
        resources: ["/materials/js_basics.pdf", "/materials/dom_guide.pdf"],
      },
    ],
    FAQs: [
      {
        question: "What is the refund policy?",
        answer:
          "Full refund within 14 days if less than 20% of the course content is accessed.",
      },
      {
        question: "Do I receive a certificate?",
        answer:
          "Yes, upon successful completion, you’ll receive a certification of completion.",
      },
    ],
    testimonials: [
      {
        student: "Ravi Mehta",
        review:
          "Amazing bootcamp! The instructors were very helpful and the projects were challenging yet rewarding.",
        rating: 5,
      },
      {
        student: "Priya Sharma",
        review:
          "Learned so much about full-stack development. Highly recommend!",
        rating: 4.8,
      },
    ],
    previewVideoUrl: "https://example.com/course-preview-video.mp4",
  },
  {
    id: 2,
    title: "Comprehensive Data Science Program",
    description:
      "This program covers data analysis, machine learning, and data visualization techniques using Python and R.",
    instructor: {
      name: "Dr. Meera Joshi",
      bio: "A data scientist with over 10 years of experience in machine learning and data analysis, dedicated to teaching and mentoring students.",
      credentials: "PhD in Statistics, Certified Data Scientist",
      imageUrl: "https://example.com/instructor-image.jpg",
    },
    institution: "Data Science Institute",
    price: 1500,
    rating: 4.9,
    reviews: 120,
    imageUrl:
      "https://softroniics.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-10-at-4.03.48-PM.jpeg",
    category: "Data Science",
    level: "Intermediate",
    language: "English",
    duration: "16 weeks",
    contentFormat: [
      "video lectures",
      "hands-on projects",
      "quizzes",
      "discussion forums",
    ],
    prerequisites: "Basic knowledge of Python and statistics",
    enrollments: 450,
    startDate: "2024-11-15",
    endDate: "2025-03-15",
    status: "open",
    certification: true,
    syllabus: [
      "Week 1: Introduction to Data Science and Tools",
      "Week 2: Data Exploration and Visualization",
      "Week 3: Statistical Analysis",
      "Week 4: Machine Learning Fundamentals",
      "Week 5: Supervised Learning Algorithms",
      "Week 6: Unsupervised Learning Techniques",
      "Week 7: Data Preprocessing and Feature Engineering",
      "Week 8: Model Evaluation and Selection",
      "Week 9: Working with Big Data",
      "Week 10: Data Ethics and Privacy",
      "Week 11: Capstone Project Planning",
      "Week 12: Capstone Project Implementation and Review",
    ],
    learningObjectives: [
      "Analyze and visualize data using Python and R",
      "Implement machine learning algorithms",
      "Develop a data-driven project from scratch",
    ],
    assessmentMethods: ["weekly assignments", "final project", "peer reviews"],
    discussionForum: "/forums/data-science-program",
    courseMaterials: [
      "/materials/data_analysis.pdf",
      "/materials/machine_learning_guide.pdf",
      "/materials/python_for_data_science.pdf",
    ],
    curriculum: [
      {
        module: "Introduction to Data Science",
        topics: [
          "Overview of Data Science",
          "Key Tools and Technologies",
          "Data Science Process",
        ],
        resources: [
          "/materials/data_science_intro.pdf",
          "/materials/tools_overview.pdf",
        ],
      },
      {
        module: "Data Visualization",
        topics: [
          "Visualization Techniques",
          "Using Matplotlib and Seaborn",
          "Creating Interactive Dashboards",
        ],
        resources: [
          "/materials/visualization_techniques.pdf",
          "/materials/dashboard_creation.pdf",
        ],
      },
      {
        module: "Machine Learning",
        topics: [
          "Regression and Classification",
          "Clustering Techniques",
          "Model Optimization",
        ],
        resources: [
          "/materials/machine_learning_overview.pdf",
          "/materials/model_optimization.pdf",
        ],
      },
    ],
    FAQs: [
      {
        question: "What are the software requirements?",
        answer:
          "You will need Python, R, and Jupyter Notebook installed on your system.",
      },
      {
        question: "Is prior coding experience required?",
        answer: "Basic knowledge of Python is recommended but not mandatory.",
      },
    ],
    testimonials: [
      {
        student: "Amit Singh",
        review:
          "This course transformed my career. I now work as a data analyst and love it!",
        rating: 5,
      },
      {
        student: "Sneha Patel",
        review:
          "Highly detailed and comprehensive. The projects were very practical.",
        rating: 4.7,
      },
    ],
    previewVideoUrl: "https://example.com/course-preview-video.mp4",
  },
  {
    id: 3,
    title: "Professional Graphic Design Program",
    description:
      "A comprehensive course covering design principles, tools, and techniques for aspiring graphic designers.",
    instructor: {
      name: "Ms. Priya Kapoor",
      bio: "A professional graphic designer with over 5 years of industry experience, passionate about teaching design concepts.",
      credentials: "BA in Graphic Design, Adobe Certified Expert",
      imageUrl: "https://example.com/instructor-image.jpg",
    },
    institution: "Design Academy",
    price: 800,
    rating: 4.6,
    reviews: 40,
    imageUrl:
      "https://www.excelptp.com/wp-content/uploads/2021/05/graphic-design-banner-img.jpg",
    category: "Graphic Design",
    level: "Beginner",
    language: "English",
    duration: "8 weeks",
    contentFormat: ["video tutorials", "design projects", "workshops"],
    prerequisites: "No prior design experience required",
    enrollments: 150,
    startDate: "2024-12-01",
    endDate: "2025-01-26",
    status: "open",
    certification: true,
    syllabus: [
      "Week 1: Introduction to Graphic Design",
      "Week 2: Design Principles and Elements",
      "Week 3: Typography Basics",
      "Week 4: Color Theory",
      "Week 5: Adobe Photoshop Fundamentals",
      "Week 6: Adobe Illustrator Essentials",
      "Week 7: Branding and Logo Design",
      "Week 8: Final Project Presentation",
    ],
    learningObjectives: [
      "Understand the fundamentals of graphic design",
      "Master tools like Adobe Photoshop and Illustrator",
      "Create professional-quality designs and branding",
    ],
    assessmentMethods: ["weekly assignments", "final project", "peer feedback"],
    discussionForum: "/forums/graphic-design-program",
    courseMaterials: [
      "/materials/graphic_design_intro.pdf",
      "/materials/color_theory.pdf",
      "/materials/adobe_guide.pdf",
    ],
    curriculum: [
      {
        module: "Fundamentals of Graphic Design",
        topics: [
          "Introduction to Design",
          "Understanding Layout and Composition",
          "Visual Hierarchy",
        ],
        resources: [
          "/materials/design_fundamentals.pdf",
          "/materials/layout_composition.pdf",
        ],
      },
      {
        module: "Adobe Photoshop",
        topics: [
          "Photoshop Interface and Tools",
          "Creating and Editing Images",
          "Basic Photo Manipulation",
        ],
        resources: [
          "/materials/photoshop_basics.pdf",
          "/materials/photo_editing_guide.pdf",
        ],
      },
      {
        module: "Branding and Logo Design",
        topics: [
          "What is Branding?",
          "Logo Design Principles",
          "Creating a Branding Strategy",
        ],
        resources: [
          "/materials/branding_intro.pdf",
          "/materials/logo_design.pdf",
        ],
      },
    ],
    FAQs: [
      {
        question: "Do I need to purchase software?",
        answer:
          "Yes, you will need access to Adobe Creative Cloud for the course.",
      },
      {
        question: "Is there a certificate upon completion?",
        answer:
          "Yes, a certificate will be issued after completing the course.",
      },
    ],
    testimonials: [
      {
        student: "Anjali Rao",
        review:
          "This course was fantastic! I learned so much about design tools.",
        rating: 4.9,
      },
      {
        student: "Rahul Jain",
        review:
          "Great introduction to graphic design. Highly recommend for beginners!",
        rating: 4.5,
      },
    ],
    previewVideoUrl: "https://example.com/course-preview-video.mp4",
  },
  {
    id: 4,
    title: "MERN Stack Development Bootcamp",
    description:
      "This bootcamp covers everything you need to know to become a full-stack developer using the MERN stack (MongoDB, Express, React, Node.js).",
    instructor: {
      name: "Mr. Vikram Sharma",
      bio: "A full-stack developer with over 7 years of experience in building scalable web applications. Passionate about teaching modern web technologies.",
      credentials: "B.Tech in Computer Science, MERN Stack Certified Developer",
      imageUrl: "https://example.com/instructor-image.jpg",
    },
    institution: "Tech Skills Academy",
    price: 1300,
    rating: 4.7,
    reviews: 75,
    imageUrl: "https://app.simpleshiksha.com/events/fsd.png",
    category: "Web Development",
    level: "Intermediate",
    language: "English",
    duration: "10 weeks",
    contentFormat: [
      "video lectures",
      "hands-on projects",
      "quizzes",
      "live sessions",
    ],
    prerequisites: "Basic knowledge of JavaScript and web development concepts",
    enrollments: 280,
    startDate: "2024-12-10",
    endDate: "2025-02-20",
    status: "open",
    certification: true,
    syllabus: [
      "Week 1: Introduction to MERN Stack",
      "Week 2: MongoDB Fundamentals",
      "Week 3: Express.js Basics",
      "Week 4: Building RESTful APIs",
      "Week 5: React.js Essentials",
      "Week 6: State Management with Redux",
      "Week 7: User Authentication and Authorization",
      "Week 8: Integrating Frontend and Backend",
      "Week 9: Deployment and Version Control",
      "Week 10: Capstone Project Development",
    ],
    learningObjectives: [
      "Understand the MERN stack and its components",
      "Build and deploy full-stack applications",
      "Implement user authentication and API integration",
    ],
    assessmentMethods: [
      "weekly assignments",
      "final capstone project",
      "peer reviews",
    ],
    discussionForum: "/forums/mern-stack-bootcamp",
    courseMaterials: [
      "/materials/mern_intro.pdf",
      "/materials/mongodb_guide.pdf",
      "/materials/react_basics.pdf",
    ],
    curriculum: [
      {
        module: "Introduction to MERN Stack",
        topics: [
          "Overview of the MERN Stack",
          "Setting Up Development Environment",
          "Version Control with Git",
        ],
        resources: ["/materials/mern_overview.pdf", "/materials/git_setup.pdf"],
      },
      {
        module: "MongoDB",
        topics: ["MongoDB Basics", "Data Modeling", "CRUD Operations"],
        resources: [
          "/materials/mongodb_basics.pdf",
          "/materials/data_modeling.pdf",
        ],
      },
      {
        module: "Express.js",
        topics: [
          "Building RESTful APIs",
          "Middleware Functions",
          "Error Handling",
        ],
        resources: ["/materials/express_api.pdf", "/materials/middleware.pdf"],
      },
      {
        module: "React.js",
        topics: [
          "React Components and Props",
          "State Management",
          "Using React Router",
        ],
        resources: [
          "/materials/react_components.pdf",
          "/materials/react_router.pdf",
        ],
      },
    ],
    FAQs: [
      {
        question: "Is prior programming experience required?",
        answer:
          "Basic knowledge of JavaScript and web development is recommended.",
      },
      {
        question: "What tools do I need?",
        answer:
          "You will need Node.js, MongoDB, and a code editor like Visual Studio Code.",
      },
    ],
    testimonials: [
      {
        student: "Aarav Yadav",
        review:
          "This bootcamp helped me transition into a full-stack developer role. The projects were very practical!",
        rating: 5,
      },
      {
        student: "Simran Kaur",
        review:
          "Great course! I loved the hands-on approach and the support from instructors.",
        rating: 4.8,
      },
    ],
    previewVideoUrl: "https://example.com/course-preview-video.mp4",
  },
  {
    id: 5,
    title: "MEAN Stack Development Bootcamp",
    description:
      "Dive into full-stack development with the MEAN stack. Learn to build powerful web applications using MongoDB, Express, Angular, and Node.js.",
    instructor: {
      name: "Ms. Neha Gupta",
      bio: "A passionate software engineer with over 6 years of experience in web development and a strong focus on the MEAN stack.",
      credentials: "MCA, Certified MEAN Stack Developer",
      imageUrl: "https://example.com/instructor-image.jpg",
    },
    institution: "Code Masters Academy",
    price: 1250,
    rating: 4.6,
    reviews: 60,
    imageUrl:
      "https://www.itbrainy.com/wp-content/uploads/2020/07/MeanStack-training-in-Coimbatore.png",
    category: "Web Development",
    level: "Intermediate",
    language: "English",
    duration: "8 weeks",
    contentFormat: [
      "video lectures",
      "hands-on projects",
      "quizzes",
      "weekly mentorship sessions",
    ],
    prerequisites:
      "Basic understanding of JavaScript and web development fundamentals",
    enrollments: 220,
    startDate: "2024-11-15",
    endDate: "2025-01-15",
    status: "open",
    certification: true,
    syllabus: [
      "Week 1: Introduction to MEAN Stack",
      "Week 2: MongoDB Fundamentals",
      "Week 3: Express.js Basics",
      "Week 4: Angular Fundamentals",
      "Week 5: Building RESTful APIs",
      "Week 6: Integrating Frontend and Backend",
      "Week 7: Authentication and Authorization",
      "Week 8: Capstone Project Development",
    ],
    learningObjectives: [
      "Understand the components of the MEAN stack",
      "Develop full-stack applications using MEAN",
      "Implement user authentication and API integration",
    ],
    assessmentMethods: [
      "weekly assignments",
      "capstone project",
      "peer evaluations",
    ],
    discussionForum: "/forums/mean-stack-bootcamp",
    courseMaterials: [
      "/materials/mean_intro.pdf",
      "/materials/mongodb_guide.pdf",
      "/materials/angular_basics.pdf",
    ],
    curriculum: [
      {
        module: "Introduction to MEAN Stack",
        topics: [
          "Overview of the MEAN Stack",
          "Setting Up Development Environment",
          "Version Control with Git",
        ],
        resources: ["/materials/mean_overview.pdf", "/materials/git_setup.pdf"],
      },
      {
        module: "MongoDB",
        topics: ["MongoDB Basics", "Data Modeling", "CRUD Operations"],
        resources: [
          "/materials/mongodb_basics.pdf",
          "/materials/data_modeling.pdf",
        ],
      },
      {
        module: "Express.js",
        topics: [
          "Building RESTful APIs",
          "Middleware Functions",
          "Error Handling",
        ],
        resources: ["/materials/express_api.pdf", "/materials/middleware.pdf"],
      },
      {
        module: "Angular",
        topics: [
          "Angular Components and Modules",
          "Data Binding and Services",
          "Routing and Navigation",
        ],
        resources: [
          "/materials/angular_components.pdf",
          "/materials/angular_services.pdf",
        ],
      },
    ],
    FAQs: [
      {
        question: "Is prior experience required?",
        answer:
          "Basic knowledge of JavaScript and web development is required.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes, you will receive a certification upon successful completion of the course.",
      },
    ],
    testimonials: [
      {
        student: "Kabir Singh",
        review:
          "Excellent course! The instructors were very knowledgeable, and the projects were very hands-on.",
        rating: 5,
      },
      {
        student: "Sneha Rani",
        review:
          "Great learning experience! The course covered all aspects of MEAN stack development.",
        rating: 4.7,
      },
    ],
    previewVideoUrl: "https://example.com/course-preview-video.mp4",
  },
];
export const filterOptions = {
  category: [
    "Python Programming",
    "Web Development",
    "Database",
    "Cyber Security",
    "Cloud Computing",
    "MEAN Stack Development",
    "MERN Stack Development",
    "Data Science",
    "Machine Learning",
    "Mobile App Development",
  ],
  level: ["Beginner", "Intermediate", "Advanced"],
  language: ["English", "Hindi"],
  priceRanges: [
    { label: "Free", value: "0" },
    { label: "0 - 500", value: "0-500" },
    { label: "500 - 1000", value: "500-1000" },
    { label: "1000+", value: "1000+" },
  ],
};
