using BookApp.Api.Data;
using BookApp.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database (InMemory for development)
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseInMemoryDatabase("BooksDb"));

// JWT service for generating tokens
builder.Services.AddSingleton<JwtService>();

// CORS: allow Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());
});

// JWT Authentication
var key = Encoding.UTF8.GetBytes(
    builder.Configuration["Jwt:Key"] ?? "supersecretkey123!"
);

builder.Services.AddAuthentication("JwtBearer")
    .AddJwtBearer("JwtBearer", options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ClockSkew = TimeSpan.Zero // tokens expire exactly on time
        };
    });

var app = builder.Build();

// Development tools
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowAngular"); // << IMPORTANT for Angular dev server

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();