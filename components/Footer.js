'use client';
import React from 'react';
import Link from 'next/link';
import { LogoTooth, IconLocation, IconMail, IconClock, IconGlobe, IconPhoneFilled, IconFacebook, IconInstagram, IconYoutube, IconTiktok, IconShieldCheck } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0a2a52';

export default function Footer() {
  const aboutLinks = [
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Đội ngũ bác sĩ', href: '/about' },
    { label: 'Cơ sở vật chất', href: '/destinations' },
    { label: 'Quy trình điều trị', href: '/about' },
    { label: 'Chính sách bảo hành', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Trồng răng Implant', href: '/products?category=trong-rang-implant' },
    { label: 'Niềng răng thẩm mỹ', href: '/products?category=nieng-rang-tham-my' },
    { label: 'Răng sứ thẩm mỹ', href: '/products?category=rang-su-tham-my' },
    { label: 'Tẩy trắng răng', href: '/products?category=tay-trang-rang' },
    { label: 'Điều trị tổng quát', href: '/products?category=dieu-tri-tong-quat' },
    { label: 'Nha khoa trẻ em', href: '/products?category=nha-khoa-tre-em' },
  ];

  const supportLinks = [
    { label: 'Câu hỏi thường gặp', href: '/blog' },
    { label: 'Hướng dẫn thanh toán', href: '/blog' },
    { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Điều khoản sử dụng', href: '#' },
  ];

  const socials = [
    { icon: <IconFacebook size={14} />, label: 'Facebook' },
    { icon: <IconInstagram size={14} />, label: 'Instagram' },
    { icon: <IconYoutube size={14} />, label: 'Youtube' },
    { icon: <IconTiktok size={13} />, label: 'Tiktok' },
  ];

  const linkStyle = { fontSize: 12.5, color: '#9db8d8', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' };
  const colTitleStyle = { fontSize: 12.5, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 };

  const hoverIn = (e) => { e.currentTarget.style.color = '#fff'; };
  const hoverOut = (e) => { e.currentTarget.style.color = '#9db8d8'; };

  return (
    <>
      <footer style={{ backgroundColor: NAVY, color: '#c6d7ec', fontFamily: 'Inter, sans-serif', paddingTop: 52, paddingBottom: 20 }}>
        <div className="container mx-auto px-4">
          <div className="dk-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr 1fr 1.1fr 1.25fr', gap: 34, marginBottom: 38 }}>

            {/* Column 1: Brand */}
            <div>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                <LogoTooth size={44} color="#fff" />
                <div style={{ lineHeight: 1 }}>
                  <span style={{ display: 'block', fontSize: 10.5, fontWeight: 800, letterSpacing: '0.14em', color: '#fff' }}>NHA KHOA</span>
                  <span style={{ display: 'block', fontSize: 23, fontWeight: 900, letterSpacing: '0.02em', color: '#fff', marginTop: 1 }}>SMILE</span>
                </div>
              </Link>
              <p style={{ fontSize: 12.5, lineHeight: 1.75, color: '#9db8d8', fontWeight: 500, marginBottom: 18, maxWidth: 240 }}>
                Nha Khoa Smile - Đồng hành cùng bạn trên hành trình kiến tạo nụ cười
                khỏe đẹp và cuộc sống hạnh phúc.
              </p>
              <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={s.label}
                    style={{ width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BLUE; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 12px', fontSize: 9.5, fontWeight: 800, color: '#bfd4ec', letterSpacing: '0.05em' }}>
                <IconShieldCheck size={16} style={{ color: '#6fb2f5' }} />
                ĐÃ THÔNG BÁO<br />BỘ CÔNG THƯƠNG
              </div>
            </div>

            {/* Column 2: Về chúng tôi */}
            <div>
              <h3 style={colTitleStyle}>VỀ CHÚNG TÔI</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {aboutLinks.map((l, i) => (
                  <li key={i}>
                    <Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Dịch vụ */}
            <div>
              <h3 style={colTitleStyle}>DỊCH VỤ</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {serviceLinks.map((l, i) => (
                  <li key={i}>
                    <Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Hỗ trợ khách hàng */}
            <div>
              <h3 style={colTitleStyle}>HỖ TRỢ KHÁCH HÀNG</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {supportLinks.map((l, i) => (
                  <li key={i}>
                    <Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Thông tin liên hệ */}
            <div>
              <h3 style={colTitleStyle}>THÔNG TIN LIÊN HỆ</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 12.5, fontWeight: 500, color: '#9db8d8' }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <IconLocation size={16} style={{ flexShrink: 0, marginTop: 1, color: '#6fb2f5' }} />
                  <span>123 Đường Nguyễn Văn Cừ,<br />Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <IconPhoneFilled size={15} style={{ flexShrink: 0, color: '#6fb2f5' }} />
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 13.5 }}>1900 1234</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <IconMail size={16} style={{ flexShrink: 0, color: '#6fb2f5' }} />
                  <span>info@nhakhoasmile.vn</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <IconGlobe size={16} style={{ flexShrink: 0, color: '#6fb2f5' }} />
                  <span>www.nhakhoasmile.vn</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <IconClock size={16} style={{ flexShrink: 0, color: '#6fb2f5' }} />
                  <span>8:00 - 20:00 (Tất cả các ngày)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 11.5, color: '#7d9cc4', fontWeight: 500 }}>
            <div>© 2024 <strong style={{ color: '#bfd4ec' }}>Nha Khoa Smile</strong>. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>VISA</span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>MasterCard</span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>MoMo</span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>Trả góp 0%</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating hotline button */}
      <a
        href="tel:19001234"
        className="dk-hotline-float"
        style={{ position: 'fixed', bottom: 22, right: 22, zIndex: 90, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 999, padding: '7px 18px 7px 7px', boxShadow: '0 10px 30px rgba(12,48,97,0.35)', textDecoration: 'none', border: '1px solid #e3eef9' }}
      >
        <span style={{ width: 42, height: 42, borderRadius: 999, background: `linear-gradient(135deg, ${BLUE}, ${NAVY})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'dkRing 1.6s ease-in-out infinite' }}>
          <IconPhoneFilled size={19} />
        </span>
        <span>
          <span style={{ display: 'block', fontSize: 14.5, fontWeight: 900, color: NAVY, lineHeight: 1.1 }}>1900 1234</span>
          <span style={{ display: 'block', fontSize: 10, fontWeight: 600, color: '#7b8a9c', marginTop: 1 }}>Tư vấn miễn phí</span>
        </span>
      </a>

      <style>{`
        @keyframes dkRing {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-14deg); }
          20% { transform: rotate(12deg); }
          30% { transform: rotate(-10deg); }
          40% { transform: rotate(8deg); }
          50% { transform: rotate(0deg); }
        }
        @media (max-width: 1024px) {
          .dk-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .dk-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
