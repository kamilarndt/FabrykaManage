# FabrykaManage

FabrykaManage is a modern, modular management system for project-based manufacturing companies, designed to streamline workflows, improve team collaboration, and provide real-time insights into every stage of the production process. The system is tailored for companies specializing in custom projects (e.g., interior design, construction, or manufacturing) and supports the entire lifecycle from client acquisition to project delivery.

## Key Features

- **Dashboard**: Overview of active projects, KPIs, team workload, and alerts.
- **Projects**: Manage all projects, track progress, deadlines, and statuses. Archive completed projects.
- **Managers**: Project management module with detailed project cards, task assignment, materials, contracts, and production tracking.
- **Clients**: CRM for managing client data, project history, and financials.
- **Production**: Kanban-style board for tracking production tasks, team assignments, and quality control.
- **Warehouse**: Inventory management, material tracking, supplier info, and stock alerts.
- **Designers**: Kanban board for design tasks, priorities, and team collaboration.

## Technology Stack

- **Vite** (build tool)
- **React** (UI library)
- **TypeScript** (type safety)
- **shadcn-ui** (UI components)
- **Tailwind CSS** (utility-first CSS)
- **Radix UI** (accessible UI primitives)
- **Supabase** (backend integration)
- **React Router** (routing)
- **Zod** (validation)
- **React Hook Form** (forms)
- **Lucide React** (icons)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

```sh
# Clone the repository
git clone https://github.com/kamilarndt/FabrykaManage.git
cd FabrykaManage

# Install dependencies
npm install
```

### Running the App

```sh
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Application Modules Overview

### Dashboard
- Real-time overview of active projects, KPIs (profitability, team load, deadlines), and alerts for bottlenecks or delays.

### Projects
- List and manage all projects (active and archived), track progress, deadlines, status, and team assignments.

### Managers
- Detailed project cards with modules for information, quotes, contracts, design, materials, production, logistics, and accommodation.
- Assign materials and tasks, upload files, and manage project lifecycle.

### Clients
- Manage client database, contact info, project history, and financials.

### Production
- Kanban board for production tasks, team assignments, progress tracking, and quality control.
- Drag-and-drop task management.

### Warehouse
- Inventory management, material status, supplier info, stock levels, and cost reports.
- Alerts for low or critical stock.

### Designers
- Kanban board for design tasks, priorities, deadlines, and team collaboration.

## Customization & Extensibility
- Built with modular components for easy extension and customization.
- Uses Tailwind CSS for rapid UI changes.
- Integrates with Supabase for backend needs (authentication, database, storage).

## License

This project is licensed under the MIT License.

---

For more information, please contact the repository owner or open an issue on GitHub.
