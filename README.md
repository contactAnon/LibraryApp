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


A full-stack project built with .NET 9, SQLite, and Angular, designed to demonstrate basic user management, JWT authentication, and a modern full-stack workflow. The Library App consists of two parts:  

Backend (API)  
Built with ASP.NET Core 9 (.NET 9)  
SQLite database using Entity Framework Core  
JWT-based authentication (automatic logout after one minute)  
Hosted on Render.com  
Runs in a Docker container  

Frontend  
Built with Angular  
JWT stored in localStorage  
An HTTP interceptor automatically attaches the token to API requests  
Hosted on Vercel  
