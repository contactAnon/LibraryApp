using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApp.Api.Data;
using BookApp.Api.Models;
using BookApp.Api.Services;

namespace BookApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BookDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(BookDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Username == newUser.Username))
                return Conflict("Användarnamnet finns redan.");

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { text = "Användare registrerad!" });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginUser)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginUser.Username && u.Password == loginUser.Password);

            if (user == null)
                return Unauthorized("Fel användarnamn eller lösenord");

            var token = _jwtService.GenerateToken(user.Username);

            return Ok(new { token });
        }
    }
}