using Microsoft.EntityFrameworkCore;
using BookApp.Api.Models;

namespace BookApp.Api.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Book> Books { get; set; } = null!;
    }
}