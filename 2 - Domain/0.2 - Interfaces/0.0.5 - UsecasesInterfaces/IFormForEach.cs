using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._5___UsecasesInterfaces
{
    public interface IFormForEach
    {
        Task<List<Questions>> SelectForEach(int id);
        Task InsertForEach([FromBody] Forms model, int id);
        Task DeleteForEach(int id);
    }
}
