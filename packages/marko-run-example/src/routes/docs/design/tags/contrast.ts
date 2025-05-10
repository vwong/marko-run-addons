// https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
function luminance(rgb: [number, number, number]) {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function parse(color: string) {
  return color
    .match(/\((.*)\)/)![1]
    .split(",")
    .map(Number) as [number, number, number];
}

export function contrastRatio(color1: string, color2: string) {
  const l1 = luminance(parse(color1));
  const l2 = luminance(parse(color2));

  return l2 < l1 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}
