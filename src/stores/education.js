import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEducationStore = defineStore('education', () => {
    const classes = ref([
        { id: '1', title: 'Friend Class', type: 'Progressive', instructor: 'Jane Doe', students: 12 },
        { id: '2', title: 'Stewardship', type: 'Honour', instructor: 'John Smith', students: 8 },
        { id: '3', title: 'Christian Citizenship', type: 'Honour', instructor: 'Jane Doe', students: 15 },
    ])

    return {
        classes
    }
})
