// ============================================
// AUTHENTICATION MODULE - LogiFlow Pro
// ============================================

const AuthModule = {
    currentUser: null,
    
    // Inicializar módulo
    init: function() {
        // Verificar si hay sesión activa
        const savedSession = localStorage.getItem('logiflow_session');
        if (savedSession) {
            try {
                this.currentUser = JSON.parse(savedSession);
                console.log('✅ Sesión recuperada:', this.currentUser.name);
                return true;
            } catch (error) {
                console.error('❌ Error al recuperar sesión:', error);
                this.logout();
                return false;
            }
        }
        return false;
    },
    
    // Login
    login: function(username, password) {
        const user = USERS.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('logiflow_session', JSON.stringify(user));
            console.log('✅ Login exitoso:', user.name);
            return {
                success: true,
                user: user
            };
        } else {
            console.log('❌ Login fallido: credenciales incorrectas');
            return {
                success: false,
                error: 'Usuario o contraseña incorrectos'
            };
        }
    },
    
    // Logout
    logout: function() {
        this.currentUser = null;
        localStorage.removeItem('logiflow_session');
        console.log('✅ Sesión cerrada');
    },
    
    // Verificar si está autenticado
    isAuthenticated: function() {
        return this.currentUser !== null;
    },
    
    // Obtener usuario actual
    getCurrentUser: function() {
        return this.currentUser;
    },
    
    // Verificar permisos
    hasPermission: function(permission) {
        if (!this.currentUser) return false;
        if (this.currentUser.permissions.includes('all')) return true;
        return this.currentUser.permissions.includes(permission);
    },
    
    // Obtener rol del usuario
    getRole: function() {
        return this.currentUser ? this.currentUser.role : null;
    },
    
    // Obtener nombre de rol en español
    getRoleName: function(role) {
        const roles = {
            'supply_chain_manager': 'Supply Chain Manager',
            'logistics_manager': 'Responsable de Logística',
            'operator': 'Operario / Carretillero',
            'transporter': 'Transportista Externo',
            'client': 'Cliente Final'
        };
        return roles[role] || role;
    },
    
    // Obtener icono del rol
    getRoleIcon: function(role) {
        const icons = {
            'supply_chain_manager': 'fa-user-tie',
            'logistics_manager': 'fa-clipboard-list',
            'operator': 'fa-hard-hat',
            'transporter': 'fa-truck',
            'client': 'fa-building'
        };
        return icons[role] || 'fa-user';
    },
    
    // Obtener color del rol
    getRoleColor: function(role) {
        const colors = {
            'supply_chain_manager': 'purple',
            'logistics_manager': 'blue',
            'operator': 'orange',
            'transporter': 'green',
            'client': 'gray'
        };
        return colors[role] || 'gray';
    },
    
    // Verificar acceso a módulo
    canAccessModule: function(module) {
        if (!this.currentUser) return false;
        
        const role = this.currentUser.role;
        
        const moduleAccess = {
            'dashboard': ['supply_chain_manager', 'logistics_manager'],
            'calendar': ['supply_chain_manager', 'logistics_manager'],
            'transportistas': ['supply_chain_manager', 'logistics_manager'],
            'ordenes': ['supply_chain_manager', 'logistics_manager', 'operator'],
            'operarios': ['operator'],
            'incidencias': ['supply_chain_manager', 'logistics_manager', 'operator'],
            'reporting': ['supply_chain_manager', 'logistics_manager'],
            'sap': ['supply_chain_manager', 'logistics_manager'],
            'documentos': ['supply_chain_manager', 'logistics_manager', 'transporter', 'client']
        };
        
        return moduleAccess[module] ? moduleAccess[module].includes(role) : false;
    },
    
    // Renderizar pantalla de login
    renderLoginScreen: function() {
        return `
            <div class="min-h-screen flex items-center justify-center p-4">
                <!-- Background Decorations -->
                <div class="absolute inset-0 overflow-hidden pointer-events-none">
                    <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
                    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
                </div>
                
                <!-- Login Card -->
                <div class="glass rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 animate-fade-in">
                    <!-- Logo -->
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-4 shadow-lg">
                            <i class="fas fa-boxes-stacked text-3xl text-white"></i>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-800 mb-2">Isopan Iberica</h1>
                        <p class="text-gray-600">Sistema de Gestión Logística Integral</p>
                    </div>
                    
                    <!-- Login Form -->
                    <form id="loginForm" class="space-y-6">
                        <!-- Error Alert -->
                        <div id="loginError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-exclamation-circle mr-2"></i>
                                <span id="loginErrorMessage"></span>
                            </div>
                        </div>
                        
                        <!-- Username -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-user mr-2"></i>Usuario
                            </label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                placeholder="Ingrese su usuario"
                                required
                                autocomplete="username"
                            >
                        </div>
                        
                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-lock mr-2"></i>Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                placeholder="Ingrese su contraseña"
                                required
                                autocomplete="current-password"
                            >
                        </div>
                        
                        <!-- Login Button -->
                        <button 
                            type="submit" 
                            class="w-full gradient-primary text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <i class="fas fa-sign-in-alt mr-2"></i>Iniciar Sesión
                        </button>
                    </form>
                    
                    <!-- Demo Users -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <p class="text-xs text-gray-500 text-center mb-4 font-semibold uppercase tracking-wide">
                            Usuarios de Demo
                        </p>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            ${USERS.map(user => `
                                <button 
                                    onclick="quickLogin('${user.username}', '${user.password}')"
                                    class="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                                >
                                    <div class="flex items-center">
                                        <i class="fas ${AuthModule.getRoleIcon(user.role)} text-${AuthModule.getRoleColor(user.role)}-600 mr-2"></i>
                                        <div class="flex-1 min-w-0">
                                            <p class="font-semibold text-gray-800 truncate">${user.username}</p>
                                            <p class="text-gray-500 text-xs truncate">${AuthModule.getRoleName(user.role)}</p>
                                        </div>
                                    </div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="mt-6 text-center text-xs text-gray-500">
                        <p>© 2025 Naimitech S.L. Todos los derechos reservados.</p>
                        <p class="mt-1">Versión 1.0.0 - Demo Profesional</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Manejar submit del formulario de login
    handleLoginSubmit: function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const result = this.login(username, password);
        
        if (result.success) {
            // Ocultar error si estaba visible
            document.getElementById('loginError').classList.add('hidden');
            
            // Recargar aplicación
            if (typeof window.App !== 'undefined') {
                window.App.init();
            }
        } else {
            // Mostrar error
            const errorDiv = document.getElementById('loginError');
            const errorMessage = document.getElementById('loginErrorMessage');
            errorMessage.textContent = result.error;
            errorDiv.classList.remove('hidden');
            
            // Añadir animación de shake
            const form = document.getElementById('loginForm');
            form.classList.add('animate-shake');
            setTimeout(() => form.classList.remove('animate-shake'), 500);
        }
    }
};

// Quick Login (para botones de demo)
function quickLogin(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

// Añadir animación shake al CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(shakeStyle);

// Inicializar al cargar
console.log('✅ Módulo de autenticación inicializado');
