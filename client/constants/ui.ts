import {
  BookOpen,
  Heart,
  Users,
  Flame,
  Calendar,
  Compass,
  MessageCircle,
  Target,
  Award,
} from "lucide-react";

export const SERVICES = [
  {
    icon: BookOpen,
    title: "Versículos Diários",
    description: "Reflita sobre a Palavra de Deus todos os dias",
    path: "/versiculos",
  },
  {
    icon: Heart,
    title: "Orações",
    description: "Eleve suas preces em comunidade",
    path: "/oracoes",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Conecte-se com jovens de fé semelhante",
    path: "/mural",
  },
  {
    icon: Flame,
    title: "Desafios Espirituais",
    description: "Cresça na fé através de desafios práticos",
    path: "/desafios",
  },
  {
    icon: Calendar,
    title: "Calendário Litúrgico",
    description: "Acompanhe as celebrações litúrgicas",
    path: "/calendario-liturgico",
  },
  {
    icon: Compass,
    title: "Aprender a Rezar",
    description: "Aprenda diferentes formas de oração",
    path: "/aprender-rezar",
  },
];

export const HIGHLIGHTS = [
  {
    icon: MessageCircle,
    title: "Pedidos de Oração",
    description: "Compartilhe seus pedidos e interceda pelos irmãos da comunidade",
    path: "/pedidos-oracao",
  },
  {
    icon: Target,
    title: "Missões",
    description: "Participe de projetos missionários e sirva a comunidade",
    path: "/missoes",
  },
  {
    icon: Award,
    title: "Cursos Católicos",
    description: "Aprofunde seu conhecimento da fé através de cursos",
    path: "/cursos",
  },
  {
    icon: Calendar,
    title: "Agenda",
    description: "Confira os próximos encontros e eventos",
    path: "/agenda",
  },
];
