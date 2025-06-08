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
  Activity,
  DollarSign,
  ShoppingCart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Dodaj mapę statusów do wireframe colors
const STATUS_COLORS: Record<string, string> = {
  "Do konsultacji": "#EF4444",
  "W kolejce": "#F59E0B",
  "Projektowanie": "#3B82F6",
  "CNC Queue": "#8B5CF6",
  "Wycinanie": "#EAB308",
  "Gotowe": "#10B981",
  "Produkcja": "#10B981",
  "Zakończony": "#64748B",
  "Wycena": "#F59E0B"
};

// Typy projektów
interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  deadline: string;
  client: string;
  manager: string;
  location: string;
  value: string;
  team: string[];
  color?: string;
}

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

  const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
    // Kolor statusu
    const statusColor = STATUS_COLORS[project.status] || "#64748B";
    // Deadline coloring
    const daysLeft = Math.ceil((new Date(project.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    let deadlineColor = "text-muted-foreground";
    if (daysLeft <= 2) deadlineColor = "text-red-500 font-bold";
    else if (daysLeft <= 7) deadlineColor = "text-yellow-500 font-semibold";

    return (
      <Card
        className="hover:shadow-xl hover:scale-[1.02] hover:ring-2 hover:ring-cyan-400 focus-visible:ring-4 focus-visible:ring-cyan-500 transition-all duration-200 cursor-pointer group bg-background/90 backdrop-blur-md"
        onClick={onClick}
        tabIndex={0}
        aria-label={`Projekt ${project.name}, status: ${project.status}, postęp: ${project.progress}%`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full border-2 border-white shadow"
                style={{ background: statusColor }}
                aria-label={`Status: ${project.status}`}
              />
              <div className="flex-1">
                <CardTitle className="text-lg group-hover:text-cyan-400 transition-colors">{project.name}</CardTitle>
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
          <Badge style={{ background: statusColor, color: '#fff' }} className="shadow text-xs px-2 py-1 mt-2">
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
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${project.progress}%`,
                  background: `linear-gradient(90deg, #00d4aa 0%, ${statusColor} 100%)`,
                  boxShadow: '0 0 8px 0 #00d4aa80',
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className={deadlineColor}>{new Date(project.deadline).toLocaleDateString()}</span>
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
  };

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

      {/* Dashboard KPI na górze */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne projekty</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">W toku</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zakończone projekty</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archivedProjects.length}</div>
            <p className="text-xs text-muted-foreground">Zakończone</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suma wartości</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...activeProjects, ...archivedProjects].reduce((sum, p) => sum + Number((p.value||'0').replace(/[^\d]/g, "")), 0).toLocaleString()} PLN</div>
            <p className="text-xs text-muted-foreground">Łączna wartość</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Średni postęp</CardTitle>
            <Progress className="h-2 w-16" value={activeProjects.length ? Math.round(activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length) : 0} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length ? Math.round(activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length) : 0}%</div>
            <p className="text-xs text-muted-foreground">Średni postęp</p>
          </CardContent>
        </Card>
      </div>

      {/* Szybkie akcje */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="outline"><Plus className="h-4 w-4 mr-2" />Dodaj projekt</Button>
        <Button variant="outline"><ShoppingCart className="h-4 w-4 mr-2" />Zamów brakujące materiały</Button>
      </div>

      {/* Grid projektów */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Aktywne</TabsTrigger>
          <TabsTrigger value="archived">Zarchiwizowane</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {archivedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;