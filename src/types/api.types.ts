import { ImageItemSettings } from "./image.types";
import { ScaleType } from "./scale.types";

export interface GenerateImageReposne {
  success: boolean;
  downloadURL: string;
  title: string;
  settings: ImageItemSettings;
  id: string;
  crystal?: ScaleType;
}
