import { http } from './http'
import type { Barber, BookingFormValues, Recept } from '../types'

export const getRecepts = async (): Promise<Recept[]> => {
  const { data } = await http.get<Recept[]>('/recepts')
  return data
}

export const createRecept = async (
  barber: Barber,
  payload: BookingFormValues,
): Promise<Recept> => {
  const requestBody: Omit<Recept, 'id'> = {
    barberId: barber.id,
    barberName: barber.name,
    barberLocation: barber.location,
    customerName: payload.customerName,
    phone: payload.phone,
    time: payload.time,
    status: 'Yuborilgan',
  }

  const { data } = await http.post<Recept>('/recepts', requestBody)
  return data
}
