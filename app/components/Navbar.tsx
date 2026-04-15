'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
  type SyntheticEvent,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Menu,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Camera,
  Upload,
  Zap,
} from 'lucide-react';

interface NavLink {
  path: string;
  name: string;
  isNew?: boolean;
}

const navLinks: NavLink[] = [
  { path: '/',               name: 'Sanctuary' },
  { path: '/exercises',      name: 'Movements'  },
  { path: '/diet-plans',     name: 'Nutrition'  },
  { path: '/find-gyms',      name: 'Locations'  },
  { path: '/pricing',        name: 'Membership' },
  { path: '/form-validation', name: 'Premium', isNew: true },
];

type ProfilePictureUpdateDetail = { picture: string };
type ProfilePictureUpdateEvent  = CustomEvent<ProfilePictureUpdateDetail>;

const DEFAULT_PROFILE_IMAGE =
  'https://i.pinimg.com/474x/a3/cc/fd/a3ccfd7885e6cff94ebbbe40fd9e1611.jpg';

function canUseLocalStorage(): boolean {
  try { return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'; }
  catch { return false; }
}
function safeGetItem(key: string): string | null {
  if (!canUseLocalStorage()) return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function safeSetItem(key: string, value: string): void {
  if (!canUseLocalStorage()) return;
  try { window.localStorage.setItem(key, value); } catch { /* ignore */ }
}
function safeRemoveItem(key: string): void {
  if (!canUseLocalStorage()) return;
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
}

const NavBar = (): ReactElement => {
  const router   = useRouter();
  const pathname = usePathname();

  const [profileImage,        setProfileImage]        = useState<string>(DEFAULT_PROFILE_IMAGE);
  const [isOpen,              setIsOpen]              = useState<boolean>(false);
  const [scrolled,            setScrolled]            = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [userName,            setUserName]            = useState<string>('User');
  const [userEmail,           setUserEmail]           = useState<string>('user@example.com');
  const [theme,               setTheme]               = useState<'light' | 'dark'>('light');

  const fileInputRef  = useRef<HTMLInputElement>(null);
  const dropdownRef   = useRef<HTMLDivElement>(null);
  const objectUrlRef  = useRef<string | null>(null);

  /* Restore persisted state */
  useEffect(() => {
    const savedName    = safeGetItem('userName');
    const savedEmail   = safeGetItem('userEmail');
    const savedPicture = safeGetItem('profilePicture');
    if (savedName)    setUserName(savedName);
    if (savedEmail)   setUserEmail(savedEmail);
    if (savedPicture) setProfileImage(savedPicture);
  }, []);

  /* Theme init */
  useEffect(() => {
    const root        = document.documentElement;
    const savedTheme  = safeGetItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: 'light' | 'dark' =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : prefersDark ? 'dark' : 'light';
    root.setAttribute('data-theme', initial);
    setTheme(initial);
  }, []);

  /* Event listeners */
  useEffect(() => {
    const onStorage = (): void => {
      const saved = safeGetItem('profilePicture');
      if (saved) setProfileImage(saved);
      setUserName(safeGetItem('userName')  || 'User');
      setUserEmail(safeGetItem('userEmail') || 'user@example.com');
    };
    const onProfileUpdate = (e: Event): void => {
      const ev   = e as ProfilePictureUpdateEvent;
      const next = ev.detail?.picture;
      if (typeof next === 'string' && next.length > 0) setProfileImage(next);
    };
    const onScroll       = (): void => setScrolled(window.scrollY > 20);
    const onClickOutside = (e: globalThis.MouseEvent): void => {
      const t = e.target instanceof Node ? e.target : null;
      if (dropdownRef.current && t && !dropdownRef.current.contains(t))
        setProfileDropdownOpen(false);
    };

    window.addEventListener('scroll',               onScroll);
    window.addEventListener('storage',              onStorage);
    window.addEventListener('profilePictureUpdate', onProfileUpdate);
    document.addEventListener('mousedown',          onClickOutside);
    return () => {
      window.removeEventListener('scroll',               onScroll);
      window.removeEventListener('storage',              onStorage);
      window.removeEventListener('profilePictureUpdate', onProfileUpdate);
      document.removeEventListener('mousedown',          onClickOutside);
    };
  }, []);

  /* Revoke object URL on unmount */
  useEffect(() => () => {
    if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); objectUrlRef.current = null; }
  }, []);

  const handleLogOut = (): void => {
    safeRemoveItem('token');
    safeRemoveItem('userName');
    safeRemoveItem('userEmail');
    safeRemoveItem('profilePicture');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    router.push('/login');
    router.refresh();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputEl = e.currentTarget;
    const file    = inputEl.files?.[0];
    if (!file) { inputEl.value = ''; return; }
    try {
      if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); objectUrlRef.current = null; }
      objectUrlRef.current = URL.createObjectURL(file);
      setProfileImage(objectUrlRef.current);
      const reader     = new FileReader();
      reader.onload  = (): void => {
        const result = reader.result;
        if (typeof result === 'string') {
          setProfileImage(result);
          safeSetItem('profilePicture', result);
          window.dispatchEvent(new CustomEvent<ProfilePictureUpdateDetail>('profilePictureUpdate', { detail: { picture: result } }));
        }
        if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); objectUrlRef.current = null; }
      };
      reader.onerror = (): void => {
        if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); objectUrlRef.current = null; }
      };
      reader.readAsDataURL(file);
    } catch (err) { console.error('Error handling image:', err); }
    finally { inputEl.value = ''; }
  };

  const triggerFileInput = (): void => fileInputRef.current?.click();

  const isActive = (path: string): boolean => pathname === path;

  const toggleTheme = (): void => {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    safeSetItem('theme', next);
    setTheme(next);
  };

  const handleProfileImageError = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    const img = e.currentTarget;
    if (img.src !== DEFAULT_PROFILE_IMAGE) img.src = DEFAULT_PROFILE_IMAGE;
    setProfileImage(DEFAULT_PROFILE_IMAGE);
    safeRemoveItem('profilePicture');
  };

  /* ─── Derived styles ─── */
  const navBase  = 'fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-sans';
  const navStyle = scrolled
    ? `${navBase} bg-background/80 backdrop-blur-2xl border-b border-border py-0`
    : `${navBase} bg-transparent py-4`;

  return (
    <nav role="navigation" className={navStyle}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group" id="nav-logo">
            <div className="flex flex-col">
              <span
                className={`text-2xl font-display font-bold tracking-tighter leading-none transition-colors duration-500 ${scrolled ? 'text-foreground' : 'text-foreground'}`}
              >
                ELEWEIGHT
              </span>
              <span className={`text-[8px] font-bold tracking-[0.4em] uppercase opacity-40 transition-colors duration-500 ${scrolled ? 'text-foreground' : 'text-foreground'}`}>
                Archives
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={[
                    'relative text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2 transition-all duration-300',
                    active
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-5 right-5 h-[1px] bg-foreground"
                    />
                  )}
                  {link.isNew && (
                    <span className="ml-2 text-[8px] font-black bg-foreground text-background px-1.5 py-0.5">
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Side: Theme + Profile ── */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-none border border-border transition-all hover:bg-foreground hover:text-background ${
                scrolled ? 'text-foreground' : 'text-foreground'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(): void => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex gap-3 items-center p-1 border border-transparent hover:border-border transition-all ${
                  scrolled ? 'text-foreground' : 'text-foreground'
                }`}
                aria-label="Open profile menu"
              >
                <div className="h-8 w-8 bg-muted-light/20 border border-border overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover bw-image"
                    onError={handleProfileImageError}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{    opacity: 0, y: 8,  scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-64 bg-[var(--surface)] rounded-2xl shadow-xl shadow-black/10 border border-[var(--border)] overflow-hidden z-50"
                  >
                    {/* Profile Header */}
                    <div className="p-5 bg-[var(--subtle)] border-b border-[var(--border)]">
                      <div className="flex items-center gap-4">
                        <div className="relative group/avatar">
                          <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-[var(--border-dark)]">
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="h-full w-full object-cover"
                              onError={handleProfileImageError}
                            />
                          </div>
                          <button
                            onClick={triggerFileInput}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                            aria-label="Change profile picture"
                          >
                            <Camera className="h-4 w-4 text-white" />
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[var(--foreground)] truncate">{userName}</p>
                          <p className="text-xs text-[var(--muted)] truncate">{userEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={triggerFileInput}
                        className="flex gap-3 items-center px-3 py-2.5 w-full text-sm text-left text-[var(--muted)] rounded-lg transition-colors hover:bg-[var(--subtle)] hover:text-[var(--foreground)]"
                      >
                        <Upload className="h-4 w-4 opacity-50" />
                        Update Profile Picture
                      </button>
                      <hr className="my-2 border-[var(--border)] mx-3" />
                      <button
                        onClick={handleLogOut}
                        className="flex gap-3 items-center px-3 py-2.5 w-full text-sm text-left text-red-500 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Mobile Right ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors border ${
                scrolled
                  ? 'border-[var(--border)] text-[var(--muted)]'
                  : 'border-white/20 text-white/70'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={(): void => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors border ${
                scrolled
                  ? 'border-[var(--border)] text-[var(--muted)]'
                  : 'border-white/20 text-white/70'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[var(--surface)]/98 backdrop-blur-xl border-t border-[var(--border)] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={(): void => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    isActive(link.path)
                      ? 'bg-[var(--foreground)] text-[var(--background)]'
                      : 'text-[var(--muted)] hover:bg-[var(--subtle)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {link.name}
                  {link.isNew && (
                    <span className="text-[9px] font-bold bg-[var(--foreground)] text-[var(--background)] px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-4 px-4 py-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-[var(--border-dark)]">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={handleProfileImageError}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">{userName}</p>
                    <p className="text-xs text-[var(--muted)]">{userEmail}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogOut(); setIsOpen(false); }}
                  className="flex gap-3 items-center px-4 py-3 mt-2 w-full text-sm text-left text-red-500 rounded-xl transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
    </nav>
  );
};

export default NavBar;