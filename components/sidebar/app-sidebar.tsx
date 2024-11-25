import { useRouter } from "next/navigation";
import {
  Home,
  Settings,
  Book,
  ChevronDown,
  LogOut,
  Plus,
  MoreVertical,
  Trash,
  User,
} from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/collapsible/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarHeader,
} from "@/components/sidebar/ui/sidebar";

import Link from 'next/link';

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const courses = [
  {
    name: "CSE123: Data Structures",
    url: "/dashboard/courses/cse123",
    icon: Book,
  },
];

export function AppSidebar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleAddCourse = () => {
    console.log("Adding new course");
  };

  const handleDeleteCourse = (courseName: string) => {
    console.log(`Deleting course: ${courseName}`);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          ClasScorer
        </h1>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Courses */}
        <SidebarGroup>
          <SidebarGroupLabel>Courses</SidebarGroupLabel>
          <SidebarGroupAction title="Add Course" onClick={handleAddCourse}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Course</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <SidebarMenuItem key={course.name}>
                  <SidebarMenuButton asChild>
                    <a href={course.url}>
                      <course.icon className="h-4 w-4" />
                      <span>{course.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex h-5 w-5 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                          <MoreVertical className="h-4 w-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCourse(course.name)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete Course</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                Help
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/help/documentation">Documentation</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/help/support">Support</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <div className="flex flex-1 items-center gap-2">
                <span>Adham Ibrahim</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
            <Link href="/dashboard/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}