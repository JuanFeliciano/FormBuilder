namespace MovtechForms.Domain.Entities
{
    public class Forms
    {
        public int Id { get; private set; }
        public int IdFormGroup { get; set; }
        public string Title { get; set; }

        //Relationship
        public FormsGroup FormsGroup { get; set; }

        public ICollection<Questions> Questions { get; set; }
    }
}
