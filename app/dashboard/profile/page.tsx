'use client';

import { Input } from "@/components/signin/ui/input";
import { Label } from "@/components/signin/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/collapsible/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown/dropdown-menu";
import { ChevronDown, MoreVertical, Plus, Trash, Edit, Camera } from "lucide-react";
import { useState } from "react";
import { SidebarInset } from "@/components/sidebar/ui/sidebar";

type Course = {
  id: string;
  name: string;
  code: string;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Adham");
  const [lastName, setLastName] = useState("Ibrahim");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "Data Structures",
      code: "CSE123"
    }
  ]);

  const addCourse = () => {
    const newCourse = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      code: ""
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <SidebarInset className="bg-white dark:bg-slate-950 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col relative max-w-screen-xl mx-auto w-full">
        {/* Edit Profile Button */}
        {!isEditing && (
          <div className="absolute right-4 top-4 md:right-8 md:top-8 z-10">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                       bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400
                       hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-4 md:p-8 w-full h-full overflow-auto">
          <div className="flex-1 flex flex-col md:flex-row gap-8 mt-12">
            {/* Avatar Section */}
            <div className="relative group mx-auto md:mx-0 shrink-0">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 
                            flex items-center justify-center text-2xl font-semibold
                            overflow-hidden">
                <span>{firstName[0]}{lastName[0]}</span>
              </div>
              {isEditing && (
                <button className="absolute inset-0 flex items-center justify-center 
                                 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 
                                 transition-opacity cursor-pointer">
                  <div className="flex flex-col items-center text-white">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs">Change Photo</span>
                  </div>
                </button>
              )}
            </div>

            {/* Profile Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 flex flex-col space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  {isEditing ? (
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input 
                          id="firstname" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input 
                          id="lastname" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                  )}
                </div>

                {/* Description Section */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full min-h-[100px] rounded-md border border-input 
                               bg-transparent px-3 py-2 text-sm ring-offset-background 
                               placeholder:text-muted-foreground focus-visible:outline-none 
                               focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      placeholder="Write a short bio about yourself..."
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {description || "No description added yet."}
                    </p>
                  )}
                </div>

                {/* Courses Section */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-lg font-semibold">Courses</Label>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={addCourse}
                        className="flex items-center gap-2 text-sm text-blue-600 
                                 dark:text-blue-400 hover:text-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Course
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {courses.map((course) => (
                      <Collapsible 
                        key={course.id} 
                        className="border rounded-md p-3 bg-slate-50 dark:bg-slate-900/50"
                      >
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger className="flex items-center gap-2 hover:text-blue-600">
                            {isEditing && <ChevronDown className="w-4 h-4" />}
                            <span className="font-medium">
                              {course.code} - {course.name}
                            </span>
                          </CollapsibleTrigger>
                          
                          {isEditing && (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="p-1 hover:bg-slate-200 
                                                            dark:hover:bg-slate-800 rounded">
                                <MoreVertical className="w-4 h-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem 
                                  onClick={() => removeCourse(course.id)}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <Trash className="w-4 h-4 mr-2" />
                                  Remove Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        
                        {isEditing && (
                          <CollapsibleContent className="pt-4 space-y-3">
                            <Input
                              placeholder="Course Name"
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                            />
                            <Input
                              placeholder="Course Code"
                              value={course.code}
                              onChange={(e) => updateCourse(course.id, 'code', e.target.value)}
                            />
                          </CollapsibleContent>
                        )}
                      </Collapsible>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 pt-6 mt-auto">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-800 
                               hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 rounded-md bg-blue-600 text-white 
                               hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
