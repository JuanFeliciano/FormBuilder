using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces
{
    public interface IFormGroupRepository
    {
        Task<FormGroup> GetById(int id);
        Task<List<FormGroup>> Get();
        Task<FormGroup> Post([FromBody] FormGroup formGroup);
        Task<FormGroup> Delete(int id);
        Task<FormGroup> Update([FromBody] FormGroup formsGroup, int id);

    }
}
