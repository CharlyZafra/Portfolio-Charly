'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Send, User, X, Globe, Wifi, WifiOff } from 'lucide-react'
import Image from 'next/image'
import { usePublicChat } from '@/hooks/use-public-chat'

export function PublicChat() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const {
    messages, newMessage, setNewMessage,
    userName, setUserName,
    showForm, setShowForm,
    selectedImage, isCompressing, isSending, isConnected,
    error, setError,
    honeypot, setHoneypot,
    fileInputRef,
    removeSelectedImage, handleSubmitMessage, formatTime,
  } = usePublicChat()

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
          <div className="w-20 h-1 bg-primary mx-auto" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Chat global en tiempo real. Deja un mensaje sobre mis proyectos y todos los visitantes lo verán.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-background rounded-2xl shadow-xl border border-border overflow-hidden"
        >
          {/* Header */}
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

          {/* Messages */}
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
                    <span className="font-medium text-foreground text-sm">{message.name}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                  </div>
                  {message.message && (
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{message.message}</p>
                  )}
                  {message.image && (
                    <div className="mt-2 max-w-sm">
                      <div className="relative rounded-lg overflow-hidden border border-border">
                        <Image src={message.image} alt="Imagen compartida" width={300} height={200}
                          className="w-full h-auto object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form area */}
          <div className="p-6 border-t border-border bg-secondary/5">
            {!showForm ? (
              <motion.button
                onClick={() => setShowForm(true)}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={20} />
                <span>Escribir mensaje público</span>
              </motion.button>
            ) : (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleSubmitMessage}
                className="space-y-4"
              >
                {/* Honeypot — invisible para humanos, los bots lo rellenan */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-[9999px] opacity-0 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground"
                  required
                />
                <textarea
                  placeholder="Escribe tu mensaje sobre los proyectos..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-foreground resize-none"
                  required
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  disabled={isCompressing}
                />

                {selectedImage && (
                  <div className="relative">
                    <div className="relative w-full max-w-xs mx-auto">
                      <Image src={selectedImage} alt="Vista previa" width={300} height={200}
                        className="w-full h-32 object-cover rounded-lg border border-border" />
                      <motion.button
                        type="button"
                        onClick={removeSelectedImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
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

            {error && !showForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-red-600 dark:text-red-400">⚠️ {error}</p>
                  <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 ml-2">
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
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
            <p>🔒 Chat moderado • Solo mensajes de texto por ahora</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
