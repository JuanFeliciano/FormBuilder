namespace MovtechForms.Domain.Entities
{
    public class FormGroup
    {
        public int Id { get; private set; }
        public string Title { get; set; }

        // Ralationship

        public ICollection<Form> Forms { get; set; }

        public FormGroup()
        {
            Forms = new List<Form>();
        }
    }
}
