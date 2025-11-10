// ============================================
// SAP INTEGRATION MODULE - LogiFlow Pro
// ============================================

const SAPModule = {
    syncStatus: 'connected',
    lastSync: new Date().toISOString(),
    
    render: function() {
        return `
            <div class="space-y-6 animate-fade-in">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Integración SAP</h1>
                    <p class="text-gray-600 mt-1">Sincronización bidireccional con SAP ERP</p>
                </div>
                
                <!-- Connection Status -->
                <div class="glass rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-900">Estado de Conexión</h2>
                        <span class="status-badge bg-green-100 text-green-800">
                            <i class="fas fa-circle mr-1"></i>Conectado
                        </span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">Última Sincronización</p>
                            <p class="font-semibold text-gray-900">${NotificationsModule.formatTimestamp(this.lastSync)}</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">Órdenes Sincronizadas</p>
                            <p class="font-semibold text-gray-900">${ORDENES_CARGA.length} / ${ORDENES_CARGA.length}</p>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">Latencia Promedio</p>
                            <p class="font-semibold text-gray-900">45ms</p>
                        </div>
                    </div>
                    <button onclick="SAPModule.syncNow()" class="mt-4 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition">
                        <i class="fas fa-sync mr-2"></i>Sincronizar Ahora
                    </button>
                </div>
                
                <!-- Sync Logs -->
                <div class="glass rounded-xl p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Registro de Sincronización</h2>
                    <div class="space-y-3">
                        ${this.renderSyncLog('Órdenes de carga actualizadas', '2024-01-17T10:30:00', 'success', '127 registros')}
                        ${this.renderSyncLog('Datos maestros de clientes sincronizados', '2024-01-17T09:15:00', 'success', '45 registros')}
                        ${this.renderSyncLog('Estado de expediciones actualizado', '2024-01-17T08:00:00', 'success', '6 registros')}
                        ${this.renderSyncLog('Productos del catálogo sincronizados', '2024-01-16T18:30:00', 'success', '189 registros')}
                    </div>
                </div>
                
                <!-- API Endpoints -->
                <div class="glass rounded-xl p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Endpoints API</h2>
                    <div class="space-y-2 text-sm">
                        ${this.renderEndpoint('GET', '/api/sap/orders', 'Obtener órdenes de carga')}
                        ${this.renderEndpoint('POST', '/api/sap/orders', 'Crear nueva orden')}
                        ${this.renderEndpoint('PUT', '/api/sap/orders/{id}', 'Actualizar orden')}
                        ${this.renderEndpoint('GET', '/api/sap/products', 'Obtener catálogo de productos')}
                        ${this.renderEndpoint('GET', '/api/sap/clients', 'Obtener datos de clientes')}
                        ${this.renderEndpoint('POST', '/api/sap/sync', 'Sincronización manual')}
                    </div>
                </div>
            </div>
        `;
    },
    
    renderSyncLog: function(message, timestamp, status, details) {
        const icons = {
            'success': 'fa-check-circle text-green-600',
            'error': 'fa-times-circle text-red-600',
            'warning': 'fa-exclamation-triangle text-yellow-600'
        };
        
        return `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                    <i class="fas ${icons[status]} mr-3"></i>
                    <div>
                        <p class="font-medium text-gray-900">${message}</p>
                        <p class="text-xs text-gray-500">${NotificationsModule.formatTimestamp(timestamp)} - ${details}</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderEndpoint: function(method, path, description) {
        const methodColors = {
            'GET': 'bg-blue-100 text-blue-800',
            'POST': 'bg-green-100 text-green-800',
            'PUT': 'bg-yellow-100 text-yellow-800',
            'DELETE': 'bg-red-100 text-red-800'
        };
        
        return `
            <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <span class="status-badge ${methodColors[method]} mr-3">${method}</span>
                <div class="flex-1">
                    <code class="font-mono text-xs text-gray-900">${path}</code>
                    <p class="text-xs text-gray-600 mt-1">${description}</p>
                </div>
            </div>
        `;
    },
    
    syncNow: function() {
        showInfoNotification('Sincronizando...', 'Conectando con SAP...');
        
        setTimeout(() => {
            this.lastSync = new Date().toISOString();
            showSuccessNotification('Sincronización completa', 'Todos los datos están actualizados');
            App.navigate('#sap');
        }, 2000);
    }
};

console.log('✅ Módulo SAP cargado');
