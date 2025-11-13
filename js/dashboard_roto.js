// ============================================
// DASHBOARD MODULE - LogiFlow Pro
// ============================================

const DashboardModule = {
    charts: {},
    refreshInterval: null,
    
    // Inicializar módulo
    init: function() {
        this.startRealTimeUpdates();
        console.log('✅ Módulo de dashboard inicializado');
    },
    
    // Iniciar actualizaciones en tiempo real
    startRealTimeUpdates: function() {
        // Actualizar cada 10 segundos
        this.refreshInterval = setInterval(() => {
            this.updateRealTimeData();
        }, 10000);
    },
    
    // Detener actualizaciones
    stopRealTimeUpdates: function() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    },
    
    // Actualizar datos en tiempo real
    updateRealTimeData: function() {
        // Simular cambios en tiempo real
        KPIS.today.trucksActive = Math.floor(Math.random() * 2) + 3;
        KPIS.today.trucksWaiting = Math.floor(Math.random() * 3);
        KPIS.today.incidentsOpen = Math.floor(Math.random() * 2) + 2;
        
        // Actualizar UI si estamos en el dashboard
        if (window.location.hash === '' || window.location.hash === '#dashboard') {
            this.render();
        }
    },
    
    // Renderizar dashboard
    render: function() {
        const user = AuthModule.getCurrentUser();
        
        return `
            <div class="space-y-6 animate-fade-in max-h-screen overflow-y-auto">

                <!-- Header -->
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Dashboard Supply Chain</h1>
                        <p class="text-gray-600 mt-1">Vista en tiempo real de operaciones logísticas</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <button onclick="DashboardModule.render()" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            <i class="fas fa-sync-alt mr-2"></i>Actualizar
                        </button>
                        <button onclick="DashboardModule.exportDashboard()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-download mr-2"></i>Exportar
                        </button>
                    </div>
                </div>
                
                <!-- KPI Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${this.renderKPICard(
                        'Órdenes Hoy',
                        KPIS.today.totalOrders,
                        'fa-box',
                        'blue',
                        `${KPIS.today.ordersCompleted} completadas`,
                        KPIS.trends.ordersVsLastMonth
                    )}
                    ${this.renderKPICard(
                        'Camiones Activos',
                        KPIS.today.trucksActive,
                        'fa-truck',
                        'green',
                        `${KPIS.today.trucksInRoute} en ruta`,
                        null
                    )}
                    ${this.renderKPICard(
                        'Incidencias Abiertas',
                        KPIS.today.incidentsOpen,
                        'fa-exclamation-triangle',
                        'red',
                        `${KPIS.today.incidentsCritical} críticas`,
                        KPIS.trends.incidentsVsLastMonth
                    )}
                    ${this.renderKPICard(
                        'Tiempo Medio Carga',
                        `${KPIS.today.avgLoadingTime}m`,
                        'fa-clock',
                        'orange',
                        'Últimas 24h',
                        KPIS.trends.loadingTimeVsLastMonth
                    )}
                </div>
                
                <!-- Charts Row -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Orders Status Chart -->
                    <div class="glass rounded-xl p-6 card-hover">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-pie mr-2 text-blue-600"></i>
                            Estado de Órdenes
                        </h3>
                         <canvas id="ordersStatusChart" class="w-full h-72"></canvas>
                    </div>
                    
                    <!-- Loading Times Chart -->
                    <div class="glass rounded-xl p-6 card-hover">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-line mr-2 text-green-600"></i>
                            Tiempos de Carga (Últimos 7 días)
                        </h3>
                        <canvas id="loadingTimesChart" class="w-full h-72" style="height: 300px;"></canvas>
                    </div>
                </div>
                
                <!-- Trucks Status and Recent Incidents -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Trucks Status -->
                    <div class="glass rounded-xl p-6 card-hover">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-truck-loading mr-2 text-orange-600"></i>
                            Estado de Camiones
                        </h3>
                        ${this.renderTrucksStatus()}
                    </div>
                    
                    <!-- Recent Incidents -->
                    <div class="glass rounded-xl p-6 card-hover">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-bell mr-2 text-red-600"></i>
                            Incidencias Recientes
                        </h3>
                        ${this.renderRecentIncidents()}
                    </div>
                </div>
                
                <!-- Recent Orders Table -->
                <div class="glass rounded-xl p-6 card-hover">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-list mr-2 text-purple-600"></i>
                            Órdenes Recientes
                        </h3>
                        <a href="#ordenes" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Ver todas <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                    ${this.renderRecentOrdersTable()}
                </div>
            </div>
        `;
    },
    
    // Renderizar tarjeta KPI
    renderKPICard: function(title, value, icon, color, subtitle, trend) {
        const trendColor = trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray';
        const trendIcon = trend > 0 ? 'fa-arrow-up' : trend < 0 ? 'fa-arrow-down' : 'fa-minus';
        
        return `
            <div class="glass rounded-xl p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center">
                        <i class="fas ${icon} text-2xl text-${color}-600"></i>
                    </div>
                    ${trend !== null ? `
                        <span class="flex items-center text-sm font-semibold text-${trendColor}-600">
                            <i class="fas ${trendIcon} mr-1"></i>
                            ${Math.abs(trend).toFixed(1)}%
                        </span>
                    ` : ''}
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">${value}</p>
                    <p class="text-sm text-gray-600 mt-1">${title}</p>
                    <p class="text-xs text-gray-500 mt-1">${subtitle}</p>
                </div>
            </div>
        `;
    },
    
    // Renderizar estado de camiones
    renderTrucksStatus: function() {
        const statuses = [
            { label: 'En Ruta', count: KPIS.today.trucksInRoute, color: 'green', icon: 'fa-truck-fast' },
            { label: 'Cargando', count: KPIS.today.trucksLoading, color: 'blue', icon: 'fa-truck-loading' },
            { label: 'En Espera', count: KPIS.today.trucksWaiting, color: 'yellow', icon: 'fa-clock' },
            { label: 'Total Activos', count: KPIS.today.trucksActive, color: 'gray', icon: 'fa-truck' }
        ];
        
        return `
            <div class="space-y-3">
                ${statuses.map(status => `
                    <div class="flex items-center justify-between p-3 bg-${status.color}-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-lg bg-${status.color}-100 flex items-center justify-center mr-3">
                                <i class="fas ${status.icon} text-${status.color}-600"></i>
                            </div>
                            <span class="font-medium text-gray-700">${status.label}</span>
                        </div>
                        <span class="text-2xl font-bold text-${status.color}-600">${status.count}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // Renderizar incidencias recientes
    renderRecentIncidents: function() {
        const recentIncidents = INCIDENCIAS.filter(i => i.status !== 'resolved').slice(0, 5);
        
        if (recentIncidents.length === 0) {
            return `
                <div class="text-center py-8">
                    <i class="fas fa-check-circle text-4xl text-green-500 mb-3"></i>
                    <p class="text-gray-600">No hay incidencias abiertas</p>
                </div>
            `;
        }
        
        return `
            <div class="space-y-3">
                ${recentIncidents.map(incident => {
                    const priorityColors = {
                        'critical': 'red',
                        'high': 'orange',
                        'medium': 'yellow',
                        'low': 'blue'
                    };
                    const color = priorityColors[incident.priority];
                    
                    return `
                        <div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                             onclick="window.location.hash = '#incidencias/${incident.id}'">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center">
                                        <span class="status-badge bg-${color}-100 text-${color}-800 mr-2">
                                            ${incident.priority}
                                        </span>
                                        <span class="text-xs text-gray-500">${incident.orderId}</span>
                                    </div>
                                    <p class="font-medium text-gray-900 mt-1 text-sm">${incident.title}</p>
                                    <p class="text-xs text-gray-600 mt-1 line-clamp-1">${incident.description}</p>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },
    
    // Renderizar tabla de órdenes recientes
    renderRecentOrdersTable: function() {
        const recentOrders = ORDENES_CARGA.slice(0, 5);
        
        return `
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID Orden</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cliente</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transportista</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Prioridad</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${recentOrders.map(order => {
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
                            
                            return `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-3 text-sm font-medium text-gray-900">${order.id}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${order.clientName}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">
                                        ${order.transportista ? order.transportista.company : '<span class="text-red-600">Sin asignar</span>'}
                                    </td>
                                    <td class="px-4 py-3">
                                        <span class="status-badge bg-${statusColors[order.status]}-100 text-${statusColors[order.status]}-800">
                                            ${statusLabels[order.status]}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <span class="status-badge ${order.priority === 'critical' ? 'bg-red-100 text-red-800' : order.priority === 'high' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}">
                                            ${order.priority}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <button onclick="window.location.hash = '#ordenes/${order.id}'" class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    
    // Inicializar gráficas
    initCharts: function() {
        setTimeout(() => {
            this.initOrdersStatusChart();
            this.initLoadingTimesChart();
        }, 100);
    },
    
    // Gráfica de estado de órdenes
    initOrdersStatusChart: function() {
        const ctx = document.getElementById('ordersStatusChart');
        if (!ctx) return;
        
        if (this.charts.ordersStatus) {
            this.charts.ordersStatus.destroy();
        }
        
        this.charts.ordersStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completadas', 'En Ruta', 'Cargando', 'Pendientes'],
                datasets: [{
                    data: [
                        KPIS.today.ordersCompleted,
                        1,
                        1,
                        KPIS.today.ordersPending
                    ],
                    backgroundColor: [
                        '#10b981',
                        '#3b82f6',
                        '#f59e0b',
                        '#6b7280'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },
    
    // Inicializar gráficas
initCharts: function() {
    // Esperar al siguiente frame, no hace falta 100ms
    requestAnimationFrame(() => {
        this.initOrdersStatusChart();
        this.initLoadingTimesChart();
    });
},

// Gráfica de estado de órdenes
initOrdersStatusChart: function() {
    const oldChart = this.charts.ordersStatus;
    if (oldChart) oldChart.destroy();

    const ctx = document.getElementById('ordersStatusChart');
    if (!ctx) return;

    // Limpia tamaño forzado previo (Chart.js a veces lo deja inline)
    ctx.removeAttribute('width');
    ctx.removeAttribute('height');
    ctx.style.height = '300px';
    ctx.style.width = '100%';

    this.charts.ordersStatus = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completadas', 'En Ruta', 'Cargando', 'Pendientes'],
            datasets: [{
                data: [
                    KPIS.today.ordersCompleted,
                    1,
                    1,
                    KPIS.today.ordersPending
                ],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#6b7280'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
},

// Gráfica de tiempos de carga
initLoadingTimesChart: function() {
    const oldChart = this.charts.loadingTimes;
    if (oldChart) oldChart.destroy();

    const ctx = document.getElementById('loadingTimesChart');
    if (!ctx) return;

    // Limpia tamaño previo
    ctx.removeAttribute('width');
    ctx.removeAttribute('height');
    ctx.style.height = '300px';
    ctx.style.width = '100%';

    this.charts.loadingTimes = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Tiempo medio (min)',
                data: [152, 148, 145, 150, 142, 155, 145],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 130,
                    max: 170
                }
            }
        }
    });
},

    
    // Exportar dashboard
    exportDashboard: function() {
        showInfoNotification('Exportación iniciada', 'Generando reporte del dashboard...');
        
        // Simular exportación
        setTimeout(() => {
            showSuccessNotification('Dashboard exportado', 'El reporte se ha descargado correctamente');
        }, 1500);
    }
};

console.log('✅ Módulo de dashboard cargado');
