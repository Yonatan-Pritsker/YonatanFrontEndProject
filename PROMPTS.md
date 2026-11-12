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

**17:27 · claude**

> dont do anything, just adding this to be saved in prompts:
> read the PRD and architecture, decided stats hide tag counts when a tag is on, and search stays local

**17:30 · claude**

> <ide_opened_file>The user opened the file c:\Users\User\LocalClaudeProjects\LocalOnoCourses\OnoFrontEnd\final-project\PRD.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> Now write tasks.md. max 12 tasks in build order, following section 7 of the brief, so task 1 is the list from a local json file with no api. each task gets a "Done when:" line i can check by looking at the screen or running a command. install packages only in the task that needs them (react router in the routing task, vitest in the tests task)
> 
> Once the result comes back, check that Vitest isn't in the last task and that every "Done when" line is actually checkable.

**17:38 · claude**

> remove the search 404 note from architecture.md, but the details page can still get a 404 for an id that doesnt exist. add to task 3s done when that /characters/999 still shows "not found" after switching to the api, not an error
> 
> After it updates the files, commit with step 0.3 - tasks and push. Next comes task 1.

**17:50 · claude**

> where to check in the inspect

**17:52 · claude**

> console show nothing

**17:59 · claude**

> by the way i told chat this:
> "looks good, but characters should be row not colom"
> here is their reply:
> "
> 
> <pasted_content id="b0c2">
> Task 1's "Done when" is met: the cards show a name and an image. The layout belongs to **task 11 (styling)**, where `tasks.md` already says "a grid of cards, several per row on a wide screen." Right now there's no CSS at all, which is why they stack.
> 
> **For you:**
> 1. Check in F12 → Console that there are no red errors.
> 2. Add your line to `PROMPTS.md`, for example: *"checked 6 cards show, cards are in a column, layout comes in task 11"*.
> 3. Commit:
>    ```
>    git add -A
>    git commit -m "task 1 - list from local JSON"
>    git push
>    ```
> 
> If the column bothers you during the work, a few lines of CSS now are legitimate as a separate commit (`task 1.1 - cards in a row`). In that case, this is the text for the agent:
> 
> ---
> the cards show in a column, i want them in a row that wraps to the next line. just minimal css for now, the real styling is task 11
> ---
> </pasted_content id="b0c2">
> 
> "

**17:59 · claude**

> ok so now im doing a push commit

**18:07 · claude**

> ok, just realized i mixed up claude chats, so ill recap: 
> i checked the page, looks good, 6 characters with pictures, no errors in the console. they're in a column for now. im going to commit and push from the terminal now, dont do anything yet.
