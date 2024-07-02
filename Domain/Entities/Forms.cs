namespace MovtechForms.Domain.Entities
{
    public class Forms
    {
        public int Id { get; private set; }
        public int IdGroup { get; set; }
        public string Title { get; set; }

        public ICollection<Questions>? Questions { get; set; } = new List<Questions>();
    }
}
