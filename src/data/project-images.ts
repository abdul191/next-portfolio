import type {StaticImageData} from "next/image";
import frontend from "@/assets/images/frontend.png";
import react from "@/assets/images/react.jpg";
import responsiveDesign from "@/assets/images/responsiveDesign.jpg";
import versionControl from "@/assets/images/versionControl.jpg";
import hero from "@/assets/images/hero.png";
import aboutMe from "@/assets/images/aboutMe.png";
import gtrack from "@/assets/images/projects/gtrack.jpg";
import groute from "@/assets/images/projects/groute.jpg";
import trustCorners from "@/assets/images/projects/trust-corners.jpg";
import innovazySuite from "@/assets/images/projects/innovazy-suite.jpg";
import codeFrenetics from "@/assets/images/projects/code-frenetics.jpg";
import innovazyWebsite from "@/assets/images/projects/innovazy-website.jpg";
import rsFlavour from "@/assets/images/projects/rs-flavour.jpg";
import knkAssociates from "@/assets/images/projects/knk-associates.jpg";
import attendanceManagement from "@/assets/images/projects/attendance-management.jpg";
import warehouseManagement from "@/assets/images/projects/warehouse-management.jpg";
import gtrackDashboard from "@/assets/images/projects/gtrack-dashboard.jpg";
import trustAbout from "@/assets/images/projects/trust-about.jpg";
import trustServices from "@/assets/images/projects/trust-services.jpg";
import suitePricing from "@/assets/images/projects/suite-pricing.jpg";
import suiteInvoicing from "@/assets/images/projects/suite-invoicing.jpg";
import codeFreneticsServices from "@/assets/images/projects/code-frenetics-services.jpg";
import innovazyAbout from "@/assets/images/projects/innovazy-about.jpg";

export const projectImages: Record<string, StaticImageData> = {
  gtrack,
  groute,
  "trust-corners": trustCorners,
  "innovazy-suite": innovazySuite,
  "code-frenetics": codeFrenetics,
  "innovazy-website": innovazyWebsite,
  "rs-flavour": rsFlavour,
  "knk-associates": knkAssociates,
  "attendance-management": attendanceManagement,
  "warehouse-management": warehouseManagement
};

export const projectGalleries: Record<string, StaticImageData[]> = {
  "gtrack-esignature": [gtrackDashboard],
  "trust-corners": [trustAbout, trustServices],
  "innovazy-suite": [suitePricing, suiteInvoicing],
  "code-frenetics": [codeFreneticsServices],
  "innovazy-website": [innovazyAbout]
};

export const skillImages: Record<string, StaticImageData> = {
  code: frontend,
  atom: react,
  smartphone: responsiveDesign,
  gitbranch: versionControl
};

export const heroImage = hero;
export const aboutMeImage = aboutMe;
