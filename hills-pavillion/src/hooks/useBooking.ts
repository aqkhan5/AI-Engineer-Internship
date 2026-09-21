import { useState } from 'react'

export interface BookingState {
  isOpen: boolean
  selectedVillaId?: string
  checkInDate: string
  checkOutDate: string
  guests: number
  submitted: boolean
}

export function useBooking() {
  const [booking, setBooking] = useState<BookingState>({
    isOpen: false,
    selectedVillaId: undefined,
    checkInDate: '',
    checkOutDate: '',
    guests: 2,
    submitted: false,
  })

  const openBooking = (villaId?: string) => {
    setBooking((prev) => ({
      ...prev,
      isOpen: true,
      selectedVillaId: villaId || prev.selectedVillaId,
      submitted: false,
    }))
  }

  const closeBooking = () => {
    setBooking((prev) => ({
      ...prev,
      isOpen: false,
      submitted: false,
    }))
  }

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }))
  }

  const submitReservation = () => {
    setBooking((prev) => ({
      ...prev,
      submitted: true,
    }))
  }

  return {
    booking,
    openBooking,
    closeBooking,
    updateBooking,
    submitReservation,
  }
}
