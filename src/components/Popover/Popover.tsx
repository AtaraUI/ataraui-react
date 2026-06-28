import React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

type PopoverSide = 'top' | 'bottom' | 'left' | 'right'
type PopoverAlign = 'start' | 'center' | 'end'

type PopoverCoords = {
  top: number
  left: number
}

type PopoverControls = {
  close: () => void
  open: () => void
  setOpen: (open: boolean) => void
}

type PopoverContent = React.ReactNode | ((controls: PopoverControls) => React.ReactNode)

export interface PopoverProps {
  content: PopoverContent
  children: React.ReactNode
  side?: PopoverSide
  align?: PopoverAlign
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  closeOnOutsideClick?: boolean
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  side = 'bottom',
  align = 'center',
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  closeOnOutsideClick = true,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [coords, setCoords] = React.useState<PopoverCoords | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [isControlled, onOpenChange])

  const close = React.useCallback(() => setOpen(false), [setOpen])
  const openPopover = React.useCallback(() => setOpen(true), [setOpen])

  const controls = React.useMemo<PopoverControls>(() => ({
    close,
    open: openPopover,
    setOpen,
  }), [close, openPopover, setOpen])

  const computeCoords = React.useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const popover = popoverRef.current.getBoundingClientRect()
    const offset = 8

    let top = 0
    let left = 0

    if (side === 'top') top = trigger.top - popover.height - offset
    if (side === 'bottom') top = trigger.bottom + offset
    if (side === 'left') left = trigger.left - popover.width - offset
    if (side === 'right') left = trigger.right + offset

    if (side === 'top' || side === 'bottom') {
      if (align === 'start') left = trigger.left
      if (align === 'center') left = trigger.left + trigger.width / 2 - popover.width / 2
      if (align === 'end') left = trigger.right - popover.width
    }

    if (side === 'left' || side === 'right') {
      if (align === 'start') top = trigger.top
      if (align === 'center') top = trigger.top + trigger.height / 2 - popover.height / 2
      if (align === 'end') top = trigger.bottom - popover.height
    }

    setCoords({
      top: Math.max(8, Math.min(top, window.innerHeight - popover.height - 8)),
      left: Math.max(8, Math.min(left, window.innerWidth - popover.width - 8)),
    })
  }, [align, side])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useLayoutEffect(() => {
    if (!isOpen) return
    computeCoords()
  }, [computeCoords, content, isOpen])

  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const clickedTrigger = triggerRef.current?.contains(target)
      const clickedPopover = popoverRef.current?.contains(target)

      if (!clickedTrigger && !clickedPopover) close()
    }

    document.addEventListener('keydown', handleKeyDown)
    if (closeOnOutsideClick) document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', computeCoords)
    window.addEventListener('scroll', computeCoords, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', computeCoords)
      window.removeEventListener('scroll', computeCoords, true)
    }
  }, [close, closeOnOutsideClick, computeCoords, isOpen])

  const popover = isOpen ? (
    <div
      ref={popoverRef}
      role="dialog"
      className={cn(
        'fixed z-50 min-w-48 rounded-(--radius-lg) border border-(--color-neutral-200) bg-white p-4 text-sm text-(--color-neutral-700) shadow-lg outline-none transition-opacity',
        coords ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        top: coords?.top ?? 0,
        left: coords?.left ?? 0,
      }}
    >
      {typeof content === 'function' ? content(controls) : content}
    </div>
  ) : null

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-flex"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {children}
      </div>
      {mounted && popover ? createPortal(popover, document.body) : null}
    </>
  )
}
Popover.displayName = 'Popover'
