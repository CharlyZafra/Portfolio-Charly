// ── Constants ──────────────────────────────────────────────────────
export const CW = 700
export const CH = 460
export const PLAYER_W = 44
export const PLAYER_H = 32
export const PLAYER_SPEED = 5
export const BULLET_SPEED = 9
export const ALIEN_BULLET_SPEED = 3.2
export const COLS = 9
export const ROWS = 4
export const A_W = 38
export const A_H = 28
export const A_PAD_X = 16
export const A_PAD_Y = 14
export const FORMATION_TOP = 56
export const SHOOT_INTERVAL = 1600

export const ALIEN_COLORS = ['#a78bfa', '#34d399', '#f87171', '#fbbf24']

// ── Types ──────────────────────────────────────────────────────────
export interface Bullet   { x: number; y: number; active: boolean }
export interface Alien    { x0: number; y0: number; alive: boolean; type: number }
export interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }
export interface Star     { x: number; y: number; r: number; op: number }

export interface GS {
  phase: 'idle' | 'playing' | 'dead' | 'over'
  score: number; lives: number; wave: number
  deathTimer: number
  px: number; py: number
  bullets: Bullet[]; alienBullets: Bullet[]
  lastBulletTime: number; lastAlienShootTime: number
  aliens: Alien[]
  dirX: number; offX: number; offY: number
  moveTimer: number; moveInterval: number
  particles: Particle[]; stars: Star[]
  keys: Set<string>
  tick: number; lastTime: number
}

// ── Pure factories ─────────────────────────────────────────────────
export function makeAliens(): Alien[] {
  const startX = (CW - (COLS * (A_W + A_PAD_X) - A_PAD_X)) / 2
  return Array.from({ length: ROWS * COLS }, (_, i) => {
    const r = Math.floor(i / COLS), c = i % COLS
    return { x0: startX + c * (A_W + A_PAD_X) + A_W / 2, y0: FORMATION_TOP + r * (A_H + A_PAD_Y) + A_H / 2, alive: true, type: r % 4 }
  })
}

export function makeStars(): Star[] {
  return Array.from({ length: 85 }, () => ({
    x: Math.random() * CW,
    y: Math.random() * CH,
    r: Math.random() * 1.4 + 0.3,
    op: Math.random() * 0.7 + 0.3,
  }))
}

export function newGame(): GS {
  return {
    phase: 'idle', score: 0, lives: 3, wave: 1, deathTimer: 0,
    px: CW / 2, py: CH - 46,
    bullets: [], alienBullets: [],
    lastBulletTime: 0, lastAlienShootTime: 0,
    aliens: makeAliens(),
    dirX: 1, offX: 0, offY: 0, moveTimer: 0, moveInterval: 600,
    particles: [], stars: makeStars(),
    keys: new Set(), tick: 0, lastTime: 0,
  }
}

export function explode(particles: Particle[], x: number, y: number, color: string) {
  for (let i = 0; i < 14; i++) {
    const a = (Math.PI * 2 * i) / 14
    const spd = 1.8 + Math.random() * 3.2
    particles.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 1, life: 1, color, size: 2 + Math.random() * 3.5 })
  }
}

// ── Draw: Ship ─────────────────────────────────────────────────────
export function drawShip(ctx: CanvasRenderingContext2D, cx: number, cy: number, tick: number) {
  const x = cx - PLAYER_W / 2, y = cy - PLAYER_H
  ctx.save()

  const fh = 7 + Math.sin(tick * 0.35) * 4
  const g = ctx.createLinearGradient(cx, y + PLAYER_H, cx, y + PLAYER_H + fh + 4)
  g.addColorStop(0, 'rgba(251,146,60,0.95)')
  g.addColorStop(1, 'rgba(251,146,60,0)')
  ctx.fillStyle = g
  ctx.shadowColor = '#fb923c'; ctx.shadowBlur = 18
  ctx.beginPath()
  ctx.ellipse(cx, y + PLAYER_H + 2, 6, fh, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#4338ca'; ctx.shadowColor = '#6366f1'; ctx.shadowBlur = 12
  ctx.beginPath()
  ctx.moveTo(cx, y + PLAYER_H * 0.5)
  ctx.lineTo(x, y + PLAYER_H)
  ctx.lineTo(x + PLAYER_W * 0.32, y + PLAYER_H * 0.62)
  ctx.closePath(); ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx, y + PLAYER_H * 0.5)
  ctx.lineTo(x + PLAYER_W, y + PLAYER_H)
  ctx.lineTo(x + PLAYER_W * 0.68, y + PLAYER_H * 0.62)
  ctx.closePath(); ctx.fill()

  ctx.fillStyle = '#6366f1'; ctx.shadowBlur = 20
  ctx.beginPath()
  ctx.moveTo(cx, y)
  ctx.lineTo(x + PLAYER_W * 0.74, y + PLAYER_H * 0.76)
  ctx.lineTo(x + PLAYER_W * 0.64, y + PLAYER_H)
  ctx.lineTo(x + PLAYER_W * 0.36, y + PLAYER_H)
  ctx.lineTo(x + PLAYER_W * 0.26, y + PLAYER_H * 0.76)
  ctx.closePath(); ctx.fill()

  ctx.fillStyle = '#22d3ee'; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 14
  ctx.beginPath()
  ctx.ellipse(cx, y + PLAYER_H * 0.43, 6, 9, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// ── Draw: Alien ────────────────────────────────────────────────────
export function drawAlien(ctx: CanvasRenderingContext2D, cx: number, cy: number, type: number, tick: number) {
  const anim = Math.floor(tick / 18) % 2
  const c = ALIEN_COLORS[type]
  ctx.save()
  ctx.fillStyle = c; ctx.strokeStyle = c; ctx.shadowColor = c; ctx.shadowBlur = 10

  if (type === 0) {
    ctx.beginPath()
    ctx.ellipse(cx, cy + A_H * 0.14, A_W * 0.44, A_H * 0.24, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath()
    ctx.ellipse(cx, cy - A_H * 0.06, A_W * 0.26, A_H * 0.32, 0, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#030712'
    ;[-0.18, 0, 0.18].forEach(ox => {
      ctx.beginPath(); ctx.ellipse(cx + ox * A_W, cy + A_H * 0.1, 2.5, 3.5, 0, 0, Math.PI * 2); ctx.fill()
    })
    ctx.fillStyle = c; ctx.lineWidth = 2
    ;[-0.28, 0, 0.28].forEach(ox => {
      ctx.beginPath()
      ctx.moveTo(cx + ox * A_W, cy + A_H * 0.3)
      ctx.lineTo(cx + (ox * 1.1 + (anim ? 0.05 : -0.05)) * A_W, cy + A_H * 0.55)
      ctx.stroke()
    })
  } else if (type === 1) {
    ctx.beginPath()
    ctx.roundRect(cx - A_W * 0.32, cy - A_H * 0.22, A_W * 0.64, A_H * 0.55, 5); ctx.fill()
    ctx.fillStyle = '#030712'
    ;[-0.13, 0.13].forEach(ox => {
      ctx.beginPath(); ctx.ellipse(cx + ox * A_W, cy - A_H * 0.06, 4, 5, 0, 0, Math.PI * 2); ctx.fill()
    })
    ctx.fillStyle = c
    const cl = anim ? -2 : 2
    ctx.beginPath(); ctx.roundRect(cx - A_W * 0.52, cy - A_H * 0.14 + cl, A_W * 0.2, A_H * 0.36, 3); ctx.fill()
    ctx.beginPath(); ctx.roundRect(cx + A_W * 0.32, cy - A_H * 0.14 - cl, A_W * 0.2, A_H * 0.36, 3); ctx.fill()
  } else if (type === 2) {
    ctx.beginPath(); ctx.ellipse(cx, cy, A_W * 0.3, A_H * 0.36, 0, 0, Math.PI * 2); ctx.fill()
    ctx.lineWidth = 2
    const ao = anim ? 3 : -3
    ;[[-0.12, -0.28], [0.12, 0.28]].forEach(([ix, ox]) => {
      ctx.beginPath()
      ctx.moveTo(cx + ix * A_W, cy - A_H * 0.25)
      ctx.lineTo(cx + (ox + (ix < 0 ? ao * 0.02 : -ao * 0.02)) * A_W, cy - A_H * 0.52)
      ctx.stroke()
    })
    ;[0, 1, 2].forEach(i => {
      const ly = cy - A_H * 0.1 + i * A_H * 0.15
      const lo = anim && i % 2 === 0 ? 3 : -3
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(cx - A_W * 0.3, ly); ctx.lineTo(cx - A_W * 0.52 - lo, ly + A_H * 0.1); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx + A_W * 0.3, ly); ctx.lineTo(cx + A_W * 0.52 + lo, ly + A_H * 0.1); ctx.stroke()
    })
  } else {
    ctx.beginPath(); ctx.ellipse(cx, cy - A_H * 0.08, A_W * 0.32, A_H * 0.38, 0, 0, Math.PI * 2); ctx.fill()
    ;[0, 1, 2, 3].forEach(i => {
      const tx = cx - A_W * 0.22 + i * A_W * 0.15
      const w = anim && i % 2 === 0 ? 4 : -4
      ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(tx, cy + A_H * 0.27)
      ctx.quadraticCurveTo(tx + w, cy + A_H * 0.42, tx, cy + A_H * 0.56)
      ctx.stroke()
    })
    ctx.fillStyle = '#030712'
    ;[-0.12, 0.12].forEach(ox => {
      ctx.beginPath(); ctx.ellipse(cx + ox * A_W, cy - A_H * 0.1, 4, 5, 0, 0, Math.PI * 2); ctx.fill()
    })
  }
  ctx.restore()
}

// ── Draw: Bullet ───────────────────────────────────────────────────
export function drawBullet(ctx: CanvasRenderingContext2D, x: number, y: number, player: boolean) {
  ctx.save()
  if (player) {
    ctx.fillStyle = '#22d3ee'; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 16
    ctx.beginPath(); ctx.roundRect(x - 2, y - 10, 4, 18, 2); ctx.fill()
  } else {
    ctx.fillStyle = '#f87171'; ctx.shadowColor = '#f87171'; ctx.shadowBlur = 12
    ctx.beginPath(); ctx.roundRect(x - 2, y, 4, 13, 2); ctx.fill()
  }
  ctx.restore()
}
