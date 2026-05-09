import type { AnswerOption, GuestConfig } from "../types";

const defaultAnswerOptions: AnswerOption[] = [
  {
    id: "attending",
    label: "Да, буду на свадьбе",
    requiresEmail: true,
  },
  {
    id: "attending-with-plus-one",
    label: "Да, буду с гостем +1",
    requiresEmail: true,
    requiresPlusOneName: true,
  },
  {
    id: "not-attending",
    label: "К сожалению, не смогу приехать",
  },
];

const familyAnswerOptions: AnswerOption[] = [
  {
    id: "family-attending",
    label: "Да, мы будем",
    requiresEmail: true,
    requiresGuestCount: true,
  },
  {
    id: "family-partial",
    label: "Сможет приехать часть семьи",
    requiresEmail: true,
    requiresGuestCount: true,
  },
  {
    id: "family-not-attending",
    label: "К сожалению, не сможем приехать",
  },
];

export const fallbackGuest: GuestConfig = {
  guestId: "guest-general",
  slug: "general",
  greeting: "Дорогие гости",
  displayName: "Дорогие гости",
  answerOptions: defaultAnswerOptions,
};

export const guests: GuestConfig[] = [
  {
    guestId: "guest-ivanovy",
    slug: "ivanovy-a8f3",
    greeting: "Уважаемые Ивановы",
    displayName: "семья Ивановых",
    answerOptions: familyAnswerOptions,
    additionalSections: [
      {
        title: "Для вашей семьи",
        body: "Мы заранее подберем комфортный трансфер и будем рады помочь с маршрутом из Нячанга в Далат.",
      },
    ],
  },
  {
    guestId: "guest-maria",
    slug: "maria-k2d9",
    greeting: "Уважаемая Мария",
    displayName: "Мария",
    answerOptions: defaultAnswerOptions,
  },
  {
    guestId: "guest-andrey",
    slug: "andrey-plus-one-b4c1",
    greeting: "Уважаемый Андрей",
    displayName: "Андрей",
    answerOptions: [
      {
        id: "andrey-attending",
        label: "Да, буду",
        requiresEmail: true,
      },
      {
        id: "andrey-plus-one",
        label: "Да, буду с гостем +1",
        requiresEmail: true,
        requiresPlusOneName: true,
      },
      {
        id: "andrey-not-attending",
        label: "К сожалению, не смогу приехать",
      },
    ],
  },
];
