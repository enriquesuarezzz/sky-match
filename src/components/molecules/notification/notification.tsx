import { useEffect } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000) // Auto-close after 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div
      className={`fixed right-5 top-5 rounded-lg px-4 py-3 text-white shadow-lg ${getBackgroundColor()}`}
    >
      {message}
    </div>
  )
}

export default Notification
