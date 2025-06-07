import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Users,
  FolderOpen,
  FileText,
  Upload,
  Eye,
  MapPin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const projects = [
    {
      id: 1,
      name: "Łazienka Premium - Hotel Kraków",
      description: "Kompleksowy projekt łazienki hotelowej z kafelkami premium",
      status: "Produkcja",
      progress: 85,
      deadline: "2024-07-15",
      client: "Hotel Kraków Centrum",
      manager: "Jan Kowalski",
      location: "Kraków, ul. Floriańska 12",
      value: "450,000 PLN",
      team: ["Anna Kowalska", "Piotr Nowak", "Maria Zielińska"],
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Kuchnia Nowoczesna - Dom Prywatny",
      description: "Projekt nowoczesnej kuchni z mozaiką i kafelkami dekoracyjnymi",
      status: "Projektowanie",
      progress: 60,
      deadline: "2024-07-20",
      client: "Dom Prywatny - Nowak",
      manager: "Anna Nowak",
      location: "Kraków, ul. Słoneczna 15",
      value: "85,000 PLN",
      team: ["Tomasz Wiśniewski", "Łukasz Kowalski"],
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "Salon SPA - Hotel Wellness",
      description: "Luksusowy salon SPA z kafelkami 3D i elementami relaksacyjnymi",
      status: "Wycena",
      progress: 30,
      deadline: "2024-08-01",
      client: "Hotel Wellness",
      manager: "Maria Zielińska",
      location: "Zakopane, ul. Krupówki 45",
      value: "320,000 PLN",
      team: ["Jan Nowak", "Anna Kowalska"],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your projects</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${project.color}`} />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge variant={
                project.status === "Completed" ? "default" :
                project.status === "In Progress" ? "secondary" :
                project.status === "Planning" ? "outline" : "destructive"
              }>
                {project.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.team.length} members</span>
                </div>
              </div>

              {/* Team Avatars */}
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium border-2 border-background"
                    title={member}
                  >
                    {member[0]}
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium border-2 border-background">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (gdy brak projektów) */}
      {projects.length === 0 && (
        <Card className="p-12 text-center">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first project</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Projects;