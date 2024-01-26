# Contributing to junbae-mode

Thank you for showing interest in Junbae-mode and we appreciate any contribution.

## [Report a Bug or Feature](https://github.com/JunbaeJs/junbae-mode/issues/new/choose)

Whenever you find something which is not working properly, please first search the repository's issue page and make sure it's not reported by someone else already.

Before creating an issue, check the `Issue Template` for guidelines. Provide as much detail as possible.

- [bug](.github/ISSUE_TEMPLATE/bug_report.md)
- [feature](.github/ISSUE_TEMPLATE/feature_request.md)

## Open a PR for Bugfix or Feature

1. Fork this repository.
2. Create a new branch:

```sh
# from main branch.
git checkout -b [branch name or issue number]
```

</br>

3. Commit your changes

- follow below [Commit Convention](#commit-convention)

```sh
# example
git commit -m "feat:~~"
```

</br>

4. Push your changes:

```sh
git push origin [branch name or issue number]
```

</br>

5. Create a Pull Request

- Check the [pull_request_template](.github/pull_request_template.md) for guidelines.

</br>

## Commit Convention

```
feat: new feature for the user, not a new feature for build script
fix: bug fix for the user, not a fix to a build script
docs: changes to the documentation
style: formatting, missing semi colons, etc; no production code change
refactor: refactoring production code, eg. renaming a variable
test: adding missing tests, refactoring tests; no production code change
chore: updating grunt tasks etc; no production code change
```

## License

[MIT License](LICENSE)
</br>
Make sure to review it before contributing.
