using Microsoft.AspNetCore.Mvc;

namespace MovtechForms.Domain.Interfaces
{
    public interface IForEach<T>
    {
         Task ForEach([FromBody] T model, int id);
    }
}
