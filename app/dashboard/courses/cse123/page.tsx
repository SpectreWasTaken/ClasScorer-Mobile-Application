"use client";

interface Student {
  id: string;
  name: string;
  focus: number;
  attendance: number;
  points: number;
}

const students: Student[] = [
  { id: "1001", name: "Giacomo Guilizzoni", focus: 92, attendance: 96, points: 91 },
  { id: "1002", name: "Marco Botton", focus: 85, attendance: 88, points: 82 },
  { id: "1003", name: "Mariah Maclachlan", focus: 87, attendance: 93, points: 89 },
  { id: "1004", name: "Valerie Liberty", focus: 78, attendance: 85, points: 80 },
  { id: "1005", name: "Emma Johnson", focus: 85, attendance: 92, points: 88 },
  { id: "1006", name: "Liam Smith", focus: 78, attendance: 89, points: 80 },
  { id: "1007", name: "Olivia Brown", focus: 90, attendance: 96, points: 93 },
  { id: "1008", name: "Noah Davis", focus: 82, attendance: 85, points: 83 },
  { id: "1009", name: "Sophia Miller", focus: 91, attendance: 94, points: 92 },
  { id: "1010", name: "Lucas Wilson", focus: 76, attendance: 87, points: 79 },
  { id: "1011", name: "Isabella Taylor", focus: 88, attendance: 95, points: 90 },
  { id: "1012", name: "Ethan Anderson", focus: 83, attendance: 90, points: 85 },
  { id: "1013", name: "Mia White", focus: 89, attendance: 91, points: 86 },
  { id: "1014", name: "Alexander Martinez", focus: 86, attendance: 88, points: 84 },
  { id: "1015", name: "Charlotte Thompson", focus: 80, attendance: 86, points: 81 }
];

export default function Page() {
  const exportToCSV = () => {
    const headers = ["ID", "Student Name", "Focus %", "Attendance %", "Points"];
    const csvData = [
      headers.join(","),
      ...students.map(student => [
        student.id,
        student.name,
        `${student.focus}`,
        `${student.attendance}`,
        student.points
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "students.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen w-full flex-col p-8">
      <div className="flex-1">
        <div className="mb-4 flex justify-end">
          <button
            onClick={exportToCSV}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export to CSV
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full bg-white table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="w-3/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus %</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{student.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.focus}%</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.attendance}%</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}