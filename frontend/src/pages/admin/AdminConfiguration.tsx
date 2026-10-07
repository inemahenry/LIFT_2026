import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function AdminConfiguration() {
  const [baseBookingFee, setBaseBookingFee] = useState('500')
  const [baseDistance, setBaseDistance] = useState('10')
  const [distanceStep, setDistanceStep] = useState('10')
  const [additionalCharge, setAdditionalCharge] = useState('50')
  const [driverShare, setDriverShare] = useState('70')
  const [liftShare, setLiftShare] = useState('30')
  const [minimumPoints, setMinimumPoints] = useState('3000')
  const [rewardAmount, setRewardAmount] = useState('3000')
  const [maximumPassengers, setMaximumPassengers] = useState('3')

  return (
    <div className="max-w-5xl">

      <div>
        <p className="text-sm text-[#6B7280]">
          Business rules
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          Configuration
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280]">
          Configure LIFT business values. These values will ultimately be
          synchronized with the backend configuration.
        </p>
      </div>

      <div className="mt-7 space-y-6">

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6">

          <h3 className="text-lg font-bold">
            Pricing
          </h3>

          <p className="mt-1 text-sm text-[#9CA3AF]">
            Ride pricing configuration.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <Input
              label="Base booking fee"
              value={baseBookingFee}
              onChange={(e) => setBaseBookingFee(e.target.value)}
              inputMode="numeric"
            />

            <Input
              label="Base distance (km)"
              value={baseDistance}
              onChange={(e) => setBaseDistance(e.target.value)}
              inputMode="numeric"
            />

            <Input
              label="Distance step (km)"
              value={distanceStep}
              onChange={(e) => setDistanceStep(e.target.value)}
              inputMode="numeric"
            />

            <Input
              label="Additional distance charge"
              value={additionalCharge}
              onChange={(e) => setAdditionalCharge(e.target.value)}
              inputMode="numeric"
            />

          </div>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6">

          <h3 className="text-lg font-bold">
            Revenue split
          </h3>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <Input
              label="Driver share (%)"
              value={driverShare}
              onChange={(e) => setDriverShare(e.target.value)}
              inputMode="numeric"
            />

            <Input
              label="LIFT share (%)"
              value={liftShare}
              onChange={(e) => setLiftShare(e.target.value)}
              inputMode="numeric"
            />

          </div>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6">

          <h3 className="text-lg font-bold">
            Rewards
          </h3>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <Input
              label="Minimum reward points"
              value={minimumPoints}
              onChange={(e) => setMinimumPoints(e.target.value)}
              inputMode="numeric"
            />

            <Input
              label="Reward amount (RWF)"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              inputMode="numeric"
            />

          </div>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6">

          <h3 className="text-lg font-bold">
            Ride limits
          </h3>

          <div className="mt-5 max-w-sm">

            <Input
              label="Maximum passengers"
              value={maximumPassengers}
              onChange={(e) => setMaximumPassengers(e.target.value)}
              inputMode="numeric"
            />

          </div>
        </section>

        <div className="flex justify-end">
          <Button size="lg">
            Save changes
          </Button>
        </div>

      </div>
    </div>
  )
}