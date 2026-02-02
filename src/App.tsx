import React, { useState, useEffect } from 'react';
import { Calendar, Search, Crown, Star, Sparkles, Instagram, Image as ImageIcon, X, Loader2, Wand2 } from 'lucide-react';

// 定義資料類型 (TypeScript Interface)
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  deposit: number;
  images: string[];
  description: string;
}

interface AIPlan {
  title: string;
  vibe: string;
  recommendedIds: number[];
  tips: string[];
}

// 模擬商品資料庫
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "蝴蝶結花籃",
    category: "背景裝飾",
    price: 50,
    deposit: 100,
    images: [
      "https://i.postimg.cc/w3RgLZcX/image.jpg",
      "https://i.postimg.cc/25nWnj3H/02-16-2025-12-24de-ying-xiang.jpg",
      "https://i.postimg.cc/Z9MYzyY7/02-16-2025-12-24de-ying-xiang-(1).jpg",
      "https://i.postimg.cc/kVpMPtMp/02-16-2025-12-24de-ying-xiang-(2).jpg"
    ],
    description: "精緻的手工編織花籃，搭配緞帶蝴蝶結，適合婚禮花童或派對桌面裝飾，營造浪漫氛圍。"
  },
  {
    id: 2,
    name: "氣球電動充氣機",
    category: "設備機器",
    price: 200,
    deposit: 300,
    images: [
      "https://i.postimg.cc/NG4HHc6d/23-24-2025-12-22de-ying-xiang.jpg"
    ],
    description: "雙孔高效能設計，充氣速度快且散熱佳，附贈多種吹嘴，讓派對氣球佈置變得輕鬆省力。"
  },
  {
    id: 3,
    name: "金属拱形背景架",
    category: "背景裝飾",
    price: 350,
    deposit: 700,
    images: [
      "https://i.postimg.cc/3NSjC5vd/23-31-2025-12-22de-ying-xiang.jpg",
      "https://i.postimg.cc/j2PBb7jp/02-06-2025-12-24de-ying-xiang.jpg"
    ],
    description: "仿古銅金屬質感，結構穩固容易組裝。尺寸有182/220cm兩款"
  },
  {
    id: 4,
    name: "玫瑰金拱形套装亮片背景",
    category: "背景裝飾",
    price: 300,
    deposit: 500,
    images: [
      "https://i.postimg.cc/g2TchYkg/23-39-2025-12-22de-ying-xiang.jpg"
    ],
    description: "閃耀的玫瑰金亮片材質，在燈光照射下波光粼粼。尺寸有80*180/120*220cm兩款"
  },
  {
    id: 5,
    name: "LED夾燈串",
    category: "背景裝飾",
    price: 30,
    deposit: 60,
    images: [
      "https://i.postimg.cc/XJZsvk1P/23-47-2025-12-22de-ying-xiang.jpg"
    ],
    description: "暖白光色溫，附帶透明夾子可懸掛拍立得照片或明信片，為夜晚的派對增添溫馨回憶，長度1.5M。"
  },
  {
    id: 6,
    name: "多功能氣球架",
    category: "背景裝飾",
    price: 100,
    deposit: 200,
    images: [
      "https://i.postimg.cc/PJvfK93M/00-04-2025-12-23de-ying-xiang.jpg"
    ],
    description: "尺寸有1.5/2.5m兩款"
  },
  {
    id: 7,
    name: "玫瑰花條/金錢葉",
    category: "背景裝飾",
    price: 100,
    deposit: 200,
    images: [
      "https://i.postimg.cc/qvycxx5j/02-26-2025-12-24de-ying-xiang.jpg",
      "https://i.postimg.cc/ZRfzj0SD/jin-qian-ye.jpg"
    ],
    description: "顏色有紅*8/香檳色+金錢葉*5"
  },
  {
    id: 8,
    name: "LED氣泡球串燈",
    category: "背景裝飾",
    price: 100,
    deposit: 200,
    images: [
      "https://i.postimg.cc/QtgJrWCs/deng.jpg"
    ],
    description: "10米暖白USB燈。"
  },
  {
    id: 9,
    name: "圓形拱門架",
    category: "背景裝飾",
    price: 500,
    deposit: 1000,
    images: [
      "https://i.postimg.cc/L6S6Xgs1/gong-men-2026-01-07-213657.jpg"
    ],
    description: ""
  },
  {
    id: 10,
    name: "愛麗絲角色扮演服裝",
    category: "衣物",
    price: 250,
    deposit: 500,
    images: [
      "https://i.postimg.cc/G2MJ2nFD/bei-er.jpg"
    ],
    description: "胸圍85cm，腰圍70cm，肩寬37cm，衣長80cm"
  },
  {
    id: 11,
    name: "蠟燭燭台",
    category: "背景裝飾",
    price: 100,
    deposit: 150,
    images: [
      "https://i.postimg.cc/mgCDVxrB/mi-lu-zhu-tai.jpg",
      "https://i.postimg.cc/Mp1jrfG9/hua-zhu-tai.jpg",
      "https://i.postimg.cc/yxWZffJR/shu-zhu-tai.jpg"
    ],
    description: ""
  },
  {
    id: 12,
    name: "撲克牌",
    category: "其他",
    price: 80,
    deposit: 160,
    images: [
      "https://i.postimg.cc/YSLDWKqK/poker.jpg"
    ],
    description: ""
  }
];

const CATEGORIES = ["全部系列", "背景裝飾", "設備機器", "衣物", "其他"];

// 圖片組件 (加入類型定義解決錯誤)
const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1496337589254-7e19d01ced44?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#F9F9F9]">
      <img 
        src={error ? fallback : src} 
        alt={alt} 
        onError={() => setError(true)}
        className={`w-full h-full object-contain p-2 transform group-hover:scale-110 transition duration-700 ease-in-out opacity-90`}
      />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FDFBF7] p-4 text-center">
          <ImageIcon size={24} className="text-[#D4AF37] mb-2" />
          <p className="text-[10px] text-[#888] tracking-widest uppercase">圖片預覽無法顯示</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("全部系列");
  // 加入泛型 <Product | null>
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  
  // Gemini AI State
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  // 加入泛型 <AIPlan | null>
  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null);

  // 自動載入 Tailwind CSS (解決 CodeSandbox 樣式遺失問題)
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://cdn.tailwindcss.com";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const colors = {
    gold: '#D4AF37',
    cream: '#FDFBF7',
    dark: '#2C2C2C',
    sand: '#E6DDD0',
  };

  const handleGeneratePlan = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiPlan(null);

    // 注意：建議在 Vercel 後台設定環境變數 VITE_GEMINI_API_KEY，而不是寫死在這裡
    // 如果您在 Vercel 設定了環境變數，請使用 import.meta.env.VITE_GEMINI_API_KEY
    const apiKey = ""; 

    const systemPrompt = `
      You are Hermione, an expert party stylist for a rental shop called "Hermione's Party Library".
      We have the following inventory: ${JSON.stringify(MOCK_PRODUCTS.map(p => ({id: p.id, name: p.name, category: p.category})))}.
      
      The user will give you a theme or occasion. 
      Your goal is to:
      1. Create a magical Title for the event.
      2. Write a short, inspiring "Vibe Check" description (max 2 sentences).
      3. Select 3-4 specific Item IDs from our inventory that fit this theme perfectly.
      4. Give 3 short, bullet-point styling tips on how to use these items together.

      Return ONLY valid JSON with this structure:
      {
        "title": "string",
        "vibe": "string",
        "recommendedIds": [number, number, number],
        "tips": ["string", "string", "string"]
      }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Theme: ${aiInput}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        }),
      });

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (resultText) {
        setAiPlan(JSON.parse(resultText));
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("魔法連線中斷，請稍後再試！");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-[#4A4A4A] selection:bg-[#D4AF37] selection:text-white" style={{ backgroundColor: colors.cream }}>
      {/* 內嵌樣式以支援自定義動畫 (模擬 tailwind.config 效果) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* AI Planner Modal */}
      {showAIPlanner && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#2C2C2C]/70 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setShowAIPlanner(false)}
        >
          <div 
            className="bg-white max-w-2xl w-full shadow-2xl relative flex flex-col rounded-sm overflow-hidden animate-fade-in-up border border-[#D4AF37]/30 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#FDFBF7] p-6 border-b border-[#E6DDD0] flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <Sparkles size={100} className="text-[#D4AF37]" />
               </div>
               <div>
                  <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                    <Wand2 size={18} />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Magic Planner</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2C2C2C]">
                    派對靈感生成器
                  </h3>
               </div>
               <button onClick={() => setShowAIPlanner(false)} className="z-10 text-[#888] hover:text-[#2C2C2C]">
                 <X size={24} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {!aiPlan ? (
                <div className="space-y-6">
                  <p className="text-[#666] font-light leading-relaxed">
                    不知道如何佈置？告訴我們您的活動主題（例如：「森林系婚禮」、「復古野餐」、「愛麗絲夢遊仙境」），妙麗將為您挑選最適合的道具組合。
                  </p>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="輸入派對主題..."
                      className="w-full bg-[#F9F9F9] border border-[#E6DDD0] p-4 text-lg focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#BBB]"
                      onKeyDown={(e) => e.key === 'Enter' && handleGeneratePlan()}
                    />
                    <button 
                      onClick={handleGeneratePlan}
                      disabled={aiLoading || !aiInput}
                      className="absolute right-2 top-2 bottom-2 px-6 bg-[#2C2C2C] text-white hover:bg-[#D4AF37] disabled:bg-[#CCC] transition-colors duration-300 flex items-center gap-2"
                    >
                      {aiLoading ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>}
                      <span className="hidden sm:inline text-xs tracking-widest uppercase">Generate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center space-y-3">
                    <h4 className="text-2xl md:text-3xl font-serif text-[#D4AF37]">{aiPlan.title}</h4>
                    <p className="text-[#666] italic font-light">"{aiPlan.vibe}"</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs tracking-[0.2em] uppercase text-[#2C2C2C] border-b border-[#E6DDD0] pb-2 mb-4">
                      推薦租借清單
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {MOCK_PRODUCTS.filter(p => aiPlan.recommendedIds.includes(p.id)).map(product => (
                        <div 
                          key={product.id} 
                          className="group cursor-pointer border border-[#F0F0F0] hover:border-[#D4AF37] transition p-2"
                          onClick={() => {
                            setSelectedProduct(product);
                            // setShowAIPlanner(false); // Optional: keep planner open or close it
                          }}
                        >
                          <div className="aspect-square bg-[#F9F9F9] mb-2 overflow-hidden">
                             <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-[#2C2C2C] font-serif truncate">{product.name}</p>
                            <p className="text-[10px] text-[#888] mt-1">NT$ {product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FDFBF7] p-5 border border-[#E6DDD0]">
                    <h5 className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3 flex items-center gap-2">
                      <Star size={12} fill="#D4AF37"/> Styling Tips
                    </h5>
                    <ul className="space-y-2">
                      {aiPlan.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-[#555] font-light flex gap-3">
                          <span className="text-[#E6DDD0] font-serif text-lg leading-none">{i+1}.</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => { setAiPlan(null); setAiInput(""); }}
                    className="w-full py-3 border border-[#E6DDD0] text-[#888] hover:text-[#2C2C2C] hover:border-[#2C2C2C] transition text-xs tracking-widest uppercase"
                  >
                    Try Another Theme
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 聯繫資訊彈窗 */}
      {showContactInfo && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#2C2C2C]/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowContactInfo(false)}
        >
          <div 
            className="bg-white p-8 md:p-10 max-w-sm md:max-w-md w-full shadow-2xl relative flex flex-col items-center text-center animate-fade-in-up border border-[#E6DDD0]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowContactInfo(false)} 
              className="absolute top-3 right-3 p-2 hover:bg-[#F0F0F0] rounded-full transition text-[#2C2C2C]"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6 p-4 rounded-full bg-[#FDFBF7] border border-[#E6DDD0] text-[#D4AF37]">
              <Instagram size={32} />
            </div>

            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
              租借流程諮詢
            </h3>
            
            <p className="text-[#666] font-light text-sm md:text-base tracking-wide mb-2">
              詳細租借請聯繫 IG
            </p>
            
            <a 
              href="https://www.instagram.com/hermione_016" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-medium text-[#D4AF37] tracking-widest mb-8 hover:underline"
            >
              hermione_016
            </a>

            <button 
              onClick={() => setShowContactInfo(false)}
              className="w-full py-3 bg-[#2C2C2C] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#D4AF37] transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 產品詳情彈出視窗 */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white max-w-3xl w-full rounded-none shadow-2xl relative flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-fade-in-up h-[85vh] md:h-auto md:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-[#F0F0F0] transition text-[#2C2C2C] shadow-sm md:shadow-none"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 bg-[#F9F9F9] p-4 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E6DDD0] shrink-0 md:h-auto">
               <div className="flex items-center justify-center mb-4 relative overflow-hidden w-full h-72 md:h-80 md:flex-1">
                  <img 
                    key={selectedProduct.images[activeImageIndex]} 
                    src={selectedProduct.images[activeImageIndex]} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain animate-fade-in"
                  />
               </div>
               
               <div className="flex gap-2 md:gap-3 justify-center overflow-x-auto py-2 px-1 scrollbar-hide shrink-0">
                  {selectedProduct.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-12 h-12 md:w-16 md:h-16 border transition-all duration-300 flex-shrink-0 overflow-hidden ${
                        activeImageIndex === index 
                          ? 'border-[#D4AF37] opacity-100 ring-1 ring-[#D4AF37] ring-offset-1' 
                          : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#E6DDD0]'
                      }`}
                    >
                      <img src={img} alt={`thumbnail-${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
               </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-white md:overflow-y-auto">
              <div className="mt-2 md:mt-0">
                <span className="text-[10px] md:text-xs text-[#D4AF37] tracking-[0.2em] uppercase font-bold mb-2 block">
                  {selectedProduct.category}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2C2C2C]">
                  {selectedProduct.name}
                </h3>
              </div>

              <div className="w-10 h-[1px] bg-[#E6DDD0] my-4 md:my-6"></div>

              <div className="flex-grow">
                <p className="text-[#666] text-sm leading-6 md:leading-7 font-light tracking-wide min-h-[100px]">
                  {selectedProduct.description || "此商品暫無詳細說明。歡迎聯繫我們了解更多細節。"}
                </p>
              </div>

              <div className="pt-6 mt-4 space-y-3 border-t border-[#F5F5F5]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#888] tracking-widest">租金 Rent</span>
                  <span className="text-lg font-medium text-[#2C2C2C]">NT$ {selectedProduct.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#888] tracking-widest">押金 Deposit</span>
                  <span className="text-sm text-[#999]">NT$ {selectedProduct.deposit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 頂部導航 */}
      <nav className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6DDD0]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="border border-[#D4AF37] rounded-full p-1.5 md:p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition duration-500">
              <Crown size={16} className="md:w-5 md:h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-serif font-bold tracking-wide text-[#2C2C2C] leading-none">
                妙麗的派對庫
              </h1>
              <span className="text-[10px] md:text-xs font-sans font-normal text-[#888] block mt-1 tracking-widest scale-90 origin-left md:scale-100">
                HERMIONE'S PARTY
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-medium tracking-widest text-[#666]">
            {/* New Magic Planner Button */}
            <button 
              onClick={() => setShowAIPlanner(true)}
              className="flex items-center gap-2 text-[#D4AF37] bg-white border border-[#D4AF37] px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span className="hidden sm:inline">Magic Planner</span>
              <span className="sm:hidden">AI</span>
            </button>

            <button 
              onClick={() => setShowContactInfo(true)}
              className="hover:text-[#D4AF37] transition px-2 md:px-3 py-1.5"
            >
              租借流程
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-[#F3EFE9]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-[#D4AF37] rounded-full text-[#D4AF37] text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium bg-white/50 backdrop-blur-sm mb-2 md:mb-4">
            <Star size={10} className="md:w-3 md:h-3" fill="#D4AF37" /> Premium Party Rental
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium text-[#2C2C2C] leading-tight">
            讓您的派對<br />
            <span className="italic font-light text-[#D4AF37]">閃耀</span> 著獨特的光芒
          </h2>
          <p className="text-[#666] text-sm md:text-lg max-w-xs md:max-w-xl mx-auto font-light leading-relaxed">
            妙麗的派對庫提供精選的質感道具與設備。<br className="hidden md:block"/>
            不需要昂貴的購買，也能擁有如電影場景般的夢幻時刻。
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col items-center mb-12 md:mb-20 space-y-6">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2C2C]">精選系列</h3>
          <div className="w-16 h-[1px] bg-[#D4AF37]"></div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm tracking-widest transition duration-300 border ${
                  selectedCategory === cat 
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white' 
                    : 'border-transparent text-[#888] hover:text-[#2C2C2C] bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-y-16">
          {MOCK_PRODUCTS
            .filter(p => selectedCategory === "全部系列" || p.category === selectedCategory)
            .map(product => (
            <div 
              key={product.id} 
              className="group cursor-pointer" 
              onClick={() => {
                setSelectedProduct(product);
                setActiveImageIndex(0);
              }}
            >
              <div className="relative overflow-hidden mb-4 md:mb-6 aspect-[4/5] bg-white border border-[#F0EAD6] shadow-sm">
                <ProductImage src={product.images[0]} alt={product.name} />
                
                <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 text-xs tracking-widest uppercase text-[#2C2C2C] shadow-sm transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                        View Details
                    </span>
                </div>
              </div>

              <div className="text-center space-y-2 px-2">
                <div className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-medium">
                  {product.category}
                </div>
                <h4 className="text-base md:text-lg font-serif font-medium text-[#2C2C2C] group-hover:text-[#D4AF37] transition decoration-[#D4AF37] decoration-1 underline-offset-4 group-hover:underline">
                  {product.name}
                </h4>
                <div className="text-sm font-light text-[#666] flex items-center justify-center gap-4 mt-2">
                  <span>租金 NT$ {product.price}</span>
                  <span className="w-1 h-1 bg-[#DDD] rounded-full"></span>
                  <span className="opacity-60">押金 NT$ {product.deposit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white/60 py-8 text-sm font-light tracking-wide">
        <div className="max-w-7xl mx-auto px-6 text-[10px] md:text-xs text-center flex justify-center items-center">
          <span>&copy; 2026 Hermione's Party Library. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
