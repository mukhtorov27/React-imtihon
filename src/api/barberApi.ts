import { http } from './http'
import type { Barber, BarberFormValues, Id } from '../types'

export const getBarbers = async (): Promise<Barber[]> => {
  const { data } = await http.get<Barber[]>('/barbers')
  return data
}

export const createBarber = async (payload: BarberFormValues): Promise<Barber> => {
  const { data } = await http.post<Barber>('/barbers', payload)
  return data
}

export const updateBarber = async (id: Id, payload: BarberFormValues): Promise<Barber> => {
  const { data } = await http.put<Barber>(`/barbers/${id}`, payload)
  return data
}

export const deleteBarber = async (id: Id): Promise<void> => {
  await http.delete(`/barbers/${id}`)
}
