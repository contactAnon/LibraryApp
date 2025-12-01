using Microsoft.EntityFrameworkCore;
using BookApp.Api.Models;

namespace BookApp.Api.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Book> Books => Set<Book>();
        public DbSet<Quote> Quotes { get; set; }
    }
}