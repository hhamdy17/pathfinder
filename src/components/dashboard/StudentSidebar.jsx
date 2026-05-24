import { useState } from 'react';
import { Avatar, StatusPill } from '../ui/index.jsx';

const FILTERS = [
  { k: 'all', l: 'All' },
  { k: 'action', l: 'Action' },
  { k: 'pending', l: 'Pending' },
  { k: 'enrolled', l: 'Enrolled' },
  { k: 'new', l: 'New' },
];

export default function StudentSidebar({ students, selectedId, onSelect }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="w-52 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h3 className="text-[13px] font-medium text-gray-800">Students</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Intake 2025 · {students.length} assigned</p>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-700 placeholder-gray-400 outline-none focus:border-brand-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-gray-100">
        {FILTERS.map(f => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium transition-all cursor-pointer
              ${filter === f.k
                ? 'bg-brand-50 border-brand-200 text-brand-900'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1">
        {filtered.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left px-3.5 py-2.5 border-b border-gray-50 flex items-center gap-2.5 transition-colors cursor-pointer
              ${s.id === selectedId ? 'bg-brand-50' : 'hover:bg-gray-50'}`}
          >
            <Avatar initials={s.initials} bg={s.bg} tc={s.tc} size={28} />
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[12px] font-medium text-gray-800 truncate">{s.name}</span>
                <StatusPill status={s.status} label={s.statusLabel} />
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.intake} · {s.state}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
