import AdminTable from '../../components/common/AdminTable'

interface VehicleRow {
  vehicle: string
  plate: string
  driver: string
  type: string
  status: string
}

const vehicles: VehicleRow[] = [
  {
    vehicle: 'Toyota Corolla',
    plate: 'RAE 123 D',
    driver: 'Jean Claude',
    type: 'Sedan',
    status: 'Verified',
  },
  {
    vehicle: 'Toyota RAV4',
    plate: 'RAB 456 A',
    driver: 'Patrick M.',
    type: 'SUV',
    status: 'Pending',
  },
]

export default function AdminVehicles() {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Vehicles
      </h2>

      <p className="mt-1 text-sm text-[#6B7280]">
        Manage vehicle registration and verification.
      </p>

      <div className="mt-7">
        <AdminTable
          columns={[
            { key: 'vehicle', label: 'Vehicle' },
            { key: 'plate', label: 'Plate number' },
            { key: 'driver', label: 'Driver' },
            { key: 'type', label: 'Type' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span
                  className={
                    value === 'Verified'
                      ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700'
                      : 'rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700'
                  }
                >
                  {String(value)}
                </span>
              ),
            },
          ]}
          data={vehicles}
        />
      </div>
    </div>
  )
}