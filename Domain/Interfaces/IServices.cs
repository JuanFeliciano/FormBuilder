using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace MovtechForms.Domain.Interfaces
{
    public interface IServices<T>
    {
        Task<DataTable> Get();
        Task<DataTable> Post([FromBody] T formGroup);
        Task<DataTable> Delete(int id);
        Task<DataTable> Update([FromBody] T formsGroup, int id);
    }
}
