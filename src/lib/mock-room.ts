import type { AvatarName } from "@/lib/avatars";

export type Speaker = {
  id: string;
  name: string;
  email: string;
  avatar: AvatarName;
};

export type TranscriptEntry = {
  id: string;
  speakerId: string;
  at: string;
  durationSec: number;
  text: {
    en: string;
    id: string;
    zh: string;
    fr: string;
    de: string;
    it: string;
    es: string;
  };
  highlight?: string; // leading part of text.en shown highlighted while playing
};

export const SPEAKERS: Speaker[] = [
  {
    id: "jane",
    name: "Jane Anne",
    email: "janeanne@gmail.com",
    avatar: "nina",
  },
  {
    id: "anneth",
    name: "Anneth Black",
    email: "annethblack@gmail.com",
    avatar: "zack",
  },
  {
    id: "clara",
    name: "Clara Burg",
    email: "claraburg@gmail.com",
    avatar: "cleo",
  },
];

export const TRANSCRIPT: TranscriptEntry[] = [
  {
    id: "1",
    speakerId: "jane",
    at: "00:32",
    durationSec: 32,
    text: {
      en: "Okay, next up is. We need to review those screens and the new creative concept will help reactivate the campaign.",
      id: "Oke, selanjutnya. Kita perlu meninjau layar-layar tersebut, dan konsep kreatif baru akan membantu mengaktifkan kembali kampanye.",
      zh: "好的，接下来，我们需要审查那些页面，而新的创意方案将有助于重新启动这场营销活动。",
      fr: "D'accord, passons au point suivant. Nous devons examiner ces écrans, et le nouveau concept créatif contribuera à relancer la campagne.",
      de: "Okay, als Nächstes müssen wir diese Bildschirme überprüfen. Das neue Kreativkonzept wird dazu beitragen, die Kampagne wiederzubeleben.",
      it: "Bene, passiamo al punto successivo. Dobbiamo esaminare quelle schermate e il nuovo concept creativo contribuirà a rilanciare la campagna.",
      es: "Bien, pasemos al siguiente punto. Tenemos que revisar esas pantallas y el nuevo concepto creativo ayudará a reactivar la campaña.",
    },
  },
  {
    id: "2",
    speakerId: "anneth",
    at: "01:02",
    durationSec: 52,
    text: {
      en: "Oh yeah, to reactivate the campaign.",
      id: "Oh yaa, untuk mengaktifkan kembali kampanye.",
      zh: "哦，对，为了重新启动这场营销活动。",
      fr: "Ah oui, pour réactiver la campagne.",
      de: "Ach ja, um die Kampagne wieder zu aktivieren.",
      it: "Ah sì, per riattivare la campagna.",
      es: "Ah, sí, para reactivar la campaña.",
    },
  },
  {
    id: "3",
    speakerId: "clara",
    at: "01:12",
    durationSec: 37,
    highlight:
      "No. I mean, how do we reactivate this campaign? How do we trigger this moment?",
    text: {
      en: "No. I mean, how do we reactivate this campaign? How do we trigger this moment? We could relaunch it with a limited-time offer or a new creative angle. Maybe something that re-engages the audience emotionally.",
      id: "Tidak. Maksud saya, bagaimana cara mengaktifkan kembali kampanye ini? Bagaimana, apa yang menjadi pemicu untuk membuka momen ini?",
      zh: "不，我的意思是，我们该如何重新启动这场营销活动？怎样才能创造这个契机？我们可以通过限时优惠或全新的创意角度重新推出活动。也许可以采用某种方式，在情感上重新吸引受众。",
      fr: "Non. Je veux dire, comment pouvons-nous réactiver cette campagne ? Comment pouvons-nous créer ce moment décisif ? Nous pourrions la relancer avec une offre à durée limitée ou un nouvel angle créatif. Peut-être quelque chose qui suscite à nouveau une connexion émotionnelle avec le public.",
      de: "Nein. Ich meine, wie können wir diese Kampagne wiederbeleben? Wie können wir diesen Moment auslösen? Wir könnten sie mit einem zeitlich begrenzten Angebot oder einem neuen kreativen Ansatz neu starten. Vielleicht mit etwas, das das Publikum emotional wieder anspricht.",
      it: "No. Intendo, come possiamo riattivare questa campagna? Come possiamo creare questo momento decisivo? Potremmo rilanciarla con un'offerta a tempo limitato o un nuovo approccio creativo. Magari qualcosa che coinvolga nuovamente il pubblico a livello emotivo.",
      es: "No. Quiero decir, ¿cómo podemos reactivar esta campaña? ¿Cómo podemos desencadenar este momento? Podríamos relanzarla con una oferta por tiempo limitado o un nuevo enfoque creativo. Quizás algo que vuelva a conectar emocionalmente con el público.",
    },
  },
];

export const KEY_POINTS = [
  {
    title: "Campaign and Analytics Features",
    detail: "Need to review screens before activating super album campaign.",
  },
  {
    title: "Creator Experience Design",
    detail: "Two new page PRDs shared : Creator homepage and Social analytics.",
  },
  {
    title: "Change Experience Design",
    detail: "Two new page PRDs shared : Creator homepage and Social analytics.",
  },
];

export const SUMMARY = {
  title: "Comprehensive Update on Campaign Dashboard Design Enhancements",
  text: "In this conversation, one person is asking how to reactivate a campaign and trigger the same impactful moment it once had. The discussion revolves around finding ways to reignite audience interest, such as through new creative ideas, timely events, or emotional storytelling. The goal is to recapture attention and rebuild campaign momentum using a strategic, engaging approach.",
  points: [
    { title: "Campaign reactivation", at: "00:52" },
    { title: "Triggering engagement", at: "00:52" },
    { title: "Marketing strategies", at: "00:52" },
  ],
};
