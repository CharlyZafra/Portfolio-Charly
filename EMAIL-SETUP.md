# Configuración del Formulario de Contacto 📧

## 🚀 Instrucciones para configurar Web3Forms

Tu formulario de contacto ya está listo! Solo necesitas obtener una clave gratuita de Web3Forms para empezar a recibir emails.

### Paso 1: Obtener tu clave gratuita
1. Ve a [web3forms.com](https://web3forms.com/)
2. Haz clic en **"Get Started Free"**
3. Completa el formulario con:
   - **Email**: `charlycastellanos333@gmail.com`
   - **Website**: URL de tu portfolio
4. Verifica tu email

### Paso 2: Configurar la clave
1. Copia la clave que recibiste por email
2. Abre el archivo `.env.local` en tu proyecto
3. Reemplaza `tu-clave-aqui` con tu clave real:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=tu-clave-real-aqui
   ```

### Paso 3: Reiniciar el servidor
```bash
npm run dev
```

## ✨ Características configuradas:

- **Servicio**: Web3Forms (gratuito, 1000 envíos/mes)
- **Destinatario**: charlycastellanos333@gmail.com
- **Respuesta automática**: Configurada
- **Anti-spam**: Protección incluida
- **Validación**: Formulario y servidor
- **UI/UX**: Indicadores de carga y éxito

## 🔧 Funcionalidades incluidas:

- ✅ Envío directo a tu email
- ✅ Respuesta automática al remitente
- ✅ Validación de campos
- ✅ Indicadores de estado (loading, éxito, error)
- ✅ Protección anti-spam
- ✅ Diseño responsivo con tema claro/oscuro

## 📝 Estructura del email que recibirás:

```
De: [Nombre del visitante] <noreply@web3forms.com>
Para: charlycastellanos333@gmail.com
Asunto: [Asunto del mensaje]
Responder a: [Email del visitante]

Mensaje:
[Contenido del mensaje]

---
Enviado desde: Portfolio - Charly Castellanos
```

## 🛠️ Configuración avanzada (opcional):

Si quieres personalizar más el servicio, puedes:
- Configurar respuestas automáticas personalizadas
- Añadir webhooks
- Configurar notificaciones adicionales
- Ver estadísticas de envíos

¡Todo está listo para recibir mensajes profesionales! 🎉
