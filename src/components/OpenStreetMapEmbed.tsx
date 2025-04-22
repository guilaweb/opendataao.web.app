import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OpenStreetMapEmbedProps {
  title: string;
  height?: number;
  lat?: number;
  lon?: number;
  zoom?: number;
  className?: string;
}

export default function OpenStreetMapEmbed({
  title,
  height = 300,
  lat = -11.2027, // Angola centro aproximado
  lon = 17.8739,
  zoom = 5,
  className = "",
}: OpenStreetMapEmbedProps) {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-3},${lat-3},${lon+3},${lat+3}&layer=mapnik&marker=${lat},${lon}`;
  return (
    <Card className={`w-full h-full ${className}`}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="w-full h-full aspect-video rounded-lg overflow-hidden">
          <iframe
            title="Mapa OpenStreetMap Angola"
            src={src}
            className="w-full h-full rounded-lg border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
