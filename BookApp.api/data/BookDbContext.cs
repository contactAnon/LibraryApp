using Microsoft.EntityFrameworkCore;
using BookApp.Api.Models;

namespace BookApp.Api.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) {}
        public DbSet<Book> Books { get; set; }
    }
}