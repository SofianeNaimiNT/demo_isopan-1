// ============================================
// INCIDENCIAS MODULE - LogiFlow Pro
// ============================================

const IncidenciasModule = {
    currentFilter: 'all',
    
    render: function() {
        return `
            <div class="space-y-6 animate-fade-in">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Gestión de Incidencias</h1>
                        <p class="text-gray-600 mt-1">Seguimiento y resolución de incidencias</p>
                    </div>
                    <button onclick="IncidenciasModule.showNewModal()" class="px-4 py-2 gradient-danger text-white rounded-lg hover:shadow-lg transition">
                        <i class="fas fa-plus mr-2"></i>Nueva Incidencia
                    </button>
                </div>
                
                <!-- Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${INCIDENCIAS.length}</p>
                                <p class="text-sm text-gray-600\">Total</p>
                            </div>
                            <i class="fas fa-exclamation-triangle text-3xl text-gray-600"></i>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-red-600">${INCIDENCIAS.filter(i => i.status === 'open').length}</p>
                                <p class="text-sm text-gray-600">Abiertas</p>
                            </div>
                            <i class="fas fa-circle-exclamation text-3xl text-red-600"></i>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-yellow-600">${INCIDENCIAS.filter(i => i.status === 'in_progress').length}</p>
                                <p class="text-sm text-gray-600">En Proceso</p>
                            </div>
                            <i class="fas fa-spinner text-3xl text-yellow-600"></i>
                        </div>
                    </div>
                    <div class="glass rounded-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-bold text-green-600">${INCIDENCIAS.filter(i => i.status === 'resolved').length}</p>
                                <p class="text-sm text-gray-600">Resueltas</p>
                            </div>
                            <i class="fas fa-check-circle text-3xl text-green-600"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Filters -->
                <div class="glass rounded-xl p-4">
                    <div class="flex items-center space-x-3 flex-wrap gap-2">
                        <button onclick="IncidenciasModule.setFilter('all')" class="px-4 py-2 ${this.currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Todas
                        </button>
                        <button onclick="IncidenciasModule.setFilter('open')" class="px-4 py-2 ${this.currentFilter === 'open' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Abiertas
                        </button>
                        <button onclick="IncidenciasModule.setFilter('in_progress')" class="px-4 py-2 ${this.currentFilter === 'in_progress' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            En Proceso
                        </button>
                        <button onclick="IncidenciasModule.setFilter('resolved')" class="px-4 py-2 ${this.currentFilter === 'resolved' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'} rounded-lg transition">
                            Resueltas
                        </button>
                    </div>
                </div>
                
                <!-- Incidencias List -->
                <div class="space-y-4">
                    ${this.renderIncidenciasList()}
                </div>
            </div>
        `;
    },
    
    setFilter: function(filter) {
        this.currentFilter = filter;
        App.navigate('#incidencias');
    },
    
    renderIncidenciasList: function() {
        let incidencias = INCIDENCIAS;
        if (this.currentFilter !== 'all') {
            incidencias = incidencias.filter(i => i.status === this.currentFilter);
        }
        
        if (incidencias.length === 0) {
            return `
                <div class="glass rounded-xl p-12 text-center">
                    <i class="fas fa-check-circle text-6xl text-green-300 mb-4"></i>
                    <p class="text-gray-600 text-lg">No hay incidencias con este filtro</p>
                </div>
            `;
        }
        
        return incidencias.map(inc => this.renderIncidenciaCard(inc)).join('');
    },
    
    renderIncidenciaCard: function(inc) {
        const priorityColors = {
            'critical': 'red',
            'high': 'orange',
            'medium': 'yellow',
            'low': 'blue'
        };
        
        const statusColors = {
            'open': 'red',
            'in_progress': 'yellow',
            'resolved': 'green',
            'closed': 'gray'
        };
        
        const typeIcons = {
            'logistics': 'fa-truck',
            'expedition': 'fa-box',
            'transport': 'fa-route',
            'client': 'fa-user'
        };
        
        return `
            <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="IncidenciasModule.showDetails('${inc.id}')">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                            <i class="fas ${typeIcons[inc.type]} text-gray-600"></i>
                            <h3 class="text-lg font-bold text-gray-900">${inc.title}</h3>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="status-badge bg-${priorityColors[inc.priority]}-100 text-${priorityColors[inc.priority]}-800">
                                ${inc.priority}
                            </span>
                            <span class="status-badge bg-${statusColors[inc.status]}-100 text-${statusColors[inc.status]}-800">
                                ${inc.status}
                            </span>
                            <span class="text-sm text-gray-500">${inc.orderId}</span>
                        </div>
                    </div>
                </div>
                
                <p class="text-gray-600 text-sm mb-4">${inc.description}</p>
                
                <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-4 text-gray-500">
                        <span><i class="fas fa-comments mr-1"></i>${inc.comments.length}</span>
                        ${inc.photos.length > 0 ? `<span><i class="fas fa-image mr-1"></i>${inc.photos.length}</span>` : ''}
                        <span><i class="fas fa-clock mr-1"></i>${NotificationsModule.formatTimestamp(inc.reportedAt)}</span>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800 font-medium">
                        Ver detalles <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>
            </div>
        `;
    },
    
    showDetails: function(incId) {
        const inc = INCIDENCIAS.find(i => i.id === incId);
        if (!inc) return;
        
        App.showModal(`Incidencia: ${inc.id}`, `
            <div class="space-y-6 max-h-96 overflow-y-auto">
                <!-- Header -->
                <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${inc.title}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="status-badge">${inc.priority}</span>
                        <span class="status-badge">${inc.status}</span>
                        <span class="text-sm text-gray-500">${inc.orderId}</span>
                    </div>
                </div>
                
                <!-- Description -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                    <p class="text-gray-900">${inc.description}</p>
                </div>
                
                <!-- Photos -->
                ${inc.photos.length > 0 ? `
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Fotos</label>
                        <div class="grid grid-cols-3 gap-2">
                            ${inc.photos.map(p => `
                                <img src="${p.url}" alt="${p.description}" class="w-full h-24 object-cover rounded-lg">
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Comments -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Historial de Comentarios</label>
                    <div class="space-y-3 max-h-48 overflow-y-auto">
                        ${inc.comments.map(c => {
                            const user = USERS.find(u => u.id === c.user);
                            return `
                                <div class="p-3 bg-gray-50 rounded-lg">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="font-semibold text-sm text-gray-900">${user ? user.name : 'Usuario'}</span>
                                        <span class="text-xs text-gray-500">${NotificationsModule.formatTimestamp(c.timestamp)}</span>
                                    </div>
                                    <p class="text-sm text-gray-600">${c.text}</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Add Comment -->
                ${inc.status !== 'resolved' && inc.status !== 'closed' ? `
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Añadir Comentario</label>
                        <textarea id="newComment" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Escribe un comentario..."></textarea>
                        <button onclick="IncidenciasModule.addComment('${inc.id}')" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-paper-plane mr-2"></i>Enviar
                        </button>
                    </div>
                ` : ''}
                
                <!-- Actions -->
                <div class="flex space-x-3">
                    ${inc.status === 'open' && AuthModule.hasPermission('manage_transportistas') ? `
                        <button onclick="IncidenciasModule.changeStatus('${inc.id}', 'in_progress')" class="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg">
                            Tomar en Proceso
                        </button>
                    ` : ''}
                    ${inc.status === 'in_progress' && AuthModule.hasPermission('manage_transportistas') ? `
                        <button onclick="IncidenciasModule.changeStatus('${inc.id}', 'resolved')" class="flex-1 px-4 py-2 gradient-success text-white rounded-lg">
                            Marcar Resuelta
                        </button>
                    ` : ''}
                    <button onclick="App.closeModal()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                        Cerrar
                    </button>
                </div>
            </div>
        `, 'max-w-2xl');
    },
    
    showNewModal: function() {
        App.showModal('Nueva Incidencia', `
            <form id="newIncidentForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Orden Relacionada</label>
                    <select name="orderId" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                        <option value="">Seleccione una orden...</option>
                        ${ORDENES_CARGA.map(o => `
                            <option value="${o.id}">${o.id} - ${o.clientName}</option>
                        `).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                    <select name="type" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                        <option value="logistics">Logística</option>
                        <option value="expedition">Expedición</option>
                        <option value="transport">Transporte</option>
                        <option value="client">Cliente</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Prioridad</label>
                    <select name="priority" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                        <option value="critical">Crítica</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Título</label>
                    <input type="text" name="title" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required placeholder="Título breve de la incidencia">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                    <textarea name="description" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required placeholder="Describe la incidencia en detalle..."></textarea>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 px-4 py-2 gradient-danger text-white rounded-lg">
                        <i class="fas fa-plus mr-2"></i>Crear Incidencia
                    </button>
                    <button type="button" onclick="App.closeModal()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                        Cancelar
                    </button>
                </div>
            </form>
        `);
        
        document.getElementById('newIncidentForm').onsubmit = (e) => {
            e.preventDefault();
            showSuccessNotification('Incidencia creada', 'La incidencia ha sido registrada y asignada');
            App.closeModal();
            App.navigate('#incidencias');
        };
    },
    
    addComment: function(incId) {
        const text = document.getElementById('newComment').value;
        if (!text.trim()) return;
        
        showSuccessNotification('Comentario añadido', 'El comentario ha sido guardado');
        App.closeModal();
        setTimeout(() => this.showDetails(incId), 300);
    },
    
    changeStatus: function(incId, newStatus) {
        const inc = INCIDENCIAS.find(i => i.id === incId);
        if (inc) {
            inc.status = newStatus;
            INCIDENCIAS.find(i => i.id === incId).status = newStatus;
            showSuccessNotification('Estado actualizado', `La incidencia ha sido marcada como ${newStatus}`);
            App.closeModal();
            App.navigate('#incidencias');
        }
    }
};

console.log('✅ Módulo de incidencias cargado');
