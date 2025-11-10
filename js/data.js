// ============================================
// MOCK DATA STRUCTURE - LogiFlow Pro
// ============================================

// Usuarios del Sistema
const USERS = [
    {
        id: 'U001',
        username: 'admin',
        password: 'admin123',
        name: 'María García López',
        role: 'supply_chain_manager',
        email: 'maria.garcia@logiflow.com',
        phone: '+34 612 345 678',
        avatar: 'https://i.pravatar.cc/150?img=1',
        permissions: ['all']
    },
    {
        id: 'U002',
        username: 'logistica',
        password: 'log123',
        name: 'Carlos Rodríguez Martín',
        role: 'logistics_manager',
        email: 'carlos.rodriguez@logiflow.com',
        phone: '+34 612 345 679',
        avatar: 'https://i.pravatar.cc/150?img=2',
        permissions: ['create_orders', 'assign_resources', 'validate_docs', 'manage_transportistas']
    },
    {
        id: 'U003',
        username: 'operario',
        password: 'oper123',
        name: 'Juan Pérez Sánchez',
        role: 'operator',
        email: 'juan.perez@logiflow.com',
        phone: '+34 612 345 680',
        avatar: 'https://i.pravatar.cc/150?img=3',
        permissions: ['view_orders', 'mark_checks', 'upload_photos', 'create_incidents']
    },
    {
        id: 'U004',
        username: 'transportista',
        password: 'trans123',
        name: 'Antonio Gómez Ruiz',
        role: 'transporter',
        email: 'antonio.gomez@transportes-rapidos.com',
        phone: '+34 612 345 681',
        avatar: 'https://i.pravatar.cc/150?img=4',
        permissions: ['view_assignments', 'confirm_attendance', 'sign_documents']
    },
    {
        id: 'U005',
        username: 'cliente',
        password: 'cli123',
        name: 'Laura Martínez Díaz',
        role: 'client',
        email: 'laura.martinez@clientecorp.com',
        phone: '+34 612 345 682',
        avatar: 'https://i.pravatar.cc/150?img=5',
        permissions: ['receive_documents', 'sign_reception']
    }
];

// Transportistas
const TRANSPORTISTAS = [
    {
        id: 'T001',
        company: 'Transportes Rápidos S.A.',
        cif: 'A12345678',
        status: 'active',
        rating: 4.8,
        totalDeliveries: 1247,
        onTimePercentage: 96.5,
        drivers: [
            { id: 'D001', name: 'Antonio Gómez Ruiz', license: 'B123456', phone: '+34 612 345 681', vehicle: '1234-ABC' },
            { id: 'D002', name: 'José Luis Fernández', license: 'B123457', phone: '+34 612 345 690', vehicle: '5678-DEF' }
        ],
        vehicles: [
            { plate: '1234-ABC', type: 'Camión Articulado', capacity: '24000 kg', status: 'available' },
            { plate: '5678-DEF', type: 'Camión Rígido', capacity: '18000 kg', status: 'in_route' }
        ],
        contact: {
            name: 'Pedro Ruiz Molina',
            email: 'pedro.ruiz@transportes-rapidos.com',
            phone: '+34 912 345 678'
        },
        address: 'Polígono Industrial Las Arenas, Calle 5, Nave 12, 28850 Madrid'
    },
    {
        id: 'T002',
        company: 'LogiTransport Europa',
        cif: 'A23456789',
        status: 'active',
        rating: 4.9,
        totalDeliveries: 2156,
        onTimePercentage: 98.2,
        drivers: [
            { id: 'D003', name: 'Manuel García Torres', license: 'B234567', phone: '+34 612 345 691', vehicle: '2345-GHI' },
            { id: 'D004', name: 'Francisco López Ruiz', license: 'B234568', phone: '+34 612 345 692', vehicle: '6789-JKL' }
        ],
        vehicles: [
            { plate: '2345-GHI', type: 'Camión Articulado', capacity: '24000 kg', status: 'loading' },
            { plate: '6789-JKL', type: 'Camión Frigorífico', capacity: '20000 kg', status: 'available' }
        ],
        contact: {
            name: 'Isabel González Pérez',
            email: 'isabel.gonzalez@logitransport.com',
            phone: '+34 913 456 789'
        },
        address: 'Avenida de la Industria 45, 08040 Barcelona'
    },
    {
        id: 'T003',
        company: 'Express Cargo Iberia',
        cif: 'A34567890',
        status: 'pending',
        rating: 4.6,
        totalDeliveries: 856,
        onTimePercentage: 94.1,
        drivers: [
            { id: 'D005', name: 'Roberto Martín Sánchez', license: 'B345678', phone: '+34 612 345 693', vehicle: '3456-MNO' }
        ],
        vehicles: [
            { plate: '3456-MNO', type: 'Camión Rígido', capacity: '16000 kg', status: 'maintenance' }
        ],
        contact: {
            name: 'Ana María Díaz López',
            email: 'ana.diaz@expresscargo.com',
            phone: '+34 954 123 456'
        },
        address: 'Polígono Industrial Севілья Este, 41020 Sevilla'
    },
    {
        id: 'T004',
        company: 'Trans-Europarc',
        cif: 'A45678901',
        status: 'active',
        rating: 4.7,
        totalDeliveries: 1523,
        onTimePercentage: 95.8,
        drivers: [
            { id: 'D006', name: 'Miguel Ángel Romero', license: 'B456789', phone: '+34 612 345 694', vehicle: '4567-PQR' },
            { id: 'D007', name: 'David Moreno Castro', license: 'B456790', phone: '+34 612 345 695', vehicle: '7890-STU' }
        ],
        vehicles: [
            { plate: '4567-PQR', type: 'Camión Articulado', capacity: '24000 kg', status: 'available' },
            { plate: '7890-STU', type: 'Camión Portacontenedores', capacity: '28000 kg', status: 'in_route' }
        ],
        contact: {
            name: 'Carmen Jiménez Vega',
            email: 'carmen.jimenez@transeuroparc.com',
            phone: '+34 963 789 012'
        },
        address: 'Zona Franca, Sector B, 46024 Valencia'
    },
    {
        id: 'T005',
        company: 'Rutas del Norte',
        cif: 'A56789012',
        status: 'blocked',
        rating: 3.9,
        totalDeliveries: 432,
        onTimePercentage: 87.3,
        drivers: [
            { id: 'D008', name: 'Javier Iglesias Núñez', license: 'B567890', phone: '+34 612 345 696', vehicle: '5678-VWX' }
        ],
        vehicles: [
            { plate: '5678-VWX', type: 'Camión Rígido', capacity: '14000 kg', status: 'blocked' }
        ],
        contact: {
            name: 'Luis Alberto Fernández',
            email: 'luis.fernandez@rutasdelnorte.com',
            phone: '+34 985 234 567'
        },
        address: 'Polígono de Silvota, Parcela 45, 33192 Asturias'
    }
];

// Órdenes de Carga
const ORDENES_CARGA = [
    {
        id: 'OC-2024-001',
        sapOrderNumber: 'SAP-4500123456',
        status: 'completed',
        priority: 'normal',
        clientName: 'Construcciones Mediterráneo S.L.',
        clientContact: 'Laura Martínez Díaz',
        clientEmail: 'laura.martinez@clientecorp.com',
        clientPhone: '+34 965 123 456',
        destination: 'Calle Mayor 45, 03001 Alicante',
        transportista: TRANSPORTISTAS[0],
        driver: TRANSPORTISTAS[0].drivers[0],
        vehicle: TRANSPORTISTAS[0].vehicles[0],
        scheduledDate: '2024-01-15',
        scheduledTime: '08:00',
        loadingStartTime: '2024-01-15T08:15:00',
        loadingEndTime: '2024-01-15T10:45:00',
        departureTime: '2024-01-15T11:00:00',
        estimatedArrival: '2024-01-15T17:30:00',
        actualArrival: '2024-01-15T17:15:00',
        products: [
            { sku: 'PANEL-ISO-100', description: 'Panel Isopanel 100mm', quantity: 250, unit: 'unidades', weight: 5000, loaded: true },
            { sku: 'ACCESORIO-01', description: 'Kit de fijación premium', quantity: 50, unit: 'kits', weight: 250, loaded: true },
            { sku: 'SELLADOR-PRO', description: 'Sellador profesional 300ml', quantity: 100, unit: 'unidades', weight: 150, loaded: true }
        ],
        totalWeight: 5400,
        checklist: {
            structuralCheck: { completed: true, operator: 'U003', timestamp: '2024-01-15T08:20:00' },
            accessoriesCheck: { completed: true, operator: 'U003', timestamp: '2024-01-15T09:15:00' },
            safetyCheck: { completed: true, operator: 'U003', timestamp: '2024-01-15T10:30:00' },
            documentationCheck: { completed: true, operator: 'U002', timestamp: '2024-01-15T10:40:00' }
        },
        photos: [
            { id: 'P001', url: 'https://picsum.photos/800/600?random=1', description: 'Carga completa - Vista frontal', timestamp: '2024-01-15T10:35:00', uploadedBy: 'U003' },
            { id: 'P002', url: 'https://picsum.photos/800/600?random=2', description: 'Detalle de fijación', timestamp: '2024-01-15T10:38:00', uploadedBy: 'U003' },
            { id: 'P003', url: 'https://picsum.photos/800/600?random=3', description: 'Etiquetado verificado', timestamp: '2024-01-15T10:42:00', uploadedBy: 'U003' }
        ],
        documents: [
            { type: 'albaran', number: 'ALB-2024-001', status: 'signed', url: '#', signedBy: 'U004', signedAt: '2024-01-15T11:05:00' },
            { type: 'cmr', number: 'CMR-2024-001', status: 'signed', url: '#', signedBy: 'U005', signedAt: '2024-01-15T17:20:00' }
        ],
        assignedOperators: ['U003'],
        createdBy: 'U002',
        createdAt: '2024-01-14T16:30:00',
        updatedAt: '2024-01-15T17:20:00',
        notes: 'Entrega prioritaria. Cliente requiere descarga antes de las 18:00h.'
    },
    {
        id: 'OC-2024-002',
        sapOrderNumber: 'SAP-4500123457',
        status: 'in_route',
        priority: 'high',
        clientName: 'Industrias del Metal S.A.',
        clientContact: 'Roberto Castro Fernández',
        clientEmail: 'roberto.castro@industriasmetal.com',
        clientPhone: '+34 976 234 567',
        destination: 'Polígono Industrial Empresarium, Nave 8, 50197 Zaragoza',
        transportista: TRANSPORTISTAS[1],
        driver: TRANSPORTISTAS[1].drivers[0],
        vehicle: TRANSPORTISTAS[1].vehicles[0],
        scheduledDate: '2024-01-16',
        scheduledTime: '09:00',
        loadingStartTime: '2024-01-16T09:10:00',
        loadingEndTime: '2024-01-16T11:30:00',
        departureTime: '2024-01-16T11:45:00',
        estimatedArrival: '2024-01-16T18:00:00',
        actualArrival: null,
        products: [
            { sku: 'CHAPA-ALU-05', description: 'Chapa aluminio 0.5mm', quantity: 180, unit: 'planchas', weight: 3600, loaded: true },
            { sku: 'PERFIL-L-50', description: 'Perfil en L 50x50mm', quantity: 300, unit: 'metros', weight: 2400, loaded: true },
            { sku: 'REMACHE-PRO', description: 'Remaches profesionales', quantity: 5000, unit: 'unidades', weight: 200, loaded: true }
        ],
        totalWeight: 6200,
        checklist: {
            structuralCheck: { completed: true, operator: 'U003', timestamp: '2024-01-16T09:30:00' },
            accessoriesCheck: { completed: true, operator: 'U003', timestamp: '2024-01-16T10:20:00' },
            safetyCheck: { completed: true, operator: 'U003', timestamp: '2024-01-16T11:15:00' },
            documentationCheck: { completed: true, operator: 'U002', timestamp: '2024-01-16T11:25:00' }
        },
        photos: [
            { id: 'P004', url: 'https://picsum.photos/800/600?random=4', description: 'Carga completa', timestamp: '2024-01-16T11:20:00', uploadedBy: 'U003' },
            { id: 'P005', url: 'https://picsum.photos/800/600?random=5', description: 'Protección aplicada', timestamp: '2024-01-16T11:28:00', uploadedBy: 'U003' }
        ],
        documents: [
            { type: 'albaran', number: 'ALB-2024-002', status: 'signed', url: '#', signedBy: 'U004', signedAt: '2024-01-16T11:50:00' },
            { type: 'cmr', number: 'CMR-2024-002', status: 'pending', url: '#', signedBy: null, signedAt: null }
        ],
        assignedOperators: ['U003'],
        createdBy: 'U002',
        createdAt: '2024-01-15T14:20:00',
        updatedAt: '2024-01-16T11:50:00',
        notes: 'Pedido urgente. Confirmar llegada con 1h de antelación.'
    },
    {
        id: 'OC-2024-003',
        sapOrderNumber: 'SAP-4500123458',
        status: 'loading',
        priority: 'normal',
        clientName: 'Almacenes Logísticos del Sur',
        clientContact: 'Patricia Jiménez Morales',
        clientEmail: 'patricia.jimenez@almacenesur.com',
        clientPhone: '+34 955 345 678',
        destination: 'Autovía A-4, km 532, 41500 Sevilla',
        transportista: TRANSPORTISTAS[3],
        driver: TRANSPORTISTAS[3].drivers[0],
        vehicle: TRANSPORTISTAS[3].vehicles[0],
        scheduledDate: '2024-01-17',
        scheduledTime: '07:30',
        loadingStartTime: '2024-01-17T07:35:00',
        loadingEndTime: null,
        departureTime: null,
        estimatedArrival: '2024-01-17T16:00:00',
        actualArrival: null,
        products: [
            { sku: 'PALET-EUR-120', description: 'Palets europeos 120x80', quantity: 50, unit: 'unidades', weight: 1000, loaded: true },
            { sku: 'CAJA-CARTON-L', description: 'Cajas cartón reforzado L', quantity: 500, unit: 'unidades', weight: 750, loaded: true },
            { sku: 'FILM-ESTIRABLE', description: 'Film estirable industrial', quantity: 40, unit: 'rollos', weight: 120, loaded: false }
        ],
        totalWeight: 1870,
        checklist: {
            structuralCheck: { completed: true, operator: 'U003', timestamp: '2024-01-17T07:50:00' },
            accessoriesCheck: { completed: true, operator: 'U003', timestamp: '2024-01-17T08:30:00' },
            safetyCheck: { completed: false, operator: null, timestamp: null },
            documentationCheck: { completed: false, operator: null, timestamp: null }
        },
        photos: [
            { id: 'P006', url: 'https://picsum.photos/800/600?random=6', description: 'Inicio de carga', timestamp: '2024-01-17T07:40:00', uploadedBy: 'U003' }
        ],
        documents: [],
        assignedOperators: ['U003'],
        createdBy: 'U002',
        createdAt: '2024-01-16T15:45:00',
        updatedAt: '2024-01-17T08:35:00',
        notes: null
    },
    {
        id: 'OC-2024-004',
        sapOrderNumber: 'SAP-4500123459',
        status: 'pending',
        priority: 'high',
        clientName: 'Construcciones Modernas BCN',
        clientContact: 'Andrés Moreno Vila',
        clientEmail: 'andres.moreno@construccionesmodernas.com',
        clientPhone: '+34 932 456 789',
        destination: 'Paseo de la Zona Franca 156, 08038 Barcelona',
        transportista: TRANSPORTISTAS[1],
        driver: TRANSPORTISTAS[1].drivers[1],
        vehicle: TRANSPORTISTAS[1].vehicles[1],
        scheduledDate: '2024-01-18',
        scheduledTime: '10:00',
        loadingStartTime: null,
        loadingEndTime: null,
        departureTime: null,
        estimatedArrival: '2024-01-18T17:30:00',
        actualArrival: null,
        products: [
            { sku: 'VIGA-METALICA-6M', description: 'Viga metálica IPN 6 metros', quantity: 40, unit: 'unidades', weight: 3200, loaded: false },
            { sku: 'TORNILLO-M16', description: 'Tornillería M16 galvanizada', quantity: 2000, unit: 'unidades', weight: 400, loaded: false },
            { sku: 'SOLDADURA-E7018', description: 'Electrodos E7018 profesional', quantity: 50, unit: 'paquetes', weight: 250, loaded: false }
        ],
        totalWeight: 3850,
        checklist: {
            structuralCheck: { completed: false, operator: null, timestamp: null },
            accessoriesCheck: { completed: false, operator: null, timestamp: null },
            safetyCheck: { completed: false, operator: null, timestamp: null },
            documentationCheck: { completed: false, operator: null, timestamp: null }
        },
        photos: [],
        documents: [],
        assignedOperators: ['U003'],
        createdBy: 'U002',
        createdAt: '2024-01-16T11:20:00',
        updatedAt: '2024-01-16T11:20:00',
        notes: 'URGENTE: Cliente necesita material para obra iniciada. Prioridad máxima.'
    },
    {
        id: 'OC-2024-005',
        sapOrderNumber: 'SAP-4500123460',
        status: 'pending',
        priority: 'normal',
        clientName: 'Distribuciones Valencia Este',
        clientContact: 'Elena Ramos García',
        clientEmail: 'elena.ramos@distvalencia.com',
        clientPhone: '+34 963 567 890',
        destination: 'Avenida de las Cortes Valencianas 52, 46015 Valencia',
        transportista: TRANSPORTISTAS[0],
        driver: TRANSPORTISTAS[0].drivers[1],
        vehicle: TRANSPORTISTAS[0].vehicles[1],
        scheduledDate: '2024-01-19',
        scheduledTime: '08:30',
        loadingStartTime: null,
        loadingEndTime: null,
        departureTime: null,
        estimatedArrival: '2024-01-19T15:00:00',
        actualArrival: null,
        products: [
            { sku: 'PANEL-SANDWICH-50', description: 'Panel sandwich 50mm', quantity: 300, unit: 'metros', weight: 4500, loaded: false },
            { sku: 'CANALETA-PVC', description: 'Canaleta PVC 100mm', quantity: 200, unit: 'metros', weight: 800, loaded: false },
            { sku: 'ESQUINERO-ALU', description: 'Esquineros aluminio', quantity: 150, unit: 'unidades', weight: 300, loaded: false }
        ],
        totalWeight: 5600,
        checklist: {
            structuralCheck: { completed: false, operator: null, timestamp: null },
            accessoriesCheck: { completed: false, operator: null, timestamp: null },
            safetyCheck: { completed: false, operator: null, timestamp: null },
            documentationCheck: { completed: false, operator: null, timestamp: null }
        },
        photos: [],
        documents: [],
        assignedOperators: [],
        createdBy: 'U002',
        createdAt: '2024-01-16T16:00:00',
        updatedAt: '2024-01-16T16:00:00',
        notes: null
    },
    {
        id: 'OC-2024-006',
        sapOrderNumber: 'SAP-4500123461',
        status: 'awaiting_truck',
        priority: 'critical',
        clientName: 'Proyecto Hospitalario San Rafael',
        clientContact: 'Dr. Fernando Ortiz Blanco',
        clientEmail: 'fernando.ortiz@hospitalsanrafael.com',
        clientPhone: '+34 915 678 901',
        destination: 'Calle Serrano 199, 28016 Madrid',
        transportista: null,
        driver: null,
        vehicle: null,
        scheduledDate: '2024-01-17',
        scheduledTime: '06:00',
        loadingStartTime: null,
        loadingEndTime: null,
        departureTime: null,
        estimatedArrival: '2024-01-17T14:00:00',
        actualArrival: null,
        products: [
            { sku: 'PANEL-SANITARIO-A1', description: 'Panel sanitario clasificación A1', quantity: 400, unit: 'metros', weight: 7200, loaded: false },
            { sku: 'PERFIL-HOSPITALARIO', description: 'Perfilería especial hospitales', quantity: 200, unit: 'metros', weight: 1600, loaded: false },
            { sku: 'SELLADOR-SANITARIO', description: 'Sellador bacteriostático', quantity: 80, unit: 'unidades', weight: 400, loaded: false }
        ],
        totalWeight: 9200,
        checklist: {
            structuralCheck: { completed: false, operator: null, timestamp: null },
            accessoriesCheck: { completed: false, operator: null, timestamp: null },
            safetyCheck: { completed: false, operator: null, timestamp: null },
            documentationCheck: { completed: false, operator: null, timestamp: null }
        },
        photos: [],
        documents: [],
        assignedOperators: [],
        createdBy: 'U001',
        createdAt: '2024-01-16T09:15:00',
        updatedAt: '2024-01-16T17:30:00',
        notes: 'CRÍTICO: Obra sanitaria con plazo legal. Requiere transportista certificado para material A1.'
    }
];

// Incidencias
const INCIDENCIAS = [
    {
        id: 'INC-2024-001',
        orderId: 'OC-2024-001',
        type: 'logistics',
        priority: 'medium',
        status: 'resolved',
        title: 'Retraso en inicio de carga',
        description: 'El camión llegó 15 minutos tarde debido a tráfico en acceso a polígono.',
        reportedBy: 'U003',
        reportedAt: '2024-01-15T08:15:00',
        assignedTo: 'U002',
        resolvedBy: 'U002',
        resolvedAt: '2024-01-15T08:30:00',
        photos: [
            { id: 'PI001', url: 'https://picsum.photos/800/600?random=10', description: 'Tráfico en acceso', timestamp: '2024-01-15T08:17:00' }
        ],
        comments: [
            { id: 'C001', user: 'U003', text: 'Camión en cola de espera en acceso principal', timestamp: '2024-01-15T08:16:00' },
            { id: 'C002', user: 'U002', text: 'Contactado con el conductor. Retraso de 15 min confirmado.', timestamp: '2024-01-15T08:20:00' },
            { id: 'C003', user: 'U002', text: 'Resuelto. Carga iniciada a las 08:15. Sin impacto en horario de entrega.', timestamp: '2024-01-15T08:30:00' }
        ]
    },
    {
        id: 'INC-2024-002',
        orderId: 'OC-2024-002',
        type: 'expedition',
        priority: 'high',
        status: 'in_progress',
        title: 'Falta material en picking',
        description: 'Detectada falta de 20 unidades de perfil L-50 en zona de picking. Stock SAP indica disponibilidad.',
        reportedBy: 'U003',
        reportedAt: '2024-01-16T09:45:00',
        assignedTo: 'U002',
        resolvedBy: null,
        resolvedAt: null,
        photos: [
            { id: 'PI002', url: 'https://picsum.photos/800/600?random=11', description: 'Zona picking vacía', timestamp: '2024-01-16T09:46:00' }
        ],
        comments: [
            { id: 'C004', user: 'U003', text: 'Faltan 20 unidades de PERFIL-L-50. SAP indica stock disponible en A3-15-B.', timestamp: '2024-01-16T09:45:00' },
            { id: 'C005', user: 'U002', text: 'Verificando con almacén. Puede ser error de ubicación en sistema.', timestamp: '2024-01-16T09:52:00' },
            { id: 'C006', user: 'U002', text: 'Confirmado: material está en A3-17-B (error de registro). Moviendo ahora.', timestamp: '2024-01-16T10:05:00' }
        ]
    },
    {
        id: 'INC-2024-003',
        orderId: 'OC-2024-003',
        type: 'transport',
        priority: 'low',
        status: 'open',
        title: 'Conductor sin tarjeta de acceso',
        description: 'El conductor no tiene tarjeta de acceso temporal. Esperando en portería.',
        reportedBy: 'U003',
        reportedAt: '2024-01-17T07:32:00',
        assignedTo: 'U002',
        resolvedBy: null,
        resolvedAt: null,
        photos: [],
        comments: [
            { id: 'C007', user: 'U003', text: 'Conductor en portería. Necesita tarjeta temporal para acceso a muelle 3.', timestamp: '2024-01-17T07:32:00' },
            { id: 'C008', user: 'U002', text: 'Contactando con seguridad para emisión de tarjeta.', timestamp: '2024-01-17T07:35:00' }
        ]
    },
    {
        id: 'INC-2024-004',
        orderId: 'OC-2024-004',
        type: 'client',
        priority: 'critical',
        status: 'open',
        title: 'Cliente no disponible para descarga mañana',
        description: 'Cliente informa que mañana no habrá personal para recepción. Solicita reprogramación.',
        reportedBy: 'U002',
        reportedAt: '2024-01-17T11:20:00',
        assignedTo: 'U001',
        resolvedBy: null,
        resolvedAt: null,
        photos: [],
        comments: [
            { id: 'C009', user: 'U002', text: 'Cliente llama avisando que tienen huelga de personal mañana. Imposible recepción.', timestamp: '2024-01-17T11:20:00' },
            { id: 'C010', user: 'U001', text: 'URGENTE: Contactar transportista para reprogramar. Material es prioritario.', timestamp: '2024-01-17T11:25:00' },
            { id: 'C011', user: 'U002', text: 'Intentando localizar al transportista. Camión frigorífico no puede esperar.', timestamp: '2024-01-17T11:35:00' }
        ]
    },
    {
        id: 'INC-2024-005',
        orderId: 'OC-2024-006',
        type: 'logistics',
        priority: 'critical',
        status: 'open',
        title: 'Sin transportista asignado para carga crítica',
        description: 'Orden crítica para proyecto hospitalario sin camión asignado. Requiere certificación A1.',
        reportedBy: 'U001',
        reportedAt: '2024-01-16T17:30:00',
        assignedTo: 'U002',
        resolvedBy: null,
        resolvedAt: null,
        photos: [],
        comments: [
            { id: 'C012', user: 'U001', text: 'CRÍTICO: OC-2024-006 para hospital sin camión. Carga programada para mañana 06:00.', timestamp: '2024-01-16T17:30:00' },
            { id: 'C013', user: 'U002', text: 'Contactando con todos los transportistas certificados para material sanitario A1.', timestamp: '2024-01-16T17:45:00' },
            { id: 'C014', user: 'U002', text: 'LogiTransport Europa puede cubrir con 24h de antelación. Esperando confirmación.', timestamp: '2024-01-16T18:10:00' },
            { id: 'C015', user: 'U001', text: 'Si no confirmamos hoy, tendremos penalización contractual. Elevar a dirección.', timestamp: '2024-01-17T09:00:00' }
        ]
    }
];

// KPIs y Métricas
const KPIS = {
    today: {
        totalOrders: 6,
        ordersCompleted: 1,
        ordersInProgress: 2,
        ordersPending: 3,
        trucksActive: 4,
        trucksWaiting: 2,
        trucksLoading: 1,
        trucksInRoute: 1,
        incidentsOpen: 3,
        incidentsCritical: 2,
        avgLoadingTime: 145, // minutos
        onTimeDeliveryRate: 96.5 // porcentaje
    },
    thisWeek: {
        totalOrders: 42,
        ordersCompleted: 35,
        ordersInProgress: 4,
        ordersPending: 3,
        totalWeight: 125000, // kg
        totalDistance: 8500, // km
        incidentsTotal: 12,
        incidentsResolved: 9,
        avgLoadingTime: 152,
        onTimeDeliveryRate: 95.8
    },
    thisMonth: {
        totalOrders: 187,
        ordersCompleted: 175,
        ordersInProgress: 6,
        ordersPending: 6,
        totalWeight: 542000,
        totalDistance: 35400,
        incidentsTotal: 45,
        incidentsResolved: 41,
        avgLoadingTime: 148,
        onTimeDeliveryRate: 96.2
    },
    trends: {
        ordersVsLastMonth: +12.5, // porcentaje
        loadingTimeVsLastMonth: -8.3,
        onTimeRateVsLastMonth: +2.1,
        incidentsVsLastMonth: -15.4
    }
};

// Eventos del Calendario
const CALENDAR_EVENTS = [
    {
        id: 'EV-001',
        orderId: 'OC-2024-001',
        title: 'Carga Construcciones Mediterráneo',
        start: '2024-01-15T08:00:00',
        end: '2024-01-15T11:00:00',
        status: 'completed',
        transportista: TRANSPORTISTAS[0].company,
        backgroundColor: '#10b981',
        borderColor: '#059669'
    },
    {
        id: 'EV-002',
        orderId: 'OC-2024-002',
        title: 'Carga Industrias del Metal',
        start: '2024-01-16T09:00:00',
        end: '2024-01-16T12:00:00',
        status: 'in_route',
        transportista: TRANSPORTISTAS[1].company,
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb'
    },
    {
        id: 'EV-003',
        orderId: 'OC-2024-003',
        title: 'Carga Almacenes Logísticos del Sur',
        start: '2024-01-17T07:30:00',
        end: '2024-01-17T10:30:00',
        status: 'loading',
        transportista: TRANSPORTISTAS[3].company,
        backgroundColor: '#f59e0b',
        borderColor: '#d97706'
    },
    {
        id: 'EV-004',
        orderId: 'OC-2024-004',
        title: 'Carga Construcciones Modernas BCN',
        start: '2024-01-18T10:00:00',
        end: '2024-01-18T13:00:00',
        status: 'pending',
        transportista: TRANSPORTISTAS[1].company,
        backgroundColor: '#8b5cf6',
        borderColor: '#7c3aed'
    },
    {
        id: 'EV-005',
        orderId: 'OC-2024-005',
        title: 'Carga Distribuciones Valencia Este',
        start: '2024-01-19T08:30:00',
        end: '2024-01-19T11:30:00',
        status: 'pending',
        transportista: TRANSPORTISTAS[0].company,
        backgroundColor: '#64748b',
        borderColor: '#475569'
    },
    {
        id: 'EV-006',
        orderId: 'OC-2024-006',
        title: 'Carga Proyecto Hospitalario [CRÍTICO]',
        start: '2024-01-17T06:00:00',
        end: '2024-01-17T09:00:00',
        status: 'awaiting_truck',
        transportista: 'Sin asignar',
        backgroundColor: '#ef4444',
        borderColor: '#dc2626'
    }
];

// Notificaciones
let NOTIFICATIONS = [
    {
        id: 'N001',
        type: 'critical',
        title: 'Orden crítica sin transportista',
        message: 'OC-2024-006 para proyecto hospitalario requiere asignación urgente',
        timestamp: '2024-01-17T09:00:00',
        read: false,
        actionUrl: '#ordenes/OC-2024-006'
    },
    {
        id: 'N002',
        type: 'warning',
        title: 'Incidencia alta prioridad',
        message: 'Cliente no disponible para descarga OC-2024-004',
        timestamp: '2024-01-17T11:20:00',
        read: false,
        actionUrl: '#incidencias/INC-2024-004'
    },
    {
        id: 'N003',
        type: 'info',
        title: 'Carga en progreso',
        message: 'OC-2024-003 iniciada en muelle 3',
        timestamp: '2024-01-17T07:35:00',
        read: true,
        actionUrl: '#ordenes/OC-2024-003'
    },
    {
        id: 'N004',
        type: 'success',
        title: 'Entrega completada',
        message: 'OC-2024-001 entregada y firmada correctamente',
        timestamp: '2024-01-15T17:20:00',
        read: true,
        actionUrl: '#ordenes/OC-2024-001'
    }
];

// Productos del Catálogo
const CATALOGO_PRODUCTOS = [
    { sku: 'PANEL-ISO-100', description: 'Panel Isopanel 100mm', category: 'Paneles', unitWeight: 20, unit: 'unidades' },
    { sku: 'PANEL-ISO-50', description: 'Panel Isopanel 50mm', category: 'Paneles', unitWeight: 12, unit: 'unidades' },
    { sku: 'PANEL-SANDWICH-50', description: 'Panel sandwich 50mm', category: 'Paneles', unitWeight: 15, unit: 'metros' },
    { sku: 'PANEL-SANITARIO-A1', description: 'Panel sanitario clasificación A1', category: 'Paneles Especiales', unitWeight: 18, unit: 'metros' },
    { sku: 'CHAPA-ALU-05', description: 'Chapa aluminio 0.5mm', category: 'Chapas', unitWeight: 20, unit: 'planchas' },
    { sku: 'PERFIL-L-50', description: 'Perfil en L 50x50mm', category: 'Perfilería', unitWeight: 8, unit: 'metros' },
    { sku: 'PERFIL-HOSPITALARIO', description: 'Perfilería especial hospitales', category: 'Perfilería Especial', unitWeight: 8, unit: 'metros' },
    { sku: 'VIGA-METALICA-6M', description: 'Viga metálica IPN 6 metros', category: 'Estructuras', unitWeight: 80, unit: 'unidades' },
    { sku: 'ACCESORIO-01', description: 'Kit de fijación premium', category: 'Accesorios', unitWeight: 5, unit: 'kits' },
    { sku: 'SELLADOR-PRO', description: 'Sellador profesional 300ml', category: 'Accesorios', unitWeight: 1.5, unit: 'unidades' },
    { sku: 'SELLADOR-SANITARIO', description: 'Sellador bacteriostático', category: 'Accesorios Especiales', unitWeight: 5, unit: 'unidades' },
    { sku: 'REMACHE-PRO', description: 'Remaches profesionales', category: 'Fijaciones', unitWeight: 0.04, unit: 'unidades' },
    { sku: 'TORNILLO-M16', description: 'Tornillería M16 galvanizada', category: 'Fijaciones', unitWeight: 0.2, unit: 'unidades' },
    { sku: 'SOLDADURA-E7018', description: 'Electrodos E7018 profesional', category: 'Soldadura', unitWeight: 5, unit: 'paquetes' },
    { sku: 'PALET-EUR-120', description: 'Palets europeos 120x80', category: 'Embalaje', unitWeight: 20, unit: 'unidades' },
    { sku: 'CAJA-CARTON-L', description: 'Cajas cartón reforzado L', category: 'Embalaje', unitWeight: 1.5, unit: 'unidades' },
    { sku: 'FILM-ESTIRABLE', description: 'Film estirable industrial', category: 'Embalaje', unitWeight: 3, unit: 'rollos' },
    { sku: 'CANALETA-PVC', description: 'Canaleta PVC 100mm', category: 'Instalaciones', unitWeight: 4, unit: 'metros' },
    { sku: 'ESQUINERO-ALU', description: 'Esquineros aluminio', category: 'Acabados', unitWeight: 2, unit: 'unidades' }
];

// Storage Manager
const StorageManager = {
    save: function() {
        try {
            localStorage.setItem('logiflow_users', JSON.stringify(USERS));
            localStorage.setItem('logiflow_transportistas', JSON.stringify(TRANSPORTISTAS));
            localStorage.setItem('logiflow_ordenes', JSON.stringify(ORDENES_CARGA));
            localStorage.setItem('logiflow_incidencias', JSON.stringify(INCIDENCIAS));
            localStorage.setItem('logiflow_notifications', JSON.stringify(NOTIFICATIONS));
            localStorage.setItem('logiflow_kpis', JSON.stringify(KPIS));
            localStorage.setItem('logiflow_calendar', JSON.stringify(CALENDAR_EVENTS));
            console.log('✅ Datos guardados en localStorage');
        } catch (error) {
            console.error('❌ Error al guardar en localStorage:', error);
        }
    },
    
    load: function() {
        try {
            const users = localStorage.getItem('logiflow_users');
            const transportistas = localStorage.getItem('logiflow_transportistas');
            const ordenes = localStorage.getItem('logiflow_ordenes');
            const incidencias = localStorage.getItem('logiflow_incidencias');
            const notifications = localStorage.getItem('logiflow_notifications');
            const kpis = localStorage.getItem('logiflow_kpis');
            const calendar = localStorage.getItem('logiflow_calendar');
            
            if (users) Object.assign(USERS, JSON.parse(users));
            if (transportistas) Object.assign(TRANSPORTISTAS, JSON.parse(transportistas));
            if (ordenes) Object.assign(ORDENES_CARGA, JSON.parse(ordenes));
            if (incidencias) Object.assign(INCIDENCIAS, JSON.parse(incidencias));
            if (notifications) NOTIFICATIONS = JSON.parse(notifications);
            if (kpis) Object.assign(KPIS, JSON.parse(kpis));
            if (calendar) Object.assign(CALENDAR_EVENTS, JSON.parse(calendar));
            
            console.log('✅ Datos cargados desde localStorage');
        } catch (error) {
            console.error('❌ Error al cargar desde localStorage:', error);
        }
    },
    
    clear: function() {
        localStorage.clear();
        console.log('✅ localStorage limpiado');
    }
};

// Inicializar datos
StorageManager.load();

console.log('✅ Sistema de datos mock inicializado');
console.log('📊 Usuarios:', USERS.length);
console.log('🚚 Transportistas:', TRANSPORTISTAS.length);
console.log('📦 Órdenes de carga:', ORDENES_CARGA.length);
console.log('⚠️  Incidencias:', INCIDENCIAS.length);
console.log('🔔 Notificaciones:', NOTIFICATIONS.length);
