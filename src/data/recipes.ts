import { Dish } from '../types/food';

export const RECIPES_DATABASE: Dish[] = [
  // --- CÁC MÓN TỪ TRỨNG ---
  {
    id: 'trung-sot-ca-chua',
    name: 'Trứng Sốt Cà Chua',
    mainIngredients: ['2 quả trứng gà/vịt', '1-2 quả cà chua', 'Hành lá', 'Gia vị cơ bản (mắm, tiêu, hạt nêm)'],
    matchKeywords: ['trung', 'trứng', 'ca chua', 'cà chua', 'hanh', 'hành', 'trung ga', 'trứng gà', 'trung vit'],
    shortDescription: 'Món ăn quốc dân siêu đưa cơm, nấu chỉ mất 7 phút. Trứng mềm xốp quyện đẫm sốt cà chua chua ngọt đậm đà.',
    estimatedCost: 12000,
    costLevel: 'budget',
    cookingTimeMinutes: 8,
    category: 'món mặn',
    servings: '1 - 2 người',
    steps: [
      'Đánh tan 2 quả trứng với chút hạt nêm và tiêu. Phi thơm đầu hành rồi đổ trứng vào đảo tơi vừa chín tới thì trút ra đĩa.',
      'Cho tiếp cà chua bổ múi cau vào chảo, dầm mềm với xíu nước mắm và đường tạo sốt sền sệt.',
      'Đổ trứng vào đảo đều cùng sốt cà chua trong 1 phút, rắc hành lá cắt nhỏ lên trên rồi tắt bếp.'
    ],
    tip: 'Để cà chua nhanh nhừ nát thành sốt mịn, cho một nhúm muối nhỏ vào lúc xào cà chua.'
  },
  {
    id: 'trung-ran-hanh-hoa',
    name: 'Trứng Rán Hành Hoa Thịt Băm',
    mainIngredients: ['2 quả trứng', '50g thịt băm (hoặc không cần thịt)', 'Hành lá nhiều', 'Nước mắm, tiêu'],
    matchKeywords: ['trung', 'trứng', 'thit bam', 'thịt băm', 'hanh', 'hành lá', 'thit heo'],
    shortDescription: 'Trứng chiên vàng rộm, thơm lừng mùi hành hoa phi cháy cạnh. Món cứu đói cấp tốc ngon lành và giàu dinh dưỡng.',
    estimatedCost: 15000,
    costLevel: 'budget',
    cookingTimeMinutes: 10,
    category: 'món mặn',
    servings: '1 - 2 người',
    steps: [
      'Đập trứng vào bát, thêm thịt băm nhỏ, hành lá cắt nhuyễn, 1 thìa cà phê nước mắm, xíu tiêu và 1 thìa nước lọc rồi đánh thật bông.',
      'Làm nóng chảo với 1 thìa dầu ăn, dầu nóng già thì trút hỗn hợp trứng vào.',
      'Hạ lửa vừa, đậy vung 2 phút cho trứng nở phồng chín đều, lật mặt chiên vàng rồi lấy ra cắt miếng.'
    ],
    tip: 'Thêm 1 thìa nước lọc khi đánh trứng giúp trứng rán xốp mềm, không bị khô xác.'
  },
  {
    id: 'canh-ca-chua-trung-may',
    name: 'Canh Cà Chua Trứng Mây',
    mainIngredients: ['1 quả trứng', '2 quả cà chua', 'Hành lá, rau mùi (ngò)', 'Gia vị'],
    matchKeywords: ['trung', 'trứng', 'ca chua', 'cà chua', 'canh', 'hanh'],
    shortDescription: 'Bát canh chua dịu thanh mát, vân trứng xòe mềm như mây. Cực kỳ giải nhiệt và trôi cơm mà chi phí chỉ bằng cốc trà đá.',
    estimatedCost: 10000,
    costLevel: 'budget',
    cookingTimeMinutes: 10,
    category: 'món canh',
    servings: '1 - 2 người',
    steps: [
      'Phi thơm hành, cho cà chua thái lát vào xào chín mềm để ra màu đỏ đẹp tự nhiên.',
      'Chế 400ml nước vào đun sôi, nêm gia vị bột canh, mì chính vừa miệng.',
      'Hạ nhỏ lửa, từ từ rót trứng đã đánh tan vào nồi, dùng đũa khuấy nhẹ theo 1 chiều để tạo vân mây, rắc hành ngò rồi tắt bếp.'
    ],
    tip: 'Khuấy nhẹ tay theo một chiều khi nước đang sôi liu riu sẽ tạo thành những sợi vân trứng mỏng đẹp lung linh.'
  },
  {
    id: 'trung-ngam-tuong-long-dao',
    name: 'Trứng Lòng Đào Ngâm Tương',
    mainIngredients: ['3-4 quả trứng gà', 'Nước tương (xì dầu)', 'Tỏi, ớt, hành tây, mè rang'],
    matchKeywords: ['trung', 'trứng', 'nuoc tuong', 'xì dầu', 'toi', 'tỏi', 'ot', 'ớt'],
    shortDescription: 'Món "hot trend" sinh viên làm một lần ăn được 2 ngày. Lòng đỏ dẻo quánh béo ngậy ngấm sốt tương mặn ngọt cay cay.',
    estimatedCost: 20000,
    costLevel: 'medium',
    cookingTimeMinutes: 15,
    category: 'món mặn',
    servings: '2 bữa sinh viên',
    steps: [
      'Luộc trứng trong nước sôi đúng 6 phút rồi vớt ra ngâm ngay vào âu nước đá lạnh để bóc vỏ dễ dàng.',
      'Pha nước sốt gồm nước tương, nước lọc, đường tỉ lệ 1:1:0.8, khuấy tan rồi thêm tỏi ớt băm, hành tây thái mỏng.',
      'Xếp trứng bóc vỏ vào hộp, chan nước sốt ngập trứng, để tủ lạnh sau 2-4 tiếng là ăn với cơm nóng cực ngon.'
    ],
    tip: 'Trứng gà luộc đúng 6 phút lòng đào dẻo, ngâm nước đá lạnh vỏ tróc tuột trong tích tắc.'
  },

  // --- CÁC MÓN TỪ ĐẬU PHỤ ---
  {
    id: 'dau-phu-sot-ca-chua',
    name: 'Đậu Phụ Sốt Cà Chua Hành Hoa',
    mainIngredients: ['2 bìa đậu phụ', '2 quả cà chua', 'Hành lá, tỏi', 'Nước mắm, đường, tiêu'],
    matchKeywords: ['dau phu', 'đậu phụ', 'dau', 'đậu', 'ca chua', 'cà chua', 'hanh'],
    shortDescription: 'Món ăn kinh điển của mọi phòng trọ sinh viên. Đậu phụ rán mềm béo quyện nước sốt chua cay ngọt thơm ngát hành hoa.',
    estimatedCost: 14000,
    costLevel: 'budget',
    cookingTimeMinutes: 12,
    category: 'món mặn',
    servings: '1 - 2 người',
    steps: [
      'Đậu phụ cắt miếng vuông vừa ăn, đem rán vàng đều các mặt rồi vớt ra.',
      'Cà chua thái hạt lựu, phi thơm tỏi băm rồi cho cà chua vào đảo nhuyễn cùng 1 thìa mắm, 1 thìa đường.',
      'Thả đậu phụ vào đảo nhẹ tay cho ngấm sốt trong 3 phút, sốt sệt lại rắc hành lá là hoàn thành.'
    ],
    tip: 'Rán đậu vàng mặt ngoài nhưng bên trong vẫn giữ độ ẩm mọng nước sẽ ngon hơn rán quá khô giòn.'
  },
  {
    id: 'dau-phu-ran-gion-mam-tom',
    name: 'Đậu Phụ Rán Giòn Chấm Mắm Tỏi Cay',
    mainIngredients: ['3 bìa đậu phụ', 'Tỏi, ớt tươi, chanh', 'Nước mắm ngon (hoặc mắm tôm)', 'Dưa chuột ăn kèm'],
    matchKeywords: ['dau phu', 'đậu phụ', 'dau', 'đậu', 'mam tom', 'mắm', 'toi', 'tỏi', 'dua chuot'],
    shortDescription: 'Vỏ ngoài giòn rụm rùm rụm, ruột trong mềm mịn béo ngậy. Chấm nước mắm tỏi ớt chua ngọt hay mắm tôm sủi bọt đều mê.',
    estimatedCost: 12000,
    costLevel: 'budget',
    cookingTimeMinutes: 10,
    category: 'món mặn',
    servings: '1 - 2 người',
    steps: [
      'Đậu thấm khô nước bằng khăn giấy để khi rán không bị bắn dầu, cắt miếng quân cờ.',
      'Dầu sôi già thì thả đậu vào chiên ngập dầu lửa vừa đến khi vàng ruộm giòn tan.',
      'Pha nước mắm chanh tỏi ớt đường chua cay mặn ngọt hoặc mắm tôm đánh bông với nước cốt chanh.'
    ],
    tip: 'Thấm thật khô đậu trước khi rán, không đảo nhiều khi đậu chưa se vàng mặt để tránh nát đậu.'
  },
  {
    id: 'dau-phu-nhoi-thit-sot-ca',
    name: 'Đậu Phụ Nhồi Thịt Băm Sốt Cà',
    mainIngredients: ['2 bìa đậu phụ', '80g thịt băm', '1 quả cà chua', 'Mộc nhĩ (tùy chọn), hành'],
    matchKeywords: ['dau phu', 'đậu phụ', 'thit bam', 'thịt băm', 'ca chua', 'cà chua', 'dau'],
    shortDescription: 'Bữa cơm thịnh soạn chuẩn mẹ nấu. Miếng đậu béo núng nính ôm trọn phần nhân thịt băm đậm đà ngấm đẫm sốt cà chua.',
    estimatedCost: 28000,
    costLevel: 'medium',
    cookingTimeMinutes: 20,
    category: 'món mặn',
    servings: '2 người',
    steps: [
      'Thịt băm ướp hành tím, hạt nêm, tiêu. Đậu phụ khía giữa hoặc khoét rỗng ruột rồi nhồi nhân thịt vào.',
      'Chiên sơ mặt có thịt cho se lại rồi gắp ra đĩa.',
      'Làm sốt cà chua sền sệt, thả đậu nhồi vào om nhỏ lửa 8 phút cho thịt chín ngọt, rưới sốt lên cơm nóng.'
    ],
    tip: 'Phần ruột đậu khoét ra hãy dầm nát trộn chung với thịt băm để nhân vừa nhiều vừa mềm ngọt không bị khô.'
  },

  // --- CÁC MÓN MÌ TÔM TIẾT KIỆM ---
  {
    id: 'mi-tom-xao-xuc-xich-rau-cai',
    name: 'Mì Tôm Xào Xúc Xích & Rau Cải',
    mainIngredients: ['1 gói mì tôm (Hảo Hảo / Omachi)', '1 cây xúc xích', '1 nắm rau cải ngọt hoặc bắp cải', 'Tỏi băm'],
    matchKeywords: ['mi tom', 'mì tôm', 'xuc xich', 'xúc xích', 'rau cai', 'rau cải', 'bap cai', 'bắp cải'],
    shortDescription: 'Món ăn đêm huyền thoại nâng tầm bữa mì sinh viên. Sợi mì dai giòn đậm vị, xúc xích thơm lừng xào cùng rau xanh thanh mát.',
    estimatedCost: 16000,
    costLevel: 'budget',
    cookingTimeMinutes: 10,
    category: 'món nhanh',
    servings: '1 người',
    steps: [
      'Trần mì qua nước sôi khoảng 1 phút cho sợi tơi ra rồi vớt ngay xả nước lạnh để mì không bị nhũn.',
      'Phi thơm tỏi, cho xúc xích thái lát và rau cải vào đảo nhanh tay ở lửa lớn.',
      'Trút mì vào chảo, nêm 1/2 gói gia vị mì và chút xì dầu, đảo đều tay 2 phút cho săn sợi mì rồi tắt bếp.'
    ],
    tip: 'Xả mì qua nước lạnh ngay sau khi trần sẽ giúp sợi mì dai giòn sần sật không bao giờ bị bết dính.'
  },
  {
    id: 'mi-tom-nau-trung-ca-chua',
    name: 'Mì Tôm Trứng Cà Chua Nóng Hổi',
    mainIngredients: ['1 gói mì tôm', '1 quả trứng gà', '1 quả cà chua', 'Hành lá tươi'],
    matchKeywords: ['mi tom', 'mì tôm', 'trung', 'trứng', 'ca chua', 'cà chua', 'hanh'],
    shortDescription: 'Bát mì ấm bụng ngày mưa hoặc học thi khuya. Nước dùng cà chua chua thanh làm dịu vị cay nóng, thêm quả trứng trần béo bùi.',
    estimatedCost: 14000,
    costLevel: 'budget',
    cookingTimeMinutes: 7,
    category: 'món nhanh',
    servings: '1 người',
    steps: [
      'Xào cà chua mềm với chút dầu ăn để ra nước màu đỏ cam hấp dẫn.',
      'Thêm 350ml nước đun sôi bùng, cho gói rau sấy và nửa gói muối mì tôm vào.',
      'Thả vắt mì và đập 1 quả trứng trực tiếp vào nồi, đun 2 phút cho trứng lòng đào vừa chín tới, rắc hành lá ăn ngay.'
    ],
    tip: 'Đừng nấu trứng quá lâu kẻo mất vị béo lòng đào; chỉ cần 2 phút đậy vung là đạt chuẩn.'
  },

  // --- CÁC MÓN TỪ THỊT BĂM & THỊT HEO ---
  {
    id: 'thit-bam-rang-chay-canh',
    name: 'Thịt Băm Rang Cháy Cạnh Hành Tỏi',
    mainIngredients: ['150g thịt heo băm', 'Hành tím, tỏi khô', 'Hành lá', 'Nước mắm, đường, tiêu đen'],
    matchKeywords: ['thit bam', 'thịt băm', 'thit heo', 'thịt', 'hanh', 'hành', 'toi', 'tỏi'],
    shortDescription: 'Cực phẩm vét sạch nồi cơm sinh viên. Thịt băm xém vàng thơm nức mùi nước mắm cốt và tiêu xay, đậm đà khó cưỡng.',
    estimatedCost: 26000,
    costLevel: 'medium',
    cookingTimeMinutes: 12,
    category: 'món mặn',
    servings: '2 người',
    steps: [
      'Cho thịt băm vào chảo khô, đảo lửa vừa cho thịt tự tiết mỡ và săn lại.',
      'Khi thịt bắt đầu xém vàng cạnh, cho hành tỏi băm vào phi thơm cùng mỡ thịt.',
      'Nêm 1.5 thìa nước mắm, 1 thìa đường, chút tiêu xay đảo nhanh 2 phút cho thịt ngấm màu cánh gián bóng bẩy.'
    ],
    tip: 'Chọn phần thịt băm có lẫn xíu mỡ (nạc vai) để khi rang không cần thêm dầu ăn mà thịt vẫn mềm ẩm béo ngậy.'
  },
  {
    id: 'canh-bi-dao-thit-bam',
    name: 'Canh Bí Đao Nấu Thịt Băm',
    mainIngredients: ['1/2 quả bí đao (bí xanh)', '60g thịt băm', 'Hành lá, mùi tàu', 'Gia vị canh'],
    matchKeywords: ['bi dao', 'bí đao', 'bi xanh', 'bí xanh', 'thit bam', 'thịt băm', 'canh', 'thit'],
    shortDescription: 'Bát canh ngọt mát lành thanh lọc cơ thể. Bí đao giòn ngọt tự nhiên kết hợp vị ngọt đậm của thịt băm.',
    estimatedCost: 20000,
    costLevel: 'medium',
    cookingTimeMinutes: 15,
    category: 'món canh',
    servings: '2 người',
    steps: [
      'Bí đao gọt vỏ, bỏ ruột, cắt miếng mỏng vừa ăn. Thịt băm ướp chút hạt nêm.',
      'Phi thơm hành tím, xào săn thịt băm rồi đổ 500ml nước vào đun sôi, hớt sạch bọt.',
      'Thả bí đao vào nấu sôi lại trong 3 phút là bí chín tới trong veo, nêm vừa miệng và rắc hành hoa.'
    ],
    tip: 'Bí đao thái mỏng nấu nhanh chín và không bị nát; tắt bếp khi bí vừa trong veo giữ độ giòn ngọt.'
  },
  {
    id: 'canh-rau-ngot-thit-bam',
    name: 'Canh Rau Ngót Thịt Băm Thanh Nhiệt',
    mainIngredients: ['1 bó rau ngót', '60g thịt băm', 'Hành khô', 'Gia vị cơ bản'],
    matchKeywords: ['rau ngot', 'rau ngót', 'thit bam', 'thịt băm', 'canh', 'thit'],
    shortDescription: 'Món canh bồi dưỡng sức khỏe kinh điển. Vị rau bùi ngọt đậm đà, mát gan bổ máu cho những đêm ôn thi căng thẳng.',
    estimatedCost: 18000,
    costLevel: 'budget',
    cookingTimeMinutes: 12,
    category: 'món canh',
    servings: '2 người',
    steps: [
      'Rau ngót tuốt lá, rửa sạch rồi vò nhẹ bằng tay để lá rau mềm và tiết vị ngọt khi nấu.',
      'Phi thơm hành khô, xào thịt băm chín tới rồi cho rau ngót vào xào cùng 1 phút với chút muối.',
      'Thêm nước vào nồi, đun sôi bùng khoảng 3-4 phút đến khi rau mềm ngọt là thưởng thức.'
    ],
    tip: 'Vò nhẹ lá rau ngót trước khi xào giúp nước canh ngọt đậm đà gấp đôi.'
  },
  {
    id: 'thit-ba-chi-rang-chay-canh',
    name: 'Thịt Ba Chỉ Rang Cháy Cạnh Giòn Ngọt',
    mainIngredients: ['150g thịt ba chỉ', 'Hành tím, tỏi', 'Nước mắm, đường, tiêu, ớt'],
    matchKeywords: ['thit ba chi', 'thịt ba chỉ', 'thit heo', 'thịt', 'hanh', 'toi'],
    shortDescription: 'Từng miếng thịt ba chỉ mỡ giòn nạc mềm xém cạnh, thơm lừng mắm đường mặn ngọt sánh bóng.',
    estimatedCost: 35000,
    costLevel: 'medium',
    cookingTimeMinutes: 15,
    category: 'món mặn',
    servings: '2 người',
    steps: [
      'Thịt ba chỉ thái miếng mỏng vừa. Cho vào chảo đảo không dầu đến khi mỡ tươm ra và mép thịt xém vàng.',
      'Chắt bớt phần mỡ thừa ra chén (để dành xào rau), giữ lại thịt trong chảo.',
      'Cho hành tỏi vào phi thơm rồi nêm mắm, đường, tiêu đảo đều tay đến khi sốt bám kẹo vào từng miếng thịt.'
    ],
    tip: 'Chắt bớt mỡ heo rán ra dùng để xào rau muống hay xào bắp cải vừa tiết kiệm dầu ăn vừa thơm hơn gấp nhiều lần.'
  },

  // --- CÁC MÓN TỪ CƠM NGUỘI ---
  {
    id: 'com-rang-trung-xuc-xich',
    name: 'Cơm Rang Trứng & Xúc Xích Hạt Vàng Tơi',
    mainIngredients: ['1 bát tô cơm nguội', '1 quả trứng', '1 cây xúc xích', 'Hành lá, nước tương, dầu hào'],
    matchKeywords: ['com nguoi', 'cơm nguội', 'com', 'cơm', 'trung', 'trứng', 'xuc xich', 'xúc xích', 'hanh'],
    shortDescription: 'Giải cứu cơm nguội biến thành đĩa cơm rang màu vàng óng ả tơi xốp, hạt cơm giòn dai thơm mùi hành hoa và xúc xích.',
    estimatedCost: 18000,
    costLevel: 'budget',
    cookingTimeMinutes: 12,
    category: 'món cơm',
    servings: '1 - 2 người',
    steps: [
      'Đập 1 quả trứng trực tiếp vào bát cơm nguội, dùng bao tay bóp đều để từng hạt cơm được áo một lớp lòng đỏ vàng óng.',
      'Phi thơm đầu hành, xào xúc xích thái hạt lựu chín thơm rồi trút ra đĩa.',
      'Cho cơm đã trộn trứng vào chảo đảo liên tục ở lửa lớn đến khi hạt cơm săn lại tơi xốp, nêm nước tương, trút xúc xích và hành lá vào đảo đều.'
    ],
    tip: 'Trộn trứng vào cơm nguội trước khi rang là bí quyết vàng giúp hạt cơm tơi xốp không dính chảo và màu đẹp rực rỡ.'
  },
  {
    id: 'com-rang-kim-chi-trung-op-la',
    name: 'Cơm Chiên Kim Chi Trứng Ốp La',
    mainIngredients: ['1 bát cơm nguội', '1 gói kim chi nhỏ (hoặc dưa chua)', '1 quả trứng gà', 'Hành lá, tương ớt'],
    matchKeywords: ['com nguoi', 'cơm nguội', 'kim chi', 'dua chua', 'dưa chua', 'trung', 'trứng', 'com'],
    shortDescription: 'Hương vị chuẩn phim Hàn với chi phí sinh viên. Vị cay tê giòn rụm của kim chi hòa cùng lòng đỏ trứng ốp la béo ngậy.',
    estimatedCost: 22000,
    costLevel: 'medium',
    cookingTimeMinutes: 10,
    category: 'món cơm',
    servings: '1 người',
    steps: [
      'Cắt nhỏ kim chi, phi hành thơm rồi xào kim chi với xíu đường để dịu bớt vị chua gắt.',
      'Cho cơm nguội vào dằm tơi, đảo đều tay cho cơm ngấm màu đỏ đẹp từ nước kim chi.',
      'Ốp la 1 quả trứng lòng đào đặt lên trên đĩa cơm, rắc thêm xíu vừng rang hoặc rong biển vụn nếu có.'
    ],
    tip: 'Xào kim chi với chút đường trước sẽ làm dậy mùi thơm ngào ngạt và cân bằng độ chua hoàn hảo.'
  },

  // --- CÁC MÓN RAU XÀO & LUỘC THANH ĐẠM ---
  {
    id: 'rau-muong-xao-toi',
    name: 'Rau Muống Xào Tỏi Giòn Xanh',
    mainIngredients: ['1 mớ rau muống', '1 củ tỏi đập dập', 'Dầu ăn, hạt nêm, nước mắm'],
    matchKeywords: ['rau muong', 'rau muống', 'rau', 'toi', 'tỏi'],
    shortDescription: 'Món rau bất hủ trên mâm cơm Việt. Rau muống giòn sần sật, xanh mướt bóng bẩy thơm nức mũi mùi tỏi phi.',
    estimatedCost: 12000,
    costLevel: 'budget',
    cookingTimeMinutes: 8,
    category: 'món xào',
    servings: '2 người',
    steps: [
      'Rau muống nhặt khúc non, rửa sạch để ráo. Tỏi bóc vỏ đập dập chia làm 2 phần.',
      'Đun nước sôi già với xíu muối, trần nhanh rau muống trong 30 giây rồi vớt ra ngâm nước lạnh để rau luôn xanh giòn.',
      'Phi thơm phần tỏi thứ nhất, cho rau vào xào lửa thật lớn trong 2 phút với hạt nêm, trước khi tắt bếp cho nốt tỏi còn lại vào đảo thơm.'
    ],
    tip: 'Xào rau ở lửa cực lớn và cho thêm một ít tỏi sống vào cuối cùng để món rau thơm nồng nặc chuẩn nhà hàng.'
  },
  {
    id: 'rau-muong-luoc-vat-chanh',
    name: 'Rau Muống Luộc & Nước Canh Vắt Chanh',
    mainIngredients: ['1 mớ rau muống', '1/2 quả chanh', 'Nước mắm tỏi ớt (hoặc tương bần)', 'Muối hạt'],
    matchKeywords: ['rau muong', 'rau muống', 'chanh', 'canh', 'rau'],
    shortDescription: '1 công đôi việc: Vừa có đĩa rau luộc xanh mướt chấm mắm, vừa có bát nước canh chua thanh giải nhiệt mùa hè cực sướng.',
    estimatedCost: 10000,
    costLevel: 'budget',
    cookingTimeMinutes: 8,
    category: 'món canh',
    servings: '2 người',
    steps: [
      'Đun sôi 600ml nước với nửa thìa muối hạt. Nước sôi bùng thả rau ngập nước, luộc lửa lớn 3-4 phút.',
      'Vớt rau ra đĩa tãi đều để rau nguội nhanh không bị đỏ úa màu.',
      'Nước luộc để hơi nguội bớt rồi vắt nửa quả chanh và thêm xíu hạt nêm là có ngay bát canh chua dịu mát lành.'
    ],
    tip: 'Chờ nước canh bớt nóng mới vắt chanh để canh không bị đắng ngắt.'
  },
  {
    id: 'bap-cai-xao-ca-chua',
    name: 'Bắp Cải Xào Cà Chua & Tỏi',
    mainIngredients: ['300g bắp cải trắng', '1 quả cà chua', 'Tỏi, hành lá', 'Gia vị cơ bản'],
    matchKeywords: ['bap cai', 'bắp cải', 'ca chua', 'cà chua', 'toi', 'tỏi', 'rau'],
    shortDescription: 'Bắp cải giòn ngọt ngấm vị chua thanh từ cà chua. Món xào dễ làm, bảo quản được lâu trong tủ lạnh phòng trọ.',
    estimatedCost: 12000,
    costLevel: 'budget',
    cookingTimeMinutes: 10,
    category: 'món xào',
    servings: '2 người',
    steps: [
      'Bắp cải thái sợi vừa ăn, rửa sạch để ráo. Cà chua bổ múi cau.',
      'Phi thơm tỏi băm, xào cà chua mềm tạo sốt hồng nhạt.',
      'Cho bắp cải vào xào nhanh tay ở lửa lớn, nêm 1 thìa hạt nêm và chút tiêu, xào đến khi bắp cải vừa chín tới giữ độ giòn.'
    ],
    tip: 'Bắp cải mua 1 cái bắp ăn được cả tuần, chỉ cần bọc màng thực phẩm để ngăn mát không bị thâm.'
  },
  {
    id: 'canh-bap-cai-nau-gung',
    name: 'Canh Bắp Cải Nấu Gừng Ấm Bụng',
    mainIngredients: ['200g bắp cải', '1 nhánh gừng tươi đập dập', 'Hành lá', 'Gia vị'],
    matchKeywords: ['bap cai', 'bắp cải', 'gung', 'gừng', 'canh', 'rau'],
    shortDescription: 'Bát canh ngọt thanh ấm sực xua tan mệt mỏi ngày mưa lạnh. Rất tốt cho hệ tiêu hóa của sinh viên hay ăn mì tôm.',
    estimatedCost: 8000,
    costLevel: 'budget',
    cookingTimeMinutes: 8,
    category: 'món canh',
    servings: '1 - 2 người',
    steps: [
      'Bắp cải thái chỉ, gừng cạo vỏ đập dập.',
      'Đun sôi 400ml nước với xíu muối, cho gừng và bắp cải vào nấu sôi 3 phút.',
      'Nêm gia vị vừa ăn, rắc hành lá cắt nhỏ rồi múc ra bát húp nóng.'
    ],
    tip: 'Một vài lát gừng tươi giúp làm ấm dạ dày và tăng vị ngọt hậu tự nhiên của bắp cải.'
  },
  {
    id: 'khoai-tay-xao-thit-bam',
    name: 'Khoai Tây Xào Thịt Băm Đậm Đà',
    mainIngredients: ['2 củ khoai tây', '60g thịt băm', 'Hành lá, tỏi', 'Nước tương, tiêu'],
    matchKeywords: ['khoai tay', 'khoai tây', 'thit bam', 'thịt băm', 'thit', 'hanh'],
    shortDescription: 'Khoai tây bùi bùi dẻo thơm quyện cùng thịt băm mặn ngọt. Món ăn chắc dạ no lâu cho những ngày ôn thi.',
    estimatedCost: 22000,
    costLevel: 'medium',
    cookingTimeMinutes: 15,
    category: 'món mặn',
    servings: '2 người',
    steps: [
      'Khoai tây gọt vỏ, thái con chì hoặc thái lát mỏng, ngâm nước muối loãng 5 phút cho hết nhựa rồi vớt ra.',
      'Phi thơm tỏi, xào săn thịt băm với chút hạt nêm rồi trút ra.',
      'Cho khoai tây vào chảo xào với xíu nước cho khoai chín mềm dẻo, trút thịt băm vào đảo cùng 2 phút, nêm nước tương và hành lá.'
    ],
    tip: 'Ngâm khoai vào nước muối loãng giúp khoai không bị thâm đen và khi xào không bị nát bở.'
  },
  {
    id: 'canh-khoai-tay-ca-rot-thit-bam',
    name: 'Canh Khoai Tây Cà Rốt Thịt Băm',
    mainIngredients: ['1 củ khoai tây', '1/2 củ cà rốt', '80g thịt băm viên', 'Hành ngò'],
    matchKeywords: ['khoai tay', 'khoai tây', 'ca rot', 'cà rốt', 'thit bam', 'thịt băm', 'canh'],
    shortDescription: 'Bát canh củ quả bùi ngọt giàu vitamin, màu sắc bắt mắt. Nấu rất nhanh mà lại đủ chất dinh dưỡng như cơm nhà.',
    estimatedCost: 25000,
    costLevel: 'medium',
    cookingTimeMinutes: 18,
    category: 'món canh',
    servings: '2 người',
    steps: [
      'Khoai tây, cà rốt gọt vỏ cắt khối vuông nhỏ. Thịt băm vo viên tròn với chút hạt nêm.',
      'Đun sôi 500ml nước, thả từng viên thịt băm vào nấu cho ngọt nước, hớt bọt.',
      'Cho khoai tây và cà rốt vào hầm nhỏ lửa 10 phút đến khi củ mềm bùi, nêm mắm thơm và hành ngò.'
    ],
    tip: 'Cắt khoai tây và cà rốt miếng vừa phải để củ nhanh chín mềm mà không tốn nhiều gas/điện sinh viên.'
  },

  // --- CÁC MÓN TIỆN LỢI TỪ CÁ HỘP & ĐỒ KHÔ ---
  {
    id: 'ca-hop-sot-ca-chua-dap-trung',
    name: 'Cá Hộp Ba Cô Gái Sốt Cà & Đập Trứng',
    mainIngredients: ['1 hộp cá sốt cà (cá mòi/cá nục)', '1 quả trứng gà', '1/2 củ hành tây hoặc hành lá', 'Ớt tươi, tiêu'],
    matchKeywords: ['ca hop', 'cá hộp', 'ca moi', 'cá mòi', 'trung', 'trứng', 'hanh tay', 'ca chua'],
    shortDescription: 'Tuyệt chiêu nấu đồ hộp thần thánh. Sốt cá đậm đà béo ngậy được nâng tầm khi đập thêm quả trứng lòng đào chấm bánh mì hay ăn cơm đều đỉnh.',
    estimatedCost: 26000,
    costLevel: 'medium',
    cookingTimeMinutes: 8,
    category: 'món mặn',
    servings: '1 - 2 người',
    steps: [
      'Phi thơm hành tây hoặc đầu hành thái mỏng trong chảo nhỏ.',
      'Đổ nguyên hộp cá sốt cà vào chảo đun sôi lăn tăn 2 phút.',
      'Khoét một khoảng trống ở giữa chảo, đập 1 quả trứng gà vào, đậy nắp 2 phút cho lòng trắng chín se, rắc tiêu ớt ăn nóng.'
    ],
    tip: 'Có thể chấm cùng bánh mì giòn 3k là xong bữa tối ấm cúng mà không tốn công dọn rửa.'
  },
  {
    id: 'canh-bi-xanh-nau-tep-kho',
    name: 'Canh Bí Xanh Nấu Tép Khô (Tôm Khô)',
    mainIngredients: ['1/2 quả bí xanh', '2 thìa tép khô sạch', 'Hành tím, hành lá', 'Gia vị'],
    matchKeywords: ['tep kho', 'tép khô', 'tom kho', 'tôm khô', 'bi xanh', 'bí xanh', 'canh'],
    shortDescription: 'Tép khô mua 20k một gói nấu được cả chục bữa canh. Vị tép ngọt thơm lừng quyện cùng miếng bí thanh mát.',
    estimatedCost: 12000,
    costLevel: 'budget',
    cookingTimeMinutes: 10,
    category: 'món canh',
    servings: '2 người',
    steps: [
      'Tép khô rửa qua nước cho sạch bụi cát, để ráo. Bí xanh gọt vỏ thái mỏng.',
      'Phi thơm hành tím, cho tép khô vào đảo thơm nức mũi.',
      'Chế 400ml nước vào đun sôi, thả bí xanh vào nấu 3 phút, nêm bột canh và rắc hành hoa.'
    ],
    tip: 'Xào tép khô với dầu và hành tím trước sẽ khử hết mùi tanh và dậy mùi thơm ngọt ngào cho nước canh.'
  },
  {
    id: 'nam-kim-cham-xao-thit-bam',
    name: 'Nấm Kim Châm Xào Thịt Băm Dầu Hào',
    mainIngredients: ['1 gói nấm kim châm (10k)', '70g thịt băm', 'Tỏi băm, dầu hào, hành lá'],
    matchKeywords: ['nam', 'nấm', 'nam kim cham', 'nấm kim châm', 'thit bam', 'thịt băm', 'dau hao'],
    shortDescription: 'Nấm giòn ngọt sần sật xào cùng thịt băm đượm vị dầu hào óng ả. Món ăn sang xịn nhưng giá thành cực kỳ sinh viên.',
    estimatedCost: 24000,
    costLevel: 'medium',
    cookingTimeMinutes: 10,
    category: 'món xào',
    servings: '2 người',
    steps: [
      'Nấm kim châm cắt gốc, xé nhỏ, rửa sạch để ráo nước.',
      'Phi thơm tỏi, xào thịt băm chín tới với 1 thìa dầu hào và xíu hạt nêm.',
      'Cho nấm vào xào nhanh trên lửa lớn 2 phút (nấm rất nhanh chín và ra nước ngọt), rắc hành tiêu rồi gắp ra đĩa.'
    ],
    tip: 'Xào nấm kim châm trên lửa to đảo nhanh tay để giữ trọn vẹn độ giòn sần sật không bị dai nhũn.'
  },
  {
    id: 'dua-chuot-bop-chua-ngot',
    name: 'Dưa Leo Bóp Chua Ngọt Chống Ngấy',
    mainIngredients: ['2 quả dưa chuột (dưa leo)', 'Tỏi, ớt tươi, chanh', 'Đường, nước mắm'],
    matchKeywords: ['dua chuot', 'dưa chuột', 'dua leo', 'dưa leo', 'chanh', 'toi', 'ot'],
    shortDescription: 'Đĩa dưa góp giòn tan mát rượi cân bằng hoàn hảo cho những bữa ăn có món chiên rán, làm cực nhanh trong 5 phút.',
    estimatedCost: 9000,
    costLevel: 'budget',
    cookingTimeMinutes: 5,
    category: 'món nhanh',
    servings: '2 người',
    steps: [
      'Dưa chuột rửa sạch chà mủ 2 đầu, chẻ đôi rồi thái lát xéo vừa ăn.',
      'Trộn vào dưa 1 thìa đường, 1/2 thìa muối xóc đều để 5 phút cho ra bớt nước rồi chắt bỏ nước.',
      'Thêm tỏi ớt băm nhuyễn, nước cốt chanh và 1 thìa nước mắm trộn đều là giòn sần sật ăn liền.'
    ],
    tip: 'Xóc muối đường trước rồi chắt nước giúp dưa chuột giòn đanh như dưa quán cơm sườn.'
  },
  {
    id: 'thit-kho-trung-cut-sinh-vien',
    name: 'Thịt Kho Trứng Cút Nước Dừa Siêu Hao Cơm',
    mainIngredients: ['150g thịt ba chỉ hoặc thịt nạc dăm', '10 quả trứng cút luộc sẵn', 'Hành khô, nước mắm, đường'],
    matchKeywords: ['thit', 'thịt', 'thit heo', 'trung cut', 'trứng cút', 'trung', 'thit kho'],
    shortDescription: 'Nồi thịt kho màu nâu cánh gián óng ả, trứng cút bùi béo ngấm đẫm sốt mặn ngọt. Nấu một nồi ăn được cả ngày dài.',
    estimatedCost: 38000,
    costLevel: 'medium',
    cookingTimeMinutes: 25,
    category: 'món mặn',
    servings: '2 - 3 bữa',
    steps: [
      'Thịt thái con chì ướp hành khô băm, nước mắm, đường, tiêu trong 15 phút. Trứng cút bóc vỏ chiên sơ qua dầu cho dai vỏ.',
      'Thắng 1 thìa đường với chút dầu ăn tạo màu cánh gián đẹp mắt, trút thịt vào đảo săn đều.',
      'Thêm 1 bát con nước đun sôi rồi thả trứng cút vào kho nhỏ lửa đến khi nước sốt sánh lại bóng bẩy.'
    ],
    tip: 'Chiên sơ trứng cút qua dầu giúp vỏ trứng dai giòn thấm đẫm nước kho mà không bị vỡ lòng đỏ.'
  },
  {
    id: 'canh-chua-ca-chua-gia-do',
    name: 'Canh Chua Giá Đỗ Cà Chua Dễ Nấu',
    mainIngredients: ['100g giá đỗ', '2 quả cà chua', 'Hành lá, mùi tàu', 'Me hoặc chanh, gia vị'],
    matchKeywords: ['gia do', 'giá đỗ', 'ca chua', 'cà chua', 'canh', 'chanh'],
    shortDescription: 'Canh chua thanh tao mát lành giá siêu rẻ. Vị chua dịu giúp giải nhiệt cơ thể cực kỳ sảng khoái sau giờ học mệt mỏi.',
    estimatedCost: 11000,
    costLevel: 'budget',
    cookingTimeMinutes: 8,
    category: 'món canh',
    servings: '2 người',
    steps: [
      'Cà chua thái múi cau xào mềm với chút dầu ăn để tạo màu nước canh.',
      'Đổ 400ml nước vào đun sôi, nêm nước mắm, hạt nêm và nước cốt me/chanh cho vừa vị chua thanh.',
      'Thả giá đỗ đã rửa sạch vào nồi, nước vừa sôi bùng lại thì tắt bếp ngay để giá giữ được độ giòn ngọt, rắc hành ngò.'
    ],
    tip: 'Giá đỗ rất nhanh chín; tắt bếp ngay khi thả giá vào nồi nước sôi để giá giòn sần sật không bị dai nhũn.'
  },
  {
    id: 'dau-phu-chum-sot-mam-hanh',
    name: 'Đậu Phụ Lướt Ván Mỡ Hành Cay',
    mainIngredients: ['3 bìa đậu phụ', 'Nhiều hành lá', 'Ớt tươi, nước mắm cốt, đường'],
    matchKeywords: ['dau phu', 'đậu phụ', 'dau', 'đậu', 'hanh', 'hành', 'mam'],
    shortDescription: 'Món nhậu kiêm món mặn siêu đưa cơm xứ Bắc. Đậu rán vừa chín tới mềm mọng được nhúng ngập trong bát mắm mỡ hành nóng hổi xanh mướt.',
    estimatedCost: 13000,
    costLevel: 'budget',
    cookingTimeMinutes: 8,
    category: 'món mặn',
    servings: '2 người',
    steps: [
      'Cắt nhỏ hành lá để vào bát cùng ớt băm, 2 thìa nước mắm và 1 thìa đường.',
      'Đậu rán lướt ván (chỉ rán vàng non bên ngoài, ruột vẫn mềm mọng).',
      'Múc 2 muỗng dầu rán đang sôi sùng sục dội thẳng vào bát hành để làm chín mỡ hành xanh mướt, gắp đậu nóng nhúng ngập mắm hành rồi thưởng thức.'
    ],
    tip: 'Dội dầu nóng già trực tiếp vào hành lá giúp hành chín thơm mà vẫn giữ nguyên màu xanh tươi rói không bị úa.'
  },
  {
    id: 'chao-thit-bam-tu-com-nguoi',
    name: 'Cháo Thịt Băm Nấu Nhanh Từ Cơm Nguội',
    mainIngredients: ['1 bát cơm nguội', '70g thịt băm', 'Gừng tươi, hành lá, tiêu đen'],
    matchKeywords: ['com nguoi', 'cơm nguội', 'thit bam', 'thịt băm', 'chao', 'cháo', 'gung', 'thit'],
    shortDescription: 'Cứu cánh ngày ốm sốt hay mệt mỏi lười nấu nướng. Dùng cơm nguội nấu cháo chỉ mất 12 phút là có bát cháo hoa thịt băm nóng hổi giải cảm.',
    estimatedCost: 20000,
    costLevel: 'budget',
    cookingTimeMinutes: 12,
    category: 'món nhanh',
    servings: '1 - 2 người',
    steps: [
      'Cho cơm nguội vào nồi cùng 3 bát nước lọc, dùng muôi khuấy dầm cho hạt cơm tơi ra, đun sôi lửa vừa.',
      'Thịt băm ướp nước mắm, tiêu và vài sợi gừng thái chỉ.',
      'Khi cháo đã nhừ sánh (khoảng 8 phút), trút thịt băm vào khuấy đều cho thịt chín ngọt, nêm lại gia vị vừa ăn, rắc nhiều tiêu và hành lá.'
    ],
    tip: 'Nấu cháo bằng cơm nguội nhanh nhừ gấp 3 lần nấu gạo sống, tiết kiệm tối đa thời gian và tiền điện.'
  }
];

// Danh sách gợi ý nguyên liệu phổ biến sinh viên hay có
export const POPULAR_INGREDIENTS = [
  { label: 'Trứng gà/vịt', value: 'trứng' },
  { label: 'Cà chua', value: 'cà chua' },
  { label: 'Đậu phụ', value: 'đậu phụ' },
  { label: 'Thịt heo băm', value: 'thịt băm' },
  { label: 'Mì tôm', value: 'mì tôm' },
  { label: 'Xúc xích', value: 'xúc xích' },
  { label: 'Rau muống', value: 'rau muống' },
  { label: 'Cơm nguội', value: 'cơm nguội' },
  { label: 'Bắp cải', value: 'bắp cải' },
  { label: 'Khoai tây', value: 'khoai tây' },
  { label: 'Cá hộp', value: 'cá hộp' },
  { label: 'Hành lá & Tỏi', value: 'hành lá' },
  { label: 'Dưa chuột', value: 'dưa chuột' },
  { label: 'Nấm', value: 'nấm' },
  { label: 'Tép khô', value: 'tép khô' },
  { label: 'Thịt ba chỉ', value: 'thịt ba chỉ' },
];
