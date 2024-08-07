using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces
{
    public interface IQuestionRepository
    {
        Task<Question> GetById(int id);
        Task<List<Question>> Get();
        Task<Question> Post([FromBody] Question formGroup);
        Task<Question> Delete(int id);
        Task<Question> Update([FromBody] Question formsGroup, int id);
    }
}
