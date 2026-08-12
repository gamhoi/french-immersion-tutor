// All the French a camper might need for a week at Camp de la Baie.
// Instructions / hints are in English (learner reads English comfortably).

export type WordBankExercise = {
  type: "word-bank"
  english: string // meaning / instruction
  answer: string // full correct French sentence
  distractors: string[] // extra word tiles to make it tricky
}

export type SpellingExercise = {
  type: "spelling"
  english: string // what to write in French
  answer: string // correct French sentence
}

export type ChooseExercise = {
  type: "choose"
  situation: string // English description of the moment
  question?: string // optional French line someone says to you
  options: string[]
  correct: number // index of correct option
  english: string // meaning of the correct answer
}

export type ReadExercise = {
  type: "read"
  french: string
  english: string
}

export type ListenExercise = {
  type: "listen"
  audio: string // the French sentence that is played out loud
  options: string[] // French text choices (audio is NOT shown as text)
  correct: number // index of the sentence that was said
  english: string // meaning of the correct answer
}

export type Exercise =
  | WordBankExercise
  | SpellingExercise
  | ChooseExercise
  | ReadExercise
  | ListenExercise

export type Lesson = {
  id: string
  title: string
  exercises: Exercise[]
}

export type Unit = {
  id: string
  title: string
  subtitle: string
  icon: string // key resolved to a lucide icon in the UI
  color: "lake" | "sunny" | "success" | "accent" | "grape"
  lessons: Lesson[]
}

export const CURRICULUM: Unit[] = [
  {
    id: "arrival",
    title: "Arrival & Names",
    subtitle: "Say hello and introduce yourself",
    icon: "wave",
    color: "lake",
    lessons: [
      {
        id: "arrival-1",
        title: "Bonjour!",
        exercises: [
          { type: "read", french: "Bonjour !", english: "Hello!" },
          {
            type: "choose",
            situation: "A counselor smiles and asks your name.",
            question: "Comment tu t'appelles ?",
            options: ["Je m'appelle Léa.", "J'ai dix ans.", "Ça va bien."],
            correct: 0,
            english: "My name is Léa.",
          },
          {
            type: "word-bank",
            english: "My name is Léa.",
            answer: "Je m'appelle Léa",
            distractors: ["tu", "est", "bonjour"],
          },
          {
            type: "listen",
            audio: "Bonjour !",
            options: ["Bonjour !", "Bonne nuit !", "Merci !"],
            correct: 0,
            english: "Hello!",
          },
          {
            type: "spelling",
            english: "I am ten years old.",
            answer: "J'ai dix ans",
          },
          {
            type: "word-bank",
            english: "I come from Canada.",
            answer: "Je viens du Canada",
            distractors: ["vais", "à", "es"],
          },
          {
            type: "read",
            french: "Enchantée !",
            english: "Nice to meet you!",
          },
        ],
      },
      {
        id: "arrival-2",
        title: "Ça va?",
        exercises: [
          {
            type: "read",
            french: "Salut ! Ça va ?",
            english: "Hi! How are you?",
          },
          {
            type: "choose",
            situation: "A new friend asks how you are doing.",
            question: "Ça va ?",
            options: ["Ça va bien, merci !", "J'ai dix ans.", "C'est bleu."],
            correct: 0,
            english: "I'm doing well, thanks!",
          },
          {
            type: "listen",
            audio: "Comment tu t'appelles ?",
            options: [
              "Comment tu t'appelles ?",
              "Quel âge as-tu ?",
              "Où sont les toilettes ?",
            ],
            correct: 0,
            english: "What is your name?",
          },
          {
            type: "word-bank",
            english: "How old are you?",
            answer: "Quel âge as-tu",
            distractors: ["est", "je", "nom"],
          },
          {
            type: "spelling",
            english: "See you soon!",
            answer: "À bientôt",
          },
          {
            type: "choose",
            situation: "Someone says goodbye at the end of the day.",
            options: ["Au revoir !", "Bonjour !", "J'ai faim !"],
            correct: 0,
            english: "Goodbye!",
          },
          {
            type: "read",
            french: "Je suis contente d'être ici.",
            english: "I'm happy to be here.",
          },
        ],
      },
    ],
  },
  {
    id: "help",
    title: "I Don't Understand",
    subtitle: "The most useful survival phrases",
    icon: "help",
    color: "sunny",
    lessons: [
      {
        id: "help-1",
        title: "Au secours!",
        exercises: [
          {
            type: "read",
            french: "Je ne comprends pas.",
            english: "I don't understand.",
          },
          {
            type: "choose",
            situation: "You didn't catch what someone just said.",
            options: [
              "Peux-tu répéter, s'il te plaît ?",
              "J'ai faim.",
              "Au revoir.",
            ],
            correct: 0,
            english: "Can you repeat, please?",
          },
          {
            type: "listen",
            audio: "Je ne comprends pas.",
            options: [
              "Je ne comprends pas.",
              "Je ne sais pas.",
              "Je suis fatiguée.",
            ],
            correct: 0,
            english: "I don't understand.",
          },
          {
            type: "word-bank",
            english: "How do you say 'dog' in French?",
            answer: "Comment on dit chien en français",
            distractors: ["quoi", "est", "le"],
          },
          {
            type: "spelling",
            english: "I don't know.",
            answer: "Je ne sais pas",
          },
          {
            type: "choose",
            situation: "You really need help with something.",
            options: ["À l'aide, s'il te plaît !", "Bonne nuit.", "C'est délicieux."],
            correct: 0,
            english: "Help, please!",
          },
          {
            type: "read",
            french: "Peux-tu m'aider ?",
            english: "Can you help me?",
          },
        ],
      },
      {
        id: "help-2",
        title: "Plus lentement",
        exercises: [
          {
            type: "read",
            french: "Plus lentement, s'il te plaît.",
            english: "Slower, please.",
          },
          {
            type: "listen",
            audio: "Peux-tu répéter, s'il te plaît ?",
            options: [
              "Peux-tu répéter, s'il te plaît ?",
              "Peux-tu m'aider, s'il te plaît ?",
              "Où est la salle de bain ?",
            ],
            correct: 0,
            english: "Can you repeat, please?",
          },
          {
            type: "choose",
            situation: "You want to know what a French word means.",
            options: [
              "Qu'est-ce que ça veut dire ?",
              "C'est délicieux !",
              "Bonne nuit !",
            ],
            correct: 0,
            english: "What does that mean?",
          },
          {
            type: "word-bank",
            english: "I have a question.",
            answer: "J'ai une question",
            distractors: ["est", "le", "faim"],
          },
          {
            type: "spelling",
            english: "I forgot.",
            answer: "J'ai oublié",
          },
          {
            type: "listen",
            audio: "Comment on dit ça en français ?",
            options: [
              "Comment on dit ça en français ?",
              "Comment tu t'appelles ?",
              "Quelle heure est-il ?",
            ],
            correct: 0,
            english: "How do you say that in French?",
          },
          {
            type: "read",
            french: "D'accord, merci !",
            english: "Okay, thank you!",
          },
        ],
      },
    ],
  },
  {
    id: "meals",
    title: "Meal Time",
    subtitle: "Food, drinks and being polite at the table",
    icon: "meal",
    color: "success",
    lessons: [
      {
        id: "meals-1",
        title: "À table!",
        exercises: [
          { type: "read", french: "J'ai faim !", english: "I'm hungry!" },
          {
            type: "word-bank",
            english: "I would like some water.",
            answer: "Je voudrais de l'eau",
            distractors: ["mange", "tu", "pain"],
          },
          {
            type: "listen",
            audio: "J'ai faim !",
            options: ["J'ai faim !", "J'ai soif !", "J'ai froid !"],
            correct: 0,
            english: "I'm hungry!",
          },
          {
            type: "choose",
            situation: "You love the food. Tell the cook!",
            options: ["C'est délicieux !", "J'ai soif.", "Je suis fatiguée."],
            correct: 0,
            english: "It's delicious!",
          },
          {
            type: "spelling",
            english: "I'm thirsty.",
            answer: "J'ai soif",
          },
          {
            type: "word-bank",
            english: "I don't like that.",
            answer: "Je n'aime pas ça",
            distractors: ["aime", "très", "toi"],
          },
          {
            type: "read",
            french: "Encore, s'il te plaît !",
            english: "More, please!",
          },
        ],
      },
      {
        id: "meals-2",
        title: "Miam miam!",
        exercises: [
          {
            type: "read",
            french: "Je peux avoir du pain ?",
            english: "Can I have some bread?",
          },
          {
            type: "listen",
            audio: "C'est délicieux !",
            options: ["C'est délicieux !", "C'est fini !", "C'est parti !"],
            correct: 0,
            english: "It's delicious!",
          },
          {
            type: "choose",
            situation: "You're full and can't eat any more.",
            options: ["J'ai fini, merci !", "J'ai encore faim.", "Bonjour !"],
            correct: 0,
            english: "I'm finished, thank you!",
          },
          {
            type: "word-bank",
            english: "I am allergic to nuts.",
            answer: "Je suis allergique aux noix",
            distractors: ["mange", "le", "eau"],
          },
          {
            type: "listen",
            audio: "Bon appétit !",
            options: ["Bon appétit !", "Bonne nuit !", "Bon voyage !"],
            correct: 0,
            english: "Enjoy your meal!",
          },
          {
            type: "spelling",
            english: "Can I have some milk?",
            answer: "Je peux avoir du lait",
          },
          {
            type: "read",
            french: "Merci pour le repas !",
            english: "Thanks for the meal!",
          },
        ],
      },
    ],
  },
  {
    id: "water",
    title: "Swimming & Water",
    subtitle: "The lake, the beach and staying safe",
    icon: "water",
    color: "lake",
    lessons: [
      {
        id: "water-1",
        title: "À l'eau!",
        exercises: [
          { type: "read", french: "On va nager !", english: "We're going to swim!" },
          {
            type: "choose",
            situation: "A counselor asks if you can swim.",
            question: "Tu sais nager ?",
            options: ["Oui, je sais nager.", "J'ai dix ans.", "Bonjour !"],
            correct: 0,
            english: "Yes, I can swim.",
          },
          {
            type: "listen",
            audio: "On va nager !",
            options: ["On va nager !", "On va manger !", "On va jouer !"],
            correct: 0,
            english: "We're going to swim!",
          },
          {
            type: "word-bank",
            english: "Where is my swimsuit?",
            answer: "Où est mon maillot de bain",
            distractors: ["quoi", "le", "gilet"],
          },
          {
            type: "spelling",
            english: "The water is cold!",
            answer: "L'eau est froide",
          },
          {
            type: "choose",
            situation: "You can't find your life jacket.",
            options: [
              "Où est mon gilet de sauvetage ?",
              "C'est délicieux !",
              "Je ne comprends pas.",
            ],
            correct: 0,
            english: "Where is my life jacket?",
          },
          {
            type: "read",
            french: "Attends-moi !",
            english: "Wait for me!",
          },
        ],
      },
      {
        id: "water-2",
        title: "À la plage",
        exercises: [
          {
            type: "read",
            french: "La plage est magnifique !",
            english: "The beach is beautiful!",
          },
          {
            type: "listen",
            audio: "L'eau est froide !",
            options: ["L'eau est froide !", "L'eau est chaude !", "J'ai chaud !"],
            correct: 0,
            english: "The water is cold!",
          },
          {
            type: "choose",
            situation: "You want to build a sandcastle with a friend.",
            options: [
              "On fait un château de sable ?",
              "Où est mon maillot ?",
              "Bonne nuit !",
            ],
            correct: 0,
            english: "Shall we build a sandcastle?",
          },
          {
            type: "word-bank",
            english: "Be careful in the water!",
            answer: "Fais attention dans l'eau",
            distractors: ["nage", "le", "froid"],
          },
          {
            type: "spelling",
            english: "I love the lake.",
            answer: "J'adore le lac",
          },
          {
            type: "listen",
            audio: "Attends-moi !",
            options: ["Attends-moi !", "Aide-moi !", "Regarde-moi !"],
            correct: 0,
            english: "Wait for me!",
          },
          {
            type: "read",
            french: "C'est mon tour de plonger !",
            english: "It's my turn to dive!",
          },
        ],
      },
    ],
  },
  {
    id: "friends",
    title: "Making Friends",
    subtitle: "Play games and join the fun",
    icon: "friends",
    color: "accent",
    lessons: [
      {
        id: "friends-1",
        title: "On joue?",
        exercises: [
          { type: "read", french: "Tu veux jouer ?", english: "Do you want to play?" },
          {
            type: "word-bank",
            english: "Let's be a team.",
            answer: "On fait équipe",
            distractors: ["je", "avec", "joue"],
          },
          {
            type: "listen",
            audio: "Tu veux jouer ?",
            options: ["Tu veux jouer ?", "Tu veux manger ?", "Tu sais nager ?"],
            correct: 0,
            english: "Do you want to play?",
          },
          {
            type: "choose",
            situation: "You want to join a group game.",
            options: ["Je peux jouer avec vous ?", "J'ai soif.", "Au revoir."],
            correct: 0,
            english: "Can I play with you?",
          },
          {
            type: "spelling",
            english: "You are my friend.",
            answer: "Tu es mon amie",
          },
          {
            type: "word-bank",
            english: "Whose turn is it?",
            answer: "C'est à qui le tour",
            distractors: ["quoi", "mon", "jeu"],
          },
          {
            type: "read",
            french: "Bien joué !",
            english: "Well done!",
          },
        ],
      },
      {
        id: "friends-2",
        title: "Les copains",
        exercises: [
          {
            type: "read",
            french: "On est copines !",
            english: "We're friends!",
          },
          {
            type: "listen",
            audio: "Bien joué !",
            options: ["Bien joué !", "Bien dormi !", "Bien mangé !"],
            correct: 0,
            english: "Well done!",
          },
          {
            type: "choose",
            situation: "Your team just won the game!",
            options: ["On a gagné !", "J'ai perdu.", "J'ai faim."],
            correct: 0,
            english: "We won!",
          },
          {
            type: "word-bank",
            english: "Do you want to be my partner?",
            answer: "Tu veux être ma partenaire",
            distractors: ["joue", "le", "tour"],
          },
          {
            type: "spelling",
            english: "That's my turn.",
            answer: "C'est mon tour",
          },
          {
            type: "listen",
            audio: "On fait équipe ?",
            options: ["On fait équipe ?", "On fait un gâteau ?", "On va dormir ?"],
            correct: 0,
            english: "Shall we be a team?",
          },
          {
            type: "read",
            french: "À toi de jouer !",
            english: "Your turn to play!",
          },
        ],
      },
    ],
  },
  {
    id: "routine",
    title: "Daily Routine",
    subtitle: "Waking up, activities and bedtime",
    icon: "routine",
    color: "grape",
    lessons: [
      {
        id: "routine-1",
        title: "Le quotidien",
        exercises: [
          {
            type: "read",
            french: "C'est l'heure de se lever.",
            english: "It's time to get up.",
          },
          {
            type: "choose",
            situation: "It's bedtime in the cabin.",
            options: ["Bonne nuit !", "Bonjour !", "J'ai faim !"],
            correct: 0,
            english: "Good night!",
          },
          {
            type: "listen",
            audio: "Je suis fatiguée.",
            options: ["Je suis fatiguée.", "Je suis contente.", "Je suis prête."],
            correct: 0,
            english: "I am tired.",
          },
          {
            type: "word-bank",
            english: "I am tired.",
            answer: "Je suis fatiguée",
            distractors: ["très", "tu", "content"],
          },
          {
            type: "spelling",
            english: "What time is it?",
            answer: "Quelle heure est-il",
          },
          {
            type: "choose",
            situation: "You're all ready for the next activity.",
            options: ["Je suis prête !", "Il pleut.", "Bonne nuit."],
            correct: 0,
            english: "I'm ready!",
          },
          {
            type: "read",
            french: "À demain !",
            english: "See you tomorrow!",
          },
        ],
      },
      {
        id: "routine-2",
        title: "Le temps",
        exercises: [
          {
            type: "read",
            french: "Il fait beau aujourd'hui !",
            english: "It's nice out today!",
          },
          {
            type: "listen",
            audio: "Il pleut.",
            options: ["Il pleut.", "Il fait chaud.", "Il fait froid."],
            correct: 0,
            english: "It's raining.",
          },
          {
            type: "choose",
            situation: "A counselor asks if you slept well.",
            question: "Tu as bien dormi ?",
            options: ["Oui, très bien !", "J'ai faim.", "C'est bleu."],
            correct: 0,
            english: "Yes, very well!",
          },
          {
            type: "word-bank",
            english: "I need to brush my teeth.",
            answer: "Je dois me brosser les dents",
            distractors: ["mange", "le", "eau"],
          },
          {
            type: "spelling",
            english: "It's sunny.",
            answer: "Il fait soleil",
          },
          {
            type: "listen",
            audio: "C'est l'heure de se lever.",
            options: [
              "C'est l'heure de se lever.",
              "C'est l'heure de manger.",
              "C'est l'heure de dormir.",
            ],
            correct: 0,
            english: "It's time to get up.",
          },
          {
            type: "read",
            french: "Bonne journée !",
            english: "Have a good day!",
          },
        ],
      },
    ],
  },
  {
    id: "feelings",
    title: "Feelings & Politeness",
    subtitle: "Say thank you and how you feel",
    icon: "feelings",
    color: "sunny",
    lessons: [
      {
        id: "feelings-1",
        title: "Merci!",
        exercises: [
          {
            type: "read",
            french: "Merci beaucoup !",
            english: "Thank you very much!",
          },
          {
            type: "word-bank",
            english: "I am happy.",
            answer: "Je suis contente",
            distractors: ["fatiguée", "tu", "très"],
          },
          {
            type: "listen",
            audio: "Merci beaucoup !",
            options: ["Merci beaucoup !", "Pardon !", "Bravo !"],
            correct: 0,
            english: "Thank you very much!",
          },
          {
            type: "choose",
            situation: "You accidentally bump into someone.",
            options: ["Pardon !", "Bravo !", "Santé !"],
            correct: 0,
            english: "Sorry!",
          },
          {
            type: "spelling",
            english: "I miss my mom.",
            answer: "Ma maman me manque",
          },
          {
            type: "choose",
            situation: "Someone helps you carry your bag.",
            options: ["Merci, c'est gentil !", "J'ai soif.", "Au revoir."],
            correct: 0,
            english: "Thank you, that's kind!",
          },
          {
            type: "read",
            french: "Je t'aime, maman.",
            english: "I love you, mom.",
          },
        ],
      },
      {
        id: "feelings-2",
        title: "Comment je me sens",
        exercises: [
          {
            type: "read",
            french: "Je me sens un peu triste.",
            english: "I feel a little sad.",
          },
          {
            type: "listen",
            audio: "Je suis fatiguée.",
            options: [
              "Je suis fatiguée.",
              "Je suis contente.",
              "Je suis malade.",
            ],
            correct: 0,
            english: "I am tired.",
          },
          {
            type: "choose",
            situation: "You don't feel well and need the nurse.",
            options: [
              "Je ne me sens pas bien.",
              "C'est délicieux !",
              "On va nager !",
            ],
            correct: 0,
            english: "I don't feel well.",
          },
          {
            type: "word-bank",
            english: "Can I call my mom?",
            answer: "Je peux appeler ma maman",
            distractors: ["est", "le", "faim"],
          },
          {
            type: "spelling",
            english: "I have a stomach ache.",
            answer: "J'ai mal au ventre",
          },
          {
            type: "listen",
            audio: "Je suis excitée !",
            options: ["Je suis excitée !", "Je suis fâchée !", "Je suis fatiguée !"],
            correct: 0,
            english: "I'm excited!",
          },
          {
            type: "read",
            french: "Ça va mieux, merci.",
            english: "I feel better, thanks.",
          },
        ],
      },
    ],
  },
  {
    id: "numbers",
    title: "Numbers & Colors",
    subtitle: "Count and name colors",
    icon: "numbers",
    color: "success",
    lessons: [
      {
        id: "numbers-1",
        title: "Les couleurs",
        exercises: [
          {
            type: "read",
            french: "Un, deux, trois !",
            english: "One, two, three!",
          },
          {
            type: "word-bank",
            english: "I have two brothers.",
            answer: "J'ai deux frères",
            distractors: ["ans", "sœur", "trois"],
          },
          {
            type: "listen",
            audio: "C'est bleu.",
            options: ["C'est bleu.", "C'est rouge.", "C'est vert."],
            correct: 0,
            english: "It's blue.",
          },
          {
            type: "choose",
            situation: "Someone asks the color of the sky.",
            question: "C'est quelle couleur ?",
            options: ["C'est bleu.", "C'est un chien.", "J'ai faim."],
            correct: 0,
            english: "It's blue.",
          },
          {
            type: "spelling",
            english: "I am ten years old.",
            answer: "J'ai dix ans",
          },
          {
            type: "word-bank",
            english: "The sky is blue.",
            answer: "Le ciel est bleu",
            distractors: ["rouge", "est", "chat"],
          },
          {
            type: "read",
            french: "Regarde, c'est rouge !",
            english: "Look, it's red!",
          },
        ],
      },
      {
        id: "numbers-2",
        title: "Compter",
        exercises: [
          {
            type: "read",
            french: "Quatre, cinq, six, sept !",
            english: "Four, five, six, seven!",
          },
          {
            type: "listen",
            audio: "J'ai dix ans.",
            options: ["J'ai dix ans.", "J'ai deux ans.", "J'ai six ans."],
            correct: 0,
            english: "I am ten years old.",
          },
          {
            type: "choose",
            situation: "A counselor asks how many friends you have.",
            question: "Tu as combien d'amies ?",
            options: ["J'ai trois amies.", "C'est bleu.", "Bonne nuit."],
            correct: 0,
            english: "I have three friends.",
          },
          {
            type: "word-bank",
            english: "My favorite color is green.",
            answer: "Ma couleur préférée est le vert",
            distractors: ["chien", "trois", "eau"],
          },
          {
            type: "listen",
            audio: "C'est jaune.",
            options: ["C'est jaune.", "C'est rouge.", "C'est noir."],
            correct: 0,
            english: "It's yellow.",
          },
          {
            type: "spelling",
            english: "There are eight girls.",
            answer: "Il y a huit filles",
          },
          {
            type: "read",
            french: "Huit, neuf, dix ! Bravo !",
            english: "Eight, nine, ten! Well done!",
          },
        ],
      },
    ],
  },
  {
    id: "nature",
    title: "Nature & Camping",
    subtitle: "Explore the woods and the campfire",
    icon: "tent",
    color: "lake",
    lessons: [
      {
        id: "nature-1",
        title: "Dans la forêt",
        exercises: [
          { type: "read", french: "Regarde, un papillon !", english: "Look, a butterfly!" },
          {
            type: "choose",
            situation: "A counselor points at a tall tree.",
            question: "Qu'est-ce que c'est ?",
            options: ["C'est un arbre.", "C'est délicieux.", "J'ai faim."],
            correct: 0,
            english: "It's a tree.",
          },
          {
            type: "listen",
            audio: "Fais attention aux insectes !",
            options: ["Fais attention aux insectes !", "Fais attention dans l'eau !", "Fais équipe !"],
            correct: 0,
            english: "Pay attention to the bugs!",
          },
          {
            type: "word-bank",
            english: "There is a bear in the woods.",
            answer: "Il y a un ours dans la forêt",
            distractors: ["chien", "est", "eau"],
          },
          {
            type: "spelling",
            english: "I love nature.",
            answer: "J'adore la nature",
          },
          {
            type: "word-bank",
            english: "The flowers are pretty.",
            answer: "Les fleurs sont jolies",
            distractors: ["bleu", "le", "chat"],
          },
          { type: "read", french: "On va se promener.", english: "We're going for a walk." },
        ],
      },
      {
        id: "nature-2",
        title: "Le feu de camp",
        exercises: [
          { type: "read", french: "On allume le feu !", english: "We're lighting the fire!" },
          {
            type: "listen",
            audio: "Je veux des guimauves.",
            options: ["Je veux des guimauves.", "Je veux dormir.", "Je veux de l'eau."],
            correct: 0,
            english: "I want marshmallows.",
          },
          {
            type: "choose",
            situation: "Someone asks what you are looking at in the sky.",
            options: ["Je regarde les étoiles.", "Je regarde le lac.", "Je regarde la télévision."],
            correct: 0,
            english: "I am looking at the stars.",
          },
          {
            type: "word-bank",
            english: "It is hot near the fire.",
            answer: "Il fait chaud près du feu",
            distractors: ["froid", "le", "soleil"],
          },
          {
            type: "spelling",
            english: "Sing with me.",
            answer: "Chante avec moi",
          },
          {
            type: "listen",
            audio: "C'est magique.",
            options: ["C'est magique.", "C'est rouge.", "C'est délicieux."],
            correct: 0,
            english: "It is magical.",
          },
          { type: "read", french: "Bonne nuit, la forêt.", english: "Goodnight, forest." },
        ],
      },
    ],
  },
  {
    id: "arts",
    title: "Arts & Activities",
    subtitle: "Sing, draw, and create",
    icon: "music",
    color: "accent",
    lessons: [
      {
        id: "arts-1",
        title: "La musique",
        exercises: [
          { type: "read", french: "J'adore chanter !", english: "I love to sing!" },
          {
            type: "choose",
            situation: "A friend offers you an instrument.",
            question: "Tu veux jouer de la guitare ?",
            options: ["Oui, j'aimerais bien.", "Je ne sais pas nager.", "C'est bleu."],
            correct: 0,
            english: "Yes, I would like to.",
          },
          {
            type: "word-bank",
            english: "We are making a show.",
            answer: "On fait un spectacle",
            distractors: ["feu", "le", "mange"],
          },
          {
            type: "listen",
            audio: "Écoute cette chanson.",
            options: ["Écoute cette chanson.", "Regarde ce papillon.", "Mange ce pain."],
            correct: 0,
            english: "Listen to this song.",
          },
          {
            type: "spelling",
            english: "You sing well.",
            answer: "Tu chantes bien",
          },
          {
            type: "word-bank",
            english: "Let's dance together.",
            answer: "Dansons ensemble",
            distractors: ["chante", "eau", "le"],
          },
          { type: "read", french: "Bravo pour le concert !", english: "Well done on the concert!" },
        ],
      },
      {
        id: "arts-2",
        title: "Les bricolages",
        exercises: [
          { type: "read", french: "C'est l'heure des bricolages.", english: "It's craft time." },
          {
            type: "listen",
            audio: "Passe-moi les ciseaux, s'il te plaît.",
            options: ["Passe-moi les ciseaux, s'il te plaît.", "Passe-moi le pain, s'il te plaît.", "Où est mon gilet ?"],
            correct: 0,
            english: "Pass me the scissors, please.",
          },
          {
            type: "choose",
            situation: "You show your painting to the counselor.",
            options: ["Regarde mon dessin !", "J'ai fini mon repas.", "Je suis malade."],
            correct: 0,
            english: "Look at my drawing!",
          },
          {
            type: "word-bank",
            english: "I am painting a tree.",
            answer: "Je peins un arbre",
            distractors: ["chien", "le", "bleu"],
          },
          {
            type: "listen",
            audio: "C'est très beau !",
            options: ["C'est très beau !", "C'est très froid !", "C'est mon tour !"],
            correct: 0,
            english: "It is very beautiful!",
          },
          {
            type: "spelling",
            english: "I need glue.",
            answer: "J'ai besoin de colle",
          },
          { type: "read", french: "On a fait du bon travail.", english: "We did a good job." },
        ],
      },
    ],
  },
  {
    id: "farewell",
    title: "Saying Goodbye",
    subtitle: "Pack your bags and keep in touch",
    icon: "bus",
    color: "sunny",
    lessons: [
      {
        id: "farewell-1",
        title: "Faire ses valises",
        exercises: [
          { type: "read", french: "C'est le dernier jour.", english: "It's the last day." },
          {
            type: "word-bank",
            english: "I am packing my suitcase.",
            answer: "Je fais ma valise",
            distractors: ["lit", "eau", "mange"],
          },
          {
            type: "listen",
            audio: "As-tu tout ton matériel ?",
            options: ["As-tu tout ton matériel ?", "As-tu bien dormi ?", "As-tu faim ?"],
            correct: 0,
            english: "Do you have all your stuff?",
          },
          {
            type: "choose",
            situation: "You can't find your left shoe.",
            options: ["J'ai perdu ma chaussure.", "J'ai perdu le match.", "J'ai dix ans."],
            correct: 0,
            english: "I lost my shoe.",
          },
          {
            type: "spelling",
            english: "Is the bus here?",
            answer: "Est-ce que le bus est là",
          },
          {
            type: "word-bank",
            english: "Don't forget your hat.",
            answer: "N'oublie pas ton chapeau",
            distractors: ["chien", "le", "est"],
          },
          { type: "read", french: "Tout est prêt !", english: "Everything is ready!" },
        ],
      },
      {
        id: "farewell-2",
        title: "À l'année prochaine!",
        exercises: [
          { type: "read", french: "C'est l'heure de se dire au revoir.", english: "It's time to say goodbye." },
          {
            type: "listen",
            audio: "Tu vas me manquer.",
            options: ["Tu vas me manquer.", "Tu sais nager.", "Tu es fatiguée."],
            correct: 0,
            english: "I will miss you.",
          },
          {
            type: "choose",
            situation: "You promise to stay in touch with your new friend.",
            options: ["On s'écrit bientôt !", "Je ne comprends pas.", "J'ai faim."],
            correct: 0,
            english: "We'll write to each other soon!",
          },
          {
            type: "word-bank",
            english: "I had a great week.",
            answer: "J'ai passé une super semaine",
            distractors: ["jour", "le", "mange"],
          },
          {
            type: "listen",
            audio: "À l'année prochaine !",
            options: ["À l'année prochaine !", "À table !", "À demain !"],
            correct: 0,
            english: "See you next year!",
          },
          {
            type: "spelling",
            english: "Thank you for everything.",
            answer: "Merci pour tout",
          },
          { type: "read", french: "Vive le Camp de la Baie !", english: "Long live Camp de la Baie!" },
        ],
      },
    ],
  },
]

export function getUnit(unitId: string): Unit | undefined {
  return CURRICULUM.find((u) => u.id === unitId)
}

export function getLesson(unitId: string, lessonId: string): Lesson | undefined {
  return getUnit(unitId)?.lessons.find((l) => l.id === lessonId)
}
