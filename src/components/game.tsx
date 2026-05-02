'use client'

import { motion } from 'framer-motion'
import { Gamepad2, RotateCcw } from 'lucide-react'
import { CW, CH } from '@/lib/game-engine'
import { useGame } from '@/hooks/use-game'

export function MiniGame() {
  const { canvasRef, ui, startGame, playing, ml, mr, ms } = useGame()
  const isBoss = ui.phase === 'boss'

  return (
    <section id="game" className="relative py-28 bg-[#060b19] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(99,102,241,0.06),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border-primary text-indigo-400 text-sm font-semibold mb-4">
            <Gamepad2 className="w-4 h-4" />
            Mini Juego
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            ¿Quieres <span className="gradient-text">distraerte?</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-md mx-auto">
            Juega un rato a{' '}
            <span className="text-indigo-400 font-semibold">Guerra Galáctica</span>{' '}
            — destruye a los extraterrestres antes de que lleguen a ti
          </p>
        </motion.div>

        {/* Canvas wrapper */}
        <motion.div
          className="relative mx-auto"
          style={{ maxWidth: CW }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-2xl overflow-hidden neon-border-primary shadow-[0_0_60px_rgba(99,102,241,0.15)]">
            <canvas
              ref={canvasRef}
              width={CW}
              height={CH}
              className="w-full block bg-[#030712]"
              style={{ aspectRatio: `${CW}/${CH}` }}
            />

            {/* IDLE overlay */}
            {ui.phase === 'idle' && (
              <div className="absolute inset-0 bg-[#030712]/94 flex flex-col items-center justify-center gap-5 text-center px-6 py-6 overflow-y-auto">
                <div className="space-y-0.5">
                  <p className="text-4xl font-black tracking-widest gradient-text"
                     style={{ textShadow: '0 0 30px rgba(99,102,241,0.6)' }}>
                    GUERRA
                  </p>
                  <p className="text-4xl font-black tracking-widest"
                     style={{ color: '#22d3ee', textShadow: '0 0 30px rgba(6,182,212,0.6)' }}>
                    GALÁCTICA
                  </p>
                </div>

                <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="glass rounded-xl p-3 border border-indigo-500/20">
                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Controles</p>
                    <ul className="space-y-1 text-slate-400 text-xs">
                      <li><span className="text-slate-200 font-semibold">← →</span> &nbsp;Mover nave</li>
                      <li><span className="text-slate-200 font-semibold">A / D</span> &nbsp;Mover nave (alt)</li>
                      <li><span className="text-slate-200 font-semibold">SPACE</span> &nbsp;Disparar</li>
                      <li className="text-cyan-500/70 text-[11px] pt-0.5">En móvil: usa los botones de abajo</li>
                    </ul>
                  </div>

                  <div className="glass rounded-xl p-3 border border-cyan-500/20">
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Objetivo</p>
                    <ul className="space-y-1 text-slate-400 text-xs">
                      <li>Destruye todos los extraterrestres</li>
                      <li>Sobrevive <span className="text-slate-200 font-semibold">3 vidas</span> (♥♥♥)</li>
                      <li>Cada ola se vuelve <span className="text-red-400 font-semibold">más rápida</span></li>
                      <li>Al terminar cada ola aparece un <span className="text-red-400 font-semibold">BOSS</span></li>
                      <li>Si llegan a ti, <span className="text-red-400 font-semibold">Game Over</span></li>
                    </ul>
                  </div>

                  <div className="glass rounded-xl p-3 border border-purple-500/20 sm:col-span-2">
                    <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Tipos de Enemigos</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'OVNI',    color: '#a78bfa', pts: '25 pts' },
                        { label: 'Cangrejo',color: '#34d399', pts: '20 pts' },
                        { label: 'Bicho',   color: '#f87171', pts: '15 pts' },
                        { label: 'Calamar', color: '#fbbf24', pts: '10 pts' },
                      ].map(({ label, color, pts }) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                          <span className="text-xs text-slate-400">
                            {label} <span className="font-semibold" style={{ color }}>{pts}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={startGame}
                  className="px-12 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg glow-primary transition-all"
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                >
                  INICIAR
                </motion.button>
              </div>
            )}

          {/* GAME OVER overlay */}
            {ui.phase === 'over' && (
              <div className="absolute inset-0 bg-[#030712]/92 flex flex-col items-center justify-center gap-5 text-center">
                <p className="text-5xl font-black tracking-widest"
                   style={{ color: '#f87171', textShadow: '0 0 25px rgba(248,113,113,0.7)' }}>
                  GAME OVER
                </p>
                <p className="text-slate-300 text-xl">
                  Puntuación: <span className="gradient-text font-bold">{ui.score}</span>
                </p>
                <p className="text-slate-600 text-sm">Ola alcanzada: {ui.wave}</p>
                <motion.button
                  onClick={startGame}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl glass neon-border-primary text-indigo-300 hover:text-white font-semibold transition-all"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={15} /> Reintentar
                </motion.button>
              </div>
            )}

            {/* BOSS entry flash banner */}
            {isBoss && ui.bossMaxHp > 0 && (
              <motion.div
                key={`boss-banner-${ui.wave}`}
                initial={{ opacity: 0, scale: 1.4 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [1.4, 1, 1, 0.8] }}
                transition={{ duration: 2.2, times: [0, 0.2, 0.7, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ background: 'rgba(3,7,18,0.6)' }}
              >
                <p className="text-6xl font-black tracking-[0.2em]"
                   style={{ color: '#f87171', textShadow: '0 0 40px rgba(248,113,113,0.9)', lineHeight: 1 }}>
                  BOSS
                </p>
                <p className="text-cyan-400 text-lg font-bold mt-2 tracking-widest">¡DESTRÚYELO!</p>
              </motion.div>
            )}
          </div>

          {/* Mobile controls */}
          {(playing || isBoss) && (
            <div className="flex items-center justify-between mt-4 px-1 md:hidden">
              <div className="flex gap-3">
                {[['◀', ml], ['▶', mr]].map(([label, handler]) => (
                  <button
                    key={label as string}
                    className="w-16 h-14 rounded-xl glass neon-border-primary text-slate-200 text-2xl active:bg-indigo-500/25 select-none touch-none"
                    onPointerDown={() => (handler as (b: boolean) => void)(true)}
                    onPointerUp={() => (handler as (b: boolean) => void)(false)}
                    onPointerLeave={() => (handler as (b: boolean) => void)(false)}
                  >
                    {label as string}
                  </button>
                ))}
              </div>
              <button
                className="w-24 h-14 rounded-xl bg-cyan-600/25 border border-cyan-500/40 text-cyan-400 text-sm font-bold active:bg-cyan-500/35 select-none"
                onPointerDown={ms}
              >
                DISPARO
              </button>
            </div>
          )}

          {(playing || isBoss) && (
            <p className="hidden md:block text-center text-slate-700 text-xs mt-3">
              ← → mover &nbsp;|&nbsp; SPACE disparar
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
