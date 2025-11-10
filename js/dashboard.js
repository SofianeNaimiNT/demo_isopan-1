// ============================================
// DASHBOARD MODULE - LogiFlow Pro
// Refactorizado
// ============================================
const DashboardModule = {
    charts: {},
    refreshInterval: null,
  
    // Inicializar módulo
    init: function() {
      this.render();        // Renderiza estructura fija
      this.initCharts();    // Inicializa gráficas
      this.startRealTimeUpdates(); // Inicia actualización
      console.log('✅ Módulo de dashboard inicializado');
    },
  
    // Iniciar actualizaciones en tiempo real
    startRealTimeUpdates: function() {
      this.refreshInterval = setInterval(() => {
        this.updateRealTimeData();
      }, 10000);
    },
  
    stopRealTimeUpdates: function() {
      if (this.refreshInterval) clearInterval(this.refreshInterval);
    },
  
    // Actualizar datos en tiempo real
    updateRealTimeData: function() {
      KPIS.today.trucksActive = Math.floor(Math.random() * 2) + 3;
      KPIS.today.trucksWaiting = Math.floor(Math.random() * 3);
      KPIS.today.incidentsOpen = Math.floor(Math.random() * 2) + 2;
  
      this.updateKPI();
      this.updateCharts();
    },
  
    // Renderiza estructura fija del dashboard
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
              <button onclick="DashboardModule.updateRealTimeData()" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <i class="fas fa-sync-alt mr-2"></i>Actualizar
              </button>
              <button onclick="DashboardModule.exportDashboard()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-download mr-2"></i>Exportar
              </button>
            </div>
          </div>
  
          <!-- KPI Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass rounded-xl p-6 card-hover">
              <p class="text-sm text-gray-500">Órdenes Hoy</p>
              <p id="kpi-ordersToday" class="text-2xl font-bold text-gray-900">${KPIS.today.totalOrders}</p>
            </div>
            <div class="glass rounded-xl p-6 card-hover">
              <p class="text-sm text-gray-500">Camiones Activos</p>
              <p id="kpi-trucksActive" class="text-2xl font-bold text-gray-900">${KPIS.today.trucksActive}</p>
            </div>
            <div class="glass rounded-xl p-6 card-hover">
              <p class="text-sm text-gray-500">Incidencias Abiertas</p>
              <p id="kpi-incidentsOpen" class="text-2xl font-bold text-gray-900">${KPIS.today.incidentsOpen}</p>
            </div>
            <div class="glass rounded-xl p-6 card-hover">
              <p class="text-sm text-gray-500">Tiempo Medio Carga</p>
              <p id="kpi-loadingTime" class="text-2xl font-bold text-gray-900">${KPIS.today.avgLoadingTime}m</p>
            </div>
          </div>
  
          <!-- Charts -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="glass rounded-xl p-6 card-hover h-72">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Estado de Órdenes</h3>
              <canvas id="ordersStatusChart" class="w-full h-full"></canvas>
            </div>
            <div class="glass rounded-xl p-6 card-hover h-72">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Tiempos de Carga (Últimos 7 días)</h3>
              <canvas id="loadingTimesChart" class="w-full h-full"></canvas>
            </div>
          </div>
        </div>
      `;
    },
  
    // Actualiza solo los valores KPI
    updateKPI: function() {
      document.getElementById('kpi-ordersToday').textContent = KPIS.today.totalOrders;
      document.getElementById('kpi-trucksActive').textContent = KPIS.today.trucksActive;
      document.getElementById('kpi-incidentsOpen').textContent = KPIS.today.incidentsOpen;
      document.getElementById('kpi-loadingTime').textContent = `${KPIS.today.avgLoadingTime}m`;
    },
  
    // Inicializa los charts una sola vez
    initCharts: function() {
      const ordersCtx = document.getElementById('ordersStatusChart');
      const loadingCtx = document.getElementById('loadingTimesChart');
  
      this.charts.ordersStatus = new Chart(ordersCtx, {
        type: 'doughnut',
        data: {
          labels: ['Completadas', 'En Ruta', 'Cargando', 'Pendientes'],
          datasets: [{
            data: [KPIS.today.ordersCompleted, 1, 1, KPIS.today.ordersPending],
            backgroundColor: ['#10b981','#3b82f6','#f59e0b','#6b7280'],
            borderWidth: 0
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
      });
  
      this.charts.loadingTimes = new Chart(loadingCtx, {
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
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: false, min: 130, max: 170 } }
        }
      });
    },
  
    // Actualiza datasets de charts
    updateCharts: function() {
      if(this.charts.ordersStatus){
        this.charts.ordersStatus.data.datasets[0].data = [KPIS.today.ordersCompleted, 1, 1, KPIS.today.ordersPending];
        this.charts.ordersStatus.update();
      }
      if(this.charts.loadingTimes){
        this.charts.loadingTimes.data.datasets[0].data = [152,148,145,150,142,155,145];
        this.charts.loadingTimes.update();
      }
    },
  
    // Exportar dashboard
    exportDashboard: function() {
      showInfoNotification('Exportación iniciada','Generando reporte del dashboard...');
      setTimeout(()=>{showSuccessNotification('Dashboard exportado','El reporte se ha descargado correctamente');},1500);
    }
  };
  