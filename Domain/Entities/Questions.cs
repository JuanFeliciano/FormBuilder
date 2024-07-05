namespace MovtechForms.Domain.Entities
{
    public class Questions
    {
        public int Id { get; private set; }
        public int IdForm { get; set; }
        public string Content { get; set; }

        //Relationship
        public ICollection<Answer> Answers { get; set; }

        public Questions()
        {
            Answers = new List<Answer>();
        }
    }
}
