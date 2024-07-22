using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._5___UsecasesInterfaces
{
    public interface IQuestionForEach
    {
        Task<List<Answer>> SelectForEach(int id);
        Task InsertForEach([FromBody] Questions model, int id);
        Task DeleteForEach(int id);
    }
}
