import React, { useState } from 'react';
import {
  Heart,
  Trash2,
  ShoppingBag,
  ChefHat,
  ChevronDown,
  ChevronUp,
  Lock,
  Flame,
  CheckCircle2,
  CalendarPlus,
  Activity
} from 'lucide-react';
import { Dish } from '../types/food';
import { formatVND } from '../utils/matching';
import { getDishImage } from '../utils/dishImages';

interface FavoritesListProps {
  favorites: Dish[];
  onRemoveFavorite: (dishId: string) => void;
  onClearAll: () => void;
  onOpenShoppingList: () => void;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
  cookCounts?: Record<string, number>;
  onMarkCooked?: (dishId: string) => void;
  onScheduleMeal?: (dish: Dish) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onOpenShoppingList,
  isAuthenticated,
  onRequireAuth,
  cookCounts = {},
  onMarkCooked,
  onScheduleMeal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null);

  const filtered = favorites.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.mainIngredients.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalCost = favorites.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalCalories = favorites.reduce((sum, item) => sum + item.nutrition.calories, 0);

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
          <Heart className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-stone-900">Chưa có món ăn nào được lưu</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Khi xem các món ăn, hãy bấm vào biểu tượng trái tim để lưu lại những món bạn thích hoặc muốn nấu trong tuần nhé!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top summary bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900">Danh Sách Món Đã Lưu</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {favorites.length} món
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {isAuthenticated ? (
              <>
                Tổng chi phí: <strong className="text-amber-700">{formatVND(totalCost)}</strong>
                <span className="mx-2">·</span>
                Tổng năng lượng: <strong className="text-amber-800">{totalCalories} Kcal</strong>
              </>
            ) : (
              <span className="text-stone-400">
                Đăng nhập để xem tổng chi phí, kalo và công thức chi tiết
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenShoppingList}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
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
            placeholder="Tìm kiếm trong danh sách món đã lưu..."
            className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-200 rounded-2xl focus:border-amber-500 outline-none shadow-xs"
          />
        </div>
      )}

      {/* Grid of saved dishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dish) => {
          const isExpanded = expandedDishId === dish.id;
          const imageUrl = dish.image || getDishImage(dish.id, dish.category);
          const timesCooked = cookCounts[dish.id] || 0;

          return (
            <div
              key={dish.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all shadow-xs"
            >
              <div>
                {/* Image header */}
                <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                  <img
                    src={imageUrl}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                    {dish.category} · {dish.cookingTimeMinutes} phút
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveFavorite(dish.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 text-stone-500 hover:text-rose-600 hover:bg-white rounded-xl backdrop-blur-xs shadow-xs transition-colors cursor-pointer"
                    title="Bỏ lưu món này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs font-bold drop-shadow-sm">
                    {isAuthenticated ? (
                      <div className="flex items-center gap-2">
                        <span>~{formatVND(dish.estimatedCost)}</span>
                        <span>·</span>
                        <span className="text-amber-300 font-semibold">{dish.nutrition.calories} Kcal</span>
                      </div>
                    ) : (
                      <span className="text-[11px] font-normal text-amber-200 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Giá & Kalo ẩn
                      </span>
                    )}

                    {isAuthenticated && timesCooked > 0 && (
                      <span className="flex items-center gap-1 bg-amber-600/90 text-white px-2 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-xs">
                        <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                        Đã nấu {timesCooked} lần
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h4 className="text-base font-bold text-stone-900 leading-snug">
                    {dish.name}
                  </h4>

                  {/* Mô tả ngắn */}
                  <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dish.shortDescription}
                  </p>

                  {/* Dinh dưỡng & Nguyên liệu: Ẩn khi chưa đăng nhập */}
                  {isAuthenticated ? (
                    <>
                      {/* Macro Nutrition bar */}
                      <div className="mt-3 bg-stone-50 rounded-xl p-2 border border-stone-100 grid grid-cols-3 gap-1 text-center text-[10px]">
                        <div>
                          <span className="text-stone-400 block">Đạm</span>
                          <strong className="text-emerald-700">{dish.nutrition.protein}g</strong>
                        </div>
                        <div className="border-x border-stone-200">
                          <span className="text-stone-400 block">Tinh bột</span>
                          <strong className="text-amber-800">{dish.nutrition.carbs}g</strong>
                        </div>
                        <div>
                          <span className="text-stone-400 block">Chất béo</span>
                          <strong className="text-rose-700">{dish.nutrition.fat}g</strong>
                        </div>
                      </div>

                      {/* Nguyên liệu chính */}
                      <div className="mt-2.5 bg-stone-50 rounded-xl p-2.5 border border-stone-100 text-xs">
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
                    </>
                  ) : (
                    <div className="mt-3 p-2.5 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 font-medium flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3 text-amber-600" />
                        Nguyên liệu & công thức bị ẩn
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                {isAuthenticated ? (
                  <>
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

                    <div className="flex items-center gap-1.5">
                      {onScheduleMeal && (
                        <button
                          type="button"
                          onClick={() => onScheduleMeal(dish)}
                          className="text-[11px] text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer font-semibold"
                          title="Lên lịch nấu món này"
                        >
                          <CalendarPlus className="w-3 h-3 text-amber-700" />
                          <span>Lên lịch</span>
                        </button>
                      )}

                      {onMarkCooked && (
                        <button
                          type="button"
                          onClick={() => onMarkCooked(dish.id)}
                          className="text-[11px] text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer font-medium"
                          title="Ghi nhận vừa nấu món này"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>+1 Nấu</span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onRequireAuth}
                    className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
                  >
                    Đăng nhập để xem công thức →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
