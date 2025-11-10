// ============================================
// TRANSPORTISTAS MODULE - LogiFlow Pro
// ============================================

const TransportistasModule = {
    render: function() {
        return `
            <div class="space-y-6 animate-fade-in">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Gestión de Transportistas</h1>
                        <p class="text-gray-600 mt-1">Alta, seguimiento y evaluación de transportistas</p>
                    </div>
                    <button onclick="TransportistasModule.showNewModal()" class="px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition">
                        <i class="fas fa-plus mr-2"></i>Nuevo Transportista
                    </button>
                </div>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${TRANSPORTISTAS.length}</p>
                                <p class="text-sm text-gray-600">Total</p>
                            </div>
                            <i class="fas fa-truck text-3xl text-blue-600"></i>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-green-600">${TRANSPORTISTAS.filter(t => t.status === 'active').length}</p>
                                <p class="text-sm text-gray-600">Activos</p>
                            </div>
                            <i class="fas fa-check-circle text-3xl text-green-600"></i>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-yellow-600">${TRANSPORTISTAS.filter(t => t.status === 'pending').length}</p>
                                <p class="text-sm text-gray-600">Pendientes</p>
                            </div>
                            <i class="fas fa-clock text-3xl text-yellow-600"></i>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-red-600">${TRANSPORTISTAS.filter(t => t.status === 'blocked').length}</p>
                                <p class="text-sm text-gray-600">Bloqueados</p>
                            </div>
                            <i class="fas fa-ban text-3xl text-red-600"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Transportistas Table -->
                <div class="glass rounded-xl p-6">
                    ${this.renderTable()}
                </div>
            </div>
        `;
    },
    
    renderTable: function() {
        return `
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Empresa</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">CIF</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rating</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Entregas</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Puntualidad</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${TRANSPORTISTAS.map(t => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3">
                                    <div>
                                        <p class="font-medium text-gray-900">${t.company}</p>
                                        <p class="text-xs text-gray-500">${t.contact.name}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-600">${t.cif}</td>
                                <td class="px-4 py-3">
                                    <span class="status-badge ${t.status === 'active' ? 'bg-green-100 text-green-800' : t.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                                        ${t.status}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center">
                                        <i class="fas fa-star text-yellow-500 mr-1"></i>
                                        <span class="font-semibold">${t.rating}</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-600">${t.totalDeliveries.toLocaleString()}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center">
                                        <div class="flex-1 progress-bar mr-2">
                                            <div class="progress-fill" style="width: ${t.onTimePercentage}%"></div>
                                        </div>
                                        <span class="text-sm font-semibold">${t.onTimePercentage}%</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3">
                                    <button onclick="TransportistasModule.showDetails('${t.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="TransportistasModule.showEdit('${t.id}')" class="text-green-600 hover:text-green-800">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    
    showDetails: function(id) {
        const t = TRANSPORTISTAS.find(tr => tr.id === id);
        if (!t) return;
        
        App.showModal(`Detalles: ${t.company}`, `
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Empresa</label>
                        <p class="text-gray-900">${t.company}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">CIF</label>
                        <p class="text-gray-900">${t.cif}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Rating</label>
                        <p class="text-gray-900"><i class="fas fa-star text-yellow-500"></i> ${t.rating}/5.0</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
                        <span class="status-badge ${t.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${t.status}</span>
                    </div>
                </div>
                
                <div>
                    <h3 class="font-semibold text-gray-900 mb-2">Conductores</h3>
                    <div class="space-y-2">
                        ${t.drivers.map(d => `
                            <div class="p-3 bg-gray-50 rounded-lg">
                                <p class="font-medium">${d.name}</p>
                                <p class="text-sm text-gray-600">Licencia: ${d.license} | Vehículo: ${d.vehicle}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <h3 class="font-semibold text-gray-900 mb-2">Vehículos</h3>
                    <div class="space-y-2">
                        ${t.vehicles.map(v => `
                            <div class="p-3 bg-gray-50 rounded-lg">
                                <p class="font-medium">${v.plate} - ${v.type}</p>
                                <p class="text-sm text-gray-600">Capacidad: ${v.capacity} | Estado: ${v.status}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button onclick="App.closeModal()" class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Cerrar
                </button>
            </div>
        `);
    },
    
    showNewModal: function() {
        showInfoNotification('Función en desarrollo', 'El formulario de alta de transportistas estará disponible próximamente');
    },
    
    showEdit: function(id) {
        showInfoNotification('Función en desarrollo', 'La edición de transportistas estará disponible próximamente');
    }
};

console.log('✅ Módulo de transportistas cargado');