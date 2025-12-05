📚 Library App

Ett fullstack-projekt byggt med .NET 9, SQLite och Angular, designat för att demonstrera enkel användarhantering, JWT-inloggning och ett modernt fullstack-flöde.
Library App består av två delar:

Backend (API)  
Byggd i ASP.NET Core 9 (NET 9)  
SQLite-databas via Entity Framework Core  
JWT-baserad autentisering (loggas ut efter en minut)  
Hostas på Render.com  
Körs i Docker-kontainer  

Frontend  
Byggd i Angular  
JWT lagras i localStorage  
Interceptor lägger automatiskt till token vid API-anrop  
Hostas på Vercel  
