export type CostLevel = 'budget' | 'medium' | 'comfort';

export type DishCategory = 'món mặn' | 'món canh' | 'món xào' | 'món nhanh' | 'món cơm';

export interface NutritionInfo {
  calories: number; // Kalo (kcal)
  protein: number;  // g (Chất đạm)
  carbs: number;    // g (Tinh bột / Carbohydrate)
  fat: number;      // g (Chất béo)
  fiber?: number;   // g (Chất xơ)
}

export interface Dish {
  id: string;
  name: string; // Tên món
  mainIngredients: string[]; // Nguyên liệu chính
  matchKeywords: string[]; // Từ khóa để match (cả tiếng Việt có dấu và không dấu)
  shortDescription: string; // Mô tả ngắn
  estimatedCost: number; // Chi phí ước tính (VNĐ)
  costLevel: CostLevel; // Phân cấp túi tiền
  cookingTimeMinutes: number; // Thời gian chế biến (phút)
  category: DishCategory;
  steps: string[]; // Các bước nấu nhanh gọn
  tip: string; // Mẹo tiết kiệm hoặc mẹo nấu ngon cho sinh viên
  nutrition: NutritionInfo; // Giá trị dinh dưỡng & Kalo
  image?: string;
  servings?: string; // Khẩu phần (e.g. 1 - 2 người)
}

export type BudgetFilter = 'all' | 'under20k' | '20k-40k' | 'above40k';

export interface CookHistoryMap {
  [dishId: string]: {
    count: number;
    lastCookedAt?: string;
  };
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export interface ScheduledMeal {
  id: string; // ID duy nhất
  date: string; // Định dạng YYYY-MM-DD
  mealSlot: MealSlot; // Bữa sáng, bữa trưa, bữa tối
  dishId: string;
  dishName: string;
  dishCost: number;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  dishData?: Dish;
  notes?: string;
  createdAt: string;
}
