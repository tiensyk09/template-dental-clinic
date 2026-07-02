'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function BlockRenderer({ blocks = [] }) {
  if (!Array.isArray(blocks)) return null;

  return (
    <div className="lc-sections-gap">
      {blocks
        .filter(b => b.visible !== false)
        .map(block => {
          switch (block.type) {
            case 'hero':
              return <HeroBlock key={block.id} configs={block.configs} />;
            case 'features':
              return <FeaturesBlock key={block.id} configs={block.configs} />;
            case 'flashsale':
              return <FlashSaleBlock key={block.id} configs={block.configs} />;
            case 'categories':
              return <CategoriesBlock key={block.id} configs={block.configs} />;
            case 'healthchecks':
              return <HealthChecksBlock key={block.id} configs={block.configs} />;
            case 'audiences':
              return <AudiencesBlock key={block.id} configs={block.configs} />;
            case 'posts':
              return <RecentPostsBlock key={block.id} configs={block.configs} />;
            case 'brands':
              return <BrandsBlock key={block.id} configs={block.configs} />;
            case 'html':
              return <HtmlBlock key={block.id} configs={block.configs} />;
            case 'products':
              return <ProductsBlock key={block.id} configs={block.configs} />;
            default:
              return null;
          }
        })}
    </div>
  );
}

// ─── 1. HERO BLOCK ───────────────────────────────────────────
function HeroBlock({ configs = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a6fc4 0%, #0c3061 100%)',
      color: '#ffffff',
      borderRadius: '16px',
      padding: '56px 32px',
      textAlign: 'center',
      marginBottom: '32px',
      boxShadow: '0 4px 24px rgba(12, 48, 97, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '130px', opacity: 0.08, pointerEvents: 'none' }}>
        🦷
      </div>
      <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
        {configs.title || 'Nha Khoa Smile'}
      </h2>
      <p style={{ fontSize: '16px', lineHeight: 1.7, opacity: 0.9, maxWidth: '750px', margin: '0 auto 28px', color: '#eaf3fb' }}>
        {configs.description || ''}
      </p>
      {configs.buttonText && configs.buttonLink && (
        <Link
          href={configs.buttonLink}
          style={{
            display: 'inline-block',
            background: '#1a6fc4',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'all 0.2s',
            boxShadow: '0 4px 14px rgba(26, 111, 196, 0.4)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(26, 111, 196, 0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26, 111, 196, 0.4)'; }}
        >
          {configs.buttonText}
        </Link>
      )}
    </div>
  );
}

// ─── 1.1 FEATURES BLOCK ───────────────────────────────────────────
function FeaturesBlock({ configs = {} }) {
  const items = configs.items || [];
  return (
    <div style={{ padding: '32px 0', marginBottom: '32px' }}>
      {configs.title && (
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          {configs.tag && (
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#1a6fc4', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
              {configs.tag}
            </span>
          )}
          <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0c3061' }}>{configs.title}</h3>
          {configs.description && (
            <p style={{ color: '#6b7280', fontSize: '14.5px', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>{configs.description}</p>
          )}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ background: '#eaf3fb', color: '#1a6fc4', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              {idx === 0 ? '🦷' : idx === 1 ? '✨' : '💖'}
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0c3061', margin: '0 0 8px 0' }}>{item.title}</h4>
              <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2. FLASH SALE BLOCK ─────────────────────────────────────
const FLASH_PRODUCTS = [
  {
    name: 'Trồng răng Implant trụ Hàn Quốc - Trọn gói',
    price: 20000000, salePrice: 15000000, discount: '-25%',
    sold: 12, total: 50, unit: 'Trụ',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
    flag: '🇰🇷',
    slug: 'trong-rang-implant',
  },
  {
    name: 'Niềng răng mắc cài kim loại tự động',
    price: 40000000, salePrice: 30000000, discount: '-25%',
    sold: 8, total: 30, unit: 'Gói',
    img: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=400&q=80',
    flag: '🇺🇸',
    slug: 'nieng-rang-tham-my',
  },
  {
    name: 'Bọc răng sứ thẩm mỹ Katana - Bảo hành 5 năm',
    price: 3500000, salePrice: 2500000, discount: '-28%',
    sold: 26, total: 100, unit: 'Răng',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
    flag: '🇩🇪',
    slug: 'rang-su-tham-my',
  },
  {
    name: 'Tẩy trắng răng công nghệ Laser Whitening',
    price: 2000000, salePrice: 1500000, discount: '-25%',
    sold: 45, total: 100, unit: 'Lần',
    img: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=400&q=80',
    flag: '🇺🇸',
    slug: 'tay-trang-rang',
  },
  {
    name: 'Gói khám và cạo vôi răng định kỳ',
    price: 800000, salePrice: 500000, discount: '-37%',
    sold: 68, total: 200, unit: 'Lần',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    flag: '🇻🇳',
    slug: 'dieu-tri-tong-quat',
  },
  {
    name: 'Gói chăm sóc răng miệng toàn diện cho bé',
    price: 500000, salePrice: 300000, discount: '-40%',
    sold: 52, total: 150, unit: 'Lần',
    img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=400&q=80',
    flag: '🇻🇳',
    slug: 'nha-khoa-tre-em',
  },
];

const SALE_TIMES = [
  { time: '08:00 - 22:00, 25/06', status: 'Đang diễn ra', active: true },
  { time: '08:00 - 22:00, 26/06', status: 'Sắp diễn ra', active: false },
  { time: '08:00 - 22:00, 27/06', status: 'Sắp diễn ra', active: false },
  { time: '08:00 - 22:00, 28/06', status: 'Sắp diễn ra', active: false },
];

function FlashSaleBlock({ configs = {} }) {
  const [timeLeft, setTimeLeft] = useState(configs.duration || 43200);
  const { addItem } = useCart();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const hrs = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const mins = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  const products = (configs.items && configs.items.length > 0) ? configs.items.map((item, i) => {
    const fallback = FLASH_PRODUCTS[i % FLASH_PRODUCTS.length];
    return {
      ...fallback,
      ...item,
      img: item.image || fallback.img,
      slug: item.slug || fallback.slug
    };
  }) : FLASH_PRODUCTS;

  const handleAddToCart = (item, idx) => {
    const productForCart = {
      id: item.id || `flashsale-${idx}`,
      name: item.name,
      price: item.salePrice || item.price,
      thumbnail: item.img || item.image,
      unit: item.unit || 'Hộp'
    };
    addItem(productForCart, null, 1);
  };

  return (
    <div className="lc-section-bg-white">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div className="lc-flashsale-wrap" style={{ margin: 0, borderRadius: '16px', overflow: 'hidden' }}>
          {/* Flash Sale Header */}
          <div className="lc-flashsale-header">
            <div className="lc-flashsale-title">
              <div className="lc-flashsale-badge">
                <span className="lightning">⚡</span>
                FLASHSALE GIÁ TỐT
              </div>
            </div>
            <div className="lc-flashsale-timer">
              <span>Kết thúc sau</span>
              <div className="lc-timer-box">{hrs}</div>
              <span className="lc-timer-sep">:</span>
              <div className="lc-timer-box">{mins}</div>
              <span className="lc-timer-sep">:</span>
              <div className="lc-timer-box">{secs}</div>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', marginLeft: '12px', background: 'var(--lc-orange)', padding: '6px 14px', borderRadius: '20px', fontWeight: 700 }}>
                XEM NGAY →
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="lc-flashsale-tabs">
            {SALE_TIMES.map((tab, i) => (
              <div key={i} className={`lc-flashsale-tab${tab.active ? ' active' : ''}`}>
                <div className="tab-time">{tab.time}</div>
                <div className="tab-status">{tab.status}</div>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="lc-product-grid">
            {products.map((item, idx) => {
              const soldPercent = Math.round(((item.sold || 0) / (item.total || 100)) * 100);
              const itemSlug = item.slug || 'vitamin-c-1000mg-puritans-pride';

              return (
                <div className="lc-product-card" key={idx} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {item.flag && <div className="lc-product-flag">{item.flag}</div>}
                  {item.discount && <div className="lc-product-discount">{item.discount}</div>}
                  <Link href={`/products/${itemSlug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', flex: 1 }}>
                    <div className="lc-product-img">
                      <img
                        src={item.img || item.image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80'}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/160/160?random=${idx + 10}`;
                        }}
                      />
                    </div>
                    <div className="lc-product-info">
                      <div className="lc-product-name" style={{ minHeight: '36px' }}>{item.name}</div>
                      <div className="lc-product-price-row">
                        <span className="lc-product-sale-price">
                          {item.salePrice ? item.salePrice.toLocaleString('vi-VN') + 'đ' : 'Liên hệ'}
                          {item.unit && <span className="lc-product-unit"> / {item.unit}</span>}
                        </span>
                        {item.price && <span className="lc-product-old-price">{item.price.toLocaleString('vi-VN')}đ</span>}
                      </div>
                      <div className="lc-progress-wrap">
                        <div className="lc-progress-bg">
                          <div className="lc-progress-fill" style={{ width: `${Math.max(soldPercent, 5)}%` }} />
                        </div>
                        <div className="lc-progress-lbl">
                          <span className="lc-progress-fire">🔥</span>
                          {soldPercent > 0 ? `Đã bán ${item.sold}/${item.total} suất` : `Mở bán ${item.total} suất`}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div style={{ padding: '0 12px 12px 12px', marginTop: 'auto' }}>
                    <button className="lc-btn-chon-mua" onClick={() => handleAddToCart(item, idx)}>
                      Chọn mua
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. CATEGORIES BLOCK ─────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { title: 'Trồng răng Implant', sub: '8 dịch vụ', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80', icon: '🦷' },
  { title: 'Niềng răng thẩm mỹ', sub: '6 dịch vụ', img: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=300&q=80', icon: '😁' },
  { title: 'Răng sứ thẩm mỹ', sub: '10 dịch vụ', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80', icon: '✨' },
  { title: 'Tẩy trắng răng', sub: '4 dịch vụ', img: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=300&q=80', icon: '💎' },
  { title: 'Điều trị tổng quát', sub: '12 dịch vụ', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80', icon: '🩺' },
  { title: 'Nha khoa trẻ em', sub: '6 dịch vụ', img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=300&q=80', icon: '🧒' },
  { title: 'Nhổ răng khôn', sub: '3 dịch vụ', img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=300&q=80', icon: '🪥' },
  { title: 'Điều trị tủy', sub: '4 dịch vụ', img: 'https://images.unsplash.com/photo-1629909615184-74f5da4b4b14?auto=format&fit=crop&w=300&q=80', icon: '⚕️' },
  { title: 'Điều trị nha chu', sub: '5 dịch vụ', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80', icon: '🪄' },
  { title: 'Cạo vôi răng', sub: '2 dịch vụ', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80', icon: '🫧' },
  { title: 'Hàm tháo lắp', sub: '4 dịch vụ', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80', icon: '🦿' },
  { title: 'Khám định kỳ', sub: '3 dịch vụ', img: 'https://images.unsplash.com/photo-1629909615184-74f5da4b4b14?auto=format&fit=crop&w=300&q=80', icon: '📋' },
];

function CategoriesBlock({ configs = {} }) {
  const { showToast } = useCart();
  const cats = (configs.items && configs.items.length > 0) ? configs.items : DEFAULT_CATEGORIES;
  return (
    <div className="lc-section-bg-white">
      <div className="lc-section">
        <div className="lc-section-header">
          <div className="lc-section-title-row">
            <span className="lc-section-icon">🏆</span>
            <h2 className="lc-section-title">{configs.title || 'Danh mục nổi bật'}</h2>
          </div>
          <span className="lc-section-link" onClick={() => showToast('Tính năng xem tất cả danh mục sẽ sớm ra mắt!', 'info')}>Xem tất cả ›</span>
        </div>
        <div className="lc-categories-grid">
          {cats.map((cat, i) => (
            <div key={i} className="lc-category-card" onClick={() => showToast(`Đang chuyển hướng đến danh mục "${cat.title}"...`, 'info')}>
              <div className="lc-category-icon">
                {cat.img ? (
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="lc-category-img"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'block'); }}
                  />
                ) : (
                  <span>{cat.icon || '💊'}</span>
                )}
              </div>
              <div>
                <div className="lc-category-name">{cat.title}</div>
                {cat.sub && <div className="lc-category-count">{cat.sub}</div>}
                {cat.desc && <div className="lc-category-count">{cat.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 4. HEALTH CHECKS BLOCK ──────────────────────────────────
const DEFAULT_HEALTH_CHECKS = [
  { title: 'Bài kiểm tra sức khỏe răng miệng tổng quát', desc: 'Đánh giá tình trạng răng, nướu hiện tại của bạn', icon: '🦷', action: 'Bắt đầu' },
  { title: 'Bài kiểm tra nguy cơ sâu răng', desc: 'Nhận biết sớm nguy cơ sâu răng từ thói quen hằng ngày', icon: '🔍', action: 'Bắt đầu' },
  { title: 'Bạn có phù hợp để niềng răng?', desc: 'Khảo sát nhanh tình trạng khớp cắn và nhu cầu chỉnh nha', icon: '😁', action: 'Bắt đầu' },
];

function HealthChecksBlock({ configs = {} }) {
  const { showToast } = useCart();
  const checks = (configs.items && configs.items.length > 0) ? configs.items : DEFAULT_HEALTH_CHECKS;
  return (
    <div className="lc-section-bg-white">
      <div className="lc-section">
        <div className="lc-healthcheck-section">
          <div className="lc-healthcheck-left">
            <h2 className="lc-healthcheck-title">{configs.title || 'Kiểm tra sức khỏe răng miệng'}</h2>
            <p className="lc-healthcheck-desc">{configs.description || 'Kết quả đánh giá sẽ cho bạn lời khuyên chăm sóc răng miệng phù hợp!'}</p>
            <div className="lc-healthcheck-cards">
              {checks.map((item, i) => (
                <div key={i} className="lc-healthcheck-card" onClick={() => showToast(`Bắt đầu khảo sát: "${item.title}"...`, 'info')}>
                  <div className="lc-healthcheck-card-icon">
                    {item.icon && item.icon.startsWith('/') ? (
                      <img src={item.icon} alt={item.title} onError={(e) => { e.target.parentElement.innerHTML = '🧬'; }} />
                    ) : (
                      <span style={{ fontSize: '20px' }}>{item.icon || '🩺'}</span>
                    )}
                  </div>
                  <div className="lc-healthcheck-card-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <span className="lc-healthcheck-card-link">{item.action || 'Bắt đầu'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lc-healthcheck-doctor">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80"
              alt="Bác sĩ tư vấn"
              style={{ borderRadius: '16px', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. AUDIENCES / DISEASES BY GROUP ────────────────────────
const DEFAULT_AUDIENCES = [
  {
    name: 'NGƯỜI TRƯỞNG THÀNH',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
    bgColor: 'linear-gradient(135deg, #e3f0ff, #c5deff)',
    items: ['Răng khấp khểnh, hô móm', 'Răng ố vàng, xỉn màu', 'Mất răng, tiêu xương hàm', 'Sâu răng, viêm tủy'],
  },
  {
    name: 'TRẺ EM',
    img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=400&q=80',
    bgColor: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
    items: ['Sâu răng sữa', 'Răng mọc lệch sớm', 'Thói quen mút tay, đẩy lưỡi', 'Ngừa sâu răng bằng fluoride'],
  },
  {
    name: 'NGƯỜI CAO TUỔI',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
    bgColor: 'linear-gradient(135deg, #fff8e1, #ffedb0)',
    items: ['Mất nhiều răng', 'Tụt nướu, lung lay răng', 'Hàm tháo lắp, Implant', 'Viêm nha chu mãn tính'],
  },
  {
    name: 'MẸ BẦU',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    bgColor: 'linear-gradient(135deg, #e8f7f0, #c9ecd9)',
    items: ['Viêm nướu thai kỳ', 'Chăm sóc răng khi mang thai', 'Thời điểm điều trị an toàn', 'Dinh dưỡng cho răng của bé'],
  },
];

function AudiencesBlock({ configs = {} }) {
  const audiences = (configs.items && configs.items.length > 0)
    ? configs.items.map((item, i) => ({ ...DEFAULT_AUDIENCES[i % DEFAULT_AUDIENCES.length], ...item }))
    : DEFAULT_AUDIENCES;

  return (
    <div className="lc-section-bg-light">
      <div className="lc-section">
        <div className="lc-section-header">
          <div className="lc-section-title-row">
            <span className="lc-section-icon">👥</span>
            <h2 className="lc-section-title">{configs.title || 'Chăm sóc răng theo đối tượng'}</h2>
          </div>
        </div>
        <div className="lc-audiences-grid">
          {audiences.map((aud, i) => (
            <div key={i} className="lc-audience-card">
              <div className="lc-audience-img-placeholder" style={{ background: aud.bgColor || DEFAULT_AUDIENCES[i % 4].bgColor }}>
                <img
                  src={aud.img || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80'}
                  alt={aud.name}
                  style={{ height: '110px', objectFit: 'cover', borderRadius: '10px' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="lc-audience-body">
                <div className="lc-audience-title">{aud.name}</div>
                <ul className="lc-audience-list">
                  {(aud.items || aud.desc?.split('·') || [aud.desc]).filter(Boolean).map((item, j) => (
                    <li key={j}>{item.trim()}</li>
                  ))}
                </ul>
                <span className="lc-audience-link">{aud.tag || 'Tìm hiểu thêm'} ›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 6. RECENT POSTS (GÓC SỨC KHỎE) ─────────────────────────
const ARTICLE_THUMBNAILS = [
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80',
];

function RecentPostsBlock({ configs = {} }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`/api/posts?status=published&limit=${configs.limit || 6}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => setPosts(d?.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [configs.limit]);

  const featured = posts[0];
  const listPosts = posts.slice(1);

  return (
    <div className="lc-section-bg-white">
      <div className="lc-section">
        <div className="lc-section-header">
          <div className="lc-section-title-row">
            <span className="lc-section-icon">📰</span>
            <h2 className="lc-section-title">{configs.title || 'Góc Sức Khỏe'}</h2>
          </div>
          <span className="lc-section-link" onClick={() => showToast('Tính năng xem tất cả bài viết sẽ sớm ra mắt!', 'info')}>Xem tất cả ›</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--lc-muted)' }}>Đang tải bài viết...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--lc-muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
            <div>Chưa có bài viết nào. Hãy thêm bài viết trong trang quản trị!</div>
          </div>
        ) : (
          <div className="lc-blog-grid">
            {featured && (
              <div className="lc-blog-featured">
                <img
                  src={featured.image || ARTICLE_THUMBNAILS[0]}
                  alt={featured.title}
                  onError={(e) => { e.target.src = `https://picsum.photos/600/300?random=featured`; }}
                />
                <div className="lc-blog-featured-info">
                  <span className="lc-blog-tag">Bài viết nổi bật</span>
                  <h3 className="lc-blog-featured-title">
                    <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  <p className="lc-blog-featured-excerpt">
                    {featured.summary || (featured.content || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                  </p>
                </div>
              </div>
            )}
            <div className="lc-blog-list">
              {listPosts.map((post, i) => (
                <div key={i} className="lc-blog-row">
                  <div className="lc-blog-row-img">
                    <img
                      src={post.image || ARTICLE_THUMBNAILS[i + 1] || `https://picsum.photos/100/75?random=${i}`}
                      alt={post.title}
                      onError={(e) => { e.target.src = `https://picsum.photos/100/75?random=${i + 20}`; }}
                    />
                  </div>
                  <div className="lc-blog-row-info">
                    <h4><Link href={`/posts/${post.slug}`}>{post.title}</Link></h4>
                    <span>{post.author_name || 'Nha Khoa Smile'} · {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 7. BRANDS BLOCK ─────────────────────────────────────────
const DEFAULT_BRANDS = [
  { name: 'Straumann', logoImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=200&q=80', productImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80', discount: 'Trụ Implant Thụy Sĩ' },
  { name: 'Osstem', logoImg: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=200&q=80', productImg: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=300&q=80', discount: 'Trụ Implant Hàn Quốc' },
  { name: 'Invisalign', logoImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=200&q=80', productImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=300&q=80', discount: 'Niềng trong suốt' },
  { name: '3M ESPE', logoImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=200&q=80', productImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80', discount: 'Vật liệu trám răng' },
  { name: 'Ivoclar', logoImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=200&q=80', productImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80', discount: 'Răng sứ Emax' },
];

function BrandsBlock({ configs = {} }) {
  const { showToast } = useCart();
  const brands = (configs.items && configs.items.length > 0)
    ? configs.items.map((item, i) => ({ ...DEFAULT_BRANDS[i % DEFAULT_BRANDS.length], name: item.name, logoImg: item.logo || DEFAULT_BRANDS[i % DEFAULT_BRANDS.length].logoImg }))
    : DEFAULT_BRANDS;

  return (
    <div className="lc-section-bg-white">
      <div className="lc-section">
        <div className="lc-section-header">
          <div className="lc-section-title-row">
            <span className="lc-section-icon">🏅</span>
            <h2 className="lc-section-title">{configs.title || 'Thương hiệu yêu thích'}</h2>
          </div>
          <span className="lc-section-link" onClick={() => showToast('Tính năng xem tất cả thương hiệu sẽ sớm ra mắt!', 'info')}>Xem tất cả ›</span>
        </div>
        <div className="lc-brands-grid">
          {brands.map((brand, i) => (
            <div key={i} className="lc-brand-card" onClick={() => showToast(`Xem thông tin thương hiệu "${brand.name}"...`, 'info')}>
              <img
                className="lc-brand-product-img"
                src={brand.productImg}
                alt={brand.name}
                onError={(e) => { e.target.src = `https://picsum.photos/100/90?random=${i + 50}`; }}
              />
              <img
                className="lc-brand-logo-img"
                src={brand.logoImg}
                alt={`${brand.name} logo`}
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.appendChild(Object.assign(document.createElement('span'), { textContent: brand.name, style: 'font-weight:700;font-size:13px;color:var(--lc-text)' })); }}
              />
              <span className="lc-brand-discount">{brand.discount || ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 8. HTML BLOCK ───────────────────────────────────────────
function HtmlBlock({ configs = {} }) {
  return (
    <div className="lc-section-bg-white">
      <div className="lc-section">
        <div dangerouslySetInnerHTML={{ __html: configs.html || '' }} />
      </div>
    </div>
  );
}

// ─── 9. PRODUCTS BLOCK ────────────────────────────────────────
function ProductsBlock({ configs = {} }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    const limit = configs.limit || 8;
    const category = configs.category || '';
    const featured = configs.featured || '';
    const flashSale = configs.flash_sale || '';
    
    fetch(`/api/products?limit=${limit}&category=${category}&featured=${featured}&flash_sale=${flashSale}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.products) {
          setProducts(data.products);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [configs.limit, configs.category, configs.featured, configs.flash_sale]);

  const handleAddToCart = (product) => {
    setAddingId(product.id);
    addItem(product, null, 1);
    setTimeout(() => {
      setAddingId(null);
    }, 800);
  };

  return (
    <div className="lc-section-bg-white">
      <div className="lc-section">
        <div className="lc-section-header">
          <div className="lc-section-title-row">
            <span className="lc-section-icon">📦</span>
            <h2 className="lc-section-title">{configs.title || 'Sản phẩm nổi bật'}</h2>
          </div>
          <Link href="/products" className="lc-section-link">Xem tất cả ›</Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--lc-muted)' }}>Đang tải sản phẩm...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--lc-muted)' }}>Không có sản phẩm nào.</div>
        ) : (
          <div className="lc-product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', margin: 0 }}>
            {products.map((prod, idx) => {
              const discountPercent = prod.original_price
                ? Math.round(((prod.original_price - prod.price) / prod.original_price) * 100)
                : 0;

              return (
                <div className="lc-product-card" key={prod.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {discountPercent > 0 && <div className="lc-product-discount" style={{ zIndex: 2 }}>-{discountPercent}%</div>}
                  <Link href={`/products/${prod.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '16px' }}>
                    <div className="lc-product-img" style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <img
                        src={prod.thumbnail || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80'}
                        alt={prod.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/160/160?random=${idx}`;
                        }}
                      />
                    </div>
                    <div style={{ minHeight: '84px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        {prod.brand && (
                          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--lc-blue)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                            {prod.brand}
                          </span>
                        )}
                        <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--lc-text)', margin: 0, lineBreak: 'anywhere', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px', lineHeight: '1.4' }}>
                          {prod.name}
                        </h4>
                      </div>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--lc-blue-dark)' }}>
                          {prod.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--lc-muted)' }}>
                          / {prod.unit || 'Hộp'}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div style={{ padding: '0 16px 16px', marginTop: 'auto' }}>
                    <button
                      onClick={() => handleAddToCart(prod)}
                      disabled={addingId === prod.id}
                      className="lc-btn-chon-mua"
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '20px',
                        border: 'none',
                        background: addingId === prod.id ? 'var(--lc-green, #2e7d32)' : 'var(--lc-blue)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {addingId === prod.id ? '✓ Đã thêm' : 'Chọn mua'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
