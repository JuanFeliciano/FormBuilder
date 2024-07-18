using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces
{
    public interface IQuestionRepository
    {
        Task<Questions> GetById(int id);
        Task<Questions> Get();
        Task<Questions> Post([FromBody] Questions formGroup);
        Task<Questions> Delete(int id);
        Task<Questions> Update([FromBody] Questions formsGroup, int id);
    }
}
