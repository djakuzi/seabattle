export default function getWidthRect(rectCoord: HTMLDivElement):number {
  //делим на 10 так как в ряд координат(квадратов) всего в 10 ряд
  return rectCoord.offsetWidth / 10;
}
