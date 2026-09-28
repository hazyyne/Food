import React, { useState } from 'react';
import {
  Heart,
  Clock,
  ChefHat,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Flame,
  CheckCircle2,
  LogIn,
  CalendarPlus,
  Activity
} from 'lucide-react';
import { Dish } from '../types/food';
import { formatVND } from '../utils/matching';
import { getDishImage } from '../utils/dishImages';

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  onToggleFavorite: (dish: Dish) => void;
  index: number;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
  cookCount?: number;
  onMarkCooked?: (dishId: string) => void;
  onScheduleMeal?: (dish: Dish) => void;
}

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
  isAuthenticated,
  onRequireAuth,
  cookCount = 0,
  onMarkCooked,
  onScheduleMeal,
}) => {
  const [showSteps, setShowSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  const categoryMeta = CATEGORY_COLORS[dish.category] || {
    bg: 'bg-stone-100',
    text: 'text-stone-700',
    label: 'Món Ngon Sinh Viên',
  };

  const imageUrl = dish.image || getDishImage(dish.id, dish.category);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    const text = `${dish.name} (~${formatVND(dish.estimatedCost)} | ${dish.nutrition.calories} Kcal)\nNguyên liệu: ${dish.mainIngredients.join(', ')}\n${dish.shortDescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Hình ảnh minh họa món ăn */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={imageUrl}
            alt={dish.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

          {/* Top badges over image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-xs">
              Món {index + 1} · {categoryMeta.label}
            </span>

            {/* Favorite button */}
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  onRequireAuth();
                } else {
                  onToggleFavorite(dish);
                }
              }}
              type="button"
              aria-label={isFavorite ? 'Bỏ lưu món' : 'Lưu vào danh sách yêu thích'}
              title={isFavorite ? 'Bỏ lưu món' : 'Lưu món yêu thích'}
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white/80 text-stone-700 hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform active:scale-75 ${
                  isFavorite ? 'fill-white text-white' : ''
                }`}
              />
            </button>
          </div>

          {/* Bottom badge on image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white/95">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <Clock className="w-3 h-3 text-amber-300" />
                {dish.cookingTimeMinutes} phút
              </span>
              <span className="bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                {dish.servings || '1 - 2 người'}
              </span>
            </div>

            {/* Đã nấu mấy lần (chỉ hiện khi đã đăng nhập) */}
            {isAuthenticated && cookCount > 0 && (
              <span className="flex items-center gap-1 bg-amber-600/90 text-white px-2 py-0.5 rounded-md font-semibold backdrop-blur-xs shadow-xs">
                <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                Đã nấu {cookCount} lần
              </span>
            )}
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-5 pb-3">
          {/* Tên món */}
          <h3 className="text-lg font-bold text-stone-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
            {dish.name}
          </h3>

          {/* Mô tả ngắn (luôn hiển thị để người dùng biết món ăn) */}
          <div className="mt-2 text-xs text-stone-600 leading-relaxed">
            <p>{dish.shortDescription}</p>
          </div>

          {/* Chi phí ước tính & Kalo/Calories */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[11px] text-stone-500 font-medium block">Chi phí ước tính:</span>
              {isAuthenticated ? (
                <span className="text-xl font-extrabold text-amber-700 tabular-nums tracking-tight">
                  ~{formatVND(dish.estimatedCost)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={onRequireAuth}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-amber-700 bg-stone-100 hover:bg-amber-50 px-2 py-1 rounded-lg transition-colors cursor-pointer border border-dashed border-stone-300"
                  title="Đăng nhập để xem chi phí ước tính"
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Đăng nhập để xem giá</span>
                </button>
              )}
            </div>

            {/* Kalo / Calories Badge */}
            <div className="text-right">
              <span className="text-[11px] text-stone-500 font-medium block">Năng lượng:</span>
              {isAuthenticated ? (
                <span className="inline-flex items-center gap-1 font-extrabold text-stone-900 text-sm bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/70">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{dish.nutrition.calories} Kcal</span>
                </span>
              ) : (
                <span className="text-xs text-stone-400 flex items-center gap-1 justify-end">
                  <Lock className="w-3 h-3" /> Kalo ẩn
                </span>
              )}
            </div>
          </div>

          {/* Giá trị dinh dưỡng chi tiết & Nguyên liệu chính: Khi đăng nhập */}
          {isAuthenticated ? (
            <>
              {/* Macro Nutrition bar */}
              <div className="mt-3 bg-stone-50 rounded-2xl p-2.5 border border-stone-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1 uppercase tracking-wide">
                    <Activity className="w-3 h-3 text-amber-600" />
                    Giá trị dinh dưỡng (1 phần):
                  </span>
                  <span className="text-[10px] text-stone-400">Chuẩn bữa cơm</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                  <div className="bg-white py-1 px-1.5 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-400 block">Đạm</span>
                    <strong className="text-emerald-700 font-semibold">{dish.nutrition.protein}g</strong>
                  </div>
                  <div className="bg-white py-1 px-1.5 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-400 block">Carbs</span>
                    <strong className="text-amber-800 font-semibold">{dish.nutrition.carbs}g</strong>
                  </div>
                  <div className="bg-white py-1 px-1.5 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-400 block">Béo</span>
                    <strong className="text-rose-700 font-semibold">{dish.nutrition.fat}g</strong>
                  </div>
                </div>
              </div>

              {/* Nguyên liệu chính */}
              <div className="mt-3 bg-stone-50/90 rounded-2xl p-3 border border-stone-100">
                <span className="text-[11px] font-bold text-stone-700 block mb-1 uppercase tracking-wide">
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
                <div className="mt-3.5 pt-3 border-t border-stone-200 text-xs text-stone-700 space-y-2">
                  <span className="font-bold text-stone-800 block text-xs">
                    Cách nấu nhanh ({dish.steps.length} bước):
                  </span>
                  {dish.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Khi chưa đăng nhập: Card thông báo công thức & nguyên liệu bị ẩn */
            <div className="mt-3.5 p-3.5 bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Nguyên liệu, dinh dưỡng & công thức bị ẩn</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Đăng nhập tài khoản Food để mở khóa toàn bộ giá trị dinh dưỡng, kalo, công thức nấu và lên lịch.
              </p>
              <button
                type="button"
                onClick={onRequireAuth}
                className="w-full py-1.5 px-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3 h-3 text-amber-600" />
                <span>Đăng nhập để xem đầy đủ</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2">
        {isAuthenticated ? (
          <>
            <button
              type="button"
              onClick={() => setShowSteps(!showSteps)}
              className="text-xs font-semibold text-stone-700 hover:text-amber-700 flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-white transition-colors cursor-pointer"
            >
              {showSteps ? (
                <>
                  Thu gọn <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <ChefHat className="w-3.5 h-3.5 text-amber-600" />
                  Xem cách nấu <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              {/* Nút Lên lịch món này */}
              {onScheduleMeal && (
                <button
                  type="button"
                  onClick={() => onScheduleMeal(dish)}
                  className="text-xs text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  title="Lên lịch nấu món này vào thực đơn"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lên lịch</span>
                </button>
              )}

              {/* Nút đánh dấu đã nấu món này */}
              {onMarkCooked && (
                <button
                  type="button"
                  onClick={() => onMarkCooked(dish.id)}
                  className="text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  title="Ghi nhận vừa nấu món này"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>+1 Nấu</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 py-1 px-2 rounded hover:bg-stone-200/50 transition-colors cursor-pointer"
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
          </>
        ) : (
          <div className="w-full flex items-center justify-between text-xs text-stone-400 py-1">
            <span>Yêu cầu đăng nhập</span>
            <button
              type="button"
              onClick={onRequireAuth}
              className="text-amber-700 hover:underline font-semibold cursor-pointer"
            >
              Mở khóa ngay →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
