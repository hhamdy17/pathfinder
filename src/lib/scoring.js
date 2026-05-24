import { CAREER_KB } from '../data/mock.js';

const SKILL_KEYS = ['analytical', 'communication', 'creative', 'technical', 'leadership', 'motivation'];
const MAX_SCORE = 100;

// Accumulate raw scores from selected answers
export function computeSkillScores(answers) {
  const raw = Object.fromEntries(SKILL_KEYS.map(k => [k, 40])); // base of 40
  answers.forEach(({ option }) => {
    Object.entries(option.score || {}).forEach(([k, v]) => {
      if (raw[k] !== undefined) raw[k] = Math.max(0, Math.min(MAX_SCORE, raw[k] + v));
    });
  });
  return SKILL_KEYS.map(k => ({ label: k.charAt(0).toUpperCase() + k.slice(1), key: k, score: raw[k] }));
}

// Compute fit % against a single career's required skill levels
function careerFitScore(skillScores, career) {
  const scoreMap = Object.fromEntries(skillScores.map(s => [s.key, s.score]));
  const weights = { analytical: 1.2, technical: 1.2, creative: 1.1, communication: 1.0, leadership: 0.8, motivation: 0.9 };
  let total = 0, max = 0;
  SKILL_KEYS.forEach(k => {
    const required = career.required[k] || 0;
    const student  = scoreMap[k] || 0;
    const w = weights[k];
    const fit = required === 0 ? 1 : Math.min(student / required, 1.2); // allow slight overperformance
    total += fit * w * required;
    max   += w * required;
  });
  return Math.round((total / max) * 100);
}

// Rank all careers by fit
export function rankCareers(skillScores) {
  return CAREER_KB
    .map(career => ({ ...career, fitScore: careerFitScore(skillScores, career) }))
    .sort((a, b) => b.fitScore - a.fitScore)
    .map((career, i) => ({ ...career, rank: i + 1 }));
}

// Compute skill gaps for a given career
export function computeGaps(skillScores, career) {
  const scoreMap = Object.fromEntries(skillScores.map(s => [s.key, s.score]));
  return SKILL_KEYS
    .filter(k => scoreMap[k] < (career.required[k] || 0))
    .map(k => ({
      key: k,
      name: k.charAt(0).toUpperCase() + k.slice(1),
      current: scoreMap[k],
      required: career.required[k],
      delta: career.required[k] - scoreMap[k],
      critical: career.required[k] - scoreMap[k] > 20,
    }))
    .sort((a, b) => b.delta - a.delta);
}
