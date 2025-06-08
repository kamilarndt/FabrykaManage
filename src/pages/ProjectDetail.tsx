import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  FileText,
  Calculator,
  FileCheck,
  Palette,
  Package,
  Factory,
  Truck,
  Bed,
  Upload,
  Download,
  Plus
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock project data
  const project = {
    id: parseInt(id || "1"),
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
  };

  const modules = [
    {
      id: "informacje",
      name: "Informacje",
      icon: FileText,
      description: "Pliki klienta, dane kontaktowe, opis projektu"
    },
    {
      id: "wyceny",
      name: "Wyceny",
      icon: Calculator,
      description: "Kosztorysy, wersjonowanie, eksport dokumentów"
    },
    {
      id: "umowy",
      name: "UMOWY",
      icon: FileCheck,
      description: "Centralny element łączący wszystkie moduły",
      isCenter: true
    },
    {
      id: "projektowanie",
      name: "Projektowanie",
      icon: Palette,
      description: "Elementy do zaprojektowania, statusy prac"
    },
    {
      id: "materialy",
      name: "Materiały",
      icon: Package,
      description: "Lista materiałów, statusy zamówień"
    },
    {
      id: "produkcja",
      name: "Produkcja",
      icon: Factory,
      description: "Harmonogram prac, statusy realizacji"
    },
    {
      id: "logistyka",
      name: "Logistyka",
      icon: Truck,
      description: "Planowanie transportu, dokumenty przewozowe"
    },
    {
      id: "zakwaterowanie",
      name: "Zakwaterowanie",
      icon: Bed,
      description: "Rezerwacje noclegów dla zespołu"
    }
  ];

  const ModuleCard = ({ module }: { module: any }) => (
    <Card className={`hover:shadow-md transition-shadow cursor-pointer ${module.isCenter ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="text-center pb-3">
        <div className="flex justify-center mb-2">
          <div className={`p-3 rounded-full ${module.isCenter ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <module.icon className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-lg">{module.name}</CardTitle>
        {module.isCenter && (
          <Badge variant="default" className="mx-auto w-fit">Centrum zarządzania</Badge>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center">
          {module.description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-4 h-4 rounded-full ${project.color}`} />
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <Badge variant={
              project.status === "Zakończony" ? "default" :
              project.status === "Produkcja" ? "secondary" :
              project.status === "Projektowanie" ? "outline" : "destructive"
            }>
              {project.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      {/* Project Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Klient</div>
            <div className="font-medium">{project.client}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Manager</div>
            <div className="font-medium">{project.manager}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Wartość</div>
            <div className="font-medium">{project.value}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Termin</div>
            <div className="font-medium">{new Date(project.deadline).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Project Modules */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Moduły Projektu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Module Content - Placeholder for now */}
      <Tabs defaultValue="umowy" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="umowy">UMOWY</TabsTrigger>
          <TabsTrigger value="informacje">Informacje</TabsTrigger>
          <TabsTrigger value="wyceny">Wyceny</TabsTrigger>
          <TabsTrigger value="projektowanie">Projektowanie</TabsTrigger>
        </TabsList>

        <TabsContent value="umowy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                UMOWY - Centrum Zarządzania
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Centralny punkt odniesienia</h3>
                <p className="text-muted-foreground mb-4">
                  To jest główny moduł łączący wszystkie aspekty projektu
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj Umowę
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="informacje" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pliki od Klienta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Przeciągnij pliki lub kliknij aby dodać dokumentację i modele 3D
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dane Kontaktowe Klienta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Nazwa firmy</label>
                  <p className="text-muted-foreground">{project.client}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Lokalizacja</label>
                  <p className="text-muted-foreground">{project.location}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Edytuj Dane
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wyceny" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Wyceny i Kosztorysy
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nowa Wycena
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Zarządzanie Wyceną</h3>
                <p className="text-muted-foreground mb-4">
                  Twórz kosztorysy, wersjonuj zmiany i eksportuj dokumenty
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projektowanie" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Projektowanie
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nowe Zadanie
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Elementy do Zaprojektowania</h3>
                <p className="text-muted-foreground mb-4">
                  Zarządzaj zadaniami projektowymi i przypisuj je do projektantów
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;