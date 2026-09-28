import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Compass,
  Star,
  Clock,
  Flame,
  ExternalLink,
  Navigation,
  Phone,
  Sparkles,
  Search,
  Filter,
  Layers,
  ChevronRight,
  ShieldCheck,
  Coffee,
  Store,
  Map as MapIcon,
  Maximize2,
  RefreshCw,
  Info
} from 'lucide-react';
import { EAT_OUT_DISHES, NEARBY_RESTAURANTS, UNIVERSITY_AREAS } from '../data/eatout';
import { EatOutDish, NearbyRestaurant, UniversityArea } from '../types/eatout';
import { formatVND } from '../utils/matching';

interface EatOutSlideBarProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'dishes' | 'places';
}

export const EatOutSlideBar: React.FC<EatOutSlideBarProps> = ({
  isOpen,
  onClose,
  initialTab = 'dishes'
}) => {
  const [activeTab, setActiveTab] = useState<'dishes' | 'places'>(initialTab);
  const [dishCategory, setDishCategory] = useState<string>('all');
  const [dishPriceFilter, setDishPriceFilter] = useState<'all' | 'under25' | 'under35'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Quán ăn & Google Maps
  const [selectedArea, setSelectedArea] = useState<UniversityArea>(UNIVERSITY_AREAS[0]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<NearbyRestaurant | null>(NEARBY_RESTAURANTS[0]);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userCustomLocation, setUserCustomLocation] = useState<{ lat: number; lng: number; label: string } | null>(null);

  // Đồng bộ initialTab khi slide bar được mở
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Ngăn cuộn trang phía sau khi mở slide bar trên màn hình nhỏ
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Lọc món ăn ngoài
  const filteredDishes = EAT_OUT_DISHES.filter((dish) => {
    const matchesCat = dishCategory === 'all' || dish.category === dishCategory;
    const matchesPrice =
      dishPriceFilter === 'all' ||
      (dishPriceFilter === 'under25' && dish.avgPrice <= 25000) ||
      (dishPriceFilter === 'under35' && dish.avgPrice <= 35000);
    const matchesSearch =
      searchQuery.trim() === '' ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesPrice && matchesSearch;
  });

  // Lọc quán ăn theo khu vực hoặc toạ độ
  const filteredRestaurants = NEARBY_RESTAURANTS.filter((res) => {
    if (userCustomLocation) return true;
    return res.area === selectedArea.id;
  });

  // Lấy vị trí GPS của người dùng
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt của bạn không hỗ trợ định vị vị trí.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCustomLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: 'Vị trí hiện tại của bạn'
        });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        alert('Không thể lấy vị trí hiện tại. Vui lòng chọn khu vực trường học trong danh sách.');
      },
      { timeout: 10000 }
    );
  };

  // Tạo URL tìm kiếm Google Maps
  const getGoogleMapsSearchUrl = (query: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const getGoogleMapsDirectionUrl = (restaurant: NearbyRestaurant) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address + ' ' + restaurant.name)}`;
  };

  // Toạ độ & iframe nhúng cho Google Maps
  const activeLat = userCustomLocation?.lat || selectedRestaurant?.lat || selectedArea.lat;
  const activeLng = userCustomLocation?.lng || selectedRestaurant?.lng || selectedArea.lng;
  const mapSearchQuery = selectedRestaurant ? `${selectedRestaurant.name} ${selectedRestaurant.address}` : `${selectedArea.name} ${selectedArea.city}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapSearchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide Bar Container */}
      <aside
        className="relative z-10 w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full overflow-hidden transition-transform duration-300 ease-out animate-in slide-in-from-right"
        role="dialog"
        aria-modal="true"
        aria-label="Gợi ý ăn ngoài và quán ăn ở gần"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <span className="text-xl">🛵</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Hôm Nay Ăn Ngoài</h2>
                <span className="bg-amber-400 text-amber-950 text-xs px-2 py-0.5 rounded-full font-bold">
                  Không cần nấu
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5">
                Món ăn nhanh tiện lợi & Quán bình dân quanh trường học
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            title="Đóng thanh gợi ý"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Switches */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex-1 pb-3 text-sm font-semibold flex items-center justify-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'dishes'
                ? 'border-amber-600 text-amber-700 font-bold bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>🍔 Món Ăn Ngoài Nhanh</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              {EAT_OUT_DISHES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('places')}
            className={`flex-1 pb-3 text-sm font-semibold flex items-center justify-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'places'
                ? 'border-amber-600 text-amber-700 font-bold bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapIcon className="w-4 h-4 text-emerald-600" />
            <span>📍 Google Maps & Quán Gần Đây</span>
          </button>
        </div>

        {/* Tab 1: Món Ăn Ngoài Không Cần Nấu Nướng */}
        {activeTab === 'dishes' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-stone-50/60">
            {/* Thanh tìm kiếm & lọc nhanh */}
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm món: bánh mì, cơm tấm, bún chả, xôi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Lọc theo danh mục */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'Tất cả món' },
                  { id: 'bánh mì', label: '🥖 Bánh mì' },
                  { id: 'cơm', label: '🍚 Cơm tấm / gà' },
                  { id: 'bún/phở', label: '🍜 Bún / Phở' },
                  { id: 'xôi', label: '🌾 Xôi nóng' },
                  { id: 'ăn vặt/nhẹ', label: '🥟 Ăn vặt' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setDishCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      dishCategory === cat.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Lọc theo tầm giá sinh viên */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-xs text-stone-500">
                <span className="font-medium">Mức giá:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setDishPriceFilter('all')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      dishPriceFilter === 'all'
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'hover:text-stone-800'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setDishPriceFilter('under25')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      dishPriceFilter === 'under25'
                        ? 'bg-emerald-100 text-emerald-900 font-bold'
                        : 'hover:text-stone-800'
                    }`}
                  >
                    ≤ 25k (Siêu rẻ)
                  </button>
                  <button
                    onClick={() => setDishPriceFilter('under35')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      dishPriceFilter === 'under35'
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'hover:text-stone-800'
                    }`}
                  >
                    ≤ 35k (Vừa ví)
                  </button>
                </div>
              </div>
            </div>

            {/* Tip Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Lợi ích ăn ngoài khi bận rộn:</span> Tiết kiệm 45 phút nấu nướng & dọn rửa, đồ ăn nóng sốt ngay tức thì. Bấm nút <b>"Tìm Quán Trên Google Maps"</b> để dẫn đường đến quán gần nhất!
              </div>
            </div>

            {/* Danh sách món ăn ngoài */}
            <div className="space-y-3.5">
              {filteredDishes.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-stone-200">
                  <p className="text-sm text-stone-500">Không tìm thấy món ăn ngoài nào phù hợp.</p>
                  <button
                    onClick={() => {
                      setDishCategory('all');
                      setDishPriceFilter('all');
                      setSearchQuery('');
                    }}
                    className="mt-2 text-xs font-semibold text-amber-600 hover:underline"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                  >
                    {/* Ảnh món */}
                    <div className="sm:w-44 h-36 sm:h-auto relative shrink-0 bg-stone-100 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span>{dish.calories} Kcal</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        ⚡ {dish.prepTime}
                      </div>
                    </div>

                    {/* Nội dung chi tiết */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                            {dish.name}
                          </h3>
                          <span className="text-amber-700 font-extrabold text-xs sm:text-sm bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                            {dish.priceRange}
                          </span>
                        </div>

                        <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>

                        <div className="mt-2 flex items-center text-[11px] text-emerald-700 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{dish.bestFor}</span>
                        </div>

                        {/* Gọi thêm phổ biến */}
                        {dish.popularAddons && dish.popularAddons.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {dish.popularAddons.map((addon, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded"
                              >
                                + {addon}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Nút hành động liên kết Google Maps */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2">
                        <a
                          href={getGoogleMapsSearchUrl(`${dish.searchKeyword} gần đây`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Tìm Quán Trên Google Maps</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>

                        <button
                          onClick={() => {
                            setActiveTab('places');
                            // Tìm kiếm quán liên quan trong tab Quán
                          }}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium py-2 px-2.5 rounded-lg transition-colors"
                          title="Xem quán sinh viên gợi ý"
                        >
                          Xem quán gần
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Quán Ăn Ở Gần & Google Maps */}
        {activeTab === 'places' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-stone-50/60">
            {/* Bộ chọn khu vực đại học / Lấy toạ độ GPS */}
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Chọn khu vực hoặc vị trí hiện tại:</span>
                </label>

                <button
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Đang định vị...' : 'Vị trí của tôi'}</span>
                </button>
              </div>

              {/* Danh sách trường đại học */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {UNIVERSITY_AREAS.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => {
                      setUserCustomLocation(null);
                      setSelectedArea(area);
                      const firstRes = NEARBY_RESTAURANTS.find((r) => r.area === area.id);
                      if (firstRes) setSelectedRestaurant(firstRes);
                    }}
                    className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer ${
                      !userCustomLocation && selectedArea.id === area.id
                        ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-950 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="truncate font-semibold">{area.name}</div>
                    <div className="text-[10px] text-stone-500">{area.city}</div>
                  </button>
                ))}
              </div>

              {userCustomLocation && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center space-x-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đang dùng: <b>{userCustomLocation.label}</b></span>
                  </div>
                  <button
                    onClick={() => setUserCustomLocation(null)}
                    className="text-[11px] font-bold text-emerald-700 underline"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>

            {/* Google Maps Interactive Embed Frame */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-800">
                  <MapIcon className="w-4 h-4 text-blue-600" />
                  <span>Google Maps: {selectedRestaurant ? selectedRestaurant.name : selectedArea.name}</span>
                </div>
                <a
                  href={getGoogleMapsSearchUrl(mapSearchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1"
                >
                  <span>Mở Google Maps toàn màn hình</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe Google Maps */}
              <div className="w-full h-56 sm:h-64 relative bg-stone-200">
                <iframe
                  title="Google Maps Nearby Restaurants"
                  src={embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-2.5 bg-stone-50 text-[11px] text-stone-600 flex items-center justify-between">
                <span>📍 Nhấn vào từng quán bên dưới để xem vị trí và đường đi trực tiếp</span>
                <span className="font-semibold text-amber-700">Sinh viên chuẩn tiết kiệm</span>
              </div>
            </div>

            {/* Danh sách các quán ăn gợi ý */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1">
                <span>Quán ăn sinh viên nổi bật ({filteredRestaurants.length} quán):</span>
                <span className="text-amber-700">⭐ Nhiều đánh giá tốt</span>
              </div>

              {filteredRestaurants.map((res) => {
                const isSelected = selectedRestaurant?.id === res.id;
                return (
                  <div
                    key={res.id}
                    onClick={() => setSelectedRestaurant(res)}
                    className={`bg-white rounded-xl border p-3.5 transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={res.image}
                        alt={res.name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0 bg-stone-100"
                        loading="lazy"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-stone-900 text-sm truncate">
                            {res.name}
                          </h4>
                          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded shrink-0">
                            {res.priceRange}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs text-stone-600">
                          <span className="flex items-center text-amber-600 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                            {res.rating}
                          </span>
                          <span className="text-stone-400">({res.reviewCount} đánh giá)</span>
                          <span className="text-stone-300">•</span>
                          <span className="text-emerald-700 font-medium">~{res.distanceKm} km</span>
                        </div>

                        <p className="text-xs text-stone-600 mt-1 flex items-center truncate">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 mr-1 shrink-0" />
                          <span className="truncate">{res.address}</span>
                        </p>

                        <div className="mt-1.5 flex items-center text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          <Sparkles className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                          <span>{res.studentPerks}</span>
                        </div>
                      </div>
                    </div>

                    {/* Nút hành động với Google Maps */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2">
                      <a
                        href={getGoogleMapsDirectionUrl(res)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Chỉ Đường Google Maps</span>
                      </a>

                      <a
                        href={getGoogleMapsSearchUrl(`${res.name} ${res.address}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium py-1.5 px-3 rounded-lg flex items-center space-x-1 transition-colors"
                        title="Xem review & menu trên Google Maps"
                      >
                        <span>Xem Review</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {res.phone && (
                        <a
                          href={`tel:${res.phone}`}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium p-1.5 rounded-lg transition-colors"
                          title={`Gọi đặt bàn: ${res.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Bar */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>Giá cả cập nhật theo thực tế hàng quán sinh viên</span>
          </span>
          <button
            onClick={onClose}
            className="text-stone-700 font-semibold hover:underline"
          >
            Đóng thanh trượt
          </button>
        </div>
      </aside>
    </div>
  );
};
