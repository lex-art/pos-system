# ✅ Checklist de Configuración de Emails

Usa este checklist para verificar que Brevo esté configurado correctamente.

## 📝 Antes de Empezar

- [ ] Tienes cuenta en Brevo (https://www.brevo.com)
- [ ] Has verificado tu email en Brevo
- [ ] Tienes acceso a tu dashboard de Brevo

---

## 🔑 Configuración de API

- [ ] API Key generada en Brevo > Settings > SMTP & API
- [ ] API Key copiada correctamente (empieza con `xkeysib-`)
- [ ] Variable `BREVO_API_KEY` agregada en `.env`
- [ ] Variable `BREVO_SENDER_EMAIL` configurada
- [ ] Variable `BREVO_SENDER_NAME` configurada
- [ ] Variable `NEXT_PUBLIC_APP_URL` configurada

---

## 📧 Email de Envío

**Opción A: Email Simple (Desarrollo)**
- [ ] Email verificado en Brevo > Settings > Senders
- [ ] Usas el mismo email en `BREVO_SENDER_EMAIL`

**Opción B: Dominio Propio (Producción)**
- [ ] Dominio agregado en Brevo > Settings > Domains
- [ ] Registros DNS configurados (SPF, DKIM, DMARC)
- [ ] Dominio verificado (status: ✅ Verified)
- [ ] Email usa el dominio verificado

---

## 🧪 Pruebas

- [ ] Servidor de desarrollo iniciado (`pnpm dev`)
- [ ] Página de prueba accesible: http://localhost:3001/test-email
- [ ] Email de prueba enviado exitosamente
- [ ] Email recibido en bandeja de entrada
- [ ] Email NO está en spam
- [ ] Link de encuesta funciona correctamente
- [ ] Diseño del email se ve bien (HTML)

---

## ✅ Verificación Final

- [ ] Template de email tiene información correcta
- [ ] Nombre del remitente es correcto
- [ ] Asunto del email es apropiado
- [ ] Link de encuesta incluye token único
- [ ] Email es responsive (mobile)
- [ ] Texto está en español
- [ ] Incentivo "2 meses gratis" está visible

---

## 🚀 Producción (Vercel)

- [ ] Variables de entorno configuradas en Vercel
- [ ] `NEXT_PUBLIC_APP_URL` apunta a dominio de producción
- [ ] Email de prueba enviado desde producción
- [ ] Emails NO caen en spam en producción
- [ ] Dominio propio verificado (recomendado)

---

## 🔧 Troubleshooting

Si algo falla, verifica:

1. **Email no llega**
   - [ ] Revisa carpeta de spam
   - [ ] Verifica que el email esté verificado en Brevo
   - [ ] Ve a Brevo > Statistics > Logs
   - [ ] Espera 2-5 minutos

2. **Error de API Key**
   - [ ] API Key copiada sin espacios
   - [ ] Reiniciaste el servidor (`Ctrl+C` y `pnpm dev`)
   - [ ] API Key es válida en Brevo

3. **Email en spam**
   - [ ] Configura dominio propio con SPF/DKIM
   - [ ] Evita palabras spam en asunto
   - [ ] Usa dominio profesional

---

## 📊 Monitoreo

- [ ] Dashboard de Brevo accesible
- [ ] Estadísticas visibles (enviados, abiertos, clicks)
- [ ] Sin errores en los logs
- [ ] Rate limit OK (300 emails/día en plan gratuito)

---

## ✨ Estado Final

**Todo funciona si:**
- ✅ Test email se envía sin errores
- ✅ Email llega a bandeja de entrada
- ✅ Link de encuesta funciona
- ✅ Diseño se ve profesional
- ✅ Sin errores en consola

---

**Última verificación:** [Fecha]
**Verificado por:** [Tu nombre]

---

## 🆘 ¿Necesitas Ayuda?

Ver guía detallada: [BREVO-SETUP.md](./BREVO-SETUP.md)

**Soporte:**
- Documentación: https://developers.brevo.com/
- Help Center: https://help.brevo.com/
