import React from 'react'
import { cn } from '../../utils/cn'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

type TooltipCoords = {
  top: number
  left: number
}

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: TooltipSide
  delay?: number
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  delay = 300,
  className,
}) => {
  const [visible, setVisible] = React.useState(false)
  const [coords, setCoords] = React.useState<TooltipCoords | null>(null)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const computeCoords = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return
    const t = triggerRef.current.getBoundingClientRect()
    const tt = tooltipRef.current.getBoundingClientRect()
    const offset = 8

    switch (side) {
      case 'top':
        setCoords({
          top:  t.top - tt.height - offset,
          left: t.left + t.width / 2 - tt.width / 2,
        })
        break
      case 'bottom':
        setCoords({
          top:  t.bottom + offset,
          left: t.left + t.width / 2 - tt.width / 2,
        })
        break
      case 'left':
        setCoords({
          top:  t.top + t.height / 2 - tt.height / 2,
          left: t.left - tt.width - offset,
        })
        break
      case 'right':
        setCoords({
          top:  t.top + t.height / 2 - tt.height / 2,
          left: t.right + offset,
        })
        break
    }
  }, [side])

  React.useLayoutEffect(() => {
    if (!visible) return
    computeCoords()
  }, [computeCoords, content, visible])

  React.useEffect(() => {
    if (!visible) return

    window.addEventListener('resize', computeCoords)
    window.addEventListener('scroll', computeCoords, true)

    return () => {
      window.removeEventListener('resize', computeCoords)
      window.removeEventListener('scroll', computeCoords, true)
    }
  }, [computeCoords, visible])

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setCoords(null)
      setVisible(true)
    }, delay)
  }

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
    setCoords(null)
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </div>
      {visible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            'fixed z-50 px-2.5 py-1.5 text-xs font-medium text-white rounded-(--radius-md) shadow-md pointer-events-none whitespace-nowrap transition-opacity',
            coords ? 'opacity-100' : 'opacity-0',
            className
          )}
          style={{
            top: coords?.top ?? 0,
            left: coords?.left ?? 0,
            backgroundColor: 'var(--color-neutral-900)',
          }}
        >
          {content}
        </div>
      )}
    </>
  )
}
Tooltip.displayName = 'Tooltip'
