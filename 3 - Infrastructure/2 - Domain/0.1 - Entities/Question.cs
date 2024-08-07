namespace MovtechForms.Domain.Entities
{
    public class Question
    {
        public int Id { get; private set; }
        public int IdForm { get; set; }
        public string Content { get; set; }

        //Relationship
        public ICollection<Answer> Answers { get; set; }

        public Question()
        {
            Answers = new List<Answer>();
        }
    }
}
