// hooks/use-sonner.ts
'use client'

import { toast } from "sonner"

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
  style?: React.CSSProperties
}

export function useSonner() {
  const showToast = (type: ToastType, options: ToastOptions) => {
    const { title, description, duration = 3000, style } = options
    const mergedStyle: React.CSSProperties = { color: '#000000', ...(style || {}) }

    switch (type) {
      case 'success':
        toast.success(title || 'Success', {
          description,
          duration,
          style: mergedStyle,
        })
        break
      case 'error':
        toast.error(title || 'Error', {
          description,
          duration,
          style: mergedStyle,
        })
        break
      case 'warning':
        toast.warning?.(title || 'Warning', {
          description,
          duration,
          style: mergedStyle,
        }) ||
          toast(title || 'Warning', {
            description,
            duration,
            style: { backgroundColor: '#facc15', color: '#000000', ...mergedStyle },
          })
        break
      case 'info':
      default:
        toast(title || 'Info', {
          description,
          duration,
          style: mergedStyle,
        })
        break
    }
  }

  return { showToast }
}
