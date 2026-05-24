import { useState } from 'react';
import { Avatar, StatusPill, SkillBar, GapBar, ScorePill, MetricCard, Btn, Tag } from '../ui/index.jsx';

const TABS = ['Overview', 'Skill Gaps', 'Courses', 'Employers', 'Notes'];

function TopBar({ student }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Avatar initials={student.initials} bg={student.bg} tc={student.tc} size={38} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-gray-900">{student.name}</span>
            <StatusPill status={student.status} label={student.statusLabel} />
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">{student.intake} · {student.state} · {student.sessionDate}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Btn variant="ghost">📄 Parent letter</Btn>
        <Btn variant="primary">💬 Session prep</Btn>
      </div>
    </div>
  );
}

function MetricsRow({ student }) {
  const conflictColor =
    student.parentConflict === 'High' ? 'text-coral' :
    student.parentConflict === 'None' ? 'text-teal' : 'text-gray-900';
  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard label="Top career fit" value={`${student.fitScore}%`} sub={student.careers[0]?.title || '—'} />
      <MetricCard label="Skill gaps" value={student.gapCount} sub={`${student.gapCritical} critical`} />
      <MetricCard label="Parent conflict" value={student.parentConflict} sub={student.parentExpect} valueColor={conflictColor} />
      <MetricCard label="Risk tolerance" value={student.riskTolerance} sub={student.learningStyle} />
    </div>
  );
}

function Overview({ student }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Skill profile */}
      <div className="card">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Skill Profile</p>
        {student.skills.map((s, i) => <SkillBar key={i} {...s} />)}
      </div>

      {/* Career matches */}
      <div className="card">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Career Matches</p>
        {student.careers.map((c, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
            <span className="text-[10px] text-gray-400 font-mono w-4">{c.rank}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-gray-800 truncate">{c.title}</p>
              <p className="text-[10px] text-gray-400">{c.tags} · {c.demand}</p>
            </div>
            <ScorePill score={c.score} />
          </div>
        ))}
      </div>

      {/* Context snapshot */}
      <div className="card col-span-2">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Context Snapshot</p>
        <div className="grid grid-cols-4 gap-x-6 gap-y-2">
          {[
            ['Learning style', student.learningStyle],
            ['Preferred language', student.preferredLang],
            ['Parent expectation', student.parentExpect],
            ['Risk tolerance', student.riskTolerance],
            ['Fav. subjects', student.favSubjects],
            ['Weak subjects', student.weakSubjects],
            ['Pathway type', student.pathway],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <span className="text-[10px] text-gray-400">{k}</span>
              <span className="text-[12px] font-medium text-gray-700 mt-0.5">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillGaps({ student }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          Gap Analysis · {student.careers[0]?.title || '—'} path
        </p>
        <div className="flex items-center gap-4 text-[10px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <div className="w-5 h-1.5 bg-teal rounded-full" /> Current
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-0.5 h-3.5 bg-coral rounded-sm" /> Required
          </span>
        </div>
      </div>
      {student.gaps.length === 0
        ? <p className="text-[13px] text-gray-400 text-center py-8">No skill gaps identified.</p>
        : student.gaps.map((g, i) => <GapBar key={i} {...g} />)
      }
    </div>
  );
}

function Courses({ student }) {
  return (
    <div className="flex flex-col gap-3">
      {student.courses.map((c, i) => {
        const fitColor = c.fit >= 80 ? 'bg-teal-light text-teal' : c.fit >= 60 ? 'bg-amber-light text-amber' : 'bg-coral-light text-coral';
        return (
          <div key={i} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-800">{c.name}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{c.type} · {c.provider}</p>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${fitColor}`}>{c.fit}% fit</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {c.tags.map((t, j) => <Tag key={j}>{t}</Tag>)}
            </div>
            {c.concern && (
              <p className="text-[11px] text-coral mt-2.5 flex items-center gap-1">
                ⚠ {c.concern}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Employers({ student }) {
  if (!student.employers?.length) {
    return (
      <div className="card text-center py-10">
        <p className="text-[13px] text-gray-400">No employer matches yet — complete skill gap bridging first.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {student.employers.map((e, i) => (
        <div key={i} className="card flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center text-[13px] font-bold flex-shrink-0">
            {e.logo}
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium text-gray-800">{e.name}</p>
            <p className="text-[11px] text-gray-400">{e.role} · {e.location}</p>
          </div>
          <ScorePill score={e.match} />
        </div>
      ))}
    </div>
  );
}

function Notes({ student, students, setStudents }) {
  const [text, setText] = useState('');

  const save = () => {
    if (!text.trim()) return;
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setStudents(prev => prev.map(s =>
      s.id === student.id
        ? { ...s, notes: [{ date: today, author: 'Dr. Siti Rahimah', body: text }, ...s.notes] }
        : s
    ));
    setText('');
  };

  return (
    <div className="card">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Session Notes</p>
      <div className="mb-4 divide-y divide-gray-50">
        {student.notes.length === 0
          ? <p className="text-[12px] text-gray-400 py-4">No notes yet.</p>
          : student.notes.map((n, i) => (
              <div key={i} className="py-3">
                <p className="text-[10px] text-gray-400 font-mono mb-1">{n.date} · {n.author}</p>
                <p className="text-[12px] text-gray-600 leading-relaxed">{n.body}</p>
              </div>
            ))
        }
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a note from today's session…"
        rows={3}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 placeholder-gray-400 outline-none focus:border-brand-500 resize-none leading-relaxed"
      />
      <div className="flex justify-end mt-2">
        <Btn variant="primary" onClick={save} disabled={!text.trim()}>Save note</Btn>
      </div>
    </div>
  );
}

export default function StudentDetail({ student, students, setStudents }) {
  const [tab, setTab] = useState('Overview');

  if (!student) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Select a student to begin
      </div>
    );
  }

  const isNew = student.status === 'new';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar student={student} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {isNew ? (
          <div className="card text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-[14px] font-medium text-gray-700 mb-2">Assessment not started</p>
            <p className="text-[12px] text-gray-400 mb-5">Send the student the assessment link to begin their profile.</p>
            <Btn variant="primary">Send assessment link →</Btn>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <MetricsRow student={student} />

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
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

            {tab === 'Overview'    && <Overview student={student} />}
            {tab === 'Skill Gaps' && <SkillGaps student={student} />}
            {tab === 'Courses'    && <Courses student={student} />}
            {tab === 'Employers'  && <Employers student={student} />}
            {tab === 'Notes'      && <Notes student={student} students={students} setStudents={setStudents} />}
          </div>
        )}
      </div>
    </div>
  );
}
