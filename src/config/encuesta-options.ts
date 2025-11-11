// Opciones para cada pregunta de la encuesta basadas en docs/VALIDACION-POS-SAAS.md

export const encuestaOptions = {
	// Bloque 1
	tipoNegocio: [
		{ value: 'tienda', label: 'Tienda/Abarrotería' },
		{ value: 'restaurante', label: 'Restaurante/Cafetería' },
		{ value: 'farmacia', label: 'Farmacia' },
		{ value: 'ferreteria', label: 'Ferretería' },
		{ value: 'ropa', label: 'Ropa/Calzado' },
		{ value: 'electronica', label: 'Electrónica/Tecnología' },
		{ value: 'otro', label: 'Otro' }
	],

	ventas_dia: [
		{ value: 'menos-20', label: 'Menos de 20' },
		{ value: '20-50', label: '20-50' },
		{ value: '50-100', label: '50-100' },
		{ value: '100-200', label: '100-200' },
		{ value: 'mas-200', label: 'Más de 200' }
	],

	sucursales: [
		{ value: '1', label: 'No, solo una ubicación' },
		{ value: '2', label: 'Sí, 2 sucursales' },
		{ value: '3-5', label: 'Sí, 3-5 sucursales' },
		{ value: 'mas-5', label: 'Sí, más de 5 sucursales' }
	],

	metodoActual: [
		{ value: 'papel', label: 'Papel/cuaderno' },
		{ value: 'excel', label: 'Excel' },
		{ value: 'pos', label: 'Sistema POS' },
		{ value: 'app', label: 'Aplicación móvil' },
		{ value: 'ninguno', label: 'No llevo control' },
		{ value: 'otro', label: 'Otro' }
	],

	frustracionNivel: [
		{ value: '1-3', label: '1-3 (Funciona bien)' },
		{ value: '4-6', label: '4-6 (Regular, tiene problemas)' },
		{ value: '7-8', label: '7-8 (Frustrante, pierdo tiempo)' },
		{ value: '9-10', label: '9-10 (Muy frustrante, pierdo dinero)' }
	],

	// Bloque 2
	urgenciaProblema: [
		{ value: '1-3', label: '1-3 (No es urgente, puedo seguir así)' },
		{ value: '4-6', label: '4-6 (Sería bueno tenerlo, pero no es crítico)' },
		{ value: '7-8', label: '7-8 (Es importante, lo necesito pronto)' },
		{ value: '9-10', label: '9-10 (URGENTE, estoy perdiendo dinero)' }
	],

	perdidaDinero: [
		{ value: 'nunca', label: 'No, nunca' },
		{ value: 'menos-500', label: 'Sí, ocasionalmente (menos de Q500/mes)' },
		{ value: '500-1500', label: 'Sí, con frecuencia (Q500-1,500/mes)' },
		{ value: '1500-5000', label: 'Sí, constantemente (Q1,500-5,000/mes)' },
		{ value: 'mas-5000', label: 'Sí, mucho (más de Q5,000/mes)' }
	],

	tiempoPerdido: [
		{ value: 'menos-2', label: 'Menos de 2 horas' },
		{ value: '2-5', label: '2-5 horas' },
		{ value: '5-10', label: '5-10 horas' },
		{ value: '10-20', label: '10-20 horas' },
		{ value: 'mas-20', label: 'Más de 20 horas' }
	],

	// Bloque 3
	funcionalidadesImprescindibles: [
		{ value: 'pos-rapido', label: 'Punto de venta rápido' },
		{ value: 'inventario-real-time', label: 'Control de inventario en tiempo real' },
		{ value: 'multi-sucursal', label: 'Múltiples sucursales' },
		{ value: 'reportes', label: 'Reportes automáticos' },
		{ value: 'usuarios', label: 'Gestión de usuarios/empleados' },
		{ value: 'caja', label: 'Control de caja registradora' },
		{ value: 'clientes', label: 'Base de datos de clientes' },
		{ value: 'comprobantes', label: 'Comprobantes PDF' },
		{ value: 'alertas-stock', label: 'Alertas de stock bajo' },
		{ value: 'transferencias', label: 'Transferencias entre sucursales' }
	],

	dispuestoInvertir: [
		{ value: 'definitivamente-si', label: 'Definitivamente sí' },
		{ value: 'probablemente-si', label: 'Probablemente sí' },
		{ value: 'tal-vez', label: 'Tal vez, depende del precio' },
		{ value: 'probablemente-no', label: 'Probablemente no' },
		{ value: 'definitivamente-no', label: 'Definitivamente no' }
	],

	pagoActual: [
		{ value: '0', label: 'Q0 (No pago nada, uso Excel/papel)' },
		{ value: '1-50', label: 'Q1-50/mes' },
		{ value: '50-100', label: 'Q50-100/mes' },
		{ value: '100-200', label: 'Q100-200/mes' },
		{ value: '200-500', label: 'Q200-500/mes' },
		{ value: 'mas-500', label: 'Más de Q500/mes' }
	],

	dispuestoPagar: [
		{ value: '0-50', label: 'Q0 - Q50/mes (Solo si es muy básico)' },
		{ value: '50-100', label: 'Q50 - Q100/mes (Aceptable)' },
		{ value: '100-150', label: 'Q100 - Q150/mes (Buen precio)' },
		{ value: '150-200', label: 'Q150 - Q200/mes (Razonable)' },
		{ value: '200-300', label: 'Q200 - Q300/mes (Si tiene todo lo que necesito)' },
		{ value: 'mas-300', label: 'Q300+/mes (Si es la mejor solución)' },
		{ value: 'anual', label: 'Prefiero pago anual (con descuento)' }
	],

	queTeHariaElegir: [
		{ value: 'precio', label: 'Precio más bajo' },
		{ value: 'funcionalidades', label: 'Funcionalidades completas' },
		{ value: 'facil-usar', label: 'Fácil de usar' },
		{ value: 'soporte-local', label: 'Soporte en Guatemala' },
		{ value: 'multi-sucursal', label: 'Múltiples sucursales' },
		{ value: 'sin-contrato', label: 'Sin contrato/compromiso a largo plazo' },
		{ value: 'prueba-gratuita', label: 'Prueba gratuita real' },
		{ value: 'datos-seguros', label: 'Datos seguros en la nube' },
		{ value: 'movil', label: 'Acceso desde celular/tablet' },
		{ value: 'capacitacion', label: 'Capacitación incluida' }
	],

	// Bloque 4
	earlyAdopterInteresado: [
		{ value: 'definitivamente-si', label: 'Definitivamente sí, quiero ser de los primeros' },
		{ value: 'probablemente-si', label: 'Probablemente sí, depende de la oferta' },
		{ value: 'tal-vez', label: 'Tal vez, necesito más información' },
		{ value: 'probablemente-no', label: 'Probablemente no' },
		{ value: 'no-interesado', label: 'No estoy interesado' }
	],

	incentivoPreferido: [
		{ value: '2-meses-gratis', label: '2 meses gratis (sin pagar nada)' },
		{ value: '50-descuento', label: '50% de descuento de por vida' },
		{ value: '1-mes-30', label: '1 mes gratis + 30% descuento permanente' },
		{
			value: 'precio-bloqueado',
			label: 'Precio especial bloqueado: Q99/mes para siempre (vs. Q199 precio normal)'
		},
		{ value: 'ninguno', label: 'Ninguna, no quiero acceso anticipado' }
	],

	usariaActivamente: [
		{
			value: 'si-definitivamente',
			label: 'Sí, definitivamente lo uso desde el día 1'
		},
		{ value: 'probablemente-si', label: 'Probablemente sí, lo probaría seriamente' },
		{ value: 'tal-vez', label: 'Tal vez, dependería de mi disponibilidad' },
		{ value: 'no-seguro', label: 'No estoy seguro' },
		{ value: 'no', label: 'No, solo me interesaba por curiosidad' }
	],

	// Bloque 5
	recomendaria: [
		{ value: 'definitivamente-si', label: 'Definitivamente sí' },
		{ value: 'probablemente-si', label: 'Probablemente sí' },
		{ value: 'no-seguro', label: 'No estoy seguro' },
		{ value: 'probablemente-no', label: 'Probablemente no' },
		{ value: 'definitivamente-no', label: 'Definitivamente no' }
	]
} as const
