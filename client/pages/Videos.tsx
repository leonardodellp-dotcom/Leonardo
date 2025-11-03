import { useState } from "react";
import Layout from "@/components/Layout";
import { Play, Clock, User, Filter } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  duration: number;
  speaker?: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Como Conhecer Melhor a Jesus Cristo",
    description:
      "Uma reflexão profunda sobre como aprofundar nossa relação com Cristo através da oração, sacramentos e Palavra de Deus.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Formação",
    duration: 28,
    speaker: "Padre João Silva",
  },
  {
    id: "2",
    title: "A Importância da Confissão na Vida Cristã",
    description:
      "Entenda o sacramento da penitência, como a confissão nos liberta do pecado e nos aproxima de Deus.",
    youtubeUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    category: "Sacramentos",
    duration: 22,
    speaker: "Frei Marcos",
  },
  {
    id: "3",
    title: "Homilia - Domingo de Páscoa",
    description:
      "Uma poderosa homilia sobre a ressurreição de Cristo e o que significa para nossa vida de fé.",
    youtubeUrl: "https://www.youtube.com/embed/OPf0YbXqDm0",
    category: "Homilias",
    duration: 15,
    speaker: "Bispo Paulo",
  },
  {
    id: "4",
    title: "Evangelização para Jovens - Testemunho e Ação",
    description:
      "Como os jovens podem evangelizar através do testemunho de vida, ação missionária e diálogo genuíno.",
    youtubeUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    category: "Evangelização",
    duration: 35,
    speaker: "Padre Gabriel",
  },
  {
    id: "5",
    title: "Os Sete Sacramentos Explicados",
    description:
      "Uma série educativa explicando cada um dos sete sacramentos: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem Sagrada e Matrimônio.",
    youtubeUrl: "https://www.youtube.com/embed/RgKAFK5djSk",
    category: "Sacramentos",
    duration: 42,
    speaker: "Frei Fernando",
  },
  {
    id: "6",
    title: "Marianismo - Devoção a Nossa Senhora",
    description:
      "Compreenda a importância de Maria na Igreja Católica, seus mistérios e como ela nos guia a Jesus.",
    youtubeUrl: "https://www.youtube.com/embed/watch?v=NWONefy53",
    category: "Devoção",
    duration: 26,
    speaker: "Padre Fernando",
  },
  {
    id: "7",
    title: "Catecismo - Os Mandamentos de Deus",
    description:
      "Uma explicação clara e profunda sobre os Dez Mandamentos e sua importância para viver uma vida cristã plena.",
    youtubeUrl: "https://www.youtube.com/embed/9WZWb9OhJDo",
    category: "Catequese",
    duration: 31,
    speaker: "Diácono Carlos",
  },
  {
    id: "8",
    title: "A Eucaristia - O Coração da Fé Católica",
    description:
      "Uma reflexão espiritual profunda sobre o mistério da Eucaristia e seu impacto transformador em nossas vidas.",
    youtubeUrl: "https://www.youtube.com/embed/8_4Uhaui3UE",
    category: "Sacramentos",
    duration: 29,
    speaker: "Padre Lucas",
  },
  {
    id: "9",
    title: "Missão e Caridade - Servindo aos Pobres",
    description:
      "Como os cristãos são chamados a servir aos necessitados e viver a caridade de forma concreta.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Missão",
    duration: 20,
    speaker: "Irmã Maria",
  },
  {
    id: "10",
    title: "Homilia - Festa de São Francisco",
    description: "Uma bela homilia sobre a vida simples, humildade e dedicação à vontade de Deus.",
    youtubeUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    category: "Homilias",
    duration: 18,
    speaker: "Padre Antônio",
  },
  {
    id: "11",
    title: "Virtudes Cristãs - Fé, Esperança e Caridade",
    description:
      "Um aprofundamento nas três virtudes teologais que formam o fundamento da vida cristã.",
    youtubeUrl: "https://www.youtube.com/embed/OPf0YbXqDm0",
    category: "Formação",
    duration: 38,
    speaker: "Padre Raphael",
  },
  {
    id: "12",
    title: "Vocação Religiosa - Chamado de Deus",
    description:
      "Uma exploração sobre diferentes vocações: religiosa, matrimonial, diaconal e como discernir o chamado de Deus.",
    youtubeUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    category: "Vocação",
    duration: 33,
    speaker: "Frei João",
  },
];

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = ["Todos", ...Array.from(new Set(videos.map((v) => v.category)))];
  const filteredVideos =
    selectedCategory === "Todos"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Vídeos e Homilias
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Conteúdo católico para formação e inspiração espiritual
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-foreground">Categoria</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-card border border-border text-foreground hover:border-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-blue-600/50 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative bg-black aspect-video flex items-center justify-center group overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${
                      video.youtubeUrl.split("/embed/")[1]?.split("?")[0] ||
                      "dQw4w9WgXcQ"
                    }/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Play className="absolute w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}min
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  {video.speaker && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {video.speaker}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Video Player Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border border-border rounded-lg max-w-4xl w-full overflow-hidden">
                {/* Video Player */}
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${selectedVideo.youtubeUrl}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {selectedVideo.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Filter className="w-4 h-4" />
                          {selectedVideo.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedVideo.duration} minutos
                        </span>
                        {selectedVideo.speaker && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {selectedVideo.speaker}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="text-muted-foreground hover:text-foreground text-2xl font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-foreground leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
