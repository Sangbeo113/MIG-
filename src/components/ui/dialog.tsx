import * as React from "react"

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({ open: false, onOpenChange: () => {} })

export function Dialog({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen
  const setIsOpen = isControlled && onOpenChange ? onOpenChange : setUncontrolledOpen

  return <DialogContext.Provider value={{ open: isOpen, onOpenChange: setIsOpen }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
  const { onOpenChange } = React.useContext(DialogContext)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => onOpenChange(true)
    })
  }
  return <button onClick={() => onOpenChange(true)}>{children}</button>
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  const { open, onOpenChange } = React.useContext(DialogContext)
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onOpenChange(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div 
        className="relative z-10 w-full max-w-lg rounded-sm p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{ background: '#F8F5F0', border: '1px solid rgba(200,169,110,0.3)' }}
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 text-[#6B6560] hover:text-[#1A1712] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
          aria-label="Đóng hộp thoại"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        {children}
      </div>
    </div>
  )
}
