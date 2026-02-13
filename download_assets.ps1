
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

foreach ($url in $integrations) {
    $filename = $url.Split('/')[-1]
    Invoke-WebRequest -Uri $url -OutFile "public\assets\integrations\$filename"
    Write-Host "Downloaded $filename"
}

foreach ($url in $features) {
    $filename = $url.Split('/')[-1]
    Invoke-WebRequest -Uri $url -OutFile "public\assets\features\$filename"
    Write-Host "Downloaded $filename"
}
