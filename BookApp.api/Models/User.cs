namespace BookApp.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;

        // Navigation property: en användare kan ha flera böcker
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}