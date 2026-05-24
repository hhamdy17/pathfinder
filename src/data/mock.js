// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const ASSESSMENT_STEPS = [
  { id: 0, label: 'Personality' },
  { id: 1, label: 'Subjects' },
  { id: 2, label: 'Work Style' },
  { id: 3, label: 'Context' },
];

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1', step: 0,
    question: 'When working on a project, you prefer to:',
    options: [
      { label: 'Plan everything meticulously before starting', score: { analytical: 10, leadership: 5 } },
      { label: 'Dive in and figure things out as you go', score: { creative: 10, technical: 5 } },
      { label: 'Collaborate closely with others throughout', score: { communication: 10, leadership: 8 } },
      { label: 'Research deeply before committing to an approach', score: { analytical: 12, technical: 6 } },
    ],
  },
  {
    id: 'q2', step: 0,
    question: 'In a group setting, you most naturally:',
    options: [
      { label: 'Take charge and delegate tasks', score: { leadership: 14, communication: 6 } },
      { label: 'Support others and ensure everyone is heard', score: { communication: 12, motivation: 8 } },
      { label: 'Focus on your assigned part quietly', score: { technical: 10, analytical: 8 } },
      { label: 'Generate ideas and inspire the group', score: { creative: 14, communication: 6 } },
    ],
  },
  {
    id: 'q3', step: 1,
    question: 'Which subject do you enjoy the most?',
    options: [
      { label: 'Mathematics / Statistics', score: { analytical: 14, technical: 8 } },
      { label: 'Languages / Literature', score: { communication: 14, creative: 6 } },
      { label: 'Art / Design / Music', score: { creative: 16, motivation: 6 } },
      { label: 'Science (Biology, Chemistry, Physics)', score: { technical: 14, analytical: 8 } },
    ],
  },
  {
    id: 'q4', step: 1,
    question: 'Which subject do you find most challenging or dislike?',
    options: [
      { label: 'Mathematics / Statistics', score: { analytical: -6, technical: -4 } },
      { label: 'Languages / Literature', score: { communication: -6, creative: -4 } },
      { label: 'Art / Design', score: { creative: -8 } },
      { label: 'Science subjects', score: { technical: -6, analytical: -4 } },
    ],
  },
  {
    id: 'q5', step: 2,
    question: 'Your ideal work environment looks like:',
    options: [
      { label: 'A quiet desk with clear individual goals', score: { technical: 8, analytical: 6 } },
      { label: 'An open office with frequent team collaboration', score: { communication: 12, leadership: 6 } },
      { label: 'A creative studio with flexible hours', score: { creative: 12, motivation: 8 } },
      { label: 'Field work — labs, clinics, sites, outdoors', score: { technical: 10, motivation: 8 } },
    ],
  },
  {
    id: 'q6', step: 2,
    question: 'When making career decisions, you prioritise:',
    options: [
      { label: 'Salary and financial security', score: { analytical: 6, technical: 4 } },
      { label: 'Passion and personal fulfilment', score: { motivation: 14, creative: 6 } },
      { label: 'Social impact and helping others', score: { communication: 10, motivation: 10 } },
      { label: 'Prestige and career advancement', score: { leadership: 12, analytical: 6 } },
    ],
  },
  {
    id: 'q7', step: 3,
    question: 'What do your parents expect from your career choice?',
    options: [
      { label: 'Medicine, Law, or Engineering (specific field)', score: {} },
      { label: 'Any stable, well-paying profession', score: {} },
      { label: 'They support whatever I choose', score: { motivation: 8 } },
      { label: "I haven't discussed it with them", score: {} },
    ],
  },
  {
    id: 'q8', step: 3,
    question: 'How do you feel about taking risks in your career path?',
    options: [
      { label: 'Very comfortable — I embrace uncertainty', score: { creative: 8, motivation: 8 } },
      { label: 'Open to some risk if the upside is clear', score: { analytical: 6, motivation: 6 } },
      { label: 'Prefer a well-defined, structured path', score: { analytical: 8 } },
      { label: 'Risk makes me anxious — I need certainty', score: { technical: 6 } },
    ],
  },
];

export const CAREER_KB = [
  {
    id: 'ux-designer', title: 'UX / Product Designer',
    industry: 'Technology / Creative', salaryBand: 'RM 3,500 – 9,000/mo',
    demandLevel: 'High', growthOutlook: 'Growing rapidly with digital economy',
    required: { analytical: 60, communication: 65, creative: 80, technical: 55, leadership: 40, motivation: 70 },
    tags: ['Digital', 'Creative', 'Human-centred'],
  },
  {
    id: 'data-analyst', title: 'Data Analyst',
    industry: 'Finance / Technology', salaryBand: 'RM 4,000 – 10,000/mo',
    demandLevel: 'Very High', growthOutlook: 'Critical role across all industries',
    required: { analytical: 85, communication: 55, creative: 40, technical: 75, leadership: 45, motivation: 65 },
    tags: ['Quantitative', 'Finance', 'Tech'],
  },
  {
    id: 'software-engineer', title: 'Software Engineer',
    industry: 'Technology', salaryBand: 'RM 4,500 – 15,000/mo',
    demandLevel: 'Very High', growthOutlook: 'Highest-demand tech role in Malaysia',
    required: { analytical: 80, communication: 50, creative: 50, technical: 90, leadership: 45, motivation: 70 },
    tags: ['Technical', 'Digital', 'High salary'],
  },
  {
    id: 'marketing-strategist', title: 'Marketing Strategist',
    industry: 'Business / Media', salaryBand: 'RM 3,000 – 8,000/mo',
    demandLevel: 'Moderate', growthOutlook: 'Digital marketing growing; traditional declining',
    required: { analytical: 65, communication: 80, creative: 70, technical: 40, leadership: 60, motivation: 75 },
    tags: ['Communication', 'Business', 'Creative'],
  },
  {
    id: 'psychologist', title: 'Counselling Psychologist',
    industry: 'Healthcare / Education', salaryBand: 'RM 3,500 – 8,000/mo',
    demandLevel: 'Moderate', growthOutlook: 'Growing mental health awareness in Malaysia',
    required: { analytical: 65, communication: 85, creative: 45, technical: 35, leadership: 55, motivation: 85 },
    tags: ['Healthcare', 'People-focused', 'Social impact'],
  },
  {
    id: 'product-manager', title: 'Product Manager',
    industry: 'Technology / Business', salaryBand: 'RM 6,000 – 18,000/mo',
    demandLevel: 'High', growthOutlook: 'High demand in tech startups and scale-ups',
    required: { analytical: 75, communication: 80, creative: 65, technical: 65, leadership: 80, motivation: 80 },
    tags: ['Leadership', 'Tech', 'Business'],
  },
  {
    id: 'mechanical-engineer', title: 'Mechanical Engineer',
    industry: 'Engineering / Manufacturing', salaryBand: 'RM 3,500 – 9,000/mo',
    demandLevel: 'High', growthOutlook: 'Stable in oil & gas, automotive, manufacturing',
    required: { analytical: 80, communication: 50, creative: 55, technical: 85, leadership: 50, motivation: 65 },
    tags: ['Engineering', 'Technical', 'Manufacturing'],
  },
  {
    id: 'health-educator', title: 'Health Educator / Dietitian',
    industry: 'Healthcare / Public Health', salaryBand: 'RM 3,000 – 6,500/mo',
    demandLevel: 'Moderate', growthOutlook: 'Growing in corporate wellness and public health',
    required: { analytical: 60, communication: 80, creative: 50, technical: 50, leadership: 55, motivation: 80 },
    tags: ['Healthcare', 'Communication', 'Social impact'],
  },
];

export const STUDENTS = [
  {
    id: 1, name: 'Aisha Noor', initials: 'AN', bg: '#EEEDFE', tc: '#3C3489',
    status: 'action', statusLabel: 'Action needed',
    intake: 'SPM 2024', state: 'Selangor', sessionDate: '15 May 2025',
    fitScore: 74, gapCount: 5, gapCritical: 3, parentConflict: 'High', riskTolerance: 'Low',
    learningStyle: 'Visual · hands-on', preferredLang: 'English',
    parentExpect: 'Medicine / Law', favSubjects: 'Art, BM, Math',
    weakSubjects: 'Biology, Chemistry', pathway: 'Foundation / Diploma',
    skills: [
      { label: 'Analytical', score: 82 }, { label: 'Communication', score: 68 },
      { label: 'Creative', score: 71 }, { label: 'Technical', score: 55 },
      { label: 'Leadership', score: 44 }, { label: 'Motivation', score: 76 },
    ],
    careers: [
      { rank: 1, title: 'UX / Product Designer', tags: 'Creative · Digital', demand: 'High demand', score: 74, hi: true },
      { rank: 2, title: 'Data Analyst', tags: 'Analytics · Finance', demand: 'High demand', score: 71, hi: true },
      { rank: 3, title: 'Marketing Strategist', tags: 'Comm · Business', demand: 'Moderate', score: 63, hi: false },
      { rank: 4, title: 'Clinical Psychologist', tags: 'Parent preferred', demand: 'Low fit', score: 38, hi: false },
    ],
    gaps: [
      { name: 'Design thinking', critical: true, current: 30, required: 80, delta: '+2 levels', bridge: "Foundation in Design (Taylor's) · 1 semester" },
      { name: 'Prototyping tools', critical: true, current: 20, required: 75, delta: '+2 levels', bridge: 'Figma / Adobe XD short course · online' },
      { name: 'Research methods', critical: true, current: 50, required: 75, delta: '+1 level', bridge: 'Covered in Diploma in Communication Design' },
      { name: 'HTML / CSS basics', critical: false, current: 35, required: 60, delta: '+1 level · optional', bridge: 'freeCodeCamp · Responsive Web Design' },
    ],
    courses: [
      { name: 'Diploma in Communication Design', type: 'Diploma · 2.5 years', provider: "Taylor's University", fit: 91, tags: ['Design thinking', 'Studio work', 'Research methods'], concern: null },
      { name: 'Foundation in Arts & Design', type: 'Foundation · 1 year', provider: 'UCSI University', fit: 85, tags: ['Portfolio building', 'Colour theory', 'Typography'], concern: null },
      { name: 'BSc Business (Marketing)', type: 'Degree · 3 years', provider: 'Sunway University', fit: 58, tags: ['Marketing', 'Analytics', 'Strategy'], concern: 'Weaker creative coverage' },
    ],
    employers: [
      { name: 'Fave (Fintech)', role: 'Junior UX Designer', match: 88, location: 'Kuala Lumpur', logo: 'F' },
      { name: 'Grab Malaysia', role: 'Product Design Intern', match: 82, location: 'Kuala Lumpur', logo: 'G' },
      { name: 'Astro', role: 'Creative Associate', match: 74, location: 'Petaling Jaya', logo: 'A' },
    ],
    notes: [
      { date: '12 May 2025', author: 'Dr. Siti Rahimah', body: 'Student expressed strong interest in design but hesitant to commit due to parents. Recommended she bring the report to next family discussion.' },
      { date: '3 Apr 2025', author: 'Dr. Siti Rahimah', body: 'Initial session. Assessment completed. Student did not know UX was a career option — responded very positively to career map.' },
    ],
  },
  {
    id: 2, name: 'Rajan Kumar', initials: 'RK', bg: '#E1F5EE', tc: '#085041',
    status: 'pending', statusLabel: 'Pending session',
    intake: 'SPM 2024', state: 'Kuala Lumpur', sessionDate: 'Not scheduled',
    fitScore: 81, gapCount: 3, gapCritical: 1, parentConflict: 'Low', riskTolerance: 'High',
    learningStyle: 'Reading · structured', preferredLang: 'English / Tamil',
    parentExpect: 'Engineering / IT', favSubjects: 'Math, Physics, CS',
    weakSubjects: 'Art, History', pathway: 'Foundation / Degree',
    skills: [
      { label: 'Analytical', score: 88 }, { label: 'Communication', score: 55 },
      { label: 'Creative', score: 42 }, { label: 'Technical', score: 85 },
      { label: 'Leadership', score: 60 }, { label: 'Motivation', score: 79 },
    ],
    careers: [
      { rank: 1, title: 'Software Engineer', tags: 'Technical · IT', demand: 'Very high demand', score: 81, hi: true },
      { rank: 2, title: 'Data Scientist', tags: 'Analytics · AI', demand: 'High demand', score: 76, hi: true },
      { rank: 3, title: 'Systems Architect', tags: 'IT · Infrastructure', demand: 'High demand', score: 68, hi: false },
      { rank: 4, title: 'Cybersecurity Analyst', tags: 'IT · Security', demand: 'High demand', score: 62, hi: false },
    ],
    gaps: [
      { name: 'Cloud fundamentals', critical: true, current: 20, required: 65, delta: '+2 levels', bridge: 'AWS Cloud Practitioner · online · 3 months' },
      { name: 'Algorithms & DS', critical: false, current: 55, required: 80, delta: '+1 level', bridge: 'Covered in CS degree Year 1' },
      { name: 'Communication', critical: false, current: 35, required: 60, delta: '+1 level', bridge: 'Professional communication elective' },
    ],
    courses: [
      { name: 'BSc Computer Science', type: 'Degree · 3 years', provider: 'UM / APU', fit: 94, tags: ['Algorithms', 'Systems', 'AI electives'], concern: null },
      { name: 'Foundation in Computing', type: 'Foundation · 1 year', provider: 'APU', fit: 88, tags: ['Programming basics', 'Math', 'Networks'], concern: null },
      { name: 'Diploma in IT', type: 'Diploma · 2 years', provider: 'TARC', fit: 75, tags: ['Networking', 'Web dev', 'Databases'], concern: 'Narrower than degree path' },
    ],
    employers: [
      { name: 'Petronas Digital', role: 'Graduate Software Engineer', match: 90, location: 'Kuala Lumpur', logo: 'P' },
      { name: 'Axiata', role: 'Tech Graduate Programme', match: 84, location: 'Kuala Lumpur', logo: 'X' },
      { name: 'Fusionex', role: 'Junior Data Engineer', match: 78, location: 'Kuala Lumpur', logo: 'F' },
    ],
    notes: [
      { date: '1 May 2025', author: 'Dr. Siti Rahimah', body: 'Assessment completed online. Strong technical profile. Schedule session to discuss cloud vs pure CS path.' },
    ],
  },
  {
    id: 3, name: 'Li Wei', initials: 'LW', bg: '#FAEEDA', tc: '#633806',
    status: 'enrolled', statusLabel: 'Enrolled',
    intake: 'SPM 2023', state: 'Penang', sessionDate: 'Enrolled: Diploma IT',
    fitScore: 88, gapCount: 1, gapCritical: 0, parentConflict: 'None', riskTolerance: 'Moderate',
    learningStyle: 'Project-based', preferredLang: 'Mandarin / English',
    parentExpect: 'IT / Business', favSubjects: 'CS, Math, Economics',
    weakSubjects: 'BM, Literature', pathway: 'Diploma → Degree',
    skills: [
      { label: 'Analytical', score: 84 }, { label: 'Communication', score: 72 },
      { label: 'Creative', score: 66 }, { label: 'Technical', score: 91 },
      { label: 'Leadership', score: 58 }, { label: 'Motivation', score: 83 },
    ],
    careers: [
      { rank: 1, title: 'Full-stack Developer', tags: 'Technical · Digital', demand: 'Very high demand', score: 88, hi: true },
      { rank: 2, title: 'Product Manager', tags: 'Tech · Business', demand: 'High demand', score: 74, hi: true },
      { rank: 3, title: 'IT Consultant', tags: 'Business · Tech', demand: 'Moderate', score: 67, hi: false },
    ],
    gaps: [
      { name: 'Agile / Scrum', critical: false, current: 30, required: 55, delta: '+1 level · optional', bridge: 'Scrum fundamentals cert · Coursera' },
    ],
    courses: [
      { name: 'Diploma in Information Technology', type: 'Diploma · 2 years · Enrolled', provider: 'TARC', fit: 88, tags: ['Web dev', 'Databases', 'Networks'], concern: null },
    ],
    employers: [
      { name: 'Shopee Malaysia', role: 'Backend Intern (2026)', match: 86, location: 'Kuala Lumpur', logo: 'S' },
      { name: 'Revenue Monster', role: 'Junior Full-stack Dev', match: 80, location: 'Petaling Jaya', logo: 'R' },
    ],
    notes: [
      { date: '10 Jan 2025', author: 'Dr. Siti Rahimah', body: 'Student enrolled successfully. Monitoring progress. On track for degree articulation next year.' },
    ],
  },
  {
    id: 4, name: 'Nur Fatimah', initials: 'NF', bg: '#FAECE7', tc: '#712B13',
    status: 'action', statusLabel: 'Review needed',
    intake: 'SPM 2024', state: 'Johor', sessionDate: '20 May 2025',
    fitScore: 61, gapCount: 6, gapCritical: 4, parentConflict: 'High', riskTolerance: 'Low',
    learningStyle: 'Listening · structured', preferredLang: 'BM / English',
    parentExpect: 'Medicine', favSubjects: 'Biology, Chemistry',
    weakSubjects: 'Math, Physics', pathway: 'Matriculation / Foundation',
    skills: [
      { label: 'Analytical', score: 62 }, { label: 'Communication', score: 78 },
      { label: 'Creative', score: 55 }, { label: 'Technical', score: 40 },
      { label: 'Leadership', score: 66 }, { label: 'Motivation', score: 70 },
    ],
    careers: [
      { rank: 1, title: 'Health Educator', tags: 'Health · Comm', demand: 'Moderate demand', score: 71, hi: false },
      { rank: 2, title: 'Medical Lab Tech', tags: 'Science · Health', demand: 'High demand', score: 65, hi: false },
      { rank: 3, title: 'Pharmacist', tags: 'Science · Health', demand: 'High demand', score: 61, hi: false },
      { rank: 4, title: 'Medical Doctor', tags: 'Parent preferred', demand: 'High competition', score: 44, hi: false },
    ],
    gaps: [
      { name: 'Quantitative reasoning', critical: true, current: 40, required: 80, delta: '+3 levels', bridge: 'Additional Math tuition · pre-university' },
      { name: 'Lab techniques', critical: true, current: 25, required: 70, delta: '+2 levels', bridge: 'Covered in science foundation' },
      { name: 'Research writing', critical: true, current: 35, required: 65, delta: '+2 levels', bridge: 'Academic writing course' },
      { name: 'Clinical empathy', critical: true, current: 55, required: 80, delta: '+1 level', bridge: 'Healthcare volunteer programme' },
    ],
    courses: [
      { name: 'Foundation in Science', type: 'Foundation · 1 year', provider: 'UiTM / INTEC', fit: 78, tags: ['Biology', 'Chemistry', 'Math'], concern: null },
      { name: 'Diploma in Medical Lab Technology', type: 'Diploma · 3 years', provider: 'KPM', fit: 72, tags: ['Lab skills', 'Pathology', 'Microbiology'], concern: null },
      { name: 'MBBS', type: 'Degree · 5 years', provider: 'UM / IMU', fit: 44, tags: ['Medicine'], concern: 'Low fit score · high competition · high cost' },
    ],
    employers: [
      { name: 'KPJ Healthcare', role: 'Health Educator Trainee', match: 72, location: 'Johor Bahru', logo: 'K' },
      { name: 'Caring Pharmacy', role: 'Pharmacy Assistant', match: 65, location: 'Nationwide', logo: 'C' },
    ],
    notes: [
      { date: '8 May 2025', author: 'Dr. Siti Rahimah', body: 'Significant parent pressure for medicine. Student herself unsure. Multiple skill gaps for MBBS path. Need careful family session.' },
    ],
  },
  {
    id: 5, name: 'Daniel Mok', initials: 'DM', bg: '#E6F1FB', tc: '#0C447C',
    status: 'new', statusLabel: 'Not started',
    intake: 'SPM 2024', state: 'Selangor', sessionDate: 'Not scheduled',
    fitScore: null, gapCount: null, gapCritical: null,
    parentConflict: 'Unknown', riskTolerance: 'Unknown',
    learningStyle: 'Unknown', preferredLang: 'English / Mandarin',
    parentExpect: 'Business / Finance', favSubjects: 'Unknown',
    weakSubjects: 'Unknown', pathway: 'Unknown',
    skills: [], careers: [], gaps: [], courses: [], employers: [], notes: [],
  },
];
