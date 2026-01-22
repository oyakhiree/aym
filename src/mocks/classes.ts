/**
 * Mock data for Classes
 * Separated from store for cleaner architecture and easier testing
 */
import type { ClassData } from '@/types'

export const mockClasses: ClassData[] = [
    {
        id: '1',
        type: 'Progressive',
        name: 'Friend',
        instructor: 'Master Guide John',
        students: 4,
        readiness: 85,
        startDate: '2026-01-05',
        status: 'Active',
        assignments: [
            { id: 'hw1', title: 'Memorize Psalm 23', maxScore: 100, type: 'Memory Verse', date: '2026-01-06' },
            { id: 'cw1', title: 'Knot Tying Practical', maxScore: 50, type: 'Classwork', date: '2026-01-10' }
        ],
        roster: [
            {
                id: 's1', name: 'John Doe',
                attendance: { '2026-01-05': true, '2026-01-06': true, '2026-01-07': true },
                grades: { 'hw1': 90, 'cw1': 45 }
            },
            {
                id: 's2', name: 'Jane Smith',
                attendance: { '2026-01-05': true, '2026-01-06': false, '2026-01-07': true },
                grades: { 'hw1': 100, 'cw1': 50 }
            },
            {
                id: 's3', name: 'Mike Brown',
                attendance: { '2026-01-05': false, '2026-01-06': false, '2026-01-07': true },
                grades: { 'hw1': 0, 'cw1': 30 }
            },
            {
                id: 's4', name: 'Sarah Wilson',
                attendance: { '2026-01-05': true, '2026-01-06': true, '2026-01-07': true },
                grades: { 'hw1': 95, 'cw1': 48 }
            }
        ]
    },
    {
        id: '2',
        type: 'Honour',
        name: 'Christian Citizenship',
        instructor: 'Jane Doe',
        students: 25,
        readiness: 40,
        startDate: '2026-01-08',
        status: 'Active',
        assignments: [],
        roster: []
    },
    {
        id: '3',
        type: 'Progressive',
        name: 'Companion',
        instructor: 'David Wilson',
        students: 8,
        readiness: 92,
        startDate: '2025-11-20',
        status: 'Active',
        assignments: [],
        roster: []
    },
]
