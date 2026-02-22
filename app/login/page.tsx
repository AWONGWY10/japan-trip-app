import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0f6fc] flex flex-col items-center justify-center p-4 relative">
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-hokkaido-accent transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Itinerary
      </Link>
      <LoginForm />
    </div>
  )
}