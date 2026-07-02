'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IconTooth, IconDoctor, IconClipboardCheck, IconGear, IconShieldTooth, IconClock, IconDollarCircle, IconBadgeCheck, IconPhoneFilled, IconToothSparkle } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0c3061';

export default function HeroBanner() {
  const slides = [
    {
      title: 'NỤ CƯỜI TỰ TIN',
      cursive: 'Cuộc sống thăng hoa',
      desc: <>Nha Khoa Smile - Đồng hành cùng<br />bạn kiến tạo nụ cười hoàn hảo</>,
      bullets: [
        { icon: <IconDoctor size={15} />, text: 'Bác sĩ chuyên môn cao' },
        { icon: <IconClipboardCheck size={15} />, text: 'Quy trình chuẩn Quốc tế' },
        { icon: <IconGear size={15} />, text: 'Trang thiết bị hiện đại' },
      ],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'RĂNG SỨ THẨM MỸ',
      cursive: 'Đẹp tự nhiên như thật',
      desc: <>Công nghệ CAD/CAM 3D chính xác<br />tuyệt đối, bảo hành dài hạn</>,
      bullets: [
        { icon: <IconBadgeCheck size={15} />, text: 'Sứ cao cấp chính hãng' },
        { icon: <IconClipboardCheck size={15} />, text: 'Thiết kế nụ cười DSD' },
        { icon: <IconClock size={15} />, text: 'Hoàn thiện sau 2 buổi' },
      ],
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'TRỒNG RĂNG IMPLANT',
      cursive: 'Ăn nhai như răng thật',
      desc: <>Phục hình răng mất với trụ Implant<br />chính hãng Hàn Quốc, Thụy Sĩ</>,
      bullets: [
        { icon: <IconShieldTooth size={15} />, text: 'Không đau, lành nhanh' },
        { icon: <IconBadgeCheck size={15} />, text: 'Trụ Implant chính hãng' },
        { icon: <IconClock size={15} />, text: 'Bảo hành đến 20 năm' },
      ],
      image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const sellingPoints = [
    { icon: <IconTooth size={34} />, title: <>ĐỘI NGŨ BÁC SĨ<br />GIÀU KINH NGHIỆM</>, desc: '100% bác sĩ chuyên khoa, tận tâm với nghề' },
    { icon: <IconGear size={34} />, title: <>CÔNG NGHỆ<br />HIỆN ĐẠI</>, desc: 'Trang thiết bị tiên tiến, đạt chuẩn quốc tế' },
    { icon: <IconShieldTooth size={34} />, title: <>AN TOÀN<br />TUYỆT ĐỐI</>, desc: 'Quy trình vô trùng chuẩn Bộ Y tế' },
    { icon: <IconClock size={34} />, title: <>ĐIỀU TRỊ NHANH<br />CHÓNG, KHÔNG ĐAU</>, desc: 'Công nghệ giảm đau tiên tiến' },
    { icon: <IconDollarCircle size={34} />, title: <>CHI PHÍ HỢP LÝ<br />MINH BẠCH</>, desc: 'Bảng giá công khai, không phát sinh' },
    { icon: <IconBadgeCheck size={34} />, title: <>BẢO HÀNH<br />RÕ RÀNG</>, desc: 'Chính sách bảo hành dài hạn, uy tín' },
  ];

  return (
    <div className="w-full">
      {/* HERO SLIDER */}
      <div style={{ position: 'relative', background: 'linear-gradient(100deg, #e9f3fc 0%, #d3e7f8 40%, #aed1ef 100%)', overflow: 'hidden', minHeight: 500 }}>

        {/* Ảnh nền bên phải, hòa dần vào nền xanh */}
        <div key={`img-${current}`} className="dk-hero-photo" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '58%', animation: 'dkFadeIn 0.7s ease-out' }}>
          <img
            src={slide.image}
            alt={slide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #d3e7f8 0%, rgba(211,231,248,0.55) 22%, rgba(211,231,248,0) 55%)' }} />
        </div>

        {/* Watermark răng góc phải */}
        <div className="dk-hero-watermark" style={{ position: 'absolute', top: 28, right: 60, color: 'rgba(255,255,255,0.55)', zIndex: 3 }}>
          <div style={{ width: 74, height: 74, borderRadius: 999, border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
            <IconTooth size={38} strokeWidth={1.4} />
          </div>
        </div>

        <div className="dk-hero-inner" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '64px 64px 76px', minHeight: 500, display: 'flex', alignItems: 'center', zIndex: 4 }}>
          {/* Text content */}
          <div key={current} style={{ maxWidth: 470 }}>
            <h1 className="dk-hero-title" style={{ fontSize: 48, fontWeight: 900, color: NAVY, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.08, marginBottom: 0, animation: 'dkSlideUp 0.5s ease-out' }}>
              {slide.title}
            </h1>
            <p className="dk-hero-cursive" style={{ fontFamily: "'Dancing Script', cursive", fontSize: 44, color: BLUE, fontWeight: 700, lineHeight: 1.15, margin: '2px 0 18px', animation: 'dkSlideUp 0.55s ease-out' }}>
              {slide.cursive}
            </p>
            <p style={{ fontSize: 16.5, color: '#2c4460', fontWeight: 600, lineHeight: 1.55, marginBottom: 22, animation: 'dkSlideUp 0.6s ease-out' }}>
              {slide.desc}
            </p>

            {/* Bullets: 2 cột + 1 dòng dưới */}
            <div className="dk-hero-bullets" style={{ display: 'flex', flexWrap: 'wrap', columnGap: 26, rowGap: 12, maxWidth: 430, marginBottom: 30, animation: 'dkSlideUp 0.65s ease-out' }}>
              {slide.bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, fontWeight: 600, color: '#22405f' }}>
                  <span style={{ width: 28, height: 28, borderRadius: 999, border: `1.5px solid ${'#7fa9d4'}`, color: NAVY, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: 'rgba(255,255,255,0.5)' }}>
                    {b.icon}
                  </span>
                  {b.text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', animation: 'dkSlideUp 0.7s ease-out' }}>
              <Link
                href="/contact"
                style={{ backgroundColor: NAVY, color: '#fff', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '15px 28px', borderRadius: 9, textDecoration: 'none', boxShadow: '0 8px 22px rgba(12,48,97,0.35)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = BLUE; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = NAVY; }}
              >
                ĐẶT LỊCH HẸN NGAY
              </Link>
              <a
                href="tel:19001234"
                style={{ backgroundColor: '#fff', color: NAVY, fontWeight: 800, fontSize: 14, padding: '12px 22px', borderRadius: 9, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, boxShadow: '0 4px 16px rgba(12,48,97,0.15)' }}
              >
                <span style={{ width: 26, height: 26, borderRadius: 999, backgroundColor: '#eaf3fb', color: BLUE, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconPhoneFilled size={14} />
                </span>
                1900 1234
              </a>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} aria-label="Slide trước" className="dk-hero-arrow" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: 999, border: 'none', backgroundColor: 'rgba(255,255,255,0.8)', color: NAVY, fontSize: 18, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(12,48,97,0.18)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={next} aria-label="Slide sau" className="dk-hero-arrow" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: 999, border: 'none', backgroundColor: 'rgba(255,255,255,0.8)', color: NAVY, fontSize: 18, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(12,48,97,0.18)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 999, border: 'none', backgroundColor: i === current ? NAVY : 'rgba(12,48,97,0.3)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }}
            />
          ))}
        </div>
      </div>

      {/* SELLING POINTS STRIP — 6 items */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eef2f7', padding: '26px 16px', boxShadow: '0 6px 18px rgba(12,48,97,0.05)', borderRadius: '0 0 18px 18px', position: 'relative', zIndex: 5, margin: '0 12px' }}>
        <div className="dk-usp-grid" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
          {sellingPoints.map((item, idx) => (
            <div key={idx} className="dk-usp-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '6px 14px', borderRight: idx < sellingPoints.length - 1 ? '1px solid #eef2f7' : 'none' }}>
              <div style={{ color: NAVY, marginBottom: 12 }}>{item.icon}</div>
              <h4 style={{ fontSize: 11.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', lineHeight: 1.4, marginBottom: 7, letterSpacing: '0.02em' }}>{item.title}</h4>
              <p style={{ fontSize: 10.5, color: '#7b8a9c', fontWeight: 500, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dkSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dkFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 1024px) {
          .dk-usp-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; row-gap: 20px; }
          .dk-usp-item { border-right: none !important; }
        }
        @media (max-width: 768px) {
          .dk-hero-photo {
            width: 100% !important;
            opacity: 0.28;
          }
          .dk-hero-inner {
            padding: 40px 22px 64px !important;
          }
          .dk-hero-title { font-size: 32px !important; }
          .dk-hero-cursive { font-size: 32px !important; }
          .dk-hero-arrow { display: none !important; }
          .dk-hero-watermark { display: none !important; }
          .dk-usp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
}
