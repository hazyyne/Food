import { Dish, BudgetFilter } from '../types/food';
import { RECIPES_DATABASE } from '../data/recipes';

// Chuẩn hóa chuỗi tiếng Việt (bỏ dấu, chuyển chữ thường) để tìm kiếm chính xác
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

// Tách các nguyên liệu người dùng nhập (hỗ trợ dấu phẩy, dấu chấm phẩy, xuống dòng hoặc khoảng cách)
export function parseInputIngredients(input: string): string[] {
  if (!input) return [];
  return input
    .split(/[,;\n+]+/)
    .map(i => i.trim())
    .filter(i => i.length > 0);
}

export function filterByBudget(dish: Dish, budgetFilter: BudgetFilter): boolean {
  if (budgetFilter === 'under20k') return dish.estimatedCost <= 20000;
  if (budgetFilter === '20k-40k') return dish.estimatedCost > 20000 && dish.estimatedCost <= 40000;
  if (budgetFilter === 'above40k') return dish.estimatedCost > 40000;
  return true;
}

export function findMatchingDishes(
  rawInput: string,
  budgetFilter: BudgetFilter = 'all',
  seedOffset: number = 0
): { dishes: Dish[]; totalMatchesCount: number; matchedIngredients: string[] } {
  const parsed = parseInputIngredients(rawInput);
  const normalizedInputs = parsed.map(p => normalizeVietnamese(p));

  // Nếu người dùng không nhập gì hoặc chỉ nhập khoảng trắng -> lấy ngẫu nhiên 3 món cân bằng mâm cơm sinh viên
  if (normalizedInputs.length === 0) {
    let pool = RECIPES_DATABASE.filter(d => filterByBudget(d, budgetFilter));
    if (pool.length < 3) {
      pool = [...RECIPES_DATABASE];
    }
    // Sắp xếp cân bằng: 1 món mặn, 1 món canh, 1 món xào/nhanh nếu có
    const manList = pool.filter(d => d.category === 'món mặn');
    const canhList = pool.filter(d => d.category === 'món canh');
    const otherList = pool.filter(d => d.category !== 'món mặn' && d.category !== 'món canh');

    const result: Dish[] = [];
    const pick = (arr: Dish[], offset: number) => {
      if (arr.length === 0) return pool[(offset) % pool.length];
      return arr[(offset) % arr.length];
    };

    result.push(pick(manList.length ? manList : pool, seedOffset));
    result.push(pick(canhList.length ? canhList : pool, seedOffset + 1));
    result.push(pick(otherList.length ? otherList : pool, seedOffset + 2));

    // Đảm bảo không trùng lặp id
    const uniqueDishes = Array.from(new Map(result.map(item => [item.id, item])).values());
    while (uniqueDishes.length < 3 && uniqueDishes.length < pool.length) {
      const nextDish = pool.find(d => !uniqueDishes.some(u => u.id === d.id));
      if (nextDish) uniqueDishes.push(nextDish);
      else break;
    }

    return {
      dishes: uniqueDishes.slice(0, 3),
      totalMatchesCount: pool.length,
      matchedIngredients: []
    };
  }

  // Chấm điểm từng món ăn dựa trên số nguyên liệu khớp
  const scoredDishes = RECIPES_DATABASE.map(dish => {
    let score = 0;
    const dishKeywords = dish.matchKeywords.map(k => normalizeVietnamese(k));
    const dishNameNorm = normalizeVietnamese(dish.name);
    const dishIngredNorm = dish.mainIngredients.map(i => normalizeVietnamese(i)).join(' ');

    for (const userIng of normalizedInputs) {
      if (!userIng) continue;
      // Khớp chính xác hoặc khớp từ khóa
      const hasExactKeyword = dishKeywords.some(k => k.includes(userIng) || userIng.includes(k));
      const hasInIngredients = dishIngredNorm.includes(userIng);
      const hasInName = dishNameNorm.includes(userIng);

      if (hasInName) score += 4;
      if (hasExactKeyword) score += 3;
      if (hasInIngredients) score += 2;
    }

    return { dish, score };
  });

  // Lọc theo ngân sách nếu được chọn
  let eligible = scoredDishes.filter(item => filterByBudget(item.dish, budgetFilter));
  if (eligible.length === 0) {
    // Nới lỏng ngân sách nếu không tìm thấy món nào trong tầm giá này
    eligible = scoredDishes;
  }

  // Lọc những món có điểm > 0
  let matched = eligible.filter(item => item.score > 0);

  // Nếu không có món nào khớp nguyên liệu vừa nhập, chọn các món linh hoạt phổ biến
  if (matched.length === 0) {
    matched = eligible;
  }

  // Sắp xếp theo điểm giảm dần, sau đó theo chi phí tiết kiệm
  matched.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.dish.estimatedCost - b.dish.estimatedCost;
  });

  const totalMatches = matched.length;

  // Lấy 3 món xoay vòng theo seedOffset nếu người dùng bấm "Đổi 3 món khác"
  const startIdx = (seedOffset * 3) % Math.max(1, totalMatches);
  const selected: Dish[] = [];

  for (let i = 0; i < 3; i++) {
    const idx = (startIdx + i) % totalMatches;
    if (matched[idx]) {
      selected.push(matched[idx].dish);
    }
  }

  // Đảm bảo không trùng ID nếu danh sách nhỏ
  const uniqueSelected = Array.from(new Map(selected.map(item => [item.id, item])).values());
  while (uniqueSelected.length < 3 && uniqueSelected.length < RECIPES_DATABASE.length) {
    const fallback = RECIPES_DATABASE.find(d => !uniqueSelected.some(u => u.id === d.id));
    if (fallback) uniqueSelected.push(fallback);
    else break;
  }

  return {
    dishes: uniqueSelected.slice(0, 3),
    totalMatchesCount: totalMatches,
    matchedIngredients: parsed
  };
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
