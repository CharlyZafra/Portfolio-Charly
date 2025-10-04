'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MessageSquare, Send, User, Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

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
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'Usuario Demo',
      message: '¡Hola! Este es un chat público donde puedes dejar mensajes sobre los proyectos.',
      timestamp: new Date()
    }
  ])
  
  const [newMessage, setNewMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Configuración de límites
  const MAX_FILE_SIZE = 500 * 1024 // 500KB
  const MAX_MESSAGES = 50
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  // Cargar mensajes del localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('portfolio-messages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Guardar mensajes en localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-messages', JSON.stringify(messages))
  }, [messages])

  // Función para comprimir imagen
  const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new window.Image()
      
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
        
        // Convertir a base64 con calidad reducida
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedDataUrl)
      }
      
      img.onerror = () => reject(new Error('Error al procesar la imagen'))
      img.src = URL.createObjectURL(file)
    })
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
    if (file.size > MAX_FILE_SIZE * 2) { // Permitir archivos hasta 1MB para comprimir
      setError('La imagen es demasiado grande. Máximo 1MB.')
      return
    }
    
    try {
      setIsCompressing(true)
      
      // Comprimir imagen
      const compressedImage = await compressImage(file)
      
      // Verificar tamaño después de compresión
      const compressedSize = Math.round((compressedImage.length * 3) / 4) // Tamaño aproximado en bytes
      if (compressedSize > MAX_FILE_SIZE) {
        // Si aún es muy grande, comprimir más
        const smallerImage = await compressImage(file, 600, 0.5)
        const smallerSize = Math.round((smallerImage.length * 3) / 4)
        
        if (smallerSize > MAX_FILE_SIZE) {
          setError('No se pudo comprimir la imagen lo suficiente. Intenta con una imagen más pequeña.')
          return
        }
        
        setSelectedImage(smallerImage)
      } else {
        setSelectedImage(compressedImage)
      }
      
      setImageFile(file)
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

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if ((newMessage.trim() || selectedImage) && userName.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        name: userName.trim(),
        message: newMessage.trim(),
        image: selectedImage || undefined,
        timestamp: new Date()
      }
      
      // Agregar mensaje y mantener solo los últimos MAX_MESSAGES
      setMessages(prev => {
        const updated = [...prev, message]
        return updated.length > MAX_MESSAGES 
          ? updated.slice(-MAX_MESSAGES) 
          : updated
      })
      
      setNewMessage('')
      setSelectedImage(null)
      setImageFile(null)
      setShowForm(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
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
            Deja un mensaje público sobre mis proyectos o experiencia. ¡Comparte imágenes de forma segura!
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
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Chat de Proyectos</h3>
                <p className="text-sm text-muted-foreground">
                  {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
                </p>
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
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/80 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={16} />
                    <span>Enviar</span>
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
            <p>💡 Los mensajes se guardan localmente en tu navegador</p>
            <p>🔒 Máximo {MAX_MESSAGES} mensajes • Imágenes hasta 500KB • Compresión automática</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
