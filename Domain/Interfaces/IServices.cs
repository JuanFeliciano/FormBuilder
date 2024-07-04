using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace MovtechForms.Domain.Interfaces
{
    public interface IServices<T> 
    {
        Task<string> Get();
        Task<string> Post([FromBody] T formGroup);
        Task<string> Delete(int id);
        Task<string> Update([FromBody] T formsGroup, int id);
    }
}
