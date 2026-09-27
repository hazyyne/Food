import React, { useState } from 'react';
import { Heart, Trash2, ShoppingBag, Clock, ChefHat, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Dish } from '../types/food';
import { formatVND } from '../utils/matching';

interface FavoritesListProps {
  favorites: Dish[];
  onRemoveFavorite: (dishId: string) => void;
  onClearAll: () => void;
  onOpenShoppingList: () => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onOpenShoppingList,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null);

  const filtered = favorites.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.mainIngredients.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalCost = favorites.reduce((sum, item) => sum + item.estimatedCost, 0);

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
          <Heart className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-stone-900">Chưa có món ăn nào được lưu</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Khi xem gợi ý món ăn, hãy bấm vào biểu tượng trái tim để lưu lại những món bạn thích hoặc muốn nấu trong tuần nhé!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top summary bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900">Danh Sách Món Đã Lưu</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {favorites.length} món
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tổng chi phí dự kiến nếu nấu tất cả: <span className="font-bold text-amber-700">{formatVND(totalCost)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenShoppingList}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Tạo danh sách đi chợ ({favorites.length})</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="px-3 py-2 text-stone-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-medium rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa tất cả</span>
          </button>
        </div>
      </div>

      {/* Search inside favorites if more than 3 dishes */}
      {favorites.length > 3 && (
        <div className="max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm trong món đã lưu..."
            className="w-full px-4 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:border-amber-500 outline-none"
          />
        </div>
      )}

      {/* Grid of saved dishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((dish) => {
          const isExpanded = expandedDishId === dish.id;

          return (
            <div
              key={dish.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs text-stone-400 block mb-1">
                      {dish.category} · {dish.cookingTimeMinutes} phút
                    </span>
                    <h4 className="text-base font-bold text-stone-900 leading-snug">
                      {dish.name}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveFavorite(dish.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Bỏ lưu món này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Chi phí ước tính */}
                <div className="mt-3 flex items-baseline justify-between border-t border-stone-100 pt-2.5">
                  <span className="text-xs text-stone-500">Chi phí ước tính:</span>
                  <span className="text-base font-extrabold text-amber-700 tabular-nums">
                    ~{formatVND(dish.estimatedCost)}
                  </span>
                </div>

                {/* Mô tả ngắn */}
                <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {dish.shortDescription}
                </p>

                {/* Nguyên liệu chính */}
                <div className="mt-3 bg-stone-50 rounded-xl p-2.5 border border-stone-100 text-xs">
                  <span className="font-semibold text-stone-700 block mb-1">Nguyên liệu:</span>
                  <div className="text-stone-600 text-[11px] leading-relaxed">
                    {dish.mainIngredients.join(' · ')}
                  </div>
                </div>

                {/* Expand cooking steps if clicked */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-700">
                    <span className="font-bold text-stone-800 block text-xs">Cách nấu:</span>
                    {dish.steps.map((st, i) => (
                      <p key={i} className="leading-snug">
                        <strong className="text-amber-800">{i + 1}.</strong> {st}
                      </p>
                    ))}
                    {dish.tip && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg mt-2">
                        💡 <strong>Mẹo:</strong> {dish.tip}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setExpandedDishId(isExpanded ? null : dish.id)}
                  className="text-xs font-semibold text-stone-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? (
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

                <span className="text-[11px] text-stone-400">
                  {dish.servings}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
