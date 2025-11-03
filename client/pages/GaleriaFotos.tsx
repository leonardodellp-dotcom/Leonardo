import { useState } from "react";
import Layout from "@/components/Layout";
import { Image as ImageIcon, Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  eventName: string;
  eventDate: string;
  imageUrl: string;
  description?: string;
}

const photos: Photo[] = [
  {
    id: "1",
    title: "Retiro Espiritual 2024",
    eventName: "Retiro Anual de Jovens",
    eventDate: "10-12 de novembro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    description: "Momento de oração e reflexão no retiro anual da comunidade",
  },
  {
    id: "2",
    title: "Missa Especial",
    eventName: "Missa de Ação de Graças",
    eventDate: "15 de outubro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop",
    description: "Comunidade reunida para celebração especial",
  },
  {
    id: "3",
    title: "Encontro de Jovens",
    eventName: "Encontro Mensal",
    eventDate: "20 de outubro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1517994712202-14319c0ac310?w=500&h=500&fit=crop",
    description: "Jovens conversando e fortalecendo os laços comunitários",
  },
  {
    id: "4",
    title: "Atividade de Caridade",
    eventName: "Distribuição de Alimentos",
    eventDate: "5 de outubro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=500&fit=crop",
    description: "Membros do grupo ajudando na comunidade",
  },
  {
    id: "5",
    title: "Celebração em Família",
    eventName: "Festa de Encerramento",
    eventDate: "30 de setembro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=500&fit=crop",
    description: "Confraternização e celebração do grupo",
  },
  {
    id: "6",
    title: "Adoração Eucarística",
    eventName: "Noite de Adoração",
    eventDate: "25 de setembro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1534536281715-e28219c76c1e?w=500&h=500&fit=crop",
    description: "Momento de devoção e oração silenciosa",
  },
  {
    id: "7",
    title: "Peregrinação",
    eventName: "Caminhada até a Igreja",
    eventDate: "15 de setembro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=500&fit=crop",
    description: "Comunidade em peregrinação até o santuário",
  },
  {
    id: "8",
    title: "Aula de Catequese",
    eventName: "Formação Religiosa",
    eventDate: "10 de setembro, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop",
    description: "Catequese interativa e formação de fé",
  },
  {
    id: "9",
    title: "Festa de Santo Antônio",
    eventName: "Celebração de Santo Antônio",
    eventDate: "13 de junho, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=500&fit=crop",
    description: "Festa em honra ao padroeiro",
  },
  {
    id: "10",
    title: "Encontro de Oração",
    eventName: "Grupo de Oração Semanal",
    eventDate: "5 de junho, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1516214104703-3e2c6da89611?w=500&h=500&fit=crop",
    description: "Momento de oração coletiva e comunhão",
  },
  {
    id: "11",
    title: "Palestras e Diálogos",
    eventName: "Seminário de Formação",
    eventDate: "25 de maio, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    description: "Participantes assistindo a palestra sobre fé",
  },
  {
    id: "12",
    title: "Confraternização Especial",
    eventName: "Happy Hour Católico",
    eventDate: "15 de maio, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop",
    description: "Confraternização entre membros da comunidade",
  },
];

export default function GaleriaFotos() {
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
                  setCurrentPhotoIndex(photos.findIndex((p) => p.id === photo.id));
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
