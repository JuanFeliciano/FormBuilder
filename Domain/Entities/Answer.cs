namespace MovtechForms.Domain.Entities
{
    public class Answer
    {
        public int Id { get; private set; }
        public int IdQuestion { get; set; }
        public int Note { get; set; }
        public string Description { get; set; }
    }
}
