import { ArrowLeft, MapPin, Navigation } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import RideMap from '../../components/common/RideMap'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function FindLift() {
  const navigate = useNavigate()

  const [pickup, setPickup] = useState('Current location')
  const [destination, setDestination] = useState('Kigali Convention Centre')

  return (
    <div className="min-h-full bg-[#FFFFF0]">

      <header className="flex items-center gap-3 px-5 pb-4 pt-6">
        <Link
          to="/passenger"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={19} />
        </Link>

        <div>
          <h1 className="text-xl font-bold">
            Find a LIFT
          </h1>

          <p className="text-xs text-[#6B7280]">
            Where are you going?
          </p>
        </div>
      </header>

      <div className="px-5">
        <RideMap height="310px" />
      </div>

      <section className="mt-5 rounded-t-[32px] bg-white px-5 pb-8 pt-7 shadow-[0_-8px_30px_rgba(0,0,0,.06)]">

        <div className="space-y-4">

          <Input
            label="Pickup"
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
          />

          <Input
            label="Destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />

        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-6 rounded-2xl"
          onClick={() => navigate('/passenger/options')}
        >
          Find available LIFTS
        </Button>
      </section>
    </div>
  )
}