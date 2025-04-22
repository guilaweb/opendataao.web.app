import { Youtube } from "lucide-react";

export default function AboutVideo() {
  return (
    <section aria-labelledby="video-title" className="my-12">
      <h2 id="video-title" className="text-2xl font-bold mb-6 flex items-center gap-2"><Youtube className="text-angola-accent" />Vídeo Institucional</h2>
      <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden border shadow">
        <iframe
          title="Vídeo Institucional OpenDataAngola"
          src="https://www.youtube.com/embed/rkP4QOQbVnA"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Conheça nossa missão e impacto social.</p>
    </section>
  );
}
