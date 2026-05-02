'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatService } from '@/lib/chat-service'
import { Timestamp } from 'firebase/firestore'
import { checkRateLimit, getRateLimitSeconds } from '@/lib/rate-limiter'
import { sanitizeInput, isSafe } from '@/lib/sanitize'

export interface Message {
  id: string
  name: string
  message: string
  image?: string
  timestamp: Date
}

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export function usePublicChat() {
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
  const [honeypot, setHoneypot] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null
    try {
      setIsConnected(true)
      unsubscribe = ChatService.subscribeToMessages((firebaseMessages) => {
        try {
          setMessages(firebaseMessages.map(msg => ({
            id: msg.id || '',
            name: msg.name,
            message: msg.message,
            image: msg.imageUrl,
            timestamp: msg.timestamp instanceof Timestamp
              ? msg.timestamp.toDate()
              : new Date(msg.timestamp),
          })))
          setError(null)
        } catch {
          setError('Error al cargar mensajes')
        }
      })
    } catch {
      setIsConnected(false)
      setError('Error de conexión. Recarga la página.')
    }
    return () => {
      if (unsubscribe) { try { unsubscribe() } catch {} }
      setIsConnected(false)
    }
  }, [])

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) { setError('Solo se permiten archivos JPG, PNG, GIF y WebP'); return }
    if (file.size > MAX_FILE_SIZE) { setError('La imagen es demasiado grande. Máximo 2MB.'); return }
    try {
      setIsCompressing(true)
      const processedFile = file.size > 500 * 1024 ? await ChatService.compressImage(file) : file
      setSelectedImage(URL.createObjectURL(processedFile))
      setImageFile(processedFile)
    } catch {
      setError('Error al procesar la imagen. Intenta con otra.')
    } finally {
      setIsCompressing(false)
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage(null)
    setImageFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: bot detectado
    if (honeypot) return

    // Sanitizar inputs antes de validar
    const cleanName    = sanitizeInput(userName, 50)
    const cleanMessage = sanitizeInput(newMessage, 500)

    if (!cleanName || !cleanMessage) {
      setError('Por favor completa todos los campos')
      return
    }

    // Validar contenido seguro
    if (!isSafe(cleanName) || !isSafe(cleanMessage)) {
      setError('El mensaje contiene contenido no permitido.')
      return
    }

    // Rate limit: máx 3 mensajes por minuto
    if (!checkRateLimit('chat_message', 3, 60 * 1000)) {
      const wait = getRateLimitSeconds('chat_message', 60 * 1000)
      setError(`Espera ${wait}s antes de enviar otro mensaje.`)
      return
    }

    setError(null)
    setIsSending(true)
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Tiempo de espera agotado. Intenta de nuevo.')), 30000)
      )
      await Promise.race([
        ChatService.sendMessage(cleanName, cleanMessage, imageFile || undefined),
        timeout,
      ])
      setNewMessage('')
      setSelectedImage(null)
      setImageFile(null)
      setShowForm(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar mensaje')
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit',
    }).format(new Date(date))

  return {
    messages,
    newMessage, setNewMessage,
    userName, setUserName,
    showForm, setShowForm,
    selectedImage, imageFile,
    isCompressing, isSending, isConnected,
    error, setError,
    honeypot, setHoneypot,
    fileInputRef,
    handleImageSelect, removeSelectedImage, handleSubmitMessage, formatTime,
  }
}
