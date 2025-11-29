using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookApp.Api.Data;
using BookApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BookApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly BookDbContext _context;
        public BooksController(BookDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var currentUser = User.Identity?.Name;
            return await _context.Books.Where(b => b.Username == currentUser).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            book.Username = User.Identity?.Name ?? "";
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id) return BadRequest();

            var currentUser = User.Identity?.Name;
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null || existingBook.Username != currentUser) return Unauthorized();

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.PublicationDate = book.PublicationDate;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var currentUser = User.Identity?.Name;
            var book = await _context.Books.FindAsync(id);
            if (book == null || book.Username != currentUser) return Unauthorized();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}