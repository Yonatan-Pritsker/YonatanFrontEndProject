# משימות

לפי הסדר. הפרטים ב-[PRD.md](PRD.md) וב-[docs/architecture.md](docs/architecture.md).

אחרי כל משימה: `npm run build` עובר, בודקים בדפדפן (ומשימה 5 והלאה גם `npm test`), commit יחד עם `PROMPTS.md`, ושורה שלי ביומן על מה בדקתי.

## 1. רשימה מקובץ JSON מקומי

מחליפים את דף הדוגמה של Vite. טיפוס `Character` ב-`src/types/`, קובץ `src/data/sample-characters.json` עם 6 הדמויות הראשונות מה-API (רק לשלב הזה), ורכיבים `CharacterCard` ו-`CharacterList` (`map` עם `key={character.id}`).

Done when: `npm run dev` מציג 6 כרטיסים עם שם ותמונה, אין שגיאות בקונסול, ו-`npm run build` עובר.

## 2. ניתוב

מתקינים `react-router-dom`. `/` רשימה, `/characters/:id` פרטים (ה-id מ-`useParams`, הדמות מהקובץ המקומי), `/stats` ו-`/favorites` בינתיים רק עם כותרת. `NavBar` עם `NavLink`.

Done when: לחיצה על כרטיס פותחת `/characters/<id>` עם הדמות הזאת; הדבקת `/characters/2` בשורת הכתובת מציגה את Morty Smith; `/characters/999` מציג "לא נמצא"; הקישורים בתפריט מחליפים עמוד, והקישור של העמוד הנוכחי מסומן.

## 3. מידע אמיתי מה-API

`src/api/` עם `fetchCharacters` ו-`fetchCharacter`. ה-fetch בתוך `useEffect`, הדמויות ב-state של `App`, ועמוד הפרטים מביא את הדמות שלו לפי ה-id. `StatusMessage` לטעינה ולשגיאה. מוחקים את קובץ ה-JSON.

Done when: הרשימה מציגה 20 דמויות מה-API; ב-DevTools ‏(Network) עם "3G" רואים הודעת טעינה לפני הרשימה; עם "Offline" ורענון רואים הודעת שגיאה ולא מסך ריק; `/characters/500` נפתח ישר מהכתובת; `/characters/999` עדיין מציג "לא נמצא" ולא הודעת שגיאה; `src/data/` לא קיים יותר.

## 4. תגיות ותג שיבוט

`utils/tags.ts` עם `getTags(name)` ו-`isClone(character)` לפי הכללים ב-PRD. `TagBadges` ו-`CloneBadge` על הכרטיס ובעמוד הפרטים.

Done when: ברשימה Rick Sanchez מראה rick ו-Abadango Cluster Princess מראה "Goofy one-offs"; `/characters/231` (Morty Rick) מראה שתי תגיות; `/characters/148` (Goddess Beth) ו-`/characters/517` (Wasp Rick’s Clone) מראים תג clone; `/characters/687` (Scarecrow Rick) בלי תג clone.

## 5. בדיקות עם Vitest

מתקינים `vitest` ו-`@vitest/ui`, מוסיפים סקריפטים `test` ו-`test:ui`. בדיקות ל-`tags.ts`: Morty Rick מקבל שתי תגיות, Big Fat rick מקבל rick, Ricktiminus Sancheziminius מקבל rick, שם בלי אף תגית מקבל other, Clone / Mytholog / Goddess ו-"clone" בשם מקבלים תג, Decoy לא, ו-Jerryboree Keeper מקבל jerry (המגבלה הידועה).

Done when: `npm test` מראה לפחות 5 בדיקות עוברות; `npm run test:ui` פותח את הדפדפן וכל הבדיקות ירוקות.

## 6. סינון לפי תגית ו-load more

`TagFilter`. בחירת תגית: `App` מביא `?name=<tag>` ומחליף את הרשימה. `LoadMoreButton` מביא את העמוד הבא לפי `info.next`. `other` מביא בלי שם ומסנן מקומית (ב-`filters.ts`, עם בדיקה).

Done when: בחירת Rick מציגה 20 כרטיסים ולכולם תגית rick; "load more" מעלה ל-40; אחרי 5 לחיצות יש 107 כרטיסים והכפתור נעלם; ב-other אף כרטיס לא מראה תגית של המשפחה; `npm test` עובר.

## 7. חיפוש

`SearchBox`, סינון מקומי לפי שם (בלי הבדל אותיות) על מה שנטען. הטקסט ב-state של `CharacterListPage`. בדיקות לסינון ב-`filters.ts`.

Done when: בלי תגית, הקלדת "smith" משאירה רק את Morty, Summer, Beth ו-Jerry Smith; "zzz" מציג "אין תוצאות"; מחיקת הטקסט מחזירה את כל הרשימה; `npm test` עובר.

## 8. מיון לפי הופעה אחרונה

`utils/episodes.ts`: מספר פרק מתוך URL, הפרק האחרון של דמות, ומיון. בחירת מיון ברשימה, ו"פרק אחרון" בעמוד הפרטים. מחליטים כאן מה הסדר כשיש תיקו, ובודקים אותו.

Done when: אחרי מיון בעמוד הראשון, חמשת הכרטיסים הראשונים הם Rick, Morty, Summer, Beth ו-Jerry (כולם עד פרק 51, בסדר של כלל התיקו); בפרטים של Rick Sanchez כתוב פרק אחרון 51; `npm test` עובר עם בדיקות לחילוץ מה-URL, לתיקו ולמיון.

## 9. עמוד סטטיסטיקות

`utils/stats.ts`: ספירה לפי תגית, לפי סטטוס, והדמויות עם הכי הרבה פרקים. `StatsPage` מקבל את הדמויות והתגית מ-`App`, עם הכותרת והכלל מה-PRD.

Done when: בלי תגית, `/stats` כותב "Stats for 20 loaded characters" ומציג ספירת תגיות; אחרי "load more" ברשימה כתוב 40; בחירת Rick ומעבר ל-`/stats` כותב "tag: Rick" ובלי ספירת תגיות; `npm test` עובר עם בדיקות ל-`stats.ts`.

## 10. מועדפים

`utils/favorites.ts`: הוספה/הסרה של id (עם בדיקה), וקריאה וכתיבה ל-`localStorage`. ה-id-ים ב-state של `App`, כפתור בעמוד הפרטים, ו-`FavoritesPage` שמביא אותם עם `fetchCharactersByIds` (עם id אחד ה-API מחזיר אובייקט ולא מערך).

Done when: הוספת 2 דמויות ורענון הדף - שתיהן ב-`/favorites`; הסרת אחת - השנייה עדיין מוצגת; בלי מועדפים כתוב שאין עדיין; `npm test` עובר.

## 11. עיצוב

CSS שלי, בלי שאריות מהעיצוב של Vite. רשת כרטיסים, צבע לכל תגית.

Done when: ב-DevTools במצב מובייל ברוחב 375px אין גלילה לרוחב, הכרטיסים בעמודה אחת וכל הקישורים בתפריט נראים בלי לגלול הצידה; במסך מלא יש כמה כרטיסים בשורה.

## 12. README ובדיקה אחרונה

`README.md`: מה האפליקציה עושה, איך מריצים (`npm install`, `npm run dev`), איך מריצים בדיקות (`npm test`, `npm run test:ui`), ובאיזה API.

Done when: `npm run build`, `npm test` ו-`npm run lint` עוברים בלי שגיאות (lint נכשל גם על `any`); אין שגיאות בקונסול באף עמוד; הקישור ל-repo נפתח בחלון גלישה בסתר.
