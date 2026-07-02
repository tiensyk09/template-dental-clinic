'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SectionOrnament } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0c3061';

export default function ServicesSection() {
  const fallbackServices = [
    {
      id: 1,
      name: 'Trồng răng Implant',
      description: 'Giải pháp phục hình răng mất tiên tiến, bền chắc như răng thật',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      slug: 'trong-rang-implant',
    },
    {
      id: 2,
      name: 'Niềng răng thẩm mỹ',
      description: 'Răng đều đẹp, nụ cười tự tin với các phương pháp niềng hiện đại',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
      slug: 'nieng-rang-tham-my',
    },
    {
      id: 3,
      name: 'Răng sứ thẩm mỹ',
      description: 'Khắc phục răng xấu, ố vàng, mang lại nụ cười hoàn hảo',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
      slug: 'rang-su-tham-my',
    },
    {
      id: 4,
      name: 'Tẩy trắng răng',
      description: 'Răng trắng sáng tự nhiên, an toàn, không ê buốt',
      image: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80',
      slug: 'tay-trang-rang',
    },
    {
      id: 5,
      name: 'Điều trị tổng quát',
      description: 'Khám, điều trị các bệnh lý răng miệng chuyên sâu',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      slug: 'dieu-tri-tong-quat',
    },
    {
      id: 6,
      name: 'Nha khoa trẻ em',
      description: 'Chăm sóc răng miệng toàn diện cho bé, nhẹ nhàng, an toàn',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80',
      slug: 'nha-khoa-tre-em',
    },
  ];

  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    fetch('/api/products?limit=6')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setServices(
            data.products.map((p) => ({
              id: p.id,
              name: p.name,
              description: p.short_description,
              image: p.thumbnail,
              slug: p.slug,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="featured-services" className="py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 style={{ color: NAVY, letterSpacing: '0.01em' }} className="text-2xl md:text-3xl font-black uppercase">
            DỊCH VỤ NHA KHOA NỔI BẬT
          </h2>
          <SectionOrnament color={BLUE} />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <Link href={`/products/${svc.slug}`} className="block relative overflow-hidden bg-gray-50" style={{ height: 128 }}>
                <img
                  src={svc.image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'}
                  alt={svc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </Link>

              <div className="p-3 flex-1 flex flex-col">
                <Link href={`/products/${svc.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ color: NAVY, fontSize: 11.5, letterSpacing: '0.02em' }} className="font-extrabold uppercase leading-snug hover:opacity-80 transition-all mb-1.5">
                    {svc.name}
                  </h3>
                </Link>
                <p style={{ fontSize: 10.5, color: '#7b8a9c' }} className="font-medium leading-snug line-clamp-2 mb-2">
                  {svc.description}
                </p>
                <Link
                  href={`/products/${svc.slug}`}
                  style={{ color: BLUE, fontSize: 10.5, textDecoration: 'none' }}
                  className="font-bold flex items-center gap-1 mt-auto pt-2 border-t border-gray-50"
                >
                  Xem chi tiết
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 H20 M14 6 L20 12 L14 18" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
