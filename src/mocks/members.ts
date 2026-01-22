/**
 * Mock data for Members
 * Separated from store for cleaner architecture and easier testing
 */
import type { Member } from '@/types'

export const mockMembers: Member[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', gender: 'Male', class: 'Friend', status: 'Active', dob: '2010-05-15', guardian: 'Mr. Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', gender: 'Female', class: 'Companion', status: 'Active', dob: '2009-08-20', guardian: 'Mrs. Smith' },
    { id: '3', firstName: 'Mike', lastName: 'Brown', gender: 'Male', class: 'Explorer', status: 'Inactive', dob: '2008-01-10', guardian: 'Mr. Brown' },
    { id: '4', firstName: 'Sarah', lastName: 'Wilson', gender: 'Female', class: 'Ranger', status: 'Active', dob: '2007-11-05', guardian: 'Mrs. Wilson' },
    { id: '5', firstName: 'David', lastName: 'Lee', gender: 'Male', class: 'Voyager', status: 'Active', dob: '2006-03-30', guardian: 'Mr. Lee' },
]
