// ============================================
// CARGAS MODULE - LogiFlow Pro
// ============================================

const CargasModule = {
    currentFilter: 'all',
    
    render: function() {
        return `
            <div class="space-y-6 animate-fade-in">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Órdenes de Carga</h1>
                        <p class="text-gray-600 mt-1">Gestión completa de cargas y albaranes digitales</p>
                    </div>
                    ${AuthModule.hasPermission('create_orders') ? `
                        <button onclick="CargasModule.showNewOrderModal()" class="px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition">
                            <i class="fas fa-plus mr-2"></i>Nueva Orden
                        </button>
                    ` : ''}
                </div>
                
                <!-- Filters -->
                <div class="glass rounded-xl p-4">
                    <div class="flex items-center space-x-3">
                        <button onclick="CargasModule.setFilter('all')" class="px-4 py-2 ${this.currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Todas (${ORDENES_CARGA.length})
                        </button>
                        <button onclick="CargasModule.setFilter('pending')" class="px-4 py-2 ${this.currentFilter === 'pending' ? 'bg-gray-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Pendientes (${ORDENES_CARGA.filter(o => o.status === 'pending').length})
                        </button>
                        <button onclick="CargasModule.setFilter('loading')" class="px-4 py-2 ${this.currentFilter === 'loading' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Cargando (${ORDENES_CARGA.filter(o => o.status === 'loading').length})
                        </button>
                        <button onclick="CargasModule.setFilter('in_route')" class="px-4 py-2 ${this.currentFilter === 'in_route' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            En Ruta (${ORDENES_CARGA.filter(o => o.status === 'in_route').length})
                        </button>
                        <button onclick="CargasModule.setFilter('completed')" class="px-4 py-2 ${this.currentFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Completadas (${ORDENES_CARGA.filter(o => o.status === 'completed').length})
                        </button>
                    </div>
                </div>
                
                <!-- Orders Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${this.renderOrdersGrid()}
                </div>
            </div>
        `;
    },
    
    setFilter: function(filter) {
        this.currentFilter = filter;
        App.navigate('#ordenes');
    },
    
    renderOrdersGrid: function() {
        let orders = ORDENES_CARGA;
        if (this.currentFilter !== 'all') {
            orders = orders.filter(o => o.status === this.currentFilter);
        }
        
        if (orders.length === 0) {
            return `
                <div class="col-span-2 glass rounded-xl p-12 text-center">
                    <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600 text-lg">No hay órdenes con este filtro</p>
                </div>
            `;
        }
        
        return orders.map(order => this.renderOrderCard(order)).join('');
    },
    
    renderOrderCard: function(order) {
        const statusColors = {
            'completed': 'green',
            'in_route': 'blue',
            'loading': 'yellow',
            'pending': 'gray',
            'awaiting_truck': 'red'
        };
        const statusLabels = {
            'completed': 'Completada',
            'in_route': 'En Ruta',
            'loading': 'Cargando',
            'pending': 'Pendiente',
            'awaiting_truck': 'Sin Camión'
        };
        
        const priorityColors = {
            'critical': 'red',
            'high': 'orange',
            'normal': 'blue',
            'low': 'gray'
        };
        
        return `
            <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="CargasModule.showOrderDetails('${order.id}')">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                            <h3 class="text-lg font-bold text-gray-900">${order.id}</h3>
                            <span class="status-badge bg-${statusColors[order.status]}-100 text-${statusColors[order.status]}-800">
                                ${statusLabels[order.status]}
                            </span>
                            <span class="status-badge bg-${priorityColors[order.priority]}-100 text-${priorityColors[order.priority]}-800">
                                ${order.priority}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600">${order.sapOrderNumber}</p>
                    </div>
                </div>
                
                <!-- Client -->
                <div class="mb-4">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-building text-blue-600 mr-2"></i>
                        <span class="font-semibold text-gray-900">${order.clientName}</span>
                    </div>
                    <div class="flex items-start text-sm text-gray-600">
                        <i class="fas fa-map-marker-alt text-gray-400 mr-2 mt-1"></i>
                        <span>${order.destination}</span>
                    </div>
                </div>
                
                <!-- Transportista -->
                <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-truck text-green-600 mr-2"></i>
                            <div>
                                <p class="font-semibold text-gray-900 text-sm">
                                    ${order.transportista ? order.transportista.company : '<span class="text-red-600">Sin asignar</span>'}
                                </p>
                                ${order.driver ? `<p class="text-xs text-gray-600">${order.driver.name} - ${order.vehicle.plate}</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Products -->
                <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-boxes mr-2"></i>${order.products.length} productos - ${order.totalWeight} kg
                    </p>
                    <div class="text-xs text-gray-600">
                        ${order.products.slice(0, 2).map(p => `
                            <div class="flex items-center justify-between py-1">
                                <span>${p.description}</span>
                                <span class="font-medium">${p.quantity} ${p.unit}</span>
                            </div>
                        `).join('')}
                        ${order.products.length > 2 ? `<p class="text-gray-500 mt-1">+${order.products.length - 2} más...</p>` : ''}
                    </div>
                </div>
                
                <!-- Schedule -->
                <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-calendar mr-2"></i>
                        ${new Date(order.scheduledDate).toLocaleDateString('es-ES')} ${order.scheduledTime}
                    </div>
                    <button onclick="event.stopPropagation(); CargasModule.showOrderDetails('${order.id}')" class="text-blue-600 hover:text-blue-800 font-medium">
                        Ver detalles <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>
            </div>
        `;
    },
    
    showOrderDetails: function(orderId) {
        const order = ORDENES_CARGA.find(o => o.id === orderId);
        if (!order) return;
        
        App.showModal(`Orden: ${order.id}`, `
            <div class="space-y-6 max-h-96 overflow-y-auto">
                <!-- Basic Info -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Cliente</label>
                        <p class="text-gray-900">${order.clientName}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">SAP Order</label>
                        <p class="text-gray-900">${order.sapOrderNumber}</p>
                    </div>
                </div>
                
                <!-- Products -->
                <div>
                    <h3 class="font-semibold text-gray-900 mb-2">Productos</h3>
                    <div class="space-y-2">
                        ${order.products.map(p => `
                            <div class="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <p class="font-medium">${p.description}</p>
                                    <p class="text-sm text-gray-600">${p.sku}</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold">${p.quantity} ${p.unit}</p>
                                    <p class="text-sm text-gray-600">${p.weight} kg</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Photos -->
                ${order.photos.length > 0 ? `
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-2">Fotos</h3>
                        <div class="grid grid-cols-3 gap-2">
                            ${order.photos.map(p => `
                                <img src="${p.url}" alt="${p.description}" class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition" onclick="window.open('${p.url}')">
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Actions -->
                <div class="flex space-x-3">
                    ${order.status === 'pending' && AuthModule.hasPermission('assign_resources') ? `
                        <button onclick="CargasModule.assignTruck('${order.id}')" class="flex-1 px-4 py-2 gradient-success text-white rounded-lg">
                            Asignar Camión
                        </button>
                    ` : ''}
                    ${order.status === 'completed' && order.documents.length > 0 ? `
                        <button onclick="CargasModule.downloadDocuments('${order.id}')" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">
                            Descargar Albarán
                        </button>
                    ` : ''}
                    <button onclick="App.closeModal()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                        Cerrar
                    </button>
                </div>
            </div>
        `, 'max-w-4xl');
    },
    
    showNewOrderModal: function() {
        showInfoNotification('Función en desarrollo', 'La creación de órdenes estará disponible próximamente');
    },
    
    assignTruck: function(orderId) {
        showSuccessNotification('Camión asignado', 'Se ha notificado al transportista');
        App.closeModal();
    },
    
    downloadDocuments: function(orderId) {
        showInfoNotification('Descarga iniciada', 'Generando documento PDF...');
    }
};

console.log('✅ Módulo de cargas cargado');
