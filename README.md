# מאגר הדמויות של ריק ומורטי

אפליקציה לעבור על הדמויות של ריק ומורטי. יש בסדרה המון גרסאות של אותן דמויות, אז כל דמות מקבלת תגית לפי השם (Rick, Morty, Summer, Beth, Jerry, או "Goofy one-offs" לכל השאר), ושיבוטים מקבלים תג Clone.

- **רשימה** (`/`) - סינון לפי תגית, חיפוש לפי שם, מיון לפי הפרק האחרון שבו הדמות הופיעה, ו-"Load more" לעוד 20.
- **פרטי דמות** (`/characters/:id`) - תמונה, סטטוס, זן, כוכב מוצא, מספר פרקים, פרק אחרון, והוספה למועדפים.
- **סטטיסטיקות** (`/stats`) - ספירה לפי תגית ולפי סטטוס, ומי הופיעו בהכי הרבה פרקים, על כל 826 הדמויות. נטען בקבוצות של 5 עמודים (בערך 20 שניות) ונשמר ב-`sessionStorage` עד שסוגרים את הלשונית.
- **מועדפים** (`/favorites`) - נשמרים ב-`localStorage`, נשארים גם אחרי רענון.

## הרצה

צריך Node.js.

```bash
npm install
npm run dev
```

ואז לפתוח את הכתובת שמופיעה בטרמינל (בדרך כלל http://localhost:5173).

## בדיקות

הבדיקות הן Vitest, על הלוגיקה שב-`src/utils/` (תגיות, סינון, מיון, סטטיסטיקות, מועדפים, חלוקה לקבוצות, השמירה ב-`sessionStorage`) ועל לולאת הטעינה ב-`src/api/allCharacters.ts`, עם API מזויף.

```bash
npm test          # מריץ פעם אחת
npm run test:ui   # פותח את Vitest UI בדפדפן
```

## API

[The Rick and Morty API](https://rickandmortyapi.com/documentation) - חינמי, בלי מפתח. משתמשים ב:
- `/character?page=&name=` - הרשימה והסינון לפי תגית
- `/character/:id` - עמוד הפרטים
- `/character/1,2,3` - עמוד המועדפים, בבקשה אחת

## מסמכים

- [PRD.md](PRD.md) - מה בונים ולמה, וכללי התגיות
- [tasks.md](tasks.md) - המשימות לפי הסדר
- [docs/architecture.md](docs/architecture.md) - מבנה הקוד ואיפה ה-state
- [PROMPTS.md](PROMPTS.md) - יומן הפרומפטים, נכתב אוטומטית על ידי hook (`.claude/settings.json` + `scripts/log-prompt.mjs`)
