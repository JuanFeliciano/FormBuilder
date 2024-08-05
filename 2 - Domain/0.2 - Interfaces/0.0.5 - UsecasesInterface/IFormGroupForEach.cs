using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Domain.Interfaces
{
    public interface IFormGroupForEach
    {
        Task<List<Form>> SelectForEach(int id);
        Task InsertForEach([FromBody] FormGroup model, int id);
        Task DeleteForEach(int id);
    }
}
