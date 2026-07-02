'use client';
import React from 'react';
import Link from 'next/link';
import { LogoTooth, IconMedal, IconUsers, IconStarOutline } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0c3061';

export default function AboutSection() {
  const stats = [
    { icon: <IconMedal size={24} />, value: '15+', label: 'Năm kinh nghiệm' },
    { icon: <IconUsers size={24} />, value: '10.000+', label: 'Khách hàng tin tưởng' },
    { icon: <IconStarOutline size={24} />, value: '98%', label: 'Hài lòng & giới thiệu' },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        <div className="dk-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 52, alignItems: 'center' }}>

          {/* Left: Text content */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 26, height: 2, backgroundColor: BLUE, borderRadius: 999 }} />
              VỀ NHA KHOA SMILE
            </div>
            <h2 className="dk-about-title" style={{ fontSize: 33, fontWeight: 900, color: NAVY, textTransform: 'uppercase', lineHeight: 1.22, letterSpacing: '-0.3px', marginBottom: 18 }}>
              TỎA SÁNG NỤ CƯỜI<br />NÂNG TẦM CUỘC SỐNG
            </h2>
            <p style={{ fontSize: 14, color: '#5b6b7d', lineHeight: 1.85, fontWeight: 500, marginBottom: 28, maxWidth: 440 }}>
              Với sứ mệnh mang đến nụ cười khỏe đẹp và sự hài lòng tuyệt đối,
              Nha Khoa Smile không ngừng nâng cao chất lượng dịch vụ,
              ứng dụng công nghệ hiện đại và xây dựng đội ngũ bác sĩ
              chuyên môn cao.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', marginBottom: 30 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: BLUE, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 21, fontWeight: 900, color: NAVY, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: '#7b8a9c', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              style={{ display: 'inline-block', backgroundColor: NAVY, color: '#fff', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '14px 30px', borderRadius: 9, textDecoration: 'none', boxShadow: '0 6px 18px rgba(12,48,97,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BLUE; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = NAVY; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              TÌM HIỂU THÊM
            </Link>
          </div>

          {/* Right: Image collage with center badge */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gridTemplateRows: '175px 175px', gap: 12 }}>
              <img
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=800&q=80"
                alt="Không gian Nha Khoa Smile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'; }}
              />
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80"
                alt="Bác sĩ Nha Khoa Smile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'; }}
              />
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80"
                alt="Trang thiết bị hiện đại"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'; }}
              />
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80"
                alt="Điều trị nha khoa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'; }}
              />
            </div>

            {/* Center badge */}
            <div style={{ position: 'absolute', top: '50%', left: '42%', transform: 'translate(-50%, -50%)', backgroundColor: NAVY, color: '#fff', borderRadius: 14, padding: '20px 22px', textAlign: 'center', boxShadow: '0 14px 32px rgba(12,48,97,0.4)', border: '4px solid #fff', maxWidth: 185 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <LogoTooth size={34} color="#fff" />
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                CAM KẾT<br />NỤ CƯỜI HOÀN HẢO<br />CHO BẠN
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dk-about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .dk-about-title { font-size: 25px !important; }
        }
      `}</style>
    </section>
  );
}
