using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces
{
    public interface IAnswerHandler
    {
        Task<List<Answer>> PostAnswer([FromBody] Answer[] answer);
        Task<List<Answer>> GetAnswer();
    }
}
