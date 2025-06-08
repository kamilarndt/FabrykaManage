import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  Phone,
  Mail,
  MapPin,
  Building,
  FileText,
  DollarSign
} from "lucide-react";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: 1,
      name: "Hotel Kraków Centrum",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=64&h=64&fit=crop&crop=center",
      contact: "Anna Kowalska",
      email: "anna@hotelkrakow.pl",
      phone: "+48 12 345 67 89",
      address: "ul. Floriańska 12, 31-021 Kraków",
      projects: 5,
      activeProjects: 2,
      totalValue: "450,000 PLN",
      status: "Aktywny"
    },
    {
      id: 2,
      name: "Dom Prywatny - Nowak",
      logo: "",
      contact: "Piotr Nowak",
      email: "piotr.nowak@gmail.com", 
      phone: "+48 601 234 567",
      address: "ul. Słoneczna 15, 30-134 Kraków",
      projects: 1,
      activeProjects: 1,
      totalValue: "85,000 PLN",
      status: "Aktywny"
    },
    {
      id: 3,
      name: "Apartamenty Luxury",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop&crop=center",
      contact: "Maria Zielińska",
      email: "maria@apartamenty.pl",
      phone: "+48 22 987 65 43",
      address: "ul. Wiślana 8, 00-001 Warszawa",
      projects: 8,
      activeProjects: 0,
      totalValue: "1,200,000 PLN",
      status: "Zakończony"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Klienci</h1>
          <p className="text-muted-foreground mt-1">Zarządzaj bazą klientów i historią projektów</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Nowy Klient
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj klientów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtruj
        </Button>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={client.logo} />
                  <AvatarFallback className="text-lg">
                    {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge variant={client.status === "Aktywny" ? "default" : "secondary"}>
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{client.contact}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{client.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{client.projects}</div>
                  <p className="text-xs text-muted-foreground">Wszystkie projekty</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{client.activeProjects}</div>
                  <p className="text-xs text-muted-foreground">Aktywne</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{client.totalValue}</div>
                  <p className="text-xs text-muted-foreground">Wartość</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Historia
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Rozliczenia
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;