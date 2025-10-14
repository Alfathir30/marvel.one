cd "C:\Marvel.one"
git fetch origin
$changes = git diff --name-only origin/main
if ($changes) {
    git pull origin main
    echo "Repo updated from GitHub at $(Get-Date)" >> "C:\Marvel.one\update_log.txt"
}
