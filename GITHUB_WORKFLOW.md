# GitHub Workflow Guide

## Repository Information

- **GitHub URL**: https://github.com/benjaminbeh/Arklens-Website
- **Owner**: benjaminbeh
- **Name**: Arklens-Website
- **Visibility**: Public

## Local Repositories

You have two synchronized copies:

### 1. Working Directory (Primary)
```
/Volumes/SD Card128/Arklens/Website
```
Use this for development and making changes.

### 2. GitHub Clone (Backup/Reference)
```
/Volumes/SD Card128/Github (Clone)/Arklens-Website
```
This is a clean clone for reference or testing.

## Workflow for Making Changes

### Option A: Work in Primary Directory (Recommended)

1. **Make changes** in `/Volumes/SD Card128/Arklens/Website`
2. **Stage changes**:
   ```bash
   cd "/Volumes/SD Card128/Arklens/Website"
   git add .
   ```
3. **Commit**:
   ```bash
   git commit -m "Your commit message"
   ```
4. **Push to GitHub**:
   ```bash
   git push origin main
   ```

### Option B: Work in GitHub Clone

1. **Make changes** in `/Volumes/SD Card128/Github (Clone)/Arklens-Website`
2. Follow same git workflow above
3. **Pull changes to working directory**:
   ```bash
   cd "/Volumes/SD Card128/Arklens/Website"
   git pull origin main
   ```

## Quick Commands

### Check Status
```bash
git status
```

### View Changes
```bash
git diff
```

### View Commit History
```bash
git log --oneline
```

### Create a New Branch
```bash
git checkout -b feature/your-feature-name
```

### Switch Branches
```bash
git checkout main
git checkout feature/your-feature-name
```

### Push New Branch to GitHub
```bash
git push -u origin feature/your-feature-name
```

### Pull Latest Changes
```bash
git pull origin main
```

## Sync Between Local Repositories

If you make changes in one location and want to sync to the other:

### From Working Directory → GitHub Clone
```bash
# Push from working directory
cd "/Volumes/SD Card128/Arklens/Website"
git push origin main

# Pull in GitHub clone
cd "/Volumes/SD Card128/Github (Clone)/Arklens-Website"
git pull origin main
```

### From GitHub Clone → Working Directory
```bash
# Push from GitHub clone
cd "/Volumes/SD Card128/Github (Clone)/Arklens-Website"
git push origin main

# Pull in working directory
cd "/Volumes/SD Card128/Arklens/Website"
git pull origin main
```

## Common Git Operations

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### Stash Changes (Save for Later)
```bash
git stash
git stash pop  # Retrieve later
```

### View Remote URL
```bash
git remote -v
```

### Update Remote URL
```bash
git remote set-url origin https://github.com/benjaminbeh/Arklens-Website.git
```

## GitHub CLI Commands

### View Repository Info
```bash
gh repo view
```

### Open Repository in Browser
```bash
gh repo view --web
```

### Create Pull Request
```bash
gh pr create --title "Title" --body "Description"
```

### View Pull Requests
```bash
gh pr list
```

### Clone Repository
```bash
gh repo clone benjaminbeh/Arklens-Website
```

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Use descriptive commit messages
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Use Branches**: Create feature branches for new features
5. **Review Before Commit**: Use `git diff` to review changes
6. **Don't Commit node_modules**: Already in .gitignore
7. **Test Before Push**: Run `npm run build` to ensure it works

## Troubleshooting

### Merge Conflicts
```bash
# View conflicted files
git status

# Edit files to resolve conflicts
# Then add and commit
git add .
git commit -m "Resolve merge conflicts"
```

### Forgot to Pull Before Push
```bash
git pull --rebase origin main
# Resolve any conflicts
git push origin main
```

### Need to Undo Changes
```bash
# Undo unstaged changes to a file
git checkout -- filename

# Undo all unstaged changes
git checkout -- .

# Undo staged changes
git reset HEAD filename
```

## Next Steps

Now that the repository is set up:

1. ✅ Repository created and pushed to GitHub
2. ✅ Cloned to your GitHub folder
3. ⏭️ **Deploy to Cloudflare Pages** (see DEPLOYMENT.md)
4. ⏭️ Configure custom domain www.arklens.ch
5. ⏭️ Continue development (add features, fix issues)

## Resources

- **Repository**: https://github.com/benjaminbeh/Arklens-Website
- **GitHub CLI Docs**: https://cli.github.com/manual/
- **Git Docs**: https://git-scm.com/doc
- **Cloudflare Pages**: https://pages.cloudflare.com/
