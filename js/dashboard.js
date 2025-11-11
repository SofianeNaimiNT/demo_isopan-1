// ============================================
// DASHBOARD MODULE - LogiFlow Pro (FIXED)
// ============================================

const DashboardModule = {
    charts: {},
    refreshInterval: null,

    // Inicializar módulo
    init: function() {
        this.render(); // renderizamos dashboard al inicio
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
        if (this.refreshInterval) clearInterval(this.refreshInterval);
    },

    // Actualizar datos en tiempo real
    updateRealTimeData: function() {
        // Simular cambios en tiempo real
        KPIS.today.trucksActive = Math.floor(Math.random() * 2) + 3;
        KPIS.today.trucksWaiting = Math.floor(Math.random() * 3);
        KPIS.today.incidentsOpen = Math.floor(Math.random() * 2) + 2;

        // Actualizamos solo los valores que cambian
        const trucksActiveEl = document.getElementById('trucksActiveValue');
        if (trucksActiveEl) trucksActiveEl.innerText = KPIS.today.trucksActive;

        const trucksWaitingEl = document.getElementById('trucksWaitingValue');
        if (trucksWaitingEl) trucksWaitingEl.innerText = KPIS.today.trucksWaiting;

        const incidentsOpenEl = document.getElementById('incidentsOpenValue');
        if (incidentsOpenEl) incidentsOpenEl.innerText = KPIS.today.incidentsOpen;

        // Actualizamos gráficas si ya existen
        if (this.charts.ordersStatus) this.charts.ordersStatus.update();
        if (this.charts.loadingTimes) this.charts.loadingTimes.update();
    },

    // Renderizar dashboard
    render: function() {
        const container = document.getElementById('dashboardContainer');
        if (!container) return;

        container.innerHTML = `
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
                    ${this.renderKPICard('Órdenes Hoy', KPIS.today.totalOrders, 'fa-box', 'blue', `${KPIS.today.ordersCompleted} completadas`, KPIS.trends.ordersVsLastMonth)}
                    ${this.renderKPICard('Camiones Activos', `<span id="trucksActiveValue">${KPIS.today.trucksActive}</span>`, 'fa-truck', 'green', `${KPIS.today.trucksInRoute} en ruta`, null)}
                    ${this.renderKPICard('Incidencias Abiertas', `<span id="incidentsOpenValue">${KPIS.today.incidentsOpen}</span>`, 'fa-exclamation-triangle', 'red', `${KPIS.today.incidentsCritical} críticas`, KPIS.trends.incidentsVsLastMonth)}
                    ${this.renderKPICard('Tiempo Medio Carga', `${KPIS.today.avgLoadingTime}m`, 'fa-clock', 'orange', 'Últimas 24h', KPIS.trends.loadingTimeVsLastMonth)}
                </div>
                
                <!-- Charts Row -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="glass rounded-xl p-6 card-hover">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-pie mr-2 text-blue-600"></i>
                            Estado de Órdenes
                        </h3>
                        <canvas id="ordersStatusChart" class="w-full h-72"></canvas>
                    </div>
                    
                    <div class="glass rounded-xl p-6 card-hover">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-line mr-2 text-green-600"></i>
                            Tiempos de Carga (Últimos 7 días)
                        </h3>
                        <canvas id="loadingTimesChart" class="w-full h-72"></canvas>
                    </div>
                </div>
            </div>
        `;

        // Inicializamos gráficas
        this.initCharts();
    },

    renderKPICard: function(title, value, icon, color, subtitle, trend) {
        const trendColor = trend > 0 ? 'green' : trend < 0 ? 'red' : 'gray';
        const trendIcon = trend > 0 ? 'fa-arrow-up' : trend < 0 ? 'fa-arrow-down' : 'fa-minus';
        return `
            <div class="glass rounded-xl p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center">
                        <i class="fas ${icon} text-2xl text-${color}-600"></i>
                    </div>
                    ${trend !== null ? `<span class="flex items-center text-sm font-semibold text-${trendColor}-600">
                        <i class="fas ${trendIcon} mr-1"></i>${Math.abs(trend).toFixed(1)}%
                    </span>` : ''}
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">${value}</p>
                    <p class="text-sm text-gray-600 mt-1">${title}</p>
                    <p class="text-xs text-gray-500 mt-1">${subtitle}</p>
                </div>
            </div>
        `;
    },

    // Inicializar gráficas
    initCharts: function() {
        this.initOrdersStatusChart();
        this.initLoadingTimesChart();
    },

    initOrdersStatusChart: function() {
        const ctx = document.getElementById('ordersStatusChart');
        if (!ctx) return;

        if (this.charts.ordersStatus) this.charts.ordersStatus.destroy();

        this.charts.ordersStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completadas', 'En Ruta', 'Cargando', 'Pendientes'],
                datasets: [{
                    data: [KPIS.today.ordersCompleted, 1, 1, KPIS.today.ordersPending],
                    backgroundColor: ['#10b981','#3b82f6','#f59e0b','#6b7280'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    },

    initLoadingTimesChart: function() {
        const ctx = document.getElementById('loadingTimesChart');
        if (!ctx) return;

        if (this.charts.loadingTimes) this.charts.loadingTimes.destroy();

        this.charts.loadingTimes = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
                datasets: [{
                    label: 'Tiempo medio (min)',
                    data: [152,148,145,150,142,155,145],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    },

    exportDashboard: function() {
        showInfoNotification('Exportación iniciada', 'Generando reporte del dashboard...');
        setTimeout(() => {
            showSuccessNotification('Dashboard exportado', 'El reporte se ha descargado correctamente');
        }, 1500);
    }
};

console.log('✅ Módulo de dashboard cargado (FIXED)');
