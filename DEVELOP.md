### Development

1. fork/clone repo
2. setup project `npm run setup`
2. install dependencies `npm run reinstall`
3. run unit test suites `npm run tdd`

NOTE: `npm reinstall` should be run **always** after pulling from **master** branch.

### Deployment (Publish && Release)

1. Reinstall dependencies if needed: `npm run reinstall`
2. Update `CHANGELOG.md`
3. Create distribution files: `npm run dist`
4. Login to NPM: `npm login`
5. Increase library version: `npm version [major|minor|patch]`
6. Upload new tag created on step 5: `git push origin <new tag>`
7. Create release in GitHub (attach dist/* files created in step 3)
8. Publish: `npm publish`

### Checklist for any PRs

If needed, copy & paste the following checklist:

```
- [ ] Implement feature/update
- [ ] Update unit tests
- [ ] Update CHANGELOG.md
```
