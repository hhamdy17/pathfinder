import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillBar, GapBar, ScorePill, Btn, Tag } from '../components/ui/index.jsx';

export default function ReportPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [tab, setTab] = useState('Overview');

  useEffect(() => {
    const raw = sessionStorage.getItem('assessment_result');
    if (!raw) { navigate('/assessment'); return; }
    const parsed = JSON.parse(raw);
    setResult(parsed);
    generateAISummary(parsed);
  }, []);

  const generateAISummary = async (data) => {
    setLoadingAI(true);
    try {
      const skillList = data.skillScores.map(s => `${s.label}: ${s.score}/100`).join(', ');
      const topCareers = data.rankedCareers.slice(0, 3).map(c => `${c.title} (${c.fitScore}% fit)`).join(', ');
      const gapList = data.gaps.slice(0, 3).map(g => g.name).join(', ');

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a career counsellor writing a personalised summary for a Malaysian university student.

Student skill scores: ${skillList}
Top career matches: ${topCareers}
Key skill gaps to bridge: ${gapList}

Write a warm, honest, 3-paragraph career profile summary:
1. What this student's strengths say about them (be specific, not generic)
2. Why their top career match suits them and what to expect
3. A realistic, encouraging roadmap note about bridging gaps

Keep it under 200 words. Write for the student directly (use "you/your"). No bullet points.`,
          }],
        }),
      });
      const json = await res.json();
      setAiSummary(json.content?.[0]?.text || 'Summary generation failed — check API key.');
    } catch (e) {
      setAiSummary('AI summary unavailable in this environment. Add your Anthropic API key to enable live generation.');
    }
    setLoadingAI(false);
  };

  if (!result) return null;

  const { skillScores, rankedCareers, topCareer, gaps } = result;
  const TABS = ['Overview', 'Career Map', 'Skill Gaps', 'Roadmap'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">PF</span>
          </div>
          <span className="text-[13px] font-medium text-gray-700">Your Career Profile</span>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={() => navigate('/assessment')}>Retake assessment</Btn>
          <Btn variant="primary">Download PDF</Btn>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="card mb-4 bg-gradient-to-br from-brand-50 to-white border-brand-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-brand-700 uppercase tracking-widest font-semibold mb-1">Your top career match</p>
              <h1 className="text-[22px] font-medium text-gray-900">{topCareer.title}</h1>
              <p className="text-[12px] text-gray-500 mt-1">{topCareer.industry} · {topCareer.salaryBand}</p>
            </div>
            <div className="text-right">
              <div className="text-[32px] font-medium text-brand-700">{topCareer.fitScore}<span className="text-[16px]">%</span></div>
              <p className="text-[10px] text-gray-400">fit score</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {topCareer.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
            <Tag variant="ok">{topCareer.demandLevel} demand</Tag>
          </div>
        </div>

        {/* AI Summary */}
        <div className="card mb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Career Profile Summary</p>
          {loadingAI ? (
            <div className="flex items-center gap-2.5 text-[12px] text-gray-400 py-2">
              <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
              Generating your personalised summary…
            </div>
          ) : (
            <p className="text-[13px] text-gray-700 leading-relaxed">{aiSummary}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-4">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[11px] font-medium px-4 py-1.5 rounded-lg transition-all cursor-pointer
                ${tab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === 'Overview' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Your Skill Profile</p>
              {skillScores.map((s, i) => <SkillBar key={i} {...s} />)}
            </div>
            <div className="card">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Career Matches</p>
              {rankedCareers.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] text-gray-400 font-mono w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-800 truncate">{c.title}</p>
                    <p className="text-[10px] text-gray-400">{c.industry}</p>
                  </div>
                  <ScorePill score={c.fitScore} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Map tab */}
        {tab === 'Career Map' && (
          <div className="flex flex-col gap-3">
            {rankedCareers.slice(0, 6).map((c, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-gray-400">#{i + 1}</span>
                      <h3 className="text-[14px] font-medium text-gray-800">{c.title}</h3>
                    </div>
                    <p className="text-[11px] text-gray-400">{c.industry} · {c.salaryBand}</p>
                    <p className="text-[11px] text-gray-500 mt-1.5">{c.growthOutlook}</p>
                  </div>
                  <ScorePill score={c.fitScore} />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.tags.map((t, j) => <Tag key={j}>{t}</Tag>)}
                  <Tag variant={c.demandLevel === 'Very High' || c.demandLevel === 'High' ? 'ok' : 'warn'}>
                    {c.demandLevel} demand
                  </Tag>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skill Gaps tab */}
        {tab === 'Skill Gaps' && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                Gaps to bridge · {topCareer.title}
              </p>
              <div className="flex items-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <div className="w-5 h-1.5 bg-teal rounded-full" /> Your level
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-0.5 h-3.5 bg-coral rounded-sm" /> Required
                </span>
              </div>
            </div>
            {gaps.length === 0
              ? <p className="text-[13px] text-gray-400 text-center py-6">No skill gaps for this career path. 🎉</p>
              : gaps.map((g, i) => (
                  <GapBar
                    key={i}
                    name={g.name}
                    critical={g.critical}
                    current={g.current}
                    required={g.required}
                    delta={`+${g.delta} pts needed`}
                    bridge="See roadmap for specific courses"
                  />
                ))
            }
          </div>
        )}

        {/* Roadmap tab */}
        {tab === 'Roadmap' && (
          <div className="flex flex-col gap-3">
            <div className="card border-l-4 border-l-brand-500">
              <p className="text-[11px] font-semibold text-brand-700 uppercase tracking-widest mb-1">Immediate · 0–3 months</p>
              <p className="text-[13px] text-gray-700">Confirm pathway type (Foundation / Diploma / STPM) based on your SPM results and target university requirements.</p>
            </div>
            <div className="card border-l-4 border-l-teal">
              <p className="text-[11px] font-semibold text-teal uppercase tracking-widest mb-1">Short term · 3–12 months</p>
              <p className="text-[13px] text-gray-700">
                Bridge critical skill gaps: {gaps.filter(g => g.critical).map(g => g.name).join(', ') || 'None identified'}.
                Enrol in your top recommended course cluster.
              </p>
            </div>
            <div className="card border-l-4 border-l-amber">
              <p className="text-[11px] font-semibold text-amber uppercase tracking-widest mb-1">Medium term · 1–3 years</p>
              <p className="text-[13px] text-gray-700">
                Complete your diploma or foundation, build a portfolio or project record relevant to {topCareer.title}.
                Target internships in {topCareer.industry}.
              </p>
            </div>
            <div className="card border-l-4 border-l-coral">
              <p className="text-[11px] font-semibold text-coral uppercase tracking-widest mb-1">Long term · 3–5 years</p>
              <p className="text-[13px] text-gray-700">
                Degree completion and entry-level placement. Target salary band: {topCareer.salaryBand}.
                Demand outlook: {topCareer.growthOutlook}.
              </p>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 card bg-brand-50 border-brand-100 text-center">
          <p className="text-[13px] font-medium text-brand-900 mb-1">Share with your counsellor</p>
          <p className="text-[11px] text-brand-700 mb-4">Your counsellor can view this report, add notes, and help you plan your next steps.</p>
          <Btn variant="primary">Email report to counsellor</Btn>
        </div>
      </div>
    </div>
  );
}
