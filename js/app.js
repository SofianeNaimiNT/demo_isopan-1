// ============================================
// MAIN APPLICATION - LogiFlow Pro
// ============================================

const App = {
    currentModule: 'dashboard',
    modalOpen: false,
    
    // Inicializar aplicación
    init: function() {
        console.log('🚀 Iniciando LogiFlow Pro...');
        
        // Inicializar módulos
        AuthModule.init();
        NotificationsModule.init();
        
        // Verificar autenticación
        if (!AuthModule.isAuthenticated()) {
            this.renderLogin();
            return;
        }
        
        // Inicializar interfaz
        this.setupUI();
        this.setupEventListeners();
        this.handleRouting();
        
        console.log('✅ LogiFlow Pro iniciado correctamente');
    },
    
    // Renderizar pantalla de login
    renderLogin: function() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = AuthModule.renderLoginScreen();
        
        // Configurar evento de submit
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            AuthModule.handleLoginSubmit(e);
        });
    },
    
    // Configurar interfaz de usuario
    setupUI: function() {
        const user = AuthModule.getCurrentUser();
        const role = user.role;
        
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = `
            <!-- Main Layout -->
            <div class="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <!-- Sidebar -->
                <aside id="sidebar" class="w-64 glass border-r border-gray-200 transition-all duration-300">
                    ${this.renderSidebar()}
                </aside>
                
                <!-- Main Content -->
                <main class="flex-1 flex flex-col overflow-hidden">
                    <!-- Header -->
                    <header class="glass border-b border-gray-200 px-6 py-4">
                        ${this.renderHeader()}
                    </header>
                    
                    <!-- Content Area -->
                    <div id="content" class="flex-1 overflow-y-auto p-6">
                        <!-- Content will be loaded here -->
                    </div>
                </main>
            </div>
            
            <!-- Modal Container -->
            <div id="modalContainer"></div>
            
            <!-- Search Modal -->
            <div id="searchModal" class="hidden fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div class="glass rounded-2xl p-6 w-full max-w-2xl animate-fade-in">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-search text-gray-400 mr-3"></i>
                        <input type="text" id="globalSearch" placeholder="Buscar en toda la aplicación..." class="flex-1 bg-transparent border-none outline-none text-lg">
                        <button onclick="App.closeSearch()" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="searchResults" class="space-y-2"></div>
                </div>
            </div>
        `;
    },
    
    // Renderizar sidebar
    renderSidebar: function() {
        const user = AuthModule.getCurrentUser();
        const menuItems = this.getMenuItems(user.role);
        
        return `
            <!-- Logo -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mr-3">
                        <i class="fas fa-boxes-stacked text-white text-xl"></i>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold text-gray-900">LogiFlow Pro</h1>
                        <p class="text-xs text-gray-600">v1.0.0</p>
                    </div>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto p-4">
                <div class="space-y-1">
                    ${menuItems.map(item => `
                        <a href="#${item.route}" class="menu-item flex items-center px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm transition group ${this.currentModule === item.route ? 'bg-white shadow-sm' : ''}">
                            <i class="fas ${item.icon} text-${item.color}-600 mr-3 group-hover:scale-110 transition-transform"></i>
                            <span class="font-medium text-gray-700 group-hover:text-gray-900">${item.label}</span>
                        </a>
                    `).join('')}
                </div>
            </nav>
            
            <!-- User Profile -->
            <div class="p-4 border-t border-gray-200">
                <div class="flex items-center p-3 bg-white rounded-lg">
                    <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full mr-3">
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-gray-900 text-sm truncate">${user.name}</p>
                        <p class="text-xs text-gray-600 truncate">${AuthModule.getRoleName(user.role)}</p>
                    </div>
                    <button onclick="App.logout()" class="text-gray-400 hover:text-red-600 transition" title="Cerrar sesión">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        `;
    },
    
    // Renderizar header
    renderHeader: function() {
        const user = AuthModule.getCurrentUser();
        
        return `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <button onclick="App.toggleSidebar()" class="lg:hidden text-gray-600 hover:text-gray-900">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    <div class="hidden sm:block">
                        <p class="text-sm text-gray-600">Bienvenido de nuevo,</p>
                        <p class="font-semibold text-gray-900">${user.name}</p>
                    </div>
                </div>
                
                <div class="flex items-center space-x-4">
                    <!-- Global Search -->
                    <button onclick="App.openSearch()" class="hidden md:flex items-center px-4 py-2 bg-white rounded-lg hover:shadow-sm transition">
                        <i class="fas fa-search text-gray-400 mr-2"></i>
                        <span class="text-sm text-gray-600">Buscar... (Cmd+K)</span>
                    </button>
                    
                    <!-- Notifications -->
                    <div class="relative">
                        <button onclick="App.toggleNotifications()" class="relative p-2 text-gray-600 hover:text-gray-900 transition">
                            <i class="fas fa-bell text-xl"></i>
                            <span id="notificationBadge" class="notification-badge"></span>
                        </button>
                        <div id="notificationPanel" class="hidden absolute right-0 mt-2 z-50"></div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <button onclick="App.showQuickActions()" class="p-2 text-gray-600 hover:text-gray-900 transition">
                        <i class="fas fa-ellipsis-vertical text-xl"></i>
                    </button>
                </div>
            </div>
        `;
    },
    
    // Obtener items del menú según rol
    getMenuItems: function(role) {
        const allItems = [
            { route: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', color: 'blue', roles: ['supply_chain_manager', 'logistics_manager'] },
            { route: 'calendar', label: 'Calendario', icon: 'fa-calendar', color: 'purple', roles: ['supply_chain_manager', 'logistics_manager'] },
            { route: 'ordenes', label: 'Órdenes de Carga', icon: 'fa-box', color: 'green', roles: ['supply_chain_manager', 'logistics_manager', 'operator'] },
            { route: 'transportistas', label: 'Transportistas', icon: 'fa-truck', color: 'orange', roles: ['supply_chain_manager', 'logistics_manager'] },
            { route: 'operarios', label: 'Mis Cargas', icon: 'fa-hard-hat', color: 'yellow', roles: ['operator'] },
            { route: 'incidencias', label: 'Incidencias', icon: 'fa-exclamation-triangle', color: 'red', roles: ['supply_chain_manager', 'logistics_manager', 'operator'] },
            { route: 'reporting', label: 'Reporting', icon: 'fa-chart-bar', color: 'indigo', roles: ['supply_chain_manager', 'logistics_manager'] },
            { route: 'sap', label: 'Integración SAP', icon: 'fa-database', color: 'gray', roles: ['supply_chain_manager', 'logistics_manager'] }
        ];
        
        return allItems.filter(item => item.roles.includes(role));
    },
    
    // Configurar event listeners
    setupEventListeners: function() {
        // Routing
        window.addEventListener('hashchange', () => this.handleRouting());
        
        // Global search (Cmd+K or Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            if (e.key === 'Escape') {
                this.closeSearch();
                this.closeModal();
            }
        });
        
        // Update notifications badge
        NotificationsModule.updateBadge();
    },
    
    // Manejar routing
    handleRouting: function() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const [module, ...params] = hash.split('/');
        
        this.currentModule = module;
        
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('bg-white', 'shadow-sm');
        });
        const activeItem = document.querySelector(`a[href="#${module}"]`);
        if (activeItem) {
            activeItem.classList.add('bg-white', 'shadow-sm');
        }
        
        // Load module
        this.loadModule(module, params);
    },
    
    // Cargar módulo
    loadModule: function(module, params) {
        const contentArea = document.getElementById('content');
        if (!contentArea) return;
        
        let content = '';
        
        switch (module) {
            case 'dashboard':
                content = DashboardModule.render();
                setTimeout(() => DashboardModule.initCharts(), 100);
                break;
            case 'calendar':
                content = CalendarModule.render();
                setTimeout(() => CalendarModule.initCalendar(), 100);
                break;
            case 'ordenes':
                content = CargasModule.render();
                break;
            case 'transportistas':
                content = TransportistasModule.render();
                break;
            case 'operarios':
                content = OperariosModule.render();
                break;
            case 'incidencias':
                content = IncidenciasModule.render();
                break;
            case 'reporting':
                content = ReportingModule.render();
                break;
            case 'sap':
                content = SAPModule.render();
                break;
            default:
                content = `
                    <div class="glass rounded-xl p-12 text-center">
                        <i class="fas fa-compass text-6xl text-gray-300 mb-4"></i>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Módulo no encontrado</h2>
                        <p class="text-gray-600 mb-6">El módulo "${module}" no existe o no está disponible</p>
                        <button onclick="window.location.hash = '#dashboard'" class="px-6 py-2 gradient-primary text-white rounded-lg">
                            Ir al Dashboard
                        </button>
                    </div>
                `;
        }
        
        contentArea.innerHTML = content;
    },
    
    // Navegar a módulo
    navigate: function(hash) {
        window.location.hash = hash;
    },
    
    // Toggle sidebar (mobile)
    toggleSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hidden');
    },
    
    // Open global search
    openSearch: function() {
        const modal = document.getElementById('searchModal');
        modal.classList.remove('hidden');
        document.getElementById('globalSearch').focus();
    },
    
    // Close global search
    closeSearch: function() {
        const modal = document.getElementById('searchModal');
        modal.classList.add('hidden');
    },
    
    // Toggle notifications panel
    toggleNotifications: function() {
        const panel = document.getElementById('notificationPanel');
        if (panel.classList.contains('hidden')) {
            panel.innerHTML = NotificationsModule.renderPanel();
            panel.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
        }
    },
    
    // Render notifications panel
    renderNotificationsPanel: function() {
        const panel = document.getElementById('notificationPanel');
        if (!panel.classList.contains('hidden')) {
            panel.innerHTML = NotificationsModule.renderPanel();
        }
    },
    
    // Show quick actions
    showQuickActions: function() {
        this.showModal('Acciones Rápidas', `
            <div class="grid grid-cols-2 gap-4">
                <button onclick="window.location.hash = '#ordenes'; App.closeModal();" class="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                    <i class="fas fa-plus-circle text-2xl text-green-600 mb-2"></i>
                    <p class="font-semibold text-gray-900 text-sm">Nueva Orden</p>
                </button>
                <button onclick="window.location.hash = '#incidencias'; App.closeModal();" class="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition">
                    <i class="fas fa-exclamation-triangle text-2xl text-red-600 mb-2"></i>
                    <p class="font-semibold text-gray-900 text-sm">Nueva Incidencia</p>
                </button>
                <button onclick="window.location.hash = '#calendar'; App.closeModal();" class="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                    <i class="fas fa-calendar-plus text-2xl text-purple-600 mb-2"></i>
                    <p class="font-semibold text-gray-900 text-sm">Nueva Cita</p>
                </button>
                <button onclick="window.location.hash = '#reporting'; App.closeModal();" class="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                    <i class="fas fa-download text-2xl text-blue-600 mb-2"></i>
                    <p class="font-semibold text-gray-900 text-sm">Exportar Datos</p>
                </button>
            </div>
        `);
    },
    
    // Show modal
    showModal: function(title, content, sizeClass = 'max-w-lg') {
        const container = document.getElementById('modalContainer');
        container.innerHTML = `
            <div class="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4" onclick="if(event.target === this) App.closeModal()">
                <div class="glass rounded-2xl p-6 w-full ${sizeClass} animate-fade-in">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-900">${title}</h2>
                        <button onclick="App.closeModal()" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div>${content}</div>
                </div>
            </div>
        `;
        this.modalOpen = true;
    },
    
    // Close modal
    closeModal: function() {
        const container = document.getElementById('modalContainer');
        container.innerHTML = '';
        this.modalOpen = false;
    },
    
    // Logout
    logout: function() {
        if (confirm('¿Está seguro de que desea cerrar sesión?')) {
            AuthModule.logout();
            NotificationsModule.stopRealTimeUpdates();
            DashboardModule.stopRealTimeUpdates();
            window.location.reload();
        }
    }
};

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

console.log('✅ Aplicación principal cargada');
