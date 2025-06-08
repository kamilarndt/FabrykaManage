import React, { useState } from 'react';
import DesignersBoard from "@/components/layout/DesignersBoard";
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
  Ruler,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Designers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

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

  const filteredTasks = kanbanColumns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'All' || task.priority === filterStatus)
    )
  }));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Wysoki": return "text-red-500";
      case "Średni": return "text-yellow-500";
      case "Niski": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Board Projektantów</h1>
        <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Dodaj Zadanie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj Nowe Zadanie</DialogTitle>
            </DialogHeader>
            {/* Add task form would go here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Szukaj zadań..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-muted-foreground h-5 w-5" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">Wszystkie Priorytety</option>
            <option value="Wysoki">Wysoki</option>
            <option value="Średni">Średni</option>
            <option value="Niski">Niski</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredTasks.map((column, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{column.title}</CardTitle>
              <Badge variant="secondary">{column.tasks.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {column.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`border-l-4 p-3 rounded-md ${column.color} hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm">{task.title}</h3>
                    <span className={`text-xs font-bold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.avatar} alt={task.assignee} />
                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{task.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <DesignersBoard />
    </div>
  );
};

export default Designers;