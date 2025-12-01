using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookApp.Api.Data;
using BookApp.Api.Models;

namespace BookApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QuoteController : ControllerBase
    {
        private readonly BookDbContext _context;

        public QuoteController(BookDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
           var idString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(idString))
                throw new Exception("UserId claim missing in JWT");
                return int.Parse(idString);
        }

       

        // GET api/quote
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            int userId = GetUserId();
            var quotes = await _context.Quotes
                .Where(q => q.UserId == userId)
                .OrderByDescending(q => q.Id)
                .Take(5)
                .ToListAsync();

            return Ok(quotes);
        }

        // GET api/quote/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null || quote.UserId != GetUserId())
                return NotFound();

            return Ok(quote);
        }

        // POST api/quote
        [HttpPost]
        public async Task<IActionResult> Create(Quote quote)
        {
            quote.UserId = GetUserId();
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();
            return Ok(quote);
        }

        // PUT api/quote/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Quote updated)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null || quote.UserId != GetUserId())
                return NotFound();

            quote.Text = updated.Text;
            quote.Author = updated.Author;
            await _context.SaveChangesAsync();

            return Ok(quote);
        }

        // DELETE api/quote/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null || quote.UserId != GetUserId())
                return NotFound();

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}