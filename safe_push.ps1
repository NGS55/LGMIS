# Safe GitHub push script for large repos (Windows PowerShell version)
# Splits your pushes into batches to stay below GitHub’s 100MB file limit

param(
    [string]$Remote = "origin",
    [string]$Branch = "main",
    [int]$BatchSize = 1000
)

Write-Host "🔍 Checking for large files (>90MB)..."
git rev-list --objects --all |
    git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
    Select-String '^blob' |
    ForEach-Object {
        $parts = $_ -split ' '
        $sizeMB = [math]::Round($parts[2]/1048576, 2)
        if ($sizeMB -gt 90) {
            Write-Host "⚠️  Large file detected: $($parts[3]) (${sizeMB}MB)"
        }
    }

Write-Host ""
Write-Host "Starting batched push..."
Write-Host "------------------------"

$commits = git rev-list --reverse HEAD
$total = $commits.Count
Write-Host "Total commits: $total"

for ($i = 0; $i -lt $total; $i += $BatchSize) {
    $start = $i
    $end = [math]::Min($i + $BatchSize - 1, $total - 1)

    $startCommit = $commits[$start]
    $endCommit = $commits[$end]

    Write-Host ""
    Write-Host "📦 Pushing commits $($start+1)–$($end+1) of $total..."
    Write-Host "From: $startCommit"
    Write-Host "To:   $endCommit"

    $tmpBranch = "push_batch_$i"
    git branch -f $tmpBranch $endCommit
    git push $Remote "$tmpBranch:$Branch" --force-with-lease

    Write-Host "✅ Batch $([math]::Floor($i / $BatchSize) + 1) pushed successfully."
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "🎉 All batches pushed successfully!"
