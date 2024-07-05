using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace MovtechForms.Domain.Interfaces
{
    public interface IServices<T> 
    {
        Task<List<T>> Get();
        Task<List<T>> Post([FromBody] T formGroup);
        Task<List<T>> Delete(int id);
        Task<List<T>> Update([FromBody] T formsGroup, int id);
    }
}
