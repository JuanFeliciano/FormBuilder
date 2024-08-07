namespace MovtechForms.Domain.Entities
{
    public class Form
    {
        public int Id { get; private set; }
        public int IdGroup { get; set; }
        public string Title { get; set; }

        public ICollection<Question> Questions { get; set; }
        
        public Form()
        {
            Questions = new List<Question>();
        }
    }
}
