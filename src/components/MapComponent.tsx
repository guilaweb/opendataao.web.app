import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OpenStreetMapEmbed from "./OpenStreetMapEmbed";

const MapComponent = ({ title }: { title: string }) => {
  // Alinhar o mapa usando aspect-video e gap padrão
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full relative flex items-center justify-center bg-angola-light rounded-md border-2 border-dashed border-angola-primary/30">
        <OpenStreetMapEmbed title={title} className="aspect-video" />
      </CardContent>
    </Card>
  );
};

export default MapComponent;
