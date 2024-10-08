using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces
{
    public interface IQuestionService
    {
        Task<List<Question>> Get();
        Task<Question> GetById(int id);
        Task<List<Question>> GetByIdForm(int id);
        Task<List<Question>> Post([FromBody] Question[] questions);
        Task<Question> Delete(int id);
        Task<Question> Update([FromBody] Question question, int id);
    }
}
