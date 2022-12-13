# Final feedback

( ) tagged commit on main for sprint3
(-) set of closed user stories
(X) working deployment on Firebase
(X) GitHub reports build passing
( ) team members have completed reflection
( ) presentation
(-) demo
(X) report
( ) README has full deployment instructions

## Checklist notes

No sprint 3 tag (that is 0 for 3 now...)

I see things in the Done column. Few of them are user stories and it isn't clear how old they are so I'm not sure what was accomplished during this sprint.

As was obvious on Sunday, your team missed a big chunk of what the presentation was supposed to cover. We got some of it out of you, but it was clear that you hadn't prepared much even for the demo portion of the presentation. it was particularly unfortunate that we had to see a localhost based demo and that we really saw two disconnected sites during the demo.

The README has no instructions for deployment and configuration.

## Discussion

### User stories

As I said above, it is difficult to tell what is new in the backlog. However the items near the top of the stack don't look like user stories. Some, like #90 ("After a student submits quiz and their results have been deduced, results and score should be pushed to DB") could be turned into a user story fairly easily. Others, like #111 ("Selecting learningGoals page") aren't even a task item.

It almost seems like you got farther away from writing user stories as you went. As I have said in class, some todo items are okay, but they should have clear acceptance tests and be linked to a user story.

I see some labeling as to priority and difficulty, but I'm not sure how much they were helpful.

### Agility/scrum

Your progress this sprint seems to mirror earlier ones, with minimal activity for the first week of the sprint and then a big burst at the end. Like many groups most of the activity seems to be from half of the group.

### Integration

I continue to see some good activity in the PRs with some real back and forth. That said I am disturbed by how many of the recent PRs made it into the build with failing tests. I suspect this is because your tests weren't working, but this isn't a great practice to get into.

### Implementation

Unlike most of the groups, you made a real crack at writing some non-trivial tests. It looks like it was a little too little too late as the non-trivial tests are all turned off to all for a passing build...

I was glad to see you try to make use of MUI. It seems like it was not a complete experiment however since the buttons don't seem very reliable. Making a Layout that all of the pages could share would have helped out as well.

You have a good collection of components, but I see a lot of technical debt building up in there (test values hard coded in the code and big blocks of commented out code are definite code smells). Another bit of smell is the large number of state variables in \_app. I'm not sure I believe they need to all be at the top of the render tree.

### Functionality

I think it is fair to say that the functionality is not where you hoped it would be. There are certainly pieces that work. You have authentication incorporated. You have your quiz loading and answers evaluated.

Some things work less well. The separation between professor and student doesn't seem to be supported by the DB configuration so I can get different behavior logging in depending on whether I select Instructor or not. The Professor view as deployed seems to just give me access to a blank quiz. Students can take specify some learning goals and take a quiz. The results are calculated, but then the navigation runs out.

There are more issues, but I am sure you are familiar with them. It feels like the site just hasn't gelled and we are seeing it in an in between state, which is probably not far from the truth.

## Final thoughts

I know that the end result was not what you hoped. It seems like there were a lot of factors behind that. I'm a little surprised since your group tended to be thoughtful during your planning processes. However some of the seed were obvious at the end of the sprint 3 planning session when it seemed that there was not a shared vision for what the ultimate goal was. I'm not sure what the dynamics were there but I think spending a little more time reaching an agreed upon vision of what the site did (rather than how it might be used) might have allowed you to work as a more coherent unit.

I will admit that I was a little shocked during the demo when I realized that Evey's problem was that you had not shifted to the alternate way switching to using emulators I offered up when it became obvious that there was an issue with the syntax I used for Windows machines. It was a 30 second fix that I would have happily helped you with (and you all had an example of the alternate form in later practicals and at least some of your assignment 4 submissions).

It is not uncommon for 312 projects not to come together in the end. It is a lot of new things all at once. When a lot of the team isn't ready for the start of the project that makes it even harder. The really important thing to focus on is what you are going to take away from the experience. What did you learn about the process and about yourselves? How will you avoid being in a similar situation again? if you come away from this experience knowing more and having more of an appreciation of the process of software development then that makes this a positive experience.
