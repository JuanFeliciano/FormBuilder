using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Domain.Interfaces
{
    public interface IFormGroupForEach
    {
        Task<List<Forms>> SelectForEach(int id);
        Task InsertForEach([FromBody] FormsGroup model, int id);
        Task DeleteForEach(int id);
    }
}
