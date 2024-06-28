namespace MovtechForms.Domain.Entities
{
    public class Questions
    {
        public int Id { get; private set; }
        public int FormId { get; private set; }
        public string Title { get; set; }

        //Relationship

        public Forms Forms { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
}
