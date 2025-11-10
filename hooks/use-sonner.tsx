// hooks/use-sonner.ts
'use client'

import { toast } from "sonner"

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export function useSonner() {
  const showToast = (type: ToastType, options: ToastOptions) => {
    const { title, description, duration = 3000 } = options

    switch (type) {
      case 'success':
        toast.success(title || 'Success', {
          description,
          duration,
        })
        break
      case 'error':
        toast.error(title || 'Error', {
          description,
          duration,
        })
        break
      case 'warning':
        toast.warning?.(title || 'Warning', {
          description,
          duration,
        }) ||
          toast(title || 'Warning', {
            description,
            duration,
            style: { backgroundColor: '#facc15', color: '#000' },
          })
        break
      case 'info':
      default:
        toast(title || 'Info', {
          description,
          duration,
        })
        break
    }
  }

  return { showToast }
}
