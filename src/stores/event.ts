import { defineStore } from 'pinia'
import { ref } from 'vue'
import { generateId } from '@/utils/idGenerator'
import { mockEvents } from '@/mocks'
import type { Event, EventFormData, EventReportFormData } from '@/types'

export const useEventStore = defineStore('event', () => {
    // State - Events (initialized from mock data)
    const events = ref<Event[]>([...mockEvents])

    // Actions
    const addEvent = (eventData: EventFormData): void => {
        const newEvent: Event = {
            id: generateId(),
            title: eventData.title,
            description: eventData.description || '',
            date: eventData.date,
            location: eventData.location || '',
            image: eventData.image || 'https://images.unsplash.com/photo-1526634333649-61ac04b281f6?q=80&w=2670&auto=format&fit=crop',
            attendees: 0,
            report: null
        }
        events.value.unshift(newEvent)
    }

    const updateEvent = (id: string, updates: Partial<EventFormData>): void => {
        const index = events.value.findIndex(e => e.id === id)
        if (index !== -1) {
            events.value[index] = { ...events.value[index], ...updates }
        }
    }

    const submitEventReport = (id: string, reportData: EventReportFormData): void => {
        const event = events.value.find(e => e.id === id)
        if (event) {
            event.report = {
                submittedAt: new Date().toISOString(),
                ...reportData
            }
            if (reportData.attendance) {
                event.attendees = reportData.attendance
            }
        }
    }

    const getEventById = (id: string): Event | undefined => {
        return events.value.find(e => e.id === id)
    }

    return {
        events,
        addEvent,
        updateEvent,
        submitEventReport,
        getEventById
    }
})
