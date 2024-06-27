using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Domain.Interfaces
{
    public interface IDatabaseService
    {
        Task<DataTable> ExecuteQueryAsync(string query, SqlParameter[] parameters);
        Task<int> ExecuteQueryNonAsync(string query, SqlParameter[] parameters);
    }
}
