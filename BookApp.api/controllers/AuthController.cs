using Microsoft.AspNetCore.Mvc;
using BookApp.Api.Models;
using BookApp.Api.Services;
using BookApp.Api.Data;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Username == newUser.Username))
                return Conflict("Användarnamnet finns redan.");

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);

            if (existingUser != null)
            {
                var token = _jwtService.GenerateToken(user.Username);
                return Ok(new { token });
            }

            return Unauthorized("Fel användarnamn eller lösenord");
        }
    }
}