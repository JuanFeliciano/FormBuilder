using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterface._0._0._0._1___SecundaryInterface;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;

namespace MovtechForms._1___Application._0._1___Repositories._0._0._1___SecundaryRepositories
{
    public class NpsRepository : INpsRepository
    { 

        private readonly IDatabaseService _dbService;

        public NpsRepository(IDatabaseService dbService) => _dbService = dbService;
       

        public async Task<DataTable> CalculateNps()
        {
            string command = "SELECT * FROM Answer;";

            DataTable gradeTable= await _dbService.ExecuteQuery(command, null!);

            return gradeTable;
        }
    }
}
