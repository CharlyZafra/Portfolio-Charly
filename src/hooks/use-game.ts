'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import {
  GS, newGame, makeAliens, makeBoss, explode,
  CW, CH, PLAYER_W, PLAYER_H, PLAYER_SPEED,
  BULLET_SPEED, ALIEN_BULLET_SPEED,
  ROWS, COLS, A_W, A_H, SHOOT_INTERVAL, ALIEN_COLORS,
  BOSS_W, BOSS_H, BOSS_SPEED,
  drawShip, drawAlien, drawBullet, drawBoss,
} from '@/lib/game-engine'

export function useGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gsRef     = useRef<GS>(newGame())
  const rafRef    = useRef<number | null>(null)
  const [ui, setUi] = useState({ phase: 'idle', score: 0, lives: 3, wave: 1, bossHp: 0, bossMaxHp: 0 })

  const sync = useCallback((gs: GS) =>
    setUi({
      phase: gs.phase,
      score: gs.score,
      lives: gs.lives,
      wave: gs.wave,
      bossHp: gs.boss?.hp ?? 0,
      bossMaxHp: gs.boss?.maxHp ?? 0,
    }), [])

  const loop = useCallback((now: number) => {
    const gs = gsRef.current
    if (gs.phase === 'idle' || gs.phase === 'over') return

    const dt = Math.min(now - gs.lastTime, 50)
    gs.lastTime = now
    gs.tick++

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    if (gs.phase === 'dead') {
      gs.deathTimer--
      if (gs.deathTimer <= 0) { gs.phase = 'playing'; sync(gs) }
    }

    if (gs.phase === 'playing') {
      if (gs.keys.has('ArrowLeft')  || gs.keys.has('a')) gs.px = Math.max(PLAYER_W / 2 + 4, gs.px - PLAYER_SPEED)
      if (gs.keys.has('ArrowRight') || gs.keys.has('d')) gs.px = Math.min(CW - PLAYER_W / 2 - 4, gs.px + PLAYER_SPEED)

      if (gs.keys.has(' ') && now - gs.lastBulletTime > 300) {
        gs.bullets.push({ x: gs.px, y: gs.py - PLAYER_H, active: true })
        gs.lastBulletTime = now
      }

      gs.bullets.forEach(b => { if (b.active) { b.y -= BULLET_SPEED; if (b.y < 0) b.active = false } })
      gs.alienBullets.forEach(b => { if (b.active) { b.y += ALIEN_BULLET_SPEED; if (b.y > CH) b.active = false } })

      const alive = gs.aliens.filter(a => a.alive)
      const speed = Math.max(80, gs.moveInterval - (ROWS * COLS - alive.length) * 11)
      gs.moveTimer += dt
      if (gs.moveTimer >= speed) {
        gs.moveTimer = 0
        const lx = Math.min(...alive.map(a => a.x0 + gs.offX)) - A_W / 2
        const rx = Math.max(...alive.map(a => a.x0 + gs.offX)) + A_W / 2
        if (rx + gs.dirX * 14 > CW - 2) { gs.dirX = -1; gs.offY += 22 }
        else if (lx + gs.dirX * 14 < 2)  { gs.dirX =  1; gs.offY += 22 }
        else gs.offX += gs.dirX * 14
      }

      if (now - gs.lastAlienShootTime > SHOOT_INTERVAL && alive.length) {
        gs.lastAlienShootTime = now
        const s = alive[Math.floor(Math.random() * alive.length)]
        gs.alienBullets.push({ x: s.x0 + gs.offX, y: s.y0 + gs.offY + A_H / 2, active: true })
      }

      gs.bullets.forEach(b => {
        if (!b.active) return
        gs.aliens.forEach(a => {
          if (!a.alive) return
          const ax = a.x0 + gs.offX, ay = a.y0 + gs.offY
          if (b.x > ax - A_W / 2 && b.x < ax + A_W / 2 && b.y > ay - A_H / 2 && b.y < ay + A_H / 2) {
            b.active = false; a.alive = false
            gs.score += 10 + Math.floor(a.type * 5 + gs.wave * 2)
            explode(gs.particles, ax, ay, ALIEN_COLORS[a.type])
          }
        })
      })

      gs.alienBullets.forEach(b => {
        if (!b.active) return
        if (Math.abs(b.x - gs.px) < PLAYER_W / 2 && Math.abs(b.y - gs.py) < PLAYER_H / 2) {
          b.active = false; gs.lives--
          explode(gs.particles, gs.px, gs.py - PLAYER_H / 2, '#6366f1')
          if (gs.lives <= 0) { gs.phase = 'over'; sync(gs); return }
          gs.phase = 'dead'; gs.deathTimer = 90; sync(gs)
        }
      })

      if (gs.aliens.some(a => a.alive && a.y0 + gs.offY + A_H / 2 >= gs.py - PLAYER_H)) {
        gs.phase = 'over'; sync(gs)
      }

      if (gs.aliens.every(a => !a.alive)) {
        // Start boss fight instead of next wave immediately
        gs.phase = 'boss'
        gs.boss = makeBoss(gs.wave)
        gs.bullets = []; gs.alienBullets = []
        sync(gs)
      }

      gs.bullets      = gs.bullets.filter(b => b.active)
      gs.alienBullets = gs.alienBullets.filter(b => b.active)
    }

    // ── Boss phase ────────────────────────────────────────────────
    if (gs.phase === 'boss' && gs.boss) {
      const boss = gs.boss
      const bossShootInterval = Math.max(600, 1800 - gs.wave * 80)

      // Entry animation — slide down from top
      if (boss.phase === 'enter') {
        boss.enterProgress = Math.min(1, boss.enterProgress + 0.018)
        boss.y = -BOSS_H + (BOSS_H + 80) * boss.enterProgress
        if (boss.enterProgress >= 1) { boss.phase = 'fight'; boss.y = 80 }
      }

      if (boss.phase === 'fight') {
        // Move horizontally
        boss.x += boss.dirX * BOSS_SPEED
        if (boss.x > CW - BOSS_W / 2 - 10) { boss.dirX = -1; boss.x = CW - BOSS_W / 2 - 10 }
        if (boss.x < BOSS_W / 2 + 10)       { boss.dirX =  1; boss.x = BOSS_W / 2 + 10 }

        // Boss shoots — spread pattern (3 bullets)
        if (now - boss.lastShootTime > bossShootInterval) {
          boss.lastShootTime = now
          ;[-28, 0, 28].forEach(ox => {
            gs.alienBullets.push({ x: boss.x + ox, y: boss.y + BOSS_H / 2 + 8, active: true })
          })
        }
      }

      // Player bullets hit boss
      gs.bullets.forEach(b => {
        if (!b.active || !gs.boss) return
        const bx = gs.boss.x, by = gs.boss.y
        if (b.x > bx - BOSS_W / 2 && b.x < bx + BOSS_W / 2 &&
            b.y > by - BOSS_H / 2 && b.y < by + BOSS_H / 2) {
          b.active = false
          gs.boss.hp--
          explode(gs.particles, b.x, by, '#f87171')
          sync(gs)

          if (gs.boss.hp <= 0) {
            // Boss defeated — big explosion, next wave
            for (let i = 0; i < 6; i++) {
              const ox = (Math.random() - 0.5) * BOSS_W
              const oy = (Math.random() - 0.5) * BOSS_H
              explode(gs.particles, bx + ox, by + oy, ['#f87171', '#fbbf24', '#a78bfa', '#22d3ee'][i % 4])
            }
            gs.score += 200 + gs.wave * 50
            gs.boss = null
            gs.wave++
            gs.aliens = makeAliens()
            gs.offX = 0; gs.offY = 0; gs.dirX = 1
            gs.moveInterval = Math.max(100, 600 - gs.wave * 45)
            gs.bullets = []; gs.alienBullets = []
            gs.phase = 'playing'
            sync(gs)
          }
        }
      })

      // Boss bullets hit player
      gs.alienBullets.forEach(b => {
        if (!b.active) return
        b.y += ALIEN_BULLET_SPEED * 1.4
        if (b.y > CH) { b.active = false; return }
        if (Math.abs(b.x - gs.px) < PLAYER_W / 2 && Math.abs(b.y - gs.py) < PLAYER_H / 2) {
          b.active = false; gs.lives--
          explode(gs.particles, gs.px, gs.py - PLAYER_H / 2, '#6366f1')
          if (gs.lives <= 0) { gs.boss = null; gs.phase = 'over'; sync(gs); return }
          gs.phase = 'boss'; gs.deathTimer = 70
          sync(gs)
        }
      })

      // Player move during boss
      if (gs.keys.has('ArrowLeft')  || gs.keys.has('a')) gs.px = Math.max(PLAYER_W / 2 + 4, gs.px - PLAYER_SPEED)
      if (gs.keys.has('ArrowRight') || gs.keys.has('d')) gs.px = Math.min(CW - PLAYER_W / 2 - 4, gs.px + PLAYER_SPEED)

      if (gs.keys.has(' ') && now - gs.lastBulletTime > 280) {
        gs.bullets.push({ x: gs.px, y: gs.py - PLAYER_H, active: true })
        gs.lastBulletTime = now
      }

      gs.bullets.forEach(b => { if (b.active) { b.y -= BULLET_SPEED; if (b.y < 0) b.active = false } })
      gs.bullets      = gs.bullets.filter(b => b.active)
      gs.alienBullets = gs.alienBullets.filter(b => b.active)
    }

    gs.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= dt / 700 })
    gs.particles = gs.particles.filter(p => p.life > 0)

    // ── Render ────────────────────────────────────────────────────
    ctx.fillStyle = '#030712'
    ctx.fillRect(0, 0, CW, CH)

    gs.stars.forEach(s => {
      ctx.save(); ctx.fillStyle = `rgba(255,255,255,${s.op})`
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
    })

    gs.aliens.forEach(a => { if (a.alive) drawAlien(ctx, a.x0 + gs.offX, a.y0 + gs.offY, a.type, gs.tick) })
    gs.bullets.forEach(b => drawBullet(ctx, b.x, b.y, true))
    gs.alienBullets.forEach(b => drawBullet(ctx, b.x, b.y, false))

    if (gs.boss) drawBoss(ctx, gs.boss, gs.tick)

    if (gs.phase !== 'dead' || Math.floor(gs.tick / 5) % 2 === 0) drawShip(ctx, gs.px, gs.py, gs.tick)

    gs.particles.forEach(p => {
      ctx.save(); ctx.globalAlpha = Math.max(0, p.life)
      ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 10
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore()
    })

    ctx.save()
    ctx.font = 'bold 14px monospace'
    ctx.fillStyle = '#818cf8'; ctx.shadowColor = '#6366f1'; ctx.shadowBlur = 8
    ctx.fillText(`SCORE  ${gs.score}`, 14, 24)
    if (gs.phase === 'boss') {
      ctx.fillStyle = '#f87171'; ctx.shadowColor = '#f87171'; ctx.textAlign = 'center'
      ctx.font = 'bold 15px monospace'
      ctx.fillText(`⚠ BOSS ⚠`, CW / 2, 24)
    } else {
      ctx.fillStyle = '#22d3ee'; ctx.shadowColor = '#22d3ee'; ctx.textAlign = 'center'
      ctx.fillText(`OLA  ${gs.wave}`, CW / 2, 24)
    }
    ctx.fillStyle = '#f87171'; ctx.shadowColor = '#f87171'; ctx.textAlign = 'right'
    ctx.fillText('♥'.repeat(gs.lives), CW - 14, 24)
    ctx.restore()

    rafRef.current = requestAnimationFrame(loop)
  }, [sync])

  const startGame = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const gs = newGame()
    gs.phase = 'playing'; gs.lastTime = performance.now()
    gsRef.current = gs; sync(gs)
    rafRef.current = requestAnimationFrame(loop)
  }, [loop, sync])

  useEffect(() => {
    const dn = (e: KeyboardEvent) => { gsRef.current.keys.add(e.key); if (e.key === ' ') e.preventDefault() }
    const up = (e: KeyboardEvent) => gsRef.current.keys.delete(e.key)
    window.addEventListener('keydown', dn)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up) }
  }, [])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const ml = useCallback((on: boolean) => {
    on ? gsRef.current.keys.add('ArrowLeft') : gsRef.current.keys.delete('ArrowLeft')
  }, [])
  const mr = useCallback((on: boolean) => {
    on ? gsRef.current.keys.add('ArrowRight') : gsRef.current.keys.delete('ArrowRight')
  }, [])
  const ms = useCallback(() => {
    gsRef.current.keys.add(' ')
    setTimeout(() => gsRef.current.keys.delete(' '), 120)
  }, [])

  const playing = ui.phase === 'playing' || ui.phase === 'dead'

  return { canvasRef, ui, startGame, playing, ml, mr, ms }
}
