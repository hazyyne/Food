import React, { useState } from 'react';
import { X, Check, Copy, ShoppingBag } from 'lucide-react';
import { Dish } from '../types/food';
import { formatVND } from '../utils/matching';

interface ShoppingListModalProps {
  dishes: Dish[];
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  dishes,
  isOpen,
  onClose,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Extract all ingredients from selected dishes
  const allIngredients = Array.from(
    new Set(dishes.flatMap((d) => d.mainIngredients))
  );

  const totalCost = dishes.reduce((sum, d) => sum + d.estimatedCost, 0);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleCopy = () => {
    const listText = [
      `🛒 DANH SÁCH ĐI CHỢ CHO SINH VIÊN`,
      `Các món dự kiến nấu (${dishes.length} món): ${dishes.map((d) => d.name).join(', ')}`,
      `Tổng ngân sách dự tính: ~${formatVND(totalCost)}`,
      `----------------------`,
      `NGUYÊN LIỆU CẦN MUA:`,
      ...allIngredients.map((ing, i) => `[ ] ${i + 1}. ${ing}`),
    ].join('\n');

    navigator.clipboard.writeText(listText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Danh Sách Đi Chợ Tiết Kiệm</h3>
              <p className="text-xs text-stone-500">
                Cho {dishes.length} món đã lưu · Dự tính: ~{formatVND(totalCost)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          <p className="text-xs text-stone-500">
            Chạm vào nguyên liệu để đánh dấu khi bạn đã mua xong tại chợ hoặc siêu thị:
          </p>

          <div className="space-y-2">
            {allIngredients.map((item, idx) => {
              const isChecked = !!checkedItems[item];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(item)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-stone-100/60 border-stone-200 text-stone-400 line-through'
                      : 'bg-stone-50/50 hover:bg-amber-50/50 border-stone-200/80 text-stone-800'
                  }`}
                >
                  <span className="text-xs font-medium">{item}</span>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Student shopping tip */}
          <div className="bg-amber-50/70 border border-amber-200/60 p-3 rounded-xl text-xs text-amber-900">
            <strong>Mẹo chợ sinh viên:</strong> Đi chợ cóc buổi sáng từ 7h - 8h rau thịt tươi và rẻ hơn siêu thị; có thể mua chung thực phẩm với bạn cùng phòng để chia nhỏ tiền.
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã sao chép vào bộ nhớ tạm!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép danh sách đi chợ</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
