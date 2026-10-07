export interface PointTransaction {
  id: string
  amount: number
  description: string
  date: string
  type: 'EARNED' | 'REDEEMED'
}

export interface DriverPoints {
  balance: number
  target: number
  rewardAmount: number
  transactions: PointTransaction[]
}