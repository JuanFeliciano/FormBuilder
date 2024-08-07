using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces
{
    public interface IFormGroupService
    {
        Task<FormGroup> GetById(int id);
        Task<List<FormGroup>> Get();
        Task<FormGroup> Post([FromBody] FormGroup formGroup);
        Task<FormGroup> Delete(int id);
        Task<FormGroup> Update([FromBody] FormGroup formsGroup, int id);
    }
}
