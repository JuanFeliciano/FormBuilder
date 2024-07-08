using Microsoft.AspNetCore.Mvc;

namespace MovtechForms.Domain.Interfaces
{
    public interface IServices<T> 
    {
        Task<T> GetById(int id);
        Task<List<T>> Get();
        Task<List<T>> Post([FromBody] T formGroup);
        Task<List<T>> Delete(int id);
        Task<List<T>> Update([FromBody] T formsGroup, int id);
    }
}
