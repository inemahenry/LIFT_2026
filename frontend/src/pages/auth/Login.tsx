import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-[#071A2F] px-4 py-4 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col overflow-hidden rounded-[32px] bg-[#FFFFF0] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between bg-[#071A2F] px-6 pb-7 pt-6 text-white">
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

        {/* Form */}
        <div className="flex flex-1 flex-col px-6 pb-8 pt-10">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006EB6]">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
              Sign in
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Continue your journey with LIFT.
            </p>
          </div>

          <form className="mt-8 space-y-5">

            <Input
              id="identifier"
              label="Phone or email"
              type="text"
              placeholder="Enter your phone or email"
              autoComplete="username"
            />

            <div className="relative">
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
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

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-semibold text-[#006EB6]"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="button"
              size="lg"
              fullWidth
              className="mt-2 rounded-2xl"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-auto pt-10 text-center">
            <p className="text-sm text-[#6B7280]">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-[#006EB6]"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}