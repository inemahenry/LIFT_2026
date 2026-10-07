import { CarFront, Home, UserRound, WalletCards } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  {
    label: 'Home',
    path: '/passenger',
    icon: Home,
  },
  {
    label: 'Rides',
    path: '/passenger/rides',
    icon: CarFront,
  },
  {
    label: 'Activity',
    path: '/passenger/activity',
    icon: WalletCards,
  },
  {
    label: 'Profile',
    path: '/passenger/profile',
    icon: UserRound,
  },
]

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-[#071A2F] px-0 sm:px-4 sm:py-4">
      <div className="mx-auto flex min-h-screen max-w-md flex-col overflow-hidden bg-[#FFFFF0] sm:min-h-[calc(100vh-2rem)] sm:rounded-[32px] sm:shadow-2xl">

        <main className="min-h-0 flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur sm:absolute">
          <div className="flex items-center justify-around">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/passenger'}
                  className={({ isActive }) =>
                    [
                      'flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-semibold transition',
                      isActive
                        ? 'text-[#006EB6]'
                        : 'text-[#9CA3AF]',
                    ].join(' ')
                  }
                >
                  <Icon size={19} strokeWidth={2} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}