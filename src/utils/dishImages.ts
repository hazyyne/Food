// Import curated photographic images for Vietnamese home-cooked dishes
import imgScrambledEggs from '../assets/images/viet_scrambled_eggs_1790560285329.jpg';
import imgFriedTofu from '../assets/images/viet_fried_tofu_1790560300526.jpg';
import imgFriedRice from '../assets/images/viet_fried_rice_1790560313892.jpg';
import imgStirfryNoodles from '../assets/images/viet_stirfry_noodles_1790560327609.jpg';
import imgMorningGlory from '../assets/images/viet_morning_glory_1790560339053.jpg';
import imgSavoryDish from '../assets/images/food_savory_dish_1790495213362.jpg';
import imgHealthySoup from '../assets/images/food_healthy_soup_1790495226206.jpg';
import imgStudentMeal from '../assets/images/food_student_meal_banner_1790495198107.jpg';

export const DISH_IMAGES: Record<string, string> = {
  // Dishes with specific thematic photos
  'trung-sot-ca-chua': imgScrambledEggs,
  'trung-ran-hanh-hoa': imgScrambledEggs,
  'canh-ca-chua-trung-may': imgHealthySoup,
  'trung-ngam-tuong-long-dao': imgScrambledEggs,

  'dau-phu-sot-ca-chua': imgFriedTofu,
  'dau-phu-ran-gion-mam-tom': imgFriedTofu,
  'dau-phu-chum-sot-mam-hanh': imgFriedTofu,
  'dau-phu-nhoi-thit-sot-ca': imgFriedTofu,

  'mi-tom-xao-xuc-xich-rau-cai': imgStirfryNoodles,
  'mi-tom-nau-trung-ca-chua': imgStirfryNoodles,

  'thit-bam-rang-chay-canh': imgSavoryDish,
  'thit-ba-chi-rang-chay-canh': imgSavoryDish,
  'thit-kho-trung-cut-sinh-vien': imgSavoryDish,
  'khoai-tay-xao-thit-bam': imgSavoryDish,
  'nam-kim-cham-xao-thit-bam': imgSavoryDish,
  'ca-hop-sot-ca-chua-dap-trung': imgSavoryDish,

  'canh-bi-dao-thit-bam': imgHealthySoup,
  'canh-rau-ngot-thit-bam': imgHealthySoup,
  'canh-bap-cai-nau-gung': imgHealthySoup,
  'canh-khoai-tay-ca-rot-thit-bam': imgHealthySoup,
  'canh-bi-xanh-nau-tep-kho': imgHealthySoup,
  'canh-chua-ca-chua-gia-do': imgHealthySoup,
  'chao-thit-bam-tu-com-nguoi': imgHealthySoup,

  'com-rang-trung-xuc-xich': imgFriedRice,
  'com-rang-kim-chi-trung-op-la': imgFriedRice,

  'rau-muong-xao-toi': imgMorningGlory,
  'rau-muong-luoc-vat-chanh': imgMorningGlory,
  'bap-cai-xao-ca-chua': imgMorningGlory,
  'dua-chuot-bop-chua-ngot': imgMorningGlory,
};

export function getDishImage(dishId: string, category?: string): string {
  if (DISH_IMAGES[dishId]) {
    return DISH_IMAGES[dishId];
  }
  // Category fallback
  if (category === 'món canh') return imgHealthySoup;
  if (category === 'món cơm') return imgFriedRice;
  if (category === 'món xào') return imgMorningGlory;
  if (category === 'món mặn') return imgSavoryDish;
  return imgStudentMeal;
}
