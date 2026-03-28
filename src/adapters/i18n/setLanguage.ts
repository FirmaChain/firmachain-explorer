import i18n from "@/i18n";

const setLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
};

export default setLanguage;
