# Ijwi Ryabaturage - Voice of the People

A comprehensive e-governance platform for citizen complaint management, enabling transparent communication between citizens and government authorities in Rwanda.

## 🌟 Overview

**Ijwi Ryabaturage** (Voice of the citizen) is a modern web application designed to streamline the process of submitting, tracking, and resolving citizen complaints. The platform bridges the gap between citizens and government services by providing a transparent, efficient, and user-friendly system for public issue management.

### Key Features

- **Multi-step Complaint Submission** - Guided 4-step process for detailed complaint filing
- **Real-time Tracking** - Citizens can track complaint status with unique tracking IDs
- **Admin Dashboard** - Comprehensive management interface for government officials
- **Email Notifications** - Automated confirmation and status updates
- **Multi-language Support** - Internationalization for broader accessibility
- **File Upload System** - Support for evidence attachments
- **Analytics & Reporting** - Data-driven insights for better governance
- **Mobile Responsive** - Optimized for all devices

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.22.1
- **Icons**: Lucide React 0.344.0
- **Internationalization**: i18next 25.2.0 & react-i18next 15.5.1
- **Notifications**: React Hot Toast 2.4.1

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express 5.1.0
- **Database**: PostgreSQL with Sequelize ORM 6.37.7
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer 2.0.0 with Cloudinary 2.6.1
- **Email Service**: Nodemailer 7.0.3
- **SMS Service**: Twilio 4.11.0
- **Documentation**: Swagger UI Express 5.0.1
- **Validation**: Joi 17.13.3

## 📋 Features in Detail

### For Citizens

#### 1. Home Page
- **Hero Section**: Clear call-to-action for submitting complaints
- **Statistics Dashboard**: Real-time metrics (3,547 resolved complaints, 48-hour response time, 94% satisfaction)
- **Feature Overview**: Step-by-step process explanation
- **Category Explorer**: Six main categories of services
- **Responsive Design**: Mobile-first approach with animations

#### 2. Complaint Submission System
- **Step 1 - Personal Information**
  - Optional anonymous submission
  - Contact details with email for tracking
  - Form validation and error handling
  
- **Step 2 - Categorization**
  - Six main categories: Infrastructure, Healthcare, Education, Utilities, Transportation, Administrative
  - Dynamic subcategories based on selection
  - Location specification with validation
  
- **Step 3 - Description & Attachments**
  - Detailed complaint description (minimum 20 characters)
  - Multiple file upload support
  - Drag-and-drop interface
  
- **Step 4 - Review & Submit**
  - Complete overview of submitted information
  - Email confirmation preview
  - Final submission with progress indicator

#### 3. Complaint Tracking
- **Search by Tracking ID**: Unique complaint identifier (e.g., CMP-283941)
- **Status Visualization**: 4-stage progress bar (Received → Reviewed → In Progress → Resolved)
- **Detailed Information**: Category, location, submission date, description
- **Comment System**: Two-way communication with officials
- **Status Updates**: Real-time progress notifications

### For Administrators

#### 1. Dashboard Overview
- **Statistics Cards**: Total complaints, pending, in-progress, resolved
- **Trend Analysis**: Visual charts for complaint patterns over time
- **Category Distribution**: Pie chart showing complaint types
- **Performance Metrics**: Month-over-month changes with indicators
- **email**: [admin@ijwiryabaturage.com]
- **Password**: Admin@123

#### 2. Complaint Management
- **Advanced Filtering**: By category, priority, date, status
- **Search Functionality**: Full-text search across complaints
- **Tabbed Interface**: Organized by status (All, Pending, In Progress, Resolved)
- **Bulk Operations**: Export data functionality
- **Priority Management**: Low, medium, high priority assignment

#### 3. Workflow Management
- **Status Updates**: Change complaint status through workflow
- **Staff Assignment**: Assign complaints to specific team members
- **Response System**: Add official responses and updates
- **Communication Log**: Complete history of interactions

#### 4. User Management
- **Role-based Access**: Different permission levels
- **Profile Management**: Admin user profiles with avatars
- **Notification System**: Real-time alerts for new complaints
- **Settings Panel**: System configuration options

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kayigireerneste/VoicesOfCitizens_fe
   cd VoicesOfCitizens_fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   git clone https://github.com/kayigireerneste/VoicesOfCitizens_be
   cd VoicesOfCitizens_be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file with the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ijwi_ryabaturage
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   
   # Email Configuration (Nodemailer)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Twilio Configuration (Optional)
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   npm run migrate
   
   # Seed initial data (optional)
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   The API server will be available at `http://localhost:3000`

## 📦 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm run start      # Start production server
npm run migrate    # Run database migrations
npm run demigrate  # Rollback last migration
npm run seed       # Seed database with initial data
npm run unseed     # Remove seeded data
npm run lint       # Run ESLint
```

## 🌍 Internationalization

The application supports multiple languages through i18next:

- **English** (default)
- **Kinyarwanda** (native language support)

Translation files are structured for easy maintenance and expansion to additional languages.

## 📊 Database Schema

### Core Tables
- **Complaints**: Main complaint records with full details
- **Users**: Citizen and admin user accounts
- **Categories**: Complaint categorization system
- **Comments**: Communication thread for each complaint
- **Attachments**: File uploads related to complaints
- **Status_History**: Audit trail of status changes

### Key Relationships
- One-to-many: User → Complaints
- One-to-many: Complaint → Comments
- One-to-many: Complaint → Attachments
- Many-to-one: Complaint → Category

## 🔒 Security Features

- **Input Validation**: Comprehensive validation using Joi
- **SQL Injection Prevention**: Parameterized queries with Sequelize
- **XSS Protection**: Input sanitization and output encoding
- **Authentication**: JWT-based secure authentication
- **Password Security**: bcrypt hashing with salt
- **File Upload Security**: Type validation and size limits
- **CORS Configuration**: Proper cross-origin resource sharing

## 📈 Performance Optimization

- **Code Splitting**: React lazy loading for route-based splitting
- **Image Optimization**: Cloudinary integration for image processing
- **Database Indexing**: Optimized queries with proper indexing
- **Caching Strategy**: API response caching for static data
- **Responsive Images**: Adaptive image serving based on device
- **Minification**: Production builds with optimized assets

## 🔧 API Endpoints

### Public Endpoints
```
POST /api/complaints          # Submit new complaint
GET  /api/complaints/:id      # Get complaint by tracking ID
POST /api/complaints/:id/comments  # Add comment to complaint
GET  /api/categories          # Get complaint categories
```

### Admin Endpoints
```
GET    /api/admin/complaints     # Get all complaints with filters
PUT    /api/admin/complaints/:id # Update complaint status
POST   /api/admin/auth/login     # Admin authentication
GET    /api/admin/dashboard/stats # Get dashboard statistics
POST   /api/admin/users          # Create admin user
```

### File Upload Endpoints
```
POST /api/upload/files        # Upload complaint attachments
GET  /api/upload/files/:id    # Get uploaded file
```

## 👥 Authors

- **Ernest Kayigire** - *Initial work* - [kayigireerneste](https://github.com/kayigireerneste)

## 🙏 Acknowledgments

- ICT Chamber Hackathon for the inspiration
- Government of Rwanda for e-governance initiatives
- Open source community for the amazing tools and libraries
- Citizens who provide feedback for continuous improvement


## 🚀 Deployment

### Frontend Deployment (https://voices-of-citizens-fe.vercel.app/)
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables in your hosting platform

### Backend Deployment (https://voices-of-citizens-be.vercel.app/)
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `npm run migrate`
4. Deploy the application
5. Monitor logs and performance

### Docker Deployment (Optional)
```dockerfile
# Dockerfile example for frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```
### Docker Deployment (Optional)
- **DEMO Video link**: 
---

**Ijwi Ryabaturage** - Empowering citizens, enabling transparent governance, building a better Rwanda together. 🇷🇼