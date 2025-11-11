# 📊 Configuración de Meta Pixel (Facebook/Instagram Tracking)

## ✅ **Estado Actual**

El tracking con Meta Pixel está **completamente implementado** pero es **100% opcional**.

- ✅ Si NO configuras el Pixel ID → Todo funciona normal (sin tracking)
- ✅ Si SÍ configuras el Pixel ID → Tracking automático activado

## 🚀 **Cómo Obtener tu Meta Pixel ID**

### **Paso 1: Crear cuenta Facebook Business**

1. Ve a [business.facebook.com](https://business.facebook.com)
2. Crea tu cuenta (gratis)
3. Configura tu Business Manager

### **Paso 2: Crear el Pixel**

1. Ve a **Events Manager**: [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. Click en **"Conectar orígenes de datos"**
3. Selecciona **"Web"**
4. Click en **"Conectar"**
5. Selecciona **"Meta Pixel"**
6. Dale un nombre a tu Pixel (ej: "POS System Landing")
7. Click en **"Crear Pixel"**

### **Paso 3: Obtener el Pixel ID**

1. En Events Manager, verás tu nuevo Pixel
2. El **Pixel ID** es el número de 15-16 dígitos
3. Ejemplo: `1234567890123456`

### **Paso 4: Configurar en tu proyecto**

1. Copia tu Pixel ID
2. Abre tu archivo `.env`
3. Agrega el Pixel ID:

```env
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

4. Reinicia el servidor de desarrollo:

```bash
pnpm dev
```

¡Listo! El tracking ya está funcionando.

---

## 📈 **Eventos que se Trackean Automáticamente**

### **1. PageView**
- Se trackea cuando alguien visita cualquier página
- **Útil para:** Medir tráfico total

### **2. FormStarted**
- Se trackea cuando alguien hace clic en el primer campo del formulario
- **Útil para:** Ver cuántos usuarios empiezan el registro

### **3. Lead** ⭐ (Más importante)
- Se trackea cuando alguien completa el registro en la waitlist
- **Útil para:**
  - Medir conversión
  - Calcular costo por lead (CPL)
  - Optimizar campañas de Meta Ads

### **4. SurveyStarted**
- Se trackea cuando alguien abre la encuesta
- **Útil para:** Ver engagement con la encuesta

### **5. SurveyCompleted**
- Se trackea cuando alguien completa la encuesta
- **Útil para:** Medir tasa de completación de encuesta

### **6. FormError**
- Se trackea cuando hay errores en formularios
- **Útil para:** Detectar problemas técnicos

---

## 🎯 **Configurar Conversiones en Meta Ads**

Una vez que tengas datos, configura conversiones:

### **Paso 1: Ir a Events Manager**

1. Ve a [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. Selecciona tu Pixel

### **Paso 2: Configurar Evento de Conversión Principal**

1. Ve a **"Eventos personalizados"**
2. Click en **"Crear evento personalizado"**
3. Selecciona el evento **"Lead"**
4. Márcalo como **"Conversión principal"**

### **Paso 3: Crear Campañas Optimizadas**

Ahora cuando crees campañas de Meta Ads:

1. Objetivo: **"Generación de clientes potenciales"**
2. Optimización: **"Lead"** (el evento que configuraste)
3. Meta Pixel aprenderá automáticamente qué usuarios convierten mejor

---

## 🧪 **Verificar que Funciona**

### **Método 1: Meta Pixel Helper (Recomendado)**

1. Instala la extensión: [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/)
2. Visita tu landing page
3. Click en el ícono de la extensión
4. Deberías ver:
   - ✅ Pixel detectado
   - ✅ PageView evento
   - ✅ Lead evento (cuando te registres)

### **Método 2: Events Manager**

1. Ve a Events Manager
2. Selecciona tu Pixel
3. Ve a **"Probar eventos"**
4. Ingresa tu URL del landing
5. Interactúa con tu página (registrarte, etc.)
6. Verás los eventos en tiempo real

---

## 🔧 **Troubleshooting**

### **❌ No veo eventos en Events Manager**

1. **Verifica que el Pixel ID sea correcto**
   - Revisa tu `.env`
   - Debe tener 15-16 dígitos

2. **Reinicia el servidor**
   ```bash
   pnpm dev
   ```

3. **Verifica que la variable esté disponible**
   ```bash
   # En tu terminal:
   echo $NEXT_PUBLIC_META_PIXEL_ID
   ```

4. **Limpia caché del navegador**
   - `Cmd + Shift + R` (Mac)
   - `Ctrl + Shift + R` (Windows)

### **❌ Events Manager dice "Pixel no activo"**

- Esto es normal si acabas de crear el Pixel
- Meta tarda 20-30 minutos en detectar el primer evento
- Visita tu página, espera 30 min y vuelve a revisar

### **❌ Los eventos se disparan múltiples veces**

- Esto puede pasar en desarrollo con React Strict Mode
- En producción no sucederá
- No afecta las campañas de Meta Ads

---

## 💰 **Próximos Pasos (Cuando lances ads)**

### **1. Verificar Dominio**

Antes de lanzar ads, verifica tu dominio:

1. Ve a Business Settings
2. Seguridad de marca → Dominios
3. Agrega tu dominio
4. Verifica con DNS (Meta te da instrucciones)

### **2. Crear Campaña de Prueba**

Presupuesto sugerido para Guatemala:

```
Presupuesto: $5-7 USD/día
Duración: 7-10 días
Total: $35-70 USD
Objetivo: Lead
Optimización: Conversiones (Evento: Lead)
Ubicación: Guatemala (Ciudad, Antigua, Quetzaltenango, etc.)
```

### **3. Monitorear Métricas**

Métricas clave:

- **CPL (Costo Por Lead):** $0.50 - $2.00 USD (esperado)
- **CTR (Click-Through Rate):** 1-3%
- **Conversión:** 10-30% (de clicks a leads)

---

## 📚 **Recursos Útiles**

- [Meta Business Suite](https://business.facebook.com)
- [Events Manager](https://business.facebook.com/events_manager)
- [Meta Pixel Helper Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/)
- [Guía oficial de Meta Pixel](https://www.facebook.com/business/help/952192354843755)

---

## 🆘 **Soporte**

Si tienes problemas:
1. Revisa este documento primero
2. Verifica que el Pixel ID esté correcto
3. Usa Meta Pixel Helper para debugging
4. Consulta la documentación oficial de Meta

---

**Última actualización:** 29 de octubre 2025
