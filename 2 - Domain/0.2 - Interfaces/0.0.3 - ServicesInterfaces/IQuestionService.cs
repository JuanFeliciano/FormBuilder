using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces
{
    public interface IQuestionService
    {
        Task<Questions> GetById(int id);
        Task<Questions> Get();
        Task<Questions> Post([FromBody] Questions formGroup);
        Task<Questions> Delete(int id);
        Task<Questions> Update([FromBody] Questions formsGroup, int id);
    }
}
