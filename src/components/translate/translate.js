import axios from 'axios';

const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: 'en', // اللغة المصدر
      target: targetLang, // اللغة المستهدفة
      format: 'text',
    });

    return response.data.translatedText; // النص المترجم
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // ترجع النص الأصلي إذا حصل خطأ
  }
};

export default translateText;
