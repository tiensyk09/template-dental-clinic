'use client';
import React from 'react';
import Link from 'next/link';

const BLUE = '#1a6fc4';
const NAVY = '#0d3b7a';

export default function DestinationsPage() {
  const clinics = [
    {
      id: 1,
      title: 'Nha Khoa Smile - Cơ Sở Quận 1',
      location: '123 Đường Nguyễn Văn Cừ, Q.1, TP. Hồ Chí Minh',
      hours: 'Giờ làm việc: 8:00 - 20:00 (Tất cả các ngày)',
      description: 'Cơ sở trung tâm với 12 ghế nha hiện đại, phòng phẫu thuật Implant vô trùng chuẩn quốc tế, hệ thống chụp phim CT Cone Beam 3D và labo răng sứ CAD/CAM ngay tại chỗ.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      badge: 'Cơ Sở Trung Tâm'
    },
    {
      id: 2,
      title: 'Nha Khoa Smile - Cơ Sở Quận 7',
      location: '456 Nguyễn Thị Thập, Q.7, TP. Hồ Chí Minh',
      hours: 'Giờ làm việc: 8:00 - 20:00 (Tất cả các ngày)',
      description: 'Không gian sang trọng, khu vực nha khoa trẻ em riêng biệt với thiết kế thân thiện, đội ngũ bác sĩ chuyên sâu chỉnh nha và điều trị tổng quát cho cả gia đình.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      badge: 'Nha Khoa Gia Đình'
    },
    {
      id: 3,
      title: 'Nha Khoa Smile - Cơ Sở Hà Nội',
      location: '789 Xã Đàn, Đống Đa, Hà Nội',
      hours: 'Giờ làm việc: 8:00 - 20:00 (Tất cả các ngày)',
      description: 'Cơ sở miền Bắc quy mô 3 tầng, trung tâm Implant và răng sứ thẩm mỹ công nghệ cao, quy trình vô trùng khép kín và phòng điều trị riêng tư cho từng khách hàng.',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80',
      badge: 'Trung Tâm Implant'
    },
    {
      id: 4,
      title: 'Nha Khoa Smile - Cơ Sở Đà Nẵng',
      location: '101 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
      hours: 'Giờ làm việc: 8:00 - 20:00 (Tất cả các ngày)',
      description: 'Điểm đến chăm sóc nụ cười tại miền Trung với đầy đủ dịch vụ: niềng răng trong suốt, tẩy trắng răng công nghệ Laser và gói chăm sóc răng miệng định kỳ.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      badge: 'Chi Nhánh Miền Trung'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f7fafd', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
          <Link href="/" style={{ color: '#374151', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: BLUE, fontWeight: 600 }}>Hệ thống phòng khám</span>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: NAVY, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Hệ Thống Phòng Khám Nha Khoa Smile
          </h1>
          <p style={{ color: '#4b5563', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Chuỗi phòng khám nha khoa chuẩn quốc tế trên toàn quốc. Mọi cơ sở đều đồng bộ về trang thiết bị, quy trình vô trùng và chất lượng dịch vụ.
          </p>
        </div>

        {/* Clinics List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {clinics.map((clinic, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={clinic.id}
                style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  gap: '40px',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 20px rgba(13,59,122,0.04)',
                  flexWrap: 'wrap'
                }}
                className="dest-card"
              >
                {/* Image */}
                <div style={{ flex: '1 1 450px', height: '320px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={clinic.image}
                    alt={clinic.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: NAVY, color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {clinic.badge}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '13px', color: BLUE, fontWeight: 700 }}>
                      📍 {clinic.location}
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: NAVY, margin: 0 }}>
                      {clinic.title}
                    </h2>
                    <span style={{ fontSize: '13px', color: '#0e7490', fontWeight: 600 }}>
                      🕗 {clinic.hours}
                    </span>
                  </div>
                  <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                    {clinic.description}
                  </p>
                  <div>
                    <Link
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#eaf3fb',
                        color: BLUE,
                        padding: '10px 20px',
                        borderRadius: '30px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = BLUE; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#eaf3fb'; e.currentTarget.style.color = BLUE; }}
                    >
                      Đặt lịch hẹn tại cơ sở này ➔
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '60px',
          background: `linear-gradient(135deg, ${BLUE} 0%, #0a2c56 100%)`,
          borderRadius: '24px',
          padding: '48px',
          textAlign: 'center',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(13, 59, 122, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '140px', opacity: 0.08, pointerEvents: 'none' }}>
            🦷
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>Bạn Cần Tư Vấn Trực Tiếp?</h3>
          <p style={{ fontSize: '15px', color: '#d6e9fa', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Đội ngũ bác sĩ Nha Khoa Smile sẵn sàng thăm khám và tư vấn miễn phí. Gọi ngay hotline hoặc đặt lịch hẹn để được phục vụ chu đáo nhất.
          </p>
          <a
            href="tel:19001234"
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: NAVY,
              padding: '14px 36px',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            Hotline: 1900 1234
          </a>
        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 992px) {
          .dest-card {
            flex-direction: column !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
