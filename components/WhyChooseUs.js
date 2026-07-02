'use client';
import React from 'react';
import { SectionOrnament, IconDoctor, IconGear, IconClipboardCheck, IconDollarCircle, IconHeartCare } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0c3061';

export default function WhyChooseUs() {
  const reasons = [
    { icon: <IconDoctor size={30} />, title: 'ĐỘI NGŨ CHUYÊN GIA', desc: 'Bác sĩ giỏi, giàu kinh nghiệm, tận tâm' },
    { icon: <IconGear size={30} />, title: 'CÔNG NGHỆ HIỆN ĐẠI', desc: 'Trang thiết bị tiên tiến, đạt chuẩn quốc tế' },
    { icon: <IconClipboardCheck size={30} />, title: 'QUY TRÌNH CHUẨN Y KHOA', desc: 'An toàn, vô trùng, đảm bảo hiệu quả' },
    { icon: <IconDollarCircle size={30} />, title: 'CHI PHÍ HỢP LÝ', desc: 'Minh bạch, rõ ràng, không phát sinh' },
    { icon: <IconHeartCare size={30} />, title: 'CHĂM SÓC TẬN TÂM', desc: 'Đồng hành cùng khách hàng trước, trong và sau điều trị' },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#f7fafd' }}>
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 style={{ color: NAVY, letterSpacing: '0.01em' }} className="text-2xl md:text-3xl font-black uppercase">
            VÌ SAO CHỌN NHA KHOA SMILE?
          </h2>
          <SectionOrnament color={BLUE} />
        </div>

        {/* Reasons Grid */}
        <div className="dk-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 16 }}>
          {reasons.map((r, idx) => (
            <div
              key={idx}
              style={{ border: '1px solid #e8eef6', borderRadius: 14, padding: '28px 18px', textAlign: 'center', transition: 'all 0.25s', backgroundColor: '#fff', cursor: 'default' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 30px rgba(12,48,97,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#c8ddf2'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e8eef6'; }}
            >
              <div style={{ color: NAVY, display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                {r.icon}
              </div>
              <h3 style={{ fontSize: 12, fontWeight: 800, color: NAVY, textTransform: 'uppercase', marginBottom: 9, lineHeight: 1.45, letterSpacing: '0.02em' }}>{r.title}</h3>
              <p style={{ fontSize: 11, color: '#7b8a9c', fontWeight: 500, lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dk-why-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .dk-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
}
