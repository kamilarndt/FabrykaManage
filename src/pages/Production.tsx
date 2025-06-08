import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Factory,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Truck,
  Target,
  Calculator
} from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const materialsData = [
  { name: "Drewno dębowe", price: 250, unit: "m3" },
  { name: "Śruby M10", price: 0.25, unit: "szt." },
  { name: "Blacha stalowa 2mm", price: 35, unit: "m2" },
  { name: "Farba akrylowa biała", price: 12, unit: "litr" },
];

const Production = () => {
  const [columns, setColumns] = useState([
    {
      title: "Oczekuje na produkcję",
      color: "border-l-blue-500",
      tasks: [
        {
          id: 1,
          title: "Montaż kafelków - Łazienka Hotel",
          project: "Hotel Kraków Centrum",
          elements: 45,
          estimatedTime: "2 dni",
          priority: "Wysoki",
          deadline: "2024-07-15",
          materials: "Gotowe",
          team: null
        },
        {
          id: 2,
          title: "Montaż mozaiki - Kuchnia Dom",
          project: "Dom Prywatny - Nowak",
          elements: 28,
          estimatedTime: "1.5 dnia",
          priority: "Średni",
          deadline: "2024-07-20",
          materials: "Oczekuje",
          team: null
        }
      ]
    },
    {
      title: "W produkcji",
      color: "border-l-orange-500",
      tasks: [
        {
          id: 3,
          title: "Montaż kafelków 3D - Salon SPA",
          project: "Hotel Wellness",
          elements: 67,
          estimatedTime: "3 dni",
          priority: "Wysoki",
          deadline: "2024-07-18",
          materials: "Gotowe",
          team: "Zespół A",
          teamMembers: [
            { name: "Jan Kowalski", role: "Brygadzista", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
            { name: "Piotr Nowak", role: "Monterista", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" },
            { name: "Anna Kowalska", role: "Monterista", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" }
          ],
          progress: 45,
          timeWorked: "1.5 dnia",
          issues: []
        }
      ]
    },
    {
      title: "Kontrola jakości",
      color: "border-l-yellow-500",
      tasks: [
        {
          id: 4,
          title: "Montaż kafelków - Apartament",
          project: "Apartamenty Luxury",
          elements: 38,
          estimatedTime: "2 dni",
          priority: "Średni",
          deadline: "2024-07-14",
          materials: "Gotowe",
          team: "Zespół B",
          teamMembers: [
            { name: "Maria Zielińska", role: "Brygadzista", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" },
            { name: "Tomasz Wiśniewski", role: "Monterista", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" }
          ],
          progress: 100,
          timeWorked: "1.8 dnia",
          qualityCheck: "W trakcie",
          issues: ["Drobne poprawki wykończenia"]
        }
      ]
    },
    {
      title: "Gotowe do wysyłki",
      color: "border-l-green-500",
      tasks: [
        {
          id: 5,
          title: "Montaż kafelków - Biuro",
          project: "Biuro Kraków",
          elements: 52,
          estimatedTime: "2.5 dnia",
          priority: "Niski",
          deadline: "2024-07-12",
          materials: "Gotowe",
          team: "Zespół C",
          teamMembers: [
            { name: "Łukasz Nowak", role: "Brygadzista", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
          ],
          progress: 100,
          timeWorked: "2.3 dnia",
          qualityCheck: "Zatwierdzone",
          shipmentReady: true,
          issues: []
        }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Wysoki": return "text-red-500";
      case "Średni": return "text-yellow-500";
      case "Niski": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getMaterialsStatus = (status: string) => {
    switch (status) {
      case "Gotowe": return <Badge variant="default">Gotowe</Badge>;
      case "Oczekuje": return <Badge variant="destructive">Oczekuje</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceColIdx = Number(result.source.droppableId);
    const destColIdx = Number(result.destination.droppableId);
    const sourceTasks = Array.from(columns[sourceColIdx].tasks);
    const [removed] = sourceTasks.splice(result.source.index, 1);
    const newColumns = Array.from(columns);
    if (sourceColIdx === destColIdx) {
      newColumns[sourceColIdx].tasks = sourceTasks;
      newColumns[sourceColIdx].tasks.splice(result.destination.index, 0, removed);
    } else {
      const destTasks = Array.from(columns[destColIdx].tasks);
      destTasks.splice(result.destination.index, 0, removed);
      newColumns[sourceColIdx].tasks = sourceTasks;
      newColumns[destColIdx].tasks = destTasks;
    }
    setColumns(newColumns);
  };

  const { toast } = useToast();
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [assignQuantity, setAssignQuantity] = useState(1);
  const [assignTask, setAssignTask] = useState<any>(null);

  const handleAssignMaterial = () => {
    if (!selectedMaterial || !assignTask || assignQuantity < 1) {
      toast({ title: "Błąd", description: "Uzupełnij wszystkie pola.", variant: "destructive" });
      return;
    }
    toast({ title: "Przypisano materiał", description: `${selectedMaterial.name} (${assignQuantity}) do zadania: ${assignTask.title}` });
    setAssignModalOpen(false);
    setSelectedMaterial(null);
    setAssignQuantity(1);
    setAssignTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produkcja</h1>
          <p className="text-muted-foreground mt-1">Zarządzanie procesem produkcyjnym i zespołami monterskimi</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Zespoły
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nowe zadanie
          </Button>
        </div>
      </div>

      {/* Production Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne zadania</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              W różnych etapach
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dostępne zespoły</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Może przyjąć zadania
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Średni czas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <p className="text-xs text-muted-foreground">
              dni na zadanie
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wydajność</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Cele na czas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column, columnIndex) => (
            <Droppable droppableId={String(columnIndex)} key={columnIndex}>
              {(provided, snapshot) => (
                <Card ref={provided.innerRef} {...provided.droppableProps} className={`border-l-4 ${column.color} ${snapshot.isDraggingOver ? "bg-muted/30" : ""}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {column.title}
                      <Badge variant="outline">{column.tasks.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {column.tasks.map((task, taskIdx) => (
                      <Draggable draggableId={String(task.id)} index={taskIdx} key={task.id}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`border border-border hover:shadow-md transition-shadow cursor-pointer mb-2 ${snapshot.isDragging ? "bg-muted/20" : ""}`}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div>
                                  <h3 className="font-medium text-sm mb-1">{task.title}</h3>
                                  <p className="text-xs text-muted-foreground">{task.project}</p>
                                </div>
                                
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Elementy:</span>
                                    <span>{task.elements} szt.</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Czas est.:</span>
                                    <span>{task.estimatedTime}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Termin:</span>
                                    <span>{task.deadline}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                    {task.priority}
                                  </Badge>
                                  {getMaterialsStatus(task.materials)}
                                </div>

                                {task.progress !== undefined && (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>Postęp</span>
                                      <span>{task.progress}%</span>
                                    </div>
                                    <Progress value={task.progress} />
                                    {task.timeWorked && (
                                      <div className="text-xs text-muted-foreground">
                                        Przepracowano: {task.timeWorked}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {task.team && (
                                  <div className="space-y-2">
                                    <div className="text-xs font-medium">{task.team}</div>
                                    <div className="flex -space-x-2">
                                      {task.teamMembers?.slice(0, 3).map((member, i) => (
                                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                          <AvatarImage src={member.avatar} />
                                          <AvatarFallback className="text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                      ))}
                                      {task.teamMembers && task.teamMembers.length > 3 && (
                                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                                          +{task.teamMembers.length - 3}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {task.qualityCheck && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    <span>Kontrola: {task.qualityCheck}</span>
                                  </div>
                                )}

                                {task.issues && task.issues.length > 0 && (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-xs text-destructive">
                                      <AlertTriangle className="h-3 w-3" />
                                      <span>Uwagi:</span>
                                    </div>
                                    {task.issues.map((issue, i) => (
                                      <div key={i} className="text-xs text-muted-foreground pl-4">
                                        • {issue}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {task.shipmentReady && (
                                  <div className="flex items-center gap-2 text-xs text-green-600">
                                    <Truck className="h-3 w-3" />
                                    <span>Gotowe do wysyłki</span>
                                  </div>
                                )}

                                <div className="flex gap-1 pt-2">
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs flex-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Czas
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs flex-1">
                                    <Wrench className="h-3 w-3 mr-1" />
                                    Problemy
                                  </Button>
                                </div>

                                <Button variant="outline" size="sm" className="h-6 px-2 text-xs flex-1 mt-2" onClick={() => { setAssignTask(task); setAssignModalOpen(true); }}>
                                  <Plus className="h-3 w-3 mr-1" />Przypisz materiał
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </CardContent>
                </Card>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal przypisywania materiału */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Przypisz materiał do zadania</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Wybór materiału */}
            <div>
              <label className="block text-sm font-medium mb-1">Materiał</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={selectedMaterial?.name || ""}
                onChange={e => setSelectedMaterial(materialsData.find(m => m.name === e.target.value))}
              >
                <option value="">Wybierz materiał</option>
                {materialsData.map((m, i) => (
                  <option key={i} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>
            {/* Ilość */}
            <div>
              <label className="block text-sm font-medium mb-1">Ilość</label>
              <Input type="number" min={1} value={assignQuantity} onChange={e => setAssignQuantity(Number(e.target.value))} />
            </div>
            {/* Kalkulator kosztów */}
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Koszt: <span className="font-bold">
                  {selectedMaterial ? (assignQuantity * (selectedMaterial.price || 0)).toFixed(2) : "0.00"} PLN
                </span>
                {selectedMaterial?.unit && (
                  <span className="text-xs text-muted-foreground ml-2">({assignQuantity} × {selectedMaterial.price} PLN/{selectedMaterial.unit})</span>
                )}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAssignMaterial}>Przypisz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Production;