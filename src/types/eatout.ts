export interface EatOutDish {
  id: string;
  name: string;
  category: 'bánh mì' | 'cơm' | 'bún/phở' | 'xôi' | 'ăn vặt/nhẹ';
  priceRange: string;
  avgPrice: number; // VND
  calories: number; // Kcal
  prepTime: string; // vd: "3 - 5 phút"
  image: string;
  description: string;
  bestFor: string; // vd: "Ăn sáng vội, không cần dọn rửa"
  searchKeyword: string; // từ khóa tìm kiếm trên Google Maps
  popularAddons?: string[];
}

export interface NearbyRestaurant {
  id: string;
  name: string;
  category: string;
  address: string;
  area: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Đà Nẵng';
  rating: number; // vd: 4.8
  reviewCount: number;
  priceRange: string;
  avgPrice: number;
  distanceKm?: number; // ước tính
  specialty: string;
  studentPerks: string; // vd: "Trà đá miễn phí, cơm thêm 0đ"
  openHours: string;
  image: string;
  lat: number;
  lng: number;
  phone?: string;
  mapsQuery: string;
}

export interface UniversityArea {
  id: string;
  name: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Đà Nẵng';
  lat: number;
  lng: number;
  description: string;
}
