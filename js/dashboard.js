// Dashboard Module
class Dashboard {
    constructor() {
        this.charts = {};
        this.updateInterval = null;
    }
    
    render() {
        const stats = dataManager.getStatistics();
        const loads = dataManager.getLoads();
        const incidents = dataManager.getIncidents();
        
        return `
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${this.renderKPICard('Cargas Activas', stats.loads.inProgress + stats.loads.scheduled, 'fa-truck-loading', 'blue', `+${stats.loads.pending} pendientes`)}
                ${this.renderKPICard('En Tránsito', stats.loads.inTransit, 'fa-truck-moving', 'purple', `${stats.loads.delivered} entregadas hoy`)}
                ${this.renderKPICard('Incidencias Abiertas', stats.incidents.open + stats.incidents.inProgress, 'fa-exclamation-triangle', 'orange', `${stats.incidents.critical} críticas`)}
                ${this.renderKPICard('Tiempo Medio Carga', `${stats.loads.avgLoadingTime} min`, 'fa-clock', 'green', `${stats.loads.avgUnloadingTime} min descarga`)}
            </div>
            
            <!-- Charts Row 1 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Load Status Chart -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Estado de Cargas</h3>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div style="height: 300px;">
                        <canvas id="loadStatusChart"></canvas>
                    </div>
                </div>
                
                <!-- Incident Priority Chart -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Incidencias por Prioridad</h3>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div style="height: 300px;">
                        <canvas id="incidentPriorityChart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Charts Row 2 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Daily Activity Chart -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Actividad Diaria (Últimos 7 días)</h3>
                        <select class="text-sm border border-gray-300 rounded-lg px-3 py-1">
                            <option>Última semana</option>
                            <option>Último mes</option>
                        </select>
                    </div>
                    <div style="height: 300px;">
                        <canvas id="dailyActivityChart"></canvas>
                    </div>
                </div>
                
                <!-- Carrier Performance Chart -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Top Transportistas</h3>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div style="height: 300px;">
                        <canvas id="carrierPerformanceChart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Real-time Activity Feed -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Active Trucks -->
                <div class="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-900">
                            <i class="fas fa-truck text-blue-600 mr-2"></i>
                            Camiones Activos
                        </h3>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            <span class="status-dot bg-green-500"></span>
                            Actualización en tiempo real
                        </span>
                    </div>
                    <div class="overflow-x-auto">
                        ${this.renderActiveTrucks(loads)}
                    </div>
                </div>
                
                <!-- Recent Alerts -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">
                        <i class="fas fa-bell text-orange-600 mr-2"></i>
                        Alertas Recientes
                    </h3>
                    <div class="space-y-3">
                        ${this.renderRecentAlerts(incidents)}
                    </div>
                </div>
            </div>
            
            <!-- Load Details Table -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-900">Últimas Cargas</h3>
                    <div class="flex items-center space-x-3">
                        <input type="text" id="dashboardSearch" placeholder="Buscar..." class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                            <i class="fas fa-filter mr-2"></i>Filtros
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    ${this.renderLoadTable(loads.slice(0, 10))}
                </div>
            </div>
        `;
    }
    
    renderKPICard(title, value, icon, color, subtitle) {
        return `
            <div class="bg-white rounded-xl shadow-lg p-6 hover-lift">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center">
                        <i class="fas ${icon} text-2xl text-${color}-600"></i>
                    </div>
                    <span class="text-sm text-green-600 font-medium">
                        <i class="fas fa-arrow-up mr-1"></i>12%
                    </span>
                </div>
                <h4 class="text-gray-600 text-sm mb-1">${title}</h4>
                <p class="text-3xl font-bold text-gray-900 mb-1">${value}</p>
                <p class="text-sm text-gray-500">${subtitle}</p>
            </div>
        `;
    }
    
    renderActiveTrucks(loads) {
        const activeLoads = loads.filter(l => ['scheduled', 'in_progress', 'loaded', 'in_transit'].includes(l.status)).slice(0, 5);
        
        if (activeLoads.length === 0) {
            return '<p class="text-gray-500 text-center py-4">No hay camiones activos en este momento</p>';
        }
        
        return `
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Carga</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Transportista</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Matrícula</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Destino</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    ${activeLoads.map(load => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3">
                                <div class="font-semibold text-gray-900">${load.id}</div>
                                <div class="text-sm text-gray-500">${load.expeditionNumber}</div>
                            </td>
                            <td class="px-4 py-3">
                                <div class="font-medium text-gray-900">${load.driver}</div>
                                <div class="text-sm text-gray-500">${load.carrier}</div>
                            </td>
                            <td class="px-4 py-3">
                                <span class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">${load.plate}</span>
                            </td>
                            <td class="px-4 py-3 text-gray-900">${load.destination}</td>
                            <td class="px-4 py-3">${Utils.getStatusBadge('load', load.status)}</td>
                            <td class="px-4 py-3">
                                <button class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    renderRecentAlerts(incidents) {
        const recentIncidents = incidents
            .filter(i => ['open', 'in_progress'].includes(i.status))
            .slice(0, 5);
        
        if (recentIncidents.length === 0) {
            return '<p class="text-gray-500 text-sm text-center py-4">No hay alertas recientes</p>';
        }
        
        return recentIncidents.map(incident => `
            <div class="p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer priority-${incident.priority}">
                <div class="flex items-start justify-between mb-2">
                    <div class="flex-1">
                        <p class="font-semibold text-gray-900 text-sm mb-1">${Utils.truncate(incident.title, 40)}</p>
                        <p class="text-xs text-gray-600">${incident.category}</p>
                    </div>
                    ${Utils.getPriorityBadge(incident.priority)}
                </div>
                <p class="text-xs text-gray-500">${Utils.formatRelativeTime(incident.createdAt)}</p>
            </div>
        `).join('');
    }
    
    renderLoadTable(loads) {
        return `
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID Carga</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Línea Producto</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Destino</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Prioridad</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    ${loads.map(load => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 font-semibold text-gray-900">${load.id}</td>
                            <td class="px-4 py-3 text-gray-900">${load.productLine}</td>
                            <td class="px-4 py-3 text-gray-900">${load.destination}</td>
                            <td class="px-4 py-3 text-gray-600">${Utils.formatDate(load.scheduledDate)}</td>
                            <td class="px-4 py-3">${Utils.getStatusBadge('load', load.status)}</td>
                            <td class="px-4 py-3">${Utils.getPriorityBadge(load.priority)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    initCharts() {
        this.initLoadStatusChart();
        this.initIncidentPriorityChart();
        this.initDailyActivityChart();
        this.initCarrierPerformanceChart();
        
        // Start real-time updates
        this.startRealTimeUpdates();
    }
    
    initLoadStatusChart() {
        const stats = dataManager.getStatistics();
        const ctx = document.getElementById('loadStatusChart');
        if (!ctx) return;
        
        this.charts.loadStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pendiente', 'Programada', 'En Carga', 'Cargada', 'En Tránsito', 'Entregada'],
                datasets: [{
                    data: [
                        stats.loads.pending,
                        stats.loads.scheduled,
                        stats.loads.inProgress,
                        stats.loads.loaded,
                        stats.loads.inTransit,
                        stats.loads.delivered
                    ],
                    backgroundColor: [
                        CONFIG.CHART_COLORS.gray,
                        CONFIG.CHART_COLORS.info,
                        CONFIG.CHART_COLORS.warning,
                        CONFIG.CHART_COLORS.secondary,
                        CONFIG.CHART_COLORS.primary,
                        CONFIG.CHART_COLORS.success
                    ]
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
    }
    
    initIncidentPriorityChart() {
        const stats = dataManager.getStatistics();
        const ctx = document.getElementById('incidentPriorityChart');
        if (!ctx) return;
        
        this.charts.incidentPriority = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Crítica', 'Alta', 'Media', 'Baja'],
                datasets: [{
                    label: 'Incidencias',
                    data: [
                        stats.incidents.critical,
                        stats.incidents.high,
                        stats.incidents.medium,
                        stats.incidents.low
                    ],
                    backgroundColor: [
                        CONFIG.CHART_COLORS.danger,
                        CONFIG.CHART_COLORS.warning,
                        '#fbbf24',
                        CONFIG.CHART_COLORS.info
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    initDailyActivityChart() {
        const loads = dataManager.getLoads();
        const last7Days = this.getLast7Days();
        
        // Count loads per day
        const loadsByDay = last7Days.map(day => {
            return loads.filter(load => {
                const loadDate = new Date(load.scheduledDate).toDateString();
                return loadDate === day.toDateString();
            }).length;
        });
        
        const ctx = document.getElementById('dailyActivityChart');
        if (!ctx) return;
        
        this.charts.dailyActivity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days.map(d => d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })),
                datasets: [{
                    label: 'Cargas',
                    data: loadsByDay,
                    borderColor: CONFIG.CHART_COLORS.primary,
                    backgroundColor: CONFIG.CHART_COLORS.primary + '20',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    initCarrierPerformanceChart() {
        const carriers = dataManager.getCarriers()
            .filter(c => c.status === 'active')
            .sort((a, b) => b.onTimePercentage - a.onTimePercentage)
            .slice(0, 10);
        
        const ctx = document.getElementById('carrierPerformanceChart');
        if (!ctx) return;
        
        this.charts.carrierPerformance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: carriers.map(c => c.company.split(' ')[0]),
                datasets: [{
                    label: 'Puntualidad %',
                    data: carriers.map(c => c.onTimePercentage),
                    backgroundColor: CONFIG.CHART_COLORS.success
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date);
        }
        return days;
    }
    
    startRealTimeUpdates() {
        // Update every 10 seconds to simulate real-time
        this.updateInterval = setInterval(() => {
            this.simulateRealTimeUpdate();
        }, 10000);
    }
    
    simulateRealTimeUpdate() {
        // Simulate random status changes
        const loads = dataManager.getLoads();
        const activeLoads = loads.filter(l => ['scheduled', 'in_progress', 'loaded'].includes(l.status));
        
        if (activeLoads.length > 0 && Math.random() > 0.7) {
            const randomLoad = activeLoads[Math.floor(Math.random() * activeLoads.length)];
            const statusFlow = {
                'scheduled': 'in_progress',
                'in_progress': 'loaded',
                'loaded': 'in_transit'
            };
            
            if (statusFlow[randomLoad.status]) {
                randomLoad.status = statusFlow[randomLoad.status];
                dataManager.saveLoad(randomLoad);
                
                // Reload active trucks section
                const activeTrucksContainer = document.querySelector('.overflow-x-auto');
                if (activeTrucksContainer && activeTrucksContainer.querySelector('table')) {
                    activeTrucksContainer.innerHTML = this.renderActiveTrucks(dataManager.getLoads());
                }
            }
        }
    }
    
    destroy() {
        // Clear interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

window.Dashboard = Dashboard;
