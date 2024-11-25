"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/bentogrid/bento-grid";
import { Line, Bar, Radar } from "react-chartjs-2";
import { Trophy, PlayCircle, ChevronDown } from "lucide-react";
import { useRouter } from 'next/navigation';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown/dropdown-menu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface StudentData {
  id: number;
  name: string;
  focus: string;
  attendance: string;
  points: number;
  course: string;
}

const studentData: StudentData[] = [
  { id: 1001, name: "Giacomo Guilizzoni", focus: "92%", attendance: "96%", points: 91, course: "CSE123" },
  { id: 1002, name: "Marco Botton", focus: "85%", attendance: "88%", points: 82, course: "CSE123" },
  { id: 1003, name: "Mariah Maclachlan", focus: "87%", attendance: "93%", points: 89, course: "CSE123" },
  { id: 1004, name: "Valerie Liberty", focus: "78%", attendance: "85%", points: 80, course: "CSE123" },
  { id: 1005, name: "Emma Johnson", focus: "85%", attendance: "92%", points: 88, course: "CSE123" },
  { id: 1006, name: "Liam Smith", focus: "78%", attendance: "89%", points: 80, course: "CSE123" },
  { id: 1007, name: "Olivia Brown", focus: "90%", attendance: "96%", points: 93, course: "CSE123" },
  { id: 1008, name: "Noah Davis", focus: "82%", attendance: "85%", points: 83, course: "CSE123" },
  { id: 1009, name: "Sophia Miller", focus: "91%", attendance: "94%", points: 92, course: "CSE123" },
  { id: 1010, name: "Lucas Wilson", focus: "76%", attendance: "87%", points: 79, course: "CSE123" },
  { id: 1011, name: "Isabella Taylor", focus: "88%", attendance: "95%", points: 90, course: "CSE123" },
  { id: 1012, name: "Ethan Anderson", focus: "83%", attendance: "90%", points: 85, course: "CSE123" },
  { id: 1013, name: "Mia White", focus: "89%", attendance: "91%", points: 86, course: "CSE123" },
  { id: 1014, name: "Alexander Martinez", focus: "86%", attendance: "88%", points: 84, course: "CSE123" },
  { id: 1015, name: "Charlotte Thompson", focus: "80%", attendance: "86%", points: 81, course: "CSE123" },
];

const courses = [
  { id: "CSE123", name: "Data Structures & Algorithms" },
];



export default function Page() {
  const topTenStudents = [...studentData].sort((a, b) => b.points - a.points).slice(0, 10);

  const barData = {
    labels: studentData.map((student) => student.name),
    datasets: [{
      label: "Points Scored",
      data: studentData.map((student) => student.points),
      backgroundColor: "#4F46E5",
      borderRadius: 6,
    }],
  };

  const lineData = {
    labels: studentData.map((student) => student.name),
    datasets: [
      {
        label: "Focus %",
        data: studentData.map((student) => parseInt(student.focus)),
        borderColor: "#FF6384",
        tension: 0.3,
      },
      {
        label: "Attendance %",
        data: studentData.map((student) => parseInt(student.attendance)),
        borderColor: "#36A2EB",
        tension: 0.3,
      },
    ],
  };

  const topStudentsData = {
    labels: ['Focus', 'Attendance', 'Points', 'Overall'],
    datasets: [{
      label: 'Top Performers',
      data: [90, 95, 92, 91],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366F1',
      pointBackgroundColor: '#6366F1',
    }],
  }; 

  const router = useRouter();

  const startLecture = () => {
    router.push("/dashboard/lecture/CSE123");
  };


  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto p-4">
  <div className="flex justify-between items-center mb-8">
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, Professor</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-sm bg-white px-4 py-2 
         hover:bg-gray-50">
          Select Course <ChevronDown className="ml-2 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuLabel>Your Courses</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {courses.map((course) => (
            <DropdownMenuItem key={course.id} className="flex flex-col items-start py-2">
              <span className="font-medium">{course.id}</span>
              <span className="text-sm text-gray-500">{course.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <button 
      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-auto"
      onClick={(startLecture)}
    >
      <PlayCircle className="w-5 h-5" />
      <span>Start Lecture</span>
    </button>
  </div>
</div>

      <BentoGrid className="max-w-7xl mx-auto p-4 grid grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4">
        <BentoGridItem
          title="Student Performance Points"
          className="col-span-4 row-span-2"
          header={
            <div className="w-full h-full p-6 bg-white rounded-xl">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Student Performance Points Distribution",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: true,
                      },
                    },
                  },
                }}
              />
            </div>
          }
        />
        <BentoGridItem
          title="Focus vs Attendance Comparison"
          className="col-span-2 row-span-2"
          header={
            <div className="w-full h-full p-4 bg-white rounded-xl">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          }
        />
        <BentoGridItem
          title="Top Performers Analysis"
          className="col-span-2 row-span-2"
          header={
            <div className="w-full h-full p-4 bg-white rounded-xl">
              <Radar
                data={topStudentsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          }
        />
      </BentoGrid>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>Top 10 Students</span>
          </h2>
        </div>
        
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full bg-white table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus %</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="w-2/12 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topTenStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{student.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.focus}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.attendance}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.points}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

