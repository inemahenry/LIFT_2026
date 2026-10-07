import AdminTable from '../../components/common/AdminTable'

interface PointRow {
  driver: string
  earned: number
  redeemed: number
  balance: number
}

const points: PointRow[] = [
  {
    driver: 'Jean Claude',
    earned: 4500,
    redeemed: 1500,
    balance: 3000,
  },
  {
    driver: 'Patrick M.',
    earned: 2100,
    redeemed: 0,
    balance: 2100,
  },
]

export default function AdminPoints() {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Points
      </h2>

      <p className="mt-1 text-sm text-[#6B7280]">
        Monitor driver point balances.
      </p>

      <div className="mt-7">
        <AdminTable
          columns={[
            { key: 'driver', label: 'Driver' },
            { key: 'earned', label: 'Earned' },
            { key: 'redeemed', label: 'Redeemed' },
            { key: 'balance', label: 'Balance' },
          ]}
          data={points}
        />
      </div>
    </div>
  )
}