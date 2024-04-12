'use client'

import AuthProvider from "@/features/auth/components/AuthProvider"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}