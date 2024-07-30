using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._4___DatabaseInterface;
using MovtechForms.Domain.Entities;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms._3___Infrastructure
{
    public class BulkService : IBulkService
    {
        private IConfiguration _configuration;

        public BulkService(IConfiguration configuration) => _configuration = configuration;

        public async Task BulkInsert([FromBody] Answer[] answerBody)
        {
            DataTable answerTable = new();

            answerTable.Columns.Add("IdQuestion", typeof(int));
            answerTable.Columns.Add("Grade", typeof(string));
            answerTable.Columns.Add("Description", typeof(string));

            foreach (Answer answer in answerBody)
            {
                answerTable.Rows.Add(answer.IdQuestion, answer.Grade, answer.Description);
            }

            using (SqlConnection connection = new(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                using (SqlBulkCopy bulkCopy = new(connection))
                {
                    bulkCopy.DestinationTableName = "Answer";

                    bulkCopy.ColumnMappings.Add("IdQuestion", "IdQuestion");
                    bulkCopy.ColumnMappings.Add("Grade", "Grade");
                    bulkCopy.ColumnMappings.Add("Description", "Description");

                    await bulkCopy.WriteToServerAsync(answerTable);
                }
            }

        }
    }
}
