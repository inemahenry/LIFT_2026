import AdminTable from '../../components/common/AdminTable'

interface RewardRow {
  driver: string
  points: number
  reward: string
  status: string
}

const rewards: RewardRow[] = [
  {
    driver: 'Jean Claude',
    points: 3000,
    reward: 'RWF 3,000',
    status: 'Pending',
  },
  {
    driver: 'Eric N.',
    points: 3000,
    reward: 'RWF 3,000',
    status: 'Paid',
  },
]

export default function AdminRewards() {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Rewards
      </h2>

      <p className="mt-1 text-sm text-[#6B7280]">
        Manage driver reward requests.
      </p>

      <div className="mt-7">
        <AdminTable
          columns={[
            { key: 'driver', label: 'Driver' },
            { key: 'points', label: 'Points' },
            { key: 'reward', label: 'Reward' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                  {String(value)}
                </span>
              ),
            },
          ]}
          data={rewards}
        />
      </div>
    </div>
  )
}