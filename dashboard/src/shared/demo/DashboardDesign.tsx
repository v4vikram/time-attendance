// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const styles = {
  root: {
    '--bg-body': '#F4F5F8',
    '--bg-surface': '#FFFFFF',
    '--bg-subtle': '#F3F4F6',
    '--bg-hover': '#F9FAFB',
    '--bg-selected': '#EEF2FF',
    '--text-main': '#111827',
    '--text-muted': '#6B7280',
    '--text-light': '#9CA3AF',
    '--brand-primary': '#5C65F6',
    '--brand-primary-hover': '#4E56E5',
    '--border-subtle': '#E5E7EB',
    '--border-focus': '#A5B4FC',
  },
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#F4F5F8',
    color: '#111827',
    fontSize: '13px',
    lineHeight: '1.5',
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  brand: {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    fontWeight: 700,
    fontSize: '16px',
    color: '#111827',
    borderBottom: '1px solid #E5E7EB',
    gap: '12px',
  },
  brandLogo: {
    width: '24px',
    height: '24px',
    backgroundColor: '#5C65F6',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  navSection: {
    padding: '16px 12px',
    overflowY: 'auto',
    flex: 1,
  },
  navLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#9CA3AF',
    margin: '16px 0 8px 12px',
    fontWeight: 600,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    marginBottom: '4px',
    borderRadius: '8px',
    color: '#6B7280',
    textDecoration: 'none',
    cursor: 'pointer',
    justifyContent: 'space-between',
    transition: 'all 0.2s',
  },
  navItemActive: {
    backgroundColor: '#EEF2FF',
    color: '#5C65F6',
    fontWeight: 500,
  },
  navItemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  navNested: {
    paddingLeft: '36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '8px',
  },
  navNestedItem: {
    color: '#6B7280',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
  },
  topbar: {
    height: '64px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '0 12px',
    height: '36px',
    transition: 'border-color 0.2s',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 600,
  },
  cardBody: {
    padding: '20px',
    flex: 1,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  statCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#6B7280',
  },
  statIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#111827',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1,
  },
  statTrend: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '8px',
  },
  dashboardLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '9999px',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6B7280',
    fontWeight: 600,
    fontSize: '12px',
    flexShrink: 0,
    overflow: 'hidden',
  },
  iconBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    background: 'transparent',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    gap: '8px',
    backgroundColor: '#5C65F6',
    color: 'white',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    gap: '8px',
    backgroundColor: '#F3F4F6',
    color: '#111827',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
  },
  activityItem: {
    display: 'flex',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid #E5E7EB',
  },
  activityContent: {
    flex: 1,
  },
  activityTime: {
    fontSize: '11px',
    color: '#9CA3AF',
    marginTop: '4px',
  },
  indicatorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#5C65F6',
    marginTop: '6px',
    zIndex: 2,
    boxShadow: '0 0 0 4px #FFFFFF',
  },
  chartBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '16px',
    gap: '8px',
    position: 'relative',
    flex: 1,
  },
  pieChart: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'conic-gradient(#5C65F6 0% 45%, #A5B4FC 45% 75%, #E5E7EB 75% 100%)',
  },
};

const SvgIcon = ({ children, style = {}, size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none', ...style }}
  >
    {children}
  </svg>
);

const IconUsers = ({ style }) => (
  <SvgIcon style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </SvgIcon>
);

const IconGrid = ({ style }) => (
  <SvgIcon style={style}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </SvgIcon>
);

const IconCalendar = ({ style }) => (
  <SvgIcon style={style}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </SvgIcon>
);

const IconDollar = ({ style }) => (
  <SvgIcon style={style}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </SvgIcon>
);

const IconLayers = ({ style }) => (
  <SvgIcon style={style}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </SvgIcon>
);

const IconBarChart = ({ style }) => (
  <SvgIcon style={style}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </SvgIcon>
);

const IconSettings = ({ style }) => (
  <SvgIcon style={style}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </SvgIcon>
);

const IconSearch = ({ style }) => (
  <SvgIcon style={style}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </SvgIcon>
);

const IconMoon = ({ style }) => (
  <SvgIcon style={style}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </SvgIcon>
);

const IconBell = ({ style }) => (
  <SvgIcon style={style}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </SvgIcon>
);

const IconChevronDown = ({ size = 14 }) => (
  <SvgIcon size={size}>
    <polyline points="6 9 12 15 18 9" />
  </SvgIcon>
);

const IconTrendUp = () => (
  <SvgIcon size={12}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </SvgIcon>
);

const IconTrendDown = () => (
  <SvgIcon size={12}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </SvgIcon>
);

const IconPlus = () => (
  <SvgIcon>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </SvgIcon>
);

const IconDots = () => (
  <SvgIcon>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </SvgIcon>
);

const IconCheck = () => (
  <SvgIcon>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </SvgIcon>
);

const IconUserPlus = () => (
  <SvgIcon>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </SvgIcon>
);

const IconWorkforce = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'white', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const Badge = ({ type, children }) => {
  const badgeStyles = {
    success: { backgroundColor: '#ECFDF5', color: '#059669' },
    warning: { backgroundColor: '#FFF7ED', color: '#D97706' },
    neutral: { backgroundColor: '#F3F4F6', color: '#6B7280' },
    brand: { backgroundColor: '#EEF2FF', color: '#5C65F6' },
  };
  return (
    <span style={{ ...styles.badge, ...badgeStyles[type] }}>
      {children}
    </span>
  );
};

const Avatar = ({ src, initials, bgColor, color }) => (
  <div style={{ ...styles.avatar, ...(bgColor ? { backgroundColor: bgColor } : {}), ...(color ? { color } : {}) }}>
    {src ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
  </div>
);

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', department: '', status: 'Active' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', role: '', department: '', status: 'Active' });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Add New Employee</h3>
          <button onClick={onClose} style={{ ...styles.iconBtn, fontSize: '18px' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Full Name', name: 'name', placeholder: 'e.g. John Smith', required: true },
            { label: 'Email', name: 'email', placeholder: 'e.g. john@company.com', required: true },
            { label: 'Role', name: 'role', placeholder: 'e.g. Senior Developer', required: true },
            { label: 'Department', name: 'department', placeholder: 'e.g. Engineering', required: true },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#111827' }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#111827', backgroundColor: '#FFFFFF' }}
            >
              <option>Active</option>
              <option>On Leave</option>
              <option>Offline</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ ...styles.btnSecondary, padding: '8px 16px' }}>Cancel</button>
            <button type="submit" style={{ ...styles.btnPrimary, padding: '8px 16px' }}>
              {submitted ? '✓ Added!' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Sidebar = ({ activeNav, setActiveNav, employeesExpanded, setEmployeesExpanded }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconGrid /> },
    { id: 'employees', label: 'Employees', icon: <IconUsers />, hasChildren: true },
    { id: 'attendance', label: 'Attendance', icon: <IconCalendar /> },
    { id: 'payroll', label: 'Payroll', icon: <IconDollar /> },
    { id: 'projects', label: 'Projects', icon: <IconLayers /> },
  ];
  const adminItems = [
    { id: 'reports', label: 'Reports', icon: <IconBarChart /> },
    { id: 'settings', label: 'Settings', icon: <IconSettings /> },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.brandLogo}><IconWorkforce /></div>
        Workforce
      </div>
      <nav style={styles.navSection}>
        <div style={styles.navLabel}>Main Menu</div>
        {navItems.map((item) => (
          <div key={item.id}>
            <div
              style={{
                ...styles.navItem,
                ...(activeNav === item.id ? styles.navItemActive : {}),
              }}
              onClick={() => {
                setActiveNav(item.id);
                if (item.hasChildren) setEmployeesExpanded(!employeesExpanded);
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.color = '#111827';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6B7280';
                }
              }}
            >
              <div style={{ ...styles.navItemContent, color: activeNav === item.id ? '#5C65F6' : 'inherit' }}>
                {item.icon}
                {item.label}
              </div>
              {item.hasChildren && <IconChevronDown size={14} />}
            </div>
            {item.hasChildren && employeesExpanded && (
              <div style={styles.navNested}>
                {['All Employees', 'Departments', 'Designations'].map((sub, i) => (
                  <span
                    key={sub}
                    style={{ ...styles.navNestedItem, ...(i === 0 ? { color: '#111827', fontWeight: 500 } : {}) }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.color = '#111827'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = i === 0 ? '#111827' : '#6B7280'; }}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <div style={{ ...styles.navLabel, marginTop: '24px' }}>Admin</div>
        {adminItems.map((item) => (
          <div
            key={item.id}
            style={{
              ...styles.navItem,
              ...(activeNav === item.id ? styles.navItemActive : {}),
            }}
            onClick={() => setActiveNav(item.id)}
            onMouseEnter={(e) => {
              if (activeNav !== item.id) {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
                e.currentTarget.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6B7280';
              }
            }}
          >
            <div style={{ ...styles.navItemContent, color: activeNav === item.id ? '#5C65F6' : 'inherit' }}>
              {item.icon}
              {item.label}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

const Topbar = ({ searchValue, setSearchValue }) => (
  <header style={styles.topbar}>
    <div style={{ width: '300px' }}>
      <div style={styles.inputGroup}>
        <span style={{ color: '#9CA3AF', marginRight: '8px', display: 'flex' }}><IconSearch /></span>
        <input
          type="text"
          placeholder="Search employees, departments..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', color: '#111827', width: '100%' }}
        />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <button style={styles.iconBtn} title="Toggle Theme"
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}
      >
        <IconMoon />
      </button>
      <button style={{ ...styles.iconBtn, position: 'relative' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}
      >
        <IconBell />
        <span style={{ position: 'absolute', top: '6px', right: '8px', width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%' }}></span>
      </button>
      <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB', margin: '0 8px' }}></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 500, fontSize: '13px' }}>Eleanor Pena</span>
          <span style={{ fontSize: '11px', color: '#6B7280' }}>HR Manager</span>
        </div>
        <span style={{ color: '#9CA3AF' }}><IconChevronDown size={14} /></span>
      </div>
    </div>
  </header>
);

const StatCards = () => (
  <div style={styles.statsGrid}>
    <div style={{ ...styles.card, ...styles.statCard }}>
      <div style={styles.statHeader}>
        <span style={{ fontSize: '12px' }}>Total Employees</span>
        <div style={styles.statIcon}><IconUsers /></div>
      </div>
      <div>
        <div style={styles.statValue}>2,420</div>
        <div style={{ ...styles.statTrend, color: '#059669' }}>
          <IconTrendUp />
          <span>12% from last month</span>
        </div>
      </div>
    </div>
    <div style={{ ...styles.card, ...styles.statCard }}>
      <div style={styles.statHeader}>
        <span style={{ fontSize: '12px' }}>Active Employees</span>
        <div style={{ ...styles.statIcon, color: '#059669', backgroundColor: '#ECFDF5' }}><IconCheck /></div>
      </div>
      <div>
        <div style={styles.statValue}>2,385</div>
        <div style={{ ...styles.statTrend, color: '#6B7280' }}>
          <span>98% active rate</span>
        </div>
      </div>
    </div>
    <div style={{ ...styles.card, ...styles.statCard }}>
      <div style={styles.statHeader}>
        <span style={{ fontSize: '12px' }}>On Leave</span>
        <div style={{ ...styles.statIcon, color: '#D97706', backgroundColor: '#FFF7ED' }}><IconCalendar /></div>
      </div>
      <div>
        <div style={styles.statValue}>35</div>
        <div style={{ ...styles.statTrend, color: '#DC2626' }}>
          <IconTrendDown />
          <span>-5% from last week</span>
        </div>
      </div>
    </div>
    <div style={{ ...styles.card, ...styles.statCard }}>
      <div style={styles.statHeader}>
        <span style={{ fontSize: '12px' }}>New Joinees</span>
        <div style={{ ...styles.statIcon, color: '#5C65F6', backgroundColor: '#EEF2FF' }}><IconUserPlus /></div>
      </div>
      <div>
        <div style={styles.statValue}>12</div>
        <div style={{ ...styles.statTrend, color: '#6B7280' }}>
          <span>This month</span>
        </div>
      </div>
    </div>
  </div>
);

const WorkforceOverview = () => {
  const bars = [30, 45, 40, 60, 55, 80, 100];
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Workforce Overview</h3>
        <button style={{ ...styles.btnSecondary, padding: '4px 12px', fontSize: '12px' }}>
          This Year <IconChevronDown size={12} />
        </button>
      </div>
      <div style={{ ...styles.cardBody, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '200px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>Employee Growth</div>
          <div style={styles.chartBox}>
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: '4px 4px 0 0',
                  backgroundColor: i === bars.length - 1 ? '#5C65F6' : i % 2 === 1 ? '#A5B4FC' : '#E5E7EB',
                  transition: 'height 0.3s',
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>Department Distribution</div>
          <div style={{ ...styles.chartBox, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <div style={styles.pieChart}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', marginLeft: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#5C65F6', display: 'inline-block' }}></span> Engineering
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#A5B4FC', display: 'inline-block' }}></span> Product
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#E5E7EB', display: 'inline-block' }}></span> Design
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const allEmployees = [
  { id: 1, name: 'Cameron Williamson', email: 'cameron.w@company.com', role: 'Senior Frontend Dev', department: 'Engineering', status: 'Active', src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 2, name: 'Jenny Wilson', email: 'jenny.w@company.com', role: 'Product Manager', department: 'Product', status: 'Active', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { id: 3, name: 'Guy Hawkins', email: 'guy.h@company.com', role: 'UI/UX Designer', department: 'Design', status: 'On Leave', src: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { id: 4, name: 'Robert Fox', email: 'robert.f@company.com', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', initials: 'RW', bgColor: '#E0E7FF', color: '#5C65F6' },
  { id: 5, name: 'Kathryn Murphy', email: 'kathryn.m@company.com', role: 'Marketing Coord.', department: 'Marketing', status: 'Offline', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
];

const EmployeeDirectory = ({ filterValue, setFilterValue }) => {
  const [page, setPage] = useState(0);
  const perPage = 5;

  const filtered = allEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      e.department.toLowerCase().includes(filterValue.toLowerCase()) ||
      e.role.toLowerCase().includes(filterValue.toLowerCase())
  );

  const statusBadgeType = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'On Leave') return 'warning';
    return 'neutral';
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Employee Directory</h3>
        <div style={{ ...styles.inputGroup, height: '32px', width: '200px' }}>
          <span style={{ color: '#9CA3AF', marginRight: '8px', display: 'flex' }}><IconSearch /></span>
          <input
            type="text"
            placeholder="Filter..."
            value={filterValue}
            onChange={(e) => { setFilterValue(e.target.value); setPage(0); }}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', color: '#111827', width: '100%' }}
          />
        </div>
      </div>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              {['Employee', 'Role', 'Department', 'Status', 'Action'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 20px',
                    borderBottom: '1px solid #E5E7EB',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#9CA3AF',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    ...(i === 4 ? { textAlign: 'right' } : {}),
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(page * perPage, page * perPage + perPage).map((emp) => (
              <tr
                key={emp.id}
                onMouseEnter={(e) => { Array.from(e.currentTarget.cells).forEach(c => c.style.backgroundColor = '#F9FAFB'); }}
                onMouseLeave={(e) => { Array.from(e.currentTarget.cells).forEach(c => c.style.backgroundColor = 'transparent'); }}
              >
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #E5E7EB', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar src={emp.src} initials={emp.initials} bgColor={emp.bgColor} color={emp.color} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 500, color: '#111827' }}>{emp.name}</span>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>{emp.email}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #E5E7EB', verticalAlign: 'middle' }}>{emp.role}</td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #E5E7EB', verticalAlign: 'middle' }}>{emp.department}</td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #E5E7EB', verticalAlign: 'middle' }}>
                  <Badge type={statusBadgeType(emp.status)}>{emp.status}</Badge>
                </td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #E5E7EB', verticalAlign: 'middle', textAlign: 'right' }}>
                  <button
                    style={{ ...styles.iconBtn, display: 'inline-flex' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}
                  >
                    <IconDots />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6B7280', fontSize: '12px' }}>
        <span>Showing {page * perPage + 1} to {Math.min(page * perPage + perPage, filtered.length)} of {filtered.length} entries</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{ ...styles.btnSecondary, padding: '4px 8px', opacity: page === 0 ? 0.5 : 1, cursor: page === 0 ? 'not-allowed' : 'pointer' }}
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >Prev</button>
          <button
            style={{ ...styles.btnSecondary, padding: '4px 8px', opacity: (page + 1) * perPage >= filtered.length ? 0.5 : 1, cursor: (page + 1) * perPage >= filtered.length ? 'not-allowed' : 'pointer' }}
            disabled={(page + 1) * perPage >= filtered.length}
            onClick={() => setPage(page + 1)}
          >Next</button>
        </div>
      </div>
    </div>
  );
};

const activityData = [
  { id: 1, color: '#5C65F6', title: 'New Employee Added', desc: 'Sarah Jenkins was added to Design by Admin.', time: '10 minutes ago' },
  { id: 2, color: '#059669', title: 'Leave Approved', desc: 'Guy Hawkins leave request (Oct 12-15) approved.', time: '2 hours ago' },
  { id: 3, color: '#6B7280', title: 'System Update', desc: 'Payroll module updated to version 2.4.1.', time: 'Yesterday, 14:30' },
  { id: 4, color: '#D97706', title: 'Role Change', desc: 'Jenny Wilson promoted to Product Manager.', time: 'Oct 8, 2023' },
  { id: 5, color: '#5C65F6', title: 'Project Assigned', desc: "Engineering team assigned to 'Project Alpha'.", time: 'Oct 5, 2023' },
];

const RecentActivity = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? activityData : activityData.slice(0, 5);

  return (
    <div style={{ ...styles.card, height: '100%' }}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Recent Activity</h3>
      </div>
      <div style={{ ...styles.cardBody, paddingTop: '8px' }}>
        <div style={styles.activityList}>
          {displayed.map((item, idx) => (
            <div
              key={item.id}
              style={{
                ...styles.activityItem,
                ...(idx === displayed.length - 1 ? { borderBottom: 'none', paddingBottom: 0 } : {}),
              }}
            >
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ ...styles.indicatorDot, backgroundColor: item.color }}></div>
                {idx < displayed.length - 1 && (
                  <div style={{ position: 'absolute', top: '14px', bottom: '-20px', width: '1px', backgroundColor: '#E5E7EB', zIndex: 1 }}></div>
                )}
              </div>
              <div style={styles.activityContent}>
                <div><strong>{item.title}</strong></div>
                <div style={{ color: '#6B7280', marginTop: '2px', fontSize: '12px' }}>{item.desc}</div>
                <div style={styles.activityTime}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{ color: '#5C65F6', textDecoration: 'none', fontWeight: 500, fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {showAll ? 'Show Less' : 'View All Activity'}
        </button>
      </div>
    </div>
  );
};

const DashboardPage = ({ searchValue, setSearchValue, onAddEmployee }) => {
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (searchValue) setFilterValue(searchValue);
  }, [searchValue]);

  return (
    <div style={styles.contentArea}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>Employee Management</h1>
          <p style={{ color: '#6B7280' }}>Overview of your workforce metrics and team data.</p>
        </div>
        <button
          style={styles.btnPrimary}
          onClick={onAddEmployee}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4E56E5'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#5C65F6'; }}
        >
          <IconPlus />
          Add Employee
        </button>
      </div>
      <StatCards />
      <div style={styles.dashboardLayout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <WorkforceOverview />
          <EmployeeDirectory filterValue={filterValue} setFilterValue={setFilterValue} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeNav, setActiveNav] = useState('employees');
  const [employeesExpanded, setEmployeesExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { overflow: hidden; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #F3F4F6; }
      ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div style={styles.body}>
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          employeesExpanded={employeesExpanded}
          setEmployeesExpanded={setEmployeesExpanded}
        />
        <main style={styles.mainWrapper}>
          <Topbar searchValue={searchValue} setSearchValue={setSearchValue} />
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onAddEmployee={() => setModalOpen(true)}
                />
              }
            />
          </Routes>
        </main>
        <AddEmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Router>
  );
};

export default App;