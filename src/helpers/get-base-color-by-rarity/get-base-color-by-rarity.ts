export function getBaseColorByScale(scale: string | null): string {
  if (!scale) return "black";
  switch (scale.toLowerCase()) {
    case "common":
      return "gray";
    case "rare":
      return "blue";
    case "epic":
      return "purple";
    case "legendary":
      return "red";
    case "divine":
      return "gold";
    case "ghost":
      return "white";
    case "mystic":
      return "green";
    default:
      return "black";
  }
}
