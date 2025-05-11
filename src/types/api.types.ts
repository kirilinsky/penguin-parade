import { ImageItemSettings } from "./image.types";

export interface GenerateImageReposne {
  success: boolean;
  downloadURL: string;
  title: string;
  settings: ImageItemSettings;
  id: string;
}
