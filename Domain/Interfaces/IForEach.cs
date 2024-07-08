using Microsoft.AspNetCore.Mvc;

namespace MovtechForms.Domain.Interfaces
{
    public interface IForEach<T>
    {
        Task SelectForEach([FromBody] T model, int id);
        Task DeleteForEach(int id);
    }
}
