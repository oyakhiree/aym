import { defineStore } from 'pinia'
import { ref } from 'vue'
import { generateId } from '@/utils/idGenerator'

export const useEventStore = defineStore('event', () => {
    // State - Events
    const events = ref([
        {
            id: '1',
            title: 'World Pathfinder Day',
            description: 'A global celebration of Pathfinders. We will be marching at the conference headquarters.',
            date: '2026-09-19',
            location: 'Conference HQ, Lagos',
            image: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop',
            attendees: 150,
            report: null
        },
        {
            id: '2',
            title: 'Nature Hiking Adventure',
            description: 'An adventurous hike through the hills to learn about nature and creation.',
            date: '2026-05-12',
            location: 'Olumo Rock',
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
            attendees: 45,
            report: {
                summary: 'The hike was a resounding success. We identified 15 species of birds.',
                attendance: 42,
                images: [
                    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2673&auto=format&fit=crop'
                ]
            }
        },
        {
            id: '3',
            title: 'Community Service: Clean Up',
            description: 'Cleaning up the local market square as part of our GYD activities.',
            date: '2026-03-18',
            location: 'Magboro Market',
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop',
            attendees: 30,
            report: null
        }
    ])

    // Actions
    const addEvent = (eventData) => {
        events.value.unshift({
            id: generateId(),
            ...eventData,
            image: eventData.image || 'https://images.unsplash.com/photo-1526634333649-61ac04b281f6?q=80&w=2670&auto=format&fit=crop',
            attendees: 0,
            report: null
        })
    }

    const updateEvent = (id, updates) => {
        const index = events.value.findIndex(e => e.id === id)
        if (index !== -1) {
            events.value[index] = { ...events.value[index], ...updates }
        }
    }

    const submitEventReport = (id, reportData) => {
        const event = events.value.find(e => e.id === id)
        if (event) {
            event.report = {
                submittedAt: new Date().toISOString(),
                ...reportData
            }
            if (reportData.attendance) event.attendees = reportData.attendance
        }
    }

    const getEventById = (id) => {
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
