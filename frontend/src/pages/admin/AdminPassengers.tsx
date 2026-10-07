import AdminTable from '../../components/common/AdminTable'

interface PassengerRow {
  name: string
  phone: string
  rides: number
  status: string
}

const passengers: PassengerRow[] = [
  {
    name: 'Patrick M.',
    phone: '+250 78X XXX XXX',
    rides: 18,
    status: 'Active',
  },
  {
    name: 'Diane U.',
    phone: '+250 72X XXX XXX',
    rides: 32,
    status: 'Active',
  },
  {
    name: 'Eric N.',
    phone: '+250 73X XXX XXX',
    rides: 7,
    status: 'Active',
  },
]

export default function AdminPassengers() {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Passengers
      </h2>

      <p className="mt-1 text-sm text-[#6B7280]">
        View passenger accounts and ride activity.
      </p>

      <div className="mt-7">
        <AdminTable
          columns={[
            { key: 'name', label: 'Passenger' },
            { key: 'phone', label: 'Phone' },
            { key: 'rides', label: 'Rides' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {String(value)}
                </span>
              ),
            },
          ]}
          data={passengers}
        />
      </div>
    </div>
  )
}