import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-[#071A2F] px-4 py-4 sm:px-6">
      <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-md overflow-hidden rounded-[32px] bg-[#FFFFF0] shadow-2xl">

        {/* Header */}
        <div className="bg-[#071A2F] px-6 pb-7 pt-6 text-white">

          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
            >
              <ArrowLeft size={19} />
            </Link>

            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight">
                Lift
              </div>

              <p className="text-[10px] text-white/60">
                Your journey, shared.
              </p>
            </div>

            <div className="w-10" />
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F9BFCB]">
              Get started
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Create account
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/60">
              Join LIFT and start sharing journeys.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-8 pt-8">

          <form className="space-y-4">

            <Input
              id="fullName"
              label="Full name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
            />

            <Input
              id="phone"
              label="Phone number"
              type="tel"
              placeholder="+250 7XX XXX XXX"
              autoComplete="tel"
            />

            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <div className="relative">
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-[38px] flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <Button
              type="button"
              size="lg"
              fullWidth
              className="mt-3 rounded-2xl"
            >
              Create account
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-[#6B7280]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-[#006EB6]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}