import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS, ASSESSMENT_STEPS } from '../data/mock.js';
import { computeSkillScores, rankCareers, computeGaps } from '../lib/scoring.js';
import { Btn } from '../components/ui/index.jsx';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [generating, setGenerating] = useState(false);

  const q = ASSESSMENT_QUESTIONS[qIndex];
  const currentStep = q.step;
  const progress = ((qIndex) / ASSESSMENT_QUESTIONS.length) * 100;
  const isLast = qIndex === ASSESSMENT_QUESTIONS.length - 1;

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = [...answers, { questionId: q.id, option: q.options[selected] }];
    setAnswers(newAnswers);
    setSelected(null);

    if (isLast) {
      setGenerating(true);
      // Compute scores client-side
      const skillScores = computeSkillScores(newAnswers);
      const rankedCareers = rankCareers(skillScores);
      const topCareer = rankedCareers[0];
      const gaps = computeGaps(skillScores, topCareer);

      // Store result in sessionStorage for report page
      sessionStorage.setItem('assessment_result', JSON.stringify({
        skillScores, rankedCareers, topCareer, gaps,
      }));
      setTimeout(() => navigate('/report'), 800);
    } else {
      setQIndex(qIndex + 1);
    }
  };

  if (generating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[14px] text-gray-500">Generating your career profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">PF</span>
          </div>
          <span className="text-[13px] font-medium text-gray-700">PathFinder Assessment</span>
        </div>
        <span className="text-[11px] text-gray-400">{qIndex + 1} of {ASSESSMENT_QUESTIONS.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Step labels */}
      <div className="flex justify-center gap-6 py-5">
        {ASSESSMENT_STEPS.map((step) => (
          <div key={step.id} className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all
              ${currentStep === step.id ? 'bg-brand-500 text-white' :
                currentStep > step.id ? 'bg-teal text-white' : 'bg-gray-100 text-gray-400'}`}
            >
              {currentStep > step.id ? '✓' : step.id + 1}
            </div>
            <span className={`text-[11px] font-medium ${currentStep === step.id ? 'text-brand-700' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Question card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-4 pb-12">
        <div className="w-full max-w-xl">
          <div className="card">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-3">
              {ASSESSMENT_STEPS[currentStep]?.label}
            </p>
            <h2 className="text-[17px] font-medium text-gray-900 leading-snug mb-6">{q.question}</h2>

            <div className="flex flex-col gap-2.5">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-[13px] transition-all cursor-pointer
                    ${selected === i
                      ? 'bg-brand-50 border-brand-500 text-brand-900 font-medium'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-brand-200 hover:bg-brand-50/40'
                    }`}
                >
                  <span className={`inline-block w-5 h-5 rounded-full border mr-3 flex-shrink-0 align-middle text-center text-[10px] leading-5
                    ${selected === i ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300'}`}
                  >
                    {selected === i ? '✓' : ''}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Btn
                variant="ghost"
                onClick={() => { if (qIndex > 0) { setQIndex(qIndex - 1); setSelected(null); } }}
                disabled={qIndex === 0}
              >
                ← Back
              </Btn>
              <Btn variant="primary" onClick={handleNext} disabled={selected === null}>
                {isLast ? 'Generate my report →' : 'Next →'}
              </Btn>
            </div>
          </div>

          {/* Progress note */}
          <p className="text-center text-[11px] text-gray-400 mt-4">
            Question {qIndex + 1} of {ASSESSMENT_QUESTIONS.length} · Takes about 4 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
