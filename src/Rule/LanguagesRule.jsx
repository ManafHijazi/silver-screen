import languages from '../assets/json/languages.json';

export function LanguagesRule(item) {
    if (!item.data.specialKey) return;

    if (item.data.specialKey !== 'language') return;

    if (item.data.enum.length === 0) {
 for (const key in languages)
        item.data.enum.push(languages[key].name);
     }
}
