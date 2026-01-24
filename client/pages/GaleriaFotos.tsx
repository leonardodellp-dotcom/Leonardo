import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Image as ImageIcon,
  Calendar,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getCurrentYear } from "@/lib/security";

interface Photo {
  id: string;
  title: string;
  eventName: string;
  eventDate: string;
  imageUrl: string;
  description?: string;
}

export default function GaleriaFotos() {
  const currentYear = getCurrentYear();

  const photos: Photo[] = [
    {
      id: "1",
      title: "Exemplos",
      eventName: "Adoração Eucarística",
      eventDate: `02 de novembro, ${currentYear}`,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F8ca2eb85954041b381398a3b58a28fe2%2F02823e1a021842769cd372211089eecc?format=webp&width=800",
      description: "Momento de adoração e devoção da comunidade Jucrisc",
    },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevPhoto = () => {
    const index = photos.findIndex((p) => p.id === selectedPhoto?.id);
    if (index > 0) {
      setSelectedPhoto(photos[index - 1]);
      setCurrentPhotoIndex(index - 1);
    }
  };

  const handleNextPhoto = () => {
    const index = photos.findIndex((p) => p.id === selectedPhoto?.id);
    if (index < photos.length - 1) {
      setSelectedPhoto(photos[index + 1]);
      setCurrentPhotoIndex(index + 1);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-purple-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Galeria de Fotos
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Momentos especiais da comunidade Jucrisc
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  setSelectedPhoto(photo);
                  setCurrentPhotoIndex(
                    photos.findIndex((p) => p.id === photo.id),
                  );
                }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-purple-600/50 hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <p className="text-white font-bold text-sm">
                        Ver em Detalhes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-1">
                    {photo.title}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {photo.eventName}
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {photo.eventDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Modal */}
          {selectedPhoto && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="max-w-4xl w-full">
                {/* Image */}
                <div className="relative bg-black rounded-lg overflow-hidden mb-6 aspect-video flex items-center justify-center">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePrevPhoto}
                    disabled={currentPhotoIndex === 0}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                      currentPhotoIndex === 0
                        ? "bg-white/20 text-white/50 cursor-not-allowed"
                        : "bg-white/30 hover:bg-white/50 text-white"
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    disabled={currentPhotoIndex === photos.length - 1}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                      currentPhotoIndex === photos.length - 1
                        ? "bg-white/20 text-white/50 cursor-not-allowed"
                        : "bg-white/30 hover:bg-white/50 text-white"
                    }`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                    {currentPhotoIndex + 1} / {photos.length}
                  </div>
                </div>

                {/* Photo Details */}
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {selectedPhoto.title}
                      </h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          <span>{selectedPhoto.eventName}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedPhoto.eventDate}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {selectedPhoto.description && (
                    <p className="text-foreground leading-relaxed mt-4">
                      {selectedPhoto.description}
                    </p>
                  )}
                </div>

                {/* Close Button */}
                <div className="text-center">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-8 rounded-lg transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
