import type {StaticImageData} from "next/image";
import hospitalManagement from "@/assets/images/hospitalManagement.jpg";
import facilityManagement from "@/assets/images/facilityManagement.jpg";
import keeper from "@/assets/images/keeper.jpg";
import frontend from "@/assets/images/frontend.png";
import react from "@/assets/images/react.jpg";
import responsiveDesign from "@/assets/images/responsiveDesign.jpg";
import versionControl from "@/assets/images/versionControl.jpg";
import hero from "@/assets/images/hero.png";
import aboutMe from "@/assets/images/aboutMe.png";

export const projectImages: Record<string, StaticImageData> = {
  queue: hospitalManagement,
  facility: facilityManagement,
  keeper,
  code: frontend,
  atom: react,
  smartphone: responsiveDesign,
  gitbranch: versionControl
};

export const skillImages: Record<string, StaticImageData> = {
  code: frontend,
  atom: react,
  smartphone: responsiveDesign,
  gitbranch: versionControl
};

export const heroImage = hero;
export const aboutMeImage = aboutMe;