
$integrations = @(
    "https://vslplay.com/wp-content/uploads/2024/10/hotmart.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/astron-members.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/builderal.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/edduz.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/wordpress.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/elementor.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/great-pages.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/webflow.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/wix.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/leadlovers.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/memberkit.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/ticto.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/cademi.webp",
    "https://vslplay.com/wp-content/uploads/2024/10/typebot.webp"
)

$features = @(
    "https://vslplay.com/wp-content/uploads/2024/10/Grafico-de-Retencao.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Barra-de-Progresso.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Smart-Autoplay-.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Thumbnails.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Aparencia-.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Botao-.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Controles.gif",
    "https://vslplay.com/wp-content/uploads/2024/10/Continue-Assistindo-.gif"
)

$others = @(
    "https://img.youtube.com/vi/avhZ4EUZF1E/sddefault.jpg",
    "https://i.imgur.com/u69DoNf.png"
)

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "public\assets\integrations"
New-Item -ItemType Directory -Force -Path "public\assets\features"
New-Item -ItemType Directory -Force -Path "public\assets\misc"

foreach ($url in $integrations) {
    $filename = $url.Split('/')[-1]
    Invoke-WebRequest -Uri $url -OutFile "public\assets\integrations\$filename"
    Write-Host "Downloaded Integration: $filename"
}

foreach ($url in $features) {
    $filename = $url.Split('/')[-1]
    Invoke-WebRequest -Uri $url -OutFile "public\assets\features\$filename"
    Write-Host "Downloaded Feature: $filename"
}

if (-not (Test-Path "public\assets\misc\poster.jpg")) {
    Invoke-WebRequest -Uri "https://img.youtube.com/vi/avhZ4EUZF1E/sddefault.jpg" -OutFile "public\assets\misc\poster.jpg"
    Write-Host "Downloaded Poster"
}

if (-not (Test-Path "public\assets\misc\pause-icon.png")) {
    Invoke-WebRequest -Uri "https://i.imgur.com/u69DoNf.png" -OutFile "public\assets\misc\pause-icon.png"
    Write-Host "Downloaded Pause Icon"
}
