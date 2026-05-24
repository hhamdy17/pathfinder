import { useState } from 'react';
import { STUDENTS } from '../data/mock.js';
import StudentSidebar from '../components/dashboard/StudentSidebar.jsx';
import StudentDetail from '../components/dashboard/StudentDetail.jsx';

export default function DashboardPage() {
  const [students, setStudents] = useState(STUDENTS);
  const [selectedId, setSelectedId] = useState(STUDENTS[0].id);

  const selected = students.find(s => s.id === selectedId);

  const handleSelect = (id) => setSelectedId(id);

  return (
    <div className="flex h-full overflow-hidden">
      <StudentSidebar
        students={students}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      <StudentDetail
        student={selected}
        students={students}
        setStudents={setStudents}
      />
    </div>
  );
}
