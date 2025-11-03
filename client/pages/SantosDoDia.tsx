import { useState } from "react";
import Layout from "@/components/Layout";
import { Heart, Calendar, Book, Lock } from "lucide-react";

interface Santo {
  id: string;
  name: string;
  feastDay: string;
  biography: string;
  prayer: string;
  imageUrl?: string;
}

const santos: Santo[] = [
  {
    id: "1",
    name: "Santo Antônio de Pádua",
    feastDay: "13 de junho",
    biography:
      "Santo Antônio nasceu em Lisboa, Portugal, em 1195. Foi um dos primeiros discípulos de São Francisco de Assis e é conhecido como o 'Santo dos Milagres'. Dedicou-se à pregação e ao combate das heresias, tornando-se um dos maiores doutores da Igreja. Famoso pela bondade com os pobres e pelos milagres realizados em vida. Canonizado em 1232, é invocado para encontrar coisas perdidas e para proteção dos viajantes.",
    prayer:
      "Santo Antônio, meu protetor, intercede por mim junto a Jesus Cristo. Ajuda-me a encontrar o que foi perdido, não apenas coisas materiais, mas também a paz da alma e o caminho da salvação. Concede-me a graça de ser generoso como foste na terra. Amém.",
  },
  {
    id: "2",
    name: "Santa Joana de Arco",
    feastDay: "30 de maio",
    biography:
      "Joana de Arco nasceu em Domrémy, França, em 1412. A partir dos 13 anos começou a receber mensagens de santos que a pediam para ajudar o rei da França. Liderou os franceses em diversas vitórias contra os ingleses durante a Guerra dos Cem Anos. Presa pelos ingleses, foi condenada à morte na fogueira em 1431, aos 19 anos. Canonizada em 1920, é padroeira da França e símbolo de coragem e fé inabalável.",
    prayer:
      "Santa Joana de Arco, virgem corajosa, intercede por mim. Concede-me a força de enfrentar os desafios com fé inabalável. Ajuda-me a ouvir a voz de Deus em minha vida e a ter coragem para agir segundo Sua vontade. Amém.",
  },
  {
    id: "3",
    name: "São Francisco de Assis",
    feastDay: "4 de outubro",
    biography:
      "Francisco de Assis nasceu em 1181 na Itália. Abandonou uma vida de riqueza para viver em pobreza radical e dedicação a Deus. Fundou a Ordem dos Frades Menores, promovendo a simplicidade e o amor pela natureza. Recebeu os estigmas, marcas das feridas de Cristo. Morreu em 1226 e foi canonizado em 1228. É o padroeiro dos animais e da ecologia.",
    prayer:
      "São Francisco, homem de paz, intercede por mim. Ensina-me a viver com simplicidade e a amar todas as criaturas como reflexos do amor de Deus. Concede-me a graça de encontrar paz na renúncia e alegria na doação. Amém.",
  },
  {
    id: "4",
    name: "Nossa Senhora Aparecida",
    feastDay: "12 de outubro",
    biography:
      "Nossa Senhora Aparecida é a santa padroeira do Brasil. A devoção começou em 1717, quando pescadores encontraram uma imagem da Virgem Maria nas águas do Rio Paraíba. Milhões de brasileiros a veneram e visitam seu santuário em Aparecida, São Paulo. É símbolo da fé, proteção maternal e da identidade católica brasileira.",
    prayer:
      "Virgem Aparecida, Mãe do Brasil, intercede por nosso povo. Protege nossa nação com teu manto sagrado. Concede-nos fé forte, esperança viva e caridade ardente. Guia-nos sempre nos caminhos de Jesus. Amém.",
  },
  {
    id: "5",
    name: "São João Batista",
    feastDay: "24 de junho",
    biography:
      "João Batista foi o precursor de Jesus Cristo. Pregava no deserto, batizando aqueles que se arrependiam. Batizou Jesus no Rio Jordão. Foi preso pelo rei Herodes e depois executado, tornando-se o primeiro mártir cristão. É reverenciado por sua humildade, austeridade e fidelidade à vontade de Deus.",
    prayer:
      "São João Batista, precursor de Cristo, intercede por mim. Ajuda-me a preparar meu coração para receber melhor a presença de Jesus. Concede-me espírito de penitência e sincero arrependimento dos pecados. Amém.",
  },
  {
    id: "6",
    name: "Santa Teresinha do Menino Jesus",
    feastDay: "1º de outubro",
    biography:
      "Teresinha (Thérèse de Lisieux) nasceu em 1873 na França. Entrou para o Carmelo aos 15 anos e viveu uma vida contemplativa simples. Desenvolveu o caminho da infância espiritual, buscando a santidade através das pequenas coisas do dia a dia. Morreu de tuberculose aos 24 anos e foi canonizada em 1925. É doutora da Igreja e padroeira das missões.",
    prayer:
      "Santa Teresinha, doutora do amor divino, intercede por mim. Ensina-me a encontrar Deus nas pequenas coisas e a ser santa através da simplicidade. Concede-me confiança no amor infinito de Deus. Amém.",
  },
];

export default function SantosDoDia() {
  const [selectedSanto, setSelectedSanto] = useState<Santo>(santos[0]);
  const [showPrayer, setShowPrayer] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">Santos do Dia</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Conheça a vida e a fé dos santos que nos precederam
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Saints List */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Hagiológio
                </h2>
                <div className="space-y-2">
                  {santos.map((santo) => (
                    <button
                      key={santo.id}
                      onClick={() => {
                        setSelectedSanto(santo);
                        setShowPrayer(false);
                      }}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedSanto.id === santo.id
                          ? "bg-blue-600/20 border border-blue-600 text-blue-300"
                          : "bg-background hover:bg-slate-700 text-foreground"
                      }`}
                    >
                      <div className="font-semibold text-sm">{santo.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {santo.feastDay}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Saint Details */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
                {/* Saint Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {selectedSanto.name}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Festa: {selectedSanto.feastDay}
                  </div>
                </div>

                {/* Biography Section */}
                {!showPrayer && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <Book className="w-5 h-5 mr-2 text-blue-400" />
                      Biografia
                    </h3>
                    <p className="text-foreground leading-relaxed mb-6 text-justify">
                      {selectedSanto.biography}
                    </p>

                    <button
                      onClick={() => setShowPrayer(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Ver Oração
                    </button>
                  </div>
                )}

                {/* Prayer Section */}
                {showPrayer && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      Oração a {selectedSanto.name.split(" ")[0]}
                    </h3>
                    <div className="bg-background/50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
                      <p className="text-foreground leading-relaxed text-lg italic whitespace-pre-wrap">
                        {selectedSanto.prayer}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowPrayer(false)}
                      className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <Book className="w-5 h-5 mr-2" />
                      Ver Biografia
                    </button>
                  </div>
                )}
              </div>

              {/* Prayer Tips */}
              <div className="mt-6 bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <p className="text-sm text-foreground flex items-start">
                  <Lock className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    Reze diariamente a oração do santo do dia para fortalecer sua fé e receber suas graças.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
