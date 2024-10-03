import Hero from "@/components/HomePage/Hero/Hero";
import PromotionalVideo from "@/components/HomePage/PromotionalVideo";
import Slider from "@/components/HomePage/Slider/Slider";

export default function Home() {
  return (
    <main className="space-y-20">
      <Hero />
      <Slider title="Explore Every Day" />
      <PromotionalVideo />
      <Slider
        title="Picked for you"
        subtitle="Experience the ultimate comfort and style."
      />
    </main>
  );
}
