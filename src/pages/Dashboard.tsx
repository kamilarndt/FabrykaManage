import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  FolderOpen, 
  AlertCircle,
  Clock,
  Factory,
  Plus,
  Zap,
  Target,
  DollarSign
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Przegląd aktywnych projektów i kluczowych wskaźników</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nowy Projekt
          </Button>
          <Button variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Kolejka CNC
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne Projekty</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +3 w tym miesiącu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Średni Czas Realizacji</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 dni</div>
            <p className="text-xs text-muted-foreground">
              <Target className="h-3 w-3 inline mr-1" />
              -2 dni vs. cel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rentowność</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obciążenie Zespołów</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Średnie obciążenie działów
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktywne Projekty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Łazienka Premium - Hotel Kraków", progress: 85, status: "Produkcja", manager: "Jan Kowalski", deadline: "2024-07-15" },
              { name: "Kuchnia Nowoczesna - Dom Prywatny", progress: 60, status: "Projektowanie", manager: "Anna Nowak", deadline: "2024-07-20" },
              { name: "Łazienka Klasyczna - Apartament", progress: 100, status: "Gotowe do wysyłki", manager: "Piotr Wiśniewski", deadline: "2024-07-10" },
              { name: "Salon SPA - Hotel Wellness", progress: 30, status: "Wycena", manager: "Maria Zielińska", deadline: "2024-08-01" }
            ].map((project, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge variant={
                      project.status === "Gotowe do wysyłki" ? "default" :
                      project.status === "Produkcja" ? "secondary" : "outline"
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Manager: {project.manager}</span>
                    <span>Termin: {project.deadline}</span>
                  </div>
                  <Progress value={project.progress} className="mt-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts & Bottlenecks */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alerty i Opóźnienia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { message: "Opóźnienie w dostawie płytek", type: "urgent", time: "2 godziny temu" },
                { message: "Przeciążenie działu CNC", type: "warning", time: "4 godziny temu" },
                { message: "Brak materiału na projekt #123", type: "urgent", time: "6 godzin temu" }
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <AlertCircle className={`h-4 w-4 mt-0.5 ${alert.type === 'urgent' ? 'text-destructive' : 'text-yellow-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wydajność Działów</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Projektowanie", efficiency: 95, load: 80 },
                { name: "CNC", efficiency: 87, load: 95 },
                { name: "Produkcja", efficiency: 92, load: 88 },
                { name: "Magazyn", efficiency: 98, load: 70 }
              ].map((dept, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{dept.name}</span>
                    <span>{dept.efficiency}% wydajność</span>
                  </div>
                  <Progress value={dept.efficiency} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Obciążenie: {dept.load}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;