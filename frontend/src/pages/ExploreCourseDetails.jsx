import { useParams } from "react-router-dom";
import "../styles/ExploreCourseDetails.css";
import engineeringImg from "../assets/course1.png";
import medicalImg from "../assets/course2.png";
import commerceImg from "../assets/commerce.png";
import designImg from "../assets/course3.png";
import scienceImg from "../assets/science.png";
import managementImg from "../assets/management.png";
import artsImg from "../assets/arts.png";
import agricultureImg from "../assets/agriculture.png";
import hospitalityImg from "../assets/hospitality.png";
import aviationImg from "../assets/aviation.png";
import lawImg from "../assets/law.png";
import mediaImg from "../assets/media.png";
import educationImg from "../assets/education.png";
import architectureImg from "../assets/architecture.png";
import defenceImg from "../assets/defence.png";



const courseDetails = {
  engineering: {
    "computer-science": {
      title: "Computer Science Engineering",
      image: engineeringImg,
      salary: "₹5 – 25 LPA",
      overview:
        "Computer Science Engineering focuses on software development, artificial intelligence, cloud computing, cybersecurity and modern web technologies.",
      skills: [
        "Programming (C, Python, Java)",
        "Data Structures & Algorithms",
        "Databases & SQL",
        "Web Development",
        "Problem Solving"
      ],
      roles: [
        "Software Engineer",
        "Full Stack Developer",
        "AI Engineer",
        "Cloud Engineer",
        "Data Engineer"
      ],
      companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
      colleges: ["IIT Hyderabad", "NIT Warangal", "IIIT Hyderabad", "BITS Pilani"],
      roadmap: [
        "Learn Programming Basics",
        "Data Structures & Algorithms",
        "Web Development",
        "Projects & Internships",
        "Placement Preparation"
      ]
    },

    "ai-ml": {
      title: "AI & Machine Learning",
      image: engineeringImg,
      salary: "₹6 – 30 LPA",
      overview:
        "AI & ML focuses on building intelligent systems using machine learning, deep learning, and data science techniques.",
      skills: [
        "Python",
        "Statistics",
        "Machine Learning",
        "Deep Learning",
        "Data Analysis"
      ],
      roles: [
        "AI Engineer",
        "Machine Learning Engineer",
        "Data Scientist",
        "Research Engineer"
      ],
      companies: ["Google AI", "OpenAI", "Microsoft", "Amazon", "NVIDIA"],
      colleges: ["IIT Madras", "IISc Bangalore", "IIIT Bangalore"],
      roadmap: [
        "Learn Python",
        "Maths & Statistics",
        "Machine Learning",
        "Deep Learning",
        "AI Projects"
      ]
    },

    "data-science": {
      title: "Data Science",
      image: engineeringImg,
      salary: "₹6 – 28 LPA",
      overview:
        "Data Science focuses on extracting insights from big data using statistics, machine learning and visualization.",
      skills: [
        "Python & R",
        "SQL",
        "Machine Learning",
        "Data Visualization",
        "Statistics"
      ],
      roles: [
        "Data Scientist",
        "Data Analyst",
        "Business Analyst",
        "ML Engineer"
      ],
      companies: ["Amazon", "Flipkart", "Accenture", "Infosys", "TCS"],
      colleges: ["IIT Bombay", "IIT Kharagpur", "IISc Bangalore"],
      roadmap: [
        "Learn Python & SQL",
        "Statistics",
        "Machine Learning",
        "Visualization",
        "Real World Projects"
      ]
    },

    "mechanical": {
      title: "Mechanical Engineering",
      image: engineeringImg,
      salary: "₹4 – 18 LPA",
      overview:
        "Mechanical Engineering focuses on design, manufacturing, automobiles, robotics and thermal engineering.",
      skills: [
        "CAD Design",
        "Thermodynamics",
        "Manufacturing",
        "Material Science",
        "Problem Solving"
      ],
      roles: [
        "Design Engineer",
        "Automobile Engineer",
        "Manufacturing Engineer",
        "Maintenance Engineer"
      ],
      companies: ["Tata Motors", "Mahindra", "Bosch", "L&T"],
      colleges: ["IIT Delhi", "NIT Trichy", "BITS Pilani"],
      roadmap: [
        "Engineering Basics",
        "CAD & Design",
        "Manufacturing",
        "Internships",
        "Core Placements"
      ]
    },

    "civil": {
      title: "Civil Engineering",
      image: engineeringImg,
      salary: "₹4 – 16 LPA",
      overview:
        "Civil Engineering focuses on infrastructure, construction, transportation and smart cities.",
      skills: [
        "AutoCAD",
        "Structural Design",
        "Construction Planning",
        "Project Management"
      ],
      roles: [
        "Site Engineer",
        "Structural Engineer",
        "Project Manager",
        "Consultant"
      ],
      companies: ["L&T", "DLF", "Shapoorji Pallonji"],
      colleges: ["IIT Roorkee", "NIT Surathkal", "BITS Hyderabad"],
      roadmap: [
        "Civil Basics",
        "Design Software",
        "Internships",
        "Site Experience",
        "Core Jobs"
      ]
    },

    "ece": {
      title: "Electronics & Communication Engineering",
      image: engineeringImg,
      salary: "₹5 – 22 LPA",
      overview:
        "ECE focuses on electronics, communication systems, embedded systems and IoT.",
      skills: [
        "Embedded C",
        "Microcontrollers",
        "VLSI",
        "Communication Systems"
      ],
      roles: [
        "Embedded Engineer",
        "VLSI Engineer",
        "IoT Engineer",
        "Network Engineer"
      ],
      companies: ["Intel", "Qualcomm", "Samsung", "Texas Instruments"],
      colleges: ["IIT Kanpur", "NIT Calicut", "IIIT Hyderabad"],
      roadmap: [
        "Electronics Basics",
        "Embedded Systems",
        "VLSI",
        "Internships",
        "Core Placements"
      ]
    },
    "electrical": {
      title: "Electrical Engineering",
      image: engineeringImg,
      salary: "₹4 – 16 LPA",
      overview: "Power, Renewable Energy & Automation",
      skills: ["Power Systems", "Control Systems"],
      roles: ["Electrical Engineer", "Power Engineer"],
      companies: ["BHEL", "NTPC", "Siemens"],
      colleges: ["IIT BHU", "NIT Trichy"],
      roadmap: [
        "Core Electrical",
        "Power Systems",
        "Automation",
        "Industry Training"
      ]
    },
    "robotics": {
      title: "Robotics Engineering",
      image: engineeringImg,
      salary: "₹6 – 22 LPA",
      overview: "Robotics, Automation & AI systems",
      skills: ["ROS", "Python", "Embedded", "AI"],
      roles: ["Robotics Engineer", "Automation Engineer"],
      companies: ["ABB", "KUKA", "Boston Dynamics"],
      colleges: ["IIT Hyderabad", "IISc Bangalore"],
      roadmap: [
        "Electronics Basics",
        "Embedded Systems",
        "Robotics Projects",
        "AI Integration"
      ]
    },
    "cyber-security": {
      title: "Cyber Security",
      image: engineeringImg,
      salary: "₹6 – 28 LPA",
      overview: "Protect systems, networks and data from cyber attacks and security threats.",
      skills: ["Network Security", "Ethical Hacking", "Cryptography", "Linux"],
      roles: ["Cyber Security Analyst", "Security Engineer", "Ethical Hacker"],
      companies: ["Google", "Cisco", "IBM", "Palo Alto Networks"],
      colleges: ["IIIT Hyderabad", "IIT Delhi", "NIT Surathkal"],
      roadmap: ["Learn Networking", "Cyber Security Basics", "Ethical Hacking", "Security Certifications"]
    },
    "software-engineering": {
      title: "Software Engineering",
      image: engineeringImg,
      salary: "₹5 – 24 LPA",
      overview: "Develop scalable software systems and applications.",
      skills: ["Programming", "System Design", "Git", "Software Testing"],
      roles: ["Software Engineer", "Backend Developer", "Full Stack Developer"],
      companies: ["Microsoft", "Amazon", "Google", "TCS"],
      colleges: ["IIT Bombay", "IIIT Hyderabad"],
      roadmap: ["Learn Programming", "Data Structures", "Build Projects", "Software Jobs"]
    },
    "aerospace": {
      title: "Aerospace Engineering",
      image: engineeringImg,
      salary: "₹6 – 20 LPA",
      overview: "Design aircraft, satellites and space technologies.",
      skills: ["Aerodynamics", "Physics", "CAD", "Mathematics"],
      roles: ["Aerospace Engineer", "Space Scientist"],
      companies: ["ISRO", "NASA", "DRDO"],
      colleges: ["IIT Kanpur", "IIT Bombay"],
      roadmap: ["Physics & Math", "Aerospace Degree", "Research Projects"]
    },

},
medical: {
  "mbbs": {
    title: "MBBS (Doctor)",
    image: medicalImg,
    salary: "₹6 – 30 LPA",
    overview: "Become a doctor and work in hospitals, clinics, or research.",
    skills: ["Biology", "Anatomy", "Diagnosis", "Patient Care"],
    roles: ["Doctor", "Surgeon", "Medical Officer"],
    companies: ["AIIMS", "Apollo Hospitals", "Fortis", "Manipal Hospitals"],
    colleges: ["AIIMS Delhi", "CMC Vellore", "JIPMER", "KMC Manipal"],
    roadmap: [
      "Crack NEET",
      "MBBS (5.5 Years)",
      "Internship",
      "PG Specialization"
    ]
  },

  "bds": {
    title: "BDS (Dental)",
    image: medicalImg,
    salary: "₹4 – 15 LPA",
    overview: "Dental care, surgery and oral health careers.",
    skills: ["Dentistry", "Surgery", "Patient Care"],
    roles: ["Dentist", "Dental Surgeon"],
    companies: ["Clove Dental", "Apollo Dental", "Private Clinics"],
    colleges: ["Maulana Azad Dental College", "Manipal Dental College"],
    roadmap: [
      "Crack NEET",
      "BDS (5 Years)",
      "Internship",
      "Dental Practice"
    ]
  },

  "nursing": {
    title: "Nursing",
    image: medicalImg,
    salary: "₹3 – 10 LPA",
    overview: "Patient care, hospital management and healthcare support.",
    skills: ["Patient Care", "Medical Assistance", "Compassion"],
    roles: ["Staff Nurse", "ICU Nurse", "Head Nurse"],
    companies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare"],
    colleges: ["AIIMS Nursing", "CMC Nursing College"],
    roadmap: [
      "BSc Nursing",
      "Hospital Internship",
      "Specialization",
      "Senior Nurse Roles"
    ]
  },

  "pharmacy": {
    title: "Pharmacy",
    image: medicalImg,
    salary: "₹4 – 12 LPA",
    overview: "Medicine manufacturing, research and clinical pharmacy.",
    skills: ["Chemistry", "Drug Formulation", "Research"],
    roles: ["Pharmacist", "Drug Inspector", "Medical Representative"],
    companies: ["Sun Pharma", "Dr Reddy’s", "Cipla", "Pfizer"],
    colleges: ["NIPER Mohali", "Manipal Pharmacy"],
    roadmap: [
      "B.Pharmacy",
      "M.Pharmacy",
      "Industry Training",
      "Research / Pharma Job"
    ]
  },

  "physiotherapy": {
    title: "Physiotherapy",
    image: medicalImg,
    salary: "₹4 – 15 LPA",
    overview: "Rehabilitation, fitness and sports injury treatment.",
    skills: ["Rehabilitation", "Exercise Therapy", "Anatomy"],
    roles: ["Physiotherapist", "Sports Rehab Expert"],
    companies: ["Sports Clinics", "Hospitals", "Rehab Centers"],
    colleges: ["CMC Vellore", "Manipal University"],
    roadmap: [
      "BPT Degree",
      "Clinical Practice",
      "Sports Rehab",
      "Advanced Therapy"
    ]
  },

  "biotechnology": {
    title: "Biotechnology",
    image: medicalImg,
    salary: "₹5 – 20 LPA",
    overview: "Medical research, genetics, and drug development.",
    skills: ["Genetics", "Molecular Biology", "Lab Research"],
    roles: ["Research Scientist", "Biotech Engineer"],
    companies: ["Biocon", "Serum Institute", "Dr Reddy’s"],
    colleges: ["IIT Delhi", "IISc Bangalore"],
    roadmap: [
      "BSc / BTech Biotech",
      "MSc / MTech",
      "Research Projects",
      "Pharma Industry"
    ]
  },
  "radiology": {
    title: "Radiology",
    image: medicalImg,
    salary: "₹6 – 20 LPA",
    overview: "Diagnose diseases using medical imaging technologies.",
    skills: ["Medical Imaging", "Diagnosis", "Radiation Safety"],
    roles: ["Radiologist", "Imaging Specialist"],
    companies: ["Apollo Hospitals", "AIIMS"],
    colleges: ["AIIMS", "CMC Vellore"],
    roadmap: ["MBBS", "Radiology Specialization", "Hospital Practice"]
  },
  "public-health": {
    title: "Public Health",
    image: medicalImg,
    salary: "₹4 – 15 LPA",
    overview: "Improve healthcare systems and community health programs.",
    skills: ["Epidemiology", "Health Policy", "Research"],
    roles: ["Public Health Officer", "Health Analyst"],
    companies: ["WHO", "UNICEF"],
    colleges: ["TISS", "AIIMS"],
    roadmap: ["Health Degree", "Public Health Training"]
  },
  "medical-lab-tech": {
  title: "Medical Lab Technology",
  image: medicalImg,
  salary: "₹3 – 10 LPA",
  overview: "Perform lab tests to diagnose diseases.",
  skills: ["Lab Testing", "Biochemistry", "Diagnostics"],
  roles: ["Lab Technician", "Lab Analyst"],
  companies: ["Apollo Labs", "Thyrocare"],
  colleges: ["CMC Vellore"],
  roadmap: ["MLT Degree", "Hospital Internship"]
},
},

commerce: {
  "bcom": {
    title: "B.Com (Bachelor of Commerce)",
    image: commerceImg,
    salary: "₹3 – 10 LPA",
    overview: "Accounting, finance, taxation and business management careers.",
    skills: ["Accounting", "Finance", "Taxation", "Business Law"],
    roles: ["Accountant", "Financial Analyst", "Auditor"],
    companies: ["Deloitte", "EY", "KPMG", "PwC"],
    colleges: ["SRCC Delhi", "Loyola College", "Christ University"],
    roadmap: [
      "B.Com Degree",
      "Internships",
      "Professional Certification",
      "Corporate Job"
    ]
  },

  "ca": {
    title: "Chartered Accountant (CA)",
    image: commerceImg,
    salary: "₹6 – 30 LPA",
    overview: "Finance, auditing, taxation and corporate accounting.",
    skills: ["Accounting", "Taxation", "Audit", "Law"],
    roles: ["Chartered Accountant", "Tax Consultant", "Auditor"],
    companies: ["Deloitte", "PwC", "EY", "KPMG"],
    colleges: ["ICAI"],
    roadmap: [
      "CA Foundation",
      "CA Intermediate",
      "Articleship",
      "CA Final"
    ]
  },

  "cs": {
    title: "Company Secretary (CS)",
    image: commerceImg,
    salary: "₹5 – 20 LPA",
    overview: "Corporate law, governance and company compliance.",
    skills: ["Company Law", "Compliance", "Corporate Governance"],
    roles: ["Company Secretary", "Compliance Officer"],
    companies: ["Infosys", "TCS", "Wipro", "Corporate Firms"],
    colleges: ["ICSI"],
    roadmap: [
      "CS Foundation",
      "CS Executive",
      "CS Professional",
      "Corporate Practice"
    ]
  },

  "cma": {
    title: "Cost & Management Accountant (CMA)",
    image: commerceImg,
    salary: "₹5 – 18 LPA",
    overview: "Cost accounting, financial planning and budgeting.",
    skills: ["Costing", "Budgeting", "Financial Analysis"],
    roles: ["Cost Accountant", "Finance Manager"],
    companies: ["Tata", "Reliance", "Infosys"],
    colleges: ["ICMAI"],
    roadmap: [
      "CMA Foundation",
      "CMA Intermediate",
      "CMA Final",
      "Industry Job"
    ]
  },

  "bba": {
    title: "BBA (Bachelor of Business Administration)",
    image: commerceImg,
    salary: "₹4 – 12 LPA",
    overview: "Management, leadership and business strategy.",
    skills: ["Leadership", "Marketing", "Operations"],
    roles: ["Business Analyst", "Manager", "Consultant"],
    companies: ["Amazon", "Flipkart", "Consulting Firms"],
    colleges: ["NMIMS", "Christ University", "Symbiosis"],
    roadmap: [
      "BBA Degree",
      "Internships",
      "MBA",
      "Corporate Career"
    ]
  },

  "mba": {
    title: "MBA (Master of Business Administration)",
    image: commerceImg,
    salary: "₹8 – 35 LPA",
    overview: "Leadership, strategy, finance, marketing and operations.",
    skills: ["Management", "Strategy", "Communication"],
    roles: ["Manager", "Consultant", "Business Leader"],
    companies: ["McKinsey", "BCG", "Amazon", "Google"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "ISB Hyderabad"],
    roadmap: [
      "Crack CAT",
      "MBA Program",
      "Internships",
      "Leadership Roles"
    ]
  },
  "banking-finance": {
    title: "Banking & Finance",
    image: commerceImg,
    salary: "₹4 – 20 LPA",
    overview: "Work in banking, investment and financial management.",
    skills: ["Finance", "Banking Operations", "Risk Analysis"],
    roles: ["Bank Manager", "Financial Analyst"],
    companies: ["HDFC", "ICICI", "SBI"],
    colleges: ["SRCC", "Christ University"],
    roadmap: ["Commerce Degree", "Finance Certification"]
  },
  "financial-analysis": {
    title: "Financial Analysis",
    image: commerceImg,
    salary: "₹5 – 22 LPA",
    overview: "Analyze financial data and investment opportunities.",
    skills: ["Excel", "Financial Modeling", "Statistics"],
    roles: ["Financial Analyst", "Investment Analyst"],
    companies: ["Goldman Sachs", "JP Morgan"],
    colleges: ["IIM Ahmedabad"],
    roadmap: ["Finance Degree", "Financial Modeling", "Investment Firms"]
  },
},

design: {

  "ui-ux": {
    title: "UI/UX Design",
    image: designImg,
    salary: "₹5 – 25 LPA",
    overview: "Design user-friendly websites and mobile apps with beautiful interfaces.",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    roles: ["UI Designer", "UX Designer", "Product Designer"],
    companies: ["Google", "Microsoft", "Amazon", "Swiggy", "Zomato"],
    colleges: ["NID", "IIT Bombay IDC", "Pearl Academy"],
    roadmap: [
      "Learn Design Basics",
      "UX Research",
      "UI Tools (Figma)",
      "Build Portfolio",
      "Apply for Design Jobs"
    ]
  },

  "fashion": {
    title: "Fashion Design",
    image: designImg,
    salary: "₹4 – 20 LPA",
    overview: "Create clothing, accessories and fashion collections.",
    skills: ["Sketching", "Fabric Knowledge", "Pattern Making", "Creativity"],
    roles: ["Fashion Designer", "Stylist", "Fashion Consultant"],
    companies: ["Adidas", "Puma", "Myntra", "Lifestyle"],
    colleges: ["NIFT", "Pearl Academy", "JD Institute"],
    roadmap: [
      "Design Fundamentals",
      "Fashion Illustration",
      "Internships",
      "Portfolio",
      "Fashion Industry Job"
    ]
  },

  "graphic": {
    title: "Graphic Design",
    image: designImg,
    salary: "₹4 – 18 LPA",
    overview: "Design logos, posters, branding and digital creatives.",
    skills: ["Photoshop", "Illustrator", "Canva", "Typography"],
    roles: ["Graphic Designer", "Brand Designer", "Visual Designer"],
    companies: ["Adobe", "Ogilvy", "Infosys", "Accenture"],
    colleges: ["NID", "Arena Animation", "MAAC"],
    roadmap: [
      "Design Principles",
      "Design Tools",
      "Branding Projects",
      "Portfolio",
      "Design Agency Job"
    ]
  },

  "interior": {
    title: "Interior Design",
    image: designImg,
    salary: "₹4 – 15 LPA",
    overview: "Design modern homes, offices and commercial spaces.",
    skills: ["AutoCAD", "3D Design", "Space Planning", "Creativity"],
    roles: ["Interior Designer", "Space Planner"],
    companies: ["Urban Ladder", "Livspace", "Asian Paints"],
    colleges: ["CEPT Ahmedabad", "Pearl Academy"],
    roadmap: [
      "Design Basics",
      "AutoCAD & 3D Tools",
      "Internships",
      "Real Projects"
    ]
  },

  "animation": {
    title: "Animation & VFX",
    image: designImg,
    salary: "₹5 – 22 LPA",
    overview: "Create animated movies, games and visual effects.",
    skills: ["3D Animation", "Maya", "Blender", "VFX"],
    roles: ["Animator", "VFX Artist", "Game Designer"],
    companies: ["Disney", "Pixar", "Ubisoft", "Rockstar Games"],
    colleges: ["Arena Animation", "MAAC", "Whistling Woods"],
    roadmap: [
      "Animation Basics",
      "3D Tools",
      "Short Films",
      "Studio Job"
    ]
  },
  "product-design": {
    title: "Product Design",
    image: designImg,
    salary: "₹5 – 20 LPA",
    overview: "Design innovative physical and digital products.",
    skills: ["Design Thinking", "Prototyping", "3D Design"],
    roles: ["Product Designer", "Industrial Designer"],
    companies: ["Apple", "Samsung"],
    colleges: ["NID Ahmedabad"],
    roadmap: ["Design Basics", "Prototype Building"]
  },

},
science: {

  "physics": {
    title: "Physics",
    image: scienceImg,
    salary: "₹4 – 20 LPA",
    overview: "Physics deals with understanding nature, space, energy and matter.",
    skills: ["Mathematics", "Problem Solving", "Research", "Data Analysis"],
    roles: ["Physicist", "Research Scientist", "Data Scientist"],
    companies: ["ISRO", "DRDO", "BARC", "Infosys"],
    colleges: ["IISc Bangalore", "IIT Bombay", "IIT Madras"],
    roadmap: [
      "BSc Physics",
      "MSc Physics",
      "Research Projects",
      "PhD / Industry Job"
    ]
  },

  "chemistry": {
    title: "Chemistry",
    image: scienceImg,
    salary: "₹4 – 18 LPA",
    overview: "Chemistry focuses on chemical reactions, medicines and materials.",
    skills: ["Organic Chemistry", "Lab Research", "Analysis"],
    roles: ["Chemist", "Research Scientist", "Quality Analyst"],
    companies: ["Dr Reddy’s", "Cipla", "Biocon"],
    colleges: ["IISc Bangalore", "IIT Delhi", "IIT Kanpur"],
    roadmap: [
      "BSc Chemistry",
      "MSc Chemistry",
      "Lab Research",
      "Industry Job"
    ]
  },

  "biotech": {
    title: "Biotechnology",
    image: scienceImg,
    salary: "₹5 – 22 LPA",
    overview: "Biotech combines biology and technology for healthcare solutions.",
    skills: ["Genetics", "Molecular Biology", "Lab Research"],
    roles: ["Biotech Engineer", "Research Scientist"],
    companies: ["Biocon", "Serum Institute", "Dr Reddy’s"],
    colleges: ["IIT Delhi", "IISc Bangalore"],
    roadmap: [
      "BSc/BTech Biotech",
      "MSc/MTech",
      "Research",
      "Pharma Industry"
    ]
  },
  "mathematics": {
    title: "Mathematics",
    image: scienceImg,
    salary: "₹4 – 18 LPA",
    overview: "Study mathematical theories and applications.",
    skills: ["Mathematics", "Logic", "Statistics"],
    roles: ["Mathematician", "Data Scientist"],
    companies: ["ISRO", "DRDO"],
    colleges: ["IISc Bangalore"],
    roadmap: ["BSc Maths", "MSc Maths"]
  },
  "environmental-science": {
    title: "Environmental Science",
    image: scienceImg,
    salary: "₹4 – 15 LPA",
    overview: "Study environment protection and sustainability.",
    skills: ["Ecology", "Research", "Environmental Policy"],
    roles: ["Environmental Scientist"],
    companies: ["UN Environment", "NGOs"],
    colleges: ["TERI School"],
    roadmap: ["Environmental Degree", "Research"]
  },
},
management: {

  "bba": {
    title: "BBA (Business Administration)",
    image: managementImg,
    salary: "₹4 – 15 LPA",
    overview: "Management of business operations, marketing and finance.",
    skills: ["Leadership", "Communication", "Strategy"],
    roles: ["Business Analyst", "Manager", "Marketing Executive"],
    companies: ["Deloitte", "Amazon", "Flipkart", "TCS"],
    colleges: ["IIM Indore", "Christ University", "NMIMS"],
    roadmap: [
      "BBA Degree",
      "Internships",
      "MBA (Optional)",
      "Management Job"
    ]
  },

  "mba": {
    title: "MBA (Master of Business Administration)",
    image: managementImg,
    salary: "₹8 – 40 LPA",
    overview: "Advanced leadership, business strategy and corporate management.",
    skills: ["Leadership", "Finance", "Marketing", "Operations"],
    roles: ["Product Manager", "Consultant", "Business Head"],
    companies: ["McKinsey", "BCG", "Google", "Amazon"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "ISB"],
    roadmap: [
      "MBA Entrance",
      "MBA Degree",
      "Corporate Internships",
      "Leadership Roles"
    ]
  },

  "analytics": {
    title: "Business Analytics",
    image: managementImg,
    salary: "₹6 – 25 LPA",
    overview: "Using data for business decision making.",
    skills: ["Excel", "SQL", "Power BI", "Python"],
    roles: ["Business Analyst", "Data Analyst"],
    companies: ["Accenture", "Amazon", "Flipkart"],
    colleges: ["IIM Bangalore", "ISB"],
    roadmap: [
      "Data Basics",
      "Analytics Tools",
      "Business Projects",
      "Analytics Job"
    ]
  },
  "operations-management": {
  title: "Operations Management",
  image: managementImg,
  salary: "₹6 – 25 LPA",
  overview: "Operations Management focuses on managing business processes, supply chains, production systems and improving efficiency in organizations.",
  skills: [
    "Supply Chain Management",
    "Process Optimization",
    "Data Analysis",
    "Project Management",
    "Leadership"
  ],
  roles: [
    "Operations Manager",
    "Supply Chain Manager",
    "Process Analyst",
    "Logistics Manager"
  ],
  companies: ["Amazon", "Flipkart", "Deloitte", "Tata Group", "Reliance"],
  colleges: ["IIM Ahmedabad", "IIM Bangalore", "ISB Hyderabad"],
  roadmap: [
    "Complete BBA / Graduation",
    "Learn Operations & Supply Chain Concepts",
    "Pursue MBA in Operations (optional)",
    "Gain Industry Experience",
    "Advance to Operations Leadership Roles"
  ]
},
"marketing-management": {
  title: "Marketing Management",
  image: managementImg,
  salary: "₹5 – 28 LPA",
  overview: "Marketing Management focuses on promoting products and services, understanding customer behavior, building brand strategies and driving business growth.",
  skills: [
    "Digital Marketing",
    "Market Research",
    "Brand Management",
    "Communication",
    "Data Analysis"
  ],
  roles: [
    "Marketing Manager",
    "Brand Manager",
    "Digital Marketing Specialist",
    "Product Marketing Manager"
  ],
  companies: ["Google", "Amazon", "Unilever", "Flipkart", "Tata Group"],
  colleges: ["IIM Ahmedabad", "IIM Bangalore", "ISB Hyderabad", "NMIMS"],
  roadmap: [
    "Complete BBA / Graduation",
    "Learn Marketing Fundamentals",
    "Gain Digital Marketing Skills",
    "Pursue MBA in Marketing (optional)",
    "Work in Marketing & Brand Strategy Roles"
  ]
},
},
law: {

  "llb": {
    title: "LLB (Bachelor of Law)",
    image: lawImg,
    salary: "₹4 – 18 LPA",
    overview: "Practice law, legal consulting and judiciary services.",
    skills: ["Legal Research", "Communication", "Critical Thinking"],
    roles: ["Lawyer", "Legal Advisor", "Public Prosecutor"],
    companies: ["Law Firms", "Courts", "Corporate Legal Teams"],
    colleges: ["NLSIU Bangalore", "NALSAR", "NLU Delhi"],
    roadmap: [
      "5-Year LLB",
      "Internships",
      "Bar Council Exam",
      "Legal Practice"
    ]
  },

  "corporate-law": {
    title: "Corporate Law",
    image: lawImg,
    salary: "₹6 – 30 LPA",
    overview: "Corporate legal compliance, contracts and mergers.",
    skills: ["Corporate Law", "Contracts", "Negotiation"],
    roles: ["Corporate Lawyer", "Legal Consultant"],
    companies: ["Infosys", "Tata Group", "Reliance"],
    colleges: ["NLSIU", "NALSAR"],
    roadmap: [
      "LLB Degree",
      "Corporate Internship",
      "Law Firm Job"
    ]
  },

  "judiciary": {
    title: "Judiciary (Judge)",
    image: lawImg,
    salary: "₹8 – 25 LPA",
    overview: "Serve as a judge in district and high courts.",
    skills: ["Legal Knowledge", "Judgement", "Ethics"],
    roles: ["Judge", "Magistrate"],
    companies: ["Indian Judiciary"],
    colleges: ["Judicial Academies"],
    roadmap: [
      "LLB Degree",
      "Judicial Exam",
      "Judge Appointment"
    ]
  },
  "criminal-law": {
    title: "Criminal Law",
    image: lawImg,
    salary: "₹5 – 20 LPA",
    overview: "Focus on criminal justice and legal defense.",
    skills: ["Legal Research", "Argument Skills"],
    roles: ["Criminal Lawyer"],
    companies: ["Law Firms"],
    colleges: ["NLU Delhi"],
    roadmap: ["LLB", "Criminal Practice"]
  },
  "cyber-law": {
  title: "Cyber Law",
  image: lawImg,
  salary: "₹6 – 22 LPA",
  overview: "Handle legal issues related to cyber crimes.",
  skills: ["Cyber Security Law", "Legal Research"],
  roles: ["Cyber Lawyer"],
  companies: ["Tech Companies"],
  colleges: ["NALSAR"],
  roadmap: ["LLB", "Cyber Law Specialization"]
},
},
arts: {

  "journalism": {
    title: "Journalism",
    image: artsImg,
    salary: "₹3 – 15 LPA",
    overview: "News reporting, media, content creation and broadcasting.",
    skills: ["Communication", "Writing", "Research"],
    roles: ["Journalist", "News Anchor", "Content Writer"],
    companies: ["NDTV", "Times of India", "BBC", "CNN"],
    colleges: ["IIMC Delhi", "Asian College of Journalism"],
    roadmap: [
      "BA Journalism",
      "Media Internship",
      "Reporting Projects",
      "News Organization Job"
    ]
  },

  "psychology": {
    title: "Psychology",
    image: artsImg,
    salary: "₹4 – 20 LPA",
    overview: "Mental health, therapy and human behaviour studies.",
    skills: ["Counselling", "Listening", "Psychological Analysis"],
    roles: ["Psychologist", "Counsellor", "Therapist"],
    companies: ["Hospitals", "Schools", "Clinics"],
    colleges: ["DU", "Christ University", "TISS"],
    roadmap: [
      "BA Psychology",
      "MA Psychology",
      "Clinical Training",
      "Practice / Hospital Job"
    ]
  },

  "english": {
    title: "English Literature",
    image: artsImg,
    salary: "₹3 – 12 LPA",
    overview: "Writing, teaching, editing and content development.",
    skills: ["Writing", "Editing", "Communication"],
    roles: ["Teacher", "Editor", "Content Writer"],
    companies: ["Publishing Houses", "EdTech", "Media"],
    colleges: ["DU", "JNU", "Loyola College"],
    roadmap: [
      "BA English",
      "MA English",
      "Teaching / Content Career"
    ]
  },
  "sociology": {
  title: "Sociology",
  image: artsImg,
  salary: "₹3 – 15 LPA",
  overview: "Sociology studies human society, social behavior, cultural patterns and how communities interact and evolve.",
  skills: [
    "Research & Analysis",
    "Critical Thinking",
    "Communication",
    "Social Awareness"
  ],
  roles: [
    "Sociologist",
    "Social Researcher",
    "Policy Analyst",
    "NGO Specialist"
  ],
  companies: ["UNICEF", "NGOs", "Government Organizations"],
  colleges: ["Delhi University", "JNU", "TISS Mumbai"],
  roadmap: [
    "BA Sociology",
    "MA Sociology",
    "Research / Field Work",
    "NGO / Policy Research Career"
  ]
},
"political-science": {
  title: "Political Science",
  image: artsImg,
  salary: "₹3 – 18 LPA",
  overview: "Political Science studies government systems, political ideologies, public policies and international relations.",
  skills: [
    "Political Analysis",
    "Research",
    "Public Speaking",
    "Critical Thinking"
  ],
  roles: [
    "Political Analyst",
    "Civil Services Officer",
    "Policy Advisor",
    "Diplomat"
  ],
  companies: ["Government Organizations", "Think Tanks", "UN"],
  colleges: ["Delhi University", "JNU", "Ashoka University"],
  roadmap: [
    "BA Political Science",
    "MA Political Science",
    "Prepare for Civil Services / Policy Research",
    "Government or International Organizations"
  ]
},
},
agriculture: {

  "agritech": {
    title: "AgriTech",
    image: agricultureImg,
    salary: "₹4 – 18 LPA",
    overview: "Technology-driven farming and smart agriculture.",
    skills: ["IoT", "Data Analysis", "Agriculture Knowledge"],
    roles: ["Agri Engineer", "Farm Consultant"],
    companies: ["ITC", "Mahindra Agri", "Ninjacart"],
    colleges: ["IIT Kharagpur", "TNAU", "PAU"],
    roadmap: [
      "BSc Agriculture",
      "AgriTech Training",
      "Field Projects",
      "Agri Company Job"
    ]
  },

  "food-tech": {
    title: "Food Technology",
    image: agricultureImg,
    salary: "₹4 – 15 LPA",
    overview: "Food processing, quality and safety management.",
    skills: ["Food Chemistry", "Quality Control"],
    roles: ["Food Technologist", "Quality Analyst"],
    companies: ["Nestle", "ITC", "Britannia"],
    colleges: ["CFTRI", "IIT Kharagpur"],
    roadmap: [
      "BTech Food Tech",
      "Industry Training",
      "Food Company Job"
    ]
  },
  "horticulture": {
  title: "Horticulture",
  image: agricultureImg,
  salary: "₹3 – 12 LPA",
  overview: "Cultivation of fruits, vegetables and plants.",
  skills: ["Plant Science", "Farming"],
  roles: ["Horticulturist"],
  companies: ["Agri Companies"],
  colleges: ["TNAU"],
  roadmap: ["BSc Agriculture", "Horticulture Training"]
},
"agronomy": {
  title: "Agronomy",
  image: agricultureImg,
  salary: "₹4 – 15 LPA",
  overview: "Improve crop production and soil management.",
  skills: ["Soil Science", "Crop Science"],
  roles: ["Agronomist"],
  companies: ["AgriTech Companies"],
  colleges: ["PAU"],
  roadmap: ["Agriculture Degree", "Field Research"]
},
},
hospitality: {

  "hotel-management": {
    title: "Hotel Management",
    image: hospitalityImg,
    salary: "₹4 – 20 LPA",
    overview: "Hotel operations, tourism and luxury management.",
    skills: ["Customer Service", "Communication", "Management"],
    roles: ["Hotel Manager", "Operations Manager"],
    companies: ["Taj", "Oberoi", "Marriott"],
    colleges: ["IHM Delhi", "IHM Mumbai"],
    roadmap: [
      "Hotel Management Degree",
      "Hotel Internship",
      "Hotel Operations Job"
    ]
  },

  "tourism": {
    title: "Tourism Management",
    image: hospitalityImg,
    salary: "₹3 – 15 LPA",
    overview: "Travel, tourism and destination management.",
    skills: ["Communication", "Travel Planning"],
    roles: ["Tour Manager", "Travel Consultant"],
    companies: ["MakeMyTrip", "Thomas Cook"],
    colleges: ["IHM", "Amity"],
    roadmap: [
      "Tourism Degree",
      "Travel Internship",
      "Tourism Company Job"
    ]
  },
  "culinary-arts": {
  title: "Culinary Arts",
  image: hospitalityImg,
  salary: "₹4 – 18 LPA",
  overview: "Professional cooking and food presentation.",
  skills: ["Cooking", "Food Presentation"],
  roles: ["Chef", "Executive Chef"],
  companies: ["Taj Hotels"],
  colleges: ["IHM Delhi"],
  roadmap: ["Culinary School", "Restaurant Experience"]
},
"event-management": {
  title: "Event Management",
  image: hospitalityImg,
  salary: "₹4 – 16 LPA",
  overview: "Plan and manage events, weddings and conferences.",
  skills: ["Planning", "Communication"],
  roles: ["Event Manager"],
  companies: ["Event Companies"],
  colleges: ["Amity University"],
  roadmap: ["Event Management Degree"]
},
},
aviation: {

  "pilot": {
    title: "Commercial Pilot",
    image: aviationImg,
    salary: "₹10 – 80 LPA",
    overview: "Fly commercial aircraft for airlines.",
    skills: ["Navigation", "Decision Making", "Aviation Knowledge"],
    roles: ["Commercial Pilot"],
    companies: ["Indigo", "Air India", "Vistara"],
    colleges: ["Indira Gandhi Aviation Academy"],
    roadmap: [
      "Clear DGCA Exams",
      "Flight Training",
      "Commercial Pilot License",
      "Airline Job"
    ]
  },

  "cabin-crew": {
    title: "Cabin Crew",
    image: aviationImg,
    salary: "₹4 – 12 LPA",
    overview: "Passenger safety and in-flight services.",
    skills: ["Communication", "Customer Service"],
    roles: ["Flight Attendant", "Air Hostess"],
    companies: ["Indigo", "Air India", "Emirates"],
    colleges: ["Frankfinn", "Indigo Training"],
    roadmap: [
      "Aviation Training",
      "Airline Interview",
      "Cabin Crew Job"
    ]
  },
  "aircraft-maintenance": {
  title: "Aircraft Maintenance Engineering",
  image: aviationImg,
  salary: "₹5 – 18 LPA",
  overview: "Maintain and repair aircraft systems.",
  skills: ["Mechanical Skills", "Aircraft Systems"],
  roles: ["Aircraft Maintenance Engineer"],
  companies: ["Air India", "Indigo"],
  colleges: ["Indira Gandhi Aviation Academy"],
  roadmap: ["AME Course", "DGCA License"]
},
"airport-management": {
  title: "Airport Management",
  image: aviationImg,
  salary: "₹4 – 15 LPA",
  overview: "Manage airport operations and logistics.",
  skills: ["Management", "Communication"],
  roles: ["Airport Manager"],
  companies: ["AAI", "Airports"],
  colleges: ["Frankfinn"],
  roadmap: ["Airport Management Degree"]
},
},
// 🔥 MEDIA
  media: {
    "journalism": {
      title: "Journalism",
      image: mediaImg,
      salary: "₹3 – 15 LPA",
      overview: "News reporting, broadcasting and media writing.",
      skills: ["Communication", "Writing", "Reporting"],
      roles: ["Reporter", "Anchor", "Editor"],
      companies: ["NDTV", "TV9", "Times Group"],
      colleges: ["IIMC", "Asian College of Journalism"],
      roadmap: ["Media Degree", "Internship", "News Desk", "Field Reporting"]
    },
    "film-making": {
    title: "Film Making",
    image: mediaImg,
    salary: "₹4 – 20 LPA",
    overview: "Film direction, cinematography and movie production.",
    skills: ["Storytelling", "Camera", "Editing"],
    roles: ["Director", "Cinematographer"],
    companies: ["Netflix", "Amazon Prime"],
    colleges: ["FTII Pune", "Whistling Woods"],
    roadmap: ["Film School", "Short Films", "Industry Projects"]
  },

  "mass-communication": {
    title: "Mass Communication",
    image: mediaImg,
    salary: "₹3 – 15 LPA",
    overview: "Media, advertising and broadcasting careers.",
    skills: ["Communication", "Media Production"],
    roles: ["Anchor", "Media Manager"],
    companies: ["BBC", "NDTV"],
    colleges: ["IIMC"],
    roadmap: ["Media Degree", "Internship", "Media Career"]
  },
  "digital-media": {
  title: "Digital Media",
  image: mediaImg,
  salary: "₹4 – 18 LPA",
  overview: "Create content for social media and digital platforms.",
  skills: ["Content Creation", "SEO", "Social Media"],
  roles: ["Content Creator", "Digital Marketer"],
  companies: ["Meta", "Google"],
  colleges: ["IIMC"],
  roadmap: ["Media Degree", "Digital Marketing"]
},
"broadcasting": {
  title: "Broadcasting",
  image: mediaImg,
  salary: "₹4 – 16 LPA",
  overview: "Work in television and radio broadcasting.",
  skills: ["Presentation", "Communication"],
  roles: ["TV Anchor", "Radio Jockey"],
  companies: ["BBC", "NDTV"],
  colleges: ["Asian College of Journalism"],
  roadmap: ["Media Degree", "Broadcast Training"]
},
  },

  // 🔥 EDUCATION
  education: {
    "b-ed": {
      title: "B.Ed (Teaching)",
      image: educationImg,
      salary: "₹3 – 12 LPA",
      overview: "Teaching career in schools and colleges.",
      skills: ["Subject Knowledge", "Teaching", "Communication"],
      roles: ["Teacher", "Lecturer"],
      companies: ["CBSE Schools", "Colleges"],
      colleges: ["NCERT", "DU"],
      roadmap: ["Graduation", "B.Ed", "Teaching Practice"]
    },
    "d-ed": {
    title: "Diploma in Education (D.Ed)",
    image: educationImg,
    salary: "₹3 – 10 LPA",
    overview: "Primary school teaching career.",
    skills: ["Teaching", "Communication"],
    roles: ["Primary Teacher"],
    companies: ["Schools"],
    colleges: ["DIET Colleges"],
    roadmap: ["D.Ed Program", "Teaching Practice"]
  },

  "m-ed": {
    title: "Master of Education (M.Ed)",
    image: educationImg,
    salary: "₹4 – 15 LPA",
    overview: "Advanced teaching and education research.",
    skills: ["Teaching", "Research"],
    roles: ["Lecturer", "Education Consultant"],
    companies: ["Universities"],
    colleges: ["DU", "JNU"],
    roadmap: ["B.Ed", "M.Ed", "Academic Career"]
  },
  "special-education": {
  title: "Special Education",
  image: educationImg,
  salary: "₹3 – 12 LPA",
  overview: "Teach students with special learning needs.",
  skills: ["Teaching", "Psychology"],
  roles: ["Special Educator"],
  companies: ["Special Schools"],
  colleges: ["Rehabilitation Council of India"],
  roadmap: ["Education Degree", "Special Training"]
},
  },

  // 🔥 ARCHITECTURE
  architecture: {
    "urban-design": {
      title: "Urban Design",
      image: architectureImg,
      salary: "₹5 – 25 LPA",
      overview: "City planning, infrastructure and development.",
      skills: ["AutoCAD", "Design", "Planning"],
      roles: ["Urban Planner", "Architect"],
      companies: ["L&T", "DLF"],
      colleges: ["SPA Delhi", "CEPT"],
      roadmap: ["B.Arch", "Internship", "Urban Projects"]
    },
    "b-arch": {
    title: "Bachelor of Architecture",
    image: architectureImg,
    salary: "₹5 – 25 LPA",
    overview: "Design buildings and urban infrastructure.",
    skills: ["AutoCAD", "3D Design"],
    roles: ["Architect"],
    companies: ["L&T", "DLF"],
    colleges: ["SPA Delhi", "CEPT"],
    roadmap: ["B.Arch", "Internship", "Architecture Job"]
  },

  "landscape": {
    title: "Landscape Architecture",
    image: architectureImg,
    salary: "₹4 – 20 LPA",
    overview: "Design parks, outdoor spaces and city landscapes.",
    skills: ["Planning", "Design"],
    roles: ["Landscape Architect"],
    companies: ["Urban Development Firms"],
    colleges: ["CEPT"],
    roadmap: ["Architecture Degree", "Landscape Projects"]
  },
  "sustainable-architecture": {
  title: "Sustainable Architecture",
  image: architectureImg,
  salary: "₹5 – 22 LPA",
  overview: "Design eco-friendly buildings and smart cities.",
  skills: ["Green Design", "Energy Efficiency"],
  roles: ["Sustainable Architect"],
  companies: ["L&T", "Urban Developers"],
  colleges: ["CEPT Ahmedabad"],
  roadmap: ["B.Arch", "Sustainable Design"]
},
  },

  // 🔥 DEFENCE
  defence: {
    "army": {
      title: "Indian Army",
      image: defenceImg,
      salary: "₹6 – 20 LPA",
      overview: "Serve the nation as an Army Officer.",
      skills: ["Leadership", "Discipline", "Strategy"],
      roles: ["Lieutenant", "Captain", "Major"],
      companies: ["Indian Army"],
      colleges: ["NDA", "IMA"],
      roadmap: ["NDA/CDS", "Training", "Commission"]
    },
    "navy": {
    title: "Indian Navy",
    image: defenceImg,
    salary: "₹6 – 20 LPA",
    overview: "Serve in naval defence operations.",
    skills: ["Leadership", "Strategy"],
    roles: ["Navy Officer"],
    companies: ["Indian Navy"],
    colleges: ["NDA"],
    roadmap: ["NDA Exam", "Training", "Navy Officer"]
  },

  "air-force": {
    title: "Indian Air Force",
    image: defenceImg,
    salary: "₹6 – 25 LPA",
    overview: "Serve as pilot or officer in Air Force.",
    skills: ["Flying", "Discipline"],
    roles: ["Air Force Officer"],
    companies: ["Indian Air Force"],
    colleges: ["NDA"],
    roadmap: ["NDA/CDS", "Air Force Training"]
  },
  "coast-guard": {
  title: "Indian Coast Guard",
  image: defenceImg,
  salary: "₹6 – 18 LPA",
  overview: "Serve in the Indian Coast Guard protecting India's maritime borders, conducting rescue missions and ensuring coastal security.",
  skills: [
    "Leadership",
    "Navigation",
    "Physical Fitness",
    "Maritime Operations",
    "Discipline"
  ],
  roles: [
    "Assistant Commandant",
    "Navik (Sailor)",
    "Yantrik (Technical Staff)"
  ],
  companies: ["Indian Coast Guard"],
  colleges: ["Indian Naval Academy", "Coast Guard Training Centres"],
  roadmap: [
    "Complete 12th / Graduation",
    "Apply for Coast Guard Recruitment",
    "Clear Written Exam & Physical Tests",
    "Training at Coast Guard Academy",
    "Serve as Coast Guard Officer"
  ]
},
  }
};


export default function ExploreCourseDetails() {
  const { career, course } = useParams();
  const data = courseDetails[career]?.[course];

  if (!data) {
    return <h2 style={{ padding: "50px" }}>❌ Course not found</h2>;
  }

  return (
    <div className="course-details-page">

      {/* Hero Section */}
      <div className="course-hero">
        <img src={data.image} alt={data.title} />
        <div className="course-hero-text">
          <h1>{data.title}</h1>
          <p>{data.overview}</p>
          <span className="salary-badge">Average Salary: {data.salary}</span>
        </div>
      </div>

      {/* Overview */}
      <div className="info-card">
        <h2>Career Overview</h2>
        <p>{data.overview}</p>
      </div>

      {/* Skills & Roles */}
      <div className="info-grid">
        <div className="info-card">
          <h2>Skills Required</h2>
          <ul>
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="info-card">
          <h2>Job Roles</h2>
          <ul>
            {data.roles.map((role, i) => (
              <li key={i}>{role}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Companies */}
      <div className="info-card">
        <h2>Top Hiring Companies</h2>
        <div className="company-list">
          {data.companies.map((company, i) => (
            <span key={i} className="company-chip">{company}</span>
          ))}
        </div>
      </div>

      {/* Colleges */}
      <div className="info-card">
        <h2>Top Colleges</h2>
        <div className="college-grid">
          {data.colleges.map((college, i) => (
            <div key={i} className="college-card">🎓 {college}</div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="info-card">
        <h2>Learning Roadmap</h2>
        <ol>
          {data.roadmap.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

    </div>
  );
}
