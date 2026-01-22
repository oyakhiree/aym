# 

# 

# 

# **Product Requirement Document (PRD)**

## Adventist Youth Ministry Management System (Lagos Mainland Conference)

| Project Name | LMC Youth Ministry Digital Platform |
| :---- | :---- |
| Version | 1.1 |
| Status | Draft |
| Timeline | 3 Months |
| Tech Stack | Frontend: Vue 3, TypeScript, Vite, Pinia Backend/DB: Supabase (Auth, Postgres, Edge Functions) |

## 

## 

## 

## 

## **1\. Executive Summary**

The goal of this project is to digitize and streamline the administrative, educational, and reporting workflows of the Adventist Youth Ministry (Pathfinder and Adventurer Clubs) within the Lagos Mainland Conference.

Currently, reporting is manual and fragmented. This platform will serve as a unified source of truth for club membership, progressive class tracking, honour class management, and automated reporting from the Club level up to the Area and Conference levels. A key differentiator will be a secure, logic-gated online examination system.

## **2\. User Personas & Hierarchy**

The system relies on strict Role-Based Access Control (RBAC).

1. Super Admin / Conference Director (L1)  
   * Goal: View aggregate data for the entire conference, manage Area Directors, approve sensitive requests (exams), and manage the global Question Bank.  
   * Visibility: All Areas, All Clubs.

   

2. Area Director (L2)  
   * Goal: Oversee clubs within their specific geographical Area, approve club requests, and view Area-level reports.  
   * Visibility: Assigned Area only.

   

3. Club Director (L3)  
   * Goal: Manage club roster (Bio-data), assign Instructors, request exams, and submit monthly/quarterly reports.

   

4. Instructor / Counselor (L4)  
   * Goal: specialized access to input attendance, scores (Classwork/Homework), and view progress for specific classes (e.g., "Stewardship Honour").

   

5. Pathfinder/Adventurer (End User)  
   * Goal: Take online exams (via unique generated links). *Note: They do not necessarily need full login accounts; they can access exams via secure tokens.*

   

## **3\. Functional Requirements**

### 3.1. Authentication & Onboarding (Supabase Auth)

* Hierarchical Invitation Flow: \* Super Admin creates Conference Directors.  
  * Conference Director creates Area Directors.  
  * Area Directors create Club Directors.  
  * Club Directors invite Instructors.


* Requirement: Users must be assigned a role and org\_id (Club/Area ID) in the public.profiles table upon creation to enforce Row Level Security (RLS).

### 3.2. Club Management & Bio Data

* Roster Management:

  * Fields: First Name, Last Name, DOB, Gender, Class (Friend, Companion, etc.), Guardian Info.


  * Uploads: Birth Certificate (stored in Supabase Storage buckets with restricted read access).


  * Member Status Toggle: Club Directors must be able to mark individual members as "Active" or "Inactive" via a simple toggle button (UI switch). This ensures inactive members do not skew current reporting figures without needing to delete their historical data.


* Club Status: Active/Inactive toggle based on reporting frequency.

### 3.3. Educational Management (The Core Loop)

This module covers both Progressive Classes (Standard Level) and Honour Classes (Specialties).

* Class Creation:  
  * Admin defines the "Master List" of Honours (Title, Description, Icon/Badge Media).  
  * Instructors "start" a class for a club and add students to it.


* Activity Tracking:  
  * Attendance: Boolean toggle per student per date.  
  * Class Work: Description \+ Score (0-100).  
  * Home Work: Description \+ Score (0-100).


* Logic Gate:  
  * System calculates a "Readiness Score" based on attendance % and assignment completion.  
  * *Constraint:* A student cannot be eligible for an exam unless Readiness Score \> X% (Configurable, e.g., 75%).


### 3.4. Examination System (The Add-on)

This feature replaces manual paper exams. It applies to both Honour Classes (e.g., Stewardship) and Progressive Classes (e.g., Friend, Companion, Explorer).

1. Question Bank (Global):  
   * Conference Admins upload objective questions (Multiple Choice/True-False).  
   * Tagging: Questions are tagged by Type (Honour vs. Progressive) and Subject (e.g., "Christian Citizenship" or "Friend Class \- General Knowledge").

   

2. Request Flow:  
   * Club Director clicks "Request Exam" for a specific Honour OR a Progressive Class level.  
   * System Check: Validates if students in that class meet the "Readiness Score."  
   * If valid, request is sent to Area/Conference Dashboard.

   

3. Approval & Generation:  
   * Admin approves request.  
   * System generates a Unique Exam Link (valid for a specific time window).

   

4. Execution:  
   * Students access the link (No login required, access via Student ID \+ Access Code).  
   * Exam Logic: Questions are shuffled from the Bank based on the specific exam type requested. Timer is active.  
   * Submission: Auto-graded immediately.

   

5. Result: Scores are written back to the Student's profile.

### 3.5. Reporting & Analytics

* Real-time Dashboard (Conference View):  
  * Total Active Clubs vs. Inactive.  
  * Total Pathfinders/Adventurers enrolled (filtered by Active status).  
  * Attrition Rate (Drop-offs year over year).  
  * "Health Check": Which clubs haven't reported in \>30 days.  
* Activity Feed: "Club X just completed Stewardship Honour."

### 3.6. Extracurriculars

* Event Log: Title, Description, Date.  
* Media Gallery: Upload photos from events (Hiking, Camporee, World Pathfinder Day).

## **4\. Technical Architecture & Schema Strategy**

### 4.1. Stack Decisions

* Frontend: Vue 3 (Composition API). Explicitly chosen for its maintainability and gentle learning curve for future contributors.
* Build Tool: Vite. For simplified configuration and fast HMR.
* Styling: Tailwind CSS (Mobile responsiveness is critical for Instructors in the field).
* Database: Supabase (PostgreSQL).
* State Management: Pinia (for complex client-side state like managing active exam sessions and offline data).

### 4.2. Database Schema (Supabase)

*Key Tables:*

* users (Managed by Supabase Auth)  
* profiles (role: enum, hierarchy\_id: uuid, full\_name: text)  
* clubs (name: text, area\_id: uuid, status: boolean)  
* students (bio\_data, birth\_cert\_url, current\_class\_level, is\_active: boolean)  
* curriculum\_master (id, title, type \[honour/progressive\], requirements\_json)  
* active\_classes (club\_id, curriculum\_id, instructor\_id)  
* class\_activities (type \[attendance/homework\], score, student\_id)  
* exam\_requests (club\_id, curriculum\_id, status \[pending/approved\], scheduled\_date)  
* question\_bank (curriculum\_id, question\_text, options\_json, correct\_answer)

### 4.3. Security & Privacy

* Row Level Security (RLS): This is non-negotiable.  
  * *Policy:* Club Directors can only SELECT data where club\_id matches their assignment.  
  * *Policy:* Area Directors can only SELECT data where club.area\_id matches their assignment.  
* Data Protection: Birth certificates must be in a private bucket, accessible only via signed URLs generated for Admins.

## **5\. Development Roadmap (3 Months)**

### Month 1: Foundation & Hierarchy

* Weeks 1-2: Setup Supabase project. Implement Database Schema. Configure RLS policies.  
* Weeks 3-4: Build Authentication flows. Build "Club Management" (Add Student, Bio Data Forms, Member Status Toggle, Birth Cert Upload).  
* *Milestone:* A Club Director can log in, populate their roster, and manage active/inactive members.

### Month 2: Academic Core & Reporting

* Weeks 1-2: Build "Active Class" module. Create UI for taking Attendance and inputting Grades.  
* Weeks 3-4: Build the "Readiness Logic" (calculating eligibility). Build the Conference/Area Dashboards (Aggregation queries).  
* *Milestone:* Instructors can manage a class, and Directors can see who is attending.

### Month 3: The Exam Engine & Polish

* Weeks 1-2: Develop Question Bank UI (for Admins) supporting both Honour and Progressive types. Build Exam Request flow.  
* Week 3: Build the Student Exam Interface (Timer, Shuffle logic, Auto-grading).  
* Week 4: UAT (User Acceptance Testing) with one pilot Area. Bug fixes. Final Deployment.

## **6\. Success Metrics**

1. Adoption: 80% of Clubs in the Conference creating an account within 30 days of launch.  
2. Efficiency: Reduction in "End of Year" report compilation time from weeks to seconds.  
3. Engagement: \>50 exams conducted via the platform in the first quarter.