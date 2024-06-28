namespace MovtechForms.Domain.Entities
{
    public class FormsGroup
    {
        public int Id { get; private set; }
        public string Title { get; set; }

        // Ralationship

        public ICollection<Forms>? Forms { get; set; }

        public FormsGroup(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}
