# 🎯 ChurchConnect Dashboard Architecture

## 🏗️ **Overview**

This document outlines the new dual-dashboard architecture for ChurchConnect, separating **Member** and **Admin** experiences with distinct interfaces, navigation, and permissions.

## 🗺️ **Architecture Diagram**

```
                         ┌──────────────────────┐
                         │   PUBLIC AREA        │
                         │                      │
                         │  • Landing Page      │
                         │  • Explore Content   │
                         │  • Church Directory   │
                         │  • Community Feed     │
                         └──────────┬───────────┘
                                    │
                        ┌───────────┼────────────┐
                        │           │            │
              ┌─────────▼─┐    ┌─────▼──────┐  ┌───▼──────┐
              │  AUTH     │    │ MEMBER     │  │ ADMIN    │
              │           │    │ DASHBOARD  │  │ DASHBOARD│
              │ • Login   │    │            │  │          │
              │ • Register│    │ • Personal │  │ • Manage │
              └─────────┬─┘    │   Feed     │  │   All    │
                        │      │ • Events   │  │ Members  │
                        │      │ • Donations│  │ • Events │
                        │      │ • Community│  │ • Media  │
                        │      │ • Media    │  │ • Reports│
                        │      │ • Profile  │  │ • Settings│
                        │      └────────────┘  └──────────┘
                        │                                   
               ┌────────▼────────┐                         
               │ ROLE-BASED REDIRECT │                     
               │                 │                         
               │ • Admin/Pastor  │                         
               │   → Admin Dash  │                         
               │ • Member        │                         
               │   → Member Dash │                         
               └─────────────────┘                         
```

## 👥 **Member Dashboard**

### **Purpose**
Provide members with a personalized, engaging experience to stay connected with their church community.

### **Key Features**

#### 1. **Personalized Dashboard**
- Welcome message with member's name
- Quick stats (upcoming events, recent donations, etc.)
- Daily devotionals
- Church announcements

#### 2. **Navigation Menu**
- Dashboard (home)
- Events (calendar, RSVP)
- Donations (history, giving)
- Community (groups, chat)
- Media (sermons, music, books)
- Members (directory)
- Profile (personal info)
- Settings (preferences)

#### 3. **Content Areas**
- Upcoming events feed
- Recent sermon recommendations
- Community group suggestions
- Donation history summary
- Personal devotionals

### **Permissions**
- View own profile and edit personal info
- View church events and RSVP
- Make and view donations
- Join and participate in community groups
- Access church media library
- View member directory (limited info)

## 🧑‍💼 **Admin Dashboard**

### **Purpose**
Provide church leaders with comprehensive tools to manage all aspects of their church community.

### **Key Features**

#### 1. **Management Hub**
- Overview stats (total members, donations, events)
- Quick action cards (add member, create event, etc.)
- Tabbed navigation for different management areas

#### 2. **Navigation Menu**
- Dashboard (overview)
- Members (manage all members)
- Events (create/manage events)
- Donations (track/view all donations)
- Media (upload/manage content)
- Analytics (reports and insights)
- Settings (church configuration)

#### 3. **Management Sections**

##### **Members**
- Add/remove members
- Bulk import/export
- Assign roles (pastor, deacon, volunteer, etc.)
- View/edit member profiles
- Communication tools

##### **Events**
- Create/edit/delete events
- Manage RSVPs
- Send event notifications
- Track attendance
- Recurring event templates

##### **Donations**
- View all donations
- Process refunds
- Generate financial reports
- Manage recurring donations
- Export donation data

##### **Media**
- Upload sermons, music, books
- Organize content by category
- Set privacy (church-only, public)
- Track media engagement
- Moderate user-generated content

##### **Analytics**
- Attendance reports
- Donation trends
- Member engagement metrics
- Group activity
- Exportable reports

##### **Settings**
- Church information
- User roles and permissions
- Notification preferences
- Payment integration
- Brand customization

### **Permissions**
- Full access to all member features
- Manage all church data
- View/edit all member profiles
- Create/edit/delete events
- Process/view all donations
- Upload/manage all media
- Generate analytics reports
- Configure church settings

## 🔐 **Role-Based Access Control**

### **User Roles**

| Role        | Description             | Dashboard Access | Management Access |
|-------------|-------------------------|------------------|-------------------|
| **Member**  | Regular church member   | Member Dashboard | Limited           |
| **Deacon**  | Church leader           | Member Dashboard | Limited           |
| **Pastor**  | Church administrator    | Admin Dashboard  | Full              |
| **Admin**   | System administrator    | Admin Dashboard  | Full              |

### **Permission Mapping**

```javascript
// Role validation functions
const canAccessAdminDashboard = (user) => {
  return user.role === 'admin' || user.role === 'pastor';
};

const canManageMembers = (user) => {
  return user.role === 'admin' || user.role === 'pastor';
};

const canManageEvents = (user) => {
  return user.role === 'admin' || user.role === 'pastor';
};

const canManageDonations = (user) => {
  return user.role === 'admin' || user.role === 'pastor';
};

const canManageMedia = (user) => {
  return user.role === 'admin' || user.role === 'pastor';
};
```

## 🔄 **Navigation Flow**

### **After Login**
1. System checks user role
2. If admin/pastor → redirect to `/admin-dashboard`
3. If member → redirect to `/dashboard`
4. Role-based menu items appear in user dropdown

### **Between Dashboards**
- Admins can switch to Member Dashboard via user menu
- Members attempting to access Admin Dashboard are redirected to Member Dashboard

## 🎨 **UI/UX Design Principles**

### **Member Dashboard**
- **Theme**: Warm, welcoming colors (blues, greens)
- **Layout**: Feed-style with cards
- **Navigation**: Icon + text sidebar
- **Focus**: Engagement and personal connection

### **Admin Dashboard**
- **Theme**: Professional, clean (navy, grays)
- **Layout**: Data-dense with tables/charts
- **Navigation**: Detailed sidebar with categories
- **Focus**: Control and oversight

## 🛠️ **Technical Implementation**

### **Routing Structure**

```javascript
// App.tsx routing
<Routes>
  {/* Public routes */}
  <Route path="/" element={<Index />} />
  <Route path="/auth" element={<Auth />} />
  
  {/* Member routes */}
  <Route path="/dashboard" element={
    <ProtectedRoute pageType="dashboard">
      <MemberDashboard />
    </ProtectedRoute>
  } />
  
  {/* Admin routes */}
  <Route path="/admin-dashboard" element={
    <ProtectedRoute pageType="admin">
      <AdminDashboard />
    </ProtectedRoute>
  } />
  
  {/* Shared routes */}
  <Route path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } />
</Routes>
```

### **Component Structure**

```
src/
├── components/
│   ├── Navigation.tsx     # Shared navigation components
│   ├── ProtectedRoute.tsx # Role-based route protection
│   └── ...
├── pages/
│   ├── MemberDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── Auth.tsx
│   └── ...
└── context/
    └── AuthContext.tsx   # Role-based authentication state
```

### **Role Validation**

```typescript
// ProtectedRoute.tsx
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  pageType,
}) => {
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  // Role validation logic
  if (pageType === 'admin' && user) {
    const hasAccess = user.role === 'admin' || user.role === 'pastor';
    if (!hasAccess) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // ... rest of implementation
};
```

## 📱 **Responsive Design**

Both dashboards are fully responsive:
- Mobile: Collapsible sidebar, touch-friendly controls
- Tablet: Optimized layouts with appropriate spacing
- Desktop: Full-featured interfaces with advanced controls

## 🔒 **Security Considerations**

1. **Frontend**: Role-based UI rendering
2. **Backend**: API-level permission validation
3. **Data**: Role-based data filtering
4. **Navigation**: Automatic redirects for unauthorized access

## 🚀 **Future Enhancements**

1. **Custom Role Creation**: Allow churches to define custom roles
2. **Granular Permissions**: Fine-grained access control
3. **Audit Logs**: Track admin actions
4. **Multi-Church Support**: Manage multiple congregations
5. **Mobile Apps**: Native iOS/Android applications

---
*This architecture ensures a clear separation of concerns while maintaining a unified brand experience across both user types.*