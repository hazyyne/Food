import React, { useState } from 'react';
import {
  Coffee,
  Sparkles,
  Flame,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  CheckCircle2,
  Heart,
  Droplets,
  BookOpen,
  Navigation,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DRINKS_DATABASE } from '../data/drinks';
import { Drink, DrinkOrigin, DrinkCategory } from '../types/drink';
import { formatVND } from '../utils/matching';

interface DrinksSectionProps {
  onOpenGoogleMapsSearch?: (query: string) => void;
}

export const DrinksSection: React.FC<DrinksSectionProps> = ({ onOpenGoogleMapsSearch }) => {
  const [originFilter, setOriginFilter] = useState<'all' | DrinkOrigin>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedDrinkId, setExpandedDrinkId] = useState<string | null>(null);

  // Lọc danh sách đồ uống
  const filteredDrinks = DRINKS_DATABASE.filter((drink) => {
    const matchesOrigin = originFilter === 'all' || drink.origin === originFilter;
    const matchesCat = categoryFilter === 'all' || drink.category === categoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (drink.ingredients && drink.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesOrigin && matchesCat && matchesSearch;
  });

  const homemadeCount = DRINKS_DATABASE.filter((d) => d.origin === 'homemade').length;
  const nearbyShopCount = DRINKS_DATABASE.filter((d) => d.origin === 'nearby_shop').length;

  const handleOpenMaps = (query: string) => {
    if (onOpenGoogleMapsSearch) {
      onOpenGoogleMapsSearch(query);
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      {/* Banner Giới Thiệu Ô Đồ Uống */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-700 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold uppercase tracking-wider">
            <Droplets className="w-4 h-4 text-teal-300" />
            <span>Góc Pha Chế & Giải Khát Sinh Viên</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ô Đồ Uống: <span className="text-amber-300">Tự Pha Tại Nhà</span> Hoặc <span className="text-teal-200">Mua Quán Gần</span>
          </h2>
          <p className="text-stone-200 text-xs sm:text-sm leading-relaxed pt-1">
            Gợi ý thức uống thơm ngon, bổ dưỡng: tự làm chỉ tốn <b>2k - 7k/cốc</b> cho sinh viên tiết kiệm, hoặc tra cứu ngay các tiệm trà, cafe, nước mía gần bạn trên Google Maps!
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white font-medium flex items-center gap-1.5">
              <span>🏠 Tự làm:</span> <b>{homemadeCount} công thức siêu rẻ</b>
            </span>
            <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white font-medium flex items-center gap-1.5">
              <span>🏪 Mua gần:</span> <b>{nearbyShopCount} món hottrend & Maps</b>
            </span>
          </div>
        </div>

        {/* Texture trang trí */}
        <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none hidden md:block">
          <Coffee className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Bộ Lọc & Tìm Kiếm */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        {/* Toggle Chế Độ: Tự làm vs Mua quán */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setOriginFilter('all')}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                originFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tất Cả ({DRINKS_DATABASE.length})
            </button>
            <button
              onClick={() => setOriginFilter('homemade')}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                originFilter === 'homemade'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-emerald-700'
              }`}
            >
              <span>🏠 Tự Pha Tại Nhà</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${originFilter === 'homemade' ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-700'}`}>
                {homemadeCount}
              </span>
            </button>
            <button
              onClick={() => setOriginFilter('nearby_shop')}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                originFilter === 'nearby_shop'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-amber-700'
              }`}
            >
              <span>🏪 Mua Quán Gần Đây</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${originFilter === 'nearby_shop' ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-700'}`}>
                {nearbyShopCount}
              </span>
            </button>
          </div>

          {/* Ô tìm kiếm đồ uống */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm trà chanh, cà phê, nước mía, sữa ngô..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        {/* Lọc theo loại đồ uống */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-stone-100 text-xs">
          {[
            { id: 'all', label: 'Tất cả loại' },
            { id: 'trà hoa quả', label: '🍋 Trà hoa quả' },
            { id: 'cà phê', label: '☕ Cà phê / Bạc xỉu' },
            { id: 'trà sữa', label: '🧋 Trà sữa' },
            { id: 'sinh tố/nước ép', label: '🥑 Sinh tố & Nước ép' },
            { id: 'thanh nhiệt/healthy', label: '🌿 Thanh nhiệt & Detox' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Danh Sách Các Thẻ Đồ Uống */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredDrinks.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-200">
            <Coffee className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700">Không tìm thấy thức uống nào phù hợp</p>
            <p className="text-xs text-stone-400 mt-1">Thử đổi từ khóa hoặc bộ lọc thể loại khác</p>
          </div>
        ) : (
          filteredDrinks.map((drink) => {
            const isExpanded = expandedDrinkId === drink.id;
            const isHomemade = drink.origin === 'homemade';

            return (
              <div
                key={drink.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Header Thẻ: Ảnh + Tên + Nhãn chi phí */}
                <div>
                  <div className="relative h-44 sm:h-48 bg-stone-100 overflow-hidden">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Huy hiệu: Nguồn gốc */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 ${
                          isHomemade
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {isHomemade ? '🏠 Tự Pha Tại Nhà' : '🏪 Mua Quán Gần'}
                      </span>
                    </div>

                    {/* Huy hiệu Kalo */}
                    <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span>{drink.calories} Kcal</span>
                    </div>

                    {/* Banner mức giá dưới ảnh */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between bg-stone-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs">
                      <span className="font-extrabold text-amber-300 text-sm">
                        {drink.costLabel}
                      </span>
                      <span className="text-stone-300 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-300" />
                        <span>{drink.timeEstimate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Thân thẻ */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug">
                        {drink.name}
                      </h3>
                      <span className="text-[11px] bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded capitalize shrink-0">
                        {drink.category}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {drink.description}
                    </p>

                    <div className="flex items-center text-xs text-teal-800 bg-teal-50 border border-teal-100 px-2.5 py-1.5 rounded-lg font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 mr-1.5 shrink-0" />
                      <span>{drink.benefit}</span>
                    </div>

                    {/* Đồ uống tự làm: Hiển thị nguyên liệu và các bước làm khi bấm xem chi tiết */}
                    {isHomemade && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedDrinkId(isExpanded ? null : drink.id)}
                          className="w-full py-1.5 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isExpanded ? 'Ẩn công thức & mẹo làm' : 'Xem công thức 3 bước & nguyên liệu'}</span>
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-3 text-xs animate-in fade-in duration-200">
                            {/* Nguyên liệu */}
                            <div>
                              <div className="font-bold text-emerald-950 mb-1.5">Nguyên liệu cần có:</div>
                              <ul className="space-y-1 text-stone-700 list-disc list-inside">
                                {drink.ingredients?.map((ing, idx) => (
                                  <li key={idx}>{ing}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Các bước làm */}
                            <div>
                              <div className="font-bold text-emerald-950 mb-1.5">Cách làm nhanh:</div>
                              <ol className="space-y-1.5 text-stone-700 list-decimal list-inside">
                                {drink.instructions?.map((step, idx) => (
                                  <li key={idx} className="leading-relaxed">{step}</li>
                                ))}
                              </ol>
                            </div>

                            {/* Mẹo sinh viên */}
                            {drink.studentTip && (
                              <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-emerald-900 font-medium">
                                💡 <b>Mẹo phòng trọ:</b> {drink.studentTip}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Đồ uống mua quán: Hiển thị các địa chỉ quán quen thuộc */}
                    {!isHomemade && drink.popularPlaces && (
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-600">
                        <span className="font-semibold text-stone-800">Quán thường bán:</span>
                        {drink.popularPlaces.map((place, idx) => (
                          <span key={idx} className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-medium">
                            {place}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Thẻ: Nút hành động */}
                <div className="p-4 pt-0">
                  {!isHomemade ? (
                    <button
                      type="button"
                      onClick={() => handleOpenMaps(drink.googleMapsQuery || `${drink.name} gần đây`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Tìm Quán Bán Món Này Trên Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                      <span className="flex items-center text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Tiết kiệm 80% so với mua tiệm
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedDrinkId(isExpanded ? null : drink.id)}
                        className="text-emerald-700 font-semibold hover:underline"
                      >
                        {isExpanded ? 'Đóng' : 'Pha ngay'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
