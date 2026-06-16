$urls = @{
  'san-miguel.png' = 'https://www.google.com/s2/favicons?sz=128&domain=sanmiguel.com.ph'
  'dunkin.png' = 'https://www.google.com/s2/favicons?sz=128&domain=dunkindonuts.com'
  'bench.png' = 'https://www.google.com/s2/favicons?sz=128&domain=benchtm.com'
  'cargill.png' = 'https://www.google.com/s2/favicons?sz=128&domain=cargill.com'
  'nestle.png' = 'https://www.google.com/s2/favicons?sz=128&domain=nestle.com'
  'astrazeneca.png' = 'https://www.google.com/s2/favicons?sz=128&domain=astrazeneca.com'
  'globe.png' = 'https://www.google.com/s2/favicons?sz=128&domain=globe.com.ph'
  'urc.png' = 'https://www.google.com/s2/favicons?sz=128&domain=urc.com.ph'
}

New-Item -ItemType Directory -Force -Path 'src\assets\partners' | Out-Null

foreach ($file in $urls.Keys) {
  Write-Host "Downloading $file..."
  Invoke-WebRequest -Uri $urls[$file] -OutFile ("src\assets\partners\" + $file) -UserAgent 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}
