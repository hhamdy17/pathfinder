# PathFinder — Career Assessment Platform
### Prototype v0.1

A psychometric assessment platform for Malaysian university students. Maps student skills to career outcomes and connects them with matched employers.

---

## Screens

| Route | Who sees it | What it does |
|---|---|---|
| `/` | Students | Landing page — start assessment or view counsellor demo |
| `/assessment` | Students | 8-question psychometric flow |
| `/report` | Students | AI-generated career profile, skill gaps, roadmap |
| `/dashboard` | Counsellors | Student roster, skill profiles, gap analysis, notes |

---

## Running locally

```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`

---

## Deploying to Vercel (5 minutes)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework preset: **Vite** (auto-detected)
4. Add environment variable: `VITE_ANTHROPIC_API_KEY=your_key_here`
5. Deploy → get your live URL

That's it. Zero backend required for the prototype.

---

## Enabling live AI summaries

The report page calls the Anthropic API to generate personalised career summaries.

Add your API key to a `.env` file for local dev:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Update `src/pages/ReportPage.jsx` to use:
```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
}
```

---

## Project structure

```
src/
├── pages/
│   ├── LandingPage.jsx       # Entry / home
│   ├── AssessmentPage.jsx    # Student assessment flow
│   ├── ReportPage.jsx        # AI-generated career report
│   └── DashboardPage.jsx     # Counsellor dashboard
├── components/
│   ├── ui/index.jsx          # Shared primitives
│   ├── layout/AppLayout.jsx  # Nav shell
│   └── dashboard/            # Sidebar + detail panel
├── data/mock.js              # All mock data (students, careers, questions)
└── lib/scoring.js            # Career matching + gap scoring engine
```

---

## What's in v0.2

- Analytics page (cohort trends, conversion rates)
- Employer matching portal
- PDF report export
- Real database (Supabase)
- Auth (student vs counsellor login)
