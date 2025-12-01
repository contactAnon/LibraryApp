using System.Text.Json.Serialization;
namespace BookApp.Api.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public DateTime PublicationDate { get; set; }

        // Foreign key till användare
        [JsonIgnore]
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}