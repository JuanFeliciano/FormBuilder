using Microsoft.AspNetCore.Mvc;

namespace MovtechForms.Domain.Interfaces
{
    public interface IServices<T> 
    {
        Task<T> GetById(int id);
        Task<List<T>> Get();
        Task<T> Post([FromBody] T formGroup);
        Task<T> Delete(int id);
        Task<T> Update([FromBody] T formsGroup, int id);
    }
}
