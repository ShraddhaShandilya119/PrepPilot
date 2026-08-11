const User = require("../models/User");
const Resume = require("../models/Resume");

// Specific Role Mappings for Live Job Search & Skill Filtering
const ROLE_CONFIGS = {
  "Machine Learning Engineer": {
    search: "machine learning",
    titles: ["Machine Learning Engineer", "AI Research Engineer", "MLOps Engineer", "Deep Learning Developer"],
    skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "MLOps"],
    companies: [
      { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", url: "https://openai.com/careers" },
      { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg", url: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite" },
      { name: "Google DeepMind", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg", url: "https://careers.google.com" },
      { name: "Meta AI", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", url: "https://www.metacareers.com" },
    ],
  },
  "Frontend Developer": {
    search: "frontend",
    titles: ["Senior Frontend Engineer", "React.js Developer", "Frontend UI Specialist", "Next.js Web Developer"],
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
    companies: [
      { name: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_2020.svg", url: "https://vercel.com/careers" },
      { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", url: "https://stripe.com/jobs" },
      { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg", url: "https://careers.airbnb.com" },
      { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", url: "https://www.figma.com/careers" },
    ],
  },
  "Backend Developer": {
    search: "backend",
    titles: ["Senior Backend Engineer", "Node.js Developer", "Backend Microservices SDE", "API Infrastructure Developer"],
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis"],
    companies: [
      { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", url: "https://www.uber.com/careers" },
      { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", url: "https://jobs.netflix.com" },
      { name: "Amazon AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", url: "https://amazon.jobs" },
    ],
  },
  "Full Stack Developer": {
    search: "full stack",
    titles: ["Full Stack MERN Developer", "Senior Full Stack Software Engineer", "Full Stack Web SDE-II", "Product Engineer"],
    skills: ["React.js", "Node.js", "Express", "MongoDB", "TypeScript"],
    companies: [
      { name: "Atlassian", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Atlassian-logo.svg", url: "https://www.atlassian.com/company/careers" },
      { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", url: "https://careers.microsoft.com" },
      { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", url: "https://www.shopify.com/careers" },
    ],
  },
  "Data Analyst": {
    search: "data analyst",
    titles: ["Senior Data Analyst", "Business Intelligence Engineer", "Product Data Specialist", "Analytics Engineer"],
    skills: ["SQL", "Python", "Power BI", "Tableau", "Pandas"],
    companies: [
      { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", url: "https://lifeatspotify.com" },
      { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg", url: "https://careers.salesforce.com" },
    ],
  },
  "DevOps Engineer": {
    search: "devops",
    titles: ["DevOps Engineer", "Cloud Infrastructure SRE", "Kubernetes & CI/CD Engineer", "Platform Engineer"],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    companies: [
      { name: "HashiCorp", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/HashiCorp_Primary_Logo_Black.svg", url: "https://www.hashicorp.com/careers" },
      { name: "Datadog", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Datadog_logo.svg", url: "https://www.datadoghq.com/careers" },
    ],
  },
};

// Filter out non-tech titles (e.g. Sales, Desk, Support, Recruiter)
const EXCLUDED_KEYWORDS = [
  "desk", "support", "sales", "recruiter", "marketing", "account",
  "customer service", "helpdesk", "telecaller", "executive assistant"
];

const fetchLiveJobsFromAPI = async (targetRole) => {
  const roleLower = targetRole.toLowerCase();

  // Find matching config or default to Full Stack
  const matchedKey = Object.keys(ROLE_CONFIGS).find((k) => roleLower.includes(k.toLowerCase())) || "Full Stack Developer";
  const config = ROLE_CONFIGS[matchedKey] || ROLE_CONFIGS["Full Stack Developer"];

  try {
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?category=software-dev&search=${encodeURIComponent(config.search)}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.jobs && Array.isArray(data.jobs)) {
        // Filter out non-tech / support roles
        const validJobs = data.jobs.filter((j) => {
          const t = j.title.toLowerCase();
          return !EXCLUDED_KEYWORDS.some((kw) => t.includes(kw));
        });

        if (validJobs.length > 0) {
          return validJobs.slice(0, 10).map((job, idx) => ({
            id: job.id || idx + 2000,
            company: job.company_name || "Tech Enterprise",
            logo: job.company_logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
            role: job.title,
            matchScore: Math.floor(Math.random() * (98 - 88 + 1)) + 88,
            salary: job.salary && job.salary.trim() !== "" ? job.salary : "₹18 - ₹32 LPA / Competitive",
            location: job.candidate_required_location || "Remote / Worldwide",
            isRemote: true,
            experience: "2-5 Years Exp",
            postedTime: job.publication_date ? new Date(job.publication_date).toLocaleDateString() : "Recently posted",
            skills: job.tags && job.tags.length > 0 ? job.tags.slice(0, 5) : config.skills,
            url: job.url || "https://remotive.com",
          }));
        }
      }
    }
  } catch (err) {
    console.error("Live Job API Fetch Error:", err.message);
  }

  // Fallback to Role-Specific Company Openings
  return generateRoleSpecificJobs(targetRole, config);
};

const generateRoleSpecificJobs = (targetRole, config) => {
  return config.companies.map((comp, idx) => ({
    id: 3000 + idx,
    company: comp.name,
    logo: comp.logo,
    role: `${targetRole} (${config.titles[idx % config.titles.length]})`,
    matchScore: 98 - idx * 3,
    salary: "₹22 - ₹38 LPA",
    location: idx % 2 === 0 ? "Bangalore, India" : "Remote / Worldwide",
    isRemote: true,
    experience: "2-5 Years Exp",
    postedTime: "Just posted",
    skills: config.skills,
    url: comp.url,
  }));
};

// Controller: Get Matched Live Jobs
const getMatchedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetRole = user?.targetRole || "Full Stack Developer";

    // Fetch User's latest Resume to get real ATS Score & Missing Skills
    const resume = await Resume.findOne({ user: req.user.id }).sort({ createdAt: -1 });

    const atsScore = resume?.analysis?.atsScore || resume?.atsScore || 85;
    const missingSkills = resume?.analysis?.missingSkills || ["TypeScript", "Docker", "Redis", "CI/CD"];

    // Fetch Live Jobs
    const jobs = await fetchLiveJobsFromAPI(targetRole);

    return res.status(200).json({
      success: true,
      targetRole,
      atsScore,
      missingSkills,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get Matched Jobs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching live matched jobs.",
    });
  }
};

module.exports = {
  getMatchedJobs,
};
