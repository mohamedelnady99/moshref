import React from 'react';
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { MaterialSymbol } from 'react-material-symbols';
import Header from './Header';
import AIAssistant from '../AIAssistant';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../i18n';
import { usePlatform } from '../../context/PlatformContext';
import { storageUrl, apiFetch } from '../../utils/api';
import Footer from './Footer';
import LanguageSwitcher from '../../i18n/LanguageSwitcher';

import { brandMark } from '../../assets/brand';
const mainNavItems = [
  { path: '/dashboard', icon: 'dashboard', labelKey: 'nav.dashboard', roles: ['Admin', 'Owner', 'Manager', 'Shepherd', 'Doctor'] },
  { path: '/animals', icon: 'pets', labelKey: 'nav.animals', hasSubmenu: true, roles: ['Admin', 'Owner', 'Manager', 'Shepherd', 'Doctor'] },
  { path: '/medical-records', icon: 'medical_services', labelKey: 'nav.medicalRecords', hasSubmenu: true, roles: ['Admin', 'Owner', 'Manager', 'Doctor'] },
  { path: '/devices', icon: 'sensors', labelKey: 'nav.devices', roles: ['Admin', 'Owner', 'Manager'] },
  { path: '/map', icon: 'map', labelKey: 'nav.mapView', roles: ['Admin', 'Owner', 'Manager', 'Shepherd'] },
  { path: '/auctions', icon: 'gavel', labelKey: 'nav.auctions', hasSubmenu: true, roles: ['Admin', 'Owner', 'Manager'] },
  { path: '/transfers', icon: 'swap_horiz', labelKey: 'nav.transfers', roles: ['Admin', 'Owner'] },
  { path: '/alerts', icon: 'warning', labelKey: 'nav.alerts', roles: ['Admin', 'Owner', 'Manager'] },
  { path: '/tasks', icon: 'task', labelKey: 'nav.tasks', hasSubmenu: true, roles: ['Admin', 'Owner', 'Manager', 'Shepherd', 'Doctor'] },
  { path: '/messages', icon: 'chat', labelKey: 'nav.messages', roles: ['Admin', 'Owner', 'Manager', 'Shepherd', 'Doctor'] },
  { path: '/subscription', icon: 'credit_score', labelKey: 'nav.subscription', roles: ['Admin', 'Owner'] },
  { path: '/users', icon: 'group', labelKey: 'nav.users', hasSubmenu: true, roles: ['Admin', 'Owner'] },
  { path: '/reports', icon: 'assessment', labelKey: 'nav.reports', roles: ['Admin', 'Owner', 'Manager', 'Doctor'] },

  { path: '/settings', icon: 'settings', labelKey: 'settings.title', roles: ['Admin'] },
];

const animalSubmenu = [
  { path: '/animals', labelKey: 'animals.title', roles: ['Admin', 'Owner', 'Manager', 'Shepherd', 'Doctor'] },
  { path: '/animal-groups', labelKey: 'nav.animalGroups', roles: ['Admin', 'Owner', 'Manager', 'Shepherd'] },
  { path: '/geofences', labelKey: 'nav.geofences', roles: ['Admin', 'Owner', 'Manager', 'Shepherd'] },
];

const medicalSubmenu = [
  { path: '/medical-records', labelKey: 'nav.medicalRecords', roles: ['Admin', 'Owner', 'Manager', 'Doctor'] },
  { path: '/vaccination-schedule', labelKey: 'nav.vaccinationSchedule', roles: ['Admin', 'Owner', 'Manager', 'Doctor'] },
];

const auctionSubmenu = [
  { path: '/auctions', labelKey: 'nav.browseAuctions', roles: ['Admin', 'Owner', 'Manager'] },
  { path: '/my-payments', labelKey: 'nav.auctionPayments', roles: ['Admin', 'Owner'] },
  { path: '/payments', labelKey: 'nav.managePayments', roles: ['Admin'] },
];

const usersSubmenu = [
  { path: '/users', labelKey: 'nav.users', roles: ['Admin', 'Owner'] },
  { path: '/invitations', labelKey: 'nav.invitations', roles: ['Admin', 'Owner'] },
  { path: '/team', labelKey: 'nav.team', roles: ['Admin'] },
];

const tasksSubmenu = [
  { path: '/tasks', labelKey: 'tasks.title', roles: ['Admin', 'Owner', 'Manager', 'Shepherd', 'Doctor'] },
  { path: '/task-logs-archive', labelKey: 'nav.taskLogs', roles: ['Admin', 'Owner'] },
];

const navItemBase = 'group relative flex items-center gap-3 rounded-2xl font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60';
const navItemActive = 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20';
const navItemIdle = 'text-on-surface-variant hover:bg-white/70 hover:text-brand-primary';

export default function Layout() {
  const location = useLocation();
  const [animalSubmenuOpen, setAnimalSubmenuOpen] = useState(false);
  const [auctionSubmenuOpen, setAuctionSubmenuOpen] = useState(false);
  const [usersSubmenuOpen, setUsersSubmenuOpen] = useState(false);
  const [tasksSubmenuOpen, setTasksSubmenuOpen] = useState(false);
  const [medicalSubmenuOpen, setMedicalSubmenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  const { user } = useAuth();
  const { t, dir } = useI18n();
  const { logoUrl, platformName, copyrightText } = usePlatform();

  useEffect(() => {
    if (!user) return;
    fetchMenuItems();
  }, [user]);

  const fetchMenuItems = async () => {
    try {
      const res = await apiFetch('/api/menu-items');
      if (res.ok) {
        const d = await res.json();
        if (d.data && d.data.length > 0) {
          setMenuItems(d.data);
        }
      }
    } catch (e) {
      // fallback to hardcoded
    }
  };

  const navItems = menuItems || mainNavItems;

  const isRtl = dir === 'rtl';

  const isAnimalsActive = location.pathname === '/animals' || location.pathname === '/animal-groups' || location.pathname.startsWith('/animal-groups') || location.pathname === '/geofences';
  const isMedicalActive = location.pathname === '/medical-records' || location.pathname === '/vaccination-schedule';
  const isAuctionsActive = location.pathname === '/auctions' || location.pathname.startsWith('/my-payments') || location.pathname.startsWith('/payments');
  const isUsersActive = location.pathname === '/users' || location.pathname === '/team' || location.pathname === '/invitations' || location.pathname.startsWith('/users/');
  const isTasksActive = location.pathname === '/tasks' || location.pathname.startsWith('/task-logs');

  // UI only: expand the submenu of the section the user is currently in,
  // and close the mobile drawer after navigating.
  useEffect(() => {
    if (isAnimalsActive) setAnimalSubmenuOpen(true);
    if (isMedicalActive) setMedicalSubmenuOpen(true);
    if (isAuctionsActive) setAuctionSubmenuOpen(true);
    if (isUsersActive) setUsersSubmenuOpen(true);
    if (isTasksActive) setTasksSubmenuOpen(true);
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Lock page scroll and allow Escape while the mobile drawer is open.
  useEffect(() => {
    if (!mobileNavOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMobileNavOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileNavOpen]);

  const getSubmenu = (item) => {
    if (item.path === '/animals') return animalSubmenu.filter(subItem => !subItem.roles || subItem.roles.includes(user?.role));
    if (item.path === '/medical-records') return medicalSubmenu.filter(subItem => !subItem.roles || subItem.roles.includes(user?.role));
    if (item.path === '/auctions') return auctionSubmenu.filter(subItem => !subItem.roles || subItem.roles.includes(user?.role));
    if (item.path === '/users') return usersSubmenu.filter(subItem => !subItem.roles || subItem.roles.includes(user?.role));
    if (item.path === '/tasks') return tasksSubmenu.filter(subItem => !subItem.roles || subItem.roles.includes(user?.role));
    return null;
  };

  const isSubmenuOpen = (item) => {
    if (item.path === '/animals') return animalSubmenuOpen;
    if (item.path === '/medical-records') return medicalSubmenuOpen;
    if (item.path === '/auctions') return auctionSubmenuOpen;
    if (item.path === '/users') return usersSubmenuOpen;
    if (item.path === '/tasks') return tasksSubmenuOpen;
    return false;
  };

  const toggleSubmenu = (item) => {
    if (item.path === '/animals') setAnimalSubmenuOpen(!animalSubmenuOpen);
    if (item.path === '/medical-records') setMedicalSubmenuOpen(!medicalSubmenuOpen);
    if (item.path === '/auctions') setAuctionSubmenuOpen(!auctionSubmenuOpen);
    if (item.path === '/users') setUsersSubmenuOpen(!usersSubmenuOpen);
    if (item.path === '/tasks') setTasksSubmenuOpen(!tasksSubmenuOpen);
  };

  const getSubmenuIcon = (subItem) => {
    if (subItem.path === '/animals') return 'pets';
    if (subItem.path === '/animal-groups') return 'groups';
    if (subItem.path === '/geofences') return 'fence';
    if (subItem.path === '/medical-records') return 'medical_services';
    if (subItem.path === '/vaccination-schedule') return 'vaccines';
    if (subItem.path === '/auctions') return 'gavel';
    if (subItem.path === '/my-payments') return 'account_balance_wallet';
    if (subItem.path === '/payments') return 'payments';
    if (subItem.path === '/users') return 'group';
    if (subItem.path === '/invitations') return 'mail';
    if (subItem.path === '/team') return 'groups';
    if (subItem.path === '/tasks') return 'task';
    if (subItem.path === '/task-logs-archive') return 'history';
    return 'chevron_right';
  };

  const visibleNavItems = navItems.filter(item => !item.roles || item.roles.includes(user?.role));

  const getNavSubmenu = (item) => {
    if (menuItems && item.children) return item.children.filter(sub => !sub.roles || sub.roles.includes(user?.role));
    return getSubmenu(item);
  };

  const getSectionActive = (item) => {
    if (item.path === '/animals') return isAnimalsActive;
    if (item.path === '/medical-records') return isMedicalActive;
    if (item.path === '/auctions') return isAuctionsActive;
    if (item.path === '/users') return isUsersActive;
    if (item.path === '/tasks') return isTasksActive;
    return location.pathname === item.path;
  };

  const renderBrand = (collapsed) => (
    <div className={`flex items-center gap-3 min-w-0 ${collapsed ? 'justify-center' : ''}`}>
      <img src={logoUrl ? storageUrl(logoUrl) : brandMark} alt={platformName} className={`${collapsed ? 'w-11 h-11' : 'w-12 h-12'} object-contain rounded-2xl flex-shrink-0 transition-all`} />
      {!collapsed && (
        <div className="min-w-0">
          <h1 className="text-lg font-extrabold text-brand-primary leading-tight truncate">{platformName}</h1>
          {copyrightText && (
            <p className="text-[10px] uppercase tracking-wider text-brand-secondary/60 font-semibold truncate">
              {copyrightText}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const renderNav = (collapsed) => (
    <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar -mx-1 px-1 py-1">
      {visibleNavItems.map((item) => {
        const submenu = getNavSubmenu(item);
        const hasSubmenu = submenu && submenu.length > 0;
        const isActive = getSectionActive(item);
        const menuOpen = isSubmenuOpen(item);
        const label = t(item.labelKey || item.label_key || item.label);
        const padding = collapsed ? 'justify-center h-12 w-12 mx-auto' : 'px-4 py-3';

        return (
          <div key={item.path || item.id}>
            {hasSubmenu ? (
              <>
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item)}
                  title={collapsed ? label : undefined}
                  aria-expanded={menuOpen}
                  className={`w-full ${navItemBase} ${padding} ${isActive ? navItemActive : navItemIdle}`}
                >
                  <MaterialSymbol icon={item.icon} size={22} weight={isActive ? 'fill' : 'regular'} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-start truncate">{label}</span>
                      <MaterialSymbol
                        icon="expand_more"
                        size={20}
                        className={`flex-shrink-0 transition-transform duration-200 ${menuOpen ? '[transform:rotate(180deg)]' : ''} ${isActive ? 'text-white/80' : 'text-on-surface-subtle'}`}
                      />
                    </>
                  )}
                </button>

                {!collapsed && menuOpen && (
                  <div className="ms-5 mt-1 mb-2 ps-3 border-s-2 border-brand-primary/10 space-y-0.5 animate-fade-in">
                    {submenu.map((subItem) => (
                      <NavLink
                        key={subItem.path || subItem.id}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 ${
                            isActive
                              ? 'bg-brand-accent/15 text-brand-primary font-semibold'
                              : 'text-on-surface-variant/80 font-medium hover:bg-white/70 hover:text-brand-primary'
                          }`
                        }
                      >
                        <MaterialSymbol icon={subItem.icon || getSubmenuIcon(subItem)} size={18} className="flex-shrink-0" />
                        <span className="text-start truncate">{t(subItem.labelKey || subItem.label_key || subItem.label)}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                title={collapsed ? label : undefined}
                className={({ isActive }) => `${navItemBase} ${padding} ${isActive ? navItemActive : navItemIdle}`}
              >
                {({ isActive }) => (
                  <>
                    <MaterialSymbol icon={item.icon} size={22} weight={isActive ? 'fill' : 'regular'} className="flex-shrink-0" />
                    {!collapsed && <span className="text-start truncate">{label}</span>}
                  </>
                )}
              </NavLink>
            )}
          </div>
        );
      })}
    </nav>
  );

  const renderProfile = (collapsed) => (
    <div className="pt-4 mt-4 border-t border-brand-primary/10">
      <NavLink
        to="/profile"
        title={collapsed ? (user?.name || 'User') : undefined}
        className={`flex items-center gap-3 rounded-2xl bg-white/70 hover:bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 ${collapsed ? 'justify-center p-1.5' : 'p-2.5'}`}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0 text-start">
            <p className="text-sm font-bold text-brand-primary truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-on-surface-subtle truncate">{user?.role || 'Guest'}</p>
          </div>
        )}
        {!collapsed && <MaterialSymbol icon={isRtl ? 'chevron_left' : 'chevron_right'} size={18} className="text-on-surface-subtle flex-shrink-0" />}
      </NavLink>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col h-screen fixed top-0 start-0 bg-gradient-to-b from-brand-light to-[#F4F4EF] border-e border-brand-primary/5 py-5 z-50 transition-[width] duration-300 ${sidebarCollapsed ? 'w-20 px-3' : 'w-72 px-4'}`}
      >
        <div className={`mb-6 flex items-center gap-2 ${sidebarCollapsed ? 'flex-col' : 'justify-between'}`}>
          {renderBrand(sidebarCollapsed)}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`w-8 h-8 rounded-xl bg-white/70 flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-brand-primary shadow-sm transition-colors flex-shrink-0 ${sidebarCollapsed ? 'mt-3' : ''}`}
          >
            <MaterialSymbol
              icon={sidebarCollapsed ? (isRtl ? 'chevron_left' : 'chevron_right') : (isRtl ? 'chevron_right' : 'chevron_left')}
              size={18}
            />
          </button>
        </div>

        {renderNav(sidebarCollapsed)}
        {renderProfile(sidebarCollapsed)}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-brand-primary/40 backdrop-blur-sm transition-opacity duration-300 ${mobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`md:hidden fixed top-0 start-0 z-[70] h-full w-[85vw] max-w-xs flex flex-col bg-gradient-to-b from-brand-light to-[#F4F4EF] py-5 px-4 shadow-2xl transition-transform duration-300 ${
          mobileNavOpen ? '[transform:translateX(0)]' : isRtl ? '[transform:translateX(100%)]' : '[transform:translateX(-100%)]'
        }`}
        aria-hidden={!mobileNavOpen}
      >
        <div className="mb-6 flex items-center justify-between gap-2">
          {renderBrand(false)}
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            aria-label={t('common.close')}
            className="w-9 h-9 rounded-xl bg-white/70 flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-brand-primary flex-shrink-0"
          >
            <MaterialSymbol icon="close" size={20} />
          </button>
        </div>
        {renderNav(false)}
        <div className="pt-4 mt-4 border-t border-brand-primary/10 sm:hidden">
          <LanguageSwitcher className="w-full" />
        </div>
        {renderProfile(false)}
      </aside>

      <main className={`transition-[margin] duration-300 flex flex-col min-h-screen min-w-0 ${sidebarCollapsed ? 'md:ms-20' : 'md:ms-72'}`}>
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 pb-16">
          <Outlet />
        </div>
        <Footer />
      </main>
      <AIAssistant />
    </div>
  );
}
