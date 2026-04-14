export type Id = number | string

export interface Barber {
  id: Id
  name: string
  imageUrl: string
  experience: number
  rating: number
  location: string
}

export interface Recept {
  id: Id
  barberId: Id
  barberName: string
  barberLocation: string
  customerName: string
  phone: string
  time: string
  status: 'Yuborilgan' | 'Kutilmoqda' | 'Bekor qilingan'
}

export interface BarberFormValues {
  name: string
  imageUrl: string
  experience: number
  rating: number
  location: string
}

export interface BookingFormValues {
  customerName: string
  phone: string
  time: string
}
