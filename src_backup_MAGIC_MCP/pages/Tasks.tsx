import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Flag,
  Clock,
  CheckSquare
} from "lucide-react";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Design homepage wireframes",
      description: "Create detailed wireframes for the new homepage layout",
      status: "To Do",
      priority: "High",
      project: "Website Redesign",
      assignee: "Sarah Johnson",
      dueDate: "2024-07-10",
      completed: false
    },
    {
      id: 2,
      title: "Implement user authentication",
      description: "Set up JWT authentication system with login/logout functionality",
      status: "In Progress",
      priority: "High",
      project: "Mobile App",
      assignee: "Alex Chen",
      dueDate: "2024-07-15",
      completed: false
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Complete API documentation for all endpoints",
      status: "Done",
      priority: "Medium",
      project: "API Integration",
      assignee: "Tom Wilson",
      dueDate: "2024-07-05",
      completed: true
    },
    {
      id: 4,
      title: "Conduct user interviews",
      description: "Interview 5 target users about their pain points",
      status: "To Do",
      priority: "Medium",
      project: "User Research",
      assignee: "Maria Garcia",
      dueDate: "2024-07-20",
      completed: false
    },
    {
      id: 5,
      title: "Set up CI/CD pipeline",
      description: "Configure automated testing and deployment pipeline",
      status: "In Progress",
      priority: "Low",
      project: "Website Redesign",
      assignee: "David Kim",
      dueDate: "2024-07-25",
      completed: false
    },
    {
      id: 6,
      title: "Bug fixes for login form",
      description: "Fix validation issues on the login form",
      status: "To Do",
      priority: "High",
      project: "Mobile App",
      assignee: "Emma Davis",
      dueDate: "2024-07-08",
      completed: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "default";
      case "In Progress": return "secondary";
      case "To Do": return "outline";
      default: return "outline";
    }
  };

  const filterTasksByStatus = (status: string) => {
    if (status === "all") return tasks;
    return tasks.filter(task => task.status.toLowerCase().replace(" ", "-") === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your tasks</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Task Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="to-do">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <TaskList tasks={tasks} />
        </TabsContent>
        
        <TabsContent value="to-do" className="space-y-4 mt-6">
          <TaskList tasks={filterTasksByStatus("to-do")} />
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4 mt-6">
          <TaskList tasks={filterTasksByStatus("in-progress")} />
        </TabsContent>
        
        <TabsContent value="done" className="space-y-4 mt-6">
          <TaskList tasks={filterTasksByStatus("done")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TaskList = ({ tasks }: { tasks: any[] }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "default";
      case "In Progress": return "secondary";
      case "To Do": return "outline";
      default: return "outline";
    }
  };

  if (tasks.length === 0) {
    return (
      <Card className="p-12 text-center">
        <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No tasks found</h3>
        <p className="text-muted-foreground mb-4">Create your first task to get started</p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox 
                checked={task.completed}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                  <Badge variant={getStatusColor(task.status)} className="ml-2">
                    {task.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Flag className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                    <span>{task.priority}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{task.assignee}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {task.project}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Tasks;