using Microsoft.AspNetCore.Mvc;

namespace MovtechForms.Domain.Interfaces
{
    public interface IForEach<T>
    {
        public void ForEach([FromBody] T model);
    }
}
