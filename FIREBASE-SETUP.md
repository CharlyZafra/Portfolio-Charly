# 🔥 Configuración de Firebase para Chat Global

## 📋 Pasos para configurar Firebase

### 1. Crear proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: `portfolio-charly-chat`)
4. Configúralo como desees
5. Espera a que se cree

### 2. Configurar Firestore Database
1. En tu proyecto, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Empezar en modo de producción"
4. Elige una ubicación cercana (ej: `us-central`)

### 3. Configurar Firebase Storage
1. Ve a "Storage"
2. Haz clic en "Comenzar"
3. Acepta las reglas predeterminadas por ahora

### 4. Obtener configuración del proyecto
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. En la pestaña "General", busca "Tus aplicaciones"
3. Haz clic en "Agregar aplicación" → "Web" (icono </>)
4. Registra tu app con un nombre
5. **Copia la configuración** que aparece

### 5. Actualizar variables de entorno
Reemplaza los valores en `.env.local` con tu configuración:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aquí
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

## 🛡️ Reglas de Seguridad

### Reglas de Firestore
Ve a "Firestore Database" → "Reglas" y reemplaza con:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para chat-messages
    match /chat-messages/{messageId} {
      // Permitir lectura a todos
      allow read: if true;
      
      // Permitir escritura con validaciones
      allow create: if isValidMessage(resource.data);
      
      // Solo admins pueden eliminar (configura después)
      allow delete: if false;
    }
    
    // Función de validación
    function isValidMessage(data) {
      return data.keys().hasAll(['name', 'message', 'timestamp']) &&
             data.name is string &&
             data.message is string &&
             data.name.size() > 0 &&
             data.name.size() <= 50 &&
             data.message.size() <= 500 &&
             (!('imageUrl' in data) || data.imageUrl is string) &&
             data.timestamp == request.time;
    }
  }
}
```

### Reglas de Storage
Ve a "Storage" → "Reglas" y reemplaza con:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Reglas para imágenes del chat
    match /chat-images/{imageId} {
      // Permitir lectura a todos
      allow read: if true;
      
      // Permitir escritura de imágenes con validaciones
      allow write: if isValidImage();
      
      // Solo admins pueden eliminar
      allow delete: if false;
    }
    
    // Función de validación para imágenes
    function isValidImage() {
      return request.resource.size < 2 * 1024 * 1024 && // Máximo 2MB
             request.resource.contentType.matches('image/.*');
    }
  }
}
```

## 🚀 Despliegue

Una vez configurado:

1. **Reinicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Prueba el chat**:
   - Ve a tu portfolio
   - Navega al chat
   - Envía un mensaje de prueba
   - Abre otra pestaña y verifica que se sincronice

3. **Despliega a producción**:
   ```bash
   git add .
   git commit -m "Add global Firebase chat functionality"
   git push origin main
   ```

## 🔧 Funcionalidades Implementadas

### ✅ Chat en Tiempo Real
- Los mensajes se sincronizan automáticamente entre todos los visitantes
- Sin necesidad de recargar la página

### ✅ Subida de Imágenes
- Soporte para JPG, PNG, GIF, WebP
- Compresión automática
- Almacenamiento seguro en Firebase Storage

### ✅ Moderación Básica
- Filtro de palabras ofensivas
- Límites de caracteres
- Validación de contenido

### ✅ Indicadores de Estado
- Estado de conexión
- Progreso de envío
- Manejo de errores

## 📊 Límites y Cuotas

### Firebase Spark (Gratis)
- **Firestore**: 50,000 lecturas/día, 20,000 escrituras/día
- **Storage**: 1GB almacenamiento, 10GB transferencia/mes
- **Hosting**: 10GB almacenamiento, 360MB/día

Para un chat de portfolio personal, estos límites son más que suficientes.

## 🛠️ Mantenimiento

El sistema incluye función de limpieza automática que mantiene solo los últimos 100 mensajes. Para ejecutarla manualmente:

```javascript
// En consola del navegador (solo para testing)
import { ChatService } from './lib/chat-service'
await ChatService.cleanOldMessages()
```

## 🔐 Seguridad Adicional (Opcional)

Para mayor seguridad, puedes implementar:

1. **Autenticación anónima**
2. **Rate limiting**
3. **Moderación automática con ML**
4. **Reportes de usuarios**

¡Tu chat global está listo! 🎉