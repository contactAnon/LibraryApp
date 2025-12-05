using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace BookApp.Api.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;
        
        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(int userId, string username)
        {
            // Säkerställ att Jwt:Key finns
            var keyString = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is missing");
            var key = Encoding.UTF8.GetBytes(keyString);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()), 
                new Claim(ClaimTypes.Name, username),
                new Claim("username", username)
            };

            var creds = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}