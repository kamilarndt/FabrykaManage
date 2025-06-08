import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Cog,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  FileText
} from "lucide-react";

const CNC = () => {
  const kanbanColumns = [
    {
      title: "Kolejka CNC",
      color: "border-l-blue-500",
      tasks: [
        {
          id: 1,
          title: "Kafelki ścienne - Hotel Kraków",
          partNumber: "HK-001-SC",
          material: "Gres porcelanowy",
          quantity: 45,
          estimatedTime: "6h 30min",
          priority: "Wysoki",
          operator: "Nie przypisano",
          files: ["HK-001-SC.nc", "setup.pdf"]
        },
        {
          id: 2,
          title: "Mozaika kuchenna - Dom Prywatny",
          partNumber: "DP-002-MZ",
          material: "Kamień naturalny",
          quantity: 28,
          estimatedTime: "4h 15min",
          priority: "Średni",
          operator: "Nie przypisano",
          files: ["DP-002-MZ.nc"]
        }
      ]
    },
    {
      title: "W obróbce",
      color: "border-l-orange-500",
      tasks: [
        {
          id: 3,
          title: "Kafelki dekoracyjne 3D - SPA",
          partNumber: "SPA-003-3D",
          material: "Gres porcelanowy",
          quantity: 67,
          estimatedTime: "8h 45min",
          priority: "Wysoki",
          operator: "Jan Kowalski",
          operatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
          progress: 35,
          timeLeft: "5h 40min",
          startTime: "08:30",
          files: ["SPA-003-3D.nc", "quality.pdf"]
        }
      ]
    },
    {
      title: "Kontrola jakości",
      color: "border-l-yellow-500",
      tasks: [
        {
          id: 4,
          title: "Kafelki podłogowe - Apartament",
          partNumber: "AL-004-PD",
          material: "Marmur",
          quantity: 38,
          estimatedTime: "7h 20min",
          priority: "Średni",
          operator: "Anna Nowak",
          operatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
          completedTime: "7h 10min",
          qualityStatus: "W kontroli",
          files: ["AL-004-PD.nc", "quality.pdf", "report.pdf"]
        }
      ]
    },
    {
      title: "Ukończone",
      color: "border-l-green-500",
      tasks: [
        {
          id: 5,
          title: "Kafelki ścienne - Biuro",
          partNumber: "BC-005-SC",
          material: "Gres porcelanowy",
          quantity: 52,
          estimatedTime: "6h 45min",
          priority: "Niski",
          operator: "Piotr Wiśniewski",
          operatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
          completedTime: "6h 30min",
          qualityStatus: "Zatwierdzone",
          files: ["BC-005-SC.nc", "quality.pdf", "final-report.pdf"]
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "W obróbce": return <Play className="h-4 w-4 text-orange-500" />;
      case "W kontroli": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Zatwierdzone": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Pause className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CNC</h1>
          <p className="text-muted-foreground mt-1">Zarządzanie kolejką obróbki CNC i kontrolą jakości</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Ustawienia CNC
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Dodaj do kolejki
          </Button>
        </div>
      </div>

      {/* Machine Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5" />
            Status Maszyn CNC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "CNC-01", status: "Aktywna", utilization: 85, currentJob: "SPA-003-3D" },
              { name: "CNC-02", status: "Gotowa", utilization: 0, currentJob: "Bezczynna" },
              { name: "CNC-03", status: "Konserwacja", utilization: 0, currentJob: "Serwis techniczny" }
            ].map((machine, i) => (
              <Card key={i} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{machine.name}</h3>
                    <Badge variant={
                      machine.status === "Aktywna" ? "default" :
                      machine.status === "Gotowa" ? "secondary" : "destructive"
                    }>
                      {machine.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{machine.currentJob}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Wykorzystanie</span>
                      <span>{machine.utilization}%</span>
                    </div>
                    <Progress value={machine.utilization} />
                  </div>
                </CardContent>
              </Card>
            ))}
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
                        <p className="text-xs text-muted-foreground font-mono">{task.partNumber}</p>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Materiał:</span>
                          <span>{task.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ilość:</span>
                          <span>{task.quantity} szt.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Czas:</span>
                          <span>{task.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {task.qualityStatus && (
                          <div className="flex items-center gap-1">
                            {getStatusIcon(task.qualityStatus)}
                            <span className="text-xs">{task.qualityStatus}</span>
                          </div>
                        )}
                      </div>

                      {task.progress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Postęp</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Pozostało: {task.timeLeft}</span>
                            <span>Start: {task.startTime}</span>
                          </div>
                        </div>
                      )}

                      {task.operator && task.operator !== "Nie przypisano" && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.operatorAvatar} />
                            <AvatarFallback className="text-xs">
                              {task.operator.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{task.operator}</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Pliki:</div>
                        <div className="flex flex-wrap gap-1">
                          {task.files.map((file, index) => (
                            <Button key={index} variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {file}
                            </Button>
                          ))}
                        </div>
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

export default CNC;