# 🎯 ChurchConnect Dashboard Structure

## 🏗️ Overview

This update introduces a **dual-dashboard architecture** for ChurchConnect, providing distinct experiences for **members** and **administrators**.

## 🗂️ File Structure

```
src/
├── pages/
│   ├── MemberDashboard.tsx    # Member dashboard (regular users)
│   ├── AdminDashboard.tsx     # Admin dashboard (pastors/administrators)
│   └── Auth.tsx              # Login/registration (updated for role-based redirect)
├── components/
│   └── Navigation.tsx         # Shared navigation components
└── context/
    └── AuthContext.tsx      # Authentication context (updated for role handling)
```

## 👥 Two Distinct Experiences

### 1. **Member Dashboard** (`/dashboard`)
- **Audience**: Regular church members
- **Purpose**: Personal engagement with church community
- **Features**:
  - Personalized feed
  - Event RSVP
  - Donation history
  - Community groups
  - Media library access
  - Member directory

### 2. **Admin Dashboard** (`/admin-dashboard`)
- **Audience**: Pastors, administrators
- **Purpose**: Church management and oversight
- **Features**:
  - Member management
  - Event creation/scheduling
  - Donation tracking
  - Media upload/management
  - Analytics and reporting
  - Church settings

## 🔐 Role-Based Routing

After login, users are automatically redirected based on their role:
- **Admin/Pastor** → `/admin-dashboard`
- **Member** → `/dashboard`

## 🔄 Navigation Between Dashboards

- Admins can switch to Member Dashboard via user menu
- Members attempting to access Admin Dashboard are redirected

## 🛠️ Implementation Details

### Authentication Updates
- **Auth.tsx**: Updated to redirect based on user role after login
- **AuthContext.tsx**: Enhanced role validation
- **ProtectedRoute.tsx**: Added role-based access control

### New Components
- **Navigation.tsx**: Shared navigation components for consistent UI
- **UserNav**: Unified user dropdown with role-aware options

## 📖 Documentation

For detailed technical specifications, see:
- [`DOCS/DASHBOARD_ARCHITECTURE.md`](DOCS/DASHBOARD_ARCHITECTURE.md)

## ✅ Benefits

1. **Clear Separation**: Distinct interfaces for different user needs
2. **Scalable**: Easy to add new features to either dashboard
3. **Secure**: Role-based access prevents unauthorized access
4. **Intuitive**: Familiar navigation patterns for both user types
5. **Maintainable**: Modular code structure for future enhancements

## 🚀 Next Steps

1. Test role-based navigation with different user accounts
2. Verify all permissions are correctly enforced
3. Customize dashboard features based on church requirements
4. Add additional admin tools as needed