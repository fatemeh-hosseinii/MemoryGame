"use client";

import { useState, useEffect } from "react";

type Card = {
  id: number;
  emoji: string;
};

const EMOJIS: string[] = ["🐶", "🐱", "🦊", "🐻", "🐯", "🐸", "🐵", "🐧"];
const SHUFFLED: string[] = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [tries, setTries] = useState<number>(0);

  useEffect(() => {
    setCards(SHUFFLED.map((emoji, index) => ({ id: index, emoji })));
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.includes(id) || matched.includes(id)) return;

    if (flipped.length === 1) {
      setFlipped([...flipped, id]);
      setTries((t) => t + 1);

      const first = cards.find((card) => card.id === flipped[0]);
      const second = cards.find((card) => card.id === id);

      if (!first || !second) return;

      if (first.emoji === second.emoji) {
        setMatched((m) => [...m, first.id, second.id]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    } else {
      setFlipped([id]);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 بازی حافظه حیوانات</h1>
      <p className="mb-4 text-gray-600">تعداد تلاش‌ها: {tries}</p>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`w-16 h-16 flex items-center justify-center text-3xl border rounded-lg cursor-pointer select-none transition-transform ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "bg-white"
                : "bg-blue-400"
            }`}
          >
            {flipped.includes(card.id) || matched.includes(card.id)
              ? card.emoji
              : "❓"}
          </div>
        ))}
      </div>

      {matched.length === cards.length && (
        <p className="mt-6 text-green-600 font-bold text-xl">
          🎉 تبریک! بازی تموم شد!
        </p>
      )}
    </div>
  );
}
