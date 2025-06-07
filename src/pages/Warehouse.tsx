import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Filter,
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Truck,
  Calculator
} from "lucide-react";

const Warehouse = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const materials = [
    {
      id: 1,
      name: "Gres porcelanowy Premium",
      code: "GP-PREM-001",
      category: "Płytki ceramiczne",
      stock: 450,
      minStock: 200,
      maxStock: 800,
      unit: "m²",
      price: 85.50,
      supplier: "CeramTech Sp. z o.o.",
      lastDelivery: "2024-06-28",
      nextDelivery: "2024-07-15",
      reserved: 120,
      available: 330,
      status: "Dostępny"
    },
    {
      id: 2,
      name: "Marmur Carrara biały",
      code: "MAR-CAR-001",
      category: "Kamień naturalny",
      stock: 85,
      minStock: 100,
      maxStock: 300,
      unit: "m²",
      price: 320.00,
      supplier: "Stone Import SA",
      lastDelivery: "2024-06-20",
      nextDelivery: "2024-07-08",
      reserved: 45,
      available: 40,
      status: "Niski stan"
    },
    {
      id: 3,
      name: "Klej do płytek elastyczny",
      code: "KLE-ELA-001",
      category: "Chemia budowlana",
      stock: 150,
      minStock: 50,
      maxStock: 200,
      unit: "kg",
      price: 12.50,
      supplier: "ChemBud Polska",
      lastDelivery: "2024-07-01",
      nextDelivery: "2024-07-20",
      reserved: 25,
      available: 125,
      status: "Dostępny"
    },
    {
      id: 4,
      name: "Granit czarny Galaxy",
      code: "GRA-GAL-001",
      category: "Kamień naturalny",
      stock: 25,
      minStock: 30,
      maxStock: 150,
      unit: "m²",
      price: 280.00,
      supplier: "Stone Import SA",
      lastDelivery: "2024-06-15",
      nextDelivery: "Brak zamówienia",
      reserved: 15,
      available: 10,
      status: "Krytyczny"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dostępny": return "default";
      case "Niski stan": return "secondary";
      case "Krytyczny": return "destructive";
      default: return "outline";
    }
  };

  const getStockPercentage = (stock: number, minStock: number, maxStock: number) => {
    return Math.round((stock / maxStock) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Magazyn</h1>
          <p className="text-muted-foreground mt-1">Zarządzaj stanem magazynowym i zamówieniami materiałów</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            Raport kosztów
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nowy materiał
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wszystkich materiałów</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              Pozycji w magazynie
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Niskie stany</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">12</div>
            <p className="text-xs text-muted-foreground">
              Wymaga uzupełnienia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wartość magazynu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M PLN</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +5% vs. mies. poprz.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planowane dostawy</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              W tym tygodniu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj materiałów..."
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

      {/* Materials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stan magazynowy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {materials.map((material) => (
              <Card key={material.id} className="border">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    {/* Material Info */}
                    <div className="lg:col-span-2">
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-muted-foreground">{material.code}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {material.category}
                      </Badge>
                    </div>

                    {/* Stock Status */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stan: {material.available}/{material.stock} {material.unit}</span>
                        <Badge variant={getStatusColor(material.status)}>
                          {material.status}
                        </Badge>
                      </div>
                      <Progress value={getStockPercentage(material.stock, material.minStock, material.maxStock)} />
                      <div className="text-xs text-muted-foreground">
                        Min: {material.minStock} | Max: {material.maxStock} | Zarezerwowane: {material.reserved}
                      </div>
                    </div>

                    {/* Price & Supplier */}
                    <div className="text-sm">
                      <div className="font-medium">{material.price} PLN/{material.unit}</div>
                      <div className="text-muted-foreground">{material.supplier}</div>
                    </div>

                    {/* Delivery Info */}
                    <div className="text-sm">
                      <div className="text-muted-foreground">Ostatnia dostawa:</div>
                      <div>{material.lastDelivery}</div>
                      <div className="text-muted-foreground mt-1">Następna:</div>
                      <div className={material.nextDelivery === "Brak zamówienia" ? "text-red-500" : ""}>
                        {material.nextDelivery}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Package className="h-4 w-4 mr-2" />
                        Zamów
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Historia
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Warehouse;