# Sprint 2 feedback

( ) tagged commit on main for sprint2
( ) set of closed user stories
( ) working deployment on Firebase
(X) GitHub reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

No commit tagged sprint 2

You seem to have gone backwards with respect to having a deployment on Firebase. You had _something_ for sprint 1, but now the link goes to the default "Firebase Hosting Setup Complete" screen.

I have reflections from
Danzan

Missing
Blair
Evey
Julia
Kent
Nellie
Smith

## Discussion

### User stories

Your user stories are reasonable, though I would like to see them better incorporated into your process. They seem to exist next to your backlog rather than within it. I am okay with you separating user stories from tasks, but I would like to see some sense of how you know a user story has been accomplished and a link formed between tasks and the user stories. The goal of using user stories is to make sure that every thing you add is justified, and if you get in the habit of just dumping in tasks you will start building out features that don't have any justification behind them.

### Agility/scrum

I am seeing fairly bursty work rather than constant progress across the sprint. I am also seeing a heavy concentration of work being done by Danzan and Smith.

This is virtually the same thing I said last time. I would like to see more from the rest of the group here. Remember to use the [co-authored-by](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) text to your commit messages if you are working together.

### Integration

The PRs look good with some real feedback in them.

### Implementation

`ProfessorView` - I got a proptype violation visiting this component. Also, if you are just going to a different page, use a [link](https://nextjs.org/docs/api-reference/next/link) instead of getting the router involved. I would also ask if you really need this to be a component. Given what is in it, it could just be part of the page.

`ComponentShape` - You do not necessarily need to duplicate the `ArticleShape` approach I used in the assignments. I created the PropType definition because articles appear in multiple locations so it made sense to just set the shape once. i would start by just putting the definition where you need it. If you find you need it in another place, _then_ you can refactor and pull it out to its own file.

`[[...id]]` - You are using these all over the place and I'm not convinced that this is necessary. This creates a catchall route, so, for example, if you had `page/[[..id]].js` you would catch `page` as well as `page/42`. I'm not seeing any evidence of you using the `id` anywhere. I would contemplate not using dynamic routes at all if you don't need to -- they make the page logic more complex.

Testing?

### Functionality

The quiz looks better than it did after sprint 1 and I am glad to see more page structure, but I am still concerned about your progress. In the sprint planning meeting we talked a lot about how quizzes would be deployed and the overall philosophy. Looking at this more I'm not even sure you will get to a point in the project where that is relevant.

I want you to reach a point where you have a finished product in two weeks, even if it isn't quite what you hoped. To that end, I might suggest scaling back a simple quiz tool -- the professor can set up quizzes, students can take them, and professors can see their scores. Given your current state I really worry that even trying to incorporate learning goals on top of the quiz questions will make more work than you have the capacity to accomplish. Remember that you still need to get the database and authentication incorporated in there.
