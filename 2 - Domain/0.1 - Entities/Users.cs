namespace MovtechForms.Domain.Entities
{
    public class Users
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
