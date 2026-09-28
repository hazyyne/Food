export type DrinkOrigin = 'homemade' | 'nearby_shop';

export type DrinkCategory = 
  | 'trà hoa quả'
  | 'cà phê'
  | 'trà sữa'
  | 'sinh tố/nước ép'
  | 'thanh nhiệt/healthy';

export interface Drink {
  id: string;
  name: string;
  origin: DrinkOrigin; // 'homemade' = Tự làm tại nhà, 'nearby_shop' = Mua quán gần
  category: DrinkCategory;
  estimatedCost: number; // VND
  costLabel: string; // vd: "~5.000đ/cốc" hoặc "18.000đ - 25.000đ"
  calories: number; // Kcal
  timeEstimate: string; // vd: "5 phút làm" hoặc "Mua lấy ngay 2 phút"
  image: string;
  description: string;
  benefit: string; // vd: "Tỉnh táo thức đêm ôn thi, bổ sung vitamin C"
  
  // Dành cho thức uống tự làm tại nhà:
  ingredients?: string[];
  instructions?: string[];
  studentTip?: string;

  // Dành cho thức uống mua tại quán gần:
  popularPlaces?: string[]; // vd: ["Mixue", "Trà Chanh Phố Cổ", "Quầy Nước Mía KTX"]
  googleMapsQuery?: string; // từ khóa tra cứu trên Google Maps
}
