import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  UserCheck,
  FolderOpen,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  BarChart3
} from "lucide-react";

const Managers = () => {
  const managers = [
    {
      id: 1,
      name: "Jan Kowalski",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      position: "Manager Projektów Senior",
      activeProjects: 5,
      completedProjects: 23,
      efficiency: 92,
      workload: 85,
      nextDeadline: "2024-07-15",
      status: "Dostępny"
    },
    {
      id: 2,
      name: "Anna Nowak",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      position: "Manager Projektów",
      activeProjects: 3,
      completedProjects: 15,
      efficiency: 88,
      workload: 70,
      nextDeadline: "2024-07-20",
      status: "Dostępny"
    },
    {
      id: 3,
      name: "Piotr Wiśniewski",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      position: "Manager Projektów Senior",
      activeProjects: 7,
      completedProjects: 31,
      efficiency: 95,
      workload: 95,
      nextDeadline: "2024-07-12",
      status: "Przeciążony"
    },
    {
      id: 4,
      name: "Maria Zielińska",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      position: "Manager Projektów Junior",
      activeProjects: 2,
      completedProjects: 8,
      efficiency: 85,
      workload: 60,
      nextDeadline: "2024-08-01",
      status: "Dostępny"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Managerowie</h1>
          <p className="text-muted-foreground mt-1">Zarządzaj zespołem i przydzielaj projekty</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Dodaj Managera
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Łączne Projekty</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              W trakcie realizacji
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Średnia Wydajność</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">
              Zespół managerów
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Przeciążonych</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Wymaga wsparcia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dostępnych</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Może przyjąć nowe projekty
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Manager Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {managers.map((manager) => (
          <Card key={manager.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={manager.avatar} />
                  <AvatarFallback>{manager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{manager.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{manager.position}</p>
                    </div>
                    <Badge variant={
                      manager.status === "Dostępny" ? "default" :
                      manager.status === "Przeciążony" ? "destructive" : "secondary"
                    }>
                      {manager.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{manager.activeProjects}</div>
                  <p className="text-xs text-muted-foreground">Aktywne</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{manager.completedProjects}</div>
                  <p className="text-xs text-muted-foreground">Ukończone</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{manager.efficiency}%</div>
                  <p className="text-xs text-muted-foreground">Wydajność</p>
                </div>
              </div>

              {/* Workload */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Obciążenie pracą</span>
                  <span>{manager.workload}%</span>
                </div>
                <Progress value={manager.workload} />
              </div>

              {/* Next Deadline */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Najbliższy termin: {manager.nextDeadline}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Projekty
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Raporty
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Managers;