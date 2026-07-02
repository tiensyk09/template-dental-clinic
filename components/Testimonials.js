'use client';
import React from 'react';
import { IconStar, IconTooth } from '@/components/icons';

const NAVY = '#0c3061';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Tôi rất hài lòng với dịch vụ trồng răng Implant tại Nha Khoa Smile. Bác sĩ tư vấn tận tình, quy trình nhẹ nhàng, không đau. Răng ăn nhai rất tốt!',
      name: 'Nguyễn Văn Nam',
      role: 'Khách hàng Implant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: 'Niềng răng ở đây rất uy tín, bác sĩ theo sát quá trình, nhân viên thân thiện. Sau 18 tháng, răng tôi đều đẹp như mong muốn.',
      name: 'Trần Thị Mai',
      role: 'Khách hàng niềng răng',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: 'Dịch vụ tẩy trắng răng tuyệt vời, răng trắng sáng tự nhiên mà không ê buốt. Sẽ giới thiệu bạn bè đến Nha Khoa Smile.',
      name: 'Lê Minh Hoàng',
      role: 'Khách hàng tẩy trắng răng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section className="py-12" style={{ background: `linear-gradient(135deg, #10396f, ${NAVY} 55%, #092648)` }}>
      <div className="container mx-auto px-4" style={{ position: 'relative' }}>
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase" style={{ color: '#fff', letterSpacing: '0.01em' }}>
            KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI?
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12, color: '#fff' }}>
            <span style={{ width: 44, height: 2, backgroundColor: '#fff', opacity: 0.4, borderRadius: 999 }} />
            <IconTooth size={18} />
            <span style={{ width: 44, height: 2, backgroundColor: '#fff', opacity: 0.4, borderRadius: 999 }} />
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: '#fff', borderRadius: 14, padding: '26px 24px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 28px rgba(0,0,0,0.18)' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, color: '#f5a623', marginBottom: 14 }}>
                {[...Array(5)].map((_, i) => <IconStar key={i} size={15} />)}
              </div>

              {/* Quote */}
              <p style={{ fontSize: 13, color: '#4b5b6d', lineHeight: 1.75, fontWeight: 500, fontStyle: 'italic', flex: 1, marginBottom: 18 }}>
                “{t.quote}”
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #eef2f7', paddingTop: 14 }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: 42, height: 42, borderRadius: 999, objectFit: 'cover', border: '2px solid #d6e7f7' }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#8a99ab', fontWeight: 500, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows trang trí hai bên như demo */}
        <div className="dk-testi-arrow" style={{ position: 'absolute', left: -8, top: '56%', width: 38, height: 38, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.14)', color: '#fff', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</div>
        <div className="dk-testi-arrow" style={{ position: 'absolute', right: -8, top: '56%', width: 38, height: 38, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.14)', color: '#fff', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dk-testi-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
