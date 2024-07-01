namespace MovtechForms.Domain.Entities
{
    public class Questions
    {
        public int Id { get; private set; }
        public int FormId { get; private set; }
        public string Content { get; set; }

        //Relationship
        public ICollection<Answer> Answers { get; set; }
    }
}
