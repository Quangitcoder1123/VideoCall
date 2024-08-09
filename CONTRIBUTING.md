# Contribution Guidelines
We are very excited to receive active contribution for this project. However,
for the sake of smooth development there are some rules and guidelines to be
followed. Contributions can be of two kinds features and bug fixes.

Before attempting to add features or fixing bugs, please ensure that issues
with the respective labels have been added. Features or bug fixes without
issues will definitely not be merged with the main branch.

## Forking Workflow
![Fork Workflow](images/fork-flow.png)

A forking workflow has been implemented. Except the core dev team, writing to
the main repo has been blocked.

1. Create a fork to the main repo and add the upstream github url to the
list of remote urls.
```
git remote add <link-to-upstream>
```
2. Branch out to a ```feat/<[Issue ID]-feature-name>``` or ```fix/[Issue ID]-fix-name```
branch. Example:
```
git checkout -b feat/#824-important-feature
```

3. Ensure that you are up to date with the main repo.
```
git checkout main
git fetch upstream
git merge upstream/main
```

If you are confident with rebasing:
```
git rebase main
```

4. Create a pull request with the naming format ```[WIP/RDY] #[Issue ID] - [Small description]```.
If the pull request is not ready for merge, prepend the pull request name with WIP else 
add RDY. Please focus on releasing PRs early to prevent others from creating duplicate
PRs.

5. PRs should merge your feature or fix branch with the main branch.
```
feat/* -> main
```

6. Please run lints and tests before making a PR. It is very annoying for us to
review failed PRs. Questions as to why lints are failing will not be answered.
```
TBC
```

## Feature
Feature branches focus on feature requests. Please note that feature
requests should be made in the form of issues and not PRs. Feature requests
are open to the public. One can work on their own feature requests. As a matter
of fact we promote such an activity.

A feature should preferably come with jest test cases that are tested to pass.
Please refer to [testing](##Testing).

## Bug fixes
Bug fixes dont have a special implementation work. Please reference the bug
you are fixing. We appreciate that you took the time to fix our bugs.
