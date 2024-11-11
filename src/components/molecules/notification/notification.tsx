import { useEffect } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | null
  onClose: () => void
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000) // auto-close after 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  if (!type) return null //if null doesnt render anything

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
