export default function parallax(classElement: string): void {
  const parallax: HTMLElement | null = document.querySelector('.' + classElement);

  if (parallax == null) {
    console.error(`Элемент с классом ${classElement} не найден.`);
    return;
  }

  document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Изменяем положение фона
    parallax.style.backgroundPositionX = `${50 + mouseX * 20}%`;
    parallax.style.backgroundPositionY = `${50 + mouseY * 20}%`;
  });
}
