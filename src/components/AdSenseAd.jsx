"use client";
import { useEffect } from "react";

export default function AdSenseAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-9810065319228675"
      data-ad-slot="8567245567"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}