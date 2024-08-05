using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces
{
    public interface IFormRepository
    {
        Task<Form> GetById(int id);
        Task<List<Form>> Get();
        Task<Form> Post([FromBody] Form formGroup);
        Task<Form> Delete(int id);
        Task<Form> Update([FromBody] Form formsGroup, int id);

    }
}
