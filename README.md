# Inventory Management System — Frontend

A modern, responsive **Inventory Management System** frontend built with **React 19**, **Vite**, and **Tailwind CSS**. It provides a comprehensive interface for managing products, customers, suppliers, inventory transactions, stock control, and reporting — complete with role-based access control and permission management.

---

## Features

### Master Files
- **Customer Management** — Create, edit, delete customers with category & type classification
- **Supplier Management** — Maintain supplier records
- **Product List** — Full product catalog with cost, MRP, min-price, discount levels, OEM numbers, and barcodes
- **Product Types & Discount Levels** — Configurable product classifications and pricing tiers
- **Center Management** — Manage business centers / locations

### Inventory Control
- **Invoices** — Generate and manage sales invoices with payment processing
- **Sales Orders & Sales Returns** — Track outbound sales workflow
- **GRN (Goods Received Notes)** — Record incoming stock from suppliers
- **Purchase Orders & Purchase Returns** — Manage procurement lifecycle

### Stock Control
- **Stock Transfer** — Transfer inventory between centers
- **Stock Verification** — Physical stock audits and reconciliation

### Reporting
- GRN, Invoice, Sales Order, Sales Return, Purchase Order, Purchase Return reports
- Stock Transfer & Stock Verification reports
- Customer, Supplier, and Product reports
- PDF export via **jsPDF** with auto-table support

### Administration
- **User Permissions** — Role-based access control with granular per-module permissions
- Admin-only administration panel

### Other
- Responsive design (mobile & desktop)
- JWT-based authentication with token refresh
- Animated UI with Framer Motion
- Toast & SweetAlert2 notifications
- Excel export (XLSX)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Routing | [React Router DOM 7](https://reactrouter.com/) |
| Charts | [Chart.js](https://www.chartjs.org/) + react-chartjs-2 |
| PDF Generation | [jsPDF](https://github.com/parallax/jsPDF) + jspdf-autotable |
| Excel Export | [SheetJS (xlsx)](https://sheetjs.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Notifications | [React Toastify](https://fkhadra.github.io/react-toastify/) / [SweetAlert2](https://sweetalert2.github.io/) |
| Date Utilities | [date-fns](https://date-fns.org/) |

---

## Project Structure

```
src/
├── components/
│   ├── Accounting/           # Responsive accounting components
│   ├── AuthForm/             # Authentication form
│   ├── ErrorMessage/         # Error display component
│   ├── Inventory/            # Inventory popups, payment, PDF generation
│   ├── Report/               # Report viewer
│   └── ProtectedComponent.jsx
├── config/
│   ├── permissions.js        # Permission definitions
│   └── permissionModules.js  # Permission module mappings
├── contexts/
│   └── AuthContext.jsx       # Authentication context provider
├── Pages/
│   ├── Admin/                # User permission management
│   ├── Dashboard/            # Dashboard & sidebar navigation
│   ├── Inventory/
│   │   ├── MasterFile/       # Customer, Supplier, Product, Center, etc.
│   │   ├── GRN.jsx
│   │   ├── Invoices.jsx
│   │   ├── SalesOrder.jsx
│   │   ├── SalesReturn.jsx
│   │   ├── PurchaseOrder.jsx
│   │   ├── PurchaseReturn.jsx
│   │   ├── StockTransfer.jsx
│   │   ├── StockVerification.jsx
│   │   └── Pending.jsx
│   ├── Login/                # Login page
│   └── Report/               # All report pages
├── services/
│   ├── Account/              # Customer & Supplier API services
│   ├── Inventory/            # Inventory-related API services
│   ├── Report/               # Report API service
│   ├── AuthService.js        # Auth API calls
│   ├── PermissionService.js  # Permission API calls
│   ├── TokenService.js       # JWT token management
│   └── UserService.js        # User API calls
├── utils/
│   ├── axios.js              # Axios instance with interceptors
│   ├── responsive.js         # Responsive utilities
│   └── SidebarUtils.js       # Sidebar helpers
├── app.jsx                   # Root app component
├── config.js                 # App configuration (API base URL)
├── main.jsx                  # Entry point
└── routes.jsx                # Application routes
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm or yarn
- A running backend API (set the URL via environment variable)

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/shamenrathnasiri/Inventory-management-System-Frontend
   cd Inventory-management-System-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**  
   Navigate to `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).
