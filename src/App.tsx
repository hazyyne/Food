import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Heart,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info,
  ShoppingBag,
  ChefHat,
  ArrowRight,
  LogIn,
  LogOut,
  Lock,
  Flame,
  CheckCircle2,
  Calendar as CalendarIcon,
  Activity,
  MapPin
} from 'lucide-react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  increment
} from 'firebase/firestore';
import { Dish, BudgetFilter, ScheduledMeal, MealSlot } from './types/food';
import { findMatchingDishes, formatVND } from './utils/matching';
import { RECIPES_DATABASE } from './data/recipes';
import { IngredientInput } from './components/IngredientInput';
import { DishCard } from './components/DishCard';
import { FavoritesList } from './components/FavoritesList';
import { ShoppingListModal } from './components/ShoppingListModal';
import { StudentTipsModal } from './components/StudentTipsModal';
import { AuthModal } from './components/AuthModal';
import { ScheduleMealModal } from './components/ScheduleMealModal';
import { MealCalendarView } from './components/MealCalendarView';
import { EatOutSlideBar } from './components/EatOutSlideBar';
import { DrinksSection } from './components/DrinksSection';
import { useAuth } from './contexts/AuthContext';
import { db } from './firebase';

const FAVORITES_STORAGE_KEY = 'food_student_favorite_recipes_v1';
const COOK_COUNTS_STORAGE_KEY = 'food_student_cook_counts_v1';
const SCHEDULED_MEALS_STORAGE_KEY = 'food_student_meal_schedules_v1';

export default function App() {
  const { currentUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'suggest' | 'calendar' | 'drinks' | 'favorites'>('suggest');
  const [ingredientText, setIngredientText] = useState<string>('trứng, cà chua');
  const [selectedTags, setSelectedTags] = useState<string[]>(['trứng', 'cà chua']);
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>('all');
  const [seedOffset, setSeedOffset] = useState<number>(0);

  // Suggested dishes for logged in users (matches ingredients)
  const [suggestedDishes, setSuggestedDishes] = useState<Dish[]>([]);
  const [totalMatchesCount, setTotalMatchesCount] = useState<number>(0);

  // Favorites state
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

  // Cook counts: Record<dishId, number>
  const [cookCounts, setCookCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(COOK_COUNTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {};
  });

  // Scheduled Meals Calendar State
  const [scheduledMeals, setScheduledMeals] = useState<ScheduledMeal[]>(() => {
    try {
      const saved = localStorage.getItem(SCHEDULED_MEALS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Modals & Schedule Modal state
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [shoppingListDishes, setShoppingListDishes] = useState<Dish[]>([]);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Schedule dish modal
  const [dishToSchedule, setDishToSchedule] = useState<Dish | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Slide Bar Ăn Ngoài & Quán Gần (Google Maps)
  const [isEatOutOpen, setIsEatOutOpen] = useState<boolean>(false);
  const [eatOutInitialTab, setEatOutInitialTab] = useState<'dishes' | 'places'>('dishes');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync cook counts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(COOK_COUNTS_STORAGE_KEY, JSON.stringify(cookCounts));
    } catch (e) {
      console.error('Failed to save cook counts', e);
    }
  }, [cookCounts]);

  // Sync scheduled meals to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SCHEDULED_MEALS_STORAGE_KEY, JSON.stringify(scheduledMeals));
    } catch (e) {
      console.error('Failed to save scheduled meals', e);
    }
  }, [scheduledMeals]);

  // Load / Sync favorites, cook history, and calendar schedules when user logs in
  useEffect(() => {
    async function loadCloudUserData() {
      if (!currentUser) return;
      try {
        // 1. Load favorites
        const favsRef = collection(db, 'users', currentUser.uid, 'favorites');
        const snapshot = await getDocs(favsRef);
        const cloudDishes: Dish[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.dishData) {
            cloudDishes.push(data.dishData as Dish);
          }
        });

        if (cloudDishes.length > 0) {
          setFavorites((prev) => {
            const map = new Map<string, Dish>();
            prev.forEach((d) => map.set(d.id, d));
            cloudDishes.forEach((d) => map.set(d.id, d));
            return Array.from(map.values());
          });
        } else if (favorites.length > 0) {
          const batch = writeBatch(db);
          favorites.forEach((d) => {
            const dRef = doc(db, 'users', currentUser.uid, 'favorites', d.id);
            batch.set(dRef, {
              dishId: d.id,
              userId: currentUser.uid,
              dishData: d,
              savedAt: new Date().toISOString(),
            });
          });
          await batch.commit();
        }

        // 2. Load cook history
        const cookRef = collection(db, 'users', currentUser.uid, 'cook_history');
        const cookSnap = await getDocs(cookRef);
        const cloudCookMap: Record<string, number> = {};
        cookSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && typeof data.count === 'number') {
            cloudCookMap[docSnap.id] = data.count;
          }
        });

        if (Object.keys(cloudCookMap).length > 0) {
          setCookCounts((prev) => ({
            ...prev,
            ...cloudCookMap,
          }));
        }

        // 3. Load meal schedules
        const schedRef = collection(db, 'users', currentUser.uid, 'meal_schedules');
        const schedSnap = await getDocs(schedRef);
        const cloudSchedules: ScheduledMeal[] = [];
        schedSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data) {
            cloudSchedules.push(data as ScheduledMeal);
          }
        });

        if (cloudSchedules.length > 0) {
          setScheduledMeals((prev) => {
            const map = new Map<string, ScheduledMeal>();
            prev.forEach((m) => map.set(m.id, m));
            cloudSchedules.forEach((m) => map.set(m.id, m));
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn('Could not sync cloud data:', err);
      }
    }

    loadCloudUserData();
  }, [currentUser]);

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
  };

  // User clicks "Ok" button (Nhập nguyên liệu → bấm Ok → hiện 3 món)
  const handleSubmitOk = () => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
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
  const handleToggleFavorite = async (dish: Dish) => {
    const exists = favorites.some((d) => d.id === dish.id);
    if (exists) {
      setFavorites((prev) => prev.filter((d) => d.id !== dish.id));
      showToast(`Đã bỏ lưu "${dish.name}"`);
      if (currentUser) {
        try {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', dish.id));
        } catch (err) {
          console.warn('Failed to delete favorite from firestore', err);
        }
      }
    } else {
      setFavorites((prev) => [dish, ...prev]);
      showToast(`Đã lưu "${dish.name}" vào danh sách yêu thích ❤️`);
      if (currentUser) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid, 'favorites', dish.id), {
            dishId: dish.id,
            userId: currentUser.uid,
            dishData: dish,
            savedAt: new Date().toISOString(),
          });
        } catch (err) {
          console.warn('Failed to save favorite to firestore', err);
        }
      }
    }
  };

  const handleRemoveFavorite = async (dishId: string) => {
    setFavorites((prev) => prev.filter((d) => d.id !== dishId));
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', dishId));
      } catch (err) {
        console.warn('Failed to delete favorite from firestore', err);
      }
    }
  };

  const handleClearAllFavorites = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả món đã lưu không?')) {
      const prevFavs = [...favorites];
      setFavorites([]);
      if (currentUser) {
        try {
          const batch = writeBatch(db);
          prevFavs.forEach((d) => {
            batch.delete(doc(db, 'users', currentUser.uid, 'favorites', d.id));
          });
          await batch.commit();
        } catch (err) {
          console.warn('Failed to clear firestore favorites', err);
        }
      }
    }
  };

  // Đánh dấu đã nấu món ăn này +1 lần
  const handleMarkCooked = async (dishId: string) => {
    const currentCount = cookCounts[dishId] || 0;
    const newCount = currentCount + 1;
    setCookCounts((prev) => ({
      ...prev,
      [dishId]: newCount,
    }));

    const dishFound = RECIPES_DATABASE.find((d) => d.id === dishId);
    showToast(`Chúc mừng bạn đã nấu món "${dishFound?.name || ''}" (${newCount} lần)! 🍳`);

    if (currentUser) {
      try {
        await setDoc(
          doc(db, 'users', currentUser.uid, 'cook_history', dishId),
          {
            dishId,
            dishName: dishFound?.name || '',
            count: increment(1),
            lastCookedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Failed to update cook count in firestore', err);
      }
    }
  };

  // Open schedule modal for a dish
  const handleOpenScheduleForDish = (dish: Dish) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setDishToSchedule(dish);
    setIsScheduleModalOpen(true);
  };

  // Confirm schedule meal
  const handleConfirmSchedule = async (
    dish: Dish,
    date: string,
    slot: MealSlot,
    notes?: string
  ) => {
    const scheduleId = `${date}_${slot}_${dish.id}_${Date.now()}`;
    const newMeal: ScheduledMeal = {
      id: scheduleId,
      date,
      mealSlot: slot,
      dishId: dish.id,
      dishName: dish.name,
      dishCost: dish.estimatedCost,
      calories: dish.nutrition.calories,
      protein: dish.nutrition.protein,
      carbs: dish.nutrition.carbs,
      fat: dish.nutrition.fat,
      dishData: dish,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    setScheduledMeals((prev) => [newMeal, ...prev]);
    showToast(`Đã thêm "${dish.name}" vào lịch ngày ${date}! 📅`);

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'meal_schedules', scheduleId), newMeal);
      } catch (err) {
        console.warn('Failed to save meal schedule to firestore', err);
      }
    }
  };

  // Remove scheduled meal
  const handleRemoveScheduledMeal = async (mealId: string) => {
    setScheduledMeals((prev) => prev.filter((m) => m.id !== mealId));
    showToast('Đã xóa món khỏi lịch.');

    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'meal_schedules', mealId));
      } catch (err) {
        console.warn('Failed to delete meal schedule from firestore', err);
      }
    }
  };

  // Open shopping list for weekly scheduled meals
  const handleOpenWeeklyShoppingList = (meals: ScheduledMeal[]) => {
    const dishesList: Dish[] = [];
    const seen = new Set<string>();

    meals.forEach((m) => {
      const d = m.dishData || RECIPES_DATABASE.find((item) => item.id === m.dishId);
      if (d && !seen.has(d.id)) {
        seen.add(d.id);
        dishesList.push(d);
      }
    });

    setShoppingListDishes(dishesList);
    setIsShoppingListOpen(true);
  };

  // Khi chưa đăng nhập: Hiển thị các món ăn mẫu để tham khảo (chỉ hiện tên + mô tả + ảnh; giá, nguyên liệu & dinh dưỡng bị ẩn)
  const guestSampleDishes = RECIPES_DATABASE.slice(0, 6);

  // Khi đã đăng nhập: Tính tổng chi phí & kalo của 3 món đang gợi ý
  const totalSuggestedCost = suggestedDishes.reduce(
    (sum, dish) => sum + dish.estimatedCost,
    0
  );
  const totalSuggestedCalories = suggestedDishes.reduce(
    (sum, dish) => sum + dish.nutrition.calories,
    0
  );

  // Thống kê những món đã từng nấu nhiều lần (chỉ khi đã đăng nhập)
  const cookedDishesList = Object.entries(cookCounts)
    .filter(([_, count]) => count > 0)
    .map(([dishId, count]) => {
      const dish = RECIPES_DATABASE.find((d) => d.id === dishId);
      return { dish, count };
    })
    .filter((item): item is { dish: Dish; count: number } => Boolean(item.dish))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Account Auth & Brand */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
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

          {/* Navigation Links: Gợi ý 3 món | Lịch ăn uống & Kalo | Món đã lưu */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('suggest')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'suggest'
                  ? 'bg-amber-50 text-amber-900'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Gợi ý 3 món
            </button>

            {/* Tab Lịch Thực Đơn & Kalo */}
            <button
              type="button"
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-amber-50 text-amber-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <CalendarIcon className="w-4 h-4 text-amber-600" />
              <span>Lịch ăn uống</span>
              {scheduledMeals.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {scheduledMeals.length}
                </span>
              )}
            </button>

            {/* Tab Đồ Uống: Tự làm & Quán gần */}
            <button
              type="button"
              onClick={() => setActiveTab('drinks')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'drinks'
                  ? 'bg-teal-50 text-teal-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span className="text-base">🥤</span>
              <span>Đồ uống</span>
              <span className="hidden xl:inline text-[10px] bg-teal-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                Tự pha/Quán
              </span>
            </button>

            {/* Tab Món đã lưu */}
            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
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
              <span className="hidden xs:inline">Món đã lưu</span>
              {favorites.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Nút mở Slide Bar Món ăn ngoài & Quán gần (Google Maps) */}
            <button
              type="button"
              onClick={() => {
                setEatOutInitialTab('dishes');
                setIsEatOutOpen(true);
              }}
              className="px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-orange-950 border border-orange-200/90 cursor-pointer shadow-2xs"
            >
              <span className="text-sm">🛵</span>
              <span className="hidden sm:inline">Ăn ngoài & Quán gần</span>
              <span className="sm:hidden">Ăn ngoài</span>
              <span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                Maps
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsTipsOpen(true)}
              className="hidden lg:flex items-center gap-1 px-2.5 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Mẹo sinh viên</span>
            </button>
          </nav>

          {/* Auth & Primary Actions */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-100 rounded-xl text-xs text-stone-700">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="avatar"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[100px] truncate font-medium">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}

            {favorites.length > 0 && currentUser && (
              <button
                type="button"
                onClick={() => {
                  setShoppingListDishes(favorites);
                  setIsShoppingListOpen(true);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Đi chợ</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex-1 space-y-8">
        {activeTab === 'suggest' ? (
          <>
            {/* Banner chào mừng & trạng thái */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white p-6 md:p-8 shadow-sm">
              <div className="relative z-10 max-w-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-200 text-xs font-medium tracking-wide">
                  <ChefHat className="w-4 h-4" />
                  <span>Dành riêng cho sinh viên & người nấu ăn tiết kiệm</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  {currentUser ? (
                    <>
                      Hôm nay bạn muốn nấu gì, <br className="hidden sm:inline" />
                      <span className="text-amber-300">
                        {currentUser.displayName || 'Bạn'} ơi?
                      </span>
                    </>
                  ) : (
                    <>
                      Không biết hôm nay nấu gì? <br className="hidden sm:inline" />
                      <span className="text-amber-300">Đăng nhập để nhận ngay 3 món ngon!</span>
                    </>
                  )}
                </h1>
                <p className="text-stone-200 text-xs md:text-sm leading-relaxed pt-1">
                  {currentUser
                    ? 'Nhập nguyên liệu có sẵn trong tủ lạnh hoặc phòng trọ. Ứng dụng sẽ gợi ý đúng 3 món ăn chuẩn kinh tế kèm chi phí, lượng Kalo và các chất dinh dưỡng chi tiết.'
                    : 'Xem trước các món ăn ngon mắt. Đăng nhập ngay để mở khóa tính năng gợi ý theo nguyên liệu có sẵn, xem giá tiền, lượng kalo nạp vào và lên lịch ăn uống.'}
                </p>

                {currentUser ? (
                  <div className="pt-2 flex items-center gap-2 text-xs text-amber-200 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Tài khoản: {currentUser.email} · Đã mở khóa Lịch ăn & Dinh dưỡng</span>
                  </div>
                ) : (
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setIsAuthOpen(true)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Đăng nhập ngay để xem giá & dinh dưỡng đầy đủ</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative culinary texture */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:flex items-center justify-end pr-8">
                <UtensilsCrossed className="w-64 h-64 text-white" />
              </div>
            </div>

            {/* Quick Banner: Gợi ý ăn ngoài khi không muốn nấu & Quán gần Google Maps */}
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="text-xl">🛵</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">Hôm nay lười nấu hay hỏng bếp?</span>
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Không cần dọn rửa
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Gợi ý bánh mì, cơm tấm, bún chả... & mở Google Maps dẫn đường đến quán sinh viên quanh đây!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setEatOutInitialTab('dishes');
                    setIsEatOutOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Xem món ăn ngoài</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('drinks')}
                  className="px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <span>🥤 Ô Đồ uống</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEatOutInitialTab('places');
                    setIsEatOutOpen(true);
                  }}
                  className="px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Maps</span>
                </button>
              </div>
            </div>

            {/* PHẦN 1: NHẬP NGUYÊN LIỆU VÀ GỢI Ý 3 MÓN (KHI ĐÃ ĐĂNG NHẬP) */}
            {currentUser ? (
              <>
                {/* Khu vực nhập nguyên liệu */}
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
                    isAuthenticated={true}
                    onRequireAuth={() => setIsAuthOpen(true)}
                  />
                </section>

                {/* Khu vực hiển thị 3 MÓN ĂN GỢI Ý */}
                <section aria-labelledby="results-title" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 id="results-title" className="text-xl font-bold text-stone-900 tracking-tight">
                          3 Món Ăn Phù Hợp Nhất Hôm Nay
                        </h2>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          Gợi ý 3 món chuẩn kinh tế
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 flex items-center gap-2 flex-wrap">
                        <span>
                          Tổng chi phí cả 3 món:{' '}
                          <strong className="text-amber-700 font-bold">~{formatVND(totalSuggestedCost)}</strong>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-amber-900 font-medium">
                          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          Tổng năng lượng: <strong>{totalSuggestedCalories} Kcal</strong>
                        </span>
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

                  {/* 3 Dishes Cards Grid with photos, calories & nutrition */}
                  {suggestedDishes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {suggestedDishes.map((dish, index) => {
                        const isFav = favorites.some((d) => d.id === dish.id);
                        const count = cookCounts[dish.id] || 0;
                        return (
                          <DishCard
                            key={dish.id}
                            dish={dish}
                            index={index}
                            isFavorite={isFav}
                            onToggleFavorite={handleToggleFavorite}
                            isAuthenticated={true}
                            onRequireAuth={() => setIsAuthOpen(true)}
                            cookCount={count}
                            onMarkCooked={handleMarkCooked}
                            onScheduleMeal={handleOpenScheduleForDish}
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
                        className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Bốc thăm ngẫu nhiên 3 món ngon
                      </button>
                    </div>
                  )}
                </section>

                {/* PHẦN ĐẶC BIỆT: "Những món ăn đã nấu mấy lần" (CHỈ HIỆN KHI ĐĂNG NHẬP) */}
                {cookedDishesList.length > 0 && (
                  <section aria-labelledby="cooked-history-title" className="space-y-4 pt-6 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                          <Flame className="w-4 h-4 fill-amber-600 text-amber-600" />
                        </div>
                        <div>
                          <h2 id="cooked-history-title" className="text-lg font-bold text-stone-900">
                            Nhật Ký Bếp: Những Món Bạn Đã Nấu
                          </h2>
                          <p className="text-xs text-stone-500">
                            Thống kê số lần bạn đã nấu từng món ăn tại phòng trọ
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                        {cookedDishesList.length} món đã nấu
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cookedDishesList.map(({ dish, count }) => (
                        <div
                          key={dish.id}
                          className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between gap-3 shadow-xs hover:border-amber-300 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                              <img
                                src={dish.image || ''}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                                {dish.name}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                                <span className="text-amber-700 font-semibold">
                                  ~{formatVND(dish.estimatedCost)}
                                </span>
                                <span>·</span>
                                <span>{dish.nutrition.calories} Kcal</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                              <Flame className="w-3 h-3 fill-amber-600 text-amber-600" />
                              {count} lần
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              /* PHẦN 2: KHI CHƯA ĐĂNG NHẬP: CHỈ HIỆN MÓN ĂN (CÔNG THỨC, NGUYÊN LIỆU, GIÁ TIỀN & KALO BỊ ẨN) */
              <section aria-labelledby="guest-preview-title" className="space-y-6">
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-700" />
                      <h2 id="guest-preview-title" className="text-base font-bold text-stone-900">
                        Bạn đang ở chế độ xem trước (Chưa đăng nhập)
                      </h2>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Để xem <strong>gợi ý 3 món ăn theo nguyên liệu trong tủ lạnh</strong>, <strong>lượng Kalo và dinh dưỡng</strong>, <strong>giá tiền ước tính</strong>, <strong>công thức nấu chi tiết</strong> và <strong>lên lịch thực đơn tuần</strong>, bạn vui lòng đăng nhập tài khoản.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAuthOpen(true)}
                    className="min-h-[44px] px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Đăng nhập để mở khóa đầy đủ</span>
                  </button>
                </div>

                {/* Input disabled / placeholder when logged out */}
                <div className="opacity-90">
                  <IngredientInput
                    ingredientText=""
                    onIngredientChange={() => setIsAuthOpen(true)}
                    onSubmit={() => setIsAuthOpen(true)}
                    budgetFilter="all"
                    onBudgetFilterChange={() => setIsAuthOpen(true)}
                    onRandomPick={() => setIsAuthOpen(true)}
                    selectedTagList={[]}
                    onToggleTag={() => setIsAuthOpen(true)}
                    onClear={() => {}}
                    isAuthenticated={false}
                    onRequireAuth={() => setIsAuthOpen(true)}
                  />
                </div>

                {/* Sample dishes list (Chỉ hiện tên món, mô tả, ảnh; công thức, nguyên liệu, giá tiền, kalo BỊ ẨN) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">
                        Danh Sách Món Ăn Mẫu (Chưa Đăng Nhập)
                      </h3>
                      <p className="text-xs text-stone-500">
                        Công thức, nguyên liệu, dinh dưỡng và chi phí đang được ẩn
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700">
                      Chế độ khách
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guestSampleDishes.map((dish, index) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        index={index}
                        isFavorite={favorites.some((d) => d.id === dish.id)}
                        onToggleFavorite={handleToggleFavorite}
                        isAuthenticated={false}
                        onRequireAuth={() => setIsAuthOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Student Economics Bar & Next Steps */}
            <div className="mt-8 bg-stone-100/70 border border-stone-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <span>
                  Chi phí & Calorie được ước lượng dựa trên định lượng thực tế tại chợ sinh viên và viện dinh dưỡng.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsTipsOpen(true)}
                className="text-amber-800 font-semibold hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Xem mẹo đi chợ & nấu ăn rẻ hơn nữa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : activeTab === 'calendar' ? (
          /* TAB 2: LỊCH ĂN UỐNG & THEO DÕI KALO */
          <section aria-labelledby="calendar-heading">
            <h2 id="calendar-heading" className="sr-only">
              Lịch Thực Đơn Tuần & Kalo
            </h2>
            <MealCalendarView
              scheduledMeals={scheduledMeals}
              onRemoveMeal={handleRemoveScheduledMeal}
              onOpenScheduleForDish={handleOpenScheduleForDish}
              isAuthenticated={!!currentUser}
              onRequireAuth={() => setIsAuthOpen(true)}
              onMarkCooked={handleMarkCooked}
              onOpenWeeklyShoppingList={handleOpenWeeklyShoppingList}
            />
          </section>
        ) : activeTab === 'drinks' ? (
          /* TAB 3: Ô ĐỒ UỐNG (TỰ LÀM TẠI NHÀ HOẶC MUA QUÁN GẦN) */
          <DrinksSection
            onOpenGoogleMapsSearch={(query) => {
              setEatOutInitialTab('places');
              setIsEatOutOpen(true);
            }}
          />
        ) : (
          /* TAB 4: MÓN ĐÃ LƯU */
          <section aria-labelledby="favorites-heading">
            <h2 id="favorites-heading" className="sr-only">
              Danh sách món đã lưu
            </h2>
            <FavoritesList
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
              onClearAll={handleClearAllFavorites}
              onOpenShoppingList={() => {
                setShoppingListDishes(favorites);
                setIsShoppingListOpen(true);
              }}
              isAuthenticated={!!currentUser}
              onRequireAuth={() => setIsAuthOpen(true)}
              cookCounts={cookCounts}
              onMarkCooked={handleMarkCooked}
              onScheduleMeal={handleOpenScheduleForDish}
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
            <span>Ứng dụng gợi ý món ăn & theo dõi Kalo chuẩn kinh tế sinh viên</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTipsOpen(true)}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Cẩm nang sinh viên
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calendar')}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Lịch ăn uống
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('drinks')}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Ô Đồ uống
            </button>
            <button
              type="button"
              onClick={() => {
                setEatOutInitialTab('dishes');
                setIsEatOutOpen(true);
              }}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Ăn ngoài & Maps
            </button>
            <button
              type="button"
              onClick={() => {
                setShoppingListDishes(favorites);
                if (favorites.length > 0) setIsShoppingListOpen(true);
              }}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Danh sách đi chợ
            </button>
            {!currentUser && (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="text-amber-700 font-semibold hover:underline cursor-pointer"
              >
                Đăng nhập tài khoản
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Floating Action Button (FAB) for Eat-Out & Nearby Places */}
      <button
        type="button"
        onClick={() => {
          setEatOutInitialTab('dishes');
          setIsEatOutOpen(true);
        }}
        className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-amber-800 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center space-x-2.5 transition-all transform hover:scale-105 active:scale-95 border-2 border-white/50 cursor-pointer group"
        title="Mở thanh gợi ý món ăn ngoài & quán gần đây"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🛵</span>
        <div className="text-left hidden sm:block">
          <div className="text-xs leading-none font-extrabold flex items-center gap-1">
            <span>Ăn Ngoài & Quán Gần</span>
            <span className="bg-amber-300 text-amber-950 text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold">
              Maps
            </span>
          </div>
          <div className="text-[10px] text-amber-100 leading-tight mt-0.5">
            Không cần nấu • Quanh trường
          </div>
        </div>
      </button>

      {/* Slide Bar Gợi Ý Món Ăn Ngoài & Google Maps Quán Ăn Ở Gần */}
      <EatOutSlideBar
        isOpen={isEatOutOpen}
        onClose={() => setIsEatOutOpen(false)}
        initialTab={eatOutInitialTab}
      />

      {/* Shopping List Modal */}
      <ShoppingListModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        dishes={shoppingListDishes.length > 0 ? shoppingListDishes : favorites}
      />

      {/* Student Tips & Secrets Modal */}
      <StudentTipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Schedule Meal Modal */}
      <ScheduleMealModal
        dish={dishToSchedule}
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setDishToSchedule(null);
        }}
        onConfirmSchedule={handleConfirmSchedule}
      />
    </div>
  );
}
