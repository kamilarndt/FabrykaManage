import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Palette,
  Box,
  Eye,
  Download,
  Upload,
  Clock,
  Layers,
  Ruler
} from "lucide-react";

const Designers = () => {
  const kanbanColumns = [
    {
      title: "Do projektowania",
      color: "border-l-blue-500",
      tasks: [
        {
          id: 1,
          title: "Łazienka Hotel Kraków - Kafelki ścienne",
          project: "Hotel Kraków Centrum",
          priority: "Wysoki",
          assignee: "Anna Kowalska",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
          deadline: "2024-07-15",
          tiles: 45
        },
        {
          id: 2,
          title: "Kuchnia Dom Prywatny - Mozaika",
          project: "Dom Prywatny - Nowak",
          priority: "Średni",
          assignee: "Piotr Kowalski",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
          deadline: "2024-07-20",
          tiles: 28
        }
      ]
    },
    {
      title: "W projektowaniu",
      color: "border-l-yellow-500",
      tasks: [
        {
          id: 3,
          title: "Salon SPA - Kafelki dekoracyjne 3D",
          project: "Hotel Wellness",
          priority: "Wysoki",
          assignee: "Maria Nowak",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
          deadline: "2024-07-18",
          tiles: 67,
          progress: 60
        }
      ]
    },
    {
      title: "Weryfikacja",
      color: "border-l-orange-500",
      tasks: [
        {
          id: 4,
          title: "Apartament Luxury - Kafelki podłogowe",
          project: "Apartamenty Luxury",
          priority: "Średni",
          assignee: "Jan Wiśniewski",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
          deadline: "2024-07-14",
          tiles: 38
        }
      ]
    },
    {
      title: "Zatwierdzone",
      color: "border-l-green-500",
      tasks: [
        {
          id: 5,
          title: "Biuro Centrum - Kafelki ścienne",
          project: "Biuro Kraków",
          priority: "Niski",
          assignee: "Anna Kowalska",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
          deadline: "2024-07-12",
          tiles: 52
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Wysoki": return "text-red-500";
      case "Średni": return "text-yellow-500";
      case "Niski": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projektanci</h1>
          <p className="text-muted-foreground mt-1">Tablica Kanban projektowania kafelków i modeli 3D</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Rhino3D
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nowe Zadanie
          </Button>
        </div>
      </div>

      {/* Tools Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Narzędzia Projektowe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col h-20">
              <Box className="h-6 w-6 mb-2" />
              <span className="text-sm">Viewer 3D</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20">
              <Ruler className="h-6 w-6 mb-2" />
              <span className="text-sm">Pomiary</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20">
              <Layers className="h-6 w-6 mb-2" />
              <span className="text-sm">Kafelkowanie</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20">
              <Download className="h-6 w-6 mb-2" />
              <span className="text-sm">Eksport</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {kanbanColumns.map((column, columnIndex) => (
          <Card key={columnIndex} className={`border-l-4 ${column.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {column.title}
                <Badge variant="outline">{column.tasks.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="border border-border hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-muted-foreground">{task.project}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          <span>{task.tiles} kafelków</span>
                        </div>
                      </div>

                      {task.progress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Postęp</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{task.deadline}</span>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Podgląd
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Pobierz
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Designers;