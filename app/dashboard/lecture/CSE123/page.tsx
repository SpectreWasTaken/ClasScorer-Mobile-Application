'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, SwitchCamera } from 'lucide-react';
import { SidebarInset } from '@/components/sidebar/ui/sidebar';

interface StudentData {
  id: number;
  name: string;
  focus: string;
  attendance: string;
  points: number;
}

interface LectureStats {
  averageFocus: string;
  averageAttendance: string;
  averagePoints: number;
}

export default function Page() {
  return <LectureContent />;
}

function LectureContent() {
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>('');
  const [isCameraOn, setIsCameraOn] = useState(false);

  const [lectureStats, setLectureStats] = useState<LectureStats>({
    averageFocus: '0%',
    averageAttendance: '0%',
    averagePoints: 0
  });

  const studentData: StudentData[] = [
    { id: 1001, name: "John Doe", focus: "92%", attendance: "96%", points: 91 },
    { id: 1002, name: "Jane Smith", focus: "85%", attendance: "88%", points: 82 },
    { id: 1003, name: "Alice Johnson", focus: "78%", attendance: "92%", points: 85 },
  ];

  const topPerformers = [...studentData]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraOn(true);
        setCameraError('');
      }
    } catch (err) {
      setCameraError('Unable to access camera');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsCameraOn(false);
    }
  };

  const switchCamera = async () => {
    if (stream) {
      const currentTrack = stream.getVideoTracks()[0];
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length > 1) {
        const currentDeviceId = currentTrack.getSettings().deviceId;
        const nextDevice = videoDevices.find(device => device.deviceId !== currentDeviceId);
        
        if (nextDevice) {
          stopCamera();
          const newStream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: nextDevice.deviceId } },
            audio: false
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
            setStream(newStream);
            setIsCameraOn(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    calculateStats();
    return () => {
      stopCamera();
    };
  }, []);

  const calculateStats = () => {
    const avgFocus = studentData.reduce((acc, curr) => acc + parseInt(curr.focus), 0) / studentData.length;
    const avgAttendance = studentData.reduce((acc, curr) => acc + parseInt(curr.attendance), 0) / studentData.length;
    const avgPoints = studentData.reduce((acc, curr) => acc + curr.points, 0) / studentData.length;

    setLectureStats({
      averageFocus: `${avgFocus.toFixed(1)}%`,
      averageAttendance: `${avgAttendance.toFixed(1)}%`,
      averagePoints: Number(avgPoints.toFixed(1))
    });
  };

  const handleEndLecture = async () => {
    if (confirm('Are you sure you want to end this lecture?')) {
      setIsLoading(true);
      try {
        stopCamera();
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error ending lecture:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SidebarInset className="bg-white dark:bg-slate-950 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 shadow-md px-6 py-4 w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Lecture Session</h1>
          <p className="text-gray-500 dark:text-gray-400">Course: Data Structure • Duration: 2h 30m</p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="flex-1 min-w-0 w-max p-4 md:p-6 overflow-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Focus</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{lectureStats.averageFocus}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Attendance</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{lectureStats.averageAttendance}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Points</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{lectureStats.averagePoints}</p>
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg mb-6 relative">
              {cameraError ? (
                <div className="w-full aspect-video rounded-lg bg-gray-100 dark:bg-slate-900
                              flex items-center justify-center text-gray-500">
                  {cameraError}
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full aspect-video rounded-lg object-cover"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={isCameraOn ? stopCamera : startCamera}
                      className="p-2 rounded-full bg-gray-900/75 text-white 
                               hover:bg-gray-900/90 transition-colors"
                    >
                      {isCameraOn ? (
                        <CameraOff className="w-5 h-5" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </button>
                    {isCameraOn && (
                      <button
                        onClick={switchCamera}
                        className="p-2 rounded-full bg-gray-900/75 text-white 
                                 hover:bg-gray-900/90 transition-colors"
                      >
                        <SwitchCamera className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Student Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Focus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                    {studentData.map(student => (
                      <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{student.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{student.focus}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{student.attendance}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{student.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 flex-none border-t lg:border-t-0 lg:border-l 
                         border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg">
                <div className="p-4 border-b dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performers</h2>
                </div>
                <div className="p-4 space-y-2">
                  {topPerformers.map((student, index) => (
                    <div key={student.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {index + 1}. {student.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{student.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleEndLecture}
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition
                  ${isLoading ? 'bg-gray-400 dark:bg-gray-600' : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'}`}
              >
                {isLoading ? 'Ending...' : 'End Lecture'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </SidebarInset>
  );
}