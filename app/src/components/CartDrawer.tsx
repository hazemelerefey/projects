import { useEffect, useRef } from 'react';
import { useCart } from '@/hooks/useCart';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-drawer-backdrop" onClick={() => setIsOpen(false)} />
      <div className="cart-drawer-panel" ref={panelRef}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-red" />
            <h2 className="font-cairo text-xl font-bold text-white">سلة التسوق</h2>
            <span className="bg-brand-red text-white text-xs font-almarai font-medium px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
              <p className="font-almarai text-white/50 text-lg">السلة فارغة</p>
              <p className="font-almarai text-white/30 text-sm mt-2">أضف بعض المنتجات لتبدأ التسوق</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-brand-dark-secondary rounded-lg border border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cairo font-bold text-white text-sm truncate">{item.name}</h3>
                    <p className="font-almarai text-brand-red text-sm font-medium mt-1">
                      {item.price.toLocaleString('ar-SA')} ر.س
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-white" />
                      </button>
                      <span className="font-almarai text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1.5 rounded hover:bg-white/10 transition-colors"
                    aria-label="حذف المنتج"
                  >
                    <Trash2 className="w-4 h-4 text-white/40 hover:text-brand-red transition-colors" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-almarai text-white/70">المجموع</span>
              <span className="font-cairo font-bold text-white text-xl">
                {totalPrice.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
            <button
              onClick={() => alert('سيتم توجيهك لصفحة إتمام الشراء على منصة سلة')}
              className="w-full py-4 bg-brand-red hover:bg-brand-red-hover text-white font-cairo font-bold rounded-lg transition-all duration-300 hover:shadow-glow"
            >
              إتمام الشراء
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-white/50 hover:text-white font-almarai text-sm transition-colors"
            >
              تفريغ السلة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
