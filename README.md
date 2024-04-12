# Patient Management System

The Advanced Patient Data Management System is a comprehensive web-based solution designed to provide healthcare providers with an improved platform for efficiently managing and viewing critical patient data. Providers require seamless access to patient information, including standard fields such as Names, Date of Birth, Status, Address, as well as the ability to customize additional fields dynamically.

![Screen Shot 2024-04-11 at 11 13 55 PM](https://github.com/hanniedong/patient-dashboard/assets/27251944/89748466-c7ae-4edb-892b-ee05479ffd7d)

Application Available Here: https://patient-dashboard-front-end.vercel.app




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

## Technologies Used:
- React.js/ Next.js for front-end development.
- Nest.js for server-side logic.
- MongoDB for database storage.
- RESTful API architecture for communication between front-end and back-end.
- TailwindCSS
- Heroku and Vercel for deployment

## Future Improvements:
- Authentication
- Search optimization (cache layer)
- UI updates
- Datepicker updates
- Form validations

