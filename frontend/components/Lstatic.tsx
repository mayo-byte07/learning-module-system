import { cn } from '@/lib/utils'

interface LstaticProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button'
}

export function Lstatic({ className, variant = 'default', ...props }: LstaticProps) {
  const variantClasses = {
    default: 'h-4 w-full',
    card: 'h-32 w-full rounded-lg',
    text: 'h-4 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-20 rounded-md'
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export function CardLstatic() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
      <Lstatic variant="avatar" className="w-12 h-12" />
      <div className="space-y-2">
        <Lstatic variant="text" />
        <Lstatic variant="text" className="w-5/6" />
      </div>
      <div className="flex justify-between items-center">
        <Lstatic variant="button" />
        <Lstatic variant="button" className="w-16" />
      </div>
    </div>
  )
}

export function TableLstatic({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center space-x-4">
              <Lstatic variant="avatar" />
              <div className="flex-1 space-y-2">
                <Lstatic variant="text" />
                <Lstatic variant="text" className="w-4/5" />
              </div>
              <Lstatic variant="button" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
