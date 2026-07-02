'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoTooth, IconLocation, IconMail, IconClock, IconFacebook, IconInstagram, IconYoutube, IconTiktok, IconCalendar } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0c3061';

export default function Header() {
  const pathname = usePathname();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to check auth state in header:', err);
      }
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/login', { method: 'DELETE' });
      if (res.ok) {
        setUser(null);
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const services = [
    { title: 'Trồng răng Implant', link: '/products?category=trong-rang-implant' },
    { title: 'Niềng răng thẩm mỹ', link: '/products?category=nieng-rang-tham-my' },
    { title: 'Răng sứ thẩm mỹ', link: '/products?category=rang-su-tham-my' },
    { title: 'Tẩy trắng răng', link: '/products?category=tay-trang-rang' },
    { title: 'Điều trị tổng quát', link: '/products?category=dieu-tri-tong-quat' },
    { title: 'Nha khoa trẻ em', link: '/products?category=nha-khoa-tre-em' },
  ];

  const navItems = [
    { href: '/', label: 'TRANG CHỦ' },
    { href: '/about', label: 'GIỚI THIỆU' },
    { href: '/products', label: 'DỊCH VỤ', hasDropdown: true },
    { href: '/products', label: 'BẢNG GIÁ' },
    { href: '/blog', label: 'TIN TỨC' },
    { href: '/blog', label: 'ƯU ĐÃI' },
    { href: '/contact', label: 'LIÊN HỆ' },
  ];

  // Chỉ đánh dấu active cho mục đầu tiên khớp với pathname
  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
  );

  const socials = [
    { icon: <IconFacebook size={13} />, label: 'Facebook' },
    { icon: <IconInstagram size={13} />, label: 'Instagram' },
    { icon: <IconYoutube size={13} />, label: 'Youtube' },
    { icon: <IconTiktok size={12} />, label: 'Tiktok' },
  ];

  return (
    <header style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* 1. TOP BAR */}
      <div className="dk-top-bar" style={{ backgroundColor: NAVY, color: '#e3edf8', fontSize: 12, padding: '8px 16px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconLocation size={14} /> 123 Đường Nguyễn Văn Cừ, Q.1, TP. Hồ Chí Minh
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconMail size={14} /> info@nhakhoasmile.vn
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconClock size={14} /> 8:00 - 20:00 (Tất cả các ngày)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href="#"
                aria-label={s.label}
                style={{ width: 24, height: 24, borderRadius: 999, border: '1px solid rgba(255,255,255,0.4)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = NAVY; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER — Logo + Nav + CTA */}
      <div style={{ backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px rgba(12,48,97,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '10px 16px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <LogoTooth size={46} color={BLUE} />
            <div>
              <div className="dk-logo-text" style={{ lineHeight: 1 }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: NAVY }}>NHA KHOA</span>
                <span style={{ display: 'block', fontSize: 24, fontWeight: 900, letterSpacing: '0.02em', color: BLUE, marginTop: 1 }}>SMILE</span>
              </div>
              <div className="dk-logo-subtext" style={{ fontSize: 8.5, color: '#8aa4c2', letterSpacing: '0.06em', marginTop: 2, fontWeight: 600, fontStyle: 'italic' }}>
                Tỏa sáng nụ cười Việt
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="dk-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {navItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => item.hasDropdown && setIsServiceOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsServiceOpen(false)}
                >
                  <Link
                    href={item.href}
                    style={{ position: 'relative', fontSize: 12.5, fontWeight: isActive ? 800 : 700, letterSpacing: '0.03em', color: isActive ? BLUE : '#2b3a4e', textDecoration: 'none', padding: '20px 0', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = BLUE; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? BLUE : '#2b3a4e'; }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                    {isActive && (
                      <span style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: 22, height: 3, borderRadius: 999, backgroundColor: BLUE }} />
                    )}
                  </Link>

                  {item.hasDropdown && isServiceOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 240, backgroundColor: '#fff', border: '1px solid #e8eef6', borderRadius: 12, boxShadow: '0 16px 36px rgba(12,48,97,0.16)', zIndex: 100, overflow: 'hidden', animation: 'fadeInDown 0.15s ease-out' }}>
                      {services.map((svc, i) => (
                        <Link
                          key={i}
                          href={svc.link}
                          onClick={() => setIsServiceOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13, fontWeight: 600, color: '#374151', borderBottom: i < services.length - 1 ? '1px solid #f3f7fb' : 'none', textDecoration: 'none', transition: 'background 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eef5fc'; e.currentTarget.style.color = BLUE; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#374151'; }}
                        >
                          <span style={{ width: 5, height: 5, borderRadius: 999, backgroundColor: BLUE, flexShrink: 0 }} />
                          <span>{svc.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link
              href="/contact"
              className="dk-cta-btn"
              style={{ backgroundColor: NAVY, color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '13px 24px', borderRadius: 9, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(12,48,97,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BLUE; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = NAVY; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <IconCalendar size={15} /> ĐẶT LỊCH HẸN
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="dk-mobile-menu-toggle"
              aria-label="Menu"
              style={{ display: 'none', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 18, color: NAVY }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f3f4f6', padding: 16, boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#1f2937', borderBottom: '1px solid #f3f4f6', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6', fontSize: 14 }}>
                  <div style={{ fontWeight: 600, color: '#1f2937' }}>Chào, {user.displayName || user.username}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} style={{ color: BLUE, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lịch hẹn của bạn</Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', padding: 0, color: '#dc2626', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Đăng xuất</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#1f2937', borderBottom: '1px solid #f3f4f6', textDecoration: 'none' }}>
                  Đăng nhập
                </Link>
              )}

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: NAVY, textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.06em' }}>
                  Dịch vụ nha khoa
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {services.map((svc, idx) => (
                    <Link
                      key={idx}
                      href={svc.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ fontSize: 13, color: '#4b5563', textDecoration: 'none', padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: 999, backgroundColor: BLUE, flexShrink: 0 }} />
                      <span>{svc.title}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'block', textAlign: 'center', marginTop: 16, backgroundColor: NAVY, color: '#fff', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', padding: '12px 20px', borderRadius: 9, textDecoration: 'none' }}
                >
                  Đặt lịch hẹn ngay
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 1024px) {
          .dk-top-bar { display: none !important; }
          .dk-desktop-nav { display: none !important; }
          .dk-mobile-menu-toggle { display: block !important; }
          .dk-cta-btn { padding: 10px 14px !important; font-size: 11px !important; }
        }
      `}</style>
    </header>
  );
}
