// Script seed dữ liệu demo Nha Khoa Smile cho MySQL dev.
// Chạy: node scripts/seed-dev.mjs  (từ thư mục gốc template)
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const DB_NAME = process.env.MYSQL_DATABASE || 'dental_clinic';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST || '162.62.54.247',
  port: parseInt(process.env.MYSQL_PORT || '31760'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'bJ0g168FRq24iuhn3wL7eQyNjU5pG9Ac',
  charset: 'utf8mb4',
  multipleStatements: false,
});

await conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
await conn.changeUser({ database: DB_NAME });

// Chuyển cú pháp SQLite trong schema sang MySQL (giống lib/db.js)
function tr(sql) {
  return sql
    .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'INT AUTO_INCREMENT PRIMARY KEY')
    .replace(/datetime\('now'\)/gi, 'NOW()')
    .replace(/LONGTEXT NOT NULL/gi, 'LONGTEXT')
    .replace(/INSERT OR IGNORE/gi, 'INSERT IGNORE')
    .replace(/INSERT OR REPLACE/gi, 'REPLACE');
}

const q = async (sql, params = []) => {
  const [rows] = await conn.query(tr(sql), params);
  return rows;
};

// ─── Tables (giống lib/initDb.js) ───────────────────────────────
const tables = [
  `CREATE TABLE IF NOT EXISTS signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS contact_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, phone VARCHAR(100), email VARCHAR(255), subject VARCHAR(255), message TEXT NOT NULL, status VARCHAR(50) NOT NULL DEFAULT 'new', created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS settings (
    \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
    \`value\` TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    display_name TEXT,
    email TEXT,
    phone VARCHAR(100),
    address TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'member',
    tier VARCHAR(50) NOT NULL DEFAULT 'Free',
    active INTEGER NOT NULL DEFAULT 1,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    image TEXT,
    author_id INTEGER,
    author_name TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    layout TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'published',
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    api_key VARCHAR(255) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS file_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    url LONGTEXT NOT NULL,
    file_size VARCHAR(50),
    folder VARCHAR(200) DEFAULT 'general',
    uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    uploaded_by INT,
    description TEXT,
    is_public INT DEFAULT 1,
    downloads INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS post_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INT,
    name VARCHAR(500) NOT NULL,
    original_name VARCHAR(500),
    file_type VARCHAR(100),
    file_size BIGINT DEFAULT 0,
    file_size_label VARCHAR(50),
    url LONGTEXT NOT NULL,
    uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    uploaded_by INT,
    downloads INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS download_tokens (
    token VARCHAR(200) PRIMARY KEY,
    use_count INT DEFAULT 0,
    expires_at BIGINT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS installed_plugins (
    id VARCHAR(191) PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT,
    config TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    installed_at DATETIME DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS shop_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id INTEGER,
    icon VARCHAR(100),
    image TEXT,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    price REAL NOT NULL DEFAULT 0,
    original_price REAL,
    thumbnail TEXT,
    images TEXT,
    brand VARCHAR(255),
    origin VARCHAR(255),
    unit VARCHAR(100) DEFAULT 'Hộp',
    stock INTEGER DEFAULT 0,
    sold_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    rating REAL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    is_featured INTEGER DEFAULT 0,
    is_flash_sale INTEGER DEFAULT 0,
    flash_sale_price REAL,
    flash_sale_end VARCHAR(100),
    tags TEXT,
    meta_title TEXT,
    meta_description TEXT,
    created_at VARCHAR(100) DEFAULT (datetime('now')),
    updated_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS product_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    order_id INTEGER,
    reviewer_name VARCHAR(255) NOT NULL,
    reviewer_id INTEGER,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT,
    is_verified INTEGER DEFAULT 0,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code VARCHAR(100) NOT NULL UNIQUE,
    user_id INTEGER,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255),
    shipping_address TEXT NOT NULL,
    shipping_province VARCHAR(255),
    shipping_note TEXT,
    items TEXT NOT NULL,
    subtotal REAL NOT NULL DEFAULT 0,
    discount_amount REAL DEFAULT 0,
    shipping_fee REAL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    coupon_code VARCHAR(100),
    payment_method VARCHAR(50) DEFAULT 'cod',
    payment_status VARCHAR(50) DEFAULT 'pending',
    status VARCHAR(50) DEFAULT 'pending',
    admin_note TEXT,
    created_at VARCHAR(100) DEFAULT (datetime('now')),
    updated_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(100) NOT NULL UNIQUE,
    discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
    discount_value REAL NOT NULL,
    min_order REAL DEFAULT 0,
    max_discount REAL,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    expires_at VARCHAR(100),
    is_active INTEGER DEFAULT 1,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
];

for (const ddl of tables) await q(ddl);
console.log('✅ Tables ready');

// ─── Settings ───────────────────────────────────────────────────
const settings = [
  ['site_title', 'Nha Khoa Smile - Tỏa sáng nụ cười Việt'],
  ['site_description', 'Nha Khoa Smile - Đồng hành cùng bạn kiến tạo nụ cười hoàn hảo. Trồng răng Implant, niềng răng thẩm mỹ, răng sứ, tẩy trắng răng với đội ngũ bác sĩ chuyên môn cao.'],
  ['site_keywords', 'nha khoa smile, trồng răng implant, niềng răng thẩm mỹ, răng sứ thẩm mỹ, tẩy trắng răng, nha khoa trẻ em'],
  ['header_logo_text', 'Nha Khoa Smile'],
  ['header_logo_icon', '🦷'],
  ['header_links', JSON.stringify([
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Dịch vụ', href: '/products' },
    { label: 'Tin tức', href: '/blog' },
    { label: 'Liên hệ', href: '/contact' },
  ])],
  ['footer_copyright', '© 2024 Nha Khoa Smile. All rights reserved.'],
  ['social_facebook', ''],
  ['social_zalo', ''],
  ['social_youtube', ''],
  ['social_tiktok', ''],
  ['social_instagram', ''],
  ['social_x', ''],
  ['social_telegram', ''],
  ['social_discord', ''],
  ['social_linkedin', ''],
];
for (const [key, val] of settings) {
  await q('REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
}
console.log('✅ Settings seeded');

// ─── Users ──────────────────────────────────────────────────────
const adminPw = bcrypt.hashSync('admin123', 10);
const modPw = bcrypt.hashSync('mod123', 10);
await q("INSERT IGNORE INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, 'Administrator', 'admin@nhakhoasmile.vn', 'admin', 'Enterprise', 1)", ['admin', adminPw]);
await q("INSERT IGNORE INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, 'Staff Moderator', 'mod@nhakhoasmile.vn', 'mod', 'Pro', 1)", ['moderator', modPw]);
console.log('✅ Users seeded (admin/admin123)');

// ─── Trang giới thiệu ───────────────────────────────────────────
const aboutLayout = [
  {
    id: 'b_about_hero', type: 'hero', visible: true,
    configs: {
      title: 'Sứ mệnh Nha Khoa Smile',
      description: 'Mang đến nụ cười khỏe đẹp và sự hài lòng tuyệt đối cho mọi khách hàng với dịch vụ nha khoa chuẩn quốc tế, chi phí hợp lý.',
      buttonText: 'Xem dịch vụ', buttonLink: '/products',
    },
  },
  {
    id: 'b_about_feat', type: 'features', visible: true,
    configs: {
      tag: 'GIÁ TRỊ CỐT LÕI',
      title: 'Cam kết nụ cười hoàn hảo cho bạn',
      description: 'Hơn 15 năm kiến tạo nụ cười Việt.',
      items: [
        { title: 'Đội Ngũ Chuyên Gia', desc: '100% bác sĩ chuyên khoa giàu kinh nghiệm, tận tâm với nghề.' },
        { title: 'Công Nghệ Hiện Đại', desc: 'Trang thiết bị tiên tiến, quy trình vô trùng chuẩn Bộ Y tế.' },
        { title: 'Chi Phí Minh Bạch', desc: 'Bảng giá công khai, rõ ràng, không phát sinh chi phí.' },
      ],
    },
  },
];
await q('DELETE FROM pages WHERE slug = ?', ['about']);
await q("INSERT INTO pages (slug, title, description, layout, status) VALUES ('about', 'Giới thiệu về chúng tôi', ?, ?, 'published')",
  ['Nha Khoa Smile - Đồng hành cùng bạn kiến tạo nụ cười hoàn hảo với dịch vụ nha khoa chuẩn quốc tế.', JSON.stringify(aboutLayout)]);
console.log('✅ About page seeded');

// ─── File categories ────────────────────────────────────────────
for (const c of [
  { name: 'Chưa phân loại', slug: 'general' },
  { name: 'Ảnh minh họa', slug: 'images' },
  { name: 'Tài liệu hướng dẫn', slug: 'documents' },
  { name: 'Khác', slug: 'other' },
]) {
  await q('INSERT IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
}

// ─── Danh mục dịch vụ ───────────────────────────────────────────
await q('DELETE FROM product_variants');
await q('DELETE FROM products');
await q('DELETE FROM shop_categories');

const cats = [
  { name: 'Trồng răng Implant', slug: 'trong-rang-implant', icon: '🦷', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80', sort: 1 },
  { name: 'Niềng răng thẩm mỹ', slug: 'nieng-rang-tham-my', icon: '😁', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80', sort: 2 },
  { name: 'Răng sứ thẩm mỹ', slug: 'rang-su-tham-my', icon: '✨', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80', sort: 3 },
  { name: 'Tẩy trắng răng', slug: 'tay-trang-rang', icon: '💎', image: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80', sort: 4 },
  { name: 'Điều trị tổng quát', slug: 'dieu-tri-tong-quat', icon: '🩺', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80', sort: 5 },
  { name: 'Nha khoa trẻ em', slug: 'nha-khoa-tre-em', icon: '🧒', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80', sort: 6 },
];
const catIds = {};
for (const c of cats) {
  const r = await q('INSERT INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)', [c.name, c.slug, c.icon, c.image, c.sort]);
  catIds[c.slug] = r.insertId;
}
console.log('✅ Service categories seeded');

// ─── Dịch vụ (products) ─────────────────────────────────────────
const services = [
  {
    cat: 'trong-rang-implant', name: 'Trồng răng Implant', slug: 'trong-rang-implant',
    short: 'Giải pháp phục hình răng mất tiên tiến, bền chắc như răng thật',
    desc: 'Trồng răng Implant là giải pháp phục hình răng mất hiện đại nhất hiện nay. Trụ Implant Titanium được cấy trực tiếp vào xương hàm, thay thế chân răng đã mất, sau đó gắn mão sứ lên trên cho khả năng ăn nhai và thẩm mỹ như răng thật. Nha Khoa Smile sử dụng trụ Implant chính hãng Hàn Quốc, Thụy Sĩ với chế độ bảo hành lên đến 20 năm.',
    price: 15000000, original: 20000000, unit: 'Trụ', origin: 'Hàn Quốc / Thụy Sĩ',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 1, sold: 320, rating: 5,
  },
  {
    cat: 'nieng-rang-tham-my', name: 'Niềng răng thẩm mỹ', slug: 'nieng-rang-tham-my',
    short: 'Răng đều đẹp, nụ cười tự tin với các phương pháp niềng hiện đại',
    desc: 'Niềng răng thẩm mỹ giúp khắc phục răng hô, móm, khấp khểnh, sai khớp cắn. Nha Khoa Smile cung cấp đầy đủ các phương pháp: mắc cài kim loại, mắc cài sứ, mắc cài tự động và khay niềng trong suốt Invisalign. Bác sĩ chỉnh nha giàu kinh nghiệm theo sát suốt quá trình điều trị.',
    price: 30000000, original: 40000000, unit: 'Gói', origin: 'Hoa Kỳ',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 450, rating: 5,
  },
  {
    cat: 'rang-su-tham-my', name: 'Răng sứ thẩm mỹ', slug: 'rang-su-tham-my',
    short: 'Khắc phục răng xấu, ố vàng, mang lại nụ cười hoàn hảo',
    desc: 'Bọc răng sứ thẩm mỹ khắc phục nhanh chóng các khuyết điểm: răng xỉn màu, sứt mẻ, thưa hở, hình thể xấu. Công nghệ CAD/CAM 3D thiết kế chính xác từng chiếc răng, màu sắc tự nhiên như răng thật. Đa dạng dòng sứ: Katana, Cercon, Lava, Emax với bảo hành từ 5-15 năm.',
    price: 2500000, original: 3500000, unit: 'Răng', origin: 'Đức',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 1, sold: 1250, rating: 5,
  },
  {
    cat: 'tay-trang-rang', name: 'Tẩy trắng răng', slug: 'tay-trang-rang',
    short: 'Răng trắng sáng tự nhiên, an toàn, không ê buốt',
    desc: 'Tẩy trắng răng công nghệ Laser Whitening giúp răng trắng sáng lên 3-5 tông chỉ sau 60 phút, an toàn tuyệt đối cho men răng, không gây ê buốt. Kết hợp bộ chăm sóc duy trì tại nhà giúp duy trì hiệu quả trắng sáng dài lâu.',
    price: 1500000, original: 2000000, unit: 'Lần', origin: 'Hoa Kỳ',
    image: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 2100, rating: 5,
  },
  {
    cat: 'dieu-tri-tong-quat', name: 'Điều trị tổng quát', slug: 'dieu-tri-tong-quat',
    short: 'Khám, điều trị các bệnh lý răng miệng chuyên sâu',
    desc: 'Dịch vụ điều trị tổng quát bao gồm: khám và tư vấn, cạo vôi răng, trám răng thẩm mỹ, điều trị tủy, nhổ răng khôn, điều trị nha chu, viêm nướu. Quy trình vô trùng chuẩn Bộ Y tế, trang thiết bị hiện đại, bác sĩ tận tâm.',
    price: 500000, original: 800000, unit: 'Lần', origin: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 3400, rating: 5,
  },
  {
    cat: 'nha-khoa-tre-em', name: 'Nha khoa trẻ em', slug: 'nha-khoa-tre-em',
    short: 'Chăm sóc răng miệng toàn diện cho bé, nhẹ nhàng, an toàn',
    desc: 'Nha khoa trẻ em tại Smile với không gian thân thiện, bác sĩ nhẹ nhàng giúp bé hết sợ khám răng. Dịch vụ: khám định kỳ, trám răng sữa, nhổ răng sữa, bôi fluoride ngừa sâu răng, hướng dẫn chăm sóc răng miệng đúng cách cho bé.',
    price: 300000, original: 500000, unit: 'Lần', origin: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 1800, rating: 5,
  },
];

for (const s of services) {
  const r = await q(
    `INSERT INTO products (category_id, name, slug, short_description, description, price, original_price, thumbnail, brand, origin, unit, stock, sold_count, rating, is_featured, is_flash_sale, flash_sale_price, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Nha Khoa Smile', ?, ?, 999, ?, ?, ?, ?, ?, 'active')`,
    [catIds[s.cat], s.name, s.slug, s.short, s.desc, s.price, s.original, s.image, s.origin, s.unit, s.sold, s.rating, s.featured, s.flash, s.flash ? s.price : null]
  );
  await q('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, 999)', [r.insertId, s.unit, s.price]);
}
console.log('✅ Services seeded');

// ─── Bài viết ───────────────────────────────────────────────────
await q('DELETE FROM posts');
const posts = [
  {
    title: '5 thói quen giúp răng luôn trắng sáng mỗi ngày',
    slug: '5-thoi-quen-giup-rang-trang-sang',
    summary: 'Răng trắng sáng không chỉ giúp bạn tự tin hơn khi giao tiếp mà còn là dấu hiệu của sức khỏe răng miệng tốt. Cùng khám phá 5 thói quen đơn giản mỗi ngày.',
    content: 'Để răng luôn trắng sáng, bạn nên: 1) Đánh răng đúng cách 2 lần mỗi ngày với kem đánh răng chứa fluoride; 2) Dùng chỉ nha khoa sau mỗi bữa ăn để làm sạch kẽ răng; 3) Hạn chế thực phẩm sậm màu như cà phê, trà, nước ngọt có gas; 4) Uống nhiều nước và ăn nhiều rau củ giòn giúp làm sạch răng tự nhiên; 5) Khám răng định kỳ 6 tháng/lần và lấy cao răng tại nha khoa uy tín.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Niềng răng trong suốt Invisalign có tốt không?',
    slug: 'nieng-rang-trong-suot-invisalign-co-tot-khong',
    summary: 'Niềng răng trong suốt Invisalign đang là xu hướng chỉnh nha được ưa chuộng nhờ tính thẩm mỹ cao và sự thoải mái khi đeo. Vậy phương pháp này có thực sự tốt?',
    content: 'Invisalign là phương pháp chỉnh nha sử dụng khay niềng trong suốt được thiết kế riêng cho từng người. Ưu điểm nổi bật: gần như vô hình khi đeo, dễ dàng tháo lắp khi ăn uống và vệ sinh, ít gây đau và tổn thương mô mềm so với mắc cài truyền thống. Thời gian điều trị trung bình từ 12-24 tháng tùy mức độ. Để đạt hiệu quả tốt nhất, bạn cần đeo khay tối thiểu 20-22 giờ mỗi ngày và tái khám đúng lịch với bác sĩ chỉnh nha.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Trồng răng Implant có đau không?',
    slug: 'trong-rang-implant-co-dau-khong',
    summary: 'Trồng răng Implant có đau không là câu hỏi được rất nhiều khách hàng quan tâm trước khi quyết định phục hình răng mất. Câu trả lời sẽ khiến bạn bất ngờ.',
    content: 'Với công nghệ hiện đại ngày nay, trồng răng Implant hầu như không gây đau đớn. Trước khi cấy trụ, bác sĩ sẽ gây tê cục bộ nên bạn hoàn toàn không cảm thấy đau trong suốt quá trình thực hiện (chỉ khoảng 15-30 phút mỗi trụ). Sau khi hết thuốc tê, cảm giác ê nhẹ có thể xuất hiện trong 1-3 ngày đầu và được kiểm soát tốt bằng thuốc giảm đau theo đơn. Chọn nha khoa uy tín với bác sĩ giàu kinh nghiệm và trụ Implant chính hãng là yếu tố quan trọng nhất để quá trình diễn ra an toàn, nhẹ nhàng.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
  },
];
for (const p of posts) {
  await q("INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, 'Bác sĩ Nha Khoa Smile', 'published')",
    [p.slug, p.title, p.summary, p.content, p.image]);
}
console.log('✅ Posts seeded');

// ─── Coupon ─────────────────────────────────────────────────────
await q('DELETE FROM coupons');
await q("INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES ('SMILE30', 'percent', 30, 1000000, 5000000, 100, 1)");
console.log('✅ Coupon SMILE30 seeded');

const prods = await q('SELECT name, price FROM products ORDER BY id');
console.log('\n📋 Services in DB:');
prods.forEach((p) => console.log(`  - ${p.name}: ${Number(p.price).toLocaleString('vi-VN')}đ`));

await conn.end();
console.log('\n🎉 Seed hoàn tất! Database:', DB_NAME);
