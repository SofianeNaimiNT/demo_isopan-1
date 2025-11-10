// ============================================
// REPORTING MODULE - LogiFlow Pro
// ============================================

const ReportingModule = {
    render: function() {
        return `
            <div class="space-y-6 animate-fade-in">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Reporting y Analítica</h1>
                    <p class="text-gray-600 mt-1">Métricas, KPIs e informes ejecutivos</p>
                </div>
                
                <!-- Report Types -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.renderReportCard(
                        'Reporte de Operaciones',
                        'Análisis completo de todas las operaciones logísticas',
                        'fa-chart-line',
                        'blue',
                        'operations'
                    )}
                    ${this.renderReportCard(
                        'Reporte de Transportistas',
                        'Evaluación y ranking de desempeño de transportistas',
                        'fa-truck',
                        'green',
                        'transportistas'
                    )}
                    ${this.renderReportCard(
                        'Reporte de Incidencias',
                        'Análisis de incidencias y tiempos de resolución',
                        'fa-exclamation-triangle',
                        'red',
                        'incidencias'
                    )}
                    ${this.renderReportCard(
                        'Reporte de Eficiencia',
                        'Métricas de tiempos de carga y descarga',
                        'fa-clock',
                        'orange',
                        'efficiency'
                    )}
                    ${this.renderReportCard(
                        'Reporte Financiero',
                        'Costos operacionales y análisis de rentabilidad',
                        'fa-dollar-sign',
                        'purple',
                        'financial'
                    )}
                    ${this.renderReportCard(
                        'Reporte Personalizado',
                        'Crear reporte con métricas específicas',
                        'fa-sliders-h',
                        'gray',
                        'custom'
                    )}
                </div>
                
                <!-- Quick Stats -->
                <div class="glass rounded-xl p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Resumen Ejecutivo</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="text-center">
                            <p class="text-4xl font-bold text-blue-600">${KPIS.thisMonth.ordersCompleted}</p>
                            <p class="text-sm text-gray-600 mt-1">Órdenes Completadas (Mes)</p>
                        </div>
                        <div class="text-center">
                            <p class="text-4xl font-bold text-green-600">${KPIS.thisMonth.onTimeDeliveryRate}%</p>
                            <p class="text-sm text-gray-600 mt-1">Entregas Puntuales</p>
                        </div>
                        <div class="text-center">
                            <p class="text-4xl font-bold text-orange-600">${KPIS.thisMonth.avgLoadingTime}m</p>
                            <p class="text-sm text-gray-600 mt-1">Tiempo Medio Carga</p>
                        </div>
                        <div class="text-center">
                            <p class="text-4xl font-bold text-purple-600">${(KPIS.thisMonth.totalWeight / 1000).toFixed(1)}t</p>
                            <p class="text-sm text-gray-600 mt-1">Peso Total Transportado</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderReportCard: function(title, description, icon, color, type) {
        return `
            <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="ReportingModule.generateReport('${type}')">
                <div class="w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center mb-4">
                    <i class="fas ${icon} text-2xl text-${color}-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
                <p class="text-sm text-gray-600 mb-4">${description}</p>
                <button class="w-full px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition">
                    <i class="fas fa-download mr-2"></i>Generar Reporte
                </button>
            </div>
        `;
    },
    
    generateReport: function(type) {
        showInfoNotification('Generando reporte', 'Por favor espere...');
        
        setTimeout(() => {
            showSuccessNotification('Reporte generado', 'El archivo Excel ha sido descargado correctamente');
        }, 2000);
    }
};

console.log('✅ Módulo de reporting cargado');
