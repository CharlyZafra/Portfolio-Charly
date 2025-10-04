'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MessageSquare, Send, User, Image as ImageIcon, X, Globe, Wifi, WifiOff } from 'lucide-react'
import Image from 'next/image'
import { ChatService, FirebaseMessage } from '@/lib/chat-service'
import { Timestamp } from 'firebase/firestore'

interface Message {
  id: string
  name: string
  message: string
  image?: string
  timestamp: Date
}

export function PublicChat() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Configuración de límites
  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB para Firebase
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  // Conectar con Firebase y escuchar mensajes en tiempo real
  useEffect(() => {
    setIsConnected(true)
    
    const unsubscribe = ChatService.subscribeToMessages((firebaseMessages) => {
      const formattedMessages: Message[] = firebaseMessages.map(msg => ({
        id: msg.id || '',
        name: msg.name,
        message: msg.message,
        image: msg.imageUrl,
        timestamp: msg.timestamp instanceof Timestamp 
          ? msg.timestamp.toDate() 
          : new Date(msg.timestamp)
      }))
      
      setMessages(formattedMessages)
    })

    // Cleanup function
    return () => {
      unsubscribe()
      setIsConnected(false)
    }
  }, [])

  // Función para manejar compresión usando el servicio
  const compressImage = async (file: File): Promise<File> => {
    try {
      return await ChatService.compressImage(file)
    } catch (error) {
      throw new Error('Error al comprimir la imagen')
    }
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)
    
    if (!file) return
    
    // Validar tipo de archivo
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Solo se permiten archivos JPG, PNG, GIF y WebP')
      return
    }
    
    // Validar tamaño inicial
    if (file.size > MAX_FILE_SIZE) {
      setError('La imagen es demasiado grande. Máximo 2MB.')
      return
    }
    
    try {
      setIsCompressing(true)
      
      // Comprimir imagen si es necesaria
      let processedFile = file
      if (file.size > 500 * 1024) { // Si es mayor a 500KB, comprimir
        processedFile = await compressImage(file)
      }
      
      // Crear URL de vista previa
      const previewUrl = URL.createObjectURL(processedFile)
      setSelectedImage(previewUrl)
      setImageFile(processedFile)
      
    } catch (error) {
      setError('Error al procesar la imagen. Intenta con otra.')
    } finally {
      setIsCompressing(false)
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSending(true)
    
    try {
      if ((newMessage.trim() || imageFile) && userName.trim()) {
        await ChatService.sendMessage(
          userName.trim(),
          newMessage.trim(),
          imageFile || undefined
        )
        
        // Limpiar formulario
        setNewMessage('')
        setSelectedImage(null)
        setImageFile(null)
        setShowForm(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Error al enviar mensaje')
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }).format(new Date(date))
  }

  return (
    <section id="chat" className="py-20 bg-secondary/5" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            💬 Chat Público
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Chat global en tiempo real. Deja un mensaje sobre mis proyectos y todos los visitantes lo verán. ¡Comparte imágenes de forma segura!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-background rounded-2xl shadow-xl border border-border overflow-hidden"
        >
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <span>Chat Global de Proyectos</span>
                    <Globe className="text-primary" size={16} />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {messages.length} mensaje{messages.length !== 1 ? 's' : ''} • En tiempo real
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Wifi size={16} />
                    <span className="text-xs font-medium">Conectado</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-red-600">
                    <WifiOff size={16} />
                    <span className="text-xs font-medium">Desconectado</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex space-x-3"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground text-sm">
                      {message.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  {message.message && (
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {message.message}
                    </p>
                  )}
                  {message.image && (
                    <div className="mt-2 max-w-sm">
                      <div className="relative rounded-lg overflow-hidden border border-border">
                        <Image
                          src={message.image}
                          alt="Imagen compartida"
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Formulario de Nuevo Mensaje */}
          <div className="p-6 border-t border-border bg-secondary/5">
            {!showForm ? (
              <motion.button
                onClick={() => setShowForm(true)}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={20} />
                <span>Escribir mensaje o subir imagen</span>
              </motion.button>
            ) : (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleSubmitMessage}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Escribe tu mensaje sobre los proyectos... (opcional si subes imagen)"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground resize-none"
                  />
                </div>
                
                {/* Selector de imagen */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={isCompressing}
                  />
                  <div className="flex items-center space-x-3">
                    <motion.button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isCompressing}
                      className={`flex items-center space-x-2 px-4 py-2 border border-border rounded-lg transition-colors text-foreground ${
                        isCompressing 
                          ? 'bg-gray-100 cursor-not-allowed opacity-50' 
                          : 'bg-secondary/20 hover:bg-secondary/30'
                      }`}
                      whileHover={!isCompressing ? { scale: 1.02 } : {}}
                      whileTap={!isCompressing ? { scale: 0.98 } : {}}
                    >
                      <ImageIcon size={16} />
                      <span>{isCompressing ? 'Procesando...' : 'Subir imagen'}</span>
                    </motion.button>
                    {selectedImage && !isCompressing && (
                      <span className="text-sm text-green-600">
                        ✓ Imagen lista
                      </span>
                    )}
                    {isCompressing && (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Comprimiendo...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Mostrar información sobre límites */}
                  <p className="text-xs text-muted-foreground mt-2">
                    Formatos: JPG, PNG, GIF, WebP • Máximo: 500KB • Se comprime automáticamente
                  </p>
                  
                  {/* Mostrar errores */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-sm text-red-600">⚠️ {error}</p>
                    </motion.div>
                  )}
                </div>

                {/* Vista previa de la imagen */}
                {selectedImage && (
                  <div className="relative">
                    <div className="relative w-full max-w-xs mx-auto">
                      <Image
                        src={selectedImage}
                        alt="Vista previa"
                        width={300}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg border border-border"
                      />
                      <motion.button
                        type="button"
                        onClick={removeSelectedImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={14} />
                      </motion.button>
                    </div>
                  </div>
                )}
                <div className="flex space-x-3">
                  <motion.button
                    type="submit"
                    disabled={isSending || isCompressing}
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/80 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSending && !isCompressing ? { scale: 1.02 } : {}}
                    whileTap={!isSending && !isCompressing ? { scale: 0.98 } : {}}
                  >
                    <Send size={16} />
                    <span>{isSending ? 'Enviando...' : 'Enviar'}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-secondary/20 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancelar
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="text-xs text-muted-foreground space-y-1">
            <p>🌐 Los mensajes se sincronizan globalmente en tiempo real</p>
            <p>🔒 Chat moderado • Imágenes hasta 2MB • Compresión automática</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
