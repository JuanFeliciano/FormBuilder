using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces
{
    public interface IQuestionHandler
    {
        Task<Question> GetById(int id);
        Task<List<Question>> Get();
        Task<Question> Post([FromBody] Question formGroup);
        Task<Question> Delete(int id);
        Task<Question> Update([FromBody] Question formsGroup, int id);
    }
}
