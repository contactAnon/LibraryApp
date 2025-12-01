using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookApp.Api.Models
{
    public class Quote
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Text { get; set; } = "";

        [Required]
        public string Author { get; set; } = "";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

         [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}