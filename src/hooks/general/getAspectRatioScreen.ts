import { useState, useEffect } from 'react';

// Выносим логику определения соотношения в отдельную функцию
function calculateAspectRatio(): string | undefined {
  if (typeof window === 'undefined' || !window.screen) {
    return undefined;
  }

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  if (!screenWidth || !screenHeight || isNaN(screenWidth) || isNaN(screenHeight)) {
    return undefined;
  }

  const aspectRatio = screenWidth / screenHeight;

  const STANDARD_RATIOS: [string, number][] = [
    ['1:1', 1 / 1],
    ['5:4', 5 / 4],
    ['4:3', 4 / 3],
    ['3:2', 3 / 2],
    ['16:10', 16 / 10],
    ['16:9', 16 / 9],
    ['18:9', 18 / 9],
    ['19:9', 19 / 9],
    ['19.5:9', 19.5 / 9],
    ['20:9', 20 / 9],
    ['21:9', 21 / 9],
    ['32:9', 32 / 9],
  ];

  const EPSILON = 0.01;

  for (const [name, ratio] of STANDARD_RATIOS) {
    if (Math.abs(aspectRatio - ratio) < EPSILON) {
      return name;
    }
  }

  let closestRatio = STANDARD_RATIOS[0][0];
  let minDiff = Infinity;

  for (const [name, ratio] of STANDARD_RATIOS) {
    const diff = Math.abs(aspectRatio - ratio);
    if (diff < minDiff) {
      minDiff = diff;
      closestRatio = name;
    }
  }

  if (minDiff > 0.1) {
    return simplifyRatio(screenWidth, screenHeight);
  }

  return closestRatio;
}

function simplifyRatio(width: number, height: number): string {
  const w = Math.round(width);
  const h = Math.round(height);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(w, h);
  return `${w / divisor}:${h / divisor}`;
}

// Создаем кастомный хук
export function useAspectRatio(): string | undefined {
  const [aspectRatio, setAspectRatio] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Определяем соотношение сразу при монтировании
    setAspectRatio(calculateAspectRatio());

    // Добавляем обработчик изменения размера окна
    const handleResize = ():void => {
      setAspectRatio(calculateAspectRatio());
    };

    // window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании
    return ():void => {
      // window.removeEventListener('resize', handleResize);
    };
  }, []);

  return aspectRatio;
}
