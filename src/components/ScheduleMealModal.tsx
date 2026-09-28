import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Flame, Check, Plus } from 'lucide-react';
import { Dish, MealSlot } from '../types/food';
import { formatVND } from '../utils/matching';

interface ScheduleMealModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSchedule: (dish: Dish, date: string, slot: MealSlot, notes?: string) => void;
}

const MEAL_SLOTS: { id: MealSlot; label: string; icon: string; time: string }[] = [
  { id: 'breakfast', label: 'Bữa Sáng', icon: '🌅', time: '6:30 - 8:30' },
  { id: 'lunch', label: 'Bữa Trưa', icon: '☀️', time: '11:30 - 13:00' },
  { id: 'dinner', label: 'Bữa Tối', icon: '🌙', time: '18:00 - 20:00' },
];

export const ScheduleMealModal: React.FC<ScheduleMealModalProps> = ({
  dish,
  isOpen,
  onClose,
  onConfirmSchedule,
}) => {
  // Default to today's date formatted as YYYY-MM-DD
  const getTodayStr = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());
  const [selectedSlot, setSelectedSlot] = useState<MealSlot>('lunch');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen || !dish) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSchedule(dish, selectedDate, selectedSlot, notes);
    onClose();
  };

  // Quick dates (Hôm nay, Ngày mai, Ngày kia)
  const getQuickDates = () => {
    const dates = [];
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`;
      let label = i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : `Thứ ${d.getDay() === 0 ? 'CN' : d.getDay() + 1}`;
      dates.push({ str, label, displayDate: `${d.getDate()}/${d.getMonth() + 1}` });
    }
    return dates;
  };

  const quickDates = getQuickDates();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Lên Lịch Nấu Ăn</h3>
              <p className="text-xs text-stone-500">Xếp món vào lịch thực đơn theo ngày</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected dish overview */}
        <div className="mb-5 p-3.5 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-stone-900">{dish.name}</h4>
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span className="font-semibold text-amber-700">~{formatVND(dish.estimatedCost)}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-amber-800 font-medium">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                {dish.nutrition.calories} Kcal
              </span>
              <span>·</span>
              <span>{dish.cookingTimeMinutes}p</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick date chips */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Chọn ngày nấu:
            </label>
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {quickDates.map((item) => (
                <button
                  key={item.str}
                  type="button"
                  onClick={() => setSelectedDate(item.str)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                    selectedDate === item.str
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs font-bold'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  <span className="block text-[11px] leading-tight">{item.label}</span>
                  <span className="block text-[10px] opacity-80">{item.displayDate}</span>
                </button>
              ))}
            </div>

            {/* Custom date picker */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-none"
            />
          </div>

          {/* Meal Slot Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Chọn bữa ăn trong ngày:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {MEAL_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20 font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="text-base">{slot.icon}</span>
                    <span className="text-xs font-semibold">{slot.label}</span>
                    <span className="text-[10px] text-stone-400">{slot.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Ghi chú thêm (tùy chọn):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ví dụ: Ăn chung với Long, nấu thêm cơm..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Lưu vào lịch ăn uống</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
