# מבנה הקוד

תוכנית התחלתית, היא תשתנה תוך כדי עבודה. חזרה ל-[PRD.md](../PRD.md).

## תיקיות

```
src/
  api/          כל ה-fetch-ים ל-API
  components/   רכיבים קטנים שחוזרים בכמה עמודים
  pages/        עמוד אחד לכל כתובת
  types/        טיפוסים למידע מה-API
  utils/        לוגיקה בלי React (תגיות, מיון, סינון, סטטיסטיקות) + הבדיקות שלה
  App.tsx       הניתוב וה-state המשותף
  main.tsx
```

### api/
- `fetchCharacters(page, name?)` - עמוד של 20 דמויות, אפשר עם שם. מחזיר את `results` ואת `info.next`.
- `fetchCharacter(id)` - דמות אחת, לעמוד הפרטים.
- `fetchCharactersByIds(ids)` - כמה דמויות בבקשה אחת, לעמוד המועדפים.

שני דברים לשים לב אליהם ב-API:
- `/character/5` מחזיר אובייקט, אבל `/character/1,2,3` מחזיר מערך. עם id אחד צריך לעטוף במערך.
- id שלא קיים (`/character/999`) מחזיר 404 עם `{"error": "Character not found"}`. בעמוד הפרטים זה צריך להיות "לא נמצא" ולא הודעת שגיאה. id שהוא לא מספר (`/character/abc`) מחזיר 500, אז עמוד הפרטים בודק את זה לפני ה-fetch ומציג "לא נמצא" בלי לפנות ל-API.

### types/
- `Character` - רק השדות שמשתמשים בהם: `id`, `name`, `status`, `species`, `type`, `gender`, `origin`, `location`, `image`, `episode`.
- `CharactersPage` - מה שמגיע מ-`/character`: `info` (count, pages, next, prev) ו-`results`.
- `Tag` - `'rick' | 'morty' | 'summer' | 'beth' | 'jerry' | 'other'`.

### utils/
- `tags.ts` - `getTags(name)` ו-`isClone(character)`, לפי הכללים ב-PRD.
- `episodes.ts` - מספר פרק מתוך URL, הפרק האחרון של דמות, מיון לפי הופעה אחרונה.
- `filters.ts` - חיפוש לפי שם, סינון `other`.
- `stats.ts` - ספירה לפי תגית, לפי סטטוס, והדמויות עם הכי הרבה פרקים.
- `favorites.ts` - קריאה וכתיבה של id-ים ל-`localStorage`.

לכל קובץ יש `*.test.ts` לידו.

### components/
בערך: `NavBar`, `CharacterCard`, `CharacterList`, `TagFilter`, `SearchBox`, `TagBadges`, `CloneBadge`, `LoadMoreButton`, `StatusMessage` (טוען / שגיאה).

### pages/
`CharacterListPage`, `CharacterDetailsPage`, `StatsPage`, `FavoritesPage`.

## איפה ה-state

**ב-`App`** (כי יותר מעמוד אחד צריך אותו):
- הדמויות שנטענו, התגית שנבחרה, מספר העמוד, והאם יש עוד עמוד (`hasMore`, לפי `info.next`) - הרשימה מציגה אותן והסטטיסטיקות סופרות אותן. `StatsPage` מקבל גם את התגית: כשתגית בחורה הוא סופר רק את הדמויות שיש להן אותה (אותו סינון כמו ברשימה, מ-`filters.ts`), מציג אותה בכותרת, ומסתיר את ספירת התגיות.
- ה-id-ים של המועדפים - עמוד הפרטים משנה אותם ועמוד המועדפים קורא אותם. כל שינוי נשמר ל-`localStorage`.

עוברים לעמודים ב-props.

**בתוך העמוד:**
- `CharacterListPage` - טקסט החיפוש והמיון. הם משפיעים רק על מה שמוצג, לא על מה שנטען.
- `CharacterDetailsPage` - הדמות עצמה. העמוד קורא את ה-id עם `useParams` ומביא את הדמות בעצמו, ככה הכתובת עובדת גם כשפותחים אותה ישר.
- `FavoritesPage` - הדמויות המועדפות שהגיעו מה-API.

כל עמוד שמביא מידע מחזיק גם מצב טעינה ושגיאה משלו.

## זרימה: מלחיצה על תגית ועד שהרשימה מתעדכנת

1. `TagFilter` קורא ל-`onTagChange` שקיבל ב-props.
2. `App` (ב-`handleTagChange`) שומר את התגית, מחזיר את העמוד ל-1 ומנקה את הדמויות. הניקוי קורה כאן ולא בתוך ה-effect.
3. ה-`useEffect` תלוי ב-`[selectedTag, page]`, אז הוא רץ וקורא ל-`fetchCharacters(page, tag)` (ל-`other` או בלי תגית - בלי שם, ואז מסננים מקומית).
4. כשהתשובה מגיעה: עמוד 1 מחליף את הרשימה, עמוד אחר מתווסף לסוף. `hasMore` נקבע לפי `info.next`.
5. `CharacterListPage` מקבל את הדמויות החדשות, מסנן לפי התגית והחיפוש, ממיין, ומעביר ל-`CharacterList`.
6. `CharacterList` עושה `map` ל-`CharacterCard` עם `key={character.id}` (לא השם, יש כמה "Rick Sanchez" שונים).
