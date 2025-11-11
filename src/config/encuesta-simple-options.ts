// Opciones para encuesta simplificada (6 preguntas clave)

export const encuestaSimpleOptions = {
	// 1. Tipo de negocio
	tipo_negocio: [
		{ value: 'tienda_abarrotes', label: 'Tienda de abarrotes' },
		{ value: 'ferreteria', label: 'Ferretería' },
		{ value: 'farmacia', label: 'Farmacia' },
		{ value: 'cafeteria_restaurante', label: 'Cafetería / Restaurante' },
		{ value: 'ropa_calzado', label: 'Ropa y calzado' },
		{ value: 'electronica', label: 'Electrónica / Tecnología' },
		{ value: 'supermercado', label: 'Supermercado / Minimarket' },
		{ value: 'panaderia', label: 'Panadería / Repostería' },
		{ value: 'otros', label: 'Otro tipo de negocio' }
	],

	// 2. Ventas diarias
	ventas_diarias: [
		{ value: '1-10', label: '1 a 10 ventas' },
		{ value: '11-30', label: '11 a 30 ventas' },
		{ value: '31-50', label: '31 a 50 ventas' },
		{ value: '51-100', label: '51 a 100 ventas' },
		{ value: '100+', label: 'Más de 100 ventas' }
	],

	// 3. Manejo de inventario
	maneja_inventario: [
		{ value: 'si', label: 'Sí, manejo inventario' },
		{ value: 'no', label: 'No manejo inventario' }
	],

	// 5. Precio mensual
	precio_mensual: [
		{ value: '0-50', label: 'Q0 - Q50' },
		{ value: '51-100', label: 'Q51 - Q100' },
		{ value: '101-200', label: 'Q101 - Q200' },
		{ value: '201-300', label: 'Q201 - Q300' },
		{ value: '300+', label: 'Más de Q300' }
	],

	// 6. Facturación electrónica
	necesita_facturacion: [
		{ value: 'si_obligatorio', label: 'Sí, es obligatorio para mi negocio' },
		{ value: 'si_importante', label: 'Sí, sería muy útil' },
		{ value: 'no_importante', label: 'No es importante por ahora' },
		{ value: 'no_necesito', label: 'No necesito facturación electrónica' }
	]
}
