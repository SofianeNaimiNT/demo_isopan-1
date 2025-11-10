// ============================================
// CALENDAR MODULE - LogiFlow Pro
// ============================================

const CalendarModule = {
    calendar: null,
    
    // Renderizar módulo de calendario
    render: function() {
        return `
            <div class="space-y-6 animate-fade-in">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Calendario de Citas</h1>
                        <p class="text-gray-600 mt-1">Gestión de citas con transportistas</p>
                    </div>
                    <button onclick="CalendarModule.showNewAppointmentModal()" class="px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition">
                        <i class="fas fa-plus mr-2"></i>Nueva Cita
                    </button>
                </div>
                
                <div class="glass rounded-xl p-6">
                    <div id="calendar"></div>
                </div>
            </div>
        `;
    },
    
    // Inicializar calendario
    initCalendar: function() {
        setTimeout(() => {
            const calendarEl = document.getElementById('calendar');
            if (!calendarEl) return;
            
            this.calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                locale: 'es',
                events: CALENDAR_EVENTS,
                eventClick: (info) => {
                    this.showEventDetails(info.event);
                },
                height: 'auto'
            });
            
            this.calendar.render();
        }, 100);
    },
    
    // Mostrar detalles del evento
    showEventDetails: function(event) {
        const order = ORDENES_CARGA.find(o => o.id === event.extendedProps.orderId);
        if (!order) return;
        
        App.showModal('Detalles de la Cita', `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Orden</label>
                    <p class="text-gray-900">${order.id} - ${order.clientName}</p>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Transportista</label>
                    <p class="text-gray-900">${event.extendedProps.transportista}</p>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Fecha y Hora</label>
                    <p class="text-gray-900">${new Date(event.start).toLocaleString('es-ES')}</p>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
                    <span class="status-badge">${event.extendedProps.status}</span>
                </div>
                <div class="flex space-x-3 mt-6">
                    <button onclick="window.location.hash = '#ordenes/${order.id}'; App.closeModal();" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Ver Orden
                    </button>
                    <button onclick="App.closeModal()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                        Cerrar
                    </button>
                </div>
            </div>
        `);
    },
    
    // Mostrar modal nueva cita
    showNewAppointmentModal: function() {
        App.showModal('Nueva Cita con Transportista', `
            <form id="newAppointmentForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Orden</label>
                    <select name="orderId" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                        <option value="">Seleccione una orden...</option>
                        ${ORDENES_CARGA.filter(o => o.status === 'pending').map(o => `
                            <option value="${o.id}">${o.id} - ${o.clientName}</option>
                        `).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Transportista</label>
                    <select name="transportistaId" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                        <option value="">Seleccione un transportista...</option>
                        ${TRANSPORTISTAS.filter(t => t.status === 'active').map(t => `
                            <option value="${t.id}">${t.company}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
                        <input type="date" name="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Hora</label>
                        <input type="time" name="time" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                    </div>
                </div>
                <div class="flex space-x-3 mt-6">
                    <button type="submit" class="flex-1 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg">
                        <i class="fas fa-check mr-2"></i>Crear Cita
                    </button>
                    <button type="button" onclick="App.closeModal()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                        Cancelar
                    </button>
                </div>
            </form>
        `);
        
        document.getElementById('newAppointmentForm').onsubmit = (e) => {
            e.preventDefault();
            showSuccessNotification('Cita creada', 'La cita ha sido programada y se enviará notificación al transportista');
            App.closeModal();
        };
    }
};

console.log('✅ Módulo de calendario cargado');
