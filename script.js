// Тексты для разных языков
const translations = {
  ru: {
    open: "ОТКРЫТЬ"
  },
  en: {
    open: "OPEN"
  }
};

// Функция смены языка
function setLanguage(lang) {
  document.querySelectorAll("[data-text='open']").forEach(btn => {
    btn.textContent = translations[lang].open;
  });
}

// Навешиваем обработчики на флаги
document.querySelectorAll(".flag").forEach(flag => {
  flag.addEventListener("click", () => {
    const lang = flag.getAttribute("data-lang");
    setLanguage(lang);
  });
});

// Устанавливаем язык по умолчанию (русский)
setLanguage("ru");
