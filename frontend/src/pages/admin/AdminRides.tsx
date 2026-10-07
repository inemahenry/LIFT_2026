import AdminTable from '../../components/common/AdminTable'

interface RideRow {
  route: string
  passenger: string
  driver: string
  price: string
  status: string
}

const rides: RideRow[] = [
  {
    route: 'Kigali → Remera',
    passenger: 'Patrick M.',
    driver: 'Jean Claude',
    price: 'RWF 500',
    status: 'Completed',
  },
  {
    route: 'Kigali → Kicukiro',
    passenger: 'Diane U.',
    driver: 'Eric N.',
    price: 'RWF 700',
    status: 'In progress',
  },
]

export default function AdminRides() {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Rides
      </h2>

      <p className="mt-1 text-sm text-[#6B7280]">
        Monitor LIFT ride activity.
      </p>

      <div className="mt-7">
        <AdminTable
          columns={[
            { key: 'route', label: 'Route' },
            { key: 'passenger', label: 'Passenger' },
            { key: 'driver', label: 'Driver' },
            { key: 'price', label: 'Price' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span className="rounded-full bg-[#006EB6]/10 px-3 py-1 text-xs font-semibold text-[#006EB6]">
                  {String(value)}
                </span>
              ),
            },
          ]}
          data={rides}
        />
      </div>
    </div>
  )
}