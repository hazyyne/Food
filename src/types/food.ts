export type CostLevel = 'budget' | 'medium' | 'comfort';

export type DishCategory = 'món mặn' | 'món canh' | 'món xào' | 'món nhanh' | 'món cơm';

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
  image?: string;
  servings?: string; // Khẩu phần (e.g. 1 - 2 người)
}

export type BudgetFilter = 'all' | 'under20k' | '20k-40k' | 'above40k';
