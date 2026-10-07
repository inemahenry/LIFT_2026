import AdminTable from '../../components/common/AdminTable'

interface DriverRow {
  name: string
  phone: string
  vehicle: string
  status: string
  points: number
}

const drivers: DriverRow[] = [
  {
    name: 'Jean Claude',
    phone: '+250 78X XXX XXX',
    vehicle: 'Toyota Corolla',
    status: 'Verified',
    points: 2750,
  },
  {
    name: 'Patrick M.',
    phone: '+250 72X XXX XXX',
    vehicle: 'Toyota RAV4',
    status: 'Pending',
    points: 1250,
  },
]

export default function AdminDrivers() {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Drivers
      </h2>

      <p className="mt-1 text-sm text-[#6B7280]">
        Manage and verify LIFT drivers.
      </p>

      <div className="mt-7">
        <AdminTable
          columns={[
            { key: 'name', label: 'Driver' },
            { key: 'phone', label: 'Phone' },
            { key: 'vehicle', label: 'Vehicle' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span
                  className={[
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    value === 'Verified'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700',
                  ].join(' ')}
                >
                  {String(value)}
                </span>
              ),
            },
            { key: 'points', label: 'Points' },
          ]}
          data={drivers}
        />
      </div>
    </div>
  )
}