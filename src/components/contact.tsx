'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Usando Web3Forms (servicio gratuito de formularios)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'your-access-key-here',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          to: 'charlycastellanos333@gmail.com',
          replyto: formData.email,
          // Campos adicionales para mejor organización
          website: 'Portfolio - Charly Castellanos',
          botcheck: '', // Campo anti-spam
        })
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contacto
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría escucharte y colaborar contigo
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Email</p>
                    <p className="text-muted-foreground">charlycastellanos333@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Teléfono</p>
                    <p className="text-muted-foreground">+504 8909-5773</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-3 bg-primary/20 rounded-full">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Ubicación</p>
                    <p className="text-muted-foreground">San Pedro Sula, Honduras</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                ¿Listo para trabajar juntos?
              </h4>
              <p className="text-muted-foreground mb-4">
                Estoy disponible para nuevos proyectos y oportunidades de colaboración. 
                No dudes en contactarme.
              </p>
              <div className="flex space-x-4">
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Disponible
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo hidden para Web3Forms */}
              <input 
                type="hidden" 
                name="access_key" 
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '7e3b7428-0e62-4c59-b832-5f9ad48a9b65'} 
              />
              <input type="hidden" name="subject" value="Nuevo mensaje desde Portfolio - Charly Castellanos" />
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-foreground font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-foreground font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-foreground font-medium mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-foreground font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground resize-none"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  isLoading 
                    ? 'bg-primary/50 cursor-not-allowed' 
                    : isSuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-primary-foreground hover:bg-primary/80'
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Enviando...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span>✅ Mensaje Enviado</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
              
              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-sm mt-2"
                >
                  ¡Gracias! Tu mensaje ha sido enviado correctamente.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
