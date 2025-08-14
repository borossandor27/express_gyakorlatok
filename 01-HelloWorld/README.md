# Első alkalmazás

Az Express egy Node.js alapú keretrendszer, amelyet HTTP szolgáltatások készítéséhez terveztek.

## Node.js telepítése

Töltsd le a [honlapjáról](https://nodejs.org/en/) és futtasd.

A Windows biztonsága gyakran nem engedi a szkriptek futtatását, így ha egy adott project esetén szeretnéd használni, akkor a mappájában add ki a következő parancsot:

'''PowerShell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
'''

Ha a gépeden bárhol használni szeretnéd:
'''powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
'''

## Modulok használata

'''cmd
npm init -y
'''

## Futtatás

'''cmd
node HelloWorld.js
'''

