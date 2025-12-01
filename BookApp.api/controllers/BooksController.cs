using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApp.Api.Data;
using BookApp.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace BookApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Endast inloggade användare
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;

        public BookController(BookDbContext context)
        {
            _context = context;
        }

        // GET: api/book
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var username = User.Identity?.Name;
            if (username == null) return Unauthorized();

            var books = await _context.Books
                .Include(b => b.User)
                .Where(b => b.User!.Username == username)
                .ToListAsync();

            return Ok(books);
        }

        // POST: api/book
        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            var username = User.Identity?.Name;
            if (username == null) return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null) return Unauthorized();

            book.UserId = user.Id;

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return Ok(book);
        }

        // PUT: api/book/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var username = User.Identity?.Name;
            if (username == null) return Unauthorized();

            var book = await _context.Books.Include(b => b.User).FirstOrDefaultAsync(b => b.Id == id);
            if (book == null) return NotFound();
            if (book.User?.Username != username) return Forbid(); // Endast ägaren kan uppdatera

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.PublicationDate = updatedBook.PublicationDate;

            await _context.SaveChangesAsync();
            return Ok(book);
        }

        // DELETE: api/book/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var username = User.Identity?.Name;
            if (username == null) return Unauthorized();

            var book = await _context.Books.Include(b => b.User).FirstOrDefaultAsync(b => b.Id == id);
            if (book == null) return NotFound();
            if (book.User?.Username != username) return Forbid(); // Endast ägaren kan ta bort

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}