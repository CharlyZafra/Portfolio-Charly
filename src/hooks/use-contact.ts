'use client'

import { useState } from 'react'
import { checkRateLimit, getRateLimitSeconds } from '@/lib/rate-limiter'
import { sanitizeInput, isSafe } from '@/lib/sanitize'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string // Campo trampa — los bots lo rellenan, los humanos no
}

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '', honeypot: '' }

export function useContact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: si tiene valor es un bot
    if (formData.honeypot) return

    // Rate limit: 1 envío cada 5 minutos
    if (!checkRateLimit('contact_form', 1, 5 * 60 * 1000)) {
      const wait = getRateLimitSeconds('contact_form', 5 * 60 * 1000)
      setError(`Demasiados intentos. Espera ${wait}s antes de volver a enviar.`)
      return
    }

    // Sanitizar y validar inputs
    const name    = sanitizeInput(formData.name, 100)
    const email   = sanitizeInput(formData.email, 200)
    const subject = sanitizeInput(formData.subject, 200)
    const message = sanitizeInput(formData.message, 2000)

    if (!isSafe(name) || !isSafe(subject) || !isSafe(message)) {
      setError('El mensaje contiene contenido no permitido.')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '7e3b7428-0e62-4c59-b832-5f9ad48a9b65',
          name, email, subject, message,
          from_name: name,
          to: 'charlycastellanos333@gmail.com',
          replyto: email,
          website: 'Portfolio - Charly Castellanos',
          botcheck: '',
        }),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setIsSuccess(true)
        setFormData(INITIAL_FORM)
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(result.message || 'Error al enviar')
      }
    } catch {
      setError('Error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return { formData, isLoading, isSuccess, error, handleChange, handleSubmit }
}
