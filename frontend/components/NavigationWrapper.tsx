'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'

interface NavigationWrapperProps {
  children: React.ReactNode
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname()
  
  // Pages where Navigation should not be shown
  const noNavPages = ['/auth', '/admin/login']
  const showNavigation = !noNavPages.includes(pathname)

  return (
    <>
      {showNavigation && <Navigation />}
      {children}
    </>
  )
}
