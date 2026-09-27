import React from 'react';
import { X, Sparkles, AlertCircle, BookmarkCheck } from 'lucide-react';

interface StudentTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentTipsModal: React.FC<StudentTipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Cẩm Nang Nấu Ăn & Tiết Kiệm Cho Sinh Viên</h3>
              <p className="text-xs text-stone-500">Bí quyết ăn ngon, đủ chất mà không sợ "cháy túi" cuối tháng</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed">
          {/* Tip 1 */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>1. Trữ hành hoa, rau thơm cả tuần không bị thối úa</span>
            </h4>
            <p>
              Hành lá mua về rửa sạch, để thật ráo nước (thấm khô bằng khăn giấy), sau đó thái nhỏ rồi cho vào hộp nhựa hoặc chai rỗng để ngăn đông tủ lạnh. Khi xào hay nấu canh, chỉ cần rắc một nhúm trực tiếp vào nồi, hành vẫn xanh ngắt và thơm lừng mà không hề bị thối nhũn.
            </p>
          </div>

          {/* Tip 2 */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>2. Bộ gia vị "thần thánh" 50k dùng cả học kỳ</span>
            </h4>
            <p>
              Đừng mua quá nhiều loại nước sốt đắt đỏ. Sinh viên chỉ cần chuẩn bị: Nước mắm ngon loại nhỏ (~20k), hạt nêm Knorr (~12k), dầu hào Maggi (~15k), và một lọ tiêu xay. Dầu hào là vũ khí bí mật giúp mọi món rau xào và thịt rim lên màu bóng đẹp, đậm đà như quán ăn.
            </p>
          </div>

          {/* Tip 3 */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>3. Mua thịt băm và chia thành từng phần nhỏ</span>
            </h4>
            <p>
              Mua 300g - 400g thịt nạc vai xay ở chợ (khoảng 35k - 40k), nhờ người bán xay sẵn. Về chia vào 4 túi nilon nhỏ rồi bỏ ngăn đá. Mỗi bữa nấu canh hoặc xào chỉ cần rã đông 1 phần nhỏ (khoảng 70g) là có ngay nồi canh ngọt lịm cho 2 người ăn.
            </p>
          </div>

          {/* Tip 4 */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>4. Tận dụng cơm nguội thông minh</span>
            </h4>
            <p>
              Cơm thừa tuyệt đối đừng bỏ đi. Cho vào hộp cất tủ lạnh qua đêm, hôm sau cơm khô mặt rang với 1 quả trứng sẽ tơi xốp giòn rụm như cơm quán. Hoặc cho vào nồi thêm nước nấu cháo thịt băm chỉ mất 10 phút.
            </p>
          </div>

          {/* Tip 5 */}
          <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-1 text-amber-900">
            <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-amber-700" />
              <span>Công thức mâm cơm sinh viên cân bằng dinh dưỡng</span>
            </h4>
            <p>
              Một bữa ăn chuẩn kinh tế nên gồm 3 thành phần: <strong>1 món mặn</strong> (trứng/đậu/thịt) + <strong>1 món rau</strong> (rau luộc/xào) + <strong>1 bát canh</strong> (tận dụng nước luộc rau hoặc nấu canh cà chua/bí xanh). Vừa tiết kiệm gas, vừa đủ vitamin và chất đạm!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
