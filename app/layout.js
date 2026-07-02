import './globals.css';
import { CartProvider } from '@/components/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import PluginRunner from '@/components/PluginRunner';

export const metadata = {
  title: 'Nha Khoa Smile - Tỏa sáng nụ cười Việt',
  description: 'Nha Khoa Smile - Đồng hành cùng bạn kiến tạo nụ cười hoàn hảo. Trồng răng Implant, niềng răng thẩm mỹ, răng sứ, tẩy trắng răng với đội ngũ bác sĩ chuyên môn cao, công nghệ chuẩn quốc tế.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <PluginRunner />
        </CartProvider>
      </body>
    </html>
  );
}
