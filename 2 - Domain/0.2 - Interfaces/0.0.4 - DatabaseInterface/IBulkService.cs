using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._4___DatabaseInterface
{
    public interface IBulkService
    {
        Task BulkInsertAnswers([FromBody] Answer[] asnwer);
        Task BulkInsertQuestions([FromBody] Question[] question);
    }
}
