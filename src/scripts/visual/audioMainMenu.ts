export default function audioOnOff(el): void {
    document.addEventListener('mousemove', function () {
      el.play()
        .then(() => console.log('Музыка воспроизводится'))
        .catch((error) => console.error('Ошибка воспроизведения:', error));
    });
}
