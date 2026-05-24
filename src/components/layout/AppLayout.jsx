import { NavLink, Outlet } from 'react-router-dom';

const NAV = [
  { to: '/dashboard', icon: '⊞', label: 'Students' },
  { to: '/analytics', icon: '▦', label: 'Analytics' },
  { to: '/employers', icon: '🏢', label: 'Employers' },
  { to: '/settings',  icon: '⚙', label: 'Settings' },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Nav rail */}
      <nav className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-1 z-10 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center mb-4">
          <span className="text-white text-xs font-bold">PF</span>
        </div>
        {NAV.map(n => (
          <NavLink
            key={n.to} to={n.to}
            className={({ isActive }) =>
              `w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all cursor-pointer
               ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`
            }
            title={n.label}
          >
            {n.icon}
          </NavLink>
        ))}
      </nav>

      {/* Page content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
