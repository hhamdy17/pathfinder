import { useNavigate } from 'react-router-dom';
import { Btn } from '../components/ui/index.jsx';

const FEATURES = [
  { icon: '🧠', title: 'Psychometric assessment', desc: '8-question evaluation covering personality, subjects, work style, and context.' },
  { icon: '🗺', title: 'Career mapping', desc: 'AI-ranked career matches scored against your actual skill profile.' },
  { icon: '📊', title: 'Gap analysis', desc: 'Skill gap identification with specific bridge course recommendations.' },
  { icon: '🏢', title: 'Employer matching', desc: 'Connect students to employers matched to their top career path and skill level.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <div className="border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">PF</span>
          </div>
          <span className="text-[15px] font-medium text-gray-800">PathFinder</span>
        </div>
        <div className="flex gap-3">
          <Btn variant="ghost" onClick={() => navigate('/dashboard')}>Counsellor dashboard</Btn>
          <Btn variant="primary" onClick={() => navigate('/assessment')}>Start assessment →</Btn>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 text-[11px] text-brand-700 font-medium mb-6">
          🎓 Built for Malaysian universities
        </div>
        <h1 className="text-[36px] font-medium text-gray-900 leading-tight mb-4">
          Find the career path<br />that actually fits you
        </h1>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-md">
          A 4-minute psychometric assessment that maps your strengths to real career outcomes — with a skills roadmap to get there.
        </p>
        <div className="flex gap-3">
          <Btn variant="primary" onClick={() => navigate('/assessment')} className="text-[13px] px-5 py-2.5">
            Start assessment →
          </Btn>
          <Btn variant="ghost" onClick={() => navigate('/dashboard')} className="text-[13px] px-5 py-2.5">
            View counsellor demo
          </Btn>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-4 gap-6 px-8 pb-12 max-w-4xl mx-auto w-full">
        {FEATURES.map((f, i) => (
          <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
            <div className="text-2xl mb-3">{f.icon}</div>
            <p className="text-[12px] font-semibold text-gray-700 mb-1">{f.title}</p>
            <p className="text-[11px] text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pb-6">
        <p className="text-[11px] text-gray-300">PathFinder · Prototype v0.1 · Built for investor & university presentation</p>
      </div>
    </div>
  );
}
