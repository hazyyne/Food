import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Heart,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info,
  DollarSign,
  ShoppingBag,
  ChefHat,
  ArrowRight,
  Smile
} from 'lucide-react';
import { Dish, BudgetFilter } from './types/food';
import { findMatchingDishes, formatVND } from './utils/matching';
import { IngredientInput } from './components/IngredientInput';
import { DishCard } from './components/DishCard';
import { FavoritesList } from './components/FavoritesList';
import { ShoppingListModal } from './components/ShoppingListModal';
import { StudentTipsModal } from './components/StudentTipsModal';

const FAVORITES_STORAGE_KEY = 'food_student_favorite_recipes_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'suggest' | 'favorites'>('suggest');
  const [ingredientText, setIngredientText] = useState<string>('trứng, cà chua');
  const [selectedTags, setSelectedTags] = useState<string[]>(['trứng', 'cà chua']);
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>('all');
  const [seedOffset, setSeedOffset] = useState<number>(0);

  // 3 Suggested dishes
  const [suggestedDishes, setSuggestedDishes] = useState<Dish[]>([]);
  const [totalMatchesCount, setTotalMatchesCount] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<Dish[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Modals
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Initial recommendation run on mount
  useEffect(() => {
    performMatching(ingredientText, budgetFilter, 0);
  }, []);

  const performMatching = (inputStr: string, budget: BudgetFilter, offset: number) => {
    const result = findMatchingDishes(inputStr, budget, offset);
    setSuggestedDishes(result.dishes);
    setTotalMatchesCount(result.totalMatchesCount);
    setHasSearched(true);
  };

  // User clicks "Ok" button (Nhập nguyên liệu → bấm Ok → hiện 3 món)
  const handleSubmitOk = () => {
    setSeedOffset(0);
    performMatching(ingredientText, budgetFilter, 0);
    setActiveTab('suggest');
  };

  // Roll next 3 dishes (Đổi 3 món khác)
  const handleRollAnotherThree = () => {
    const nextOffset = seedOffset + 1;
    setSeedOffset(nextOffset);
    performMatching(ingredientText, budgetFilter, nextOffset);
  };

  // Random pick 3 dishes (Bốc thăm ngẫu nhiên)
  const handleRandomPick = () => {
    setIngredientText('');
    setSelectedTags([]);
    const randomOffset = Math.floor(Math.random() * 20);
    setSeedOffset(randomOffset);
    performMatching('', budgetFilter, randomOffset);
    setActiveTab('suggest');
  };

  // Tag click handler
  const handleToggleTag = (tag: string) => {
    let nextTags: string[];
    if (selectedTags.includes(tag)) {
      nextTags = selectedTags.filter((t) => t !== tag);
    } else {
      nextTags = [...selectedTags, tag];
    }
    setSelectedTags(nextTags);
    const newText = nextTags.join(', ');
    setIngredientText(newText);
  };

  const handleClearAll = () => {
    setIngredientText('');
    setSelectedTags([]);
  };

  const handleBudgetChange = (newBudget: BudgetFilter) => {
    setBudgetFilter(newBudget);
    performMatching(ingredientText, newBudget, seedOffset);
  };

  // Toggle favorite dish
  const handleToggleFavorite = (dish: Dish) => {
    setFavorites((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        return prev.filter((d) => d.id !== dish.id);
      } else {
        return [dish, ...prev];
      }
    });
  };

  const handleRemoveFavorite = (dishId: string) => {
    setFavorites((prev) => prev.filter((d) => d.id !== dishId));
  };

  const handleClearAllFavorites = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả món đã lưu không?')) {
      setFavorites([]);
    }
  };

  // Estimated combined cost for the 3 suggested dishes
  const totalSuggestedCost = suggestedDishes.reduce(
    (sum, dish) => sum + dish.estimatedCost,
    0
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between">
      {/* 1. Header (Following the Top Bar Contract: 3 zones, single text brand) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('suggest');
              }}
              className="text-xl font-extrabold tracking-tight text-stone-900 hover:text-amber-700 transition-colors"
            >
              Food
            </a>
            <span className="hidden sm:inline text-xs text-stone-400 font-medium border-l border-stone-200 pl-2.5">
              Hôm Nay Nấu Gì?
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('suggest')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'suggest'
                  ? 'bg-amber-50 text-amber-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Gợi ý 3 món
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-rose-50 text-rose-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-400'
                }`}
              />
              <span>Món đã lưu</span>
              {favorites.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsTipsOpen(true)}
              className="hidden md:flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Mẹo sinh viên</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action / Quick Shopping Button */}
          <div className="flex items-center gap-2">
            {favorites.length > 0 ? (
              <button
                type="button"
                onClick={() => setIsShoppingListOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Đi chợ</span>
                <span>({favorites.length})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsTipsOpen(true)}
                className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                title="Mẹo sinh viên"
              >
                <BookOpen className="w-5 h-5 text-amber-600" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex-1 space-y-8">
        {activeTab === 'suggest' ? (
          <>
            {/* Hero / Value Banner for Students */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white p-6 md:p-8 shadow-sm">
              <div className="relative z-10 max-w-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-200 text-xs font-medium tracking-wide">
                  <ChefHat className="w-4 h-4" />
                  <span>Dành riêng cho sinh viên & người nấu ăn tiết kiệm</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  Không biết hôm nay nấu gì? <br className="hidden sm:inline" />
                  <span className="text-amber-300">Nhập nguyên liệu, có ngay 3 món ngon!</span>
                </h1>
                <p className="text-stone-200 text-xs md:text-sm leading-relaxed pt-1">
                  Chỉ cần nhập những thứ bạn đang có sẵn trong tủ lạnh (trứng, cà chua, đậu phụ, mì tôm...). Ứng dụng sẽ tính toán và gợi ý <strong>đúng 3 món ăn chuẩn kinh tế</strong>, kèm chi phí ước tính chi tiết.
                </p>
              </div>

              {/* Decorative culinary texture */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:flex items-center justify-end pr-8">
                <UtensilsCrossed className="w-64 h-64 text-white" />
              </div>
            </div>

            {/* Input Component: Nhập nguyên liệu → bấm Ok → hiện 3 món */}
            <section aria-labelledby="input-section-title">
              <h2 id="input-section-title" className="sr-only">
                Nhập nguyên liệu nấu ăn
              </h2>
              <IngredientInput
                ingredientText={ingredientText}
                onIngredientChange={(text) => setIngredientText(text)}
                onSubmit={handleSubmitOk}
                budgetFilter={budgetFilter}
                onBudgetFilterChange={handleBudgetChange}
                onRandomPick={handleRandomPick}
                selectedTagList={selectedTags}
                onToggleTag={handleToggleTag}
                onClear={handleClearAll}
              />
            </section>

            {/* 3 Dishes Result Section */}
            <section aria-labelledby="results-title" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="results-title" className="text-xl font-bold text-stone-900 tracking-tight">
                      3 Món Ăn Phù Hợp Nhất Hôm Nay
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      Gợi ý 3 món
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Tổng chi phí ước tính cả 3 món:{' '}
                    <strong className="text-amber-700 font-bold">~{formatVND(totalSuggestedCost)}</strong>{' '}
                    (Có thể nấu làm bữa chính + bữa phụ rất tiết kiệm)
                  </p>
                </div>

                {/* Roll another 3 dishes button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleRollAnotherThree}
                    className="min-h-[44px] px-4 py-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-stone-300 text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Đổi 3 món khác</span>
                  </button>
                </div>
              </div>

              {/* 3 Dishes Cards Grid */}
              {suggestedDishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {suggestedDishes.map((dish, index) => {
                    const isFav = favorites.some((d) => d.id === dish.id);
                    return (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        index={index}
                        isFavorite={isFav}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center space-y-3">
                  <p className="text-sm text-stone-600">
                    Không tìm thấy món nào với nguyên liệu bạn đã nhập.
                  </p>
                  <button
                    type="button"
                    onClick={handleRandomPick}
                    className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
                  >
                    Bốc thăm ngẫu nhiên 3 món ngon
                  </button>
                </div>
              )}

              {/* Student Economics Bar & Next Steps */}
              <div className="mt-8 bg-stone-100/70 border border-stone-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    Chi phí được ước lượng dựa trên thời giá thực tế tại các chợ sinh viên & siêu thị tiện lợi.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTipsOpen(true)}
                  className="text-amber-800 font-semibold hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Xem mẹo đi chợ & nấu ăn rẻ hơn nữa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>
          </>
        ) : (
          /* Favorites Tab (Món đã lưu) */
          <section aria-labelledby="favorites-heading">
            <h2 id="favorites-heading" className="sr-only">
              Danh sách món đã lưu
            </h2>
            <FavoritesList
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
              onClearAll={handleClearAllFavorites}
              onOpenShoppingList={() => setIsShoppingListOpen(true)}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800">Food</span>
            <span aria-hidden="true">·</span>
            <span>Ứng dụng gợi ý món ăn chuẩn kinh tế sinh viên</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTipsOpen(true)}
              className="hover:text-amber-700 transition-colors"
            >
              Cẩm nang sinh viên
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('favorites');
                if (favorites.length > 0) setIsShoppingListOpen(true);
              }}
              className="hover:text-amber-700 transition-colors"
            >
              Danh sách đi chợ
            </button>
          </div>
        </div>
      </footer>

      {/* Shopping List Modal */}
      <ShoppingListModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        dishes={favorites}
      />

      {/* Student Tips & Secrets Modal */}
      <StudentTipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />
    </div>
  );
}
