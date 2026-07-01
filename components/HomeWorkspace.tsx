"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { resolveHomeSection, isHomeInlineSection, type HomeSectionId } from "@/lib/home-sections";
import { scrollToSection } from "./SectionLink";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";
import TopBanner from "./TopBanner";

type HomeSectionContextValue = {
  activeSection: HomeSectionId;
  navigate: (section: HomeSectionId) => void;
};

const HomeSectionContext = createContext<HomeSectionContextValue | null>(null);

export function useHomeSection() {
  return useContext(HomeSectionContext);
}

export function HomeSectionBack() {
  const homeNav = useHomeSection();
  if (!homeNav || homeNav.activeSection === "home") return null;

  return (
    <div className="section-wrap home-section-back">
      <button
        type="button"
        onClick={() => homeNav.navigate("home")}
        className="text-sm font-medium text-warm hover:text-warm-hover"
      >
        ← Back to home
      </button>
    </div>
  );
}

type HomeWorkspaceProps = {
  packages: ReactNode;
  needs: ReactNode;
  planning: ReactNode;
  faq: ReactNode;
  home: ReactNode;
};

export default function HomeWorkspace({
  home,
  packages,
  needs,
  planning,
  faq,
}: HomeWorkspaceProps) {
  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");

  useEffect(() => {
    const sync = () => setActiveSection(resolveHomeSection(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (activeSection === "home" && isHomeInlineSection(hash)) {
      requestAnimationFrame(() => {
        setTimeout(() => scrollToSection(hash), 120);
      });
    }
  }, [activeSection]);

  const navigate = useCallback((section: HomeSectionId) => {
    setActiveSection(section);
    const hash = section === "home" ? "" : `#${section}`;
    window.history.replaceState(null, "", `/${hash}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const content: Record<HomeSectionId, ReactNode> = {
    home,
    packages,
    needs,
    planning,
    faq,
  };

  return (
    <HomeSectionContext.Provider value={{ activeSection, navigate }}>
      <TopBanner />
      <Navbar />
      <div className="home-section-view">
        {activeSection !== "home" && <HomeSectionBack />}
        {content[activeSection]}
      </div>
      <SiteFooter />
    </HomeSectionContext.Provider>
  );
}
