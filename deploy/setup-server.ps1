# Скрипт настройки Windows-сервера для автодеплоя digital-twin.
# Запускать в PowerShell ОТ ИМЕНИ АДМИНИСТРАТОРА.
# Выполняется ОДИН РАЗ при первоначальной подготовке сервера.

$ErrorActionPreference = 'Stop'

Write-Host "== 1. Проверка Node.js и Git ==" -ForegroundColor Cyan
node -v
npm -v
git --version

Write-Host "`n== 2. Установка pm2 и автозапуска ==" -ForegroundColor Cyan
npm install -g pm2 pm2-windows-startup
$env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path', 'User')
pm2-startup install
pm2 save

Write-Host "`n== 3. Скачиваем и распаковываем GitHub Actions runner ==" -ForegroundColor Cyan
$runnerDir = 'C:\actions-runner'
New-Item -ItemType Directory -Force -Path $runnerDir | Out-Null
Write-Host "Скачай runner вручную: GitHub -> репозиторий digital-twin -> Settings -> Actions -> Runners -> New self-hosted runner -> Windows"
Write-Host "Распакуй его в $runnerDir и нажми Enter, когда закончишь..."
Read-Host

Write-Host "`n== 4. Настройка runner ==" -ForegroundColor Cyan
Write-Host "1) Выполни команду, которую покажет GitHub (token выдаётся на 1 час):"
Write-Host "   cd C:\actions-runner"
Write-Host '   .\config.cmd --url https://github.com/TheLEMOH/digital-twin --token <ТОКЕН>'
Write-Host "   Выбери группу по умолчанию и имя runner (например prod-server)"
Write-Host "2) После настройки введи здесь 'y' и нажми Enter, чтобы запустить runner как службу Windows"
$runAsService = Read-Host 'Запустить как службу? (y/n)'
if ($runAsService -eq 'y') {
  Push-Location $runnerDir
  .\svc.cmd install
  .\svc.cmd start
  Pop-Location
  Write-Host "Служба запущена: actions.runner.thelemoh.digital-twin.opensource.server" -ForegroundColor Green
}

Write-Host "`nГотово! Теперь зайди в GitHub -> репозиторий -> Actions -> запусти workflow 'Deploy' вручную для проверки." -ForegroundColor Green