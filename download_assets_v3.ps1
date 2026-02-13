
$urls = @(
    "https://vslplay.com/wp-content/uploads/2024/10/vsl-mobile-3-950x1024.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/img1.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/img1-1.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/depoimentos.webp"
)

foreach ($url in $urls) {
    $filename = $url.Split('/')[-1]
    # Remove dimensions from filename if present for cleaner names (e.g. -950x1024)
    if ($filename -match "-\d+x\d+") {
        $cleanName = $filename -replace "-\d+x\d+", ""
        Write-Host "Renaming $filename to $cleanName"
        $filename = $cleanName
    }
    
    Invoke-WebRequest -Uri $url -OutFile "public\assets\misc\$filename"
    Write-Host "Downloaded $filename to public\assets\misc"
}

# Also ensure specific testimonial avatars are there if not covered by previous script
$avatars = @(
    "https://vslplay.com/wp-content/uploads/2024/10/nathalia.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/wellington.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/sabrina.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/gabriel.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/vslplay-review.webp"
)

New-Item -ItemType Directory -Force -Path "public\assets\testimonials"
foreach ($url in $avatars) {
    $filename = $url.Split('/')[-1]
    Invoke-WebRequest -Uri $url -OutFile "public\assets\testimonials\$filename"
    Write-Host "Downloaded Testimonial: $filename"
}
