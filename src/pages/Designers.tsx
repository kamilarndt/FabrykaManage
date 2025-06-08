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

  return <DesignersBoard />;
};

export default Designers;