import React, { useState } from 'react';
import { Heart, Clock, ChefHat, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Dish } from '../types/food';
import { formatVND } from '../utils/matching';

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  onToggleFavorite: (dish: Dish) => void;
  index: number;
}

// Fallback visual accents according to category
const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  'món mặn': { bg: 'bg-amber-500/10', text: 'text-amber-700', label: 'Món Mặn Đậm Đà' },
  'món canh': { bg: 'bg-emerald-500/10', text: 'text-emerald-700', label: 'Món Canh Thanh Mát' },
  'món xào': { bg: 'bg-orange-500/10', text: 'text-orange-700', label: 'Món Xào Giòn Ngon' },
  'món nhanh': { bg: 'bg-blue-500/10', text: 'text-blue-700', label: 'Nhanh Dưới 10 Phút' },
  'món cơm': { bg: 'bg-yellow-500/10', text: 'text-yellow-800', label: 'Món Cơm Tiết Kiệm' },
};

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  isFavorite,
  onToggleFavorite,
  index,
}) => {
  const [showSteps, setShowSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  const categoryMeta = CATEGORY_COLORS[dish.category] || {
    bg: 'bg-stone-100',
    text: 'text-stone-700',
    label: 'Món Ngon Sinh Viên',
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${dish.name} (~${formatVND(dish.estimatedCost)})\nNguyên liệu: ${dish.mainIngredients.join(', ')}\n${dish.shortDescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Banner / Numbering & Category */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            {/* Clean unboxed metadata with subtle dot separators */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
              <span className="font-semibold text-amber-700">Món {index + 1}</span>
              <span aria-hidden="true">·</span>
              <span>{categoryMeta.label}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                {dish.cookingTimeMinutes} phút
              </span>
            </div>

            {/* Tên món */}
            <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
              {dish.name}
            </h3>
          </div>

          {/* Action buttons: Favorite */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleFavorite(dish)}
              type="button"
              aria-label={isFavorite ? 'Bỏ lưu món' : 'Lưu vào danh sách yêu thích'}
              title={isFavorite ? 'Bỏ lưu món' : 'Lưu món yêu thích'}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'bg-stone-100 text-stone-400 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform active:scale-75 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Chi phí ước tính nổi bật cho sinh viên */}
        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-stone-500 block">Chi phí ước tính</span>
            <span className="text-2xl font-extrabold text-amber-600 tabular-nums tracking-tight">
              ~{formatVND(dish.estimatedCost)}
            </span>
          </div>
          <span className="text-xs font-medium text-stone-500 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
            {dish.servings || '1 - 2 người'}
          </span>
        </div>

        {/* Mô tả ngắn */}
        <div className="mt-3 text-sm text-stone-600 leading-relaxed">
          <p>{dish.shortDescription}</p>
        </div>

        {/* Nguyên liệu chính */}
        <div className="mt-4 bg-stone-50/80 rounded-xl p-3 border border-stone-100">
          <span className="text-xs font-bold text-stone-700 block mb-1.5 uppercase tracking-wide">
            Nguyên liệu chính:
          </span>
          <ul className="text-xs text-stone-700 space-y-1">
            {dish.mainIngredients.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold leading-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sinh viên Cooking Tip */}
        {dish.tip && (
          <div className="mt-3 text-xs text-amber-900/90 bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="font-semibold text-amber-800">Mẹo tiết kiệm: </strong>
              {dish.tip}
            </p>
          </div>
        )}

        {/* Expandable Step-by-Step cooking instructions */}
        {showSteps && (
          <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-700 space-y-2.5">
            <span className="font-bold text-stone-800 block text-sm">
              Cách nấu nhanh gọn ({dish.steps.length} bước):
            </span>
            {dish.steps.map((step, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {sIdx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setShowSteps(!showSteps)}
          className="text-xs font-semibold text-stone-700 hover:text-amber-700 flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-white transition-colors"
        >
          {showSteps ? (
            <>
              Thu gọn cách nấu <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <ChefHat className="w-3.5 h-3.5 text-amber-600" />
              Xem cách nấu chi tiết <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 py-1 px-2 rounded hover:bg-stone-200/50 transition-colors"
          title="Sao chép tên món & nguyên liệu"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Đã chép</span>
            </>
          ) : (
            <span>Sao chép</span>
          )}
        </button>
      </div>
    </div>
  );
};
