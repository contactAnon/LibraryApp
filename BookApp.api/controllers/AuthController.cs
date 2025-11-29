using BookApp.Api.Data;
using BookApp.Api.Models;
using BookApp.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BookDbContext _dbContext;
        private readonly JwtService _jwtService;

        public AuthController(BookDbContext dbContext, JwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User request)
        {
            if (await _dbContext.Users.AnyAsync(u => u.Username == request.Username))
                return Conflict("Användarnamnet finns redan.");

            _dbContext.Users.Add(request);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User request)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u =>
                u.Username == request.Username && u.Password == request.Password);

            if (user == null)
                return Unauthorized("Fel användarnamn eller lösenord");

            var token = _jwtService.GenerateToken(user.Username);
            return Ok(new { token });
        }
    }
}