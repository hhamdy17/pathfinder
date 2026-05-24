// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────

export function Avatar({ initials, bg, tc, size = 32 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-mono font-medium flex-shrink-0"
      style={{ width: size, height: size, background: bg, color: tc, fontSize: size < 36 ? 10 : 13 }}
    >
      {initials}
    </div>
  );
}

const PILL_MAP = {
  action:   'bg-coral-light text-coral',
  pending:  'bg-amber-light text-amber',
  enrolled: 'bg-teal-light text-teal',
  new:      'bg-blue-50 text-blue-700',
};
export function StatusPill({ status, label }) {
  return (
    <span className={`pill text-[9px] tracking-wide font-semibold ${PILL_MAP[status] || 'bg-gray-100 text-gray-600'}`}>
      {label}
    </span>
  );
}

export function Tag({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-gray-100 text-gray-500',
    critical: 'bg-coral-light text-coral',
    ok:       'bg-teal-light text-teal',
    warn:     'bg-amber-light text-amber',
  };
  return (
    <span className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function ScorePill({ score }) {
  const color = score >= 75 ? 'bg-teal-light text-teal' : score >= 60 ? 'bg-amber-light text-amber' : 'bg-coral-light text-coral';
  return <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${color}`}>{score}%</span>;
}

export function SkillBar({ label, score }) {
  return (
    <div className="flex items-center gap-2.5 mb-2.5">
      <span className="text-[11px] text-gray-400 w-24 flex-shrink-0">{label}</span>
      <div className="skill-bar-track flex-1">
        <div className="skill-bar-fill" style={{ width: `${score}%` }} />
      </div>
      <span className="text-[10px] text-gray-400 font-mono w-6 text-right">{score}</span>
    </div>
  );
}

export function GapBar({ name, critical, current, required, delta, bridge }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[12px] font-medium text-gray-700 flex items-center gap-1.5">
          {name}
          {critical && <Tag variant="critical">critical</Tag>}
        </span>
        <span className="text-[10px] text-amber font-medium">{delta}</span>
      </div>
      <div className="relative h-1.5 bg-gray-100 rounded-full">
        <div className="absolute top-0 left-0 h-full bg-teal rounded-full transition-all duration-700"
          style={{ width: `${current}%` }} />
        <div className="absolute top-[-3px] h-[9px] w-0.5 bg-coral rounded-sm"
          style={{ left: `${required}%` }} />
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5 pl-0.5">Bridge: {bridge}</p>
    </div>
  );
}

export function Btn({ children, variant = 'ghost', onClick, className = '', disabled = false }) {
  const base = 'inline-flex items-center gap-1.5 text-[12px] font-medium rounded-lg px-3.5 py-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border';
  const styles = {
    primary: 'bg-brand-50 border-brand-200 text-brand-900 hover:bg-brand-100',
    ghost:   'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
    danger:  'bg-coral-light border-coral/30 text-coral hover:bg-coral/10',
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function MetricCard({ label, value, sub, valueColor }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3.5">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className={`text-2xl font-medium leading-none ${valueColor || 'text-gray-900'}`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
