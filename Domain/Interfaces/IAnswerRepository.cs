using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms.Domain.Interfaces
{
    public interface IAnswerRepository
    {
        Task<DataTable> PostAnswer([FromBody] Answer answer);
        Task<DataTable> GetAnswer();
    }
}
