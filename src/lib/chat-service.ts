import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp,
  Timestamp,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore'
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage'
import { db, storage } from './firebase'

export interface FirebaseMessage {
  id?: string
  name: string
  message: string
  imageUrl?: string
  imagePath?: string
  timestamp: Timestamp | Date
  approved?: boolean
}

const COLLECTION_NAME = 'chat-messages'
const MAX_MESSAGES = 100

export class ChatService {
  // Escuchar mensajes en tiempo real
  static subscribeToMessages(callback: (messages: FirebaseMessage[]) => void) {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('timestamp', 'desc'),
      limit(MAX_MESSAGES)
    )
    
    return onSnapshot(q, (snapshot) => {
      const messages: FirebaseMessage[] = []
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<FirebaseMessage, 'id'>
        messages.push({
          id: doc.id,
          ...data
        })
      })
      // Ordenar del más antiguo al más nuevo para mostrar
      callback(messages.reverse())
    })
  }

  // Subir imagen a Firebase Storage
  static async uploadImage(file: File, messageId: string): Promise<string> {
    const imagePath = `chat-images/${messageId}-${Date.now()}`
    const imageRef = ref(storage, imagePath)
    
    const snapshot = await uploadBytes(imageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return downloadURL
  }

  // Enviar mensaje
  static async sendMessage(
    name: string, 
    message: string, 
    imageFile?: File
  ): Promise<void> {
    try {
      // Validaciones básicas
      if (!name.trim()) throw new Error('El nombre es requerido')
      if (!message.trim() && !imageFile) throw new Error('El mensaje o imagen es requerido')
      
      // Filtro de palabras ofensivas básico
      const bannedWords = ['spam', 'hack', 'phishing'] // Expandir según necesidad
      const hasOffensiveContent = bannedWords.some(word => 
        name.toLowerCase().includes(word) || message.toLowerCase().includes(word)
      )
      
      if (hasOffensiveContent) {
        throw new Error('El mensaje contiene contenido no permitido')
      }

      let imageUrl = ''
      let imagePath = ''
      
      // Si hay imagen, subirla primero
      if (imageFile) {
        const messageId = Date.now().toString()
        imageUrl = await this.uploadImage(imageFile, messageId)
        imagePath = `chat-images/${messageId}-${Date.now()}`
      }

      // Guardar mensaje en Firestore
      await addDoc(collection(db, COLLECTION_NAME), {
        name: name.trim(),
        message: message.trim(),
        imageUrl: imageUrl || null,
        imagePath: imagePath || null,
        timestamp: serverTimestamp(),
        approved: true // Por ahora auto-aprobamos, se puede cambiar para moderación
      })
      
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  // Comprimir imagen (misma función que antes)
  static compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Calcular nuevas dimensiones
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        // Dibujar imagen comprimida
        ctx?.drawImage(img, 0, 0, width, height)
        
        // Convertir a Blob y luego a File
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Error al comprimir imagen'))
          }
        }, 'image/jpeg', quality)
      }
      
      img.onerror = () => reject(new Error('Error al procesar imagen'))
      img.src = URL.createObjectURL(file)
    })
  }

  // Funciones de administración (para uso futuro)
  static async deleteMessage(messageId: string, imagePath?: string): Promise<void> {
    try {
      // Eliminar imagen si existe
      if (imagePath) {
        const imageRef = ref(storage, imagePath)
        await deleteObject(imageRef)
      }
      
      // Eliminar mensaje
      await deleteDoc(doc(db, COLLECTION_NAME, messageId))
    } catch (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  }

  // Limpiar mensajes antiguos (mantenimiento)
  static async cleanOldMessages(): Promise<void> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('timestamp', 'desc'),
        limit(MAX_MESSAGES + 50) // Obtener más de los necesarios
      )
      
      const snapshot = await getDocs(q)
      const messages = snapshot.docs
      
      // Si hay más mensajes que el límite, eliminar los más antiguos
      if (messages.length > MAX_MESSAGES) {
        const messagesToDelete = messages.slice(MAX_MESSAGES)
        
        for (const messageDoc of messagesToDelete) {
          const data = messageDoc.data()
          await this.deleteMessage(messageDoc.id, data.imagePath)
        }
      }
    } catch (error) {
      console.error('Error cleaning old messages:', error)
    }
  }
}