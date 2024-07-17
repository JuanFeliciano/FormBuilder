using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace MovtechForms.Domain.Interfaces.RepositoryInterfaces
{
    public interface IRepository<T>
    {
        Task<T> GetById(int id);
        Task<DataTable> Get();
        Task<T> Post([FromBody] T formGroup);
        Task<T> Delete(int id);
        Task<T> Update([FromBody] T formsGroup, int id);
    }
}
