using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._4___DatabaseInterface;
using MovtechForms.Domain.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;

namespace MovtechForms._3___Infrastructure
{
    public class BulkService : IBulkService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _context;

        public BulkService(IConfiguration configuration, IHttpContextAccessor context)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task BulkInsertAnswers(Answer[] answerBody)
        {
            string idString = _context.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            int id = Convert.ToInt32(idString);

            DataTable answerTable = new();

            answerTable.Columns.Add("IdQuestion", typeof(int));
            answerTable.Columns.Add("IdUser", typeof(int));
            answerTable.Columns.Add("Grade", typeof(string));
            answerTable.Columns.Add("Description", typeof(string));

            foreach (Answer answer in answerBody)
            {
                answerTable.Rows.Add(answer.IdQuestion, id, answer.Grade, answer.Description);
            }

            using (SqlConnection connection = new(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                using (SqlBulkCopy bulkCopy = new(connection))
                {
                    bulkCopy.DestinationTableName = "Answer";

                    bulkCopy.ColumnMappings.Add("IdQuestion", "IdQuestion");
                    bulkCopy.ColumnMappings.Add("IdUser", "IdUser");
                    bulkCopy.ColumnMappings.Add("Grade", "Grade");
                    bulkCopy.ColumnMappings.Add("Description", "Description");


                    await bulkCopy.WriteToServerAsync(answerTable);
                }
            }

        }

        public async Task BulkInsertQuestions(Question[] questionBody)
        {

            DataTable questionTable = new();

            questionTable.Columns.Add("IdForm", typeof(int));
            questionTable.Columns.Add("Content", typeof(string));

            foreach (Question question in questionBody)
            {
                questionTable.Rows.Add(question.IdForm , question.Content);
            }

            using (SqlConnection connection = new(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                using (SqlBulkCopy bulkCopy = new(connection))
                {
                    bulkCopy.DestinationTableName = "Questions";

                    bulkCopy.ColumnMappings.Add("IdForm", "IdForm");
                    bulkCopy.ColumnMappings.Add("Content", "Content");


                    await bulkCopy.WriteToServerAsync(questionTable);
                }
            }

        }
    }
}
