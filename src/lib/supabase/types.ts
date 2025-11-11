export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			waitlist_leads: {
				Row: {
					id: string
					email: string
					name: string
					encuesta_token: string
					encuesta_completed: boolean
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					email: string
					name: string
					encuesta_token: string
					encuesta_completed?: boolean
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					email?: string
					name?: string
					encuesta_token?: string
					encuesta_completed?: boolean
					created_at?: string
					updated_at?: string
				}
			}
			encuesta_simple_responses: {
				Row: {
					id: string
					lead_id: string
					tipo_negocio: string
					tipo_negocio_otro: string | null
					ventas_diarias: string
					maneja_inventario: 'si' | 'no'
					problema_principal: string
					precio_mensual: string
					necesita_facturacion: string
					feature_deseado: string | null
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					lead_id: string
					tipo_negocio: string
					tipo_negocio_otro?: string | null
					ventas_diarias: string
					maneja_inventario: 'si' | 'no'
					problema_principal: string
					precio_mensual: string
					necesita_facturacion: string
					feature_deseado?: string | null
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					lead_id?: string
					tipo_negocio?: string
					tipo_negocio_otro?: string | null
					ventas_diarias?: string
					maneja_inventario?: 'si' | 'no'
					problema_principal?: string
					precio_mensual?: string
					necesita_facturacion?: string
					feature_deseado?: string | null
					created_at?: string
					updated_at?: string
				}
			}
			encuesta_responses: {
				Row: {
					id: string
					lead_id: string
					// Bloque 1: Información básica
					tipo_negocio: string | null
					ciudad: string | null
					ventas_dia: string | null
					sucursales: string | null
					metodo_actual: string | null
					metodo_actual_otro: string | null
					frustracion_nivel: string | null
					usa_whatsapp: boolean | null
					// Bloque 2: Validación del problema
					urgencia_problema: string | null
					perdida_dinero: string | null
					tiempo_perdido: string | null
					// Bloque 3: Disposición a pagar
					funcionalidades_imprescindibles: Json | null
					funcionalidad_game_changer: string | null
					dispuesto_invertir: string | null
					pago_actual: string | null
					dispuesto_pagar: string | null
					que_te_haria_elegir: Json | null
					// Bloque 4: Compromiso early adopter
					early_adopter_interesado: string | null
					incentivo_preferido: string | null
					usaria_activamente: string | null
					// Bloque 5: Feedback final
					recomendaria: string | null
					mejoras_sugeridas: string | null
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					lead_id: string
					tipo_negocio?: string | null
					ciudad?: string | null
					ventas_dia?: string | null
					sucursales?: string | null
					metodo_actual?: string | null
					metodo_actual_otro?: string | null
					frustracion_nivel?: string | null
					usa_whatsapp?: boolean | null
					urgencia_problema?: string | null
					perdida_dinero?: string | null
					tiempo_perdido?: string | null
					funcionalidades_imprescindibles?: Json | null
					funcionalidad_game_changer?: string | null
					dispuesto_invertir?: string | null
					pago_actual?: string | null
					dispuesto_pagar?: string | null
					que_te_haria_elegir?: Json | null
					early_adopter_interesado?: string | null
					incentivo_preferido?: string | null
					usaria_activamente?: string | null
					recomendaria?: string | null
					mejoras_sugeridas?: string | null
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					lead_id?: string
					tipo_negocio?: string | null
					ciudad?: string | null
					ventas_dia?: string | null
					sucursales?: string | null
					metodo_actual?: string | null
					metodo_actual_otro?: string | null
					frustracion_nivel?: string | null
					usa_whatsapp?: boolean | null
					urgencia_problema?: string | null
					perdida_dinero?: string | null
					tiempo_perdido?: string | null
					funcionalidades_imprescindibles?: Json | null
					funcionalidad_game_changer?: string | null
					dispuesto_invertir?: string | null
					pago_actual?: string | null
					dispuesto_pagar?: string | null
					que_te_haria_elegir?: Json | null
					early_adopter_interesado?: string | null
					incentivo_preferido?: string | null
					usaria_activamente?: string | null
					recomendaria?: string | null
					mejoras_sugeridas?: string | null
					created_at?: string
					updated_at?: string
				}
			}
		}
	}
}
