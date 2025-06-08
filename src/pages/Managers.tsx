import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  DollarSign,
  Handshake,
  Brush,
  Package,
  Factory,
  Truck,
  Hotel,
  ArrowLeft,
  Upload,
  Mail,
  Phone,
  Building,
  Plus,
  Copy,
  FileDown,
  Link,
  History,
  MessageCircleMore,
  User,
  Calendar,
  Paperclip,
  ShoppingCart,
  Clock
} from "lucide-react";

const activeProjects = [
  {
    id: 1,
    name: "Projekt Willa Morska",
    client: "Jan Budowniczy",
    email: "jan.budowniczy@example.com",
    phone: "+48 123 456 789",
    company: "Budex S.A.",
    description: "Kompleksowa budowa willi jednorodzinnej z basenem i ogrodem. Projekt obejmuje prace ziemne, stan surowy, wykończenie oraz instalacje.",
    status: "W realizacji",
  },
  {
    id: 2,
    name: "Apartament Nowoczesny",
    client: "Anna Architekt",
    email: "anna.architekt@example.com",
    phone: "+48 987 654 321",
    company: "Architektura Wnętrz sp. z o.o.",
    description: "Projekt i wykonanie nowoczesnego apartamentu w centrum miasta. Skupienie na minimalistycznym designie i inteligentnych rozwiązaniach.",
    status: "Projektowanie",
  }
];

const archivedProjects = [
  {
    id: 101,
    name: "Dom Letniskowy 'Sosnowy'",
    client: "Marta Wakacyjna",
    status: "Ukończony",
  }
];

const projectModules = [
  { name: "Informacje", value: "info", icon: FileText },
  { name: "Wyceny", value: "quotes", icon: DollarSign },
  { name: "UMOWY", value: "contracts", icon: Handshake },
  { name: "Projektowanie", value: "design", icon: Brush },
  { name: "Materiały", value: "materials", icon: Package },
  { name: "Produkcja", value: "production", icon: Factory },
  { name: "Logistyka", value: "logistics", icon: Truck },
  { name: "Zakwaterowanie", value: "accommodation", icon: Hotel },
];

const quotesData = [
    { version: "v1.0", date: "2024-05-10", status: "Wysłany", total: "150 000 PLN" },
    { version: "v1.1", date: "2024-05-15", status: "Zaakceptowany", total: "155 000 PLN" },
    { version: "v1.2", date: "2024-05-20", status: "Wersja robocza", total: "158 000 PLN" },
];

const designTasks = [
    { id: 1, title: "Projekt elewacji", assigned: "AZ", deadline: "2024-07-01", status: "todo" },
    { id: 2, title: "Rysunki techniczne kuchni", assigned: "BK", deadline: "2024-06-28", status: "inprogress" },
    { id: 3, title: "Wizualizacje łazienek", assigned: "AZ", deadline: "2024-06-25", status: "done" },
    { id: 4, title: "Schemat elektryki", assigned: "CD", deadline: "2024-07-05", status: "todo" },
];

const materialsData = [
  { name: "Drewno dębowe", quantity: "150 m3", status: "available" },
  { name: "Śruby M10", quantity: "500 szt.", status: "missing" },
  { name: "Blacha stalowa 2mm", quantity: "50 m2", status: "ordered" },
  { name: "Farba akrylowa biała", quantity: "20 litrów", status: "available" },
];

const productionTasksData = [
    { id: 1, name: "Cięcie Laserowe Elementów A", assigned: "Operator 1", status: "completed" },
    { id: 2, name: "Frezowanie Elementów B", assigned: "Operator 2", status: "in-progress" },
    { id: 3, name: "Spawanie Konstrukcji C", assigned: "Operator 3", status: "planned" },
    { id: 4, name: "Montaż Podzespołów D", assigned: "Operator 1", status: "planned" },
];


const Managers = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Render project details view if a project is selected
  if (selectedProject) {
    const tasksTodo = designTasks.filter(task => task.status === 'todo');
    const tasksInProgress = designTasks.filter(task => task.status === 'inprogress');
    const tasksDone = designTasks.filter(task => task.status === 'done');

    return (
      <div className="space-y-6">
        {/* Header for Project Details */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{selectedProject.name}</h1>
            <p className="text-muted-foreground mt-1">Karta projektu - Zarządzanie modułami</p>
          </div>
        </div>
        
        {/* Tabs for Project Modules */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {projectModules.map((module) => (
              <TabsTrigger key={module.value} value={module.value}>
                <module.icon className="h-4 w-4 mr-2" />
                {module.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Information Tab */}
          <TabsContent value="info" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Project Description Card */}
                <Card>
                  <CardHeader><CardTitle>Opis Projektu</CardTitle></CardHeader>
                  <CardContent>
                    <Textarea defaultValue={selectedProject.description} rows={5} />
                  </CardContent>
                </Card>
                {/* Client Files Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Pliki Klienta</CardTitle>
                    <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-2" />Prześlij plik</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center aspect-square">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <p className="text-sm mt-2">Dokumentacja.pdf</p>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center aspect-square">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <p className="text-sm mt-2">Model_3D.obj</p>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center aspect-square">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <p className="text-sm mt-2">Specyfikacja.docx</p>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center aspect-square bg-muted/50">
                        <p className="text-sm text-muted-foreground">Puste miejsce</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                {/* Contact Details Card */}
                <Card>
                  <CardHeader><CardTitle>Dane Kontaktowe Klienta</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-muted-foreground" /><p>{selectedProject.email}</p></div>
                    <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-muted-foreground" /><p>{selectedProject.phone}</p></div>
                    <div className="flex items-center gap-4"><Building className="h-5 w-5 text-muted-foreground" /><p>{selectedProject.company}</p></div>
                  </CardContent>
                </Card>
                {/* Quick Notes Card */}
                <Card>
                  <CardHeader><CardTitle>Szybkie Notatki</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm border-l-2 pl-3">
                      <p className="font-medium">2 godz. temu</p>
                      <p className="text-muted-foreground">Klient prosił o aktualizację kosztorysu.</p>
                    </div>
                    <div className="text-sm border-l-2 pl-3">
                      <p className="font-medium">Wczoraj</p>
                      <p className="text-muted-foreground">Nowe pliki projektowe dodane.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Quotes Tab */}
          <TabsContent value="quotes" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Lista Kosztorysów</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Nowy</Button>
                        <Button variant="outline" size="sm"><Copy className="h-4 w-4 mr-2" />Duplikuj</Button>
                        <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-2" />Eksportuj PDF</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Wersja</TableHead>
                          <TableHead>Data Utworzenia</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Suma</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quotesData.map((quote) => (
                          <TableRow key={quote.version}>
                            <TableCell>{quote.version}</TableCell>
                            <TableCell>{quote.date}</TableCell>
                            <TableCell>
                              <Badge variant={
                                quote.status === "Zaakceptowany" ? "default" : 
                                quote.status === "Wysłany" ? "secondary" : "outline"
                              }>
                                {quote.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{quote.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                    <CardHeader><CardTitle>Podsumowanie Wyceny</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Suma Kosztów</p>
                            <p>125 000 PLN</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Marża</p>
                            <p>30 000 PLN (24%)</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Całkowita Wartość</p>
                            <p>155 000 PLN</p>
                        </div>
                    </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* PDF Viewer Placeholder */}
                <Card>
                  <CardHeader><CardTitle>Podgląd Umowy</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-64 bg-muted text-muted-foreground rounded-md">
                      Placeholder na podgląd PDF
                    </div>
                  </CardContent>
                </Card>
                {/* Comment Threads Placeholder */}
                <Card>
                   <CardHeader><CardTitle className="flex items-center"><MessageCircleMore className="h-5 w-5 mr-2"/>Komentarze</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                        <div className="border-l-2 pl-4">
                            <p className="text-sm font-semibold">Użytkownik A <span className="text-muted-foreground font-normal text-xs">2 godz. temu</span></p>
                            <p className="text-sm">Uwaga dotycząca paragrafu 3.2.</p>
                        </div>
                         <div className="border-l-2 pl-4">
                            <p className="text-sm font-semibold">Użytkownik B <span className="text-muted-foreground font-normal text-xs">1 godz. temu</span></p>
                            <p className="text-sm">Sprawdziłem, wygląda OK.</p>
                        </div>
                        <Textarea placeholder="Dodaj komentarz..." rows={2}/>
                        <Button size="sm">Wyślij</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                 {/* Version History Card */}
                <Card>
                   <CardHeader><CardTitle className="flex items-center"><History className="h-5 w-5 mr-2"/>Historia Wersji</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm border-l-2 pl-3">
                      <p className="font-medium">v1.2 <span className="text-muted-foreground font-normal text-xs">2024-05-20</span></p>
                      <p className="text-muted-foreground">Aktualizacja po negocjacjach.</p>
                    </div>
                    <div className="text-sm border-l-2 pl-3">
                       <p className="font-medium">v1.1 <span className="text-muted-foreground font-normal text-xs">2024-05-15</span></p>
                      <p className="text-muted-foreground">Pierwsza wersja wysłana do klienta.</p>
                    </div>
                     <Button variant="link" size="sm" className="p-0">Zobacz pełną historię</Button>
                  </CardContent>
                </Card>
                {/* Linked Modules Placeholder */}
                <Card>
                   <CardHeader><CardTitle className="flex items-center"><Link className="h-5 w-5 mr-2"/>Powiązane Moduły</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Linki do:</p>
                    <ul className="list-disc list-inside text-sm text-blue-500">
                        <li><a href="#">Projektowanie (§3.2)</a></li>
                        <li><a href="#">Wyceny</a></li>
                         <li><a href="#">Logistyka</a></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Design Tab (Kanban) */}
          <TabsContent value="design" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Do zrobienia</h3>
                {tasksTodo.map(task => (
                    <Card key={task.id}>
                        <CardHeader className="pb-2"><CardTitle className="text-base">{task.title}</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <div className="flex items-center text-muted-foreground"><User className="h-4 w-4 mr-2"/>Przypisany: {task.assigned}</div>
                            <div className="flex items-center text-muted-foreground"><Calendar className="h-4 w-4 mr-2"/>Termin: {task.deadline}</div>
                             <div className="flex items-center text-muted-foreground"><Paperclip className="h-4 w-4 mr-2"/>Pliki: 2</div> {/* Placeholder for file count */}
                        </CardContent>
                    </Card>
                ))}
              </div>
              {/* In Progress Column */}
               <div className="space-y-4">
                <h3 className="text-lg font-bold">W trakcie</h3>
                {tasksInProgress.map(task => (
                    <Card key={task.id}>
                        <CardHeader className="pb-2"><CardTitle className="text-base">{task.title}</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <div className="flex items-center text-muted-foreground"><User className="h-4 w-4 mr-2"/>Przypisany: {task.assigned}</div>
                            <div className="flex items-center text-muted-foreground"><Calendar className="h-4 w-4 mr-2"/>Termin: {task.deadline}</div>
                             <div className="flex items-center text-muted-foreground"><Paperclip className="h-4 w-4 mr-2"/>Pliki: 1</div> {/* Placeholder for file count */}
                        </CardContent>
                    </Card>
                ))}
              </div>
               {/* Done Column */}
               <div className="space-y-4">
                <h3 className="text-lg font-bold">Gotowe</h3>
                {tasksDone.map(task => (
                    <Card key={task.id}>
                        <CardHeader className="pb-2"><CardTitle className="text-base">{task.title}</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <div className="flex items-center text-muted-foreground"><User className="h-4 w-4 mr-2"/>Przypisany: {task.assigned}</div>
                            <div className="flex items-center text-muted-foreground"><Calendar className="h-4 w-4 mr-2"/>Termin: {task.deadline}</div>
                             <div className="flex items-center text-muted-foreground"><Paperclip className="h-4 w-4 mr-2"/>Pliki: 3</div> {/* Placeholder for file count */}
                        </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Lista Materiałów</CardTitle>
                   <Button variant="outline" size="sm"><ShoppingCart className="h-4 w-4 mr-2" />Zamów brakujące</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nazwa</TableHead>
                        <TableHead>Ilość</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materialsData.map((material, index) => (
                        <TableRow key={index}>
                          <TableCell>{material.name}</TableCell>
                          <TableCell>{material.quantity}</TableCell>
                          <TableCell>
                            <Badge variant={
                              material.status === "available" ? "default" :
                              material.status === "missing" ? "destructive" :
                              "secondary"
                            }>
                              {material.status === "available" ? "Dostępny" : material.status === "missing" ? "Brak" : "Zamówiony"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                   <p className="text-sm text-muted-foreground mt-4">Status materiałów jest synchronizowany z zewnętrznym magazynem (tylko do odczytu).</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

           {/* Production Tab */}
           <TabsContent value="production" className="mt-6">
            <div className="space-y-6">
              {/* Timeline Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Clock className="h-5 w-5 mr-2"/>Harmonogram Produkcji</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-32 bg-muted text-muted-foreground rounded-md">
                    Placeholder na harmonogram (Timeline)
                  </div>
                </CardContent>
              </Card>

              {/* Production Tasks Table */}
              <Card>
                <CardHeader><CardTitle>Zadania Produkcyjne</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Zadanie</TableHead>
                        <TableHead>Przypisany</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productionTasksData.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.name}</TableCell>
                          <TableCell>{task.assigned}</TableCell>
                          <TableCell>
                            <Badge variant={
                              task.status === "completed" ? "default" :
                              task.status === "in-progress" ? "secondary" :
                              "outline"
                            }>
                              {task.status === "completed" ? "🟢 Gotowe" : task.status === "in-progress" ? "🟡 W trakcie" : "⚪ Do zrobienia"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          {projectModules.filter(m => m.value !== 'info' && m.value !== 'quotes' && m.value !== 'contracts' && m.value !== 'design' && m.value !== 'materials' && m.value !== 'production').map((module) => (
            <TabsContent key={module.value} value={module.value} className="mt-6">
              <Card>
                <CardHeader><CardTitle>{module.name}</CardTitle></CardHeader>
                <CardContent>
                  <p>Szczegóły dla modułu {module.name} pojawią się tutaj.</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }

  // Render the main project list view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manager - Projekty</h1>
        <p className="text-muted-foreground mt-1">Zarządzaj swoimi aktywnymi i archiwalnymi projektami</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Aktywne Projekty</TabsTrigger>
          <TabsTrigger value="archived">Archiwalne Projekty</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeProjects.map(project => (
            <Card key={project.id} className="flex items-center justify-between p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProject(project)}>
              <div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Klient: {project.client}</p>
                <p className="text-sm text-muted-foreground">Status: {project.status}</p>
              </div>
              <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>Szczegóły</Button>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="archived" className="space-y-4 mt-4">
          {archivedProjects.map(project => (
            <Card key={project.id} className="flex items-center justify-between p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProject(project)}>
              <div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Klient: {project.client}</p>
                <p className="text-sm text-muted-foreground">Status: {project.status}</p>
              </div>
              <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>Szczegóły</Button>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Managers;
