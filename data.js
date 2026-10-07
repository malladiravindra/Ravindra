// ✏️ Edit your content here. No build step: just save and refresh the page.
window.DATA = {
  // Paste your Formspree form ID here (the part after /f/). Leave empty to use a mailto: draft instead.
  formspreeId: '',

  profile: {
    name: 'Ravindra',
    fullName: 'Malladi Ravindra Babu',
    role: 'Full Stack Developer',
    tagline: 'Python · Django · React · REST APIs',
    location: 'Hyderabad, India',
    email: 'malladiravindra1@gmail.com',
    phone: '+91 93477 80954',
    github: 'https://github.com/malladiravindra',
    linkedin: 'https://linkedin.com/in/ravindra-babu-malladi',
    resume: 'Ravindra_Babu_Resume.pdf', // put the PDF next to index.html
    photo: 'photo.jpg', // put your photo next to index.html (falls back to a monogram)
    id: 'RV-0001',
    year: 2026,
    bio: 'Full Stack Developer (fresher) with internship experience and five projects built with Django REST Framework, React and Python. Skilled in REST API design, PostgreSQL schema design, JWT authentication, Razorpay payments and real-time features using WebSockets, Celery and Redis — with hands-on exposure to LLM and RAG integration.',
    quote: '“From the database to the last pixel.”',
    facts: [
      ['Based in', 'Hyderabad, India'],
      ['Studied', 'B.Tech CSE, JNTU Kakinada'],
      ['Batch', '2020 – 2024'],
      ['Interning at', 'Sria Infotech Pvt Ltd'],
      ['Focus', 'Python · Django · React'],
    ],
    targets: ['Python Developer', 'Django Developer', 'Full Stack Developer', 'Data Management Associate'],
  },

  chips: ['Python', 'Django', 'React', 'DRF', 'PostgreSQL', 'Redis', 'JWT', 'Celery'],

  // ── Skills (only what appears in the resume / repos) ──
  families: { Languages: '#1F2A5C', Frontend: '#5B4BD6', Backend: '#0F8B8D', Databases: '#C2410C', Tools: '#B45309', 'Core CS': '#BE185D' },
  // [symbol, name, family, where used, repo]
  skills: [
    ['Py', 'Python', 'Languages', 'Django, DRF and automation projects', 'Budgeting'],
    ['Js', 'JavaScript', 'Languages', 'React frontends across the full-stack projects', 'Asset-Management'],
    ['Ts', 'TypeScript', 'Languages', 'Budget platform & GrowEasy importer', 'ai_project'],
    ['Sq', 'SQL', 'Languages', 'Schema design, indexing, query tuning', 'Budgeting'],
    ['Re', 'React', 'Frontend', 'Budget platform (React 19) & chat app', 'Budgeting'],
    ['Nx', 'Next.js', 'Frontend', 'IT Asset Management frontend', 'Asset-Management'],
    ['Ag', 'AngularJS', 'Frontend', 'Listed in resume skills', null],
    ['Ht', 'HTML5', 'Frontend', 'Storefronts and static sites', 'Ecommernce'],
    ['Cs', 'CSS3', 'Frontend', 'Responsive UI', 'Ecommernce'],
    ['Tw', 'Tailwind', 'Frontend', 'Used in the React portfolio (v1)', 'portfolio'],
    ['Dj', 'Django', 'Backend', 'Core backend framework in every project', 'chat-application'],
    ['Dr', 'DRF', 'Backend', 'REST APIs with JWT & RBAC', 'Budgeting'],
    ['Fa', 'FastAPI', 'Backend', 'Listed in resume skills', null],
    ['Ch', 'Channels', 'Backend', 'WebSocket chat consumers', 'Ecommernce'],
    ['Ce', 'Celery', 'Backend', 'Offline-message email tasks', 'chat-application'],
    ['Ws', 'WebSockets', 'Backend', 'Live chat & budget tracking', 'chat-application'],
    ['Rd', 'Redis', 'Backend', 'Channels layer for WebSockets', 'chat-application'],
    ['Pg', 'PostgreSQL', 'Databases', 'Budget platform database', 'Budgeting'],
    ['My', 'MySQL', 'Databases', 'Internship CRUD optimisation', null],
    ['Sl', 'SQLite', 'Databases', 'Local development', 'appointement-project'],
    ['Gt', 'Git', 'Tools', 'Daily workflow on GitHub', null],
    ['Gh', 'GH Actions', 'Tools', 'CI/CD for the Playwright suite', 'Budgeting'],
    ['Pm', 'Postman', 'Tools', 'API testing', null],
    ['Pw', 'Playwright', 'Tools', 'E2E tests with Page Object Model', 'Budgeting'],
    ['Se', 'Selenium', 'Tools', 'Test automation (see resume)', null],
    ['Rz', 'Razorpay', 'Tools', 'Payments with signature verification', 'Ecommernce'],
    ['Ds', 'DSA', 'Core CS', 'Problem-solving foundation', null],
    ['Oo', 'OOP', 'Core CS', 'OOP-based product catalog', 'Ecommernce'],
    ['Ap', 'REST API', 'Core CS', 'Design, auth, OpenAPI', 'Asset-Management'],
    ['Au', 'Auth', 'Core CS', 'JWT, OAuth 2.0, RBAC, OTP reset', 'Asset-Management'],
    // TODO(user): resume claims a WhatsApp + RAG assistant, but no LLM/RAG code is in any public repo, so no repo link here.
    ['Ai', 'LLM / RAG', 'Core CS', 'Listed in resume (no public repo yet)', null],
  ],

  // ── Projects (all public repos). feature:true = big accordion panel ──
  // TODO(user): Budgeting, Asset-Management, ai_project and nestack blurbs come from your resume / README, not a code audit.
  // NOTE: the counter shows PUBLIC repos only. Your GitHub profile shows 13, so one is private or in an org.
  projects: [
    { id: 'Budgeting', owner: 'sriaMain', title: 'Budget Management Platform', feature: true, lang: 'TypeScript', desc: 'Decoupled budgeting platform: React 19 + TypeScript frontend, DRF backend, Kanban UI, real-time WebSocket tracking, Celery tasks, Excel/PDF export and role-based access.', stack: ['DRF', 'React 19', 'TypeScript', 'PostgreSQL', 'Celery', 'Redis'] },
    { id: 'Asset-Management', title: 'AssetFlow — IT Asset Management', feature: true, lang: 'TypeScript', desc: 'Enterprise asset platform covering assets, departments, locations, people, vendors and purchase orders, with JWT auth, OTP password reset and dashboard analytics.', stack: ['Django', 'DRF', 'Next.js', 'JWT'] },
    { id: 'chat-application', title: 'Real-Time Chat Application', feature: true, lang: 'Python', desc: 'Django Channels chat with JWT-authenticated WebSockets, phone-number registration with OTP, Celery email alerts for offline users and a Twilio SMS sender with delivery-status webhook.', stack: ['Django', 'Channels', 'Celery', 'Redis', 'Twilio'] },
    { id: 'Ecommernce', title: 'E-Commerce Store', feature: true, lang: 'HTML', desc: 'Django e-commerce store with catalogue, cart, wishlist, offers and orders; Razorpay payments with webhook signature verification, JWT and social login, role-based admin panel and a WebSocket support chat.', stack: ['Django', 'DRF', 'Razorpay', 'Channels', 'Celery', 'JWT'] },
    { id: 'ai_project', title: 'GrowEasy AI CSV CRM Importer', feature: true, lang: 'TypeScript', desc: 'SaaS tool that maps messy lead CSVs (Facebook, Google Ads, HubSpot exports) into a normalised CRM schema using semantic AI.', stack: ['TypeScript', 'AI', 'SaaS'] },
    { id: 'nestack', title: 'PDF Vectorisation Pipeline', feature: true, lang: 'HTML', desc: 'Ingests a PDF into ChromaDB embeddings and serves pure vector-similarity retrieval from a single POST /query endpoint.', stack: ['Python', 'ChromaDB', 'Embeddings'] },
    { id: 'portfolio', title: 'Developer Portfolio (v1)', lang: 'Python', live: 'https://ravindra-sable.vercel.app', desc: 'React + TypeScript + Tailwind portfolio with a Django contact-form API.', stack: ['React', 'Django'] },
    { id: 'appointement-project', title: 'Appointment Project', lang: 'Python', desc: 'Hospital appointment system: patients sign in with an OTP, pick a doctor by speciality, book a time slot and pay bills; staff manage doctors, patients and appointments.', stack: ['Django', 'React', 'SQLite'] },
    { id: 'student_register', title: 'Student Register', lang: 'Python', desc: 'School attendance app: teachers log in, manage students by class and mark per-subject attendance through a Django JSON API and a React dashboard.', stack: ['Django', 'React', 'SQLite'] },
    { id: 'asproject', title: 'Healthcare Dashboard UI', lang: 'HTML', desc: 'Static front-end for a "Tech.Care" healthcare dashboard: patient list, diagnosis history, diagnostic list and lab results.', stack: ['HTML', 'CSS', 'JavaScript'] },
    { id: 'myproject', title: 'Early Portfolio Page', lang: 'HTML', desc: 'First static personal portfolio page with a typing effect, scroll-fade animation and About, Skills, Projects and Contact sections.', stack: ['HTML', 'CSS', 'JavaScript'] },
    { id: 'malladiravindra', title: 'GitHub Profile README', lang: 'Other', desc: 'The terminal-style profile README on my GitHub page.', stack: ['Markdown', 'SVG'] },
  ],

  // ── Education & experience, strictly chronological by start date ──
  timeline: [
    { year: '2018', badge: 'Class X', title: '10th Class (SSC)', org: 'AP Model High School · Passed 2018', points: ['Completed secondary schooling.'] },
    // TODO(user): confirm "GSR & KSR Junior College" (resume) vs "Vikas Junior College" (your message). Using the resume wording for now.
    { year: '2018', badge: 'Class XII', title: 'Intermediate (MPC)', org: 'GSR & KSR Junior College · 2018 – 2020', points: ['Mathematics, Physics, Chemistry.'] },
    { year: '2020', badge: 'B.Tech', title: 'B.Tech, Computer Science & Engineering', org: 'Vikas Group of Institutions, JNTU Kakinada · 2020 – 2024', points: ['CGPA 7.2 / 10.0.', 'Foundation in DSA, OOP and databases.'] },
    { year: '2024', badge: 'Intern', title: 'Python Full Stack Developer Intern', org: 'JSpiders Training Institute, Hyderabad · Aug 2024 – Mar 2025', points: ['Built Django + React apps across 3+ modules.', 'RESTful APIs with DRF; JWT auth and RBAC.', 'Optimised PostgreSQL/MySQL queries on 500+ records.'] },
    { year: '2026', badge: 'Current', title: 'Intern, Sria Infotech Pvt Ltd', org: 'Sria Infotech Pvt Ltd · 2026 – Present', points: ['Building the IT Asset Management and Budget Management platforms.', 'Django REST APIs, React/Next.js, WebSockets, Celery, CI/CD.'] },
  ],
  // Overlaps the school years, so it lives outside the education sequence.
  // TODO(user): the IT internship (2017–18) is not on your resume — confirm the organisation name.
  training: [{ year: '2017 – 2018', title: 'IT Internship', text: 'Scored 89% in the internship exam.' }],

  counters: [
    { label: 'Projects built', value: 5, suffix: '+' },
    { label: 'Public repos', value: 'REPOS', suffix: '' }, // filled in automatically from the projects list
    { label: 'Internships', value: 3, suffix: '' },
    { label: 'Hours saved / week', value: 15, suffix: '+' },
  ],
  achievements: [
    { title: '7-month Full Stack internship', text: 'Completed at JSpiders, delivering 3+ full-stack modules end-to-end.' },
    { title: 'Five full-stack projects', text: 'Spanning payments, real-time systems, analytics and AI integration.' },
    { title: 'Automated quality pipelines', text: 'Playwright and Selenium suites with GitHub Actions CI/CD.' },
    { title: '60% less manual effort', text: 'YouTube scripting automation that saved 15+ hours per week.' },
  ],
}
