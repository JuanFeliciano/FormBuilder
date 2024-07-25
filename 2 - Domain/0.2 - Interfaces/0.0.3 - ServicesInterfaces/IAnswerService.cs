using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface IAnswerService
    {
        Task<List<Answer>> Get();
        Task<List<Answer>> Post([FromBody] Answer answer);
    }
}
