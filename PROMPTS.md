# יומן פרומפטים

## 2026-11-11

**10:36 · claude**

> hello world

**11:25 · claude**

> id like to hook this chat to the repo

**11:25 · claude**

> testing the prompt log from Claude Code

**11:27 · claude**

> <ide_opened_file>The user opened the file c:\Users\User\LocalClaudeProjects\LocalOnoCourses\OnoFrontEnd\final-project\AGENTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> can you delete the non claude agent folders

**11:30 · claude**

> update them unless its said that its not allowed to delete them

**11:32 · claude**

> they are now deleted

## 2026-11-12

**14:47 · claude**

> ok, before we start, read the brief in @../final_assignment and remind me the steps i should follow, from where i am now. i already set up the repo from the template, tested the prompt log, and created the vite react-ts project

**14:51 · claude**

> The deadline got extended to next friday 20/11, so we have more time. 
> About the api, the lecturer said in the defense he'll ask a lot about the code, so i want something thats easy to explain. 
> Can you rank the apis in the brief from easiest to hardest to explain and say why?

**14:56 · claude**

> I actually liked the magic one too, but you put it at 7. 
> How come its that hard compared to Rick and Morty?

**15:00 · claude**

> I think ill stay with rick and morty, its easier to explain. 
> But you said theres not much logic to test there, what about tagging characters by name (all the ricks get a rick tag), or sorting by who was last seen from the episode list? would that count as real logic

**15:31 · claude**

> Before the PRD, can you check the api for all the names that contain rick, morty, summer, beth or jerry and list the edge cases? like names that match but arent really that character, real ones that might not match, and names that match two tags. 
> Just list them for now, dont decide anything.

**16:22 · claude**

> <pasted_content id="b0c2">
> these are real ricks: Reverse Rick Outrage, The Scientist Formerly Known as Rick, Rick Guilt Rick, Maximums Rickimus, Ricktiminus Sancheziminius. 
> Morty Mart Manager Morty is a morty. 
> Ideal Jerry, Jerry's Mytholog, Self-Congratulatory Jerry, Goddess Beth, Beth's Mytholog are clones/mythologs of jerry and beth.
> So the possessive idea doesnt work. 
> my idea: family tag from the name (contains, ignore case), plus a second "clone" badge if the api type field says Clone or Mytholog. i also thought about a rick-137 tag for bodies he possessed but the api doesnt have that info. 
> what do you think, and whats left from the edge cases?
> </pasted_content id="b0c2">

**16:35 · claude**

> before the PRD: who else has type Goddess, and who has species Mythological Creature? i want Goddess Beth to get the clone badge if applicable

**16:42 · claude**

> <ide_opened_file>The user opened the file c:\Users\User\LocalClaudeProjects\LocalOnoCourses\OnoFrontEnd\final-project\PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> 
> 
> <pasted_content id="b0c2">
> ok decisions: "character tag" = name contains rick/morty/summer/beth/jerry, ignore case, can have more than one (Morty Rick gets both). characters with no tag get an "other" tag (label on screen: "Goofy one-offs"). clone badge = type is exactly Clone, Mytholog or Goddess, or the name contains "clone". everything else (Decoy, Puppet, Memory...) doesnt get the badge. the false positives like Jerryboree stay as a known limitation, documented in a test, no id lists.
> picking a tag filter fetches ?name=<tag> from the api, with a "load more" button for the next 20. the "other" filter works locally on whatever is loaded, since the api cant search for "doesnt contain". sorting by last seen works on whatever is loaded.
> now write PRD.md: who its for, pages and urls, 3-5 "When I..., I see..." lines, a short "why this api" section and the tag rules above. pages: list (search + tag filter + sort by last seen), details at /characters/:id, stats (tag counts, status, episode counts), favorites. also docs/architecture.md with the src layout (api, components, pages, types, utils), linked from the PRD. no tasks.md and no code yet
> </pasted_content id="b0c2">

**17:07 · claude**

> <ide_opened_file>The user opened the file c:\Users\User\LocalClaudeProjects\LocalOnoCourses\OnoFrontEnd\final-project\PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> if i pick the rick tag and then go to stats, the tag counts will be all rick. is that ok or should stats work differently

**17:09 · claude**

> i changed my mind about search, local is simpler to explain, keep it like the PRD says

**17:09 · claude**

> option 2, and use the title from option 1 too

**17:10 · claude**

> first one, same rule for every tag
