# PRD - מאגר הדמויות של ריק ומורטי

## למי זה

לצופים בסדרה שרוצים לעבור על הדמויות, למצוא את כל הגרסאות של ריק, מורטי ושאר המשפחה, ולראות מי הופיע הכי מאוחר בסדרה.
יש בסדרה המון גרסאות של אותן דמויות (Pickle Rick, Evil Morty, שיבוטים...) והאפליקציה מסמנת אותן בתגיות.

מבנה הקוד: [docs/architecture.md](docs/architecture.md)

## עמודים

- `/` - רשימת הדמויות. חיפוש לפי שם, סינון לפי תגית, מיון לפי הופעה אחרונה, וכפתור "load more" שמביא עוד 20.
- `/characters/:id` - פרטי דמות: תמונה, סטטוס, מין, זן, כוכב מוצא, מיקום אחרון, מספר פרקים, הפרק האחרון שבו הופיעה, תגיות, וכפתור להוספה למועדפים.
- `/stats` - סטטיסטיקות על הדמויות שנטענו: כמה דמויות בכל תגית, כמה חיות / מתות / לא ידוע, ומי הופיעו בהכי הרבה פרקים. בכותרת כתוב על מה סופרים, למשל "Stats for 40 loaded characters · tag: Rick". כשתגית בחורה, סופרים רק את הדמויות שנטענו ויש להן את התגית הזאת, והחלק של ספירת התגיות מוסתר. אותו כלל לכל התגיות, גם ל-`other`.
- `/favorites` - הדמויות שסימנתי כמועדפות.

בכל עמוד יש תפריט ניווט עם `NavLink` לרשימה, לסטטיסטיקות ולמועדפים.

## When I…, I see…

- When I open the app, I see the first 20 characters, each with a name, an image, its tags and a clone badge if it's a clone.
- When I pick the "Rick" tag, I see only characters with "rick" in their name, and "load more" adds the next 20 Ricks.
- When I type in the search box, I see only the loaded characters whose name contains what I typed.
- When I click a character, I see its details at `/characters/<id>`, and pasting that address in a new tab shows the same character.
- When I add a character to favorites and reload the page, I still see it on the favorites page.

## למה ה-API הזה

[The Rick and Morty API](https://rickandmortyapi.com/documentation) - חינמי, בלי מפתח, ועובד מהדפדפן.
לכל דמות יש `id`, תמונה ושדות פשוטים, אז הטיפוסים בקוד כמעט זהים ל-JSON שמגיע. יש כתובת לדמות אחת (`/character/5`), חיפוש לפי שם (`?name=rick`), וגם כמה דמויות בבקשה אחת (`/character/1,2,3`), שזה מה שעמוד המועדפים צריך.
רשימת הפרקים של כל דמות נותנת מידע שאפשר לעשות איתו משהו אמיתי (מיון לפי הופעה אחרונה), ולא רק להציג אותו.

## תגיות

**תגית דמות** - אם השם מכיל rick, morty, summer, beth או jerry (בלי הבדל בין אותיות גדולות וקטנות), הדמות מקבלת את התגית. אפשר יותר מתגית אחת: `Morty Rick` מקבל גם rick וגם morty.
דמות בלי אף תגית מקבלת את התגית `other`, ועל המסך כתוב "Goofy one-offs".

**תג שיבוט (clone)** - הדמות מקבלת אותו אם ה-`type` שלה הוא בדיוק `Clone`, `Mytholog` או `Goddess`, או אם השם מכיל "clone".
- `Goddess` נמצא שם בגלל Goddess Beth: היא Mytholog של בת', אבל ב-API ה-type שלה הוא Goddess.
- "clone" בשם תופס שיבוטים כמו `Wasp Rick’s Clone`, שה-type שלהם הוא החיה (Wasp) ולא Clone.
- Decoy, Soulless Puppet, Memory וכו' לא מקבלים את התג.

**מגבלה ידועה** - יש שמות שמכילים תגית אבל הם לא באמת הדמות הזאת, למשל `Jerryboree Keeper`, `Morty’s Lawyer`, `Rick's Garage`. החלטתי לא לתקן את זה עם רשימה ידנית של id-ים. זה מתועד בבדיקה.

## מאיפה מגיע המידע

- בחירת תגית שולחת `?name=<tag>` ל-API ומחליפה את מה שנטען. "load more" מביא את העמוד הבא של אותה תגית.
- `other` מסנן מקומית את מה שכבר נטען, כי אי אפשר לבקש מה-API "שם שלא מכיל".
- החיפוש מסנן מקומית את מה שנטען.
- מיון לפי הופעה אחרונה = לפי מספר הפרק הכי גבוה ברשימת הפרקים של הדמות. עובד על מה שנטען.
- הסטטיסטיקות מחושבות על הדמויות שנטענו ברשימה, ואם בחורה תגית - רק על אלה שיש להן אותה.
- המועדפים נשמרים ב-`localStorage` (רק ה-id-ים), ועמוד המועדפים מביא אותם מה-API בבקשה אחת.
