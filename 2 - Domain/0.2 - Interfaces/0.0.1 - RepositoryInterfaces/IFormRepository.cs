using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces
{
    public interface IFormRepository
    {
        Task<Forms> GetById(int id);
        Task<Forms> Get();
        Task<Forms> Post([FromBody] Forms formGroup);
        Task<Forms> Delete(int id);
        Task<Forms> Update([FromBody] Forms formsGroup, int id);

    }
}
