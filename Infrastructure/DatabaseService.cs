using System.Data;
using System.Data.SqlClient;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Infrastructure
{
    public class DatabaseService : IDatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<DataTable> ExecuteQueryAsync(string query, SqlParameter[] parameters)
        {
            using (SqlConnection connection = new(_connectionString))
            {
                using (SqlCommand command = new(query, connection))
                {
                    if (parameters != null)
                    {
                        command.Parameters.AddRange(parameters);
                    }
                    using (SqlDataAdapter adapter = new(command))
                    {
                        DataTable dataTable = new();
                        await connection.OpenAsync();
                        adapter.Fill(dataTable);
                        return dataTable;
                    }
                }
            }
        }

        public async Task<int> ExecuteQueryNonAsync(string query, SqlParameter[] parameters)
        {
            using (SqlConnection connection = new(_connectionString))
            {
                using (SqlCommand command = new(query, connection))
                {
                    if (parameters != null)
                    {
                        command.Parameters.AddRange(parameters);
                    }

                    await connection.OpenAsync();
                    return await command.ExecuteNonQueryAsync();
                }
            }
        }

    }
}
