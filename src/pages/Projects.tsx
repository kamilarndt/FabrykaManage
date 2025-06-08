import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Users,
  FolderOpen,
  FileText,
  Archive,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const activeProjects = [
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

  const archivedProjects = [
    {
      id: 4,
      name: "Biuro Kraków - Kompleks A",
      description: "Projekt wykończenia biura z kafelkami ceramicznymi",
      status: "Zakończony",
      progress: 100,
      deadline: "2024-05-15",
      client: "Firma ABC Sp. z o.o.",
      manager: "Piotr Kowalczyk",
      location: "Kraków, ul. Mogilska 45",
      value: "220,000 PLN",
      team: ["Jan Nowak", "Anna Kowalska"],
      color: "bg-gray-500"
    },
    {
      id: 5,
      name: "Mieszkanie Loft - Warszawa",
      description: "Nowoczesne wykończenie loftu z unikalnymi kafelkami",
      status: "Zakończony",
      progress: 100,
      deadline: "2024-04-10",
      client: "Klient Prywatny",
      manager: "Anna Nowak",
      location: "Warszawa, ul. Praga 12",
      value: "95,000 PLN",
      team: ["Maria Zielińska"],
      color: "bg-gray-500"
    }
  ];

  const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${project.color}`} />
            <div className="flex-1">
              <CardTitle className="text-lg">{project.name}</CardTitle>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edytuj Projekt</DropdownMenuItem>
              <DropdownMenuItem>Duplikuj</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Usuń</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge variant={
          project.status === "Zakończony" ? "default" :
          project.status === "Produkcja" ? "secondary" :
          project.status === "Projektowanie" ? "outline" : "destructive"
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
            <span>Postęp</span>
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
            <span>{project.team.length} osób</span>
          </div>
        </div>

        <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member: string, i: number) => (
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
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projekty</h1>
          <p className="text-muted-foreground mt-1">Zarządzaj projektami kafelkowania</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Nowy Projekt
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj projektów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Project Boards */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Tablica Aktywnych Projektów
          </TabsTrigger>
          <TabsTrigger value="archive" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Tablica Archiwalnych Projektów
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects
              .filter(project => 
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.client.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
          </div>
          {activeProjects.length === 0 && (
            <Card className="p-12 text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Brak aktywnych projektów</h3>
              <p className="text-muted-foreground mb-4">Rozpocznij pracę tworząc pierwszy projekt</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Utwórz Projekt
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="archive" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedProjects
              .filter(project => 
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.client.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
          </div>
          {archivedProjects.length === 0 && (
            <Card className="p-12 text-center">
              <Archive className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Brak zarchiwizowanych projektów</h3>
              <p className="text-muted-foreground mb-4">Zakończone projekty pojawią się tutaj automatycznie</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;