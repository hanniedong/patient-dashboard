# Patient Management System

## Functional Requirements:

### Streamlined Data Entry:
- **Capture Patient Information:** 
  - Collect patient details such as First Name, Middle Name (optional), Last Name, Date of Birth, Status (Inquiry, Onboarding, Active, Churned), and Address (with support for multiple addresses per patient).
  - All fields are required, except Middle Name, Additional Addresses, and Custom Fields.
- **Dynamic Custom Fields:**
  - Enable providers to create additional text/number fields dynamically to accommodate varying data requirements.
- **Entry Management:**
  - Provide functionality to create, edit, and delete patient entries.

### Comprehensive Data Viewing:
- **Dashboard Overview:**
  - Design a user-friendly dashboard for providers to view essential patient information at a glance.
- **Detailed Patient Profiles:**
  - Implement an intuitive navigation and view for accessing detailed patient profiles with comprehensive information.

### Dynamic Forms Management:
- **Custom Fields Configuration:**
  - Provide an intuitive interface for providers to configure and manage custom fields according to their specific requirements.

### Search and Filtering:
- **Search Functionality:**
  - Enable simple field equality search to quickly retrieve specific patient records based on various criteria.
- **Filtering Options:**
  - Implement field filtering to facilitate refined searches based on specific parameters.
- **Usability Prioritization:**
  - Prioritize ease of use and efficiency in search functionality to enhance provider productivity.

## Technologies Used:
- React.js/ Next.js for front-end development.
- Nest.js for server-side logic.
- MongoDB for database storage.
- RESTful API architecture for communication between front-end and back-end.
- TailwindCSS
- Heroku and Vercel for deployment
