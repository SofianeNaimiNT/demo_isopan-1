// ============================================
// NOTIFICATIONS MODULE - LogiFlow Pro
// ============================================

const NotificationsModule = {
    notifications: [],
    updateInterval: null,
    
    // Inicializar módulo
    init: function() {
        this.notifications = NOTIFICATIONS;
        this.startRealTimeUpdates();
        console.log('✅ Módulo de notificaciones inicializado');
    },
    
    // Iniciar actualizaciones en tiempo real
    startRealTimeUpdates: function() {
        // Actualizar cada 30 segundos
        this.updateInterval = setInterval(() => {
            this.simulateRealTimeNotifications();
        }, 30000);
    },
    
    // Detener actualizaciones
    stopRealTimeUpdates: function() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    },
    
    // Simular notificaciones en tiempo real
    simulateRealTimeNotifications: function() {
        // En una app real, esto vendría de WebSockets o Server-Sent Events
        const randomEvents = [
            {
                type: 'info',
                title: 'Nueva orden creada',
                message: 'Se ha creado una nueva orden de carga para mañana',
                actionUrl: '#ordenes'
            },
            {
                type: 'warning',
                title: 'Retraso en carga',
                message: 'Camión retrasado 10 minutos en muelle 2',
                actionUrl: '#ordenes'
            },
            {
                type: 'success',
                title: 'Carga completada',
                message: 'Orden completada y lista para salida',
                actionUrl: '#ordenes'
            }
        ];
        
        // 30% de probabilidad de generar notificación
        if (Math.random() < 0.3) {
            const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
            this.add(event.type, event.title, event.message, event.actionUrl);
        }
    },
    
    // Obtener todas las notificaciones
    getAll: function() {
        return this.notifications;
    },
    
    // Obtener no leídas
    getUnread: function() {
        return this.notifications.filter(n => !n.read);
    },
    
    // Obtener conteo de no leídas
    getUnreadCount: function() {
        return this.getUnread().length;
    },
    
    // Añadir notificación
    add: function(type, title, message, actionUrl = null) {
        const notification = {
            id: 'N' + Date.now(),
            type: type,
            title: title,
            message: message,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: actionUrl
        };
        
        this.notifications.unshift(notification);
        NOTIFICATIONS = this.notifications;
        StorageManager.save();
        
        // Mostrar toast
        this.showToast(notification);
        
        // Actualizar badge
        this.updateBadge();
        
        return notification;
    },
    
    // Marcar como leída
    markAsRead: function(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            NOTIFICATIONS = this.notifications;
            StorageManager.save();
            this.updateBadge();
        }
    },
    
    // Marcar todas como leídas
    markAllAsRead: function() {
        this.notifications.forEach(n => n.read = true);
        NOTIFICATIONS = this.notifications;
        StorageManager.save();
        this.updateBadge();
    },
    
    // Eliminar notificación
    delete: function(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        NOTIFICATIONS = this.notifications;
        StorageManager.save();
        this.updateBadge();
    },
    
    // Limpiar todas las leídas
    clearRead: function() {
        this.notifications = this.notifications.filter(n => !n.read);
        NOTIFICATIONS = this.notifications;
        StorageManager.save();
        this.updateBadge();
    },
    
    // Actualizar badge de notificaciones
    updateBadge: function() {
        const count = this.getUnreadCount();
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    },
    
    // Obtener icono según tipo
    getIcon: function(type) {
        const icons = {
            'critical': 'fa-circle-exclamation',
            'warning': 'fa-triangle-exclamation',
            'info': 'fa-circle-info',
            'success': 'fa-circle-check'
        };
        return icons[type] || 'fa-bell';
    },
    
    // Obtener color según tipo
    getColor: function(type) {
        const colors = {
            'critical': 'red',
            'warning': 'yellow',
            'info': 'blue',
            'success': 'green'
        };
        return colors[type] || 'gray';
    },
    
    // Formatear timestamp
    formatTimestamp: function(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Ahora';
        if (minutes < 60) return `Hace ${minutes} min`;
        if (hours < 24) return `Hace ${hours}h`;
        if (days === 1) return 'Ayer';
        if (days < 7) return `Hace ${days} días`;
        
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Mostrar toast notification
    showToast: function(notification) {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 glass rounded-lg shadow-2xl p-4 max-w-sm animate-slide-in-right`;
        
        const color = this.getColor(notification.type);
        const icon = this.getIcon(notification.type);
        
        toast.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center">
                        <i class="fas ${icon} text-${color}-600"></i>
                    </div>
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-semibold text-gray-900">${notification.title}</p>
                    <p class="mt-1 text-sm text-gray-600">${notification.message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    },
    
    // Renderizar panel de notificaciones
    renderPanel: function() {
        const notifications = this.getAll().slice(0, 10); // Últimas 10
        const unreadCount = this.getUnreadCount();
        
        return `
            <div class="bg-white rounded-lg shadow-lg w-96 max-h-96 overflow-hidden">
                <!-- Header -->
                <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Notificaciones
                        ${unreadCount > 0 ? `<span class="ml-2 text-sm font-normal text-gray-500">(${unreadCount} nuevas)</span>` : ''}
                    </h3>
                    <div class="flex items-center space-x-2">
                        ${unreadCount > 0 ? `
                            <button 
                                onclick="NotificationsModule.markAllAsRead(); App.renderNotificationsPanel();"
                                class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Marcar todas
                            </button>
                        ` : ''}
                        <button 
                            onclick="NotificationsModule.clearRead(); App.renderNotificationsPanel();"
                            class="text-sm text-gray-600 hover:text-gray-800"
                            title="Limpiar leídas"
                        >
                            <i class="fas fa-broom"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Notifications List -->
                <div class="overflow-y-auto max-h-80">
                    ${notifications.length === 0 ? `
                        <div class="p-8 text-center">
                            <i class="fas fa-bell-slash text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">No hay notificaciones</p>
                        </div>
                    ` : notifications.map(notification => {
                        const color = this.getColor(notification.type);
                        const icon = this.getIcon(notification.type);
                        
                        return `
                            <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition ${!notification.read ? 'bg-blue-50' : ''}">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center">
                                            <i class="fas ${icon} text-${color}-600"></i>
                                        </div>
                                    </div>
                                    <div class="ml-3 flex-1 min-w-0">
                                        <p class="text-sm font-semibold text-gray-900 ${!notification.read ? 'font-bold' : ''}">
                                            ${notification.title}
                                        </p>
                                        <p class="text-sm text-gray-600 mt-1">
                                            ${notification.message}
                                        </p>
                                        <p class="text-xs text-gray-400 mt-1">
                                            ${this.formatTimestamp(notification.timestamp)}
                                        </p>
                                    </div>
                                    <div class="ml-2 flex-shrink-0 flex items-center space-x-1">
                                        ${!notification.read ? `
                                            <button 
                                                onclick="NotificationsModule.markAsRead('${notification.id}'); App.renderNotificationsPanel();"
                                                class="text-blue-600 hover:text-blue-800 p-1"
                                                title="Marcar como leída"
                                            >
                                                <i class="fas fa-check text-xs"></i>
                                            </button>
                                        ` : ''}
                                        <button 
                                            onclick="NotificationsModule.delete('${notification.id}'); App.renderNotificationsPanel();"
                                            class="text-gray-400 hover:text-red-600 p-1"
                                            title="Eliminar"
                                        >
                                            <i class="fas fa-times text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <!-- Footer -->
                ${notifications.length > 0 ? `
                    <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                        <a href="#notificaciones" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Ver todas las notificaciones
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    }
};

// Función para mostrar notificación de éxito
function showSuccessNotification(title, message) {
    NotificationsModule.add('success', title, message);
}

// Función para mostrar notificación de error
function showErrorNotification(title, message) {
    NotificationsModule.add('critical', title, message);
}

// Función para mostrar notificación de advertencia
function showWarningNotification(title, message) {
    NotificationsModule.add('warning', title, message);
}

// Función para mostrar notificación de info
function showInfoNotification(title, message) {
    NotificationsModule.add('info', title, message);
}

console.log('✅ Módulo de notificaciones cargado');
