// ============================================
// OPERARIOS MODULE - LogiFlow Pro (Vista Móvil)
// ============================================

const OperariosModule = {
    render: function() {
        const user = AuthModule.getCurrentUser();
        const myOrders = ORDENES_CARGA.filter(o => 
            o.assignedOperators && o.assignedOperators.includes(user.id)
        );
        
        return `
            <div class="space-y-4 animate-fade-in">
                <!-- Header Mobile -->
                <div class="glass rounded-xl p-4">
                    <h1 class="text-2xl font-bold text-gray-900">Mis Cargas</h1>
                    <p class="text-sm text-gray-600 mt-1">Operario: ${user.name}</p>
                </div>
                
                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="glass rounded-xl p-4">
                        <div class="text-center">
                            <p class="text-3xl font-bold text-blue-600">${myOrders.filter(o => o.status === 'pending').length}</p>
                            <p class="text-sm text-gray-600 mt-1">Pendientes</p>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-4">
                        <div class="text-center">
                            <p class="text-3xl font-bold text-green-600">${myOrders.filter(o => o.status === 'completed').length}</p>
                            <p class="text-sm text-gray-600 mt-1">Completadas</p>
                        </div>
                    </div>
                </div>
                
                <!-- Orders List -->
                <div class="space-y-4">
                    ${myOrders.length === 0 ? `
                        <div class="glass rounded-xl p-8 text-center">
                            <i class="fas fa-clipboard-check text-5xl text-gray-300 mb-3"></i>
                            <p class="text-gray-600">No tienes cargas asignadas</p>
                        </div>
                    ` : myOrders.map(order => this.renderMobileOrderCard(order)).join('')}
                </div>
            </div>
        `;
    },
    
    renderMobileOrderCard: function(order) {
        const statusColors = {
            'completed': 'green',
            'loading': 'yellow',
            'pending': 'gray'
        };
        
        return `
            <div class="glass rounded-xl p-4" onclick="OperariosModule.showOrderWorkflow('${order.id}')">
                <div class="flex items-start justify-between mb-3">
                    <div>
                        <h3 class="font-bold text-gray-900">${order.id}</h3>
                        <p class="text-sm text-gray-600">${order.clientName}</p>
                    </div>
                    <span class="status-badge bg-${statusColors[order.status]}-100 text-${statusColors[order.status]}-800">
                        ${order.status}
                    </span>
                </div>
                
                <!-- Progress -->
                <div class="mb-3">
                    <div class="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>${this.calculateProgress(order)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.calculateProgress(order)}%"></div>
                    </div>
                </div>
                
                <!-- Info -->
                <div class="space-y-2 text-sm">
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-truck mr-2"></i>
                        ${order.vehicle ? order.vehicle.plate : 'Sin asignar'}
                    </div>
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-clock mr-2"></i>
                        ${order.scheduledTime}
                    </div>
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-boxes mr-2"></i>
                        ${order.products.length} productos
                    </div>
                </div>
                
                <button class="w-full mt-3 px-4 py-2 gradient-primary text-white rounded-lg text-sm">
                    ${order.status === 'pending' ? 'Iniciar Carga' : 'Ver Detalles'}
                </button>
            </div>
        `;
    },
    
    calculateProgress: function(order) {
        const totalChecks = 4;
        let completed = 0;
        if (order.checklist.structuralCheck.completed) completed++;
        if (order.checklist.accessoriesCheck.completed) completed++;
        if (order.checklist.safetyCheck.completed) completed++;
        if (order.checklist.documentationCheck.completed) completed++;
        return Math.round((completed / totalChecks) * 100);
    },
    
    showOrderWorkflow: function(orderId) {
        const order = ORDENES_CARGA.find(o => o.id === orderId);
        if (!order) return;
        
        App.showModal(`Carga: ${order.id}`, `
            <div class="space-y-4">
                <!-- Checklist -->
                <div>
                    <h3 class="font-semibold text-gray-900 mb-3">Checklist de Carga</h3>
                    <div class="space-y-2">
                        ${this.renderCheckItem('Verificación estructural', order.checklist.structuralCheck)}
                        ${this.renderCheckItem('Verificación accesorios', order.checklist.accessoriesCheck)}
                        ${this.renderCheckItem('Verificación seguridad', order.checklist.safetyCheck)}
                        ${this.renderCheckItem('Verificación documentación', order.checklist.documentationCheck)}
                    </div>
                </div>
                
                <!-- Actions -->
                <div class="space-y-2">
                    <button onclick="OperariosModule.capturePhoto('${order.id}')" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                        <i class="fas fa-camera mr-2"></i>Tomar Foto
                    </button>
                    <button onclick="OperariosModule.reportIncident('${order.id}')" class="w-full px-4 py-2 bg-orange-600 text-white rounded-lg">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Reportar Incidencia
                    </button>
                    ${order.status === 'loading' ? `
                        <button onclick="OperariosModule.completeLoading('${order.id}')" class="w-full px-4 py-2 gradient-success text-white rounded-lg">
                            <i class="fas fa-check-circle mr-2"></i>Finalizar Carga
                        </button>
                    ` : ''}
                </div>
                
                <button onclick="App.closeModal()" class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                    Cerrar
                </button>
            </div>
        `);
    },
    
    renderCheckItem: function(label, check) {
        return `
            <div class="flex items-center justify-between p-3 ${check.completed ? 'bg-green-50' : 'bg-gray-50'} rounded-lg">
                <span class="text-sm font-medium text-gray-700">${label}</span>
                ${check.completed ? 
                    '<i class="fas fa-check-circle text-green-600 text-xl"></i>' : 
                    '<i class="far fa-circle text-gray-400 text-xl"></i>'
                }
            </div>
        `;
    },
    
    capturePhoto: function(orderId) {
        showSuccessNotification('Foto capturada', 'La imagen ha sido guardada correctamente');
        App.closeModal();
    },
    
    reportIncident: function(orderId) {
        window.location.hash = '#incidencias/new?order=' + orderId;
        App.closeModal();
    },
    
    completeLoading: function(orderId) {
        showSuccessNotification('Carga completada', 'La orden ha sido marcada como lista para salida');
        App.closeModal();
    }
};

console.log('✅ Módulo de operarios cargado');
