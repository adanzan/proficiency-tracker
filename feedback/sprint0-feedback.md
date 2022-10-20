# Sprint 0 Feedback

## Setup checklist

[X] Repository is created  
[X] All members of the team have accepted the project  
[X] `package.json` is updated  
[X] `npm test` and `npm run lint` run cleanly  
[X] Github CI is running  
[-] Skeleton is posted to Firebase  
[-] Readme has status badge, goal of the project and link to deployed version  
[X] At least one PR has been created and merged  
[X] a commit has been tagged `sprint0`

Comments:
I can't tell if the project skeleton is properly deployed because you didn't put a link to the running instance in the README -- you put a link to the project console, which I can't access.

## Design checklist

[X] The Product backlog is populated with epic user stories  
[X] There are some lo-fi storyboards with the initial design thoughts  
[X] There are some CRC cards for the main "nouns" in the project

This user story has a good sentiment, but it is more of a mission statement than a user story -- there is no way to test this.
"As a professor, I want this website to address the flexibility of ungrading, so that students don’t get too bogged down with grades and can focus on learning unlike other websites such as Canvas that force grades. #5"

This could use a little more details:
"As a professor, I want my students to have the ability to reflect on their work, so that they can assess their own areas of improvement. #9" In one sense, it is untestable. We have no way to know if a student actually reflects (even if they write a "reflection"). Maybe it would be better think more about what action of the user working with the system you want to support (writing short statements about process and confidence at the end of each assessment? regular diary style writing? a "reflection" form they have to fill out?)

I see a user story for the professor being able to read the reflections. Can the student revisit them (for reflection)

There is some redundancy in your user stories that you will probably want to work on. I think there is value in having different ways to talk about the same feature to flesh it out, but you probably want to coalesce them into a single card so you don't implement it twice.

I'm not sure what you mean by this one: "As a professor, I want to be able to grade on the platform, so that I can have all assessment information in one place. #14". Does this mean that there are assessments that are not autograded that the professor can mark up in place? Or does it mean that other exercises (practicals, projects) can also be assessed inside of this platform?

The storyboard looks like a reasonable start.

For the CRC cards, I think you integrated the _actual_ professor and student into the mix instead of their digital footprint in the system. The system level professor, for example, wil not know the students and their proficiency levels. Think in terms of responsibilities inside of the system. A professor in the system probably only knows its own name and login details. Think some more about these. The purpose is to get you thinking intentionally from the beginning about what kind of information you are storing and how.
