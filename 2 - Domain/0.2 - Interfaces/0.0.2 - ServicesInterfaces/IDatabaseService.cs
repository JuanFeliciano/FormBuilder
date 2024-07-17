using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface IDatabaseService
    {
        Task<DataTable> ExecuteQuery(string query, SqlParameter[] parameters);
    }
}
