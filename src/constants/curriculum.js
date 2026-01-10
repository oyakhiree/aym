/**
 * Curriculum & Education Constants
 * Centralized configuration for business logic thresholds and options.
 */

// Readiness Score Configuration
export const READINESS_THRESHOLD = 75 // Minimum score for exam eligibility
export const ATTENDANCE_WEIGHT = 0.4
export const GRADE_WEIGHT = 0.6

// Progressive Class Levels (in order)
export const PROGRESSIVE_CLASSES = [
    'Friend',
    'Companion',
    'Explorer',
    'Ranger',
    'Voyager',
    'Guide',
    'Master Guide'
]

// Available Honours
export const HONOURS = [
    'Christian Citizenship',
    'Stewardship',
    'Basic Rescue',
    'Camping Skills I',
    'Camping Skills II',
    'Drilling & Marching',
    'First Aid',
    'Nature Study'
]

// Exam Status Types
export const EXAM_STATUS = {
    NONE: 'None',
    REQUESTED: 'Requested',
    APPROVED: 'Approved',
    TAKEN: 'Taken'
}

// Member Status Types
export const MEMBER_STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
}

// Assignment Types
export const ASSIGNMENT_TYPES = {
    CLASSWORK: 'Classwork',
    HOMEWORK: 'Homework',
    MEMORY_VERSE: 'Memory Verse',
    PRACTICAL: 'Practical'
}
