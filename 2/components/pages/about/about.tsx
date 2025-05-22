/* eslint-disable @next/next/no-img-element */

/**
 * @file @/page-roots/about.tsx
 * Sort this file. This is the about page of the website.
 * Note that it will not work standalone - it doesn't need to.
 * It only needs to be readable. That's it.
 */

"use client";

import { useState } from "react";
import Page from "./root";
import Image from "next/image";
import AboutHeader from "../../../AboutHeader";
import HeroImage from "../../../HeroImage";
import OurMission from "../../../OurMission";
import OurStory from "../../../OurStory";
import Timeline from "../../../Timeline";
import TabsSection from "../../../TabsSection";
import SupportUs from "../../../SupportUs";
import Awards from "../../../Awards";
import { AboutProps } from "@/types/AboutProps";

export default function AboutPage({ initialMode, initialLanguage }: AboutProps) {
  const [lang, setLang] = useState<"en" | "he">(initialLanguage);
  const [selectedTab, setSelectedTab] = useState<string>("what-we-do");

  return (
    <Page initialMode={initialMode} initialLanguage={lang} refreshLanguage={setLang}>
      <div className="space-y-12 py-8 md:py-12 container">
        <AboutHeader lang={lang} />
        <HeroImage />
        <OurMission />
        <OurStory />
        <Timeline />
        <TabsSection selectedTab={selectedTab} onChange={setSelectedTab} />
        <SupportUs lang={lang} />
        <Awards />
      </div>
    </Page>
  );
}
