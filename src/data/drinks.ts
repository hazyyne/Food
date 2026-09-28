import { Drink } from '../types/drink';

export const DRINKS_DATABASE: Drink[] = [
  // ==========================================
  // THỨC UỐNG TỰ LÀM TẠI NHÀ (TIẾT KIỆM CHO SINH VIÊN)
  // ==========================================
  {
    id: 'tra-chanh-sa-hat-chia',
    name: 'Trà Chanh Sả Hạt Chia Mật Ong',
    origin: 'homemade',
    category: 'trà hoa quả',
    estimatedCost: 4000,
    costLabel: 'Chỉ ~4.000đ / cốc',
    calories: 45,
    timeEstimate: '5 phút làm',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    description: 'Thức uống giải nhiệt quốc dân cực rẻ. Vị chua thanh của chanh, thơm nồng của sả đập dập hòa cùng chút mật ong ngọt dịu và hạt chia giòn sần sật.',
    benefit: 'Thanh lọc cơ thể, bổ sung Vitamin C tăng đề kháng, giảm căng thẳng ôn thi',
    ingredients: [
      '1 gói trà túi lọc (Lipton hoặc Cozy)',
      '1 quả chanh tươi vắt lấy nước cốt',
      '1 nhánh sả đập dập',
      '1 thìa mật ong hoặc 2 thìa đường cát',
      '1 thìa cà phê hạt chia ngâm nở',
      'Đá viên lạnh'
    ],
    instructions: [
      'Ủ túi trà cùng nhánh sả đập dập trong 150ml nước sôi khoảng 3 - 5 phút.',
      'Vớt bỏ bã trà, cho mật ong (hoặc đường) và nước cốt chanh vào khuấy tan.',
      'Thêm hạt chia đã nở, đổ đá viên đầy ly và thưởng thức ngay.'
    ],
    studentTip: 'Mua 1 lạng hạt chia 20k dùng được cả tháng; sả mua 2k được 3 nhánh.'
  },
  {
    id: 'ca-phe-sua-da-phin',
    name: 'Cà Phê Sữa Đá Phin Đậm Đà',
    origin: 'homemade',
    category: 'cà phê',
    estimatedCost: 5000,
    costLabel: 'Chỉ ~5.000đ / cốc',
    calories: 140,
    timeEstimate: '4 phút pha',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    description: 'Ly cà phê phin truyền thống nhỏ giọt thơm nức phòng trọ, quyện cùng sữa đặc béo ngậy. Năng lượng tỉnh táo đỉnh cao cho những buổi sáng đi học sớm.',
    benefit: 'Tỉnh táo tức thì, tập trung cao độ làm bài tập và ôn thi',
    ingredients: [
      '20g bột cà phê nguyên chất (Trung Nguyên hoặc gu mộc)',
      '2 - 3 thìa canh sữa đặc Ông Thọ',
      '60ml nước sôi 95°C',
      'Đá viên'
    ],
    instructions: [
      'Cho sữa đặc vào đáy ly thủy tinh.',
      'Cho cà phê vào phin, gài nhẹ nắp chặn, rót 20ml nước sôi ủ 1 phút rồi rót tiếp 40ml còn lại.',
      'Chờ cà phê nhỏ giọt xong, khuấy đều tay cho bọt sữa hòa quyện rồi trút đá viên vào.'
    ],
    studentTip: 'Ủ cà phê 1 phút bằng nước sôi trước khi ép giúp cà phê thơm gấp đôi.'
  },
  {
    id: 'tra-tac-hoa-nhai-khong-lo',
    name: 'Trà Tắc Hoa Nhài Khổng Lồ',
    origin: 'homemade',
    category: 'trà hoa quả',
    estimatedCost: 3000,
    costLabel: 'Chỉ ~3.000đ / cốc lớn',
    calories: 55,
    timeEstimate: '3 phút làm',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    description: 'Vị chát nhẹ của trà nhài kết hợp tinh dầu vỏ tắc thơm nức mũi. Vị chua ngọt cân bằng uống cực kỳ đã khát giữa trưa hè oi ả.',
    benefit: 'Giải khát tức thì, dịu cơn đau rát họng, hỗ trợ tiêu hóa tốt',
    ingredients: [
      '1 gói trà lài (nhài) túi lọc',
      '4 - 5 quả tắc (quất) tươi mọng nước',
      '2 thìa đường cát hoặc đường phèn',
      'Đá viên mát lạnh'
    ],
    instructions: [
      'Hãm trà lài với 200ml nước sôi trong 3 phút rồi vớt túi lọc.',
      'Hòa tan đường vào nước trà lúc còn ấm.',
      'Vắt 3 quả tắc lấy nước, 1-2 quả thái lát mỏng thả vào cốc để tinh dầu tỏa hương, thêm đá đầy cốc lắc đều.'
    ],
    studentTip: 'Không vắt kiệt hạt tắc vào trà để tránh bị đắng chát.'
  },
  {
    id: 'nuoc-dau-den-gao-lut-rang',
    name: 'Nước Đậu Đen & Gạo Lứt Rang',
    origin: 'homemade',
    category: 'thanh nhiệt/healthy',
    estimatedCost: 2000,
    costLabel: 'Chỉ ~2.000đ / bình 1 lít',
    calories: 20,
    timeEstimate: '10 phút hãm bình giữ nhiệt',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    description: 'Thức uống detox lành tính không đường, nước màu đỏ tím cánh gián, hương thơm bùi của gạo rang và đậu đen xanh lòng. Rất tốt để uống thay nước lọc cả ngày.',
    benefit: 'Mát gan, giải độc, đẹp da, không lo mụn nhọt khi thức khuya',
    ingredients: [
      '2 thìa đỗ đen lòng xanh đã rang chín',
      '2 thìa gạo lứt đã rang thơm',
      '1 lít nước sôi nóng',
      'Bình giữ nhiệt'
    ],
    instructions: [
      'Rang sẵn 1 hũ đỗ đen và gạo lứt bảo quản dùng cả tháng.',
      'Mỗi sáng cho 4 thìa hỗn hợp vào bình giữ nhiệt, đổ 1 lít nước sôi vào.',
      'Đậy nắp ủ 15 phút là có nước uống cả ngày mang lên giảng đường.'
    ],
    studentTip: 'Bã đỗ và gạo lứt sau khi hãm có thể ăn luôn như cháo rất bùi và tốt cho tiêu hóa.'
  },
  {
    id: 'sua-ngo-non-tu-nau',
    name: 'Sữa Ngô Non Thơm Béo Tự Nấu',
    origin: 'homemade',
    category: 'thanh nhiệt/healthy',
    estimatedCost: 6000,
    costLabel: 'Chỉ ~6.000đ / cốc',
    calories: 165,
    timeEstimate: '15 phút',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: 'Hương ngô ngọt thanh tự nhiên quyện cùng sữa tươi béo thơm ngậy. Uống nóng ấm bụng vào mùa đông hoặc thêm đá uống mát lạnh mùa hè.',
    benefit: 'Bổ sung chất xơ, vitamin A sáng mắt cho sinh viên dùng máy tính nhiều',
    ingredients: [
      '1 bắp ngô ngọt (bắp Mỹ)',
      '100ml sữa tươi không đường',
      '2 thìa sữa đặc',
      '500ml nước lọc'
    ],
    instructions: [
      'Tách hạt ngô, luộc hạt cùng lõi ngô trong 500ml nước 10 phút để lấy nước ngọt.',
      'Bỏ lõi, cho hạt ngô và nước luộc vào máy xay sinh tố xay nhuyễn mịn.',
      'Lọc qua rây, đun nhỏ lửa cùng sữa tươi và sữa đặc đến khi lăn tăn sôi là xong.'
    ],
    studentTip: 'Luộc cả lõi ngô là bí quyết giúp nước sữa ngô ngọt đậm tự nhiên mà không cần nhiều đường.'
  },
  {
    id: 'sinh-to-chuoi-sua-chua',
    name: 'Sinh Tố Chuối Sữa Chua Nạp Năng Lượng',
    origin: 'homemade',
    category: 'sinh tố/nước ép',
    estimatedCost: 7000,
    costLabel: 'Chỉ ~7.000đ / cốc',
    calories: 185,
    timeEstimate: '3 phút xay',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
    description: 'Món sinh tố cứu đói bữa phụ siêu rẻ: chuối chín ngọt bùi kết hợp sữa chua chua dịu. Thay thế hoàn hảo cho một bữa ăn nhẹ trước khi đi tập thể thao hoặc học nhóm.',
    benefit: 'Bổ sung kali chống chuột rút, hỗ trợ đường ruột khỏe mạnh',
    ingredients: [
      '1 quả chuối chín (chuối tiêu hoặc chuối tây)',
      '1 hộp sữa chua có đường (hoặc không đường)',
      '50ml sữa tươi',
      'Vài viên đá nhỏ'
    ],
    instructions: [
      'Chuối lột vỏ, bẻ khúc cho vào cối xay.',
      'Trút hộp sữa chua, sữa tươi và đá vào xay nhuyễn trong 30 giây.',
      'Rót ra ly thưởng thức ngay.'
    ],
    studentTip: 'Chuối mua cả nải ăn không hết cắt khoanh trữ ngăn đông đá xay sinh tố cực kỳ dẻo quánh như kem.'
  },
  {
    id: 'tra-sua-thai-xanh-tu-nau',
    name: 'Trà Sữa Thái Xanh Thạch Thơm Lừng',
    origin: 'homemade',
    category: 'trà sữa',
    estimatedCost: 6000,
    costLabel: 'Chỉ ~6.000đ / cốc (nấu nồi to)',
    calories: 210,
    timeEstimate: '10 phút nấu',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf5a9143c?w=600&auto=format&fit=crop&q=80',
    description: 'Trà sữa màu xanh ngọc bích bắt mắt, thơm lừng hương thảo mộc trà Thái Lan, vị béo ngọt thanh của sữa béo ngậy. Nấu 1 gói được cả chục cốc chia bạn cùng phòng trọ.',
    benefit: 'Giải tỏa stress, thơm ngon béo ngậy chuẩn vị quán xá mà sạch sẽ tiết kiệm 80%',
    ingredients: [
      '20g trà Thái xanh khô',
      '100ml sữa đặc',
      '1 gói sữa tươi không đường',
      '1 lít nước lọc'
    ],
    instructions: [
      'Đun sôi 1 lít nước, cho trà Thái vào đun 3 phút rồi tắt bếp ủ 10 phút.',
      'Lọc bỏ bã trà, nước trà sẽ có màu xanh đậm.',
      'Cho sữa đặc và sữa tươi vào khuấy đều, nước trà lập tức chuyển sang màu xanh ngọc đẹp mắt.',
      'Để nguội, cất tủ lạnh dùng dần cùng đá viên.'
    ],
    studentTip: 'Gói trà Thái 50k nấu được 25 - 30 cốc, rẻ gấp 5 lần mua ngoài tiệm.'
  },

  // ==========================================
  // THỨC UỐNG MUA TẠI QUÁN / CỬA HÀNG GẦN ĐÂY
  // ==========================================
  {
    id: 'ca-phe-muoi-sinh-vien',
    name: 'Cà Phê Muối Kem Béo Sinh Viên',
    origin: 'nearby_shop',
    category: 'cà phê',
    estimatedCost: 18000,
    costLabel: '15.000đ - 22.000đ',
    calories: 195,
    timeEstimate: 'Mua lấy ngay 2 phút',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80',
    description: 'Món cà phê hottrend làm mưa làm gió quanh các cổng trường đại học. Lớp kem muối mằn mặn béo ngậy phủ bên trên lớp cà phê đen đá đắng thơm.',
    benefit: 'Tỉnh táo bừng tỉnh mọi giác quan, vị mặn ngọt kích thích vị giác',
    popularPlaces: ['Quầy cà phê muối vỉa hè', 'Chú Long Cafe', 'Tiệm Cafe Sinh Viên'],
    googleMapsQuery: 'cà phê muối sinh viên gần đây'
  },
  {
    id: 'nuoc-mia-sieu-sach-sau-rieng',
    name: 'Nước Mía Siêu Sạch Sầu Riêng / Trân Châu',
    origin: 'nearby_shop',
    category: 'thanh nhiệt/healthy',
    estimatedCost: 12000,
    costLabel: '10.000đ - 15.000đ',
    calories: 140,
    timeEstimate: 'Ép tại chỗ 1 phút',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    description: 'Ly nước mía xanh mát ép trực tiếp cùng quả tắc thơm lừng, mix thêm cơm sầu riêng béo hoặc trân châu dai dai. Món giải khát siêu rẻ của sinh viên sau mỗi trận bóng đá.',
    benefit: 'Hạ nhiệt cấp tốc, bù khoáng và năng lượng sau giờ học thể dục',
    popularPlaces: ['Các xe nước mía cổng KTX', 'Xe đẩy cổng trường ĐH'],
    googleMapsQuery: 'nước mía gần đây'
  },
  {
    id: 'tra-sua-tran-chau-duong-den',
    name: 'Trà Sữa Trân Châu Đường Đen',
    origin: 'nearby_shop',
    category: 'trà sữa',
    estimatedCost: 25000,
    costLabel: '20.000đ - 35.000đ',
    calories: 340,
    timeEstimate: 'Lấy ngay 3 phút',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf5a9143c?w=600&auto=format&fit=crop&q=80',
    description: 'Trân châu nấu đường nâu dẻo mềm ấm nóng quyện vào dòng sữa tươi thanh trùng mát lạnh béo ngậy. Món quà chiều yêu thích của hội bạn thân.',
    benefit: 'Nạp năng lượng tức thì khi mệt mỏi, tâm trạng vui vẻ phấn chấn',
    popularPlaces: ['Mixue', 'Ding Tea', 'Đô Đô 21k', 'TocoToco'],
    googleMapsQuery: 'trà sữa gần đây'
  },
  {
    id: 'tra-mang-cau-tra-dau',
    name: 'Trà Mãng Cầu Tươi / Trà Dâu Tằm Giòn Cay',
    origin: 'nearby_shop',
    category: 'trà hoa quả',
    estimatedCost: 22000,
    costLabel: '20.000đ - 28.000đ',
    calories: 130,
    timeEstimate: 'Lấy ngay 2 phút',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    description: 'Thịt mãng cầu xiêm chua ngọt dầm cùng nước cốt trà lài thơm ngát. Từng miếng mãng cầu dai giòn sần sật nhai cực đã miệng.',
    benefit: 'Nhiều vitamin C, chống oxy hóa, xua tan cơn buồn ngủ uể oải',
    popularPlaces: ['Tiệm trà chanh phố', 'Quán nước ép vỉa hè', 'Tiệm trà hoa quả'],
    googleMapsQuery: 'tiệm trà hoa quả gần đây'
  },
  {
    id: 'nuoc-dua-xiem-tuoi',
    name: 'Nước Dừa Xiêm Tươi Bến Tre Nguyên Trái',
    origin: 'nearby_shop',
    category: 'thanh nhiệt/healthy',
    estimatedCost: 18000,
    costLabel: '15.000đ - 25.000đ',
    calories: 55,
    timeEstimate: 'Chặt lấy ngay 1 phút',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&auto=format&fit=crop&q=80',
    description: 'Trái dừa xiêm được chặt tại chỗ, nước ngọt lịm tự nhiên không pha đường, cơm dừa non mềm mượt nạo ăn bùi bùi.',
    benefit: '100% tự nhiên không hóa chất, bù điện giải tuyệt vời khi ốm sốt',
    popularPlaces: ['Vựa dừa vỉa hè', 'Cửa hàng hoa quả tươi', 'Tạp hóa gần KTX'],
    googleMapsQuery: 'dừa xiêm tươi gần đây'
  },
  {
    id: 'bac-xiu-da-sai-gon',
    name: 'Bạc Xỉu Đá Sài Gòn 3 Tầng Kem Sữa',
    origin: 'nearby_shop',
    category: 'cà phê',
    estimatedCost: 18000,
    costLabel: '15.000đ - 25.000đ',
    calories: 180,
    timeEstimate: 'Pha nhanh 2 phút',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    description: 'Thức uống kinh điển: nhiều sữa ít cà phê, béo ngậy ngọt ngào phù hợp cho bạn nào thích hương cà phê nhưng sợ say hoặc mất ngủ.',
    benefit: 'Tỉnh táo nhẹ nhàng, êm dịu dạ dày',
    popularPlaces: ['Khafe Sinh Viên', 'Quán cóc ven đường', 'Highlands / Aha'],
    googleMapsQuery: 'quán cà phê gần đây'
  }
];
