import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Flame,
  Clock,
  Sparkles,
  ShoppingBag,
  Lock,
  LogIn,
  CheckCircle2,
  Activity,
  Layers
} from 'lucide-react';
import { ScheduledMeal, MealSlot, Dish } from '../types/food';
import { formatVND } from '../utils/matching';
import { RECIPES_DATABASE } from '../data/recipes';

interface MealCalendarViewProps {
  scheduledMeals: ScheduledMeal[];
  onRemoveMeal: (mealId: string) => void;
  onOpenScheduleForDish: (dish: Dish, preselectedSlot?: MealSlot) => void;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
  onMarkCooked?: (dishId: string) => void;
  onOpenWeeklyShoppingList: (meals: ScheduledMeal[]) => void;
}

const DAYS_OF_WEEK = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export const MealCalendarView: React.FC<MealCalendarViewProps> = ({
  scheduledMeals,
  onRemoveMeal,
  onOpenScheduleForDish,
  isAuthenticated,
  onRequireAuth,
  onMarkCooked,
  onOpenWeeklyShoppingList,
}) => {
  // Current active date (YYYY-MM-DD)
  const getTodayStr = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate()
    ).padStart(2, '0')}`;
  };

  const [activeDateStr, setActiveDateStr] = useState<string>(getTodayStr());
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [quickAddSlot, setQuickAddSlot] = useState<MealSlot | null>(null);

  // Compute the 7 days of the current viewed week
  const getWeekDays = () => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + weekOffset * 7);

    // Get Monday of this week (Vietnam week starts on Monday)
    const day = baseDate.getDay();
    const diffToMonday = baseDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(baseDate.setDate(diffToMonday));

    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`;
      week.push({
        dateObj: d,
        dateStr: str,
        dayName: DAYS_OF_WEEK[d.getDay()],
        dayNumber: d.getDate(),
        monthNumber: d.getMonth() + 1,
        isToday: str === getTodayStr(),
      });
    }
    return week;
  };

  const weekDays = getWeekDays();

  // Meals for the selected day
  const mealsForActiveDate = scheduledMeals.filter((m) => m.date === activeDateStr);

  // Aggregate daily nutrition and cost
  const dailyCalories = mealsForActiveDate.reduce((sum, m) => sum + (m.calories || 0), 0);
  const dailyCost = mealsForActiveDate.reduce((sum, m) => sum + (m.dishCost || 0), 0);
  const dailyProtein = mealsForActiveDate.reduce(
    (sum, m) => sum + (m.dishData?.nutrition.protein || m.protein || 0),
    0
  );
  const dailyCarbs = mealsForActiveDate.reduce(
    (sum, m) => sum + (m.dishData?.nutrition.carbs || m.carbs || 0),
    0
  );
  const dailyFat = mealsForActiveDate.reduce(
    (sum, m) => sum + (m.dishData?.nutrition.fat || m.fat || 0),
    0
  );

  // Weekly meals for quick shopping list
  const activeWeekMealStrings = new Set(weekDays.map((d) => d.dateStr));
  const weeklyMeals = scheduledMeals.filter((m) => activeWeekMealStrings.has(m.date));
  const weeklyCost = weeklyMeals.reduce((sum, m) => sum + m.dishCost, 0);

  // Slots helper
  const getMealsForSlot = (slot: MealSlot) => {
    return mealsForActiveDate.filter((m) => m.mealSlot === slot);
  };

  const slotConfigs: { slot: MealSlot; title: string; icon: string; time: string }[] = [
    { slot: 'breakfast', title: 'Bữa Sáng', icon: '🌅', time: 'Nhanh gọn, ấm bụng' },
    { slot: 'lunch', title: 'Bữa Trưa', icon: '☀️', time: 'No lâu, tiếp năng lượng' },
    { slot: 'dinner', title: 'Bữa Tối', icon: '🌙', time: 'Cơm nóng thư giãn sau giờ học' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <CalendarIcon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-stone-900">
            Lịch Ăn Uống & Theo Dõi Kalo Sinh Viên
          </h3>
          <p className="text-xs md:text-sm text-stone-500 leading-relaxed max-w-lg mx-auto">
            Tính năng Lên lịch thực đơn theo tuần, tính toán tổng lượng Calorie (Kalo) nạp vào mỗi ngày và ước tính tiền chợ hàng tuần chỉ khả dụng khi bạn đăng nhập tài khoản.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onRequireAuth}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập để sử dụng Lịch ăn uống</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Controls & Navigation Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900">Lịch Thực Đơn & Theo Dõi Kalo</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                Thực đơn tuần
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Lên kế hoạch ăn uống cả tuần, cân bằng dinh dưỡng và kiểm soát chi tiêu sinh viên
            </p>
          </div>
        </div>

        {/* Action Buttons: Week Nav & Weekly Shopping */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-stone-100 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="p-1.5 hover:bg-white hover:text-stone-900 text-stone-600 rounded-lg transition-colors cursor-pointer"
              title="Tuần trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setWeekOffset(0);
                setActiveDateStr(getTodayStr());
              }}
              className="px-2.5 py-1 font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
            >
              Tuần này
            </button>
            <button
              type="button"
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="p-1.5 hover:bg-white hover:text-stone-900 text-stone-600 rounded-lg transition-colors cursor-pointer"
              title="Tuần kế tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {weeklyMeals.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenWeeklyShoppingList(weeklyMeals)}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Đi chợ tuần ({weeklyMeals.length} bữa · ~{formatVND(weeklyCost)})</span>
            </button>
          )}
        </div>
      </div>

      {/* 7-Day Interactive Week Strip */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {weekDays.map((dayItem) => {
          const isSelected = activeDateStr === dayItem.dateStr;
          const dayMeals = scheduledMeals.filter((m) => m.date === dayItem.dateStr);
          const dayCals = dayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);

          return (
            <button
              key={dayItem.dateStr}
              type="button"
              onClick={() => setActiveDateStr(dayItem.dateStr)}
              className={`p-2 sm:p-3.5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between min-h-[90px] sm:min-h-[105px] cursor-pointer ${
                isSelected
                  ? 'bg-amber-600 border-amber-600 text-white shadow-md ring-2 ring-amber-600/20'
                  : dayItem.isToday
                  ? 'bg-amber-50/70 border-amber-300 text-stone-900'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <span
                className={`text-[10px] sm:text-xs font-semibold ${
                  isSelected ? 'text-amber-100' : 'text-stone-400'
                }`}
              >
                {dayItem.dayName}
              </span>

              <div className="my-1">
                <span className="text-base sm:text-xl font-extrabold block leading-tight">
                  {dayItem.dayNumber}
                </span>
                <span className="text-[9px] opacity-75">T{dayItem.monthNumber}</span>
              </div>

              {/* Meals count or calories badge */}
              <div className="w-full">
                {dayMeals.length > 0 ? (
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded-md block truncate ${
                      isSelected
                        ? 'bg-amber-700/80 text-white'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {dayMeals.length} bữa · {dayCals}k
                  </span>
                ) : (
                  <span
                    className={`text-[9px] sm:text-[10px] block opacity-40 ${
                      isSelected ? 'text-white' : 'text-stone-400'
                    }`}
                  >
                    Trống
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Nutrition & Cost Summary Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Dinh Dưỡng Trong Ngày:
            </span>
            <span className="text-xs font-semibold text-stone-300">
              {weekDays.find((d) => d.dateStr === activeDateStr)?.dayName} ({activeDateStr})
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {dailyCalories}
            </span>
            <span className="text-sm text-amber-300 font-semibold">Kalo (Kcal)</span>
            <span className="text-stone-400 text-xs ml-3 border-l border-stone-700 pl-3">
              Chi phí dự kiến: <strong className="text-amber-400">~{formatVND(dailyCost)}</strong>
            </span>
          </div>
        </div>

        {/* Macro breakdown: Protein, Carbs, Fat */}
        <div className="grid grid-cols-3 gap-3 bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60 text-center shrink-0">
          <div className="px-2">
            <span className="text-[10px] text-stone-400 block font-medium">Chất Đạm (Protein)</span>
            <span className="text-sm font-bold text-emerald-400">{dailyProtein.toFixed(1)}g</span>
          </div>
          <div className="px-2 border-x border-stone-700">
            <span className="text-[10px] text-stone-400 block font-medium">Tinh Bột (Carbs)</span>
            <span className="text-sm font-bold text-amber-400">{dailyCarbs.toFixed(1)}g</span>
          </div>
          <div className="px-2">
            <span className="text-[10px] text-stone-400 block font-medium">Chất Béo (Fat)</span>
            <span className="text-sm font-bold text-rose-400">{dailyFat.toFixed(1)}g</span>
          </div>
        </div>
      </div>

      {/* 3 Meal Slots of the Selected Day */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {slotConfigs.map(({ slot, title, icon, time }) => {
          const slotMeals = getMealsForSlot(slot);
          const slotCals = slotMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
          const slotCost = slotMeals.reduce((sum, m) => sum + (m.dishCost || 0), 0);

          return (
            <div
              key={slot}
              className="bg-white rounded-3xl border border-stone-200/90 p-5 flex flex-col justify-between shadow-xs hover:border-amber-300 transition-all min-h-[220px]"
            >
              <div>
                {/* Slot Header */}
                <div className="flex items-start justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{title}</h4>
                      <span className="text-[10px] text-stone-400 block">{time}</span>
                    </div>
                  </div>

                  {slotMeals.length > 0 && (
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-700 block">
                        ~{formatVND(slotCost)}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {slotCals} Kcal
                      </span>
                    </div>
                  )}
                </div>

                {/* List of meals in this slot */}
                <div className="py-3 space-y-2.5">
                  {slotMeals.length > 0 ? (
                    slotMeals.map((meal) => (
                      <div
                        key={meal.id}
                        className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between gap-2.5 group"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <h5 className="text-xs font-bold text-stone-900 truncate">
                            {meal.dishName}
                          </h5>
                          <div className="flex items-center gap-2 text-[10px] text-stone-500">
                            <span className="text-amber-700 font-semibold">
                              ~{formatVND(meal.dishCost)}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-0.5 text-amber-800">
                              <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              {meal.calories} Kcal
                            </span>
                          </div>
                          {meal.notes && (
                            <p className="text-[10px] text-stone-400 italic line-clamp-1">
                              "{meal.notes}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {onMarkCooked && (
                            <button
                              type="button"
                              onClick={() => onMarkCooked(meal.dishId)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="Đánh dấu vừa nấu món này"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onRemoveMeal(meal.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Xóa khỏi lịch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-stone-400">
                      Chưa có món nào cho {title.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Add dish button for this slot */}
              <button
                type="button"
                onClick={() => setQuickAddSlot(quickAddSlot === slot ? null : slot)}
                className="w-full py-2 px-3 border border-dashed border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 rounded-xl text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Thêm món vào {title}</span>
              </button>

              {/* Quick dish selector dropdown if opened */}
              {quickAddSlot === slot && (
                <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                    <span>Chọn nhanh món ngon:</span>
                    <button
                      type="button"
                      onClick={() => setQuickAddSlot(null)}
                      className="text-stone-400 hover:text-stone-600"
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                    {RECIPES_DATABASE.slice(0, 10).map((recipe) => (
                      <button
                        key={recipe.id}
                        type="button"
                        onClick={() => {
                          onOpenScheduleForDish(recipe, slot);
                          setQuickAddSlot(null);
                        }}
                        className="w-full text-left p-2 bg-white hover:bg-amber-50 rounded-xl border border-stone-100 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer"
                      >
                        <span className="font-medium text-stone-800 truncate">{recipe.name}</span>
                        <div className="flex items-center gap-1 shrink-0 text-[11px] text-stone-500">
                          <span className="text-amber-700 font-semibold">
                            ~{formatVND(recipe.estimatedCost)}
                          </span>
                          <span>·</span>
                          <span>{recipe.nutrition.calories} Kcal</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
