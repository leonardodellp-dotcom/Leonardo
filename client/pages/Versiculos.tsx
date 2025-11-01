import Layout from "@/components/Layout";
import { BookOpen, Heart, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { isOlderThanDays } from "@/lib/security";

interface Verse {
  id: string;
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: string;
  reflection: string;
  day: string;
}

export default function Versiculos() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const verses: Verse[] = [
    {
      id: "1",
      reference: "João 3:16",
      text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      book: "Evangelho de João",
      chapter: 3,
      verse: "16",
      day: "Hoje",
      reflection:
        "Este versículo encapsula o coração do Evangelho: o amor incondicional de Deus por nós. Reflete como o sacrifício de Jesus é uma prova do amor divino que nos salva da perdição eterna.",
    },
    {
      id: "2",
      reference: "Filipenses 4:6-7",
      text: "Não andeis ansiosos por coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.",
      book: "Carta aos Filipenses",
      chapter: 4,
      verse: "6-7",
      day: "Ontem",
      reflection:
        "São Paulo nos convida a transformar a ansiedade em oração. Ao trazer nossas preocupações a Deus com gratidão, experimentamos uma paz que transcende toda a compreensão humana.",
    },
    {
      id: "3",
      reference: "Salmos 23:1",
      text: "O Senhor é o meu pastor; nada me faltará.",
      book: "Livro dos Salmos",
      chapter: 23,
      verse: "1",
      day: "2 dias atrás",
      reflection:
        "Este célebre salmo expressa a confiança na provisão e proteção divina. Quando reconhecemos Deus como nosso pastor, confiamos que Ele cuidará de todas as nossas necessidades.",
    },
    {
      id: "4",
      reference: "Mateus 5:14-16",
      text: "Vós sois a luz do mundo; não se pode esconder a cidade edificada sobre um monte. Nem se acende uma candeia para colocá-la debaixo de um alqueire, mas sim no velador, para iluminar a todos os que estão em casa. Assim brilhe a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai que está nos céus.",
      book: "Evangelho de Mateus",
      chapter: 5,
      verse: "14-16",
      day: "3 dias atrás",
      reflection:
        "Jesus nos chama a ser luz do mundo através de nossas boas obras. Nossa fé não deve ser escondida, mas deve brilhar como exemplo para que outros glorifiquem a Deus.",
    },
    {
      id: "5",
      reference: "1 Coríntios 13:4-7",
      text: "O amor é paciente, é benigno; o amor não arde em ciúmes, não se vangloria, não se ensoberbece, não se comporta inconvenientemente, não procura os seus interesses, não se irrita, não sente rancor; não se alegra com a injustiça, mas se alegra com a verdade; tudo sofre, tudo crê, tudo espera, tudo suporta.",
      book: "Primeira Carta aos Coríntios",
      chapter: 13,
      verse: "4-7",
      day: "4 dias atrás",
      reflection:
        "O hino do amor de São Paulo descreve as características verdadeiras do amor cristão. Este versículo nos convida a examinar nosso coração e cultivar o amor autêntico em nossas relações.",
    },
    {
      id: "6",
      reference: "Provérbios 3:5-6",
      text: "Confia no Senhor de todo o teu coração e não te apoies na tua própria prudência. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
      book: "Livro dos Provérbios",
      chapter: 3,
      verse: "5-6",
      day: "5 dias atrás",
      reflection:
        "A sabedoria bíblica nos ensina que confiança em Deus é superior à confiança em nossa própria compreensão. Ao reconhecê-lo em todas as situações, Ele nos guia pelo caminho correto.",
    },
    {
      id: "7",
      reference: "Romanos 8:28",
      text: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
      book: "Carta aos Romanos",
      chapter: 8,
      verse: "28",
      day: "6 dias atrás",
      reflection:
        "Esta promessa consoladora nos assegura que mesmo nas dificuldades, Deus trabalha para nosso bem se o amamos. Nossa confiança está em Seu propósito maior para nossas vidas.",
    },
  ];

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter verses that are NOT older than 5 days
  const activeVerses = verses.filter((verse) => {
    const daysMap: { [key: string]: number } = {
      "Hoje": 0,
      "Ontem": 1,
      "2 dias atrás": 2,
      "3 dias atrás": 3,
      "4 dias atrás": 4,
      "5 dias atrás": 5,
      "6 dias atrás": 6,
    };

    const days = daysMap[verse.day] || 0;
    return days <= 5; // Only show verses from the last 5 days
  });

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Palavra de Deus
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Versículos</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reflita sobre a Palavra de Deus diariamente. Cada versículo foi
              selecionado para inspirar, confortar e fortalecer sua jornada
              espiritual.
            </p>
          </div>

          <div className="space-y-6">
            {activeVerses.map((verse) => (
              <div
                key={verse.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">
                      {verse.reference}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {verse.book} • {verse.day}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          verse.id,
                          `${verse.reference}\n\n${verse.text}`,
                        )
                      }
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                      title="Copiar versículo"
                    >
                      {copiedId === verse.id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-accent"
                      title="Compartilhar"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-red-500"
                      title="Favoritar"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 mb-4 py-2">
                  <p className="text-foreground text-lg leading-relaxed italic">
                    "{verse.text}"
                  </p>
                </blockquote>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-primary mb-2">
                    💭 Reflexão
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {verse.reflection}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              "Toda Escritura �� inspirada por Deus e útil para ensinar, para
              repreender, para corrigir e para instruir na justiça." — 2 Timóteo
              3:16
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
