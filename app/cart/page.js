import CartPageClient from '@/components/CartPageClient';

export const metadata = {
  title: 'Giỏ hàng của tôi | Nha Khoa Smile',
  description: 'Xem lại các dịch vụ nha khoa đã chọn và tiến hành đặt lịch hẹn.'
};

export default function CartPage() {
  return <CartPageClient />;
}
