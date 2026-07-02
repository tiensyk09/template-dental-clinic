'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SectionOrnament, IconTooth } from '@/components/icons';

const BLUE = '#1a6fc4';
const NAVY = '#0c3061';

export default function NewsSection() {
  const fallbackPosts = [
    {
      id: 1,
      title: '5 thói quen giúp răng luôn trắng sáng mỗi ngày',
      date: '20/05/2024',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      slug: '5-thoi-quen-giup-rang-trang-sang',
    },
    {
      id: 2,
      title: 'Niềng răng trong suốt Invisalign có tốt không?',
      date: '15/05/2024',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
      slug: 'nieng-rang-trong-suot-invisalign-co-tot-khong',
    },
    {
      id: 3,
      title: 'Trồng răng Implant có đau không?',
      date: '10/05/2024',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      slug: 'trong-rang-implant-co-dau-khong',
    },
  ];

  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    fetch('/api/posts?status=published&limit=3')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(
            data.posts.map((p) => ({
              id: p.id,
              title: p.title,
              date: p.created_at ? new Date(p.created_at).toLocaleDateString('vi-VN') : 'Mới nhất',
              image: p.image,
              slug: p.slug,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const currentMonth = new Date().getMonth() + 1;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: 34 }}>
          <h2 style={{ color: NAVY, letterSpacing: '0.01em' }} className="text-2xl md:text-3xl font-black uppercase">
            TIN TỨC & ƯU ĐÃI
          </h2>
          <SectionOrnament color={BLUE} />
          <Link href="/blog" className="dk-news-viewall" style={{ position: 'absolute', right: 0, top: 8, color: BLUE, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            Xem tất cả
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 H20 M14 6 L20 12 L14 18" /></svg>
          </Link>
        </div>

        {/* News grid: 3 posts + 1 promo card */}
        <div className="dk-news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 20 }}>
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <Link href={`/posts/${post.slug}`} className="relative block overflow-hidden bg-gray-100" style={{ height: 150 }}>
                <img
                  src={post.image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </Link>

              <div className="p-4 flex-1 flex flex-col">
                <div style={{ fontSize: 11, color: '#8a99ab', fontWeight: 600, marginBottom: 6 }}>{post.date}</div>
                <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ color: NAVY, fontSize: 14.5 }} className="font-extrabold line-clamp-2 leading-snug transition-colors mb-3">
                    {post.title}
                  </h3>
                </Link>
                <Link
                  href={`/posts/${post.slug}`}
                  style={{ color: BLUE, fontSize: 11.5, textDecoration: 'none' }}
                  className="font-bold flex items-center gap-1 mt-auto pt-2"
                >
                  Xem chi tiết
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 H20 M14 6 L20 12 L14 18" /></svg>
                </Link>
              </div>
            </div>
          ))}

          {/* Promo card */}
          <div style={{ background: `linear-gradient(155deg, ${BLUE} 0%, ${NAVY} 70%)`, borderRadius: 14, padding: '24px 22px', color: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '0 14px 30px rgba(12,48,97,0.3)', position: 'relative', overflow: 'hidden' }}>
            {/* Ảnh implant trang trí góc phải dưới */}
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80"
              alt="Ưu đãi dịch vụ nha khoa"
              style={{ position: 'absolute', right: -16, bottom: -16, width: 130, height: 150, objectFit: 'cover', borderRadius: 14, opacity: 0.85, border: '3px solid rgba(255,255,255,0.35)' }}
            />
            <div style={{ position: 'absolute', right: 6, top: 6, opacity: 0.15 }}>
              <IconTooth size={60} style={{ color: '#fff' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>
                ƯU ĐÃI THÁNG {String(currentMonth).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.92 }}>Giảm đến</div>
              <div style={{ fontSize: 58, fontWeight: 900, lineHeight: 1, margin: '4px 0 10px', textShadow: '0 4px 14px rgba(0,0,0,0.25)' }}>30%</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.92, marginBottom: 22, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CHO CÁC DỊCH VỤ</div>
              <Link
                href="/contact"
                style={{ display: 'inline-block', backgroundColor: '#fff', color: NAVY, fontWeight: 800, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '11px 22px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
              >
                XEM NGAY
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dk-news-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .dk-news-viewall { position: static !important; display: inline-flex; margin-top: 10px; }
        }
        @media (max-width: 640px) {
          .dk-news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
