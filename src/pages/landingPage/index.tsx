import { useContext } from "react";
import { ThemeContext } from "../../context";
import {
  HeroSection,
  OnlineMedical,
  Personalized,
  Services,
  Questions,
  World,
} from "../../components/landingPage";

export default function LandingPage() {
  const themes = useContext(ThemeContext);

  return (
    <div className={themes?.themeMode === "dark" ? "dark" : ""}>
      <HeroSection />
      <Personalized />
      <Services />
      <OnlineMedical />
      <Questions />
      <World />
    </div>
  );
}
