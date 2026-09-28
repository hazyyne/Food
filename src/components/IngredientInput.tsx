import React, { useRef } from 'react';
import { Search, X, Sparkles, Plus, Wallet, Lock, LogIn } from 'lucide-react';
import { POPULAR_INGREDIENTS } from '../data/recipes';
import { BudgetFilter } from '../types/food';

interface IngredientInputProps {
  ingredientText: string;
  onIngredientChange: (text: string) => void;
  onSubmit: () => void;
  budgetFilter: BudgetFilter;
  onBudgetFilterChange: (budget: BudgetFilter) => void;
  onRandomPick: () => void;
  selectedTagList: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

const BUDGET_OPTIONS: { id: BudgetFilter; label: string; sub: string }[] = [
  { id: 'all', label: 'Tất cả mức giá', sub: 'Mọi món ăn' },
  { id: 'under20k', label: 'Dưới 20.000đ', sub: 'Tiết kiệm cuối tháng' },
  { id: '20k-40k', label: '20.000đ - 40.000đ', sub: 'Bình dân đủ chất' },
  { id: 'above40k', label: 'Trên 40.000đ', sub: 'Tự thưởng cuối tuần' },
];

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredientText,
  onIngredientChange,
  onSubmit,
  budgetFilter,
  onBudgetFilterChange,
  onRandomPick,
  selectedTagList,
  onToggleTag,
  onClear,
  isAuthenticated,
  onRequireAuth,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isAuthenticated) {
        onRequireAuth();
        return;
      }
      onSubmit();
    }
  };

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    onSubmit();
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 md:p-7 space-y-5">
      {/* Input row */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="ingredient-input" className="block text-xs font-bold text-stone-500 uppercase tracking-wider">
            Hôm nay trong tủ lạnh hoặc phòng trọ bạn có gì?
          </label>
          {!isAuthenticated && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Đăng nhập để tìm theo nguyên liệu
            </span>
          )}
        </div>
        
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-stone-400">
            <Search className="w-5 h-5" />
          </div>

          <input
            id="ingredient-input"
            ref={inputRef}
            type="text"
            value={ingredientText}
            onChange={(e) => onIngredientChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập nguyên liệu: trứng, cà chua, đậu phụ, mì tôm, thịt băm..."
            className="w-full pl-12 pr-28 py-3.5 md:py-4 bg-stone-50 hover:bg-stone-50/80 focus:bg-white text-stone-900 text-sm md:text-base rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-stone-400"
          />

          {ingredientText && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-24 p-2 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              title="Xóa trắng"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Nút "Ok": Nhập nguyên liệu → bấm Ok → hiện 3 món */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute right-2 top-2 bottom-2 px-5 md:px-7 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm md:text-base rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Ok</span>
          </button>
        </div>
      </div>

      {/* CÁC NGUYÊN LIỆU DỄ KIẾM: "Khi đăng nhập thì mới hiện những gợi ý món ăn, các nguyên liệu dễ kiếm" */}
      {isAuthenticated ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500">
              Nguyên liệu sinh viên dễ kiếm (chạm để chọn nhanh):
            </span>
            {selectedTagList.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-xs text-amber-700 hover:underline font-medium cursor-pointer"
              >
                Bỏ chọn tất cả ({selectedTagList.length})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {POPULAR_INGREDIENTS.map((item) => {
              const isSelected = selectedTagList.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onToggleTag(item.value)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/20'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900 border border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  {isSelected ? (
                    <X className="w-3.5 h-3.5 ml-0.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Khi chưa đăng nhập: Banner khuyến khích đăng nhập để mở khóa danh sách nguyên liệu dễ kiếm */
        <div className="p-3.5 bg-stone-50 rounded-2xl border border-dashed border-stone-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Danh mục nguyên liệu dễ kiếm & tính năng gợi ý theo tủ lạnh</strong> chỉ mở khi bạn đăng nhập tài khoản.
            </span>
          </div>
          <button
            type="button"
            onClick={onRequireAuth}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập ngay</span>
          </button>
        </div>
      )}

      {/* Budget Filter & Random Pick action */}
      {isAuthenticated && (
        <div className="pt-3 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Budget segment */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 shrink-0">
              <Wallet className="w-4 h-4 text-amber-600" />
              <span>Ngân sách:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1 bg-stone-100/80 p-1 rounded-xl">
              {BUDGET_OPTIONS.map((opt) => {
                const active = budgetFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onBudgetFilterChange(opt.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      active
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title={opt.sub}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Random button */}
          <button
            type="button"
            onClick={onRandomPick}
            className="text-xs font-semibold text-stone-700 hover:text-amber-800 bg-stone-100 hover:bg-amber-50 border border-stone-200 hover:border-amber-200 px-3.5 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Bốc thăm ngẫu nhiên 3 món</span>
          </button>
        </div>
      )}
    </div>
  );
};
