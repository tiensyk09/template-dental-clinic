import { query } from './db';
import { hashPassword } from './auth';

export async function initDatabase() {
  // Signups table
  await query(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Contact messages table (tin nhắn từ trang Liên hệ)
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      email VARCHAR(255),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
      \`value\` TEXT
    )
  `);

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
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
    )
  `);

  try {
    await query('ALTER TABLE users ADD COLUMN phone VARCHAR(100)');
  } catch (err) {}

  try {
    await query('ALTER TABLE users ADD COLUMN address TEXT');
  } catch (err) {}

  try {
    await query("ALTER TABLE users ADD COLUMN tier VARCHAR(50) NOT NULL DEFAULT 'Free'");
  } catch (err) {}

  // Alter products table columns if missing
  const productsColumns = [
    { name: 'original_price', type: 'REAL' },
    { name: 'images', type: 'TEXT' },
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'origin', type: 'VARCHAR(255)' },
    { name: 'unit', type: "VARCHAR(100) DEFAULT 'Hộp'" },
    { name: 'sold_count', type: 'INTEGER DEFAULT 0' },
    { name: 'view_count', type: 'INTEGER DEFAULT 0' },
    { name: 'rating', type: 'REAL DEFAULT 0' },
    { name: 'is_featured', type: 'INTEGER DEFAULT 0' },
    { name: 'is_flash_sale', type: 'INTEGER DEFAULT 0' },
    { name: 'flash_sale_price', type: 'REAL' },
    { name: 'flash_sale_end', type: 'VARCHAR(100)' },
    { name: 'tags', type: 'TEXT' },
    { name: 'meta_title', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' }
  ];

  for (const col of productsColumns) {
    try {
      await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      // Column might already exist
    }
  }

  // Posts/Changelog table
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
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
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Pages table
  await query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      layout TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // API Keys table
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_key VARCHAR(255) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // File Categories table
  await query(`
    CREATE TABLE IF NOT EXISTS file_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Files table
  await query(`
    CREATE TABLE IF NOT EXISTS files (
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
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Post Attachments table
  await query(`
    CREATE TABLE IF NOT EXISTS post_attachments (
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
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Download tokens tracking table
  await query(`
    CREATE TABLE IF NOT EXISTS download_tokens (
      token VARCHAR(200) PRIMARY KEY,
      use_count INT DEFAULT 0,
      expires_at BIGINT NOT NULL
    )
  `);

  // Installed Plugins table — lưu plugin đã cài và config trong DB của website
  await query(`
    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      config TEXT DEFAULT '{}',
      active INTEGER NOT NULL DEFAULT 1,
      installed_at DATETIME DEFAULT (datetime('now'))
    )
  `);


  // ─── E-COMMERCE TABLES ───────────────────────────────────────

  // Shop Categories (danh mục sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS shop_categories (
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
    )
  `);

  // Products (sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS products (
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
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
    )
  `);

  // Product Variants (biến thể sản phẩm: Hộp, Vỉ, Chai...)
  await query(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product Reviews (đánh giá)
  await query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      order_id INTEGER,
      reviewer_name VARCHAR(255) NOT NULL,
      reviewer_id INTEGER,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT,
      is_verified INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Orders (đơn hàng)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
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
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Coupons (mã giảm giá)
  await query(`
    CREATE TABLE IF NOT EXISTS coupons (
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
    )
  `);

  // Alter tables to add SEO columns dynamically if they do not exist
  const addColumns = [
    { table: 'pages', column: 'meta_title', type: 'TEXT' },
    { table: 'pages', column: 'meta_description', type: 'TEXT' },
    { table: 'pages', column: 'meta_keywords', type: 'TEXT' },
    { table: 'posts', column: 'meta_title', type: 'TEXT' },
    { table: 'posts', column: 'meta_description', type: 'TEXT' },
    { table: 'posts', column: 'meta_keywords', type: 'TEXT' }
  ];

  for (const item of addColumns) {
    try {
      await query(`ALTER TABLE ${item.table} ADD COLUMN ${item.column} ${item.type}`);
      console.log(`Added column ${item.column} to table ${item.table}`);
    } catch (err) {
      // Column already exists or error
    }
  }

  console.log('✅ Database tables created and migrated');
}


export async function seedData(adminPassword, force = false) {
  const passwordToSeed = adminPassword || 'admin123';
  
  // Check if we should force override because the database was previously seeded with data of another template
  let isOtherTemplate = false;
  try {
    const existingLogo = await query('SELECT `value` FROM settings WHERE `key` = ?', ['header_logo_text']);
    const oldLogos = ['Command Code', 'FPT Long Châu', 'Sâm Ngọc Linh'];
    if (existingLogo.length > 0 && oldLogos.includes(existingLogo[0].value)) {
      isOtherTemplate = true;
    }
  } catch (e) {
    // Table or settings might not exist yet
  }

  const shouldForce = force || isOtherTemplate;

  // Seed Settings
  const defaultSettings = [
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
      { label: 'Liên hệ', href: '/contact' }
    ])],
    ['footer_copyright', '© 2024 Nha Khoa Smile. All rights reserved.'],
    // Liên hệ mạng xã hội (để trống = ẩn icon tương ứng)
    ['social_facebook', ''],
    ['social_zalo', ''],
    ['social_youtube', ''],
    ['social_tiktok', ''],
    ['social_instagram', ''],
    ['social_x', ''],
    ['social_telegram', ''],
    ['social_discord', ''],
    ['social_linkedin', ''],
    ['footer_columns', JSON.stringify([
      {
        title: 'Về chúng tôi',
        links: [
          { label: 'Giới thiệu', href: '/about' },
          { label: 'Đội ngũ bác sĩ', href: '/about' },
          { label: 'Chính sách bảo hành', href: '#' }
        ]
      },
      {
        title: 'Hỗ trợ khách hàng',
        links: [
          { label: 'Câu hỏi thường gặp', href: '/blog' },
          { label: 'Hướng dẫn thanh toán', href: '#' },
          { label: 'Chính sách bảo mật', href: '#' }
        ]
      }
    ])]
  ];

  for (const [key, val] of defaultSettings) {
    try {
      if (shouldForce) {
        await query('INSERT OR REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      } else {
        await query('INSERT OR IGNORE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      }
    } catch (err) {
      console.error(`Failed to seed setting key ${key}:`, err);
    }
  }

  // Seed default admin and moderator users
  try {
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    const hashedAdminPw = await hashPassword(passwordToSeed);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['admin', hashedAdminPw, 'Administrator', 'admin@nhakhoasmile.vn', 'admin', 'Enterprise']
      );
      console.log('👑 Default admin user seeded');
    } else if (adminPassword) {
      await query('UPDATE users SET password = ? WHERE username = ?', [hashedAdminPw, 'admin']);
      console.log('👑 Admin user password updated to custom password');
    }

    const modExists = await query('SELECT id FROM users WHERE username = ?', ['moderator']);
    if (modExists.length === 0) {
      const hashedModPw = await hashPassword('mod123');
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['moderator', hashedModPw, 'Staff Moderator', 'mod@nhakhoasmile.vn', 'mod', 'Pro']
      );
      console.log('🛡️ Default moderator user seeded');
    }
  } catch (err) {
    console.error('Failed to seed default users:', err);
  }

  // Seed default dynamic pages
  try {
    const pageExists = await query('SELECT id FROM pages WHERE slug = ?', ['about']);
    if (pageExists.length === 0 || shouldForce) {
      const defaultLayout = [
        {
          id: 'b_about_hero',
          type: 'hero',
          visible: true,
          configs: {
            title: 'Sứ mệnh Nha Khoa Smile',
            description: 'Mang đến nụ cười khỏe đẹp và sự hài lòng tuyệt đối cho mọi khách hàng với dịch vụ nha khoa chuẩn quốc tế, chi phí hợp lý.',
            buttonText: 'Xem dịch vụ',
            buttonLink: '/products'
          }
        },
        {
          id: 'b_about_feat',
          type: 'features',
          visible: true,
          configs: {
            tag: 'GIÁ TRỊ CỐT LÕI',
            title: 'Cam kết nụ cười hoàn hảo cho bạn',
            description: 'Hơn 15 năm kiến tạo nụ cười Việt.',
            items: [
              { title: 'Đội Ngũ Chuyên Gia', desc: '100% bác sĩ chuyên khoa giàu kinh nghiệm, tận tâm với nghề.' },
              { title: 'Công Nghệ Hiện Đại', desc: 'Trang thiết bị tiên tiến, quy trình vô trùng chuẩn Bộ Y tế.' },
              { title: 'Chi Phí Minh Bạch', desc: 'Bảng giá công khai, rõ ràng, không phát sinh chi phí.' }
            ]
          }
        }
      ];
      if (pageExists.length > 0) {
        await query('DELETE FROM pages WHERE slug = ?', ['about']);
      }
      await query(
        'INSERT INTO pages (slug, title, description, layout, status) VALUES (?, ?, ?, ?, ?)',
        ['about', 'Giới thiệu về chúng tôi', 'Nha Khoa Smile - Đồng hành cùng bạn kiến tạo nụ cười hoàn hảo với dịch vụ nha khoa chuẩn quốc tế.', JSON.stringify(defaultLayout), 'published']
      );
      console.log('📄 Default about page seeded');
    }
  } catch (err) {
    console.error('Failed to seed default pages:', err);
  }

  // Seed default file categories
  try {
    const existingFileCats = await query('SELECT COUNT(*) as cnt FROM file_categories');
    if (existingFileCats[0].cnt === 0) {
      const defaultFileCats = [
        { name: 'Chưa phân loại', slug: 'general' },
        { name: 'Ảnh minh họa', slug: 'images' },
        { name: 'Tài liệu hướng dẫn', slug: 'documents' },
        { name: 'Mã nguồn / Code', slug: 'code' },
        { name: 'Khác', slug: 'other' }
      ];
      for (const c of defaultFileCats) {
        await query('INSERT OR IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
      }
      console.log('📁 Default file categories seeded');
    }
  } catch (err) {
    console.error('Failed to seed default file categories:', err);
  }

  // Seed E-Commerce data (shop categories + sample products + coupon)
  try {
    const catCount = await query('SELECT COUNT(*) as cnt FROM shop_categories');
    if (catCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM shop_categories');
      }
      const defaultCats = [
        { name: 'Trồng răng Implant', slug: 'trong-rang-implant', icon: '🦷', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80', sort_order: 1 },
        { name: 'Niềng răng thẩm mỹ', slug: 'nieng-rang-tham-my', icon: '😁', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80', sort_order: 2 },
        { name: 'Răng sứ thẩm mỹ', slug: 'rang-su-tham-my', icon: '✨', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80', sort_order: 3 },
        { name: 'Tẩy trắng răng', slug: 'tay-trang-rang', icon: '💎', image: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80', sort_order: 4 },
        { name: 'Điều trị tổng quát', slug: 'dieu-tri-tong-quat', icon: '🩺', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80', sort_order: 5 },
        { name: 'Nha khoa trẻ em', slug: 'nha-khoa-tre-em', icon: '🧒', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80', sort_order: 6 },
      ];
      for (const c of defaultCats) {
        await query(
          'INSERT OR IGNORE INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [c.name, c.slug, c.icon, c.image, c.sort_order]
        );
      }
      console.log('🛍️ Default shop categories seeded');
    }

    const prodCount = await query('SELECT COUNT(*) as cnt FROM products');
    if (prodCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM products');
        await query('DELETE FROM product_variants');
      }
      const catImplant = await query("SELECT id FROM shop_categories WHERE slug = 'trong-rang-implant'");
      const catNiengRang = await query("SELECT id FROM shop_categories WHERE slug = 'nieng-rang-tham-my'");
      const catRangSu = await query("SELECT id FROM shop_categories WHERE slug = 'rang-su-tham-my'");
      const catTayTrang = await query("SELECT id FROM shop_categories WHERE slug = 'tay-trang-rang'");
      const catTongQuat = await query("SELECT id FROM shop_categories WHERE slug = 'dieu-tri-tong-quat'");
      const catTreEm = await query("SELECT id FROM shop_categories WHERE slug = 'nha-khoa-tre-em'");

      const catIdImplant = catImplant[0]?.id || null;
      const catIdNiengRang = catNiengRang[0]?.id || null;
      const catIdRangSu = catRangSu[0]?.id || null;
      const catIdTayTrang = catTayTrang[0]?.id || null;
      const catIdTongQuat = catTongQuat[0]?.id || null;
      const catIdTreEm = catTreEm[0]?.id || null;

      const sampleProducts = [
        { category_id: catIdImplant, name: 'Trồng răng Implant', slug: 'trong-rang-implant', short_description: 'Giải pháp phục hình răng mất tiên tiến, bền chắc như răng thật', price: 15000000, original_price: 20000000, thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80', brand: 'Nha Khoa Smile', origin: 'Hàn Quốc / Thụy Sĩ', unit: 'Trụ', stock: 100, is_featured: 1, is_flash_sale: 1, flash_sale_price: 15000000 },
        { category_id: catIdNiengRang, name: 'Niềng răng thẩm mỹ', slug: 'nieng-rang-tham-my', short_description: 'Răng đều đẹp, nụ cười tự tin với các phương pháp niềng hiện đại', price: 30000000, original_price: 40000000, thumbnail: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80', brand: 'Nha Khoa Smile', origin: 'Hoa Kỳ', unit: 'Gói', stock: 100, is_featured: 1 },
        { category_id: catIdRangSu, name: 'Răng sứ thẩm mỹ', slug: 'rang-su-tham-my', short_description: 'Khắc phục răng xấu, ố vàng, mang lại nụ cười hoàn hảo', price: 2500000, original_price: 3500000, thumbnail: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80', brand: 'Nha Khoa Smile', origin: 'Đức', unit: 'Răng', stock: 200, is_featured: 1, is_flash_sale: 1, flash_sale_price: 2500000 },
        { category_id: catIdTayTrang, name: 'Tẩy trắng răng', slug: 'tay-trang-rang', short_description: 'Răng trắng sáng tự nhiên, an toàn, không ê buốt', price: 1500000, original_price: 2000000, thumbnail: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&w=600&q=80', brand: 'Nha Khoa Smile', origin: 'Hoa Kỳ', unit: 'Lần', stock: 300, is_featured: 1 },
        { category_id: catIdTongQuat, name: 'Điều trị tổng quát', slug: 'dieu-tri-tong-quat', short_description: 'Khám, điều trị các bệnh lý răng miệng chuyên sâu', price: 500000, original_price: 800000, thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80', brand: 'Nha Khoa Smile', origin: 'Việt Nam', unit: 'Lần', stock: 500, is_featured: 1 },
        { category_id: catIdTreEm, name: 'Nha khoa trẻ em', slug: 'nha-khoa-tre-em', short_description: 'Chăm sóc răng miệng toàn diện cho bé, nhẹ nhàng, an toàn', price: 300000, original_price: 500000, thumbnail: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80', brand: 'Nha Khoa Smile', origin: 'Việt Nam', unit: 'Lần', stock: 500, is_featured: 1 }
      ];

      for (const p of sampleProducts) {
        try {
          await query(
            `INSERT OR IGNORE INTO products (category_id, name, slug, short_description, price, original_price, thumbnail, brand, origin, unit, stock, is_featured, is_flash_sale, flash_sale_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [p.category_id, p.name, p.slug, p.short_description, p.price, p.original_price || null, p.thumbnail || null, p.brand || null, p.origin || null, p.unit || 'Kg', p.stock || 0, p.is_featured || 0, p.is_flash_sale || 0, p.flash_sale_price || null]
          );
          // Add variants for each product
          const prod = await query('SELECT id FROM products WHERE slug = ?', [p.slug]);
          if (prod.length > 0) {
            const pid = prod[0].id;
            await query('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, ?)', [pid, p.unit || 'Kg', p.price, p.stock]);
          }
        } catch (e) { /* ignore duplicate */ }
      }
      console.log('🛒 Sample products seeded');
    }

    // Seed default blog posts
    const postCount = await query('SELECT COUNT(*) as cnt FROM posts');
    if (postCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM posts');
      }
      
      const defaultPosts = [
        {
          title: '5 thói quen giúp răng luôn trắng sáng mỗi ngày',
          slug: '5-thoi-quen-giup-rang-trang-sang',
          summary: 'Răng trắng sáng không chỉ giúp bạn tự tin hơn khi giao tiếp mà còn là dấu hiệu của sức khỏe răng miệng tốt. Cùng khám phá 5 thói quen đơn giản mỗi ngày.',
          content: 'Để răng luôn trắng sáng, bạn nên: 1) Đánh răng đúng cách 2 lần mỗi ngày với kem đánh răng chứa fluoride; 2) Dùng chỉ nha khoa sau mỗi bữa ăn để làm sạch kẽ răng; 3) Hạn chế thực phẩm sậm màu như cà phê, trà, nước ngọt có gas; 4) Uống nhiều nước và ăn nhiều rau củ giòn giúp làm sạch răng tự nhiên; 5) Khám răng định kỳ 6 tháng/lần và lấy cao răng tại nha khoa uy tín.',
          image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
          author_name: 'Bác sĩ Nha Khoa Smile'
        },
        {
          title: 'Niềng răng trong suốt Invisalign có tốt không?',
          slug: 'nieng-rang-trong-suot-invisalign-co-tot-khong',
          summary: 'Niềng răng trong suốt Invisalign đang là xu hướng chỉnh nha được ưa chuộng nhờ tính thẩm mỹ cao và sự thoải mái khi đeo. Vậy phương pháp này có thực sự tốt?',
          content: 'Invisalign là phương pháp chỉnh nha sử dụng khay niềng trong suốt được thiết kế riêng cho từng người. Ưu điểm nổi bật: gần như vô hình khi đeo, dễ dàng tháo lắp khi ăn uống và vệ sinh, ít gây đau và tổn thương mô mềm so với mắc cài truyền thống. Thời gian điều trị trung bình từ 12-24 tháng tùy mức độ. Để đạt hiệu quả tốt nhất, bạn cần đeo khay tối thiểu 20-22 giờ mỗi ngày và tái khám đúng lịch với bác sĩ chỉnh nha.',
          image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
          author_name: 'Bác sĩ Nha Khoa Smile'
        },
        {
          title: 'Trồng răng Implant có đau không?',
          slug: 'trong-rang-implant-co-dau-khong',
          summary: 'Trồng răng Implant có đau không là câu hỏi được rất nhiều khách hàng quan tâm trước khi quyết định phục hình răng mất. Câu trả lời sẽ khiến bạn bất ngờ.',
          content: 'Với công nghệ hiện đại ngày nay, trồng răng Implant hầu như không gây đau đớn. Trước khi cấy trụ, bác sĩ sẽ gây tê cục bộ nên bạn hoàn toàn không cảm thấy đau trong suốt quá trình thực hiện (chỉ khoảng 15-30 phút mỗi trụ). Sau khi hết thuốc tê, cảm giác ê nhẹ có thể xuất hiện trong 1-3 ngày đầu và được kiểm soát tốt bằng thuốc giảm đau theo đơn. Chọn nha khoa uy tín với bác sĩ giàu kinh nghiệm và trụ Implant chính hãng là yếu tố quan trọng nhất để quá trình diễn ra an toàn, nhẹ nhàng.',
          image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
          author_name: 'Bác sĩ Nha Khoa Smile'
        }
      ];

      for (const p of defaultPosts) {
        await query(
          `INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`,
          [p.slug, p.title, p.summary, p.content, p.image, p.author_name]
        );
      }
      console.log('📝 Sample posts seeded');
    }

    // Seed a sample coupon
    const couponExists = await query("SELECT id FROM coupons WHERE code = 'SMILE30'");
    if (couponExists.length === 0) {
      await query(
        "INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        ['SMILE30', 'percent', 30, 1000000, 5000000, 100]
      );
      console.log('🎟️ Sample coupon SMILE30 seeded');
    }

  } catch (err) {
    console.error('Failed to seed E-Commerce data:', err);
  }

  console.log('✅ Seed data complete');
}
