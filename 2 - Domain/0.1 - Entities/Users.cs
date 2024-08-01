namespace MovtechForms.Domain.Entities
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string RefreshToken {  get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
