import Layout from "@/components/Layout";
import { Heart, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Prayer {
  id: string;
  title: string;
  author?: string;
  category: string;
  content: string;
}

export default function Oracoes() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prayers: Prayer[] = [
    {
      id: "1",
      title: "Ave-Maria",
      category: "Clássica",
      content: `Ave, Maria! cheia de graça,
O Senhor é convosco;
Bendita sois vós entre as mulheres,
E bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus,
Rogai por nós, pecadores,
Agora e na hora da nossa morte.
Amém.`,
    },
    {
      id: "2",
      title: "Oração do Pai Nosso",
      category: "Clássica",
      content: `Pai nosso, que estais no céu,
Santificado seja o Vosso Nome;
Venha a nós o Vosso Reino;
Seja feita a Vossa vontade,
Assim na terra como no céu.
O pão nosso de cada dia nos dai hoje;
Perdoai-nos as nossas dívidas,
Assim como nós perdoamos aos nossos devedores;
E não nos deixeis cair em tentação;
Mas livrai-nos do mal.
Amém.`,
    },
    {
      id: "3",
      title: "Glória ao Pai",
      category: "Clássica",
      content: `Glória ao Pai, e ao Filho, e ao Espírito Santo.
Como era no princípio, agora e sempre,
Pelos séculos dos séculos.
Amém.`,
    },
    {
      id: "4",
      title: "Oração de Confiança",
      author: "Santo Inácio de Loyola",
      category: "Confiança",
      content: `Senhor meu Jesus Cristo,
Deus e homem verdadeiro,
Criador, Pai e Redentor meu;
Por serdes vós quem sois, bondade infinita,
E porque vos amei muito, ainda que imperfeitamente;
E me pesa de todo o coração ter-vos ofendido.
Propondo firmemente, com ajuda da vossa graça,
Não mais vos ofender, e emendar-me na vida;
Espero, Senhor, pela vossa infinita misericórdia,
Perdão de todos os meus pecados,
E graça para perseverar na vossa santa lei,
Até à morte.
Amém.`,
    },
    {
      id: "5",
      title: "Oração da Serenidade",
      category: "Paz Interior",
      content: `Ó Deus, dai-me serenidade para aceitar as coisas que não posso mudar,
Coragem para mudar as que posso,
E sabedoria para reconhecer a diferença.
Que viva um dia de cada vez,
Apreciando um momento de cada vez,
Aceitando as dificuldades como caminhos para a paz.
Levando a Ti, assim como fizeste a Jesus,
Este mundo pecaminoso tal como é,
Não como eu gostaria que fosse.
Confiando que Tu farás bem todas as coisas,
Se eu me entregar Teu propósito,
Para que possa estar razoavelmente feliz nesta vida,
E supremamente feliz contigo para sempre na próxima.
Amém.`,
    },
    {
      id: "6",
      title: "Oração Pelas Vocações",
      category: "Intercessão",
      content: `Ó Jesus,
Que dissestes: "A messe é realmente grande, mas os operários são poucos; rogai, pois, ao Senhor da messe que envie operários à Sua messe",
Rogamos-Vos: Aumentai o número de vocações sacerdotais e religiosas.
Abençoai os seminaristas e noviços.
Concedei que perseverem e se tornem santos sacerdotes e religiosos.
Inspirai aos jovens o desejo de se dedicarem inteiramente ao Vosso serviço.
Rogai pela Vossa Igreja,
Para que tenha padres santos e dedicados.
Amém.`,
    },
  ];

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Orações Sagradas
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Orações</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Colecção de orações católicas para elevar sua alma e conectar-se
              com Deus. Eleve suas preces em comunidade e encontre paz
              espiritual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prayers.map((prayer) => (
              <div
                key={prayer.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{prayer.title}</h3>
                    {prayer.author && (
                      <p className="text-sm text-muted-foreground">
                        {prayer.author}
                      </p>
                    )}
                    <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {prayer.category}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prayer.id, prayer.content)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                    title="Copiar oração"
                  >
                    {copiedId === prayer.id ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {prayer.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A oração é uma conversa com Deus. Utilize essas orações como guia
              para sua meditação pessoal e aproximação com o divino.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
