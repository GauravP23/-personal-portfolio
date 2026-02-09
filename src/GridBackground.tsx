import { useEffect, useRef } from 'react'

const GRID = 24
const DOT_RADIUS = 2.5
const INTERACTION_RADIUS = 120

/**
 * Full-viewport <canvas> that draws:
 *  1. A faint grid of lines every 24 px
 *  2. Dots at every grid intersection
 *  3. Mouse-interactive effect — dots near the cursor grow, glow,
 *     and nearby tiles subtly darken, producing the "alive" grid feel
 *     from the reference portfolio.
 */
export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = document.documentElement.scrollHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${document.documentElement.scrollHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handleMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY }
    }

    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }

    const draw = () => {
      const w = window.innerWidth
      const h = document.documentElement.scrollHeight

      // Resize if page height changed (content loaded, etc.)
      if (canvas.style.height !== `${h}px`) resize()

      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y

      // ── Grid lines ──
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.055)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= w; x += GRID) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
      }
      for (let y = 0; y <= h; y += GRID) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
      }
      ctx.stroke()

      // ── Tile darkening near cursor ──
      const tileRadius = INTERACTION_RADIUS * 1.2
      const startCol = Math.max(0, Math.floor((mx - tileRadius) / GRID))
      const endCol = Math.min(Math.floor(w / GRID), Math.ceil((mx + tileRadius) / GRID))
      const startRow = Math.max(0, Math.floor((my - tileRadius) / GRID))
      const endRow = Math.min(Math.floor(h / GRID), Math.ceil((my + tileRadius) / GRID))

      for (let col = startCol; col < endCol; col++) {
        for (let row = startRow; row < endRow; row++) {
          const cx = col * GRID + GRID / 2
          const cy = row * GRID + GRID / 2
          const dist = Math.hypot(cx - mx, cy - my)
          if (dist < tileRadius) {
            const strength = 1 - dist / tileRadius
            ctx.fillStyle = `rgba(255, 64, 0, ${0.03 * strength})`
            ctx.fillRect(col * GRID, row * GRID, GRID, GRID)
          }
        }
      }

      // ── Dots at intersections ──
      const dotStartCol = Math.max(0, Math.floor((mx - INTERACTION_RADIUS) / GRID) - 1)
      const dotEndCol = Math.min(Math.floor(w / GRID) + 1, Math.ceil((mx + INTERACTION_RADIUS) / GRID) + 1)
      const dotStartRow = Math.max(0, Math.floor((my - INTERACTION_RADIUS) / GRID) - 1)
      const dotEndRow = Math.min(Math.floor(h / GRID) + 1, Math.ceil((my + INTERACTION_RADIUS) / GRID) + 1)

      // Draw all dots faintly first
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      for (let x = 0; x <= w; x += GRID) {
        for (let y = 0; y <= h; y += GRID) {
          ctx.beginPath()
          ctx.arc(x, y, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Interactive dots near cursor
      for (let col = dotStartCol; col <= dotEndCol; col++) {
        for (let row = dotStartRow; row <= dotEndRow; row++) {
          const ix = col * GRID
          const iy = row * GRID
          const dist = Math.hypot(ix - mx, iy - my)
          if (dist < INTERACTION_RADIUS) {
            const t = 1 - dist / INTERACTION_RADIUS
            const radius = DOT_RADIUS + t * 3
            const alpha = 0.15 + t * 0.6

            ctx.beginPath()
            ctx.arc(ix, iy, radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 64, 0, ${alpha})`
            ctx.fill()

            // Glow
            if (t > 0.3) {
              ctx.beginPath()
              ctx.arc(ix, iy, radius + 4, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255, 64, 0, ${(t - 0.3) * 0.12})`
              ctx.fill()
            }
          }
        }
      }

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('mouseleave', handleLeave)
    raf.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
