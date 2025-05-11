export function getBaseColorByScale(scale: string): string {
  switch (scale.toLowerCase()) {
    case "common":
      return "white";
    case "rare":
      return "blue";
    case "epic":
      return "purple";
    case "legendary":
      return "red";
    case "divine":
      return "gold";
    default:
      return "gray";
  }
}
