'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// カードの型定義
type CardData = { id: number; x: number; y: number; text: string };

export default function Canvas() {
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, x: 50, y: 50, text: '最初のメモ' },
  ]);

  const addCard = () => {
    const newCard = { id: Date.now(), x: 100, y: 100, text: '新しいカード' };
    setCards([...cards, newCard]);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* ツールバー */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button onClick={addCard} className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
          ＋ カード追加
        </button>
      </div>

      {/* キャンバスエリア */}
      {cards.map((card) => (
        <motion.div
          key={card.id}
          drag
          dragMomentum={false}
          className="absolute w-40 h-40 bg-white rounded-xl shadow-lg border border-gray-200 p-4 cursor-grab active:cursor-grabbing flex flex-col justify-between"
          initial={{ x: card.x, y: card.y }}
        >
          <p className="text-sm text-gray-700">{card.text}</p>
          <div className="flex justify-end gap-1">
            <button className="text-xs text-blue-500">編集</button>
            <button onClick={() => setCards(cards.filter(c => c.id !== card.id))} className="text-xs text-red-400">削除</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
